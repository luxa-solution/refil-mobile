# API & Services Architecture (Modular)

This document outlines the structure for API calls and data fetching using a **centralized Axios client** and **feature-based React Query hooks**, enforced by our modular architecture.

## Rationale

- **Modular**: API logic (endpoints, hooks, types) lives *inside* the feature that consumes it.
- **Separation of Concerns**: The core client (`@/core/api`) is separate from the feature logic.
- **Reusability**: The core client is reused by all features. Hooks are reused *within* a feature.
- **Type Safety**: Feature-specific DTOs (`.dto.ts`) live with the feature's API.
- **Scalability**: Adding a new feature's API doesn't require modifying any shared code.
- **Encapsulation**: Features export *only* their hooks, hiding the raw endpoint logic.

## Folder Structure

The API is split into a **core client** and **feature-specific implementations**.

```
src/
├── core/
│   └── api/
│       ├── client.ts         # Axios instance configuration
│       ├── interceptors.ts   # Request/response interceptors
│       ├── queryClient.ts    # React Query client configuration
│       ├── types.ts          # GLOBAL API types (ApiResponse, ApiError)
│       ├── config.ts         # API configuration (base URLs, env)
│       └── index.ts          # Exports client, setupInterceptors
│
└── features/
    └── order/
        ├── api/
        │   ├── endpoints.ts    # INTERNAL: `orderApi` functions
        │   ├── mutations/
        │   │   ├── useCreateOrderMutation.ts
        │   │   └── index.ts    # INTERNAL: Barrel for mutation hooks
        │   ├── queries/
        │   │   ├── useGetOrder.ts
        │   │   └── index.ts    # INTERNAL: Barrel for query hooks
        │   └── index.ts        # PUBLIC: Re-exports hooks from ./queries & ./mutations
        │
        └── types/
            ├── order.dtos.ts   # Feature-specific types (DTOs)
            └── index.ts
```

## Implementation Guide

### 1. Axios Instance & Client (`src/core/api/client.ts`)

Creates a reusable Axios instance with default configuration.

```typescript
import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL, API_TIMEOUT } from './config';

export const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return instance;
};

// Import this client in your feature's `endpoints.ts`
export const client = createAxiosInstance();
```

### 2. Configuration (`src/core/api/config.ts`)

Environment-based configuration for different deployment stages.

```typescript
import Constants from 'expo-constants';

// Make sure 'environment' is defined in your app.json 'extra' field
const ENV = Constants.expoConfig?.extra?.environment || 'development';

const API_URLS = {
  development: 'https://api-dev.example.com',
  staging: 'https://api-staging.example.com',
  production: 'https://api.example.com',
};

export const API_BASE_URL = API_URLS[ENV as keyof typeof API_URLS];
export const API_TIMEOUT = 10000;
```

### 3. Global Types (`src/core/api/types.ts`)

Centralized, generic type definitions for API responses and errors.

```typescript
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}
```

### 4. Interceptors (`src/core/api/interceptors.ts`)

Handle authentication, token refresh, and global error handling.

```typescript
import { client } from './client';
// Auth token must come from a shared store, as `core` cannot import from `features`
import { useAuthStore } from '@/shared/store'; 

export const setupInterceptors = () => {
  // Request interceptor - Add auth token
  client.interceptors.request.use(
    async (config) => {
      // Get token from shared auth store
      const token = useAuthStore.getState().token; 
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor - Handle errors
  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      // Handle 401 Unauthorized
      if (error.response?.status === 401) {
        useAuthStore.getState().logout();
        // Navigation logic should be handled in a root component
        // that listens to the auth state
      }
      return Promise.reject(error);
    }
  );
};
```

### 5. React Query Configuration (`src/core/api/queryClient.ts`)

Initialize and configure the React Query client with sensible defaults.

```typescript
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      retry: 1,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: 0,
    },
  },
});
```

### 6. Feature Endpoints (`src/features/order/api/endpoints.ts`)

Define the API functions for a specific feature, importing the core `client`.
**This file is internal to the feature's API module.**

```typescript
import { client, ApiResponse } from '@/core/api'; // Import the shared client and type
import { Order, CreateOrderDto } from '@/features/order/types'; // Import feature-specific types

// Endpoint URLs
export const orderEndpoints = {
  getOne: (id: string) => `/orders/${id}`,
  create: () => '/orders',
};

// API functions
export const orderApi = {
  getOrder: (id: string) =>
    client.get<ApiResponse<Order>>(orderEndpoints.getOne(id)),

  createOrder: (data: CreateOrderDto) =>
    client.post<ApiResponse<Order>>(orderEndpoints.create(), data),
};
```

### 7. Query Hooks (`src/features/order/api/queries/useGetOrder.ts`)

Create reusable hooks for data fetching with React Query.

```typescript
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { orderApi } from '../endpoints'; // Import internal endpoints
import { Order } from '../../types';
import { ApiError, ApiResponse } from '@/core/api/types';

export const useGetOrder = (
  id: string,
  options?: UseQueryOptions<ApiResponse<Order>, ApiError>
) => {
  return useQuery({
    queryKey: ['orders', id], // Feature-specific query key
    queryFn: () => orderApi.getOrder(id).then((res) => res.data),
    enabled: !!id, // Only run if id exists
    ...options,
  });
};
```

### 8. Mutation Hooks (`src/features/order/api/mutations/useCreateOrderMutation.ts`)

Create reusable hooks for mutations with automatic cache invalidation.

```typescript
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { orderApi } from '../endpoints'; // Import internal endpoints
import { Order, CreateOrderDto } from '../../types';
import { ApiError, ApiResponse, queryClient } from '@/core/api'; // Import global api client and types

export const useCreateOrderMutation = (
  options?: UseMutationOptions<ApiResponse<Order>, ApiError, CreateOrderDto>
) => {
  return useMutation({
    mutationFn: (data) => orderApi.createOrder(data).then((res) => res.data),
    onSuccess: (data) => {
      // Invalidate and refetch the user's orders list
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      
      // Or update the cache directly for this new item
      queryClient.setQueryData(['orders', data.data.id], data);
    },
    ...options,
  });
};
```

## Export Files (Public API of the Module)

### `src/features/order/api/queries/index.ts` (Internal Barrel)

```typescript
export * from './useGetOrder';
export * from './useGetOrders';
```

### `src/features/order/api/mutations/index.ts` (Internal Barrel)

```typescript
export * from './useCreateOrderMutation';
export * from './useUpdateOrderMutation';
```

### `src/features/order/api/index.ts` (Public Barrel)

This is the **only file** components should import from. It **only** exports the hooks.

```typescript
export * from './queries';
export * from './mutations';
```

## Usage in App

### Initialize in Root Layout (`src/app/_layout.tsx`)

```typescript
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient, setupInterceptors } from '@/core/api';
import { useEffect } from 'react';

export default function RootLayout() {
  useEffect(() => {
    // Setup Axios interceptors on app start
    setupInterceptors();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Your routes (e.g., <Slot /> or <Stack />) */}
    </QueryClientProvider>
  );
}
```

### Use in Components (within the same feature)

```typescript
// src/features/order/screens/OrderScreen.tsx
import { useGetOrder, useCreateOrderMutation } from '@/features/order/api'; // Import from feature's public api
import { View, Text, Button } from 'react-native';

export function OrderProfile({ orderId }: { orderId: string }) {
  const { data, isLoading } = useGetOrder(orderId);
  const { mutate: createOrder, isPending } = useCreateOrderMutation();

  const handleCreate = () => {
    createOrder({ /* ... CreateOrderDto ... */ });
  };

  return (
    <View>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Text>{data?.data.id}</Text>
          <Button
            onPress={handleCreate}
            title="Create New Order"
            disabled={isPending}
          />
        </>
      )}
    </View>
  );
}
```

## Best Practices

✅ **Separation of Concerns**

- **`core/api`**: Handles *how* requests are made (client, auth, query client).
- **`features/[name]/api`**: Handles *what* requests are made (endpoints, hooks).

✅ **Encapsulation**

- A feature's public API is its hooks (`@/features/order/api`).
- Raw endpoint functions (`orderApi`) are internal details.

✅ **Type Safety**

- Global types in `core/api/types.ts`.
- Feature-specific DTOs in `features/[name]/types/`.

✅ **Error Handling**

- Global errors (401, 500) handled in `core/api/interceptors.ts`.
- Specific errors (404, 400) handled in components via `useQuery`'s `error` state.

✅ **Caching Strategy**

- `queryClient` in `core/api` sets global defaults.
- `onSuccess` in feature mutations invalidates relevant query keys.

✅ **Query Keys**

- Use nested arrays: `['orders']`, `['orders', orderId]`
- Enables granular cache invalidation.

✅ **Environment Management**

- Use `expo-constants` for environment-based configs.
- Different API URLs per environment.

## Common Patterns

### Optimistic Updates

```typescript
// In a useMutation hook
onMutate: async (newData) => {
  // Cancel any outgoing refetches
  await queryClient.cancelQueries({ queryKey: ['orders', newData.id] });

  // Snapshot the previous value
  const previousData = queryClient.getQueryData(['orders', newData.id]);

  // Optimistically update to the new value
  queryClient.setQueryData(['orders', newData.id], newData);

  // Return a context object with the snapshotted value
  return { previousData };
},
onError: (err, newData, context) => {
  // Roll back to the previous value on error
  if (context?.previousData) {
    queryClient.setQueryData(['orders', newData.id], context.previousData);
  }
},
onSettled: (newData) => {
  // Always refetch after error or success
  queryClient.invalidateQueries({ queryKey: ['orders', newData.id] });
},
```

### Dependent Queries

```typescript
const { data: user } = useGetUser(userId);
const { data: posts } = useGetUserPosts(user?.data.id, {
  // `enabled` ensures this query does not run until `user.data.id` is available
  enabled: !!user?.data.id,
});
```

### Pagination

```typescript
const [page, setPage] = useState(1);
const { data } = useQuery({
  queryKey: ['orders', page],
  queryFn: () => orderApi.listOrders({ page, limit: 20 }),
  keepPreviousData: true, // Prevents UI flicker when changing pages
});
```

### Infinite Queries (for "Load More" lists)

```typescript
const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ['orders'],
  queryFn: ({ pageParam = 1 }) => orderApi.listOrders({ page: pageParam, limit: 20 }),
  initialPageParam: 1,
  getNextPageParam: (lastPage, allPages) => {
    const nextPage = lastPage.items.length ? allPages.length + 1 : undefined;
    return nextPage;
  },
});
```

## Tools

- **React Query DevTools**: Inspect queries, mutations, and cache.
- **Axios Interceptors**: Log all requests/responses for debugging.
- **TypeScript**: Full type checking at compile time.

## References

- [TanStack Query (React Query) Docs](https://tanstack.com/query/latest)
- [Axios Documentation](https://axios-http.com/docs/intro)
- [Modular Architecture Patterns](https://khalilstemmler.com/articles/enterprise-typescript-nodejs/application-layer-imports-domain-layer/)
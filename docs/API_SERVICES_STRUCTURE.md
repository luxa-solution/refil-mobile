# API & Services Architecture

This document outlines the recommended structure for organizing API calls, services, and data fetching using **Axios** and **React Query (TanStack Query)** with best practices for reusability, type safety, and maintainability.

## Rationale

- **Separation of Concerns**: API logic is separated from UI components
- **Reusability**: Hooks and endpoints can be used across multiple components
- **Type Safety**: Full TypeScript support with proper typing
- **Caching**: React Query handles automatic caching and synchronization
- **Interceptors**: Centralized auth and error handling
- **Scalability**: Easy to add new endpoints without duplicating code

## Folder Structure

```
src/
├── api/
│   ├── client.ts              # Axios instance configuration
│   ├── interceptors.ts        # Request/response interceptors
│   ├── types.ts               # API response/error types
│   ├── config.ts              # API configuration (base URLs, env)
│   ├── endpoints/             # API endpoint definitions
│   │   ├── auth.ts
│   │   ├── users.ts
│   │   ├── products.ts
│   │   └── index.ts           # Export all endpoints
│   ├── queries/               # React Query hooks (GET requests)
│   │   ├── auth/
│   │   │   ├── useLogin.ts
│   │   │   ├── useLogout.ts
│   │   │   └── index.ts
│   │   ├── users/
│   │   │   ├── useGetUser.ts
│   │   │   ├── useGetUsers.ts
│   │   │   └── index.ts
│   │   ├── products/
│   │   │   ├── useGetProducts.ts
│   │   │   ├── useGetProduct.ts
│   │   │   └── index.ts
│   │   └── index.ts           # Export all query hooks
│   └── mutations/             # React Query mutations (POST/PUT/DELETE)
│       ├── auth/
│       │   ├── useLoginMutation.ts
│       │   ├── useLogoutMutation.ts
│       │   └── index.ts
│       ├── users/
│       │   ├── useUpdateUserMutation.ts
│       │   ├── useCreateUserMutation.ts
│       │   ├── useDeleteUserMutation.ts
│       │   └── index.ts
│       ├── products/
│       │   ├── useCreateProductMutation.ts
│       │   ├── useUpdateProductMutation.ts
│       │   └── index.ts
│       └── index.ts           # Export all mutation hooks
├── core/
│   └── queryClient.ts         # React Query client configuration
└── shared/
    └── utils/
        └── auth.ts            # Auth utilities (token storage, etc)
```

## Implementation Guide

### 1. Axios Instance & Client (`src/api/client.ts`)

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

export const axiosInstance = createAxiosInstance();
```

**Why separate function?** Makes it easier to create multiple instances for different APIs if needed.

### 2. Configuration (`src/api/config.ts`)

Environment-based configuration for different deployment stages.

```typescript
import Constants from 'expo-constants';

const ENV = Constants.expoConfig?.extra?.environment || 'development';

const API_URLS = {
  development: 'https://api-dev.example.com',
  staging: 'https://api-staging.example.com',
  production: 'https://api.example.com',
};

export const API_BASE_URL = API_URLS[ENV as keyof typeof API_URLS];
export const API_TIMEOUT = 10000;
```

### 3. Types (`src/api/types.ts`)

Centralized type definitions for API responses and errors.

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

### 4. Interceptors (`src/api/interceptors.ts`)

Handle authentication, token refresh, and global error handling.

```typescript
import { axiosInstance } from './client';
import { getStoredToken, removeStoredToken } from '@shared/utils/auth';

export const setupInterceptors = async () => {
  // Request interceptor - Add auth token
  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = await getStoredToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor - Handle errors
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      // Handle 401 Unauthorized
      if (error.response?.status === 401) {
        await removeStoredToken();
        // Navigate to login screen
        // router.replace('/auth/login');
      }

      // Handle other errors
      if (error.response?.status >= 500) {
        console.error('Server error:', error.response.status);
      }

      return Promise.reject(error);
    }
  );
};
```

### 5. Endpoints (`src/api/endpoints/users.ts`)

Define endpoint URLs and create reusable API functions.

```typescript
import { axiosInstance } from '../client';
import { ApiResponse } from '../types';

// Type definitions
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Endpoint URLs
export const userEndpoints = {
  getUser: (id: string) => `/users/${id}`,
  updateUser: (id: string) => `/users/${id}`,
  deleteUser: (id: string) => `/users/${id}`,
  listUsers: () => '/users',
};

// API functions
export const userApi = {
  getUser: (id: string) => axiosInstance.get<ApiResponse<User>>(userEndpoints.getUser(id)),

  updateUser: (id: string, data: Partial<User>) =>
    axiosInstance.patch<ApiResponse<User>>(userEndpoints.updateUser(id), data),

  deleteUser: (id: string) => axiosInstance.delete<ApiResponse<void>>(userEndpoints.deleteUser(id)),

  listUsers: () => axiosInstance.get<ApiResponse<User[]>>(userEndpoints.listUsers()),
};
```

**Benefits:**

- URLs are centralized and easy to update
- Functions return typed responses
- Consistent error handling

### 6. React Query Configuration (`src/core/queryClient.ts`)

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

### 7. Query Hooks (`src/api/queries/users/useGetUser.ts`)

Create reusable hooks for data fetching with React Query.

```typescript
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { userApi, User } from '../../endpoints/users';
import { ApiError, ApiResponse } from '../../types';

export const useGetUser = (id: string, options?: UseQueryOptions<ApiResponse<User>, ApiError>) => {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => userApi.getUser(id).then((res) => res.data),
    enabled: !!id, // Only run if id exists
    ...options,
  });
};
```

**Usage in components:**

```typescript
const { data, isLoading, error } = useGetUser('user-123');

if (isLoading) return <Text>Loading...</Text>;
if (error) return <Text>Error: {error.message}</Text>;
return <Text>{data?.data.name}</Text>;
```

### 8. Mutation Hooks (`src/api/mutations/users/useUpdateUserMutation.ts`)

Create reusable hooks for mutations with automatic cache invalidation.

```typescript
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { userApi, User } from '../../endpoints/users';
import { ApiError, ApiResponse } from '../../types';
import { queryClient } from '../../../core/queryClient';

export const useUpdateUserMutation = (
  options?: UseMutationOptions<ApiResponse<User>, ApiError, { id: string; data: Partial<User> }>
) => {
  return useMutation({
    mutationFn: ({ id, data }) => userApi.updateUser(id, data).then((res) => res.data),
    onSuccess: (data) => {
      // Invalidate and refetch the user data
      queryClient.invalidateQueries({ queryKey: ['users', data.data.id] });
      // Or update the cache directly
      queryClient.setQueryData(['users', data.data.id], data);
    },
    ...options,
  });
};
```

**Usage in components:**

```typescript
const mutation = useUpdateUserMutation();

const handleUpdate = () => {
  mutation.mutate({
    id: 'user-123',
    data: { name: 'New Name' },
  });
};

if (mutation.isPending) return <Text>Updating...</Text>;
```

## Export Files

### `src/api/endpoints/index.ts`

```typescript
export * from './auth';
export * from './users';
export * from './products';
```

### `src/api/queries/index.ts`

```typescript
export * from './auth';
export * from './users';
export * from './products';
```

### `src/api/mutations/index.ts`

```typescript
export * from './auth';
export * from './users';
export * from './products';
```

## Usage in App

### Initialize in Root Layout (`src/app/_layout.tsx`)

```typescript
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/core/queryClient';
import { setupInterceptors } from '@/api/interceptors';
import { useEffect } from 'react';

export default function RootLayout() {
  useEffect(() => {
    setupInterceptors();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Your routes */}
    </QueryClientProvider>
  );
}
```

### Use in Components

```typescript
import { useGetUser } from '@/api/queries';
import { useUpdateUserMutation } from '@/api/mutations';

export function UserProfile({ userId }: { userId: string }) {
  const { data, isLoading } = useGetUser(userId);
  const { mutate: updateUser } = useUpdateUserMutation();

  return (
    <View>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Text>{data?.data.name}</Text>
          <Button
            onPress={() =>
              updateUser({
                id: userId,
                data: { name: 'Updated Name' },
              })
            }
            title="Update"
          />
        </>
      )}
    </View>
  );
}
```

## Best Practices

✅ **Separation of Concerns**

- API logic in `api/endpoints`
- React Query logic in `api/queries` and `api/mutations`
- UI components in features

✅ **Reusability**

- One hook per API operation
- Hooks can be composed and used in multiple components
- Avoid duplicating API calls

✅ **Type Safety**

- Full TypeScript support for all API operations
- Shared type definitions in `api/types.ts`
- Response types enforced at query level

✅ **Error Handling**

- Centralized in interceptors for request/response
- Individual error handling in hooks if needed
- Proper error messages for UI feedback

✅ **Caching Strategy**

- Use staleTime to control when data becomes stale
- Use gcTime to control when data is garbage collected
- Invalidate queries when mutations succeed
- Use setQueryData for optimistic updates

✅ **Query Keys**

- Use nested arrays: `['users', userId]`
- Enables granular cache invalidation
- Easy to debug with React Query DevTools

✅ **Environment Management**

- Use expo-constants for environment-based configs
- Different API URLs per environment
- Easy to switch between dev/staging/prod

## Common Patterns

### Optimistic Updates

```typescript
onMutate: (newData) => {
  const previousData = queryClient.getQueryData(['users', newData.id]);
  queryClient.setQueryData(['users', newData.id], newData);
  return previousData;
},
onError: (error, newData, rollback) => {
  if (rollback) queryClient.setQueryData(['users', newData.id], rollback);
}
```

### Dependent Queries

```typescript
const { data: user } = useGetUser(userId);
const { data: posts } = useGetUserPosts(user?.data.id, {
  enabled: !!user?.data.id, // Only run when user is loaded
});
```

### Pagination

```typescript
const [page, setPage] = useState(1);
const { data } = useQuery({
  queryKey: ['users', page],
  queryFn: () => userApi.listUsers({ page, limit: 20 }),
});
```

### Infinite Queries (for lists)

```typescript
const { data, fetchNextPage } = useInfiniteQuery({
  queryKey: ['users'],
  queryFn: ({ pageParam }) => userApi.listUsers({ page: pageParam, limit: 20 }),
  initialPageParam: 1,
  getNextPageParam: (lastPage) => lastPage.nextPage,
});
```

## Tools

- **React Query DevTools**: Inspect queries, mutations, and cache
- **Axios DevTools/Interceptor**: Log all requests/responses
- **TypeScript**: Full type checking at compile time

## References

- [React Query Documentation](https://tanstack.com/query/latest)
- [Axios Documentation](https://axios-http.com/docs/intro)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

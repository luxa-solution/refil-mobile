# Project Structure - Modular Feature-Based Architecture

This project follows a **modular, feature-based architecture** pattern organized under the `src/` folder. This structure promotes scalability, maintainability, and a strict separation of concerns enforced by ESLint.

## Overview

```
refil-mobile/
├── src/
│   ├── app/              # Routing Layer (Expo Router)
│   ├── core/             # Core logic (API client, theme, i18n config)
│   ├── features/         # All feature modules (business logic)
│   ├── shared/           # Shared components, hooks, shared state
│   └── translation/      # Language JSON files
│
├── assets/             # Images, icons, fonts
├── app.json
├── tsconfig.json       # TypeScript config with path aliases
├── babel.config.js
└── eslint.config.js    # Enforces module boundaries
```

## Module Boundaries (Strictly Enforced)

Imports flow in one direction. A module can **only** import from modules *below* it.

1. `app` (Routes)
   * Can import from `features`, `shared`, `core`.
2. `features` (Business Logic)
   * Can import from `shared`, `core`.
   * **Cannot** import from `app` or other features.
3. `shared` (Reusable UI/Logic)
   * Can import from `core`.
   * **Cannot** import from `app` or `features`.
4. `core` (Base Layer)
   * **Cannot** import from any other module.

## Detailed Structure

### `src/app/` - Routing Layer

Contains all routes and layouts, managed by **Expo Router**. This layer connects your features to the UI.

```
src/app/
├── _layout.tsx           # Root layout
├── +not-found.tsx        # 404 screen
└── (tabs)/
    ├── _layout.tsx       # Tab navigation layout
    ├── index.tsx         # Imports a screen from '@/features/home/screens'
    └── two.tsx           # Imports a screen from '@/features/home/screens'
```

**Import Alias:** `@/app`

### `src/core/` - Core Layer

The application's foundation. Has no dependencies on any other module.

```
src/core/
├── api/
│   ├── client.ts         # Axios instance
│   ├── config.ts         # Environment config
│   ├── interceptors.ts   # Request/Response interceptors
│   ├── queryClient.ts    # React Query client configuration
│   ├── types.ts          # Global API types (ApiError, etc)
│   └── index.ts          # Exports client, setupInterceptors
├── i18n/
│   ├── init.ts           # i18next initialization
│   ├── fallbackChecker.ts
│   └── languageDetector.ts
└── styles/
    ├── breakpoints.ts    # Unistyles breakpoints
    ├── theme.ts          # Theme definition
    └── unistyles.ts      # Unistyles plugin registration
```

**Import Alias:** `@/core`

### `src/features/` - Feature Modules

Each feature is self-contained with its own components, hooks, screens, API logic, and state.

```
src/features/
├── home/
│   ├── components/
│   │   ├── EditScreenInfo/
│   │   └── index.ts
│   ├── screens/
│   │   ├── ScreenOne.tsx
│   │   └── index.ts
│   └── hooks/
│       └── index.ts
│
├── auth/
│   ├── api/              # Feature-specific API
│   │   ├── endpoints.ts  # INTERNAL
│   │   ├── mutations/    # Public hooks
│   │   ├── queries/      # Public hooks
│   │   └── index.ts      # PUBLIC BARREL (exports hooks)
│   ├── components/       # Components used only in 'auth'
│   ├── hooks/            # Hooks used only in 'auth'
│   ├── screens/
│   │   └── LoginScreen.tsx
│   ├── store/            # State (Zustand) for this feature
│   └── types/            # DTOs and types for this feature
│
└── order/
    ├── api/
    │   ├── endpoints.ts
    │   ├── mutations/
    │   └── queries/
    ├── components/
    ├── screens/
    └── types/
        └── order.dtos.ts
```

**Import Aliasing:** `@/features/auth/api`, `@/features/home/components`, etc.

### `src/shared/` - Reusable Components & Utilities

Components, hooks, and state used across multiple features. **Cannot** depend on any feature.

```
src/shared/
├── components/           # Shared UI (Button, Container, etc.)
│   ├── Button/
│   ├── Container/
│   └── index.ts          # Barrel export for all shared components
├── hooks/
│   ├── useExampleHook.ts
│   └── index.ts          # Barrel export for all shared hooks
├── store/
│   ├── notificationStore.ts
│   └── index.ts          # Barrel export for all shared stores
└── types/
    └── index.ts
```

**Import Alias:** `@/shared` (e.g., `@/shared/components`, `@/shared/hooks`)

### `src/translation/` - Internationalization

Translation files and i18n resource loading.

```
src/translation/
├── en.json
├── fr.json
└── index.ts              # Exports the resources
```

**Import Alias:** `@/translation`

## Import Aliases

The project uses TypeScript path aliases (`tsconfig.json`) for clean, absolute imports.

```json
{
  "paths": {
    "@/*": ["src/*"],
    "@/core/*": ["src/core/*"],
    "@/shared/*": ["src/shared/*"],
    "@/features/*": ["src/features/*"],
    "@/app/*": ["src/app/*"],
    "@/translation": ["src/translation"]
  }
}
```

### Usage Examples

```typescript
// Instead of: import { Button } from '../../../shared/components/Button';
// Use:
import { Button } from '@/shared/components';

// Feature imports
import { ScreenContent } from '@/features/home/components';
import { useGetOrder } from '@/features/order/api';

// Core utilities
import { client } from '@/core/api';
import { theme } from '@/core/styles';
```

## File Organization Best Practices

### Feature Structure Template

When creating a new feature, follow this structure:

```
src/features/my-feature/
├── api/
│   ├── mutations/
│   ├── queries/
│   ├── endpoints.ts      # Internal logic
│   └── index.ts          # Public barrel for hooks
├── components/
│   ├── MyComponent/
│   └── index.ts          # Public barrel for components
├── hooks/
│   └── index.ts          # Public barrel for hooks
├── screens/
│   ├── MyFeatureScreen.tsx
│   └── index.ts          # Public barrel for screens
├── store/
│   ├── myFeatureStore.ts
│   └── index.ts          # Public barrel for stores
└── types/
    ├── myFeature.dto.ts
    └── index.ts          # Public barrel for types
```

### Component File Organization

```
src/shared/components/MyComponent/
├── MyComponent.tsx           # Component implementation
├── MyComponent.style.ts      # Component styles (Unistyles)
└── index.ts                  # Export (export * from './MyComponent')
```

## Benefits of This Structure

✅ **Scalability** - Easy to add new features without affecting existing code.
✅ **Maintainability** - Related code is co-located within its feature module.
✅ **Reusability** - Clear separation between `shared` and `feature` code.
✅ **Team Collaboration** - Different teams can own different feature modules.
✅ **Clear Dependencies** - ESLint enforces `core` -> `shared` -> `features` -> `app`.
✅ **Testing** - Features can be tested in isolation.

## API & Services Layer

The API layer is split into two parts:

1. **Core Client (`src/core/api`):**
   Contains the single, shared **Axios instance**, base configuration, interceptors (for auth tokens, error handling, etc.), and the **React Query Client**.

2. **Feature API (`src/features/[name]/api`):**
   Each feature defines its own **endpoints**, **React Query hooks**, and **types (DTOs)**. These modules import the core `client` to make the actual requests.

See [**`API_STRUCTURE.md`**](./API_SERVICES_STRUCTURE.md) for a detailed implementation guide.
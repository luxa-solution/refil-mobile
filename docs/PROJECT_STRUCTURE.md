# Project Structure - Feature-Based Architecture

This project follows a **feature-based architecture** pattern organized under the `src/` folder. This structure promotes scalability, maintainability, and clear separation of concerns.

## Overview

```
refil-mobile/
├── src/                          # All source code
│   ├── api/                      # API & services (Axios + React Query)
│   ├── app/                      # Expo Router - App routing & entry points
│   ├── core/                     # Core utilities & configuration
│   ├── features/                 # Feature modules (main business logic)
│   ├── shared/                   # Shared components & utilities
│   ├── store/                    # State management (Redux/Zustand)
│   ├── translation/              # i18n translations
│   ├── breakpoints.ts            # Responsive design breakpoints
│   ├── theme.ts                  # Theme configuration
│   └── unistyles.ts              # Styling setup
├── assets/                       # Images, icons, fonts
├── app.json                      # Expo configuration
├── tsconfig.json                 # TypeScript configuration with path aliases
├── babel.config.js               # Babel configuration
└── package.json
```

## Detailed Structure

### `src/app/` - Routing Layer

Expo Router configuration. Handles all navigation and screen registration.

```
src/app/
├── _layout.tsx              # Root layout
├── modal.tsx                # Modal screen
├── +html.tsx                # HTML setup
├── +not-found.tsx           # 404 not found
└── (tabs)/
    ├── _layout.tsx          # Tab navigation layout
    ├── index.tsx            # Home tab
    └── two.tsx              # Second tab
```

**Import path:** `@/app/*`

### `src/core/` - Core Utilities

Shared utilities and configuration that don't belong to any specific feature.

```
src/core/
├── i18n/                    # Internationalization
│   ├── init.ts              # i18n initialization
│   ├── fallbackChecker.ts   # Language fallback logic
│   └── languageDetector.ts  # Device language detection
└── theme/                   # Theme utilities (if needed)
```

**Import path:** `@/core/*`

### `src/features/` - Feature Modules

Each feature is self-contained with its own components, hooks, screens, and utils.

```
src/features/
├── home/                    # Home feature
│   ├── screens/             # Feature screens
│   ├── components/          # Feature-specific components
│   │   ├── ScreenContent/
│   │   └── EditScreenInfo/
│   ├── hooks/               # Feature-specific hooks
│   └── index.ts             # Feature exports
├── modal/                   # Modal feature
│   ├── components/
│   │   └── InternalizationExample/
│   └── index.ts
├── tabs/                    # Tab navigation feature
│   └── ...
└── settings/                # Settings feature (placeholder)
    └── ...
```

**Import paths:**

```typescript
import { ScreenContent } from '@/features/home';
import { InternalizationExample } from '@/features/modal';
```

### `src/shared/` - Reusable Components & Utilities

Components and utilities that are used across multiple features.

```
src/shared/
├── components/              # Shared UI components
│   ├── Button/
│   │   ├── Button.tsx
│   │   └── index.ts
│   ├── Container/
│   │   ├── Container.tsx
│   │   └── index.ts
│   ├── HeaderButton/
│   │   ├── HeaderButton.tsx
│   │   └── index.ts
│   └── TabBarIcon/
│       ├── TabBarIcon.tsx
│       └── index.ts
├── hooks/                   # Custom hooks
├── utils/                   # Utility functions
└── index.ts                 # Barrel export
```

**Import paths:**

```typescript
// Direct import
import { Button } from '@/shared/components/Button/Button';

// Via index (recommended)
import { Button } from '@/shared';
```

### `src/store/` - State Management

Redux slices, store configuration, or Zustand stores.

```
src/store/
├── store.ts                 # Main store configuration
└── slices/                  # Redux slices or Zustand stores
```

**Import path:** `@/store/*`

### `src/translation/` - Internationalization

Translation files and i18n initialization.

```
src/translation/
├── en.json                  # English translations
├── fr.json                  # French translations
└── index.ts                 # i18n initialization & resource setup
```

**Import path:** `@/translation/*`

### Root-level Config Files

- `src/theme.ts` - Theme constants and configuration
- `src/unistyles.ts` - Unistyles configuration
- `src/breakpoints.ts` - Responsive design breakpoints

## Import Aliases

The project uses TypeScript path aliases for clean imports. All aliases start with `@/` and map to the `src/` folder:

```json
{
  "@/*": ["src/*"],
  "@/core/*": ["src/core/*"],
  "@/shared/*": ["src/shared/*"],
  "@/features/*": ["src/features/*"],
  "@/store/*": ["src/store/*"],
  "@/translation/*": ["src/translation/*"],
  "@/app/*": ["src/app/*"]
}
```

### Usage Examples

```typescript
// Instead of: import { Button } from '../../../shared/components/Button';
// Use:
import { Button } from '@/shared/components/Button/Button';

// Or via barrel export:
import { Button } from '@/shared';

// Feature imports
import { ScreenContent } from '@/features/home';

// Core utilities
import { init18n } from '@/core/i18n/init';

// App routing
import { useRouter } from '@/app/_layout';
```

## File Organization Best Practices

### Feature Structure Template

When creating a new feature, follow this structure:

```
src/features/my-feature/
├── screens/                 # Feature screens
│   └── MyFeatureScreen.tsx
├── components/              # Feature-specific components
│   ├── MyComponent/
│   │   ├── MyComponent.tsx
│   │   └── MyComponent.styles.ts
│   └── AnotherComponent/
│       └── ...
├── hooks/                   # Feature-specific custom hooks
│   └── useMyFeatureLogic.ts
├── utils/                   # Feature-specific utilities
│   └── helpers.ts
└── index.ts                 # Barrel export
```

### Component File Organization

```
src/shared/components/MyComponent/
├── MyComponent.tsx          # Component implementation
├── MyComponent.styles.ts    # Component styles (optional)
├── MyComponent.test.tsx     # Tests (optional)
├── MyComponent.types.ts     # TypeScript types (optional)
└── index.ts                 # Export (export * from './MyComponent')
```

## Benefits of This Structure

✅ **Scalability** - Easy to add new features without affecting existing code
✅ **Maintainability** - Related code is grouped together
✅ **Reusability** - Shared components in a dedicated location
✅ **Team Collaboration** - Different teams can work on different features
✅ **Clear Dependencies** - Features depend on core and shared, not vice versa
✅ **Testing** - Features can be tested independently
✅ **Code Splitting** - Easy to implement lazy loading per feature

## Adding a New Feature

1. Create a new folder under `src/features/`
2. Add `screens/`, `components/`, and `hooks/` directories
3. Create an `index.ts` file with barrel exports
4. Import components using path aliases

Example:

```typescript
// src/features/profile/index.ts
export { ProfileScreen } from './screens/ProfileScreen';
export { ProfileCard } from './components/ProfileCard/ProfileCard';
```

Then import from anywhere:

```typescript
import { ProfileScreen, ProfileCard } from '@/features/profile';
```

## API & Services Layer

The project uses **Axios** and **React Query (TanStack Query)** for API calls and data management. See **[API_SERVICES_STRUCTURE.md](./API_SERVICES_STRUCTURE.md)** for detailed implementation guidelines.

Quick overview:

- `src/api/client.ts` - Axios instance configuration
- `src/api/endpoints/` - API endpoint definitions
- `src/api/queries/` - React Query hooks for fetching
- `src/api/mutations/` - React Query mutations for mutations
- `src/core/queryClient.ts` - React Query client setup

## Next Steps

- Add shared hooks under `src/shared/hooks/`
- Create feature-specific utilities under `src/features/[feature]/utils/`
- Set up Redux/Zustand slices in `src/store/slices/`
- Add more translation files as needed
- Implement API layer following [API_SERVICES_STRUCTURE.md](./API_SERVICES_STRUCTURE.md)

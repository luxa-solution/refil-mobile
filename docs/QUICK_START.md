# Quick Start Guide - Modular Feature-Based Architecture

## 📚 Important Files & Their Location

| Purpose | Location | Import Path |
| :--- | :--- | :--- |
| **App Routing** | `src/app/*` | (Managed by Expo Router) |
| **Core Client/Config** | `src/core/*` | `@/core/*` |
| ┣ API Client & Config | `src/core/api/*` | `@/core/api/*` |
| ┣ i18n Config | `src/core/i18n/*` | `@/core/i18n/*` |
| ┣ Styling & Theme | `src/core/styles/*` | `@/core/styles/*` |
| **Shared Code** | `src/shared/*` | `@/shared/*` |
| ┣ Shared UI Components | `src/shared/components/*` | `@/shared/components/*` |
| ┣ Shared Hooks | `src/shared/hooks/*` | `@/shared/hooks/*` |
| ┣ Shared State | `src/shared/store/*` | `@/shared/store/*` |
| ┣ Shared Types | `src/shared/types/*` | `@/shared/types/*` |
| **Feature Code** | `src/features/[name]/*` | `@/features/[name]/*` |
| ┣ Feature Screens | `src/features/[name]/screens/*` | `@/features/[name]/screens/*` |
| ┣ Feature Components | `src/features/[name]/components/*` | `@/features/[name]/components/*` |
| ┣ Feature API Hooks | `src/features/[name]/api/*` | `@/features/[name]/api/*` |
| ┣ Feature State | `src/features/[name]/store/*` | `@/features/[name]/store/*` |
| ┣ Feature Types | `src/features/[name]/types/*` | `@/features/[name]/types/*` |
| **Translation Files** | `src/translation/*` | `@/translation/*` |

## 🎯 Creating a New Feature

### Step 1: Create Feature Directory

```bash
mkdir -p src/features/my-feature/{screens,components,hooks,api/{mutations,queries},store,types}
```

### Step 2: Create Main Component & Style

```typescript
// src/features/my-feature/components/MyComponent/MyComponent.tsx
import { View, Text } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { styles } from './MyComponent.style';

export const MyComponent = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>My Feature Component</Text>
    </View>
  );
};
```

```typescript
// src/features/my-feature/components/MyComponent/MyComponent.style.ts
import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  text: {
    color: theme.colors.foreground,
  },
}));
```

### Step 3: Create Feature Index (Barrel Export)

Create an `index.ts` file **inside each sub-directory** to export its public contents.

```typescript
// src/features/my-feature/components/MyComponent/index.ts
export * from './MyComponent';

// src/features/my-feature/components/index.ts
// This file makes components available to other features (if allowed)
// or to the app layer.
export * from './MyComponent'; 

// src/features/my-feature/screens/index.ts
export * from './MyScreen';
```

### Step 4: Use in Your App

Import screens in `src/app/` and components in other features.

```typescript
// src/app/my-route.tsx
import { MyScreen } from '@/features/my-feature/screens';

export default function MyRoute() {
  return <MyScreen />;
}
```

## 🔄 Creating a Shared Component

### Step 1: Create Component Directory

```bash
mkdir -p src/shared/components/MySharedComponent
```

### Step 2: Add Files

```
src/shared/components/MySharedComponent/
├── MySharedComponent.tsx
├── MySharedComponent.style.ts
└── index.ts
```

### Step 3: Component Export

```typescript
// src/shared/components/MySharedComponent/index.ts
export * from './MySharedComponent';
```

### Step 4: Update Shared Index

Add your new component to the main barrel file for **shared components**.

```typescript
// src/shared/components/index.ts
export * from './MySharedComponent';
export * from './Button';
export * from './Container';
```

### Step 5: Import Anywhere

Import to `features` or `app`. **Never** import to `core` or other `shared` modules (to avoid circular dependencies).

```typescript
import { MySharedComponent } from '@/shared/components';
```

## 💡 Import Examples

Our ESLint rules enforce a strict hierarchy: `core` -> `shared` -> `features` -> `app`.

### ✅ Good Practices (Allowed)

```typescript
// A feature importing from `shared` and `core`
import { Button, Container } from '@/shared/components';
import { useNotificationStore } from '@/shared/store';
import { queryClient } from '@/core/api';

// An app route importing from a `feature`
import { ScreenContent } from '@/features/home/components';

// A feature hook importing from `core`
import { client } from '@/core/api';
```

### ❌ Avoid (Disallowed by ESLint)

```typescript
// ❌ DON'T use relative paths across modules
import { Button } from '../../shared/components/Button';

// ❌ DON'T let `shared` import from a `feature`
// (File: src/shared/components/Button.tsx)
import { HomeScreen } from '@/features/home/screens'; // NOT ALLOWED

// ❌ DON'T let `core` import from `shared` or `features`
// (File: src/core/api/client.ts)
import { useAuthStore } from '@/features/auth/store'; // NOT ALLOWED
```

## 🏗️ Feature Structure Template

```typescript
// src/features/my-feature/screens/MyScreen.tsx
import { View } from 'react-native';
import { useCustomHook } from '../hooks/useCustomHook';
import { MyComponent } from '../components/MyComponent';
import { useExampleHook } from '@/shared/hooks'; // OK: shared -> feature
import { queryClient } from '@/core/api'; // OK: core -> feature

export const MyScreen = () => {
  const data = useCustomHook();
  const sharedData = useExampleHook();

  return (
    <View>
      <MyComponent data={data} />
    </View>
  );
};
```

## 🚀 Adding Custom Hooks

### Shared Hooks

Place in `src/shared/hooks/useMyHook.ts`. Then export from `src/shared/hooks/index.ts`:

```typescript
// src/shared/hooks/index.ts
export { useMyHook } from './useMyHook';
```

Import in any feature: `import { useMyHook } from '@/shared/hooks';`

### Feature-Specific Hooks

Place in `src/features/my-feature/hooks/useMyFeatureHook.ts`. Then export from `src/features/my-feature/hooks/index.ts`:

```typescript
// src/features/my-feature/hooks/index.ts
export { useMyFeatureHook } from './useMyFeatureHook';
```

Import **only** within the `my-feature` module.

## 📦 Organizing by Feature

Each feature is a self-contained module. Public exports are managed by barrel `index.ts` files in each sub-directory.

```
src/features/user-profile/
├── api/
│   ├── mutations/
│   │   ├── useUpdateProfileMutation.ts
│   │   └── index.ts  # Exports mutation hooks
│   ├── queries/
│   │   ├── useGetProfile.ts
│   │   └── index.ts  # Exports query hooks
│   ├── endpoints.ts  # INTERNAL: Not exported from api/index.ts
│   └── index.ts      # PUBLIC: Re-exports from ./mutations and ./queries
├── screens/
│   ├── ProfileScreen.tsx
│   └── index.ts      # Exports ProfileScreen
├── components/
│   ├── ProfileHeader/
│   └── index.ts      # Exports ProfileHeader
├── hooks/
│   ├── useUserProfile.ts
│   └── index.ts      # Exports useUserProfile
├── store/
│   ├── profileStore.ts
│   └── index.ts      # Exports profileStore
└── types/
    ├── profile.dto.ts
    └── index.ts      # Exports types
```

## ✅ Checklist for Adding New Features

- [ ] Created feature folder under `src/features/`
- [ ] Added `screens/`, `components/`, `hooks/`, `api/`, `store/`, `types/`
- [ ] Created `index.ts` barrel files inside *each* sub-directory for public exports.
- [ ] Used `@/features/[feature-name]/screens` (etc.) for imports.
- [ ] Ensured feature only imports from `shared` or `core`.
- [ ] Added corresponding route in `src/app/`.
- [ ] Tested imports work correctly and pass ESLint checks.

## 🔗 Useful Resources

- See `PROJECT_STRUCTURE.md` for detailed architecture overview.
- Check existing features for examples: `src/features/home/`, `src/features/order/`.
- Review `src/shared/components` for shared component patterns.

## 🆘 Troubleshooting

**Import paths not resolving?**

- Make sure `tsconfig.json` has the path alias configured.
- Restart your development server.
- Verify the file actually exists at the path.

**Can't find barrel export?**

- Check that an `index.ts` file exists in the module's sub-folder (e.g., `components/index.ts`).
- Verify the `export * from ...` statement is correct.

**Module resolution errors or ESLint boundary errors?**

- Check that you are not violating the import hierarchy (`core` -> `shared` -> `features` -> `app`).
- Clear cache: `pnpm store prune`.
- Restart Metro: Kill the development server and restart with `pnpm exec expo run:android --clear`.

## 📚 Next Steps

1. Review the [`PROJECT_STRUCTURE.md`](./PROJECT_STRUCTURE.md) for full details.
2. Study existing features for patterns.
3. Create your first feature following the template above.
4. Share feedback and suggestions for improvements!
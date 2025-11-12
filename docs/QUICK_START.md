# Quick Start Guide - Feature-Based Architecture

## 📚 Important Files & Their Location

| Purpose              | Location                                               | Import Path                                 |
| -------------------- | ------------------------------------------------------ | ------------------------------------------- |
| Shared UI Components | `src/shared/components/`                               | `@/shared/components/ComponentName`         |
| Feature Components   | `src/features/[feature]/components/`                   | `@/features/[feature]`                      |
| Feature Screens      | `src/features/[feature]/screens/`                      | `@/features/[feature]`                      |
| Custom Hooks         | `src/shared/hooks/` or `src/features/[feature]/hooks/` | `@/shared/hooks/` or `@/features/[feature]` |
| Core Utilities       | `src/core/`                                            | `@/core/`                                   |
| i18n Setup           | `src/translation/`                                     | `@/translation/`                            |
| State Management     | `src/store/`                                           | `@/store/`                                  |
| App Routing          | `src/app/`                                             | `@/app/`                                    |
| Styling Config       | `src/theme.ts`, `src/unistyles.ts`                     | Import directly                             |

## 🎯 Creating a New Feature

### Step 1: Create Feature Directory

```bash
mkdir -p src/features/my-feature/{screens,components,hooks,utils}
```

### Step 2: Create Main Component

```typescript
// src/features/my-feature/components/MyComponent.tsx
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export const MyComponent = () => {
  return (
    <View style={styles.container}>
      <Text>My Feature Component</Text>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}));
```

### Step 3: Create Feature Index (Barrel Export)

```typescript
// src/features/my-feature/index.ts
export { MyComponent } from './components/MyComponent';
export { MyScreen } from './screens/MyScreen';
```

### Step 4: Use in Your App

```typescript
// src/app/my-route.tsx
import { MyComponent } from '@/features/my-feature';

export default function MyRoute() {
  return <MyComponent />;
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
├── MySharedComponent.styles.ts (optional)
└── index.ts
```

### Step 3: Component Export

```typescript
// src/shared/components/MySharedComponent/index.ts
export * from './MySharedComponent';
```

### Step 4: Update Shared Index

```typescript
// src/shared/index.ts
export { MySharedComponent } from './components/MySharedComponent';
```

### Step 5: Import Anywhere

```typescript
import { MySharedComponent } from '@/shared';
```

## 💡 Import Examples

### ✅ Good Practices

```typescript
// Use barrel exports from index files
import { ScreenContent } from '@/features/home';
import { Button, Container } from '@/shared';
import { init18n } from '@/core/i18n/init';

// Use @ aliases consistently
import { useCustomHook } from '@/shared/hooks';
```

### ❌ Avoid

```typescript
// Don't use relative paths
import { Button } from '../../../shared/components/Button';

// Don't import from non-existent barrel exports
import { SomeComponent } from '@/features/my-feature'; // if index.ts doesn't export it
```

## 🏗️ Feature Structure Template

```typescript
// src/features/my-feature/screens/MyScreen.tsx
import { View } from 'react-native';
import { useCustomHook } from '../hooks/useCustomHook';
import { MyComponent } from '../components/MyComponent';
import { sharedUtility } from '@/shared/utils';

export const MyScreen = () => {
  const data = useCustomHook();

  return (
    <View>
      <MyComponent data={data} />
    </View>
  );
};
```

## 🚀 Adding Custom Hooks

```typescript
// src/shared/hooks/useMyHook.ts
import { useState, useEffect } from 'react';

export const useMyHook = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Hook logic
  }, []);

  return data;
};
```

Then export from `src/shared/hooks/index.ts`:

```typescript
export { useMyHook } from './useMyHook';
```

And import anywhere:

```typescript
import { useMyHook } from '@/shared/hooks';
```

## 📦 Organizing by Feature

Each feature should be independent and contain:

```
src/features/user-profile/
├── screens/
│   └── ProfileScreen.tsx
├── components/
│   ├── ProfileHeader/
│   │   ├── ProfileHeader.tsx
│   │   └── index.ts
│   └── ProfileStats/
│       ├── ProfileStats.tsx
│       └── index.ts
├── hooks/
│   ├── useUserProfile.ts
│   └── index.ts
├── utils/
│   └── formatUserData.ts
└── index.ts  # ← Don't forget this!
```

## ✅ Checklist for Adding New Features

- [ ] Created feature folder under `src/features/`
- [ ] Added `screens/`, `components/`, `hooks/` directories
- [ ] Created `index.ts` with barrel exports
- [ ] Updated feature's `index.ts` to export main items
- [ ] Used `@/features/[feature-name]` in imports
- [ ] Added corresponding route in `src/app/`
- [ ] Tested imports work correctly

## 🔗 Useful Resources

- See `PROJECT_STRUCTURE.md` for detailed architecture overview
- Check existing features for examples: `src/features/home/`, `src/features/modal/`
- Review `src/shared/` for shared component patterns

## 🆘 Troubleshooting

**Import paths not resolving?**

- Make sure `tsconfig.json` has the path alias configured
- Restart your development server
- Verify the file actually exists at the path

**Can't find barrel export?**

- Check that `index.ts` file exists in the module
- Verify the export statement is correct
- Make sure you're exporting the right items

**Module resolution errors?**

- Clear cache: `npm cache clean --force` or `pnpm store prune`
- Restart Metro: Kill the development server and restart

## 📚 Next Steps

1. Review the `PROJECT_STRUCTURE.md` for full details
2. Study existing features for patterns
3. Create your first feature following the template above
4. Share feedback and suggestions for improvements!

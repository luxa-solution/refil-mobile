import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useUnistyles } from 'react-native-unistyles';

import { setupAuthInterceptors } from '@/features/auth/api/setupAuthInterceptors';
import '@/translation';

export default function RootLayout() {
  const { theme } = useUnistyles();

  useEffect(() => {
    setupAuthInterceptors();
  }, []);

  return (
    <Stack
      initialRouteName="onboarding"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTitleStyle: {
          color: theme.colors.typography,
        },
        headerTintColor: theme.colors.typography,
        headerShown: false,
      }}>
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="auth" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

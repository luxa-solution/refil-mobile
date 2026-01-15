import { Stack } from 'expo-router';
import { useUnistyles } from 'react-native-unistyles';

import '@/translation';

export default function RootLayout() {
  const { theme } = useUnistyles();

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

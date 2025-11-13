import { Stack } from 'expo-router';
import { useUnistyles } from 'react-native-unistyles';

import '@/translation';

export default function RootLayout() {
  const { theme } = useUnistyles();

  return (
    <Stack
      initialRouteName="(tabs)"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTitleStyle: {
          color: theme.colors.typography,
        },
        headerTintColor: theme.colors.typography,
      }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

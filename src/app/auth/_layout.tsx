import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="welcome" />

      <Stack.Screen name="create-account" />
      <Stack.Screen name="add-password" />

      <Stack.Screen name="otp-verify" />
      <Stack.Screen name="verification-status" />

      <Stack.Screen name="login" />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="reset-password" />

      <Stack.Screen name="add-location" />
    </Stack>
  );
}

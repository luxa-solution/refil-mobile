import { Redirect } from 'expo-router';

import { useOnboardingStore } from '@/features/onboarding/store';

export default function Index() {
  const hasOnboarded = useOnboardingStore((s) => s.hasOnboarded);

  // ====== DEVELOPMENT: To always show onboarding for testing ======
  // Uncomment the line below to force onboarding on every app launch
  return <Redirect href="/onboarding" as any />;
  // ================================================================

  // Show onboarding if user hasn't completed it
  if (!hasOnboarded) return <Redirect href="/onboarding" as any />;

  // Otherwise, go to main app tabs
  return <Redirect href="/(tabs)" as any />;
}

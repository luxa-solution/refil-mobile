import { Redirect, Href } from 'expo-router';

import { useOnboardingStore } from '@/features/onboarding/store';

export default function Index() {
  const hasOnboarded = useOnboardingStore((s) => s.hasOnboarded);

  // Show onboarding if user hasn't completed it or in dev mode
  if (__DEV__ || !hasOnboarded) return <Redirect href={'/onboarding' as Href} />;

  // Otherwise, go to main app tabs
  return <Redirect href={'/(tabs)' as Href} />;
}

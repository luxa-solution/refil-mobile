import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';

import { ScreenContent } from '@/features/home/components/ScreenContent/ScreenContent';
import { InternalizationExample } from '@/features/modal/components/InternalizationExample';

export default function Modal() {
  return (
    <>
      <ScreenContent path="app/modal.tsx" title="Modal">
        <InternalizationExample />
      </ScreenContent>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </>
  );
}

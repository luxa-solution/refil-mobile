import { Stack } from 'expo-router';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { InternalizationExample, ScreenContent } from '@/features/home/components';

export function ScreenOne() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tab One' }} />
      <View style={styles.container}>
        <ScreenContent path="features/home/ScreenOne.tsx" title="Refil">
          <InternalizationExample />
        </ScreenContent>
      </View>
    </>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: theme.colors.background,
  },
}));

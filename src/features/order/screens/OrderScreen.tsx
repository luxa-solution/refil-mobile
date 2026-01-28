import { Stack } from 'expo-router';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { MainLayoutComponent, ThemedText } from '@/shared/components';

export function OrderScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Orders',
          headerShown: false,
        }}
      />
      <MainLayoutComponent
        backgroundColor="background"
        scrollEnabled={false}
        edges={['top', 'bottom']}>
        <View style={styles.container}>
          <ThemedText type="title" style={styles.title}>
            Orders
          </ThemedText>
          <ThemedText type="default" style={styles.subtitle}>
            Your order history will appear here
          </ThemedText>
        </View>
      </MainLayoutComponent>
    </>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 16,
  },
  subtitle: {
    textAlign: 'center',
    color: theme.colors.textDefaultCaption,
  },
}));

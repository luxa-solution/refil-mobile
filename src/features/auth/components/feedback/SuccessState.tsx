import React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export function SuccessState({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.icon}>
        <Text style={styles.check}>✓</Text>
      </View>

      <Text style={styles.title}>{title}</Text>
      {!!subtitle && <Text style={styles.sub}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  wrap: { alignItems: 'center', gap: 10 },
  icon: {
    width: 64,
    height: 64,
    borderRadius: 999,
    backgroundColor: theme.colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  check: {
    fontSize: 28,
    color: theme.colors.primaryDefault,
    fontWeight: '900',
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    color: theme.colors.textDefaultHeading,
  },
  sub: {
    textAlign: 'center',
    color: theme.colors.textDefaultCaption,
    paddingHorizontal: 24,
  },
}));

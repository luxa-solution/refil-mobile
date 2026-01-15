import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

type Prop = {
  count?: number;
  activeIndex?: number;
};

export function StepDots({ count = 4, activeIndex = 0 }: Prop) {
  const idx = activeIndex - 1;
  return (
    <View style={styles.row}>
      {Array.from({ length: count }).map((_, i) => (
        <View key={i} style={[styles.dot, i === idx && styles.active]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 999,
    backgroundColor: theme.colors.white[800],
  },
  active: {
    backgroundColor: theme.colors.primaryDefault,
    width: 28,
  },
}));

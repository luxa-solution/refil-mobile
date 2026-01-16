import React from 'react';
import { Pressable, Text } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

type Props = { title: string; onPress: () => void; disabled?: boolean };

export function OutlineButton({ title, onPress, disabled }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.btn,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  btn: {
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: theme.colors.borderPrimaryDefault,
    backgroundColor: theme.colors.surfaceDefault,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: theme.colors.primaryDefault,
    fontWeight: '800',
  },
  disabled: { opacity: 0.6 },
  pressed: { opacity: 0.92 },
}));

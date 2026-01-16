import React from 'react';
import { Pressable, Text, ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export function PrimaryButton({ title, onPress, disabled, loading }: Props) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.btn,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
      ]}>
      {loading ? <ActivityIndicator /> : <Text style={styles.text}>{title}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  btn: {
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primaryDefault,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: theme.colors.textOnColorHeading,
    fontWeight: '400',
    fontSize: 21,
  },
  disabled: { opacity: 0.6 },
  pressed: { opacity: 0.92 },
}));

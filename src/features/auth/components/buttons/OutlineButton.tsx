import React from 'react';
import { Pressable, Text } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { buttonBaseStyles } from './baseStyles';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export function OutlineButton({ title, onPress, disabled }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        buttonBaseStyles.btnBase,
        styles.btn,
        disabled && buttonBaseStyles.disabled,
        pressed && !disabled && buttonBaseStyles.pressed,
      ]}>
      <Text style={[buttonBaseStyles.textBase, styles.text]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  btn: {
    borderWidth: 1,
    borderColor: theme.colors.borderPrimaryDefault,
    backgroundColor: theme.colors.surfaceDefault,
  },
  text: {
    color: theme.colors.primaryDefault,
  },
}));

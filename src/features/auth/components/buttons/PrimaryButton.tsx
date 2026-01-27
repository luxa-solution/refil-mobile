import React from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { buttonBaseStyles } from './baseStyles';

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
        buttonBaseStyles.btnBase,
        styles.btn,
        isDisabled && buttonBaseStyles.disabled,
        pressed && !isDisabled && buttonBaseStyles.pressed,
      ]}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={[buttonBaseStyles.textBase, styles.text]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  btn: {
    backgroundColor: theme.colors.primaryDefault,
  },
  text: {
    color: theme.colors.textOnColorHeading,
  },
}));

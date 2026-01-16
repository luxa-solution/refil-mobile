import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

type Props = TextInputProps & {
  label?: string;
  error?: string;
};

export function TextField({ label, error, style, ...props }: Props) {
  const errorLines = __DEV__ ? undefined : 1;

  return (
    <View style={styles.wrap}>
      {!!label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        placeholderTextColor={styles.placeholder.color as string}
        style={[styles.input, style]}
        {...props}
      />

      {!!error && (
        <Text style={styles.error} numberOfLines={errorLines}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  wrap: {
    gap: 6,
  },
  label: {
    color: theme.colors.textDefaultCaption,
    fontSize: 12,
    marginLeft: 4,
  },
  input: {
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: theme.colors.primaryDefault,
    paddingHorizontal: 14,
    color: theme.colors.textDefaultBody,
    backgroundColor: theme.colors.surfaceDefault,
  },
  placeholder: {
    color: theme.colors.textDefaultPlaceholder,
  },
  error: {
    color: theme.colors.error[500],
    fontSize: 12,
    marginLeft: 8,
  },
}));

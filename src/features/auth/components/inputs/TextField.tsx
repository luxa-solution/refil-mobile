import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Pressable, Text, TextInput, TextInputProps, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

type Props = TextInputProps & {
  label?: string;
  error?: string;
};

export function TextField({ label, error, style, secureTextEntry, ...props }: Props) {
  const errorLines = __DEV__ ? undefined : 1;
  const isPassword = !!secureTextEntry;

  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  return (
    <View style={styles.wrap}>
      {!!label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.inputWrap}>
        <TextInput
          placeholderTextColor={styles.placeholder.color as string}
          style={[styles.input, isPassword && styles.inputWithIcon, style]}
          secureTextEntry={isPassword ? !isPasswordVisible : false}
          {...props}
        />

        {isPassword && (
          <Pressable
            onPress={() => setIsPasswordVisible((v) => !v)}
            style={styles.iconBtn}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel={isPasswordVisible ? 'Hide password' : 'Show password'}>
            <Ionicons
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={18}
              color={styles.icon.color as string}
            />
          </Pressable>
        )}
      </View>

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
  inputWrap: {
    position: 'relative',
    justifyContent: 'center',
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
  inputWithIcon: {
    paddingRight: 44,
  },
  iconBtn: {
    position: 'absolute',
    right: 14,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: theme.colors.textDefaultPlaceholder,
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

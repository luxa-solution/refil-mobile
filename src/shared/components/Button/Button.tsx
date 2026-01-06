import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import { getSpinnerColor, getTextStyle, getVariantStyle, styles } from './Button.style';

export type ButtonVariant = 'filled' | 'outline' | 'ghost';

export interface ButtonProps extends Omit<PressableProps, 'style' | 'children'> {
  /**
   * The text to display inside the button.
   */
  title: string;

  /**
   * Callback function triggered when the button is pressed.
   */
  onPress?: () => void;

  /**
   * Defines the button's visual style.
   * - **filled** — Solid background using the primary color.
   * - **outline** — Transparent background with a primary-colored border.
   * - **ghost** — Minimal button with no border or background.
   * @default "filled"
   */
  variant?: ButtonVariant;

  /**
   * Disables the button and lowers opacity.
   * @default false
   */
  disabled?: boolean;

  /**
   * Shows a loading spinner instead of the text when true.
   * @default false
   */
  loading?: boolean;

  /**
   * Optional icon displayed to the left of the text.
   */
  leftIcon?: React.ReactNode;

  /**
   * Additional container styles.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Additional text styles.
   */
  textStyle?: StyleProp<TextStyle>;

  /**
   * Whether the button should stretch to the container's width.
   * @default true
   */
  fullWidth?: boolean;
}

/**
 * Button — A reusable, theme-aware button component for the refill app.
 *
 * This component supports multiple visual styles (variants), loading and disabled states,
 * optional left-side icons, and full-width or inline rendering. It is built with React Native's
 * `Pressable` for smooth press feedback and uses Unistyles for consistent theming.
 *
 * ## Variants
 * - **filled** — Solid background using the primary color.
 * - **outline** — Transparent background with a primary-colored border.
 * - **ghost** — Minimal button with no border or background, typically used for subtle actions.
 *
 * ## Example
 * ```tsx
 * <Button
 *   title="Continue"
 *   variant="filled"
 *   onPress={handleSubmit}
 *   loading={submitting}
 *   leftIcon={<Icon name="arrow-right" />}
 * />
 * ```
 *
 * @component
 */
export const Button = React.forwardRef<View, ButtonProps>(
  (
    {
      title,
      onPress,
      variant = 'filled',
      disabled = false,
      loading = false,
      leftIcon,
      style,
      textStyle,
      fullWidth = true,
      ...pressableProps
    },
    ref
  ) => {
    // Access theme colors
    const { theme } = useUnistyles();

    // Get variant-specific styles
    const buttonStyle = getVariantStyle(variant);
    const textColorStyle = getTextStyle(variant);
    const spinnerColor = getSpinnerColor(variant, theme.colors);

    // Combine container styles
    const containerStyles: StyleProp<ViewStyle> = [
      styles.button,
      buttonStyle,
      fullWidth && styles.fullWidth,
      disabled && styles.disabled,
      style,
    ];

    return (
      <Pressable
        ref={ref}
        onPress={onPress}
        disabled={disabled || loading}
        accessibilityRole="button"
        accessibilityLabel={title}
        accessibilityState={{
          disabled: disabled || loading,
          busy: loading,
        }}
        style={({ pressed }) => [
          containerStyles,
          pressed && !disabled && !loading && styles.pressed,
        ]}
        {...pressableProps}>
        {loading ? (
          <ActivityIndicator color={spinnerColor} size="small" />
        ) : (
          <View style={styles.content}>
            {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
            <Text style={[styles.buttonText, textColorStyle, textStyle]}>{title}</Text>
          </View>
        )}
      </Pressable>
    );
  }
);

Button.displayName = 'Button';

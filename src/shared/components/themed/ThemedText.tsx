import React from 'react';
import { Text, TextProps } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'caption';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const { theme } = useUnistyles();
  // Determine text color based on theme (choose light/dark override when provided)
  const bgRaw = (theme.colors as any)?.background;
  const bg = typeof bgRaw === 'string' ? bgRaw : '#ffffff';
  const hexToRgb = (h: string) => {
    const hex = h.replace('#', '');
    const r = parseInt(hex.substring(0, 2) || '0', 16) || 0;
    const g = parseInt(hex.substring(2, 4) || '0', 16) || 0;
    const b = parseInt(hex.substring(4, 6) || '0', 16) || 0;
    return { r, g, b };
  };
  const { r, g, b } = hexToRgb(bg);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const isDark = luminance < 128;
  const color = isDark
    ? darkColor || lightColor || (theme.colors as any).typography
    : lightColor || darkColor || (theme.colors as any).typography;

  // Define typography styles based on type
  const getTypeStyles = () => {
    switch (type) {
      case 'title':
        return {
          fontSize: 28,
          fontWeight: '700' as const,
          lineHeight: 36,
          color: theme.colors.textDefaultHeading,
        };
      case 'defaultSemiBold':
        return {
          fontSize: 16,
          fontWeight: '600' as const,
          color,
        };
      case 'subtitle':
        return {
          fontSize: 18,
          fontWeight: '600' as const,
          color: theme.colors.textDefaultBody,
        };
      case 'link':
        return {
          fontSize: 16,
          color: theme.colors.primaryDefault,
          textDecorationLine: 'underline' as const,
        };
      case 'caption':
        return {
          fontSize: 14,
          color: theme.colors.textDefaultCaption,
        };
      default:
        return {
          fontSize: 16,
          color,
        };
    }
  };

  return <Text style={[getTypeStyles(), style]} {...rest} />;
}

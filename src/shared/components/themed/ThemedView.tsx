import React from 'react';
import { View, ViewProps } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const { theme } = useUnistyles();
  // Determine background color based on theme (heuristic using background luminance)
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

  // Prefer theme-aware overrides: when both provided, pick based on theme brightness
  const finalBackgroundColor = isDark
    ? darkColor || lightColor || bg
    : lightColor || darkColor || bg;

  return <View style={[{ backgroundColor: finalBackgroundColor }, style]} {...otherProps} />;
}

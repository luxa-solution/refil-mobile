import React from 'react';
import { ColorValue, StyleProp, View, ViewProps, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import type { Theme } from '../../../core/styles/theme';

// Type for accessing nested color tokens
type FlatColorKey = Exclude<keyof Theme['colors'], 'prototype'>;
export type ColorToken = FlatColorKey | string;

export interface BoxProps extends ViewProps {
  backgroundColor?: ColorToken;
  borderColor?: ColorToken;
  flex?: number;
  zIndex?: number;
}

const Box: React.FC<BoxProps> = ({
  backgroundColor,
  flex,
  borderColor,
  style,
  zIndex,
  ...rest
}) => {
  const dynamicStyle = StyleSheet.create((theme) => ({
    base: {
      ...(backgroundColor && {
        backgroundColor: ((theme.colors as any)[backgroundColor] || backgroundColor) as ColorValue,
      }),
      ...(borderColor && {
        borderColor: ((theme.colors as any)[borderColor] || borderColor) as ColorValue,
      }),
      ...(flex !== null && flex !== undefined && { flex }),
      ...(zIndex !== null && zIndex !== undefined && { zIndex }),
    } satisfies ViewStyle,
  }));
  return <View style={[dynamicStyle.base, style as StyleProp<ViewStyle>]} {...rest} />;
};

export default Box;

import React from 'react';
import { Dimensions, View, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { WaveHighlight } from './WaveHighLight';

type Props = {
  height: number;
  style?: ViewStyle;
};

const { width } = Dimensions.get('window');
const screenWidth = width + 20;

export function Wave({ height, style }: Props) {
  const { theme } = useUnistyles();

  return (
    <View style={[styles.root, { height }, style]}>
      <Svg
        width={screenWidth}
        height={height}
        viewBox={`0 0 ${screenWidth} ${height}`}
        preserveAspectRatio="none">
        <WaveHighlight width={screenWidth} height={height} />
        <Path
          d={`
            M 0 ${height * 0.67}
            C ${screenWidth * 0.25} ${-height * 0.67}, 
              ${screenWidth * 0.5} ${1.8 * height}, 
              ${screenWidth} ${height * 0.33}
            L ${screenWidth} ${height}
            L 0 ${height}
            Z
          `}
          fill={theme.colors.surfacePage}
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create(() => ({
  root: {
    width: '100%',
    backgroundColor: 'transparent',
  },
}));

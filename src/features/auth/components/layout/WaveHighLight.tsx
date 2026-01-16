import React from 'react';
import { Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import { useUnistyles } from 'react-native-unistyles';

type Props = {
  width: number;
  height: number;
};

export function WaveHighlight({ width, height }: Props) {
  const { theme } = useUnistyles();

  return (
    <>
      <Defs>
        <LinearGradient id="waveHighlightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={theme.colors.primary[500]} stopOpacity={0.78} />
          <Stop offset="100%" stopColor={theme.colors.primary[900]} stopOpacity={0.78} />
        </LinearGradient>
      </Defs>

      <Path
        d={`
            M 0 ${height * 0.9}
            C ${width * 0.4} ${-height}, ${width * 0.75} ${1.5 * height}, ${width} ${height * 0.33}
            L ${width} ${height}
            L 0 ${height}
            Z
          `}
        fill="url(#waveHighlightGrad)"
      />
    </>
  );
}

import React, { useEffect, useRef } from 'react';
import { Animated, View, ViewProps } from 'react-native';
import { styles } from './ProgressBar.style';

export type ProgressBarVariant = 'dots' | 'linear';

type DotsProgressProps = {
  variant?: 'dots';
  current: number;
  total: number;
  dotSize?: number;
  dotSpacing?: number;
  progressColor?: string;
  backgroundColor?: string;
};

type LinearProgressProps = {
  variant: 'linear';
  percent: number; // expected 0-100
  height?: number;
  progressColor?: string;
  backgroundColor?: string;
  animateDurationMs?: number;
};

export type ProgressBarProps = (DotsProgressProps | LinearProgressProps) & ViewProps;

export const ProgressBar = React.forwardRef<View, ProgressBarProps>((props, ref) => {
  const animation = useRef(new Animated.Value(0)).current;
  const isLinear = props.variant === 'linear';

  useEffect(() => {
    if (isLinear && 'percent' in props) {
      const clampedPercent = Math.min(Math.max(props.percent, 0), 100);
      const duration = 'animateDurationMs' in props ? props.animateDurationMs : 500;
      Animated.timing(animation, {
        toValue: clampedPercent,
        duration,
        useNativeDriver: false,
      }).start();
    }
  }, [isLinear, props, animation]);

  if (isLinear) {
    const { height = 6, progressColor, backgroundColor, style } = props;

    const widthInterpolated = animation.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%'],
    });

    return (
      <View
        ref={ref}
        style={[styles.container, { height }, backgroundColor && { backgroundColor }, style]}>
        <Animated.View
          style={[
            styles.filled,
            progressColor && { backgroundColor: progressColor },
            { width: widthInterpolated },
          ]}
        />
      </View>
    );
  }

  const {
    current,
    total,
    dotSize = 8,
    dotSpacing = 8,
    progressColor,
    backgroundColor,
    style,
  } = props;

  const safeTotal = Math.max(total, 1);
  const activeDots = Math.min(Math.max(current, 0), safeTotal);

  return (
    <View ref={ref} style={[styles.dotsContainer, { gap: dotSpacing }, style]}>
      {Array.from({ length: safeTotal }).map((_, index) => {
        const isActive = index < activeDots;
        return (
          <View
            key={index}
            style={[
              styles.dot,
              { width: dotSize, height: dotSize, borderRadius: dotSize / 2 },
              isActive
                ? [styles.dotActive, progressColor && { backgroundColor: progressColor }]
                : [styles.dotInactive, backgroundColor && { backgroundColor }],
            ]}
          />
        );
      })}
    </View>
  );
});
ProgressBar.displayName = 'ProgressBar';

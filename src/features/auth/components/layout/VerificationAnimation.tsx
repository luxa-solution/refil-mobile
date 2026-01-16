import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

type Props = {
  durationMs?: number;
  holdPurpleMs?: number;
  holdGreyMs?: number;
  size?: number;
};

export function VerificationAnimation({
  durationMs = 150,
  holdPurpleMs = 1000,
  holdGreyMs = 50,
  size = 150,
}: Props) {
  const { theme } = useUnistyles();
  const t = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        // grey -> purple
        Animated.timing(t, {
          toValue: 1,
          duration: durationMs,
          easing: Easing.in(Easing.ease),
          useNativeDriver: false, // backgroundColor anim
        }),

        // hold purple
        Animated.delay(holdPurpleMs),

        // purple -> grey
        Animated.timing(t, {
          toValue: 0,
          duration: durationMs,
          easing: Easing.in(Easing.ease),
          useNativeDriver: false,
        }),

        // hold grey
        Animated.delay(holdGreyMs),
      ])
    );

    loop.start();
    return () => loop.stop();
  }, [durationMs, holdPurpleMs, holdGreyMs, t]);

  const circleSize = t.interpolate({
    inputRange: [0, 1],
    outputRange: [size * 0.55, size],
  });

  const circleOpacity = t.interpolate({
    inputRange: [0, 1],
    outputRange: [0.35, 1],
  });

  const circleBg = t.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [theme.colors.slate[600], theme.colors.slate[300], theme.colors.success[400]],
  });

  const checkScale = t.interpolate({
    inputRange: [0, 1],
    outputRange: [0.88, 1],
  });

  const checkOpacity = t.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1],
  });

  const AnimatedCircle = useMemo(() => Animated.createAnimatedComponent(View), []);

  return (
    <View style={styles.wrap}>
      <AnimatedCircle
        style={[
          styles.circle,
          {
            width: circleSize,
            height: circleSize,
            borderRadius: 9999,
            opacity: circleOpacity,
            backgroundColor: circleBg as unknown as string,
          },
        ]}>
        <Animated.View
          style={{
            transform: [{ scale: checkScale as unknown as number }],
            opacity: checkOpacity as unknown as number,
          }}>
          <Svg width={size * 0.46} height={size * 0.46} viewBox="0 0 24 24">
            <Path
              d="M20 6L9 17l-5-5"
              stroke={theme.colors.textOnColorBody}
              strokeWidth={2.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </Svg>
        </Animated.View>
      </AnimatedCircle>
    </View>
  );
}

const styles = StyleSheet.create(() => ({
  wrap: { alignItems: 'center', justifyContent: 'center' },
  circle: { alignItems: 'center', justifyContent: 'center' },
}));

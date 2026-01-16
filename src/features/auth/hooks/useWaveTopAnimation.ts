import { useEffect, useMemo, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

function percentToPx(percent: number) {
  return (percent / 100) * screenHeight;
}

/**
 * Animates a "top" value for the Wave wrapper.
 *
 * - If `enabled` is false: snaps to finalTop and never animates.
 * - If `enabled` is true: starts at fromTop, then animates to finalTop.
 */
export function useWaveTopAnimation(args: {
  enabled: boolean;
  finalTopPercent?: number; // default: 25
  fromTopPercent?: number; // default: 50
  durationMs?: number; // default: 650
}) {
  const { enabled, finalTopPercent = 25, fromTopPercent = 50, durationMs = 650 } = args;

  const fromPx = useMemo(() => percentToPx(fromTopPercent), [fromTopPercent]);
  const finalPx = useMemo(() => percentToPx(finalTopPercent), [finalTopPercent]);

  const top = useRef(new Animated.Value(enabled ? fromPx : finalPx)).current;

  useEffect(() => {
    if (!enabled) {
      top.stopAnimation();
      top.setValue(finalPx);
      return;
    }

    top.setValue(fromPx);

    const anim = Animated.timing(top, {
      toValue: finalPx,
      duration: durationMs,
      useNativeDriver: false,
    });

    anim.start();

    return () => {
      anim.stop();
    };
  }, [enabled, fromPx, finalPx, durationMs, top]);

  return top;
}

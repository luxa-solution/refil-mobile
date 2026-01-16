import React from 'react';
import { Animated, Dimensions, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useWaveTopAnimation } from '@/features/auth/hooks/useWaveTopAnimation';
import { Header } from './Header';
import { Wave } from './Wave';

type Props = {
  children: React.ReactNode;
  isVerification?: boolean;
  animateWave?: boolean;
};

const { height: screenHeight } = Dimensions.get('window');

export function Container({ children, isVerification, animateWave = false }: Props) {
  const waveHeight = 0.1 * screenHeight;

  const animatedTop = useWaveTopAnimation({
    enabled: animateWave,
    finalTopPercent: 25,
    fromTopPercent: 35,
    durationMs: 800,
  });

  return (
    <View style={styles.root}>
      <Header style={styles.header} isVerification={isVerification} />
      <Animated.View style={[styles.wave, { top: animatedTop }]}>
        <Wave height={waveHeight} />
      </Animated.View>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.surfacePage,
  },
  header: {
    height: '34%',
  },
  wave: {
    position: 'absolute',
    // top: '25%',
    left: -10,
    right: 10,
    // height: '10%',
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
  },
}));

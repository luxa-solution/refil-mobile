import React from 'react';
import { Dimensions, Image, View } from 'react-native';

import { OnboardingSlide } from '../data/onboardingData';
import { styles } from '../screens/OnboardingScreen.styles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export type OnboardingContentProps = {
  slide: OnboardingSlide;
};

/**
 * OnboardingContent — Renders hero image for the carousel.
 *
 * @component
 */
export const OnboardingContent = ({ slide }: OnboardingContentProps) => {
  return (
    <View style={[styles.slideContainer, { width: SCREEN_WIDTH }]}>
      <Image source={slide.imgsrc} style={styles.heroImage} resizeMode="cover" />
    </View>
  );
};

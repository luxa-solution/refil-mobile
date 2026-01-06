import React from 'react';
import { Dimensions, Image, View } from 'react-native';

import { ThemedText } from '@/shared/components';
import { OnboardingSlide } from '../data/onboardingData';
import { styles } from '../screens/OnboardingScreen.styles';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export type OnboardingContentProps = {
  slide: OnboardingSlide;
};

/**
 * OnboardingContent — Renders hero image with title and description overlay.
 *
 * Part of the carousel; positioned to fill the entire slide with image at top
 * and text card overlaid at the bottom for a seamless scroll experience.
 *
 * @component
 */
export const OnboardingContent = ({ slide }: OnboardingContentProps) => {
  return (
    <View style={[styles.slideContainer, { width: SCREEN_WIDTH, height: SCREEN_HEIGHT }]}>
      {/* Hero image: fills most of screen */}
      <Image source={slide.imgsrc} style={styles.hero} resizeMode="cover" />

      {/* White card overlaps image at bottom */}
      <View style={styles.overlayCard}>
        <ThemedText style={styles.title}>{slide.title}</ThemedText>
        <ThemedText style={styles.description}>{slide.description}</ThemedText>
      </View>
    </View>
  );
};

import { Href, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Animated, Dimensions, FlatList, Image, ListRenderItem, View } from 'react-native';

import { StepDots } from '@/features/auth/components/layout/StepDots';
import { Wave } from '@/features/auth/components/layout/Wave';
import { useWaveTopAnimation } from '@/features/auth/hooks/useWaveTopAnimation';
import { Button, ThemedText } from '@/shared/components';
import { OnboardingSlide, onboardingSlides } from '../data/onboardingData';
import { useOnboardingStore } from '../store';
import { styles } from './OnboardingScreen.styles';

const { height: screenHeight } = Dimensions.get('window');

const viewabilityConfig = {
  itemVisiblePercentThreshold: 60,
};

/**
 * OnboardingScreens — Multi-slide carousel with animated wave and footer buttons.
 *
 * Renders a horizontal FlatList of onboarding slides with image at top,
 * animated wave, and title/description below. Progress indicator and action
 * buttons are at the bottom.
 *
 * @component
 */
export const OnboardingScreens = () => {
  const router = useRouter();
  const flatListRef = useRef<FlatList<OnboardingSlide>>(null);
  const [localIndex, setLocalIndex] = useState(0);
  const { setHasOnboarded } = useOnboardingStore();

  const total = onboardingSlides.length;
  const isLast = localIndex === total - 1;

  const bottomSheetHeightPercent = 35; // minHeight from styles
  const waveHeightPercent = 10;

  // Position wave higher up to integrate with upper part of bottom sheet
  // Wave top = (bottom sheet top) - (wave height) + adjustment = 65 - 10 + 1 = 56%
  const finalTopPercent = 100 - bottomSheetHeightPercent - waveHeightPercent + 1;
  const fromTopPercent = finalTopPercent + 12; // Start 12% lower for animation

  const waveHeight = (waveHeightPercent / 100) * screenHeight;
  const animatedTop = useWaveTopAnimation({
    enabled: true,
    finalTopPercent, // Will be 56 (100 - 35 - 10 + 1)
    fromTopPercent, // Will be 68 (56 + 12)
    durationMs: 800,
  });

  // Handle skip: mark complete and navigate to main tabs
  const handleSkip = () => {
    setHasOnboarded(true);
    router.replace('/(tabs)' as Href);
  };

  // Handle next/continue: advance slide or complete onboarding
  const handleAdvance = () => {
    if (isLast) {
      setHasOnboarded(true);
      router.replace('/auth/welcome' as Href);
      return;
    }
    const nextIndex = Math.min(localIndex + 1, total - 1);
    flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
  };

  // Track which slide is currently visible and update store
  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems?.length) {
      const nextIndex = viewableItems[0].index ?? 0;
      setLocalIndex(nextIndex);
    }
  }).current;

  const renderItem: ListRenderItem<OnboardingSlide> = ({ item }) => {
    return <OnboardingSlideContent slide={item} />;
  };

  return (
    <View style={styles.root}>
      {/* Hero image carousel */}
      <FlatList
        ref={flatListRef}
        data={onboardingSlides}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        style={styles.flatListContainer}
      />

      {/* Animated wave overlay */}
      <Animated.View style={[styles.waveContainer, { top: animatedTop }]}>
        <Wave height={waveHeight} />
      </Animated.View>

      {/* Bottom content sheet with text and buttons */}
      <View style={styles.bottomSheet}>
        <ThemedText style={styles.title}>{onboardingSlides[localIndex].title}</ThemedText>
        <ThemedText style={styles.description}>
          {onboardingSlides[localIndex].description}
        </ThemedText>

        <View style={styles.progressContainer}>
          <StepDots activeIndex={localIndex + 1} count={total} />
        </View>

        <View style={styles.ctaRow}>
          {!isLast && (
            <View style={styles.buttonHalf}>
              <Button title="Skip" variant="outline" onPress={handleSkip} fullWidth />
            </View>
          )}
          <View style={[styles.buttonHalf, isLast && styles.buttonFull]}>
            <Button
              title={isLast ? 'Continue' : 'Next'}
              variant="filled"
              onPress={handleAdvance}
              fullWidth
            />
          </View>
        </View>
      </View>
    </View>
  );
};

/**
 * OnboardingSlideContent — Renders just the hero image for the carousel.
 */
function OnboardingSlideContent({ slide }: { slide: OnboardingSlide }) {
  return (
    <View style={[styles.slideContainer, { width: Dimensions.get('window').width }]}>
      <Image source={slide.imgsrc} style={styles.heroImage} resizeMode="cover" />
    </View>
  );
}

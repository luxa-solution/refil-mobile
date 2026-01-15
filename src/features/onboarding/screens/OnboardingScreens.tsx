import { Href, useRouter } from 'expo-router';
import React, { useMemo, useRef, useState } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';

import { Button, ProgressBar } from '@/shared/components';
import { OnboardingContent } from '../components';
import { OnboardingSlide, onboardingSlides } from '../data/onboardingData';
import { useOnboardingStore } from '../store';
import { styles } from './OnboardingScreen.styles';

const viewabilityConfig = {
  itemVisiblePercentThreshold: 60,
};

/**
 * OnboardingScreens — Multi-slide carousel with dots progress and call-to-action buttons.
 *
 * Renders a horizontal FlatList of onboarding slides with image, title, and description.
 * Progress indicator and Skip/Next buttons are managed at the bottom.
 * On completion, stores state and navigates to main app.
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

  // Handle skip: mark complete and navigate to main tabs
  const handleSkip = () => {
    setHasOnboarded(true);
    router.replace('/(tabs)' as Href);
  };

  // Handle next/continue: advance slide or complete onboarding
  const handleAdvance = () => {
    if (isLast) {
      setHasOnboarded(true);
      router.replace('/(tabs)' as Href);
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
    return <OnboardingContent slide={item} />;
  };

  // Prepare progress bar props with current progress
  const progressProps = useMemo(
    () => ({
      variant: 'dots' as const,
      current: localIndex + 1,
      total,
    }),
    [localIndex, total]
  );

  return (
    <View style={styles.root}>
      {/* Carousel list: horizontal, paginated */}
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

      {/* Footer with progress and action buttons */}
      <View style={styles.card}>
        <View style={styles.progressContainer}>
          <ProgressBar {...progressProps} />
        </View>

        <View style={styles.ctaRow}>
          <View style={styles.buttonHalf}>
            <Button title="Skip" variant="outline" onPress={handleSkip} fullWidth />
          </View>
          <View style={styles.buttonHalf}>
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

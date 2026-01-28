import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { ThemedText } from '@/shared/components';

interface PromoCarouselProps {
  onBannerPress?: (index: number) => void;
}

export function PromoCarousel({ onBannerPress }: PromoCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const promos = [
    {
      id: 1,
      title: 'Up to 30%\ndiscount on first\ndelivery',
      cta: 'Order Now',
      backgroundColor: '#f8810b',
    },
    {
      id: 2,
      title: 'Free delivery\non orders above\n₦5,000',
      cta: 'Shop Now',
      backgroundColor: '#0e2c8e',
    },
    {
      id: 3,
      title: 'Refer a friend\nand earn rewards',
      cta: 'Refer Now',
      backgroundColor: '#05ed30',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onMomentumScrollEnd={(event) => {
          const contentOffsetX = event.nativeEvent.contentOffset.x;
          const index = Math.round(contentOffsetX / 300);
          setActiveIndex(Math.min(index, promos.length - 1));
        }}
        style={styles.scrollView}>
        {promos.map((promo, index) => (
          <Pressable
            key={promo.id}
            style={[styles.promoCard, { backgroundColor: promo.backgroundColor }]}
            onPress={() => onBannerPress?.(index)}>
            <View style={styles.content}>
              <ThemedText type="title" style={styles.promoTitle}>
                {promo.title}
              </ThemedText>
              <Pressable style={styles.ctaButton}>
                <ThemedText style={styles.ctaText}>{promo.cta}</ThemedText>
              </Pressable>
            </View>
            <View style={styles.illustration}>
              <MaterialCommunityIcons name="scooter" size={80} color="rgba(255,255,255,0.3)" />
            </View>
          </Pressable>
        ))}
      </ScrollView>

      {/* Dots indicator */}
      <View style={styles.dotsContainer}>
        {promos.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, index === activeIndex ? styles.activeDot : styles.inactiveDot]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    paddingVertical: 12,
    backgroundColor: theme.colors.surfaceDefault,
  },
  scrollView: {
    height: 180,
  },
  promoCard: {
    width: 340,
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  content: {
    flex: 0.65,
    justifyContent: 'space-between',
  },
  promoTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.white[50],
    marginBottom: 16,
    lineHeight: 24,
  },
  ctaButton: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  ctaText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.white[50],
  },
  illustration: {
    flex: 0.35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
    paddingHorizontal: 16,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    width: 28,
    backgroundColor: theme.colors.primary[500],
  },
  inactiveDot: {
    width: 8,
    backgroundColor: theme.colors.white[600],
  },
}));

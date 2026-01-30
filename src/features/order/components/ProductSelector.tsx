import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Animated, Pressable, ScrollView, TouchableOpacity, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { fontSize, ms, spacing } from '@/core/styles/responsive_scale';
import { ThemedText } from '@/shared/components';

const PRESET_SIZES = ['3kg', '5kg', '7kg', '10kg', '15kg', '20kg', '40kg', '50kg'];

interface ProductSelectorProps {
  selectedSize?: string;
  customSize?: number;
  onSizeSelect?: (size: string) => void;
  onCustomSizeChange?: (size: number) => void;
  productImage?: string;
}

export function ProductSelector({
  selectedSize,
  customSize = 0,
  onSizeSelect,
  onCustomSizeChange,
}: ProductSelectorProps) {
  const { theme } = useUnistyles();
  const [localSelectedSize, setLocalSelectedSize] = useState(selectedSize);
  const [localCustomSize, setLocalCustomSize] = useState(customSize);

  // Animation for custom size
  const sizeScale = useRef(new Animated.Value(1)).current;

  const animateSize = () => {
    sizeScale.setValue(1);
    Animated.sequence([
      Animated.timing(sizeScale, {
        toValue: 1.2,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(sizeScale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleCustomSizeChange = (delta: number) => {
    const newSize = Math.max(0, localCustomSize + delta);
    const rounded = Math.round(newSize * 2) / 2; // Round to nearest 0.5
    setLocalCustomSize(rounded);
    setLocalSelectedSize('');
    onCustomSizeChange?.(rounded);
    animateSize();
  };

  return (
    <View style={styles.container}>
      <ThemedText type="defaultSemiBold" style={styles.title}>
        Select Size
      </ThemedText>

      {/* Preset Size Buttons */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={styles.sizeGrid}>
        {PRESET_SIZES.map((size) => (
          <View key={size} style={styles.sizeButtonWrapper}>
            <Pressable
              onPress={() => {
                setLocalSelectedSize(size);
                setLocalCustomSize(0);
                onSizeSelect?.(size);
              }}
              style={[styles.sizeButton, localSelectedSize === size && styles.sizeButtonSelected]}>
              <ThemedText
                style={[
                  styles.sizeButtonText,
                  localSelectedSize === size && styles.sizeButtonTextSelected,
                ]}>
                {size}
              </ThemedText>
            </Pressable>
          </View>
        ))}
      </ScrollView>

      {/* Custom Size Selector with +/- Buttons */}
      <View style={styles.customSizeContainer}>
        <ThemedText style={styles.customSizeLabel}>Custom Size (kg)</ThemedText>
        <View style={styles.customSizeControls}>
          <TouchableOpacity
            style={styles.minusButton}
            onPress={() => handleCustomSizeChange(-0.5)}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Decrease size"
            accessibilityHint="Decreases size by 0.5kg">
            <Ionicons name="remove" size={20} color={theme.colors.primaryDefault} />
          </TouchableOpacity>

          <Animated.View
            style={[
              styles.sizeDisplay,
              {
                transform: [{ scale: sizeScale }],
              },
            ]}>
            <ThemedText style={styles.sizeValue}>{localCustomSize}</ThemedText>
            <ThemedText style={styles.sizeUnit}>kg</ThemedText>
          </Animated.View>

          <TouchableOpacity
            style={styles.plusButton}
            onPress={() => handleCustomSizeChange(0.5)}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Increase size"
            accessibilityHint="Increases size by 0.5kg">
            <Ionicons name="add" size={20} color={theme.colors.neutral[100]} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    padding: spacing(16),
    backgroundColor: theme.colors.surfaceDefault,
    borderRadius: ms(12),
    marginBottom: spacing(16),
  },
  title: {
    fontSize: fontSize(14),
    fontWeight: '600',
    marginBottom: spacing(12),
    color: theme.colors.textDefaultBody,
  },
  sizeGrid: {
    flexDirection: 'row',
    gap: spacing(8),
    paddingBottom: spacing(12),
  },
  sizeButtonWrapper: {
    justifyContent: 'center',
  },
  sizeButton: {
    paddingHorizontal: spacing(16),
    paddingVertical: spacing(10),
    borderRadius: ms(24),
    backgroundColor: theme.colors.white[100],
    borderWidth: 1,
    borderColor: theme.colors.white[600],
    minWidth: ms(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeButtonSelected: {
    backgroundColor: theme.colors.primaryDefault,
    borderColor: theme.colors.primaryDefault,
  },
  sizeButtonText: {
    fontSize: fontSize(13),
    fontWeight: '500',
    color: theme.colors.textDefaultCaption,
  },
  sizeButtonTextSelected: {
    color: '#ffffff',
    fontWeight: '600',
  },
  customSizeContainer: {
    marginTop: spacing(12),
    padding: spacing(14),
    backgroundColor: theme.colors.primaryDefaultSubtle,
    borderRadius: ms(12),
    borderWidth: 1,
    borderColor: theme.colors.primaryDefault,
  },
  customSizeLabel: {
    fontSize: fontSize(12),
    fontWeight: '600',
    color: theme.colors.primaryDefault,
    marginBottom: spacing(10),
    letterSpacing: 0.3,
  },
  customSizeControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing(16),
  },
  minusButton: {
    width: ms(40),
    height: ms(40),
    borderRadius: ms(20),
    backgroundColor: theme.colors.white[100],
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.primaryDefault,
  },
  sizeDisplay: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing(2),
  },
  sizeValue: {
    fontSize: fontSize(24),
    fontWeight: '800',
    color: theme.colors.primaryDefault,
  },
  sizeUnit: {
    fontSize: fontSize(12),
    fontWeight: '500',
    color: theme.colors.textDefaultCaption,
  },
  plusButton: {
    width: ms(40),
    height: ms(40),
    borderRadius: ms(20),
    backgroundColor: theme.colors.primaryDefault,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

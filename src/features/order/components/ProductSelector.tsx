import React, { useState } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { ThemedText } from '@/shared/components';

const PRESET_SIZES = ['3kg', '5kg', '7kg', '10kg', '15kg', '20kg', '40kg', '50kg'];

interface ProductSelectorProps {
  selectedSize?: string;
  customSize?: string;
  onSizeSelect?: (size: string) => void;
  onCustomSizeChange?: (size: string) => void;
  productImage?: string;
}

export function ProductSelector({
  selectedSize,
  customSize,
  onSizeSelect,
  onCustomSizeChange,
}: ProductSelectorProps) {
  const [localSelectedSize, setLocalSelectedSize] = useState(selectedSize);
  const [localCustomSize, setLocalCustomSize] = useState(customSize || '');

  const handleCustomSizeChange = (text: string) => {
    setLocalCustomSize(text);
    setLocalSelectedSize('');
    onCustomSizeChange?.(text);
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
                setLocalCustomSize('');
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

      {/* Custom Size Input */}
      <View style={styles.customInputWrapper}>
        <TextInput
          style={styles.customInput}
          placeholder="e.g 5kg"
          placeholderTextColor="#afafaf"
          value={localCustomSize}
          onChangeText={handleCustomSizeChange}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    padding: 16,
    backgroundColor: theme.colors.surfaceDefault,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    color: theme.colors.textDefaultBody,
  },
  sizeGrid: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 12,
  },
  sizeButtonWrapper: {
    justifyContent: 'center',
  },
  sizeButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: theme.colors.white[100],
    borderWidth: 1,
    borderColor: theme.colors.white[600],
    minWidth: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeButtonSelected: {
    backgroundColor: theme.colors.primary[500],
    borderColor: theme.colors.primary[500],
  },
  sizeButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: theme.colors.textDefaultCaption,
  },
  sizeButtonTextSelected: {
    color: '#ffffff',
    fontWeight: '600',
  },
  customInputWrapper: {
    marginTop: 12,
  },
  customInput: {
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: theme.colors.white[100],
    borderWidth: 1,
    borderColor: theme.colors.white[600],
    fontSize: 14,
    color: theme.colors.textDefaultBody,
  },
}));

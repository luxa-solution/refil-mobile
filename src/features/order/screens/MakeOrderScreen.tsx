import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Animated, Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { fontSize, ms, spacing } from '@/core/styles/responsive_scale';
import { getStationById } from '@/features/home/data/mockStations';
import { GasStationCard, ProductSelector } from '@/features/order/components';
import { Button, MainLayoutComponent, ThemedText } from '@/shared/components';

interface GasStation {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  address: string;
  image?: string;
}

export function MakeOrderScreen() {
  const router = useRouter();
  const { stationId } = useLocalSearchParams() as { stationId?: string };

  // Get station from mock data
  const mockStation = getStationById(stationId || '1');
  const [station] = useState<GasStation>({
    id: mockStation?.id || stationId || '1',
    name: mockStation?.name || 'Heagle Gas Station',
    rating: mockStation?.rating || 4.2,
    reviewCount: mockStation?.reviewCount || 187,
    address: mockStation?.address || 'Ilorin Mall, Taiwo Rd, Offa Garage',
  });

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [customSize, setCustomSize] = useState<number>(0);
  const cylinderScale = useRef(new Animated.Value(1)).current;
  const cylinderOpacity = useRef(new Animated.Value(1)).current;

  // Animate cylinder when size changes
  const animateCylinder = () => {
    // Pulse animation
    Animated.sequence([
      Animated.timing(cylinderScale, {
        toValue: 1.3,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(cylinderScale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    animateCylinder();
  };

  const handleCustomSizeChange = (size: number) => {
    setCustomSize(size);
    if (size > 0) {
      animateCylinder();
    }
  };

  const handleContinue = () => {
    const finalSize = selectedSize || (customSize > 0 ? `${customSize}kg` : '');
    if (finalSize) {
      router.push({
        pathname: '/order-summary',
        params: {
          stationId: station.id,
          size: finalSize,
        },
      } as any);
    }
  };

  return (
    <>
      <MainLayoutComponent backgroundColor="background" edges={['top', 'bottom']}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <MaterialCommunityIcons name="chevron-left" size={24} color="#121212" />
          </Pressable>
          <ThemedText type="subtitle" style={styles.headerTitle}>
            Make Order
          </ThemedText>
          <Pressable style={styles.heartButton}>
            <MaterialCommunityIcons name="heart-outline" size={24} color="#121212" />
          </Pressable>
        </View>

        {/* Product Image with Animation */}
        <View style={styles.productImageContainer}>
          <Animated.View
            style={[
              styles.animatedGasImage,
              {
                transform: [{ scale: cylinderScale }],
                opacity: cylinderOpacity,
              },
            ]}>
            <MaterialCommunityIcons name="gas-cylinder" size={100} color="#0e2c8e" />
          </Animated.View>
        </View>

        {/* Product Selector */}
        <View style={styles.content}>
          <ProductSelector
            selectedSize={selectedSize}
            customSize={customSize}
            onSizeSelect={handleSizeSelect}
            onCustomSizeChange={handleCustomSizeChange}
          />

          {/* Gas Station Info */}
          <GasStationCard
            name={station.name}
            rating={station.rating}
            reviewCount={station.reviewCount}
            address={station.address}
          />

          {/* Continue Button */}
          <Button
            title="Continue"
            onPress={handleContinue}
            disabled={!selectedSize && customSize === 0}
            style={styles.continueButton}
          />
        </View>
      </MainLayoutComponent>
    </>
  );
}

const styles = StyleSheet.create((theme) => ({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing(16),
    paddingVertical: spacing(12),
    backgroundColor: theme.colors.surfaceDefault,
  },
  backButton: {
    width: ms(40),
    height: ms(40),
    borderRadius: ms(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.white[600],
  },
  headerTitle: {
    fontSize: fontSize(18),
    fontWeight: '600',
    color: theme.colors.textDefaultBody,
    flex: 1,
    textAlign: 'center',
  },
  heartButton: {
    width: ms(40),
    height: ms(40),
    borderRadius: ms(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.white[600],
  },
  productImageContainer: {
    height: ms(300),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: spacing(16),
    backgroundColor: theme.colors.white[50],
  },
  animatedGasImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: spacing(16),
    paddingBottom: spacing(24),
  },
  continueButton: {
    marginTop: spacing(8),
  },
}));

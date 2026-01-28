import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

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

  // Mock station data - in real app, fetch based on stationId
  const [station] = useState<GasStation>({
    id: stationId as string,
    name: 'Heagle Gas Station',
    rating: 4.2,
    reviewCount: 187,
    address: 'Ilorin Mall, Taiwo Rd, Offa Garage',
  });

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [customSize, setCustomSize] = useState<string>('');

  const handleContinue = () => {
    const finalSize = selectedSize || customSize;
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

        {/* Product Image */}
        <View style={styles.productImageContainer}>
          <View style={styles.placeholderGasImage}>
            <MaterialCommunityIcons name="gas-cylinder" size={100} color="#0e2c8e" />
          </View>
        </View>

        {/* Product Selector */}
        <View style={styles.content}>
          <ProductSelector
            selectedSize={selectedSize}
            customSize={customSize}
            onSizeSelect={setSelectedSize}
            onCustomSizeChange={setCustomSize}
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
            disabled={!selectedSize && !customSize}
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: theme.colors.surfaceDefault,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.white[600],
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.textDefaultBody,
    flex: 1,
    textAlign: 'center',
  },
  heartButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.white[600],
  },
  productImageContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
    backgroundColor: theme.colors.white[50],
  },
  placeholderGasImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  continueButton: {
    marginTop: 8,
  },
}));

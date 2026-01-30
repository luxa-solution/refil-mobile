import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { fontSize, ms, spacing } from '@/core/styles/responsive_scale';
import { getNearbyStations } from '@/features/home/data/mockStations';
import { ThemedText } from '@/shared/components';

interface NearbyStore {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  address: string;
  distance: string;
  image?: string;
}

interface NearbyStoresProps {
  onSeeAll?: () => void;
  onStorePress?: (store: NearbyStore) => void;
}

export function NearbyStores({ onSeeAll, onStorePress }: NearbyStoresProps) {
  // Get nearby stations from mock data
  const nearbyStations = getNearbyStations(3);

  const stores: NearbyStore[] = nearbyStations.map((station, index) => ({
    id: station.id,
    name: station.name,
    rating: station.rating,
    reviewCount: station.reviewCount,
    address: station.address,
    distance: `${(0.5 + index * 0.3).toFixed(1)} km`,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="subtitle" style={styles.title}>
          Nearby
        </ThemedText>
        <Pressable onPress={onSeeAll}>
          <ThemedText style={styles.seeAll}>See all</ThemedText>
        </Pressable>
      </View>

      <View style={styles.storesList}>
        {stores.map((store) => (
          <Pressable key={store.id} style={styles.storeCard} onPress={() => onStorePress?.(store)}>
            {/* Store Image */}
            <View style={styles.imageContainer}>
              <View style={styles.placeholderImage}>
                <MaterialCommunityIcons name="gas-cylinder" size={40} color={'#f8810b'} />
              </View>
            </View>

            {/* Store Info */}
            <View style={styles.storeInfo}>
              <View style={styles.nameRow}>
                <View style={styles.nameContainer}>
                  <ThemedText type="defaultSemiBold" numberOfLines={1} style={styles.storeName}>
                    {store.name}
                  </ThemedText>
                </View>
                <View style={styles.distanceBadge}>
                  <ThemedText style={styles.distanceText}>{store.distance}</ThemedText>
                </View>
              </View>

              {/* Rating */}
              <View style={styles.ratingContainer}>
                <MaterialCommunityIcons
                  name="star"
                  size={14}
                  color="#f8810b"
                  style={styles.starIcon}
                />
                <ThemedText type="caption" style={styles.rating}>
                  {store.rating}
                </ThemedText>
                <ThemedText type="caption" style={styles.reviewCount}>
                  ({store.reviewCount})
                </ThemedText>
              </View>

              {/* Address */}
              <View style={styles.addressContainer}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={12}
                  color="#878787"
                  style={styles.addressIcon}
                />
                <ThemedText type="caption" numberOfLines={1} style={styles.address}>
                  {store.address}
                </ThemedText>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    paddingVertical: spacing(16),
    backgroundColor: theme.colors.surfaceDefault,
    paddingBottom: spacing(32),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing(16),
    marginBottom: spacing(16),
  },
  title: {
    fontSize: fontSize(18),
    fontWeight: '600',
    color: theme.colors.textDefaultHeading,
  },
  seeAll: {
    fontSize: fontSize(14),
    fontWeight: '600',
    color: theme.colors.secondaryDefault,
  },
  storesList: {
    gap: spacing(12),
    paddingHorizontal: spacing(16),
  },
  storeCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: ms(12),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.white[600],
  },
  imageContainer: {
    width: ms(120),
    height: ms(120),
  },
  placeholderImage: {
    flex: 1,
    backgroundColor: theme.colors.white[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  storeInfo: {
    flex: 1,
    padding: spacing(12),
    justifyContent: 'space-between',
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing(8),
  },
  nameContainer: {
    flex: 1,
  },
  storeName: {
    fontSize: fontSize(14),
    fontWeight: '600',
    color: theme.colors.textDefaultHeading,
  },
  distanceBadge: {
    backgroundColor: theme.colors.white[200],
    borderRadius: ms(12),
    paddingHorizontal: spacing(8),
    paddingVertical: spacing(4),
  },
  distanceText: {
    fontSize: fontSize(12),
    fontWeight: '600',
    color: theme.colors.secondary[500],
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(4),
  },
  starIcon: {
    marginRight: spacing(2),
  },
  rating: {
    fontSize: fontSize(12),
    fontWeight: '600',
    color: theme.colors.textDefaultBody,
  },
  reviewCount: {
    fontSize: fontSize(12),
    color: theme.colors.textDefaultCaption,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(4),
  },
  addressIcon: {
    marginRight: spacing(2),
  },
  address: {
    flex: 1,
    fontSize: fontSize(11),
    color: theme.colors.textDefaultCaption,
  },
}));

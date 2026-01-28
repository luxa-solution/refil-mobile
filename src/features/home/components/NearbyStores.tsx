import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

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
  const stores: NearbyStore[] = [
    {
      id: '1',
      name: 'Heagle Gas',
      rating: 4.2,
      reviewCount: 187,
      address: 'Illorin Mall, Taiwo Rd, Offa Garage',
      distance: '1.0 km',
    },
    {
      id: '2',
      name: 'NNPC Gas',
      rating: 4.5,
      reviewCount: 245,
      address: 'Iwo Road, GRA, Ibadan',
      distance: '1.3 km',
    },
    {
      id: '3',
      name: 'Orange Gas',
      rating: 4.1,
      reviewCount: 156,
      address: 'Apata, Ibadan',
      distance: '1.5 km',
    },
  ];

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
    paddingVertical: 16,
    backgroundColor: theme.colors.surfaceDefault,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.textDefaultHeading,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.secondaryDefault,
  },
  storesList: {
    gap: 12,
    paddingHorizontal: 16,
  },
  storeCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.white[600],
  },
  imageContainer: {
    width: 120,
    height: 120,
  },
  placeholderImage: {
    flex: 1,
    backgroundColor: theme.colors.white[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  storeInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  nameContainer: {
    flex: 1,
  },
  storeName: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textDefaultHeading,
  },
  distanceBadge: {
    backgroundColor: theme.colors.white[200],
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  distanceText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.secondary[500],
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  starIcon: {
    marginRight: 2,
  },
  rating: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textDefaultBody,
  },
  reviewCount: {
    fontSize: 12,
    color: theme.colors.textDefaultCaption,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addressIcon: {
    marginRight: 2,
  },
  address: {
    flex: 1,
    fontSize: 11,
    color: theme.colors.textDefaultCaption,
  },
}));

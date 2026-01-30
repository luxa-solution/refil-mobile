import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { ThemedText } from '@/shared/components';

interface GasStationCardProps {
  name: string;
  rating: number;
  reviewCount: number;
  address: string;
  image?: string;
  onPress?: () => void;
}

export function GasStationCard({
  name,
  rating,
  reviewCount,
  address,
  image,
  onPress,
}: GasStationCardProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      {/* Station Image */}
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <View style={styles.placeholderImage}>
          <MaterialCommunityIcons name="gas-cylinder" size={40} color="#f8810b" />
        </View>
      )}

      {/* Station Info */}
      <View style={styles.infoContainer}>
        <ThemedText type="defaultSemiBold" style={styles.name}>
          {name}
        </ThemedText>

        <View style={styles.ratingContainer}>
          <MaterialCommunityIcons name="star" size={14} color="#FFC107" />
          <ThemedText type="caption" style={styles.rating}>
            {rating} ({reviewCount})
          </ThemedText>
        </View>

        <View style={styles.addressContainer}>
          <MaterialCommunityIcons name="map-marker" size={14} color="#878787" />
          <ThemedText type="caption" style={styles.address} numberOfLines={1}>
            {address}
          </ThemedText>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: theme.colors.surfaceDefault,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'flex-start',

    borderWidth: 1,
    gap: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  placeholderImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: theme.colors.white[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textDefaultBody,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 12,
    color: theme.colors.textDefaultCaption,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  address: {
    flex: 1,
    fontSize: 12,
    color: theme.colors.textDefaultCaption,
  },
}));

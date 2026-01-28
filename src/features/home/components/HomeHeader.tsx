import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { ThemedText } from '@/shared/components';

interface HomeHeaderProps {
  location?: string;
  onLocationPress?: () => void;
  onProfilePress?: () => void;
}

export function HomeHeader({
  location = '22, Off Tipper garage...',
  onLocationPress,
  onProfilePress,
}: HomeHeaderProps) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.locationButton} onPress={onLocationPress}>
        <MaterialCommunityIcons
          name="map-marker"
          size={20}
          color="#f8810b"
          style={styles.locationIcon}
        />
        <ThemedText type="caption" numberOfLines={1} style={styles.locationText}>
          {location}
        </ThemedText>
        <MaterialCommunityIcons name="chevron-down" size={18} color="#878787" />
      </Pressable>

      <Pressable style={styles.profileButton} onPress={onProfilePress}>
        <View style={styles.profileAvatar}>
          <MaterialCommunityIcons name="account-circle" size={32} color="#f8810b" />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: theme.colors.surfaceDefault,
  },
  locationButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginRight: 12,
  },
  locationIcon: {
    marginRight: 2,
  },
  locationText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
    color: theme.colors.textDefaultBody,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.white[50],
  },
  profileAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

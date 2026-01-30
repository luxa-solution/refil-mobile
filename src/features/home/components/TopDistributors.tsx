import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { fontSize, ms, spacing } from '@/core/styles/responsive_scale';
import { getTopDistributors } from '@/features/home/data/mockStations';
import { ThemedText } from '@/shared/components';

interface Distributor {
  id: string;
  name: string;
  icon?: string;
}

interface TopDistributorsProps {
  onSeeAll?: () => void;
  onDistributorPress?: (distributor: Distributor) => void;
}

export function TopDistributors({ onSeeAll, onDistributorPress }: TopDistributorsProps) {
  // Get top rated stations from mock data
  const topStations = getTopDistributors(5);

  const distributors: Distributor[] = topStations.map((station) => ({
    id: station.id,
    name: station.name,
    icon: 'gas-cylinder',
  }));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="subtitle" style={styles.title}>
          Top Distributors
        </ThemedText>
        <Pressable onPress={onSeeAll}>
          <ThemedText style={styles.seeAll}>See all</ThemedText>
        </Pressable>
      </View>

      <View style={styles.distributersRow}>
        {distributors.map((distributor, index) => (
          <Pressable
            key={distributor.id}
            style={styles.distributorItem}
            onPress={() => onDistributorPress?.(distributor)}>
            <View style={styles.avatarContainer}>
              <View
                style={[
                  styles.avatar,
                  {
                    backgroundColor: index % 2 === 0 ? '#e2750a' : '#0d2881',
                  },
                ]}>
                <MaterialCommunityIcons
                  name={(distributor.icon as any) || 'warehouse'}
                  size={24}
                  color="#ffffff"
                />
              </View>
            </View>
            <ThemedText type="caption" style={styles.distributorName} numberOfLines={1}>
              {distributor.name}
            </ThemedText>
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
  distributersRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing(12),
    gap: spacing(12),
  },
  distributorItem: {
    alignItems: 'center',
    width: ms(64),
  },
  avatarContainer: {
    marginBottom: spacing(8),
  },
  avatar: {
    width: ms(56),
    height: ms(56),
    borderRadius: ms(28),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  distributorName: {
    fontSize: fontSize(12),
    fontWeight: '500',
    textAlign: 'center',
    color: theme.colors.textDefaultBody,
  },
}));

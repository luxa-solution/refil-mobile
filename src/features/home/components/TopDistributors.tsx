import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

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
  const distributors: Distributor[] = [
    { id: '1', name: 'Bovas', icon: 'warehouse' },
    { id: '2', name: 'Heagle', icon: 'gas-cylinder' },
    { id: '3', name: 'Orange', icon: 'gas-cylinder' },
    { id: '4', name: 'NNPC', icon: 'fuel' },
    { id: '5', name: 'Ace', icon: 'warehouse' },
  ];

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
        {distributors.map((distributor) => (
          <Pressable
            key={distributor.id}
            style={styles.distributorItem}
            onPress={() => onDistributorPress?.(distributor)}>
            <View style={styles.avatarContainer}>
              <View
                style={[
                  styles.avatar,
                  {
                    backgroundColor: parseInt(distributor.id) % 2 === 0 ? '#e2750a' : '#0d2881',
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
    paddingVertical: 16,
    backgroundColor: theme.colors.surfaceDefault,
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
  distributersRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    gap: 12,
  },
  distributorItem: {
    alignItems: 'center',
    width: 64,
  },
  avatarContainer: {
    marginBottom: 8,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  distributorName: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    color: theme.colors.textDefaultBody,
  },
}));

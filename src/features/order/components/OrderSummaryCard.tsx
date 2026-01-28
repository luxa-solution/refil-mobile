import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { ThemedText } from '@/shared/components';

interface OrderSummaryItem {
  label: string;
  value: string;
  icon?: string;
  onPress?: () => void;
}

interface OrderSummaryCardProps {
  items: OrderSummaryItem[];
  showToggle?: boolean;
  toggleLabel?: string;
  toggleValue?: boolean;
  onToggleChange?: (value: boolean) => void;
}

export function OrderSummaryCard({
  items,
  showToggle,
  toggleLabel,
  toggleValue = false,
  onToggleChange,
}: OrderSummaryCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.itemsContainer}>
        {items.map((item, index) => (
          <Pressable
            key={index}
            onPress={item.onPress}
            style={[styles.item, index !== items.length - 1 && styles.itemBorder]}>
            <View style={styles.itemContent}>
              {item.icon && (
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={20}
                  color="#878787"
                  style={styles.itemIcon}
                />
              )}
              <ThemedText type="default" style={styles.itemLabel}>
                {item.label}
              </ThemedText>
            </View>
            <View style={styles.itemValueContainer}>
              <ThemedText type="defaultSemiBold" style={styles.itemValue}>
                {item.value}
              </ThemedText>
              {item.onPress && (
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={20}
                  color="#878787"
                  style={styles.chevron}
                />
              )}
            </View>
          </Pressable>
        ))}
      </View>

      {showToggle && (
        <View style={styles.toggleContainer}>
          <ThemedText type="default" style={styles.toggleLabel}>
            {toggleLabel}
          </ThemedText>
          <Pressable
            style={[styles.toggleSwitch, toggleValue && styles.toggleSwitchActive]}
            onPress={() => onToggleChange?.(!toggleValue)}>
            <View style={[styles.toggleThumb, toggleValue && styles.toggleThumbActive]} />
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.white[50],
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  itemsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.white[200],
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.white[200],
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemIcon: {
    marginRight: 12,
  },
  itemLabel: {
    fontSize: 14,
    color: theme.colors.textDefaultBody,
  },
  itemValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  itemValue: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textDefaultBody,
  },
  chevron: {
    marginLeft: 4,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  toggleLabel: {
    fontSize: 14,
    color: theme.colors.textDefaultBody,
  },
  toggleSwitch: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.white[200],
    padding: 2,
    justifyContent: 'center',
  },
  toggleSwitchActive: {
    backgroundColor: theme.colors.primary[500],
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.white[50],
    alignSelf: 'flex-start',
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
}));

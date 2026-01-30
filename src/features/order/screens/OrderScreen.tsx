import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { fontSize, ms, spacing } from '@/core/styles/responsive_scale';
import { MainLayoutComponent, ThemedText } from '@/shared/components';
// import { useGetOrders } from '../api/queries';
import { EmptyOrdersState, OrderCard } from '../components';
import { getMockOrdersByStatus } from '../data/mockOrders';
import { OrderStatus } from '../types/order.dtos';

type FilterType = OrderStatus.PENDING | OrderStatus.CONFIRMED | OrderStatus.DELIVERED;

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'Pending', value: OrderStatus.PENDING },
  { label: 'Accepted', value: OrderStatus.CONFIRMED },
  { label: 'Completed', value: OrderStatus.DELIVERED },
];

export function OrderScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<FilterType>(OrderStatus.PENDING);

  // Using mock data - replace with API call when backend is ready
  // const { data, isLoading, error, refetch } = useGetOrders({
  //   status: selectedFilter,
  //   page: 1,
  //   limit: 20,
  // });
  // const orders = data?.ok ? data.data.orders : [];

  const orders = getMockOrdersByStatus(selectedFilter);
  const isLoading = false;
  const error = null;

  const handleViewDetails = (orderId: string) => {
    router.push({
      pathname: '/order-details' as any,
      params: { orderId },
    });
  };

  const handleCheckout = (orderId: string) => {
    // Navigate to checkout or handle checkout logic
    // eslint-disable-next-line no-console
    console.log('Checkout order:', orderId);
  };

  const handleCancel = (orderId: string) => {
    // Handle order cancellation
    // eslint-disable-next-line no-console
    console.log('Cancel order:', orderId);
  };

  const handleMakeOrder = () => {
    router.push('/make-order' as any);
  };

  return (
    <MainLayoutComponent backgroundColor="background" edges={['top']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <ThemedText type="title" style={styles.screenTitle}>
            Orders
          </ThemedText>
          <Text style={styles.subtitle}>Track and manage your orders</Text>
        </View>

        {/* Filters */}
        <View style={styles.filterContainer}>
          {FILTERS.map((filter) => {
            const isSelected = selectedFilter === filter.value;
            const orderCount = getMockOrdersByStatus(filter.value).length;
            return (
              <TouchableOpacity
                key={filter.value}
                style={[styles.filterButton, isSelected && styles.filterButtonActive]}
                onPress={() => setSelectedFilter(filter.value)}
                accessibilityRole="tab"
                accessibilityState={{ selected: isSelected }}
                accessibilityLabel={`${filter.label} orders, ${orderCount} items`}>
                <Text style={[styles.filterText, isSelected && styles.filterTextActive]}>
                  {filter.label}
                </Text>
                <View style={[styles.filterBadge, isSelected && styles.filterBadgeActive]}>
                  <Text
                    style={[styles.filterBadgeText, isSelected && styles.filterBadgeTextActive]}>
                    {orderCount}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Content */}
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#f8810b" />
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <ThemedText type="default" style={styles.errorText}>
              Failed to load orders
            </ThemedText>
          </View>
        ) : orders.length === 0 ? (
          <EmptyOrdersState onMakeOrder={handleMakeOrder} />
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <OrderCard
                order={item}
                onViewDetails={() => handleViewDetails(item.id)}
                onCheckout={() => handleCheckout(item.id)}
                onCancel={() => handleCancel(item.id)}
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </MainLayoutComponent>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerContainer: {
    paddingHorizontal: spacing(20),
    paddingTop: spacing(20),
    paddingBottom: spacing(16),
  },
  screenTitle: {
    fontSize: fontSize(28),
    fontWeight: '800',
    marginBottom: spacing(6),
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: fontSize(13),
    color: theme.colors.textDefaultCaption,
    fontWeight: '500',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing(20),
    paddingBottom: spacing(20),
    gap: spacing(10),
  },
  filterButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing(12),
    paddingVertical: spacing(10),
    borderRadius: ms(10),
    backgroundColor: theme.colors.surfaceSecondary,
    borderWidth: 2,
    borderColor: 'transparent',
    gap: spacing(4),
    minHeight: 44,
  },
  filterButtonActive: {
    backgroundColor: theme.colors.primaryDefault,
    borderColor: theme.colors.primaryDefault,
  },
  filterText: {
    fontSize: fontSize(11),
    fontWeight: '600',
    color: theme.colors.textDefaultBody,
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: '700',
  },
  filterBadge: {
    backgroundColor: theme.colors.surfaceDefault,
    paddingHorizontal: spacing(6),
    paddingVertical: spacing(2),
    borderRadius: ms(8),
    minWidth: ms(18),
    alignItems: 'center',
  },
  filterBadgeActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  filterBadgeText: {
    fontSize: fontSize(10),
    fontWeight: '700',
    color: theme.colors.textDefaultBody,
  },
  filterBadgeTextActive: {
    color: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  errorText: {
    textAlign: 'center',
    color: theme.colors.textDefaultCaption,
    marginBottom: spacing(12),
  },
  retryButton: {
    paddingHorizontal: spacing(16),
    paddingVertical: spacing(10),
    borderRadius: ms(8),
    backgroundColor: theme.colors.primaryDefault,
  },
  retryText: {
    color: '#fff',
    fontWeight: '600',
  },
  listContent: {
    padding: spacing(16),
    paddingTop: 0,
  },
}));

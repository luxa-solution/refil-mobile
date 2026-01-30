import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { Button, MainLayoutComponent, ThemedText } from '@/shared/components';
// import { useGetOrder } from '../api/queries';
import { getMockOrderById } from '../data/mockOrders';
import { OrderStatus } from '../types/order.dtos';

export function OrderDetailsScreen() {
  const router = useRouter();
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const { theme } = useUnistyles();

  // Using mock data - replace with API call when backend is ready
  // const { data, isLoading, error } = useGetOrder(orderId || '');

  const order = getMockOrderById(orderId || '');
  const isLoading = false;
  const error = !order;

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.DELIVERED:
        return '#05ed30';
      case OrderStatus.PENDING:
        return '#f8810b';
      case OrderStatus.CONFIRMED:
        return '#0e2c8e';
      case OrderStatus.DELIVERING:
        return '#3e56a5';
      case OrderStatus.CANCELLED:
        return '#c40000';
      default:
        return '#878787';
    }
  };

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.DELIVERED:
        return 'Delivered';
      case OrderStatus.PENDING:
        return 'Pending';
      case OrderStatus.CONFIRMED:
        return 'Accepted';
      case OrderStatus.DELIVERING:
        return 'Delivering';
      case OrderStatus.CANCELLED:
        return 'Cancelled';
      default:
        return status;
    }
  };

  if (isLoading) {
    return (
      <MainLayoutComponent backgroundColor="background" scrollEnabled={false}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#f8810b" />
        </View>
      </MainLayoutComponent>
    );
  }

  if (error || !order) {
    return (
      <MainLayoutComponent backgroundColor="background" scrollEnabled={false}>
        <View style={styles.errorContainer}>
          <ThemedText type="subtitle">Failed to load order details</ThemedText>
          <Button title="Go Back" onPress={() => router.back()} style={styles.errorButton} />
        </View>
      </MainLayoutComponent>
    );
  }

  return (
    <MainLayoutComponent backgroundColor="background" edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Go back">
          <Ionicons name="arrow-back" size={24} color={theme.colors.textDefaultHeading} />
        </TouchableOpacity>
        <ThemedText type="title" style={styles.headerTitle}>
          Order Details
        </ThemedText>
        <View style={styles.backButton} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Order Status Badge */}
        <View style={styles.statusSection}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
            <Ionicons
              name={
                order.status === OrderStatus.DELIVERED
                  ? 'checkmark-circle'
                  : order.status === OrderStatus.CONFIRMED
                    ? 'checkmark-done'
                    : 'time'
              }
              size={22}
              color="#fff"
            />
            <Text style={styles.statusText}>{getStatusText(order.status)}</Text>
          </View>
          <Text style={styles.orderNumber}>{order.orderNumber}</Text>
        </View>

        {/* Order Info */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="information-circle" size={20} color={theme.colors.primaryDefault} />
            <Text style={styles.sectionTitle}>Order Information</Text>
          </View>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Order Number</Text>
              <Text style={styles.infoValue}>{order.orderNumber}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Order Date</Text>
              <Text style={styles.infoValue}>
                {new Date(order.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </Text>
            </View>
            {order.estimatedDeliveryTime && (
              <>
                <View style={styles.divider} />
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Estimated Delivery</Text>
                  <Text style={styles.infoValue}>
                    {new Date(order.estimatedDeliveryTime).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </Text>
                </View>
              </>
            )}
            {order.actualDeliveryTime && (
              <>
                <View style={styles.divider} />
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Delivered At</Text>
                  <Text style={styles.infoValue}>
                    {new Date(order.actualDeliveryTime).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>

        {/* Items */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="cube" size={20} color={theme.colors.primaryDefault} />
            <Text style={styles.sectionTitle}>Order Items</Text>
          </View>
          {order.items.map((item) => (
            <View key={item.id} style={styles.itemCard}>
              <View style={styles.itemImageContainer}>
                <Image source={{ uri: item.productImage }} style={styles.itemImage} />
              </View>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.productName}</Text>
                <View style={styles.itemMetaRow}>
                  <View style={styles.itemQtyBadge}>
                    <Text style={styles.itemQtyText}>
                      {item.weight} × {item.quantity}
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={styles.itemPrice}>₦{item.price.toLocaleString()}</Text>
            </View>
          ))}
        </View>

        {/* Delivery Info */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="location" size={20} color={theme.colors.primaryDefault} />
            <Text style={styles.sectionTitle}>Delivery Information</Text>
          </View>
          <View style={styles.infoCard}>
            <View style={styles.deliveryRow}>
              <View style={styles.deliveryIconCircle}>
                <Ionicons name="call" size={18} color="#fff" />
              </View>
              <View style={styles.deliveryContent}>
                <Text style={styles.deliveryLabel}>Phone Number</Text>
                <Text style={styles.deliveryText}>{order.deliveryPhone}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.deliveryRow}>
              <View style={styles.deliveryIconCircle}>
                <Ionicons name="location" size={18} color="#fff" />
              </View>
              <View style={styles.deliveryContent}>
                <Text style={styles.deliveryLabel}>Delivery Address</Text>
                <Text style={styles.deliveryText}>{order.deliveryAddress.street}</Text>
                <Text style={styles.deliverySubText}>
                  {order.deliveryAddress.city}, {order.deliveryAddress.state}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Total */}
        <View style={styles.section}>
          <View style={styles.totalCard}>
            <View>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalSubLabel}>Including all charges</Text>
            </View>
            <Text style={styles.totalAmount}>₦{order.totalAmount.toLocaleString()}</Text>
          </View>
        </View>

        {/* Actions */}
        {order.status === OrderStatus.PENDING && (
          <View style={styles.section}>
            <Button title="Checkout" variant="filled" onPress={() => {}} />
            <Button
              title="Cancel Order"
              variant="outline"
              onPress={() => {}}
              style={styles.cancelButton}
            />
          </View>
        )}
      </ScrollView>
    </MainLayoutComponent>
  );
}

const styles = StyleSheet.create((theme) => ({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorButton: {
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: theme.colors.surfaceDefault,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderDefault,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  statusSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: theme.colors.textDefaultHeading,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
    marginBottom: 12,
  },
  statusText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#fff',
  },
  orderNumber: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.textDefaultCaption,
    letterSpacing: 0.5,
  },
  infoCard: {
    backgroundColor: theme.colors.surfaceDefault,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: theme.colors.borderDefault,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.borderDefault,
    marginVertical: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textDefaultCaption,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.textDefaultBody,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceDefault,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.borderDefault,
  },
  itemImageContainer: {
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: 12,
    padding: 4,
    marginRight: 14,
  },
  itemImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.textDefaultHeading,
    marginBottom: 8,
    lineHeight: 20,
  },
  itemMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemQtyBadge: {
    backgroundColor: theme.colors.surfaceSecondary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  itemQtyText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.textDefaultBody,
  },
  itemPrice: {
    fontSize: 17,
    fontWeight: '800',
    color: theme.colors.primaryDefault,
    marginLeft: 12,
  },
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  deliveryIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primaryDefault,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  deliveryContent: {
    flex: 1,
  },
  deliveryLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textDefaultCaption,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  deliveryText: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.textDefaultBody,
    lineHeight: 21,
  },
  deliverySubText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.textDefaultCaption,
    marginTop: 2,
  },
  totalCard: {
    backgroundColor: theme.colors.primaryDefaultSubtle,
    borderRadius: 16,
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.primaryDefault,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.textDefaultHeading,
    marginBottom: 4,
  },
  totalSubLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: theme.colors.textDefaultCaption,
  },
  totalAmount: {
    fontSize: 28,
    fontWeight: '900',
    color: theme.colors.primaryDefault,
  },
  cancelButton: {
    marginTop: 12,
  },
}));

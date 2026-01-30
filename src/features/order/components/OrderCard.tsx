import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { fontSize, ms, spacing } from '@/core/styles/responsive_scale';
import { Order, OrderStatus } from '../types/order.dtos';

interface OrderCardProps {
  order: Order;
  onViewDetails?: () => void;
  onCheckout?: () => void;
  onCancel?: () => void;
}

export function OrderCard({ order, onViewDetails, onCheckout, onCancel }: OrderCardProps) {
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

  const isPending = order.status === OrderStatus.PENDING;
  const isDelivered = order.status === OrderStatus.DELIVERED;
  const isConfirmed = order.status === OrderStatus.CONFIRMED;

  // Get first item for display
  const firstItem = order.items[0];

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onViewDetails}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`Order ${order.orderNumber}`}
      accessibilityHint="Tap to view order details">
      {/* Order Number Badge */}
      <View style={styles.orderNumberContainer}>
        <Text style={styles.orderNumber}>{order.orderNumber}</Text>
        <View style={styles.orderDateContainer}>
          <Text style={styles.orderDate}>
            {new Date(order.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </Text>
        </View>
      </View>

      {/* Product Info */}
      <View style={styles.productSection}>
        <View style={styles.productInfo}>
          {firstItem?.productImage && (
            <View style={styles.imageContainer}>
              <Image source={{ uri: firstItem.productImage }} style={styles.productImage} />
            </View>
          )}
          <View style={styles.productDetails}>
            <Text style={styles.productName} numberOfLines={2}>
              {firstItem?.productName || 'Order'}
            </Text>
            <View style={styles.productMetaRow}>
              <View style={styles.weightBadge}>
                <Ionicons name="cube-outline" size={14} color="#606060" />
                <Text style={styles.weightText}>{firstItem?.weight}</Text>
              </View>
              <View style={styles.priceBadge}>
                <Text style={styles.priceAmount}>₦{order.totalAmount.toLocaleString()}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Delivery Info */}
      <View style={styles.deliverySection}>
        <View style={styles.infoRow}>
          <View style={styles.iconCircle}>
            <Ionicons name="call" size={16} color="#0e2c8e" />
          </View>
          <Text style={styles.infoText}>{order.deliveryPhone}</Text>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.iconCircle}>
            <Ionicons name="location" size={16} color="#0e2c8e" />
          </View>
          <Text style={styles.infoText} numberOfLines={2}>
            {order.deliveryAddress.fullAddress}
          </Text>
        </View>
      </View>

      {/* Actions */}
      {isPending ? (
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={(e) => {
              e.stopPropagation();
              onCheckout?.();
            }}
            accessibilityRole="button"
            accessibilityLabel="Checkout order">
            <Text style={styles.checkoutText}>Checkout</Text>
            <Ionicons name="arrow-forward" size={18} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={(e) => {
              e.stopPropagation();
              onCancel?.();
            }}
            accessibilityRole="button"
            accessibilityLabel="Cancel order">
            <Text style={styles.cancelText}>Cancel Order</Text>
          </TouchableOpacity>
        </View>
      ) : isConfirmed ? (
        <View style={styles.confirmedContainer}>
          <View style={[styles.statusPill, { backgroundColor: getStatusColor(order.status) }]}>
            <Ionicons name="checkmark-circle" size={18} color="#fff" />
            <Text style={styles.statusPillText}>{getStatusText(order.status)}</Text>
          </View>
          <Text style={styles.confirmedMessage}>Your order is being prepared for delivery</Text>
        </View>
      ) : (
        <View style={[styles.statusPill, { backgroundColor: getStatusColor(order.status) }]}>
          <Ionicons
            name={isDelivered ? 'checkmark-done-circle' : 'hourglass'}
            size={18}
            color="#fff"
          />
          <Text style={styles.statusPillText}>{getStatusText(order.status)}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create((theme) => ({
  card: {
    backgroundColor: theme.colors.surfaceDefault,
    borderRadius: ms(12),
    padding: spacing(16),
    marginBottom: spacing(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: theme.colors.borderDefault,
  },
  orderNumberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing(12),
  },
  orderNumber: {
    fontSize: fontSize(11),
    fontWeight: '700',
    color: theme.colors.textDefaultCaption,
    letterSpacing: 0.5,
  },
  orderDateContainer: {
    backgroundColor: theme.colors.surfaceSecondary,
    paddingHorizontal: spacing(8),
    paddingVertical: spacing(3),
    borderRadius: ms(5),
  },
  orderDate: {
    fontSize: fontSize(10),
    fontWeight: '600',
    color: theme.colors.textDefaultCaption,
  },
  productSection: {
    marginBottom: spacing(12),
  },
  productInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  imageContainer: {
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: ms(10),
    padding: spacing(3),
    marginRight: spacing(12),
  },
  productImage: {
    width: ms(48),
    height: ms(48),
    borderRadius: ms(6),
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: fontSize(15),
    fontWeight: '700',
    color: theme.colors.textDefaultHeading,
    marginBottom: spacing(6),
    lineHeight: 20,
  },
  productMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(10),
  },
  weightBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceSecondary,
    paddingHorizontal: spacing(8),
    paddingVertical: spacing(4),
    borderRadius: ms(6),
    gap: spacing(3),
  },
  weightText: {
    fontSize: fontSize(12),
    fontWeight: '600',
    color: theme.colors.textDefaultBody,
  },
  priceBadge: {
    flex: 1,
  },
  priceAmount: {
    fontSize: fontSize(16),
    fontWeight: '800',
    color: theme.colors.primaryDefault,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.borderDefault,
    marginVertical: spacing(12),
  },
  deliverySection: {
    gap: spacing(10),
    marginBottom: spacing(12),
  },
  iconCircle: {
    width: ms(28),
    height: ms(28),
    borderRadius: ms(14),
    backgroundColor: theme.colors.primaryDefaultSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing(10),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: fontSize(13),
    fontWeight: '500',
    color: theme.colors.textDefaultBody,
    flex: 1,
    lineHeight: 18,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing(8),
  },
  checkoutButton: {
    flex: 1,
    backgroundColor: theme.colors.primaryDefault,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing(12),
    borderRadius: ms(10),
    gap: spacing(4),
    minHeight: 44,
  },
  checkoutText: {
    fontSize: fontSize(14),
    fontWeight: '700',
    color: '#fff',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: theme.colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing(12),
    borderRadius: ms(10),
    borderWidth: 1,
    borderColor: theme.colors.borderDefault,
    minHeight: 44,
  },
  cancelText: {
    fontSize: fontSize(14),
    fontWeight: '600',
    color: theme.colors.textDefaultBody,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing(10),
    paddingHorizontal: spacing(14),
    borderRadius: ms(8),
    gap: spacing(4),
  },
  statusPillText: {
    fontSize: fontSize(14),
    fontWeight: '700',
    color: '#fff',
  },
  confirmedContainer: {
    gap: spacing(8),
  },
  confirmedMessage: {
    fontSize: fontSize(12),
    fontWeight: '500',
    color: theme.colors.textDefaultCaption,
    textAlign: 'center',
    lineHeight: 16,
  },
}));

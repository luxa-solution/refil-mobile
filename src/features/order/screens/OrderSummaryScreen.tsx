import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import {
  DeliveryAddressModal,
  GasStationCard,
  OrderSummaryCard,
} from '@/features/order/components';
import { Button, MainLayoutComponent, ThemedText } from '@/shared/components';

interface DeliveryAddress {
  id: string;
  title: string;
  subtitle: string;
}

const MOCK_ADDRESSES: DeliveryAddress[] = [
  {
    id: '1',
    title: 'Apartment 609',
    subtitle: '22, Off Tipper garage...',
  },
  {
    id: '2',
    title: 'Apartment 609',
    subtitle: '22, Off Tipper garage...',
  },
  {
    id: '3',
    title: 'Apartment 609',
    subtitle: '22, Off Tipper garage...',
  },
];

export function OrderSummaryScreen() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { stationId, size } = useLocalSearchParams() as { stationId?: string; size?: string };

  const [selectedAddressId, setSelectedAddressId] = useState<string>('1');
  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const [requestInvoice, setRequestInvoice] = useState(false);

  const selectedAddress = MOCK_ADDRESSES.find((addr) => addr.id === selectedAddressId);

  const handleAddressSelect = (address: DeliveryAddress) => {
    setSelectedAddressId(address.id);
    setAddressModalVisible(false);
  };

  const summaryItems = [
    { label: 'Order KG', value: '40.00kg', icon: 'gas-cylinder' },
    { label: 'Order Amount', value: '₦40,000', icon: 'cash' },
    { label: 'Delivery Fee', value: '₦5,500', icon: 'truck-delivery' },
    {
      label: 'Add Notes',
      value: '',
      icon: 'note-edit-outline',
      onPress: () => {
        // Handle add notes
      },
    },
  ];

  return (
    <>
      <MainLayoutComponent backgroundColor="background" edges={['top', 'bottom']}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <MaterialCommunityIcons name="chevron-left" size={24} color="#121212" />
          </Pressable>
          <ThemedText type="subtitle" style={styles.headerTitle}>
            Make Order
          </ThemedText>
          <Pressable style={styles.heartButton}>
            <MaterialCommunityIcons name="heart-outline" size={24} color="#121212" />
          </Pressable>
        </View>

        {/* Product Image (Partial) */}
        <View style={styles.productImageContainer}>
          <View style={styles.placeholderGasImage}>
            <MaterialCommunityIcons name="gas-cylinder" size={80} color="#0e2c8e" />
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Gas Station Card */}
          <GasStationCard
            name="Heagle Gas Station"
            rating={4.2}
            reviewCount={187}
            address="Illorin Mall, Taiwo Rd, Offa Garage"
          />

          {/* Delivery Address Section */}
          <View style={styles.sectionContainer}>
            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
              Delivery Address
            </ThemedText>
            <Pressable style={styles.addressButton} onPress={() => setAddressModalVisible(true)}>
              <View style={styles.addressIconContainer}>
                <MaterialCommunityIcons name="map-marker" size={20} color="#0e2c8e" />
              </View>
              <View style={styles.addressTextContainer}>
                <ThemedText type="defaultSemiBold" style={styles.addressTitle}>
                  {selectedAddress?.title}
                </ThemedText>
                <ThemedText type="caption" style={styles.addressSubtitle}>
                  {selectedAddress?.subtitle}
                </ThemedText>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={20} color="#878787" />
            </Pressable>
          </View>

          {/* Order Summary Section */}
          <View style={styles.sectionContainer}>
            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
              Order Summary
            </ThemedText>
            <OrderSummaryCard
              items={summaryItems}
              showToggle
              toggleLabel="Request an invoice"
              toggleValue={requestInvoice}
              onToggleChange={setRequestInvoice}
            />
          </View>

          {/* Checkout Button */}
          <Button
            title="Proceed to Checkout"
            onPress={() => {
              // Handle checkout
              router.push('/(tabs)' as any);
            }}
            style={styles.checkoutButton}
          />
        </View>
      </MainLayoutComponent>

      {/* Delivery Address Modal */}
      <DeliveryAddressModal
        visible={addressModalVisible}
        addresses={MOCK_ADDRESSES}
        selectedAddressId={selectedAddressId}
        onAddressSelect={handleAddressSelect}
        onAddNew={() => {
          setAddressModalVisible(false);
          // Navigate to add new address screen
        }}
        onClose={() => setAddressModalVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create((theme) => ({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: theme.colors.surfaceDefault,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.white[600],
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.textDefaultBody,
    flex: 1,
    textAlign: 'center',
  },
  heartButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.white[600],
  },
  productImageContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
    backgroundColor: theme.colors.white[50],
    overflow: 'hidden',
  },
  placeholderGasImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textDefaultBody,
    marginBottom: 12,
  },
  addressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: theme.colors.white[50],
    borderRadius: 12,
    gap: 12,
  },
  addressIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: theme.colors.secondary[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressTextContainer: {
    flex: 1,
  },
  addressTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textDefaultBody,
    marginBottom: 2,
  },
  addressSubtitle: {
    fontSize: 12,
    color: theme.colors.textDefaultCaption,
  },
  checkoutButton: {
    marginTop: 8,
  },
}));

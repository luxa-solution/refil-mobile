import React, { useState } from 'react';
import { Modal, Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { ThemedText } from '@/shared/components';

interface Address {
  id: string;
  title: string;
  subtitle: string;
}

interface DeliveryAddressModalProps {
  visible: boolean;
  addresses: Address[];
  selectedAddressId?: string;
  onAddressSelect?: (address: Address) => void;
  onAddNew?: () => void;
  onClose?: () => void;
}

export function DeliveryAddressModal({
  visible,
  addresses,
  selectedAddressId,
  onAddressSelect,
  onAddNew,
  onClose,
}: DeliveryAddressModalProps) {
  const [localSelectedId, setLocalSelectedId] = useState(selectedAddressId);

  const handleSelectAddress = (address: Address) => {
    setLocalSelectedId(address.id);
    onAddressSelect?.(address);
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.handle} />

          <View style={styles.content}>
            {addresses.map((address) => (
              <Pressable
                key={address.id}
                style={styles.addressItem}
                onPress={() => handleSelectAddress(address)}>
                <View style={styles.addressInfo}>
                  <ThemedText type="defaultSemiBold" style={styles.addressTitle}>
                    {address.title}
                  </ThemedText>
                  <ThemedText type="caption" style={styles.addressSubtitle}>
                    {address.subtitle}
                  </ThemedText>
                </View>
                <View
                  style={[
                    styles.radioButton,
                    localSelectedId === address.id && styles.radioButtonSelected,
                  ]}>
                  {localSelectedId === address.id && <View style={styles.radioButtonInner} />}
                </View>
              </Pressable>
            ))}
          </View>

          <View style={styles.addNewContainer}>
            <Pressable style={styles.addNewButton} onPress={onAddNew}>
              <ThemedText type="defaultSemiBold" style={styles.addNewText}>
                Add New Address
              </ThemedText>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create((theme) => ({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: theme.colors.surfaceDefault,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: theme.colors.white[600],
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 16,
  },
  content: {
    paddingHorizontal: 16,
    maxHeight: 400,
  },
  addressItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: theme.colors.white[50],
    borderRadius: 12,
    marginBottom: 12,
  },
  addressInfo: {
    flex: 1,
    marginRight: 12,
  },
  addressTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textDefaultBody,
    marginBottom: 4,
  },
  addressSubtitle: {
    fontSize: 12,
    color: theme.colors.textDefaultCaption,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.secondary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    backgroundColor: theme.colors.secondary[500],
  },
  radioButtonInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.white[50],
  },
  addNewContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  addNewButton: {
    paddingVertical: 12,
    backgroundColor: theme.colors.primary[500],
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addNewText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
}));

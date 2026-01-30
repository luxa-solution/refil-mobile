import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

interface EmptyOrdersStateProps {
  onMakeOrder: () => void;
}

export function EmptyOrdersState({ onMakeOrder }: EmptyOrdersStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.illustrationContainer}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>📦</Text>
        </View>
      </View>
      <Text style={styles.title}>No Orders Yet</Text>
      <Text style={styles.description}>
        You don&apos;t have any orders at the moment.{`\n`}
        Start by placing your first order!
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={onMakeOrder}
        accessibilityRole="button"
        accessibilityLabel="Make your first order">
        <Text style={styles.buttonText}>Place First Order</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 40,
  },
  illustrationContainer: {
    marginBottom: 32,
  },
  iconCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: theme.colors.primaryDefaultSubtle,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 70,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: theme.colors.textDefaultHeading,
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    fontWeight: '500',
    color: theme.colors.textDefaultCaption,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
    maxWidth: 280,
  },
  button: {
    backgroundColor: theme.colors.primaryDefault,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    minWidth: 200,
    alignItems: 'center',
    minHeight: 52,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
}));

import { Href, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { Container } from '../components/layout/Container';
import { useDeviceLocation } from '../hooks/useDeviceLocation';
import { useAuthFlowStore } from '../store/authFlowStore';

export function AddLocationScreen() {
  const router = useRouter();
  const { loading, error, address, refresh } = useDeviceLocation(false);
  const resetFlow = useAuthFlowStore((s) => s.resetFlow);
  const [saving, setSaving] = useState(false);

  const handlePress = async () => {
    const dto = address ?? (await refresh());
    if (!dto) return Alert.alert('Location', error ?? 'Unable to fetch location');

    setSaving(true);
    try {
      // TODO: call the correct endpoint to persist address
      // const res = await upsertUserMutation({ addresses: [dto] });
      // if (!res.ok) return Alert.alert('Save address', res.error);

      resetFlow();
      router.replace('/(tabs)' as Href);
    } finally {
      setSaving(false);
    }
  };
  return (
    <Container>
      <View style={styles.wrap}>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={require('@/assets/images/auth/location-icon.png')}
            resizeMode="cover"
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.sub}>Add your address to discover stations closeby</Text>

          <PrimaryButton
            title={loading ? 'Getting location...' : 'Add Location'}
            onPress={handlePress}
            loading={loading || saving}
          />
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create((theme) => ({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    gap: 60,
  },
  imageWrapper: {
    height: 256,
  },
  image: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  content: {
    gap: 24,
  },
  sub: {
    textAlign: 'center',
    color: theme.colors.textDefaultCaption,
    fontSize: 24,
    fontWeight: '500',
  },
}));

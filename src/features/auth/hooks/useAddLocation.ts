import { Href, useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { Alert } from 'react-native';

import { useAuthFlowStore } from '../store/authFlowStore';
import { AddressRequestDto } from '../types/auth.dto';
import { useDeviceLocation } from './useDeviceLocation';

type Result = {
  loading: boolean;
  ctaTitle: string;
  onPress: () => Promise<void>;
  address?: AddressRequestDto | null;
  error?: string;
};

export function useAddLocation(): Result {
  const router = useRouter();

  const resetFlow = useAuthFlowStore((s) => s.resetFlow);
  const { loading, error, address, refresh } = useDeviceLocation(false);

  const [saving, setSaving] = useState(false);

  const ctaTitle = useMemo(() => {
    if (loading) return 'Getting location...';
    return 'Add Location';
  }, [loading]);

  const onPress = useCallback(async () => {
    const dto = address ?? (await refresh());

    if (!dto) {
      Alert.alert('Location', error ?? 'Unable to fetch location');
      return;
    }

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
  }, [address, refresh, error, resetFlow, router]);

  return {
    loading: loading || saving,
    ctaTitle,
    onPress,
    address,
    error,
  };
}

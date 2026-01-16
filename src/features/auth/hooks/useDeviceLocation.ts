import * as Location from 'expo-location';
import { useCallback, useEffect, useState } from 'react';
import type { AddressRequestDto } from '../types/auth.dto';
import { toAddressRequestDto } from '../utils/location';

type State = {
  loading: boolean;
  error?: string;
  address: AddressRequestDto | null;
};

export function useDeviceLocation(autoFetch = false) {
  const [state, setState] = useState<State>({
    loading: false,
    error: undefined,
    address: null,
  });

  const refresh = useCallback(async (): Promise<AddressRequestDto | null> => {
    setState((s) => ({ ...s, loading: true, error: undefined }));

    try {
      const perm = await Location.requestForegroundPermissionsAsync();
      if (perm.status !== 'granted') {
        setState((s) => ({ ...s, loading: false, error: 'Location permission denied' }));
        return null;
      }

      const pos = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const coords = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      };

      let place: Location.LocationGeocodedAddress | undefined;
      try {
        const places = await Location.reverseGeocodeAsync(coords);
        place = places?.[0];
      } catch {
        // reverse geocode can fail; still return lat/lng
      }

      const address = toAddressRequestDto(coords, place);

      setState({ loading: false, error: undefined, address });
      return address;
    } catch (e: any) {
      setState((s) => ({
        ...s,
        loading: false,
        error: e?.message ?? 'Could not get location',
      }));
      return null;
    }
  }, []);

  useEffect(() => {
    if (autoFetch) void refresh();
  }, [autoFetch, refresh]);

  return {
    loading: state.loading,
    error: state.error,
    address: state.address,
    refresh,
  };
}

// hooks/useLocation.ts
import * as Location from 'expo-location';
import { useCallback, useEffect, useRef, useState } from 'react';

import { LocationService } from '@/shared/api/LocationService';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface LocationConfig {
  /**
   * Fallback/business location coordinates
   */
  fallbackLocation?: Coordinates | null;

  /**
   * Whether to automatically request device location on mount
   * @default false
   */
  autoRequest?: boolean;

  /**
   * Location accuracy level
   * @default Location.Accuracy.Balanced
   */
  accuracy?: Location.LocationAccuracy;

  /**
   * Whether to watch location continuously
   * @default false
   */
  watchPosition?: boolean;

  /**
   * Distance interval (meters) for location updates when watching
   * @default 10
   */
  distanceInterval?: number;

  /**
   * Time interval (ms) for location updates when watching
   * @default 10000 (10 seconds)
   */
  timeInterval?: number;

  /**
   * Callback when location changes
   */
  onLocationChange?: (coords: Coordinates) => void;

  /**
   * Callback when permission status changes
   */
  onPermissionChange?: (granted: boolean) => void;
}

export type LocationSource = 'device' | 'fallback' | 'none';

export interface UseLocationReturn {
  /**
   * Current coordinates (device or fallback)
   */
  coordinates: Coordinates | null;

  /**
   * Device location (null if not available/permitted)
   */
  deviceLocation: Coordinates | null;

  /**
   * Fallback/business location
   */
  fallbackLocation: Coordinates | null;

  /**
   * Source of current coordinates
   */
  source: LocationSource;

  /**
   * Whether location permission is granted
   */
  hasPermission: boolean;

  /**
   * Whether currently fetching location
   */
  isLoading: boolean;

  /**
   * Any error that occurred
   */
  error: Error | null;

  /**
   * Permission status details
   */
  permissionStatus: Location.PermissionResponse | null;

  /**
   * Request location permission
   */
  requestPermission: () => Promise<boolean>;

  /**
   * Fetch current device location once
   */
  fetchLocation: () => Promise<Coordinates | null>;

  /**
   * Start watching location continuously
   */
  startWatching: () => Promise<void>;

  /**
   * Stop watching location
   */
  stopWatching: () => void;

  /**
   * Manually set fallback location
   */
  setFallbackLocation: (coords: Coordinates | null) => void;

  /**
   * Clear any errors
   */
  clearError: () => void;
  /**
   * Human readable address for current coordinates (reverse geocoded)
   */
  address: string | null;
  /**
   * Loading flag for reverse geocoding
   */
  addressLoading: boolean;
  /**
   * Any error (string) from reverse geocoding
   */
  addressError: string | null;
  /**
   * Reverse geocode coordinates to an address (manual)
   */
  reverseGeocodeCoords: (coords: Coordinates) => Promise<string | null>;
}

/**
 * Comprehensive location hook for React Native with Expo
 *
 * @example
 * ```tsx
 * // Use device location with fallback
 * const { coordinates, source, requestPermission, hasPermission } = useLocation({
 *   fallbackLocation: { latitude: 6.5244, longitude: 3.3792 },
 *   autoRequest: true,
 * });
 *
 * // Watch location continuously
 * const { coordinates, startWatching, stopWatching } = useLocation({
 *   watchPosition: true,
 *   distanceInterval: 50, // Update every 50 meters
 * });
 *
 * // Manual control
 * const { coordinates, fetchLocation, hasPermission } = useLocation();
 *
 * const handleGetLocation = async () => {
 *   if (!hasPermission) {
 *     await requestPermission();
 *   }
 *   await fetchLocation();
 * };
 * ```
 */
const useLocation = (config: LocationConfig = {}): UseLocationReturn => {
  const {
    fallbackLocation: initialFallback = null,
    autoRequest = false,
    accuracy = Location.Accuracy.Balanced,
    watchPosition = false,
    distanceInterval = 10,
    timeInterval = 10000,
    onLocationChange,
    onPermissionChange,
  } = config;

  const [deviceLocation, setDeviceLocation] = useState<Coordinates | null>(null);
  const [fallbackLocation, setFallbackLocation] = useState<Coordinates | null>(initialFallback);
  const [permissionStatus, setPermissionStatus] = useState<Location.PermissionResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressError, setAddressError] = useState<string | null>(null);

  const watchSubscriptionRef = useRef<Location.LocationSubscription | null>(null);
  const isMountedRef = useRef(true);

  // Determine current coordinates and source
  const coordinates = deviceLocation || fallbackLocation;
  const source: LocationSource = deviceLocation ? 'device' : fallbackLocation ? 'fallback' : 'none';
  const hasPermission = permissionStatus?.granted === true;

  /**
   * Request location permission
   */
  const requestPermission = useCallback(async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      // eslint-disable-next-line no-console
      console.debug('[useLocation] Requesting location permission');
      const response = await Location.requestForegroundPermissionsAsync();

      setPermissionStatus(response);
      const granted = response.granted;

      // eslint-disable-next-line no-console
      console.debug('[useLocation] Permission status:', {
        granted,
        canAskAgain: response.canAskAgain,
        status: response.status,
      });
      onPermissionChange?.(granted);

      return granted;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Permission request failed');
      // eslint-disable-next-line no-console
      console.error('[useLocation] Permission error:', err);
      setError(error);
      return false;
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [onPermissionChange]);

  /**
   * Fetch current device location once
   */
  const fetchLocation = useCallback(async (): Promise<Coordinates | null> => {
    try {
      setIsLoading(true);
      setError(null);

      // Check permission first
      const response = await Location.getForegroundPermissionsAsync();
      if (!response.granted) {
        throw new Error('Location permission not granted');
      }

      // eslint-disable-next-line no-console
      console.debug('[useLocation] Fetching current location');
      const location = await Location.getCurrentPositionAsync({
        accuracy,
      });

      const coords: Coordinates = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      // eslint-disable-next-line no-console
      console.debug('[useLocation] Location fetched:', coords);

      if (isMountedRef.current) {
        setDeviceLocation(coords);
        onLocationChange?.(coords);
      }

      return coords;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch location');
      // eslint-disable-next-line no-console
      console.error('[useLocation] Fetch error:', err);

      if (isMountedRef.current) {
        setError(error);
      }

      return null;
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [accuracy, onLocationChange]);

  /**
   * Start watching location continuously
   */
  const startWatching = useCallback(async (): Promise<void> => {
    try {
      // Stop any existing watch
      if (watchSubscriptionRef.current) {
        watchSubscriptionRef.current.remove();
        watchSubscriptionRef.current = null;
      }

      // Check permission
      const response = await Location.getForegroundPermissionsAsync();
      if (!response.granted) {
        throw new Error('Location permission not granted');
      }
      // eslint-disable-next-line no-console
      console.debug('[useLocation] Starting location watch');

      const subscription = await Location.watchPositionAsync(
        {
          accuracy,
          distanceInterval,
          timeInterval,
        },
        (location) => {
          const coords: Coordinates = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };

          // eslint-disable-next-line no-console
          console.debug('[useLocation] Location updated:', coords);

          if (isMountedRef.current) {
            setDeviceLocation(coords);
            onLocationChange?.(coords);
          }
        }
      );

      watchSubscriptionRef.current = subscription;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to watch location');
      // eslint-disable-next-line no-console
      console.error('[useLocation] Watch error:', err);
      setError(error);
    }
  }, [accuracy, distanceInterval, timeInterval, onLocationChange]);

  /**
   * Stop watching location
   */
  const stopWatching = useCallback((): void => {
    if (watchSubscriptionRef.current) {
      // eslint-disable-next-line no-console
      console.debug('[useLocation] Stopping location watch');
      watchSubscriptionRef.current.remove();
      watchSubscriptionRef.current = null;
    }
  }, []);

  /**
   * Clear error
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Reverse geocode given coordinates to an address string.
   * Updates internal address state and returns the address.
   */
  const reverseGeocodeCoords = useCallback(async (coords: Coordinates): Promise<string | null> => {
    try {
      setAddressLoading(true);
      setAddressError(null);
      const addr = await LocationService.reverseGeocode({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      if (isMountedRef.current) {
        setAddress(addr);
      }
      return addr;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Reverse geocode failed';
      // eslint-disable-next-line no-console
      console.error('[useLocation] reverseGeocode error:', err);
      if (isMountedRef.current) setAddressError(msg);
      return null;
    } finally {
      if (isMountedRef.current) setAddressLoading(false);
    }
  }, []);

  // Check initial permission status
  useEffect(() => {
    const checkInitialPermission = async () => {
      try {
        const response = await Location.getForegroundPermissionsAsync();
        setPermissionStatus(response);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('[useLocation] Initial permission check failed:', err);
      }
    };

    checkInitialPermission();
  }, []);

  // Auto-request permission and fetch location if configured
  useEffect(() => {
    if (!autoRequest) return;

    const autoFetch = async () => {
      const granted = await requestPermission();
      if (granted) {
        await fetchLocation();
      }
    };

    autoFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRequest]); // Only run on mount when autoRequest changes

  // When deviceLocation changes, attempt to reverse geocode it
  useEffect(() => {
    if (!deviceLocation) return;
    // fire and forget
    reverseGeocodeCoords(deviceLocation).catch(() => {});
  }, [deviceLocation, reverseGeocodeCoords]);

  // Auto-start watching if configured
  useEffect(() => {
    if (!watchPosition) return;

    const autoWatch = async () => {
      const response = await Location.getForegroundPermissionsAsync();
      if (response.granted) {
        await startWatching();
      }
    };

    autoWatch();

    return () => {
      stopWatching();
    };
  }, [watchPosition, startWatching, stopWatching]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      stopWatching();
    };
  }, [stopWatching]);

  return {
    coordinates,
    deviceLocation,
    fallbackLocation,
    source,
    hasPermission,
    isLoading,
    error,
    permissionStatus,
    requestPermission,
    fetchLocation,
    startWatching,
    stopWatching,
    setFallbackLocation,
    clearError,
    address,
    addressLoading,
    addressError,
    reverseGeocodeCoords,
  };
};

export default useLocation;

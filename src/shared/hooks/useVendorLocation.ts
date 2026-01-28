// hooks/useVendorLocation.ts
import { useEffect, useMemo } from 'react';

import { isValidLatLng } from '@/shared/utils/constants';
import useLocation, { Coordinates } from './useLocation';

export interface VendorLocationConfig {
  /**
   * Business location from profile
   */
  businessLocation?: {
    lat?: string | number | null;
    lng?: string | number | null;
  } | null;

  /**
   * Whether to prefer device location over business location
   * @default true
   */
  preferDeviceLocation?: boolean;

  /**
   * Whether to automatically request device location
   * @default false
   */
  autoRequestLocation?: boolean;

  /**
   * Default coordinates if business location is invalid
   * @default Lagos, Nigeria coordinates
   */
  defaultLocation?: Coordinates;
}

/**
 * Specialized location hook for vendors
 * Handles business location parsing and provides smart fallback
 */
export const useVendorLocation = (config: VendorLocationConfig = {}) => {
  const {
    businessLocation,
    preferDeviceLocation = true,
    autoRequestLocation = false,
    defaultLocation = { latitude: 6.5244, longitude: 3.3792 }, // Lagos
  } = config;

  // Parse business location
  const parsedBusinessLocation = useMemo((): Coordinates | null => {
    if (!businessLocation?.lat || !businessLocation?.lng) {
      return null;
    }

    const lat =
      typeof businessLocation.lat === 'string'
        ? parseFloat(businessLocation.lat)
        : businessLocation.lat;
    const lng =
      typeof businessLocation.lng === 'string'
        ? parseFloat(businessLocation.lng)
        : businessLocation.lng;

    // Validate coordinates
    if (isValidLatLng(lat, lng) === false) {
      // eslint-disable-next-line no-console
      console.warn('[useVendorLocation] Invalid business coordinates:', {
        lat,
        lng,
      });
      return null;
    }

    return { latitude: lat, longitude: lng };
  }, [businessLocation]);

  // Determine fallback location
  const fallback = parsedBusinessLocation || defaultLocation;

  const location = useLocation({
    fallbackLocation: fallback,
    autoRequest: autoRequestLocation,
  });

  // Determine final coordinates based on preference
  const finalCoordinates = useMemo(() => {
    if (preferDeviceLocation && location.deviceLocation) {
      return location.deviceLocation;
    }
    return location.coordinates; // Device or fallback
  }, [preferDeviceLocation, location.deviceLocation, location.coordinates]);

  // Log coordinate source for debugging
  useEffect(() => {
    if (finalCoordinates) {
      // eslint-disable-next-line no-console
      console.debug('[useVendorLocation] Using coordinates:', {
        source: location.source,
        coords: finalCoordinates,
        preferDevice: preferDeviceLocation,
      });
    }
  }, [finalCoordinates, location.source, preferDeviceLocation]);

  return {
    ...location,
    /**
     * Final coordinates to use (respects preference)
     */
    coordinates: finalCoordinates,
    /**
     * Parsed business location
     */
    businessLocation: parsedBusinessLocation,
    /**
     * Default fallback location
     */
    defaultLocation,
  };
};

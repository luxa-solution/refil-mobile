import { AxiosResponse } from 'axios';
import * as Location from 'expo-location';

import { api } from '@/core/api/client';
import { API_CONFIG } from '@/core/api/config';
import { DetailsRes, PlacesResponse } from '../types';

// Location cache duration (10 minutes)
const LOCATION_STALE_TIME = 10 * 60 * 1000;

export class LocationService {
  static getPlacesAutoComplete = async (query: string) => {
    const data: AxiosResponse<
      {
        predictions: PlacesResponse[];
        status: string;
      },
      any
    > = await api(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        query
      )}&key=${API_CONFIG.baseURL}&language=en&components=country:ng`
    );
    const mainData = data?.data ?? {};
    return mainData;
  };

  static getPlacesDetail = async (placeId: string) => {
    const data: AxiosResponse<
      {
        // result: DetailsRes[];
        result: DetailsRes;
        status: string;
      },
      any
    > = await api(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${API_CONFIG.baseURL}&fields=geometry,formatted_address,name`
    );
    const mainData = data?.data ?? {};
    return mainData;
  };

  static getCurrentLocation = async () => {
    const permission = await Location.getForegroundPermissionsAsync();
    let status = permission.status;
    if (status !== 'granted') {
      const requested = await Location.requestForegroundPermissionsAsync();
      status = requested.status;
    }
    if (status !== 'granted') {
      return null;
    }

    const lastKnown = await Location.getLastKnownPositionAsync({
      maxAge: LOCATION_STALE_TIME,
    });
    if (lastKnown) {
      return lastKnown;
    }

    return Location.getCurrentPositionAsync({
      accuracy: Location.LocationAccuracy.High,
      timeInterval: LOCATION_STALE_TIME,
    });
  };

  /**
   * Reverse geocode coordinates to a formatted address
   */
  static reverseGeocode = async (coords: {
    latitude: number;
    longitude: number;
  }): Promise<string | null> => {
    const [place] = await Location.reverseGeocodeAsync(coords);

    if (!place) return null;

    const parts = [
      place.name,
      place.street,
      place.city || place.subregion,
      place.region,
      place.country,
    ].filter(Boolean);

    return parts.slice(0, 3).join(', ') || null;
  };
}

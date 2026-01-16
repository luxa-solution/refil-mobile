import type * as Location from 'expo-location';
import type { AddressRequestDto } from '../types/auth.dto';

type Coords = { latitude: number; longitude: number };

function formatStreet(place?: Location.LocationGeocodedAddress) {
  return [place?.streetNumber, place?.street].filter(Boolean).join(' ').trim();
}

function formatCity(place?: Location.LocationGeocodedAddress) {
  return place?.city ?? place?.region ?? place?.subregion ?? '';
}

export function toAddressRequestDto(
  coords: Coords,
  place?: Location.LocationGeocodedAddress
): AddressRequestDto {
  return {
    city: formatCity(place),
    street: formatStreet(place),
    latitude: coords.latitude,
    longitude: coords.longitude,
    default: true,
    // userId is optional; server can infer from token or you can set later
  };
}

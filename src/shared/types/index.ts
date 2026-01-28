export interface PlacesResponse {
  description: string;
  place_id: string;
  reference: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
  terms: {
    offset: number;
    value: string;
  }[];
}

export type Geo = {
  lat: number;
  lng: number;
};
export interface DetailsRes {
  formatted_address: string;
  geometry: {
    location: Geo;
    viewport: {
      northeast: Geo;
      southwest: Geo;
    };
  };
}

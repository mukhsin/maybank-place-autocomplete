/**
 * Place type representing a location from Google Places API
 */
export interface Place {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  types?: string[];
  rating?: number;
  photos?: google.maps.places.PlacePhoto[];
  opening_hours?: {
    open_now: boolean;
    periods?: google.maps.places.PlaceOpeningHoursPeriod[];
  };
  reviews?: google.maps.places.PlaceReview[];
}

/**
 * Place prediction returned by autocomplete service
 */
export interface PlacePrediction {
  description: string;
  place_id: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

/**
 * Map center coordinates
 */
export interface MapCenter {
  lat: number;
  lng: number;
}

import {
  fetchPlaceDetails as fetchGoogleDetails,
  fetchPlacePredictions as fetchGooglePredictions,
} from "@/services/googlePlacesApi";
import type { Place, PlacePrediction } from "@/types/place";
import { MOCK_PLACES } from "@/utils/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const searchPlacePredictions = createAsyncThunk(
  "places/searchPredictions",
  async (query: string, { rejectWithValue }) => {
    try {
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

      if (!apiKey) {
        return await fetchMockPredictions(query);
      }

      await new Promise((resolve) => setTimeout(resolve, 300));

      const predictions = await fetchGooglePredictions(query);
      return predictions;
    } catch (error: unknown) {
      console.warn(
        "Google API error, falling back to mock data:",
        error instanceof Error ? error.message : "Unknown error",
      );

      try {
        return await fetchMockPredictions(query);
      } catch (mockError: unknown) {
        return rejectWithValue(
          mockError instanceof Error
            ? mockError.message
            : "Failed to fetch place predictions",
        );
      }
    }
  },
);

export const fetchPlaceDetailsThunk = createAsyncThunk(
  "places/fetchDetails",
  async (placeId: string, { rejectWithValue }) => {
    try {
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

      if (!apiKey) {
        return await fetchMockPlaceDetails(placeId);
      }

      await new Promise((resolve) => setTimeout(resolve, 200));

      const details = await fetchGoogleDetails(placeId);
      return details;
    } catch (error: unknown) {
      console.warn(
        "Google API error, falling back to mock data:",
        error instanceof Error ? error.message : "Unknown error",
      );

      try {
        return await fetchMockPlaceDetails(placeId);
      } catch (mockError: unknown) {
        return rejectWithValue(
          mockError instanceof Error
            ? mockError.message
            : "Failed to fetch place details",
        );
      }
    }
  },
);

async function fetchMockPredictions(query: string): Promise<PlacePrediction[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (!query || query.trim().length < 1) {
    return [];
  }

  const filtered = MOCK_PLACES.filter(
    (place) =>
      place.name.toLowerCase().includes(query.toLowerCase()) ||
      place.formatted_address.toLowerCase().includes(query.toLowerCase()),
  );

  return filtered.map((place) => ({
    description: place.name,
    place_id: place.place_id,
    structured_formatting: {
      main_text: place.name,
      secondary_text: place.formatted_address,
    },
  }));
}

async function fetchMockPlaceDetails(placeId: string): Promise<Place> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const mockPlace = MOCK_PLACES.find((p) => p.place_id === placeId);

  if (!mockPlace) {
    throw new Error("Place not found in mock data");
  }

  return mockPlace;
}

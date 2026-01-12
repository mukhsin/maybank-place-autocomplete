import { createAsyncThunk } from "@reduxjs/toolkit";
import { MOCK_PLACES } from "@utils/constants";

export const searchPlacePredictions = createAsyncThunk(
  "places/searchPredictions",
  async (query: string, { rejectWithValue }) => {
    try {
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
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Failed to fetch place predictions",
      );
    }
  },
);

export const fetchPlaceDetailsThunk = createAsyncThunk(
  "places/fetchDetails",
  async (placeId: string, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));

      const mockPlace = MOCK_PLACES.find((p) => p.place_id === placeId);

      if (!mockPlace) {
        throw new Error("Place not found in mock data");
      }

      return mockPlace;
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Failed to fetch place details",
      );
    }
  },
);

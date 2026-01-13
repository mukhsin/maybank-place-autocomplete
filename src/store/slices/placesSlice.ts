import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchPlaceDetailsThunk, searchPlacePredictions } from "@store/thunks";
import type { Place, PlacePrediction } from "@/types";

interface PlacesState {
  predictions: PlacePrediction[];
  selectedPlace: Place | null;
  searchQuery: string;
  loading: boolean;
  loadingDetails: boolean;
  error: string | null;
  useGoogleApi: boolean;
}

const initialState: PlacesState = {
  predictions: [],
  selectedPlace: null,
  searchQuery: "",
  loading: false,
  loadingDetails: false,
  error: null,
  useGoogleApi: !!import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
};

const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedPlace: (state, action: PayloadAction<Place | null>) => {
      state.selectedPlace = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearPredictions: (state) => {
      state.predictions = [];
    },
    setUseGoogleApi: (state, action: PayloadAction<boolean>) => {
      state.useGoogleApi = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchPlacePredictions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchPlacePredictions.fulfilled, (state, action) => {
        state.loading = false;
        state.predictions = action.payload;
        state.useGoogleApi = !!import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      })
      .addCase(searchPlacePredictions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.predictions = [];
        state.useGoogleApi = false;
      });

    builder
      .addCase(fetchPlaceDetailsThunk.pending, (state) => {
        state.loadingDetails = true;
        state.error = null;
      })
      .addCase(fetchPlaceDetailsThunk.fulfilled, (state, action) => {
        state.loadingDetails = false;
        state.selectedPlace = action.payload;
        state.useGoogleApi = !!import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      })
      .addCase(fetchPlaceDetailsThunk.rejected, (state, action) => {
        state.loadingDetails = false;
        state.error = action.payload as string;
        state.useGoogleApi = false;
      });
  },
});

export const {
  setSearchQuery,
  setSelectedPlace,
  clearError,
  clearPredictions,
  setUseGoogleApi,
} = placesSlice.actions;
export const placesSliceReducer = placesSlice.reducer;
export type { PlacesState };

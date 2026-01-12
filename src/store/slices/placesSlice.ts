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
}

const initialState: PlacesState = {
  predictions: [],
  selectedPlace: null,
  searchQuery: "",
  loading: false,
  loadingDetails: false,
  error: null,
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
      })
      .addCase(searchPlacePredictions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.predictions = [];
      });

    builder
      .addCase(fetchPlaceDetailsThunk.pending, (state) => {
        state.loadingDetails = true;
        state.error = null;
      })
      .addCase(fetchPlaceDetailsThunk.fulfilled, (state, action) => {
        state.loadingDetails = false;
        state.selectedPlace = action.payload;
      })
      .addCase(fetchPlaceDetailsThunk.rejected, (state, action) => {
        state.loadingDetails = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setSearchQuery,
  setSelectedPlace,
  clearError,
  clearPredictions,
} = placesSlice.actions;
export const placesSliceReducer = placesSlice.reducer;
export type { PlacesState };

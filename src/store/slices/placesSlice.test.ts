import { MOCK_PLACES } from "@utils/constants";
import { describe, expect, it } from "vitest";
import { fetchPlaceDetailsThunk, searchPlacePredictions } from "../thunks";
import {
  clearError,
  clearPredictions,
  placesSliceReducer,
  setSearchQuery,
  setSelectedPlace,
} from "./placesSlice";

describe("placesSlice", () => {
  const initialState = {
    predictions: [],
    selectedPlace: null,
    searchQuery: "",
    loading: false,
    loadingDetails: false,
    error: null,
  };

  it("should return initial state", () => {
    expect(placesSliceReducer(undefined, { type: "unknown" })).toEqual(
      initialState,
    );
  });

  it("should handle setSearchQuery", () => {
    const newState = placesSliceReducer(
      initialState,
      setSearchQuery("test query"),
    );
    expect(newState.searchQuery).toBe("test query");
  });

  it("should handle setSelectedPlace", () => {
    const place = MOCK_PLACES[0];
    const newState = placesSliceReducer(initialState, setSelectedPlace(place));
    expect(newState.selectedPlace).toEqual(place);
  });

  it("should handle clearError", () => {
    const errorState = { ...initialState, error: "Test error" };
    const newState = placesSliceReducer(errorState, clearError());
    expect(newState.error).toBe(null);
  });

  it("should handle clearPredictions", () => {
    const stateWithPredictions = {
      ...initialState,
      predictions: [
        {
          description: "Test Place",
          place_id: "test-1",
          structured_formatting: {
            main_text: "Test Place",
            secondary_text: "Test Address",
          },
        },
      ],
    };
    const newState = placesSliceReducer(
      stateWithPredictions,
      clearPredictions(),
    );
    expect(newState.predictions).toEqual([]);
  });

  it("should set loading to true when searchPredictions is pending", () => {
    const action = { type: searchPlacePredictions.pending.type };
    const newState = placesSliceReducer(initialState, action);
    expect(newState.loading).toBe(true);
    expect(newState.error).toBe(null);
  });

  it("should set predictions and loading to false when searchPredictions is fulfilled", () => {
    const predictions = [
      {
        description: "Test Place",
        place_id: "test-1",
        structured_formatting: {
          main_text: "Test Place",
          secondary_text: "Test Address",
        },
      },
    ];
    const action = {
      type: searchPlacePredictions.fulfilled.type,
      payload: predictions,
    };
    const newState = placesSliceReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.predictions).toEqual(predictions);
  });

  it("should set error and clear predictions when searchPredictions is rejected", () => {
    const error = "Search failed";
    const action = {
      type: searchPlacePredictions.rejected.type,
      payload: error,
    };
    const newState = placesSliceReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(error);
    expect(newState.predictions).toEqual([]);
  });

  it("should set loadingDetails to true when fetchPlaceDetails is pending", () => {
    const action = { type: fetchPlaceDetailsThunk.pending.type };
    const newState = placesSliceReducer(initialState, action);
    expect(newState.loadingDetails).toBe(true);
    expect(newState.error).toBe(null);
  });

  it("should set selectedPlace and loadingDetails to false when fetchPlaceDetails is fulfilled", () => {
    const place = MOCK_PLACES[0];
    const action = {
      type: fetchPlaceDetailsThunk.fulfilled.type,
      payload: place,
    };
    const newState = placesSliceReducer(initialState, action);
    expect(newState.loadingDetails).toBe(false);
    expect(newState.selectedPlace).toEqual(place);
  });

  it("should set error when fetchPlaceDetails is rejected", () => {
    const error = "Place not found";
    const action = {
      type: fetchPlaceDetailsThunk.rejected.type,
      payload: error,
    };
    const newState = placesSliceReducer(initialState, action);
    expect(newState.loadingDetails).toBe(false);
    expect(newState.error).toBe(error);
  });
});

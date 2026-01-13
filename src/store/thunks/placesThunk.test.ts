import { configureStore } from "@reduxjs/toolkit";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MOCK_PLACES } from "@/utils/constants";
import { placesSliceReducer } from "../slices";
import { fetchPlaceDetailsThunk, searchPlacePredictions } from "./placesThunk";

const createTestStore = () =>
  configureStore({
    reducer: {
      places: placesSliceReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {},
        },
      }),
  });

describe("placesThunk", () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    vi.useFakeTimers();
    store = createTestStore();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return empty array for empty query", async () => {
    const action = searchPlacePredictions("");
    const promise = store.dispatch(action);
    vi.runAllTimers();
    const result = await promise;
    expect(result.payload).toEqual([]);
  });

  it("should filter places by name", async () => {
    const action = searchPlacePredictions("Marina");
    const promise = store.dispatch(action);
    vi.runAllTimers();
    const result = await promise;
    expect(result.payload).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          description: "Marina Bay Sands",
        }),
      ]),
    );
  });

  it("should filter places by address", async () => {
    const action = searchPlacePredictions("Singapore");
    const promise = store.dispatch(action);
    vi.runAllTimers();
    const result = await promise;
    expect(result.payload).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          structured_formatting: expect.objectContaining({
            secondary_text: expect.stringContaining("Singapore"),
          }),
        }),
      ]),
    );
  });

  it("should return predictions in correct format", async () => {
    const action = searchPlacePredictions("Petronas");
    const promise = store.dispatch(action);
    vi.runAllTimers();
    const result = await promise;
    expect(result.payload).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          description: expect.any(String),
          place_id: expect.any(String),
          structured_formatting: expect.any(Object),
        }),
      ]),
    );
  });

  it("should fetch place details by place_id", async () => {
    const placeId = "mock-1";
    const action = fetchPlaceDetailsThunk(placeId);
    const promise = store.dispatch(action);
    vi.runAllTimers();
    const result = await promise;
    expect(result.payload).toEqual(MOCK_PLACES[0]);
  });

  it("should throw error for non-existent place", async () => {
    const action = fetchPlaceDetailsThunk("non-existent-id");
    const promise = store.dispatch(action);
    vi.runAllTimers();
    const result = await promise;
    expect(result.meta?.requestStatus).toBe("rejected");
  });

  it("should be case insensitive", async () => {
    const action1 = searchPlacePredictions("marina");
    const promise1 = store.dispatch(action1);
    vi.runAllTimers();
    const result1 = await promise1;

    const action2 = searchPlacePredictions("MARINA");
    const promise2 = store.dispatch(action2);
    vi.runAllTimers();
    const result2 = await promise2;

    const action3 = searchPlacePredictions("MaRiNa");
    const promise3 = store.dispatch(action3);
    vi.runAllTimers();
    const result3 = await promise3;

    expect(result1.payload).toEqual(result2.payload);
    expect(result2.payload).toEqual(result3.payload);
  });

  it("should return multiple matches for partial matches", async () => {
    const action = searchPlacePredictions("Temple");
    const promise = store.dispatch(action);
    vi.runAllTimers();
    const result = await promise;
    expect(result.payload).toEqual(
      expect.arrayContaining([
        expect.objectContaining({}),
        expect.objectContaining({}),
      ]),
    );
  });
});

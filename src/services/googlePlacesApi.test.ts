import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  fetchPlaceDetails,
  fetchPlacePredictions,
} from "@/services/googlePlacesApi";

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("googlePlacesApi", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it("should return empty array for empty query", async () => {
    const result = await fetchPlacePredictions("", "test-key");
    expect(result).toEqual([]);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("should call Google API with correct parameters", async () => {
    mockFetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          predictions: [],
          status: "OK",
        }),
    });

    await fetchPlacePredictions("test query", "test-key");

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch.mock.calls[0][0]).toContain("input=test+query");
    expect(mockFetch.mock.calls[0][0]).toContain("key=test-key");
  });

  it("should handle ZERO_RESULTS status", async () => {
    mockFetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          predictions: [],
          status: "ZERO_RESULTS",
        }),
    });

    const result = await fetchPlacePredictions("non-existent", "test-key");
    expect(result).toEqual([]);
  });

  it("should throw error on API failure", async () => {
    mockFetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          status: "INVALID_REQUEST",
          error_message: "Invalid request",
        }),
    });

    await expect(fetchPlacePredictions("test", "test-key")).rejects.toThrow(
      "Google Places API error: INVALID_REQUEST - Invalid request",
    );
  });

  it("should fetch place details with correct parameters", async () => {
    mockFetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          result: {
            place_id: "test-id",
            name: "Test Place",
            formatted_address: "Test Address",
            geometry: { location: { lat: 0, lng: 0 } },
          },
          status: "OK",
        }),
    });

    await fetchPlaceDetails("test-id", "test-key");

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch.mock.calls[0][0]).toContain("place_id=test-id");
    expect(mockFetch.mock.calls[0][0]).toContain("key=test-key");
  });

  it("should request all required fields", async () => {
    mockFetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          result: {
            place_id: "test-id",
            name: "Test Place",
            formatted_address: "Test Address",
          },
          status: "OK",
        }),
    });

    await fetchPlaceDetails("test-id", "test-key");

    expect(mockFetch.mock.calls[0][0]).toContain(
      "place_id,name,formatted_address,geometry,types,rating,photos,reviews,opening_hours",
    );
  });
});

import type { Place, PlacePrediction } from "@/types/place";

async function ensureGoogleMapsLoaded(): Promise<void> {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    throw new Error("Google Maps API key is not configured");
  }

  if (!window.google?.maps) {
    const loader = await import("@googlemaps/js-api-loader");

    await loader.default.load({
      apiKey,
      version: "weekly",
      libraries: ["places"],
    });
  }

  await google.maps.importLibrary("places");

  if (!google.maps.places) {
    throw new Error("Google Maps Places library is not available");
  }
}

export async function fetchPlacePredictions(
  query: string,
): Promise<PlacePrediction[]> {
  if (!query || query.trim().length < 1) {
    return [];
  }

  try {
    console.log("mmm", "ensureGoogleMapsLoaded", "start");
    await ensureGoogleMapsLoaded();
    console.log("mmm", "ensureGoogleMapsLoaded", "end");
    const autocompleteService = new google.maps.places.AutocompleteService();

    return new Promise((resolve, reject) => {
      autocompleteService.getPlacePredictions(
        {
          input: query,
          types: ["geocode", "establishment"],
        },
        (
          predictions: google.maps.places.AutocompletePrediction[] | null,
          status: google.maps.places.PlacesServiceStatus,
        ) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            const mappedPredictions: PlacePrediction[] = predictions.map(
              (prediction) => ({
                description: prediction.description || "",
                place_id: prediction.place_id || "",
                structured_formatting: {
                  main_text: prediction.structured_formatting?.main_text || "",
                  secondary_text:
                    prediction.structured_formatting?.secondary_text || "",
                },
              }),
            );
            resolve(mappedPredictions);
          } else if (
            status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS
          ) {
            resolve([]);
          } else {
            reject(new Error(`Google Places API error: ${status}`));
          }
        },
      );
    });
  } catch (error) {
    throw new Error(
      `Google Maps initialization failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

export async function fetchPlaceDetails(placeId: string): Promise<Place> {
  try {
    await ensureGoogleMapsLoaded();

    const map = new google.maps.Map(document.createElement("div"));
    const placesService = new google.maps.places.PlacesService(map);

    return new Promise((resolve, reject) => {
      placesService.getDetails(
        {
          placeId,
          fields: [
            "place_id",
            "name",
            "formatted_address",
            "geometry",
            "types",
            "rating",
            "photos",
            "reviews",
            "opening_hours",
          ],
        },
        (
          result: google.maps.places.PlaceResult | null,
          status: google.maps.places.PlacesServiceStatus,
        ) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && result) {
            const place: Place = {
              place_id: result.place_id || "",
              name: result.name || "",
              formatted_address: result.formatted_address || "",
              geometry: {
                location: {
                  lat: result.geometry?.location?.lat() || 0,
                  lng: result.geometry?.location?.lng() || 0,
                },
              },
              types: result.types,
              rating: result.rating,
            };
            resolve(place);
          } else {
            reject(new Error(`Google Places API error: ${status}`));
          }
        },
      );
    });
  } catch (error) {
    throw new Error(
      `Google Maps initialization failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

import type { Place } from "@/types";

/**
 * Mock places for demonstration
 * 10 locations across Indonesia, Malaysia, Singapore
 */
export const MOCK_PLACES: Place[] = [
  {
    place_id: "mock-1",
    name: "Marina Bay Sands",
    formatted_address: "10 Bayfront Ave, Singapore 018956",
    geometry: {
      location: { lat: 1.2833, lng: 103.8607 },
    },
    types: ["establishment", "lodging"],
  },
  {
    place_id: "mock-2",
    name: "Petronas Twin Towers",
    formatted_address: "Jalan Ampang, Kuala Lumpur 50088, Malaysia",
    geometry: {
      location: { lat: 3.1577, lng: 101.7122 },
    },
    types: ["establishment", "point_of_interest"],
  },
  {
    place_id: "mock-3",
    name: "Borobudur Temple",
    formatted_address:
      "Jl. Badrawati, Borobudur, Magelang, Central Java, Indonesia",
    geometry: {
      location: { lat: -7.6079, lng: 110.2038 },
    },
    types: ["establishment", "tourist_attraction"],
  },
  {
    place_id: "mock-4",
    name: "Merlion Park",
    formatted_address: "Fullerton Road, Singapore 049213",
    geometry: {
      location: { lat: 1.2868, lng: 103.8545 },
    },
    types: ["establishment", "park"],
  },
  {
    place_id: "mock-5",
    name: "Gardens by the Bay",
    formatted_address: "18 Marina Gardens Dr, Singapore 018953",
    geometry: {
      location: { lat: 1.2816, lng: 103.8636 },
    },
    types: ["establishment", "tourist_attraction"],
  },
  {
    place_id: "mock-6",
    name: "Batu Caves",
    formatted_address: "Gombak, Selangor 68100, Malaysia",
    geometry: {
      location: { lat: 3.2381, lng: 101.6867 },
    },
    types: ["establishment", "tourist_attraction"],
  },
  {
    place_id: "mock-7",
    name: "Tanah Lot Temple",
    formatted_address: "Beraban, Kediri, Tabanan Regency, Bali, Indonesia",
    geometry: {
      location: { lat: -8.6212, lng: 115.0868 },
    },
    types: ["establishment", "tourist_attraction"],
  },
  {
    place_id: "mock-8",
    name: "Suntec City",
    formatted_address: "3 Temasek Blvd, Singapore 038983",
    geometry: {
      location: { lat: 1.2934, lng: 103.8572 },
    },
    types: ["establishment", "shopping_mall"],
  },
  {
    place_id: "mock-9",
    name: "Central Market Kuala Lumpur",
    formatted_address: "Jalan Tun Tan Siew Sin, Kuala Lumpur 50050, Malaysia",
    geometry: {
      location: { lat: 3.1477, lng: 101.6967 },
    },
    types: ["establishment", "shopping_mall"],
  },
  {
    place_id: "mock-10",
    name: "Uluwatu Temple",
    formatted_address: "Pecatu, South Kuta, Badung Regency, Bali, Indonesia",
    geometry: {
      location: { lat: -8.8292, lng: 115.085 },
    },
    types: ["establishment", "tourist_attraction"],
  },
];

import {
  APIProvider,
  Map as GoogleMap,
  InfoWindow,
  Marker,
  useMap,
} from "@vis.gl/react-google-maps";
import { Card, Empty } from "antd";
import { useEffect, useState } from "react";
import type { Place } from "@/types";

interface MapProps {
  place: Place | null;
}

function MapContent({ place }: MapProps) {
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const map = useMap();

  useEffect(() => {
    if (map && place) {
      map.panTo({
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng,
      });
      map.setZoom(15);
    }
  }, [map, place]);

  return (
    <>
      <Marker
        position={{
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng,
        }}
        onClick={() => setShowInfoWindow(true)}
      />

      {showInfoWindow && (
        <InfoWindow
          position={{
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng,
          }}
          onCloseClick={() => setShowInfoWindow(false)}
        >
          <div style={{ padding: "8px", minWidth: "200px" }}>
            <h3 style={{ margin: "0 0 4px 0", fontSize: "16px" }}>
              {place.name}
            </h3>
            <p style={{ margin: "0", color: "#666" }}>
              {place.formatted_address}
            </p>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

export const MapContainer: React.FC<MapProps> = ({ place }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <Card
        // title="Map"
        variant="outlined"
        style={{
          height: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Empty description="Google Maps not available (no API key)">
          <p style={{ color: "#999", marginTop: 16 }}>
            Add{" "}
            <code
              style={{
                background: "#f5f5f5",
                padding: "4px 8px",
                borderRadius: 4,
              }}
            >
              VITE_GOOGLE_MAPS_API_KEY
            </code>{" "}
            to <code>.env</code> file to enable Google Maps
          </p>
        </Empty>
      </Card>
    );
  }

  return (
    <Card title="Map" variant="outlined">
      <APIProvider apiKey={apiKey}>
        <GoogleMap
          defaultCenter={{ lat: -0.72917, lng: 113.9676 }}
          defaultZoom={4}
          style={{ width: "100%", height: "400px" }}
        >
          {place && <MapContent place={place} />}
        </GoogleMap>
      </APIProvider>
    </Card>
  );
};

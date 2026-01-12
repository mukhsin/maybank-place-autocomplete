import type { Place } from "@types";
import { Card, Empty, Space } from "antd";

interface MapProps {
	place: Place | null;
}

export const MapContainer: React.FC<MapProps> = ({ place }) => {
	if (!place) {
		return (
			<Card
				title="Map"
				variant="outlined"
				style={{
					height: "400px",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Empty description="Select a place to see on map" />
			</Card>
		);
	}

	return (
		<Card title="Map" variant="outlined">
			<Space orientation="vertical" style={{ width: "100%" }} size="large">
				<div
					style={{
						background: "#e6f7ff",
						padding: "24px",
						borderRadius: "4px",
						textAlign: "center",
					}}
				>
					<h3 style={{ marginTop: 0 }}>{place.name}</h3>
					<p style={{ fontSize: "16px", color: "#666" }}>
						{place.formatted_address}
					</p>
				</div>

				<Space orientation="horizontal" style={{ width: "100%" }}>
					<div>
						<strong>Latitude:</strong> {place.geometry.location.lat}
					</div>
					<div>
						<strong>Longitude:</strong> {place.geometry.location.lng}
					</div>
				</Space>
			</Space>
		</Card>
	);
};

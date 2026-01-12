import type { Place } from "@types";
import { Card, Empty, Rate, Space, Tag } from "antd";
import type React from "react";

interface PlaceCardProps {
	place: Place;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ place }) => {
	if (!place) {
		return <Empty description="No place selected" />;
	}

	const types = place.types || [];

	return (
		<Card title={place.name} variant="outlined" style={{ marginBottom: 16 }}>
			<Space orientation="vertical" style={{ width: "100%" }} size="middle">
				<div>
					<strong>Address:</strong>
					<p style={{ marginBottom: 0 }}>{place.formatted_address}</p>
				</div>

				{place.rating !== undefined && (
					<div>
						<strong>Rating:</strong>
						<Rate
							disabled
							value={place.rating}
							allowHalf
							style={{ marginLeft: 8 }}
						/>
						<span style={{ marginLeft: 8 }}>({place.rating})</span>
					</div>
				)}

				{types.length > 0 && (
					<div>
						<strong>Type:</strong>
						<div style={{ marginTop: 8 }}>
							{types.map((type: string) => (
								<Tag
									key={type}
									color="blue"
									style={{ marginBottom: 4, marginRight: 4 }}
								>
									{formatType(type)}
								</Tag>
							))}
						</div>
					</div>
				)}

				{/*{place.geometry && (
          <div>
            <strong>Coordinates:</strong>
            <p style={{ marginBottom: 0 }}>
              Lat: {place.geometry.location.lat}, Lng:{" "}
              {place.geometry.location.lng}
            </p>
          </div>
        )}*/}
			</Space>
		</Card>
	);
};

function formatType(type: string): string {
	return type
		.split("_")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

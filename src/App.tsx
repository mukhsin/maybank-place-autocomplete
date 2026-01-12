import type { Place } from "@types";
import { Space as AntSpace, Col, Flex, Layout, Row } from "antd";
import {
	Header,
	MainLayout,
	MapContainer,
	PlaceCard,
	Search,
} from "@/components";

function AppContent() {
	const selectedPlace: Place = {
		place_id: "mock-3",
		name: "Borobudur Temple",
		formatted_address:
			"Jl. Badrawati, Borobudur, Magelang, Central Java, Indonesia",
		geometry: {
			location: { lat: -7.6079, lng: 110.2038 },
		},
		types: ["establishment", "tourist_attraction"],
	};

	return (
		<Layout>
			<Header />
			<MainLayout>
				<Row gutter={[24, 24]}>
					<Col xs={24} md={24} lg={12}>
						<Search />
					</Col>

					<Col xs={24} md={24} lg={12}></Col>

					<Col xs={24} md={24} lg={12}>
						<Flex gap="middle" vertical>
							<PlaceCard place={selectedPlace} />
						</Flex>
					</Col>

					<Col xs={24} md={24} lg={12}>
						<AntSpace orientation="vertical" style={{ width: "100%" }}>
							<MapContainer place={selectedPlace} />
						</AntSpace>
					</Col>
				</Row>
			</MainLayout>
		</Layout>
	);
}

function App() {
	return <AppContent />;
}

export default App;

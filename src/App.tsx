import {
  Space as AntSpace,
  Col,
  Flex,
  Layout,
  message,
  notification,
  Row,
  Spin,
} from "antd";
import { lazy, Suspense, useEffect } from "react";
import { Provider } from "react-redux";
import { Header, MainLayout, PlaceCard, Search } from "@/components";
import { store } from "@/store";
import { useAppSelector } from "@/store/hooks";

const MapContainer = lazy(() =>
  import("@/components/places/MapContainer").then((m) => ({
    default: m.MapContainer,
  })),
);

function AppContent() {
  const { selectedPlace, error } = useAppSelector((state) => state.places);

  useEffect(() => {
    if (error && !error.includes("not found")) {
      message.error(error);

      if (error.includes("Google") || error.includes("API")) {
        notification.warning({
          title: "Using Mock Data",
          description: "Google API is unavailable. Falling back to mock data.",
          duration: 4,
        });
      }
    }
  }, [error]);

  useEffect(() => {
    if (!import.meta.env.VITE_GOOGLE_MAPS_API_KEY) {
      notification.info({
        title: "Mock Data Mode",
        description:
          "No Google Maps API key found. Using mock data for demonstration.",
        duration: 5,
      });
    }
  }, []);

  return (
    <Layout>
      <Header />
      <MainLayout>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={24} lg={12}>
            <Flex gap="middle" vertical>
              <Search />
              {selectedPlace && <PlaceCard place={selectedPlace} />}
            </Flex>
          </Col>

          <Col xs={24} md={24} lg={12}>
            <AntSpace orientation="vertical" style={{ width: "100%" }}>
              {selectedPlace && (
                <Suspense
                  fallback={
                    <div
                      style={{
                        height: "400px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Spin size="large" />
                    </div>
                  }
                >
                  <MapContainer place={selectedPlace} />
                </Suspense>
              )}
            </AntSpace>
          </Col>
        </Row>
      </MainLayout>
    </Layout>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;

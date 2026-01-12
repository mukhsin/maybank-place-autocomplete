import { Space as AntSpace, Col, Flex, Layout, message, Row } from "antd";
import { useEffect } from "react";
import { Provider } from "react-redux";
import {
  Header,
  MainLayout,
  MapContainer,
  PlaceCard,
  Search,
} from "@/components";
import { store } from "@/store";
import { useAppSelector } from "@/store/hooks";

function AppContent() {
  const { selectedPlace, error } = useAppSelector((state) => state.places);

  useEffect(() => {
    if (error && !error.includes("not found")) {
      message.error(error);
    }
  }, [error]);

  return (
    <Layout>
      <Header />
      <MainLayout>
        <Row gutter={[24, 24]}>
          {/*<Col xs={24} md={24} lg={12}>
            <Search />
          </Col>*/}

          <Col xs={24} md={24} lg={12}>
            <Flex gap="middle" vertical>
              <Search />
              {selectedPlace && <PlaceCard place={selectedPlace} />}
            </Flex>
          </Col>

          <Col xs={24} md={24} lg={12}>
            <AntSpace orientation="vertical" style={{ width: "100%" }}>
              {<MapContainer place={selectedPlace} />}
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

import { Layout, Space, Typography } from "antd";
import type React from "react";

const { Header: AntHeader } = Layout;
const { Title } = Typography;

export const Header: React.FC = () => {
  return (
    <AntHeader style={{ background: "#001529", padding: 0 }}>
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <Space align="center" style={{ width: "100%" }}>
          <Title level={3} style={{ color: "#fff", margin: 0 }}>
            Place Autocomplete
          </Title>
        </Space>
      </div>
    </AntHeader>
  );
};

export { Header as AppHeader, Title };

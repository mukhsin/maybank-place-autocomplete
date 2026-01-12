import { SearchOutlined } from "@ant-design/icons";
import { AutoComplete, Empty, Space, Spin } from "antd";
import type React from "react";

export const Search: React.FC = () => {
	const loading = false;
	return (
		<Space orientation="vertical" style={{ width: "100%" }}>
			<AutoComplete
				placeholder="Search for a place (e.g., Marina, Borobudur, Petronas...)"
				style={{ width: "100%" }}
				allowClear
				filterOption={false}
				notFoundContent={
					loading ? (
						<Spin size="small" />
					) : (
						<Empty description="No places found" />
					)
				}
				suffixIcon={loading ? <Spin size="small" /> : <SearchOutlined />}
			/>
		</Space>
	);
};

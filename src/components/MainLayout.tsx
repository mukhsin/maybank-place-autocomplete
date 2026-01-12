import { Layout } from "antd";

const { Content } = Layout;

interface MainLayoutProps {
	children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Content
				style={{
					padding: "24px",
					maxWidth: "1200px",
					margin: "0 auto",
					width: "100%",
				}}
			>
				{children}
			</Content>
		</Layout>
	);
};

export { Content };

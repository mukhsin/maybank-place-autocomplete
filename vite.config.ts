import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@styles": path.resolve(__dirname, "./src/styles"),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (
            id.includes("@vis.gl/react-google-maps") ||
            id.includes("@googlemaps")
          ) {
            return "google-maps";
          }
          if (id.includes("antd")) {
            return "antd";
          }
        },
      },
    },
  },
});

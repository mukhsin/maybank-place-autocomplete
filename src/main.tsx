import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@/styles/index.css";

const rootElement = document.getElementById("root") as HTMLHtmlElement;
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

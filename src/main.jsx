import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ErrorBoundary } from "./components/ErrorBoundary.jsx";
import { initEngine } from "./lib/pdfEngine.js";
import "./index.css";

// Warm the font/image cache while React mounts, so the first preview is quick.
initEngine().catch((error) => console.error("PDF engine failed to start", error));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);

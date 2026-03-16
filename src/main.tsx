import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";
import { OperationsProvider } from "./state/OperationsContext";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Missing root container");
}

createRoot(rootElement).render(
  <StrictMode>
    <OperationsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </OperationsProvider>
  </StrictMode>
);

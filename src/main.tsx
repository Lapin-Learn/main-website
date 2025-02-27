import "./i18n/i18n.tsx";
import "./styles/globals.css";
import "./styles/index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";

const rootElement = document.getElementById("root");

if (rootElement?.hasChildNodes()) {
  ReactDOM.hydrateRoot(
    rootElement,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  ReactDOM.createRoot(rootElement!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

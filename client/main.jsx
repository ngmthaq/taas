import React from "react";
import ReactDOM from "react-dom/client";
import * as ReactI18n from "react-i18next";
import i18n from "i18next";
import App from "./App";

i18n.use(ReactI18n.initReactI18next).init({
  interpolation: { escapeValue: false },
  lng: window.__REACT_LOCALES__.viVN.key,
  fallbackLng: window.__REACT_LOCALES__.viVN.key,
  resources: window.__REACT_LOCALE_RESOURCES__,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

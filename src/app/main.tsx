import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App";

import { getTheme, setTheme } from "../styles/theme";

/**
 * Apply theme before first paint to avoid flash.
 */
setTheme(getTheme());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

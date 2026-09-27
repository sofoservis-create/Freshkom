import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource-variable/outfit";
import "./index.css";

const root = document.getElementById("root")!;
if (root.dataset.prerendered === "true") {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}

import { renderToString } from "react-dom/server";
import App from "./App";
import Cennik from "./pages/Cennik";
import Kontakt from "./pages/Kontakt";
import ServicePage from "./pages/ServicePage";
import NotFound from "./pages/not-found";

const serverPages = { Cennik, Kontakt, ServicePage, NotFound };

export function renderPage(path: string): string {
  return renderToString(<App initialPath={path} serverPages={serverPages} />);
}
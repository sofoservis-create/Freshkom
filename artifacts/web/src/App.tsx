import { lazy, Suspense, useEffect, type ComponentType } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import Landing from "@/pages/Landing";

const Cennik = lazy(() => import("@/pages/Cennik"));
const Kontakt = lazy(() => import("@/pages/Kontakt"));
const ServicePage = lazy(() => import("@/pages/ServicePage"));
const NotFound = lazy(() => import("@/pages/not-found"));

export type ServerPages = {
  Cennik: ComponentType;
  Kontakt: ComponentType;
  ServicePage: ComponentType<{ kind: "upholstery" | "windows" }>;
  NotFound: ComponentType;
};

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  return null;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function Router({ serverPages }: { serverPages?: ServerPages }) {
  const PricingPage = serverPages?.Cennik ?? Cennik;
  const ContactPage = serverPages?.Kontakt ?? Kontakt;
  const Service = serverPages?.ServicePage ?? ServicePage;
  const MissingPage = serverPages?.NotFound ?? NotFound;
  return (
    <Layout>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen" />}>
        <Switch>
          <Route path="/" component={Landing} />
          <Route path="/hu" component={Landing} />
          <Route path="/cennik" component={PricingPage} />
          <Route path="/hu/cennik" component={PricingPage} />
          <Route path="/kontakt" component={ContactPage} />
          <Route path="/hu/kontakt" component={ContactPage} />
          <Route path="/tepovanie-komarno">{() => <Service kind="upholstery" />}</Route>
          <Route path="/hu/tepovanie-komarno">{() => <Service kind="upholstery" />}</Route>
          <Route path="/cistenie-okien-komarno">{() => <Service kind="windows" />}</Route>
          <Route path="/hu/cistenie-okien-komarno">{() => <Service kind="windows" />}</Route>
          <Route component={MissingPage} />
        </Switch>
      </Suspense>
    </Layout>
  );
}

function App({ initialPath, serverPages }: { initialPath?: string; serverPages?: ServerPages } = {}) {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")} ssrPath={initialPath}>
            <LanguageProvider>
              <Router serverPages={serverPages} />
            </LanguageProvider>
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;

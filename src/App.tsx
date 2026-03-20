import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/components/ThemeContext";
import MessageBubble from "@/components/MessageBubble";
import Navbar from "@/components/Navbar";
import {
  NavbarVisibilityProvider,
  useNavbarVisibility,
} from "@/components/NavbarVisibility";
import Index from "./pages/Index";
import { lazy, Suspense, useEffect } from "react";

const Verkkosivut = lazy(() => import("./pages/Verkkosivut"));
const WebSovellukset = lazy(() => import("./pages/WebSovellukset"));
const Prototyypit = lazy(() => import("./pages/Prototyypit"));

const Referenssit = lazy(() => import("./pages/Referenssit"));
const Yhteystiedot = lazy(() => import("./pages/Yhteystiedot"));
const TilaaVedos = lazy(() => import("./pages/TilaaVedos"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    if (navType !== "POP") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, navType]);

  return null;
};

const NavbarGate = () => {
  const { hidden } = useNavbarVisibility();
  if (hidden) return null;
  return <Navbar />;
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <MessageBubble />
          <BrowserRouter>
            <NavbarVisibilityProvider>
              <ScrollToTop />
              <NavbarGate />
              <Suspense fallback={<div className="min-h-screen bg-black" />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/palvelut" element={<Palvelut />} />
                  <Route path="/verkkosivut" element={<Verkkosivut />} />
                  <Route path="/web-sovellukset" element={<WebSovellukset />} />
                  <Route path="/prototyypit" element={<Prototyypit />} />
                  <Route path="/referenssit" element={<Referenssit />} />
                  <Route path="/yhteystiedot" element={<Yhteystiedot />} />
                  <Route path="/tilaa-vedos" element={<TilaaVedos />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </NavbarVisibilityProvider>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;

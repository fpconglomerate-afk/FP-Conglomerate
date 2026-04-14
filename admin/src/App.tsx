import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import ScrollToTop from "@/components/ScrollToTop";
import { SiteContentProvider } from "@/content/SiteContentContext";
import AdminPage from "./pages/AdminPage.tsx";

const queryClient = new QueryClient();

const publicSiteFallback =
  import.meta.env.VITE_PUBLIC_SITE_URL?.trim().replace(/\/$/, "") || "http://localhost:8080";

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <SiteContentProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route
                path="*"
                element={<AdminPage publicSiteFallback={publicSiteFallback} />}
              />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SiteContentProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import ScrollToTop from "@/components/ScrollToTop";
import { getStaffToken } from "@/lib/elevateApi";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout.tsx";
import StaffLoginPage from "./pages/StaffLoginPage.tsx";
import LeadsPage from "./pages/LeadsPage.tsx";
import CmsMarketingPage from "./pages/cms/CmsMarketingPage.tsx";
import CmsPortfolioPage from "./pages/cms/CmsPortfolioPage.tsx";

const queryClient = new QueryClient();

function AdminHome() {
  return <Navigate to={getStaffToken() ? "/leads" : "/login"} replace />;
}

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<AdminHome />} />
            <Route path="/login" element={<StaffLoginPage />} />
            <Route element={<AuthenticatedLayout />}>
              <Route path="/leads" element={<LeadsPage />} />
              <Route path="/cms/marketing" element={<CmsMarketingPage />} />
              <Route path="/cms/blog" element={<Navigate to="/cms/marketing" replace />} />
              <Route path="/cms/hiring" element={<Navigate to="/cms/marketing?tab=hiring" replace />} />
              <Route path="/cms/portfolio" element={<CmsPortfolioPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;

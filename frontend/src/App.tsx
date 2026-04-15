import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import { SiteContentProvider } from "@/content/SiteContentContext";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

const AboutPage = lazy(() => import("./pages/AboutPage.tsx"));
const BusinessUnitsPage = lazy(() => import("./pages/BusinessUnitsPage.tsx"));
const BusinessUnitDetailPage = lazy(() => import("./pages/BusinessUnitDetailPage.tsx"));
const BusinessUnitSubPage = lazy(() => import("./pages/BusinessUnitSubPage.tsx"));
const HumanitarianProgramsPage = lazy(() => import("./pages/HumanitarianProgramsPage.tsx"));
const IdpCampsPage = lazy(() => import("./pages/IdpCampsPage.tsx"));
const ServicesPage = lazy(() => import("./pages/ServicesPage.tsx"));
const GalleryPage = lazy(() => import("./pages/GalleryPage.tsx"));
const CareersPage = lazy(() => import("./pages/CareersPage.tsx"));
const BlogPage = lazy(() => import("./pages/BlogPage.tsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.tsx"));
const FAQPage = lazy(() => import("./pages/FAQPage.tsx"));

const queryClient = new QueryClient();

function RouteFallback() {
  return (
    <div
      className="min-h-[50vh] flex items-center justify-center text-sm text-muted-foreground"
      role="status"
      aria-live="polite"
    >
      Loading page…
    </div>
  );
}

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <SiteContentProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <FloatingWhatsAppButton />
            <Suspense fallback={<RouteFallback />}>
              <div className="min-h-screen page-enter">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/business-units" element={<BusinessUnitsPage />} />
                <Route path="/idp-camps" element={<IdpCampsPage />} />
                <Route
                  path="/business-units/mogadishu-initiative/idp-camps"
                  element={<IdpCampsPage />}
                />
                <Route
                  path="/business-units/mogadishu-initiative/humanitarian-programs"
                  element={<HumanitarianProgramsPage />}
                />
                <Route path="/business-units/:unitId" element={<BusinessUnitDetailPage />} />
                <Route path="/business-units/:unitId/:subPageSlug" element={<BusinessUnitSubPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              </div>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </SiteContentProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;

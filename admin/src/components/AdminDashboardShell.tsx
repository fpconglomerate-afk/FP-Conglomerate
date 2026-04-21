import { useMemo, useState } from "react";
import { ExternalLink, Menu } from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { clearStaffToken } from "@/lib/elevateApi";
import { getPublicMarketingSiteUrl } from "../lib/publicSite.ts";
import AdminSidebarNav from "./AdminSidebarNav.tsx";
import { toast } from "sonner";

const routeTitles: Record<string, string> = {
  "/leads": "Inquiries",
  "/cms/marketing": "Marketing content",
  "/cms/portfolio": "Portfolio",
};

export default function AdminDashboardShell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const siteUrl = getPublicMarketingSiteUrl();

  const title = useMemo(() => routeTitles[pathname] ?? "Dashboard", [pathname]);

  const signOut = () => {
    clearStaffToken();
    toast.message("Signed out");
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-background">
      <aside
        className="relative z-10 hidden w-56 shrink-0 flex-col border-r border-border/80 bg-muted/25 md:flex"
        aria-hidden={false}
      >
        <AdminSidebarNav />
      </aside>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-[min(18rem,100vw)] border-border/80 bg-muted/25 p-0 md:hidden">
          <AdminSidebarNav onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-3 border-b border-border/80 bg-background/95 px-3 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:px-4">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0 md:hidden"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-sm font-semibold text-foreground sm:text-base">{title}</h1>
          </div>
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <Button variant="ghost" size="sm" className="hidden text-muted-foreground sm:inline-flex" asChild>
              <a href={siteUrl} target="_blank" rel="noopener noreferrer" className="gap-1.5">
                <span>View website</span>
                <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="sm:hidden" asChild>
              <a href={siteUrl} target="_blank" rel="noopener noreferrer" aria-label="View website">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={signOut}>
              Sign out
            </Button>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

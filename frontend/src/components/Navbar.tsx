import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useSiteContent } from "@/content/SiteContentContext";
import { businessUnitSubPageHref } from "@/navigation/siteHierarchy";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const companyLinks = [{ label: "About", href: "/about" }];

const tailLinks = [
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
];

const endLinks = [{ label: "FAQ", href: "/faq" }];

function linkClass(active: boolean) {
  return cn(
    "inline-flex items-center justify-center shrink-0 whitespace-nowrap",
    "text-[0.8125rem] xl:text-sm leading-normal tracking-wide",
    "min-h-9 px-0.5 sm:min-h-0 sm:px-0",
    "transition-colors duration-300 ease-out",
    active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
  );
}

/** Exclusive accordion: opening one id closes any other (desktop + mobile). */
function toggleExclusive(
  current: string | null,
  id: string,
): string | null {
  return current === id ? null : id;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [buDropdownOpen, setBuDropdownOpen] = useState(false);
  const [expandedBuId, setExpandedBuId] = useState<string | null>(null);
  const [expandedMobileBuId, setExpandedMobileBuId] = useState<string | null>(null);
  const location = useLocation();
  const { content } = useSiteContent();
  const path = location.pathname;

  const buActive = path.startsWith("/business-units");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    if (!mobileOpen) setExpandedMobileBuId(null);
  }, [mobileOpen]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ease-out",
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-background/70",
      )}
    >
      <div className="section-shell flex min-h-[4.5rem] sm:min-h-20 items-center justify-between gap-3 py-2 sm:gap-4 sm:py-0 min-w-0">
        <Link
          to="/"
          className="text-foreground flex min-w-0 max-w-[min(100%,11rem)] shrink items-center gap-1.5 text-base transition-opacity duration-300 hover:opacity-90 sm:max-w-[min(100%,14rem)] sm:gap-2 sm:text-lg md:max-w-none md:text-xl tracking-[-0.04em] font-editorial"
        >
          <span className="truncate">{content.brand.name}</span>
          <span className="inline-flex shrink-0 items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-accent transition-transform duration-300 hover:scale-125" />
            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--highlight))] transition-transform duration-300 hover:scale-125" />
            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--premium))] transition-transform duration-300 hover:scale-125" />
          </span>
        </Link>

        <div className="hidden min-w-0 flex-1 items-center justify-end overflow-visible lg:flex">
          <div className="flex max-w-full min-w-0 flex-nowrap items-center justify-end gap-x-2 min-[1100px]:gap-x-3 xl:gap-x-4 2xl:gap-x-5 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {companyLinks.map((link) => (
              <Link key={link.href} to={link.href} className={linkClass(path === link.href)}>
                {link.label}
              </Link>
            ))}

            <DropdownMenu
              open={buDropdownOpen}
              onOpenChange={(open) => {
                setBuDropdownOpen(open);
                setExpandedBuId(null);
              }}
            >
              <DropdownMenuTrigger
                className={cn(
                  "inline-flex shrink-0 items-center justify-center gap-1 rounded-sm outline-none ring-offset-background transition-transform duration-200 ease-out data-[state=open]:scale-[0.98] focus-visible:ring-2 focus-visible:ring-ring min-h-9 px-0.5 sm:min-h-0 sm:px-0",
                  linkClass(buActive),
                )}
              >
                Business Units
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 opacity-70 transition-transform duration-300 ease-out",
                    buDropdownOpen && "rotate-180",
                  )}
                  aria-hidden
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="z-[60] w-[min(100vw-2rem,20rem)] max-h-[min(70vh,480px)] overflow-y-auto overscroll-contain p-1"
              >
                <DropdownMenuItem asChild>
                  <Link to="/business-units">All divisions</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {content.businessUnits.map((unit) => (
                  <div key={unit.id} className="py-0.5">
                    <DropdownMenuItem
                      onSelect={(e) => {
                        e.preventDefault();
                        setExpandedBuId((cur) => toggleExclusive(cur, unit.id));
                      }}
                      className="flex cursor-pointer items-center justify-between gap-2 rounded-sm transition-colors duration-200"
                    >
                      <span className="truncate text-left">{unit.name}</span>
                      <ChevronRight
                        className={cn(
                          "h-4 w-4 shrink-0 opacity-60 transition-transform duration-300 ease-out",
                          expandedBuId === unit.id && "rotate-90",
                        )}
                        aria-hidden
                      />
                    </DropdownMenuItem>
                    {expandedBuId === unit.id ? (
                      <div
                        className="border-l border-border ml-2 pl-2 space-y-0.5 pb-1 mt-0.5 animate-in fade-in zoom-in-95 slide-in-from-top-1 duration-200 ease-out motion-reduce:animate-none"
                        role="group"
                        aria-label={`${unit.name} pages`}
                      >
                        <DropdownMenuItem asChild className="pl-2">
                          <Link to={`/business-units/${unit.id}`}>Unit overview</Link>
                        </DropdownMenuItem>
                        {(unit.subPages ?? []).map((sp) => (
                          <DropdownMenuItem key={sp.slug} asChild className="pl-2">
                            <Link to={businessUnitSubPageHref(unit.id, sp.slug)}>{sp.title}</Link>
                          </DropdownMenuItem>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {tailLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={linkClass(path === link.href || path.startsWith(`${link.href}/`))}
              >
                {link.label}
              </Link>
            ))}

            {endLinks.map((link) => (
              <Link key={link.href} to={link.href} className={linkClass(path === link.href)}>
                {link.label}
              </Link>
            ))}

            <Link
              to="/contact"
              className={cn(
                "inline-flex shrink-0 items-center justify-center rounded-sm border border-accent bg-accent",
                "px-2.5 py-2 text-[0.8125rem] font-medium leading-normal text-accent-foreground xl:px-3.5 xl:py-2 xl:text-sm",
                "transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5",
                path === "/contact" && "ring-2 ring-accent/40 ring-offset-2 ring-offset-background",
              )}
            >
              <span className="hidden xl:inline">Start a Conversation</span>
              <span className="xl:hidden">Contact</span>
            </Link>

            <div className="shrink-0">
              <ThemeToggle />
            </div>
          </div>
        </div>

        <div className="lg:hidden flex items-center gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-foreground p-2 -mr-2 rounded-sm transition-colors duration-200 hover:bg-secondary/80 active:scale-95 motion-reduce:active:scale-100"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={24} className="transition-opacity duration-200" /> : <Menu size={24} />}
          </button>
          <ThemeToggle />
        </div>
      </div>

      {mobileOpen ? (
        <div
          className="lg:hidden border-t border-border bg-background/98 backdrop-blur-md max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain px-4 sm:px-6 py-6 sm:py-8 space-y-8 sm:space-y-10 pb-[max(1.5rem,env(safe-area-inset-bottom))] animate-in fade-in slide-in-from-top-2 duration-300 ease-out motion-reduce:duration-75 motion-reduce:animate-none"
        >
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 sm:mb-4 leading-normal">
              Site
            </p>
            {companyLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block rounded-sm px-2 py-2.5 text-base sm:text-[1.0625rem] leading-snug text-foreground transition-colors duration-200 hover:bg-secondary/35 hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
            {tailLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="block rounded-sm px-2 py-2.5 text-base sm:text-[1.0625rem] leading-snug text-foreground transition-colors duration-200 hover:bg-secondary/35 hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
            {endLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block rounded-sm px-2 py-2.5 text-base sm:text-[1.0625rem] leading-snug text-foreground transition-colors duration-200 hover:bg-secondary/35 hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className={cn(
                "mt-3 inline-flex w-full items-center justify-center rounded-sm border border-accent bg-accent px-4 py-3 text-base font-medium text-accent-foreground",
                "transition-all duration-200 hover:opacity-90 active:scale-[0.99]",
              )}
            >
              Start a Conversation
            </Link>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <p className="text-xs uppercase tracking-widest text-muted-foreground leading-normal mb-1 sm:mb-2">
              Business Units
            </p>
            <Link
              to="/business-units"
              className="block text-base sm:text-lg text-foreground py-1 transition-colors duration-200 hover:text-accent"
            >
              All divisions
            </Link>
            {content.businessUnits.map((unit) => {
              const open = expandedMobileBuId === unit.id;
              return (
                <div
                  key={unit.id}
                  className="border border-border rounded-sm overflow-hidden bg-secondary/15 transition-shadow duration-300 hover:shadow-sm"
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setExpandedMobileBuId((cur) => toggleExclusive(cur, unit.id))}
                    className="w-full min-h-[48px] px-3 sm:px-4 py-3 flex justify-between items-center gap-2 text-left font-medium text-foreground bg-transparent hover:bg-secondary/40 transition-colors duration-200 ease-out"
                  >
                    <span className="text-sm sm:text-base leading-snug">{unit.name}</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 shrink-0 transition-transform duration-300 ease-out",
                        open && "rotate-180",
                      )}
                      aria-hidden
                    />
                  </button>
                  <div
                    className="nav-submenu-grid border-t border-border/80 bg-background/60"
                    data-open={open ? "true" : "false"}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div
                        className="space-y-2 px-3 sm:px-4 py-3"
                        aria-hidden={!open}
                      >
                        <Link
                          to={`/business-units/${unit.id}`}
                          className="block text-sm sm:text-base text-muted-foreground hover:text-foreground py-1 transition-colors duration-200"
                        >
                          Unit overview
                        </Link>
                        {(unit.subPages ?? []).map((sp) => (
                          <Link
                            key={sp.slug}
                            to={businessUnitSubPageHref(unit.id, sp.slug)}
                            className="block text-sm sm:text-base text-muted-foreground hover:text-foreground py-1 transition-colors duration-200"
                          >
                            {sp.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </nav>
  );
}

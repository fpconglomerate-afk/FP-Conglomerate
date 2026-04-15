import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useSiteContent } from "@/content/SiteContentContext";
import { businessUnitSubPageHref } from "@/navigation/siteHierarchy";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const tailLinks = [
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
];

function linkClass(active: boolean) {
  return `text-sm tracking-wide transition-colors duration-300 ${
    active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
  }`;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { content } = useSiteContent();
  const path = location.pathname;

  const companyActive = companyLinks.some((l) => path === l.href);
  const buActive = path.startsWith("/business-units");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-background/70"
      }`}
    >
      <div className="section-shell flex items-center justify-between h-20">
        <Link
          to="/"
          className="text-foreground text-lg md:text-xl tracking-[-0.04em] font-editorial flex items-center gap-2"
        >
          {content.brand.name}
          <span className="inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--highlight))]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--premium))]" />
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-5 xl:gap-7">
          <Link
            to="/"
            className={linkClass(path === "/" || path === "")}
          >
            Home
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger
              className={`inline-flex items-center gap-1 outline-none ${linkClass(companyActive)}`}
            >
              Company
              <ChevronDown className="h-3.5 w-3.5 opacity-70" aria-hidden />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="z-[60] min-w-[12rem]">
              {companyLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link to={link.href}>{link.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger
              className={`inline-flex items-center gap-1 outline-none ${linkClass(buActive)}`}
            >
              Business Units
              <ChevronDown className="h-3.5 w-3.5 opacity-70" aria-hidden />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="z-[60] max-h-[min(70vh,520px)] w-[min(100vw-2rem,22rem)] overflow-y-auto"
            >
              <DropdownMenuItem asChild>
                <Link to="/business-units">All divisions</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {content.businessUnits.map((unit, unitIndex) => (
                <div key={unit.id}>
                  <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                    {unit.name}
                  </DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link to={`/business-units/${unit.id}`}>Unit overview</Link>
                  </DropdownMenuItem>
                  {(unit.subPages ?? []).map((sp) => (
                    <DropdownMenuItem key={`${unit.id}-${sp.slug}`} asChild>
                      <Link to={businessUnitSubPageHref(unit.id, sp.slug)}>{sp.title}</Link>
                    </DropdownMenuItem>
                  ))}
                  {unitIndex < content.businessUnits.length - 1 ? <DropdownMenuSeparator /> : null}
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

          <ThemeToggle />
        </div>

        <div className="lg:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-foreground"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-background border-t border-border px-6 py-8 space-y-8 max-h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Site</p>
            <Link to="/" className="block text-lg text-foreground">
              Home
            </Link>
          </div>

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Company</p>
            {companyLinks.map((link) => (
              <Link key={link.href} to={link.href} className="block text-lg text-foreground">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Business Units</p>
            <Link to="/business-units" className="block text-lg text-foreground">
              All divisions
            </Link>
            {content.businessUnits.map((unit) => (
              <details key={unit.id} className="group border border-border rounded-sm px-3 py-2">
                <summary className="cursor-pointer list-none font-medium text-foreground flex items-center justify-between">
                  {unit.name}
                  <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div className="mt-3 pl-2 space-y-2 border-l border-border ml-1">
                  <Link
                    to={`/business-units/${unit.id}`}
                    className="block text-base text-muted-foreground hover:text-foreground"
                  >
                    Unit overview
                  </Link>
                  {(unit.subPages ?? []).map((sp) => (
                    <Link
                      key={sp.slug}
                      to={businessUnitSubPageHref(unit.id, sp.slug)}
                      className="block text-base text-muted-foreground hover:text-foreground"
                    >
                      {sp.title}
                    </Link>
                  ))}
                </div>
              </details>
            ))}
          </div>

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">More</p>
            {tailLinks.map((link) => (
              <Link key={link.label} to={link.href} className="block text-lg text-foreground">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

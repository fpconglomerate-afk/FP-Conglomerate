import { Link } from "react-router-dom";
import { useSiteContent } from "@/content/SiteContentContext";

const sectors = [
  "Faith and Ministry",
  "General Construction and Maintenance",
  "Electronics and Appliances",
  "Real Estate, Media and Hospitality",
  "NGO and Humanitarian Action",
];

const company = [
  { label: "About", href: "/about" },
  { label: "Business Units", href: "/business-units" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Gwarinpa Mall", href: "/projects/gwarinpa-mall" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const { content } = useSiteContent();

  return (
    <footer className="border-t border-border bg-background">
      <div className="section-shell py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="text-foreground text-xl font-editorial mb-4">
              FP
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {content.brand.tagline}.
              <br />
              One group standard across every unit.
            </p>
          </div>

          <div className="lg:col-span-3 lg:col-start-4">
            <p className="eyebrow mb-5">Sectors</p>
            <ul className="space-y-3">
              {sectors.map((s) => (
                <li key={s} className="text-sm text-foreground/70 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/80" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow mb-5">Company</p>
            <ul className="space-y-3">
              {company.map((c) => (
                <li key={c.label}>
                  <Link
                    to={c.href}
                    className="text-sm text-foreground/70 hover:text-foreground transition-colors duration-300"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow mb-5">Head Office</p>
            <ul className="space-y-3 text-sm text-foreground/70">
              <li>{content.brand.contactEmail}</li>
              <li>{content.brand.phone}</li>
              <li>{content.brand.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {content.brand.name}. All rights reserved.
          </p>
          <a
            href="https://elevatewebandmarketing.com"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-muted-foreground creator-link transition-colors"
          >
            Created by Ufuoma at elevatewebandmarketing.com
          </a>
        </div>
      </div>
    </footer>
  );
}

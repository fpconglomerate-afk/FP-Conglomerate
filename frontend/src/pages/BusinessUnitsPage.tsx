import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link, useLocation } from "react-router-dom";
import { useSiteContent } from "@/content/SiteContentContext";
import MediaAsset from "@/components/MediaAsset";
import BusinessUnitLogo from "@/components/BusinessUnitLogo";

export default function BusinessUnitsPage() {
  const { content } = useSiteContent();
  const location = useLocation();

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-28">
        <section className="section-shell">
          <p className="eyebrow mb-5">Business Units</p>
          <h1 className="font-editorial text-5xl md:text-7xl max-w-4xl">
            One group architecture. Five mission-driven institutions.
          </h1>
          <p className="mt-8 text-lg text-muted-foreground max-w-2xl">
            Each unit has a clear mandate, while all units align to one shared
            operating standard: trust, integrity, excellence, and service.
          </p>
        </section>

        <section className="section-shell py-20 md:py-24">
          <div className="space-y-6">
            {content.businessUnits.map((unit, index) => (
              <article
                key={unit.id}
                className={`border border-border p-8 md:p-10 ${
                  index % 2 === 0 ? "lg:mr-16 bg-secondary/25" : "lg:ml-24 bg-background"
                }`}
              >
                <p className="eyebrow mb-3">{unit.shortLabel}</p>
                <div className="flex items-center gap-3 mb-4">
                  <BusinessUnitLogo unit={unit} className="h-10 w-auto object-contain" />
                  <h2 className="font-editorial text-3xl md:text-4xl">{unit.name}</h2>
                </div>
                <p className="text-foreground mb-3">{unit.statement}</p>
                <p className="text-muted-foreground leading-relaxed">{unit.details}</p>
                <MediaAsset
                  src={unit.heroImage || content.galleryItems[0]?.src}
                  alt={unit.name}
                  className="w-full h-48 md:h-60 object-cover border border-border mt-6 dark:brightness-75"
                />
                <Link
                  to={`/business-units/${unit.id}`}
                  state={{ from: location.pathname }}
                  className="inline-block mt-6 text-sm text-accent"
                >
                  Open unit profile →
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

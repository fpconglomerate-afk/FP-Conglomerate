import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowUpRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSiteContent } from "@/content/SiteContentContext";
import BusinessUnitLogo from "@/components/BusinessUnitLogo";

export default function BusinessEcosystem() {
  const { ref, isVisible } = useScrollReveal(0.1);
  const { content } = useSiteContent();
  const location = useLocation();
  const parentUnit = content.businessUnits[0];
  const operatingUnits = content.businessUnits.slice(1);

  return (
    <section id="sectors" className="section-space section-shell" ref={ref}>
      <div
        className={`mb-20 md:mb-24 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="eyebrow mb-5">Our Ecosystem</p>
        <h2 className="font-editorial text-4xl md:text-6xl text-foreground max-w-4xl">
          Distinct institutions aligned by one <span className="brand-purple">trust</span> framework.
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6">
        <div
          className={`lg:col-span-5 border border-border bg-secondary/35 p-8 md:p-10 transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          <p className="eyebrow mb-3">{parentUnit.shortLabel}</p>
          <h3 className="font-editorial text-3xl md:text-4xl mb-4">{parentUnit.name}</h3>
          <p className="text-foreground mb-4 leading-relaxed">{parentUnit.statement}</p>
          <p className="text-muted-foreground leading-relaxed">{parentUnit.details}</p>
          <Link to="/business-units" className="inline-flex items-center gap-2 mt-10 text-sm text-accent">
            Explore full business architecture <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="lg:col-span-7">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {operatingUnits.map((unit, i) => (
              <article
                key={unit.id}
                className={`bg-background p-7 md:p-8 transition-all duration-500 ${
                  i % 2 === 0 ? "md:translate-y-5" : ""
                } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{ transitionDelay: `${260 + i * 120}ms` }}
              >
                <p className="eyebrow mb-2">{unit.shortLabel}</p>
                <div className="flex items-center gap-2 mb-3">
                  <BusinessUnitLogo unit={unit} className="h-8 w-auto object-contain" />
                  <h3 className="font-editorial text-2xl">{unit.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{unit.statement}</p>
                <Link
                  to={`/business-units/${unit.id}`}
                  state={{ from: location.pathname }}
                  className="inline-block text-xs mt-4 text-accent"
                >
                  View unit page
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-border pt-8">
        <p className="text-sm text-muted-foreground max-w-3xl">
          Each unit serves a different market, but all of them follow one service
          doctrine: integrity, consistency, excellence, and responsibility.
        </p>
      </div>
    </section>
  );
}

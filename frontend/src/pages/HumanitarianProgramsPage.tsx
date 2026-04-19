import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBackButton from "@/components/PageBackButton";
import BusinessUnitLogo from "@/components/BusinessUnitLogo";
import MediaAsset from "@/components/MediaAsset";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/content/SiteContentContext";
import { humanitarianProgramsContent, MIA_UNIT_ID } from "@/content/humanitarianProgramsContent";
import RevealOnScroll from "@/components/humanitarian/RevealOnScroll";

const { hero, idpTeaser, kogi, impactPillars, moments, cta } = humanitarianProgramsContent;

export default function HumanitarianProgramsPage() {
  const { content } = useSiteContent();
  const unit = content.businessUnits.find((u) => u.id === MIA_UNIT_ID);

  return (
    <>
      <Seo
        title="Humanitarian programs"
        path="/business-units/mogadishu-initiative/humanitarian-programs"
        description="MIA humanitarian programs: field response, shelter, education, and dignity-first support aligned with FP Conglomerate (Abuja-based)."
      />
      <Navbar />
      <main className="pb-24 md:pb-28">
        {/* Hero */}
        <section aria-labelledby="hero-heading" className="relative min-h-[min(72vh,560px)] flex flex-col justify-end overflow-hidden">
          <MediaAsset
            src={hero.imageSrc}
            alt={hero.imageAlt}
            className="absolute inset-0 h-full w-full object-cover"
            priority
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/25 dark:via-background/85"
            aria-hidden
          />
          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-28 pb-14 md:pt-36 md:pb-20">
            <PageBackButton fallbackTo={`/business-units/${MIA_UNIT_ID}`} className="mb-8 md:mb-10" />
            {unit && (
              <div className="eyebrow mb-4 flex items-center gap-2">
                <BusinessUnitLogo unit={unit} className="h-7 w-auto object-contain" />
                <span>{unit.name}</span>
              </div>
            )}
            <h1 id="hero-heading" className="font-editorial text-4xl md:text-6xl lg:text-7xl max-w-4xl tracking-tight">
              {hero.headline}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">{hero.subtext}</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <a href={hero.exploreWorkHref}>Explore Our Work</a>
              </Button>
              <Button size="lg" variant="outline" className="border-border bg-background/80 backdrop-blur-sm" asChild>
                <Link to={hero.partnerHref}>Partner With Us</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* IDP camps: link to standalone page (id kept for old #idp-camps links) */}
        <section
          id="idp-camps"
          aria-labelledby="idp-teaser-title"
          className="section-shell py-16 md:py-24 border-b border-border/60 scroll-mt-28"
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 max-w-5xl">
            <div>
              <p className="eyebrow mb-4">{idpTeaser.title}</p>
              <h2 id="idp-teaser-title" className="font-editorial text-3xl md:text-4xl max-w-xl">
                Displacement in Nigeria
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed max-w-prose">{idpTeaser.body}</p>
            </div>
            <div className="shrink-0">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <Link to={idpTeaser.href}>{idpTeaser.linkLabel}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Kogi project */}
        <RevealOnScroll>
          <section
            id={kogi.id}
            aria-labelledby="kogi-title"
            className="section-shell py-16 md:py-24 scroll-mt-28"
          >
            <div className="max-w-3xl">
              <p className="eyebrow mb-3">Featured project</p>
              <h2 id="kogi-title" className="font-editorial text-3xl md:text-4xl lg:text-5xl">
                {kogi.title}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">{kogi.subtitle}</p>
              <p className="mt-6 text-muted-foreground leading-relaxed">{kogi.body}</p>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{kogi.galleryNote}</p>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {kogi.gallery.map((item, index) => (
                <figure
                  key={`${item.src}-${index}`}
                  className="group overflow-hidden rounded-sm border border-border bg-muted/20 transition duration-300 hover:shadow-lg"
                >
                  <MediaAsset
                    src={item.src}
                    alt={item.alt}
                    className="w-full aspect-[4/3] object-cover transition duration-500 group-hover:scale-[1.02] dark:brightness-[0.9] dark:contrast-[0.98]"
                  />
                </figure>
              ))}
            </div>

            <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-8 border border-border rounded-sm p-6 md:p-8 bg-secondary/20">
              {kogi.impact.map((row) => (
                <div key={row.label} className="text-center sm:text-left">
                  <p className="eyebrow text-[10px] mb-2">{row.label}</p>
                  <p className="text-base font-medium text-foreground">{row.value}</p>
                </div>
              ))}
            </div>
          </section>
        </RevealOnScroll>

        {/* Impact pillars */}
        <RevealOnScroll>
          <section aria-labelledby="impact-title" className="section-shell py-16 md:py-24 border-t border-border/60">
            <h2 id="impact-title" className="font-editorial text-3xl md:text-4xl max-w-2xl">
              {impactPillars.title}
            </h2>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {impactPillars.items.map((item) => (
                <article
                  key={item.title}
                  className="border border-border rounded-sm p-8 bg-background transition duration-300 hover:shadow-md hover:-translate-y-0.5"
                >
                  <h3 className="font-editorial text-xl md:text-2xl">{item.title}</h3>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </article>
              ))}
            </div>
          </section>
        </RevealOnScroll>

        {/* Moments strip */}
        <RevealOnScroll>
          <section aria-labelledby="moments-title" className="py-16 md:py-24 bg-secondary/25 border-y border-border/50">
            <div className="section-shell">
              <h2 id="moments-title" className="font-editorial text-2xl md:text-3xl">
                Moments From Our Outreach
              </h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-xl">
                Documentary snapshots from field programs, shared with respect for the people we serve.
              </p>
            </div>
            <div className="mt-10 pl-6 md:pl-12 lg:px-12 max-w-[1400px] mx-auto">
              <div
                className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory md:grid md:grid-cols-3 lg:grid-cols-6 md:overflow-visible md:gap-4"
                role="list"
                aria-label="Outreach photo gallery"
              >
                {moments.map((m) => (
                  <figure
                    key={m.src}
                    role="listitem"
                    className="snap-center shrink-0 w-[min(280px,82vw)] md:w-auto overflow-hidden rounded-sm border border-border group"
                  >
                    <MediaAsset
                      src={m.src}
                      alt={m.alt}
                      className="h-44 w-full md:h-40 object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </figure>
                ))}
              </div>
            </div>
          </section>
        </RevealOnScroll>

        {/* CTA */}
        <RevealOnScroll>
          <section
            aria-labelledby="cta-title"
            className="section-shell py-16 md:py-24 section-transition rounded-sm my-8 border border-border/40"
          >
            <div className="max-w-2xl mx-auto text-center px-2">
              <h2 id="cta-title" className="font-editorial text-3xl md:text-4xl">
                {cta.title}
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">{cta.paragraph}</p>
              <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                  <Link to={cta.partnerHref}>Partner With Us</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to={cta.contactHref}>Contact Our Team</Link>
                </Button>
              </div>
            </div>
          </section>
        </RevealOnScroll>
      </main>
      <Footer />
    </>
  );
}

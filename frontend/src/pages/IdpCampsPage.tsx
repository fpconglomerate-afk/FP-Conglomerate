import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBackButton from "@/components/PageBackButton";
import BusinessUnitLogo from "@/components/BusinessUnitLogo";
import MediaAsset from "@/components/MediaAsset";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/content/SiteContentContext";
import { idpCampsBody, idpCampsPageContent, MIA_UNIT_ID } from "@/content/idpCampsContent";
import RevealOnScroll from "@/components/humanitarian/RevealOnScroll";

const { hero, gallery, gallerySection, cta } = idpCampsPageContent;

export default function IdpCampsPage() {
  const { content } = useSiteContent();
  const unit = content.businessUnits.find((u) => u.id === MIA_UNIT_ID);

  return (
    <>
      <Navbar />
      <main className="pb-24 md:pb-28">
        <section aria-labelledby="idp-hero-heading" className="relative min-h-[min(65vh,480px)] flex flex-col justify-end overflow-hidden">
          <MediaAsset
            src={hero.imageSrc}
            alt={hero.imageAlt}
            className="absolute inset-0 h-full w-full object-cover"
            priority
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30 dark:via-background/88"
            aria-hidden
          />
          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-28 pb-12 md:pt-32 md:pb-16">
            <PageBackButton fallbackTo={cta.backToProgramsHref} className="mb-8 md:mb-10" />
            {unit && (
              <div className="eyebrow mb-4 flex items-center gap-2">
                <BusinessUnitLogo unit={unit} className="h-7 w-auto object-contain" />
                <span>{unit.name}</span>
              </div>
            )}
            <p className="eyebrow mb-3 text-muted-foreground">{idpCampsBody.sectionEyebrow}</p>
            <h1 id="idp-hero-heading" className="font-editorial text-4xl md:text-5xl lg:text-6xl max-w-4xl tracking-tight">
              {hero.headline}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">{hero.subtext}</p>
          </div>
        </section>

        <section aria-labelledby="idp-main-title" className="section-shell py-16 md:py-24 border-b border-border/60">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 lg:items-start">
            <div>
              <h2 id="idp-main-title" className="font-editorial text-3xl md:text-4xl lg:text-5xl max-w-xl">
                {idpCampsBody.title}
              </h2>
              <p className="mt-4 text-sm md:text-base text-muted-foreground max-w-prose leading-relaxed">
                {idpCampsBody.sectionIntro}
              </p>
              <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed max-w-prose">
                {idpCampsBody.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <ul className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {idpCampsBody.cards.map((card) => (
                  <li
                    key={card.title}
                    className="border border-border rounded-sm p-5 bg-card/40 transition duration-300 hover:shadow-md hover:-translate-y-0.5"
                  >
                    <p className="text-sm font-semibold text-foreground">{card.title}</p>
                    <p className="mt-2 text-xs text-muted-foreground leading-snug">{card.description}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative rounded-sm overflow-hidden border border-border aspect-[4/5] lg:aspect-auto lg:min-h-[480px] lg:sticky lg:top-28">
              <MediaAsset
                src={idpCampsBody.featureImageSrc}
                alt={idpCampsBody.featureImageAlt}
                className="w-full h-full object-cover dark:brightness-[0.92]"
              />
            </div>
          </div>
        </section>

        <RevealOnScroll>
          <section aria-labelledby="idp-gallery-title" className="section-shell py-16 md:py-24">
            <h2 id="idp-gallery-title" className="font-editorial text-2xl md:text-3xl max-w-2xl">
              {gallerySection.title}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-2xl leading-relaxed">
              {gallerySection.description}
            </p>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {gallery.map((item, index) => (
                <figure
                  key={`${item.src}-${index}`}
                  className="group overflow-hidden rounded-sm border border-border bg-muted/15 transition duration-300 hover:shadow-md"
                >
                  <MediaAsset
                    src={item.src}
                    alt={item.alt}
                    className="w-full aspect-[4/3] object-cover transition duration-500 group-hover:scale-[1.02] dark:brightness-[0.9] dark:contrast-[0.98]"
                  />
                </figure>
              ))}
            </div>
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <section
            aria-labelledby="idp-cta-title"
            className="section-shell py-16 md:py-24 section-transition rounded-sm border border-border/40"
          >
            <div className="max-w-2xl mx-auto text-center px-2">
              <h2 id="idp-cta-title" className="font-editorial text-3xl md:text-4xl">
                {cta.title}
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">{cta.paragraph}</p>
              <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                  <Link to={cta.partnerHref}>Partner With Us</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to={cta.contactHref}>Contact Our Team</Link>
                </Button>
                <Button size="lg" variant="ghost" className="text-muted-foreground" asChild>
                  <Link to={cta.backToProgramsHref}>Humanitarian programs overview</Link>
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

import { Link, useLocation, useParams } from "react-router-dom";
import { Seo, SEO_DEFAULT_DESCRIPTION } from "@/components/Seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSiteContent } from "@/content/SiteContentContext";
import MediaAsset from "@/components/MediaAsset";
import PageBackButton from "@/components/PageBackButton";
import BusinessUnitLogo from "@/components/BusinessUnitLogo";

export default function BusinessUnitDetailPage() {
  const { unitId } = useParams();
  const { content } = useSiteContent();
  const location = useLocation();
  const unit = content.businessUnits.find((item) => item.id === unitId);

  if (!unit) {
    return (
      <>
        <Seo
          title="Business unit not found"
          path={`/business-units/${unitId ?? ""}`}
          description={SEO_DEFAULT_DESCRIPTION}
          noindex
        />
        <Navbar />
        <main className="pt-32 pb-28 section-shell">
          <h1 className="font-editorial text-5xl">Business unit not found.</h1>
          <Link to="/business-units" className="inline-block mt-8 text-accent">
            Back to all business units
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const metaDesc =
    unit.statement.length > 155 ? `${unit.statement.slice(0, 152)}…` : unit.statement;

  return (
    <>
      <Seo title={unit.name} path={`/business-units/${unit.id}`} description={metaDesc} />
      <Navbar />
      <main className="pt-32 pb-28">
        <section className="section-shell">
          <PageBackButton fallbackTo="/business-units" className="mb-10" />
          <p className="eyebrow mb-5">{unit.shortLabel}</p>
          <div className="flex items-center gap-4 max-w-4xl">
            <BusinessUnitLogo unit={unit} className="h-14 md:h-16 w-auto object-contain" />
            <h1 className="font-editorial text-5xl md:text-7xl">{unit.name}</h1>
          </div>
          <MediaAsset
            src={unit.heroImage || content.galleryItems[0]?.src}
            alt={`${unit.name} hero`}
            className="w-full h-[260px] md:h-[420px] object-cover mt-10 border border-border dark:brightness-75"
            priority
          />
        </section>

        <section className="section-shell py-20 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 border border-border bg-secondary/25 p-8 md:p-10">
              <p className="eyebrow mb-4">Focus</p>
              <p className="text-2xl font-editorial">{unit.focus}</p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 border border-border p-8 md:p-10">
              <p className="text-lg text-foreground mb-5">{unit.statement}</p>
              <p className="text-muted-foreground leading-relaxed">{unit.details}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
            {(unit.gallery ?? []).map((image, index) => (
              <MediaAsset
                key={`${image}-${index}`}
                src={image}
                alt={`${unit.name} gallery ${index + 1}`}
                className="w-full h-48 md:h-56 object-cover border border-border dark:brightness-75"
              />
            ))}
          </div>
          <div className="mt-12 border-t border-border pt-8">
            <p className="eyebrow mb-4">Unit Focus Pages</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {unit.subPages.map((subPage) => (
                <Link
                  key={subPage.slug}
                  to={`/business-units/${unit.id}/${subPage.slug}`}
                  state={{ from: location.pathname }}
                  className="border border-border p-5 hover:bg-secondary transition-colors"
                >
                  <h3 className="font-editorial text-2xl">{subPage.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{subPage.summary}</p>
                </Link>
              ))}
            </div>
          </div>
          <Link to="/contact" className="inline-block mt-10 text-sm text-accent">
            Start a partnership conversation →
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}

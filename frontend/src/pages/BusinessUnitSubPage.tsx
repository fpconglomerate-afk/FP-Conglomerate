import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSiteContent } from "@/content/SiteContentContext";
import MediaAsset from "@/components/MediaAsset";
import PageBackButton from "@/components/PageBackButton";
import BusinessUnitLogo from "@/components/BusinessUnitLogo";

export default function BusinessUnitSubPage() {
  const { unitId, subPageSlug } = useParams();
  const { content } = useSiteContent();
  const unit = content.businessUnits.find((item) => item.id === unitId);
  const subPage = unit?.subPages?.find((item) => item.slug === subPageSlug);

  if (!unit || !subPage) {
    return (
      <>
        <Navbar />
        <main className="pt-32 pb-28 section-shell">
          <h1 className="font-editorial text-5xl">Business page not found.</h1>
          <Link to="/business-units" className="inline-block mt-8 text-accent">
            Back to business units
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-28">
        <section className="section-shell">
          <PageBackButton fallbackTo={`/business-units/${unit.id}`} className="mb-10" />
          <div className="eyebrow mb-5 flex items-center gap-2">
            <BusinessUnitLogo unit={unit} className="h-7 w-auto object-contain" />
            <span>{unit.name}</span>
          </div>
          <h1 className="font-editorial text-5xl md:text-7xl max-w-4xl">{subPage.title}</h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">{subPage.summary}</p>
          <MediaAsset
            src={subPage.image || content.galleryItems[0]?.src}
            alt={subPage.title}
            className="w-full h-[260px] md:h-[420px] object-cover mt-10 border border-border dark:brightness-75"
            priority
          />
        </section>

        <section className="section-shell py-20 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 border border-border p-8 md:p-10">
            <p className="text-muted-foreground leading-relaxed text-lg">{subPage.content}</p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 border border-border bg-secondary/30 p-8">
            <p className="eyebrow mb-3">More From This Unit</p>
            <div className="space-y-3">
              {(unit.subPages ?? []).map((item) => (
                <Link
                  key={item.slug}
                  to={`/business-units/${unit.id}/${item.slug}`}
                  state={{ from: `/business-units/${unit.id}` }}
                  className="block text-sm text-foreground hover:text-accent"
                >
                  {item.title}
                </Link>
              ))}
            </div>
            <Link to={`/business-units/${unit.id}`} className="inline-block mt-8 text-sm text-accent">
              Back to unit overview →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

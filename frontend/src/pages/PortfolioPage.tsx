import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useElevatePortfolioProjects } from "@/hooks/elevateQueries";
import { isPublicCmsEnabled } from "@/lib/elevateApi";
import MediaAsset from "@/components/MediaAsset";
import type { PortfolioProjectPublic } from "@/lib/elevateApiTypes";

export default function PortfolioPage() {
  const { ref, isVisible } = useScrollReveal(0.1);
  const orgCms = isPublicCmsEnabled();
  const { data: projects, isLoading, isError } = useElevatePortfolioProjects();

  const showApi = orgCms && !isError && projects && projects.length > 0;

  if (!orgCms) {
    return (
      <>
        <Seo
          title="Portfolio"
          path="/portfolio"
          description="Selected portfolio projects and programs from FP Conglomerate units (requires CMS connection for live listings)."
        />
        <Navbar />
        <main className="section-shell pt-32 pb-24">
          <p className="eyebrow mb-4">Portfolio</p>
          <p className="text-muted-foreground max-w-2xl">
            Portfolio projects will appear here once your team connects this page to your content system.
          </p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Seo
        title="Portfolio"
        path="/portfolio"
        description="Selected work and programs across FP Conglomerate: portfolio highlights with summaries and contact for collaboration."
      />
      <Navbar />
      <main className="pt-32 pb-32 section-shell" ref={ref}>
        <div
          className={`mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="eyebrow mb-5">Portfolio</p>
          <h1 className="font-editorial text-5xl md:text-7xl text-foreground max-w-4xl">Selected work and programs</h1>
          {isLoading && <p className="mt-6 text-sm text-muted-foreground">Loading…</p>}
        </div>

        {!showApi ? (
          <p className="text-muted-foreground">
            {isError ? "Could not load portfolio from the API." : "No published portfolio projects yet."}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects!.map((p: PortfolioProjectPublic) => (
              <article
                key={p.id ?? p.slug}
                className={`border border-border bg-card/40 overflow-hidden rounded-lg transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                {p.imageUrl ? (
                  <MediaAsset
                    src={p.imageUrl}
                    alt={p.title}
                    className="w-full h-52 object-cover border-b border-border dark:brightness-75"
                  />
                ) : null}
                <div className="p-6 md:p-8">
                  <h2 className="font-editorial text-2xl md:text-3xl text-foreground">{p.title}</h2>
                  {p.summary ? (
                    <p className="mt-3 text-muted-foreground leading-relaxed">{p.summary}</p>
                  ) : null}
                  {p.body ? (
                    <p className="mt-4 text-sm text-muted-foreground whitespace-pre-wrap line-clamp-6">{p.body}</p>
                  ) : null}
                  <Link to="/contact" className="inline-block mt-6 text-sm text-accent font-medium hover:underline">
                    Discuss this project
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

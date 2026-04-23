import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";
import { useSiteContent } from "@/content/SiteContentContext";
import MediaAsset from "@/components/MediaAsset";

export default function About() {
  const { ref, isVisible } = useScrollReveal(0.15);
  const { content } = useSiteContent();
  const founder = content.aboutLeadership;
  const quickFacts = founder.quickFacts ?? [];
  const topFacts = quickFacts.slice(0, 3);

  return (
    <section id="about" className="section-space section-shell section-transition" ref={ref}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-start">
        <div
          className={`lg:col-span-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="eyebrow mb-8">About FP Conglomerate</p>
          <blockquote className="font-editorial text-3xl md:text-4xl text-foreground leading-[1.2]">
            "We do not stop at good intentions.
            <span className="text-accent"> We follow through with trust and courage."</span>
          </blockquote>
        </div>

        <div
          className={`lg:col-span-7 lg:col-start-6 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="mb-8 border border-border bg-card/40 p-4 md:p-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-[112px_1fr] sm:items-center">
              <MediaAsset
                src={founder.portraitSrc}
                alt={founder.portraitAlt}
                className="h-28 w-28 object-cover border border-border sm:h-24 sm:w-24"
              />
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Founder spotlight
                </p>
                <p className="mt-1 font-medium text-foreground">{founder.name}</p>
                <p className="text-sm text-muted-foreground">{founder.title}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
              {topFacts.map((fact) => (
                <div key={fact.label} className="border border-border/70 bg-background/70 px-3 py-2">
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    {fact.label}
                  </p>
                  <p className="mt-1 text-xs text-foreground">{fact.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8 text-muted-foreground text-[1.03rem] leading-[1.85]">
            <p>
              FP Conglomerate exists because people deserve services they can actually
              rely on. We are built out of Abuja with a multi-sector footprint—commerce,
              ministry, media, hospitality, and humanitarian work through our NGO-oriented
              programs—yet our units serve different markets under one bar for
              accountability and quality.
            </p>
            <p>
              From ministry and humanitarian work to electronics, media, real estate,
              and hospitality, we stay focused on practical solutions that make life
              better and rebuild confidence, one engagement at a time.
            </p>
            <p>
              Trust, excellence, integrity, and service are not posters on a wall for
              us. They are how we expect teams to show up, every day, in every unit.
            </p>
          </div>
          <Link to="/about#founder-profile" className="inline-block mt-10 text-sm text-accent">
            Explore the full founder biography →
          </Link>
        </div>
      </div>
    </section>
  );
}

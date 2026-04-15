import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSiteContent } from "@/content/SiteContentContext";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const { content } = useSiteContent();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen section-shell pt-28 md:pt-36 pb-16 flex items-center">
      <div
        className={`absolute top-28 right-6 md:right-12 w-[28%] h-px bg-accent/70 origin-right transition-transform ease-out ${
          loaded ? "scale-x-100" : "scale-x-0"
        }`}
        style={{ transformOrigin: "left", transitionDuration: "1500ms" }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 w-full items-end">
        <p
          className={`eyebrow lg:col-span-3 lg:self-start lg:pt-8 transition-all duration-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {content.brand.tagline}
          <span className="brand-yellow ml-2">●</span>
        </p>

        <div className="lg:col-span-8 lg:col-start-4">
          <h1
            className={`font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-[5.6rem] leading-[0.95] text-foreground transition-all duration-1000 delay-200 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {content.hero.headline}
            <span className="block mt-2 text-accent">{content.hero.highlightedText}</span>
          </h1>

          <p
            className={`mt-10 text-lg text-muted-foreground max-w-xl leading-relaxed transition-all duration-700 delay-500 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {content.hero.subtext}
          </p>

          <div
            className={`mt-12 transition-all duration-700 delay-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="brand-divider w-28 mb-8" />
            <Link
              to="/contact"
              className="inline-block bg-foreground text-background px-8 py-4 text-sm font-medium tracking-wide hover:bg-foreground/90 transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98] motion-reduce:hover:scale-100 motion-reduce:active:scale-100"
            >
              {content.hero.cta}
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`absolute bottom-10 right-6 md:right-12 flex items-center gap-3 text-muted-foreground transition-all duration-700 delay-1000 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-px h-12 bg-border" />
        <span className="text-xs tracking-widest uppercase">Scroll</span>
      </div>
    </section>
  );
}

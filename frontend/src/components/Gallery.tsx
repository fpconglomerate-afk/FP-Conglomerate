import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";
import { useSiteContent } from "@/content/SiteContentContext";
import MediaAsset from "@/components/MediaAsset";

export default function Gallery() {
  const { ref, isVisible } = useScrollReveal(0.05);
  const { content } = useSiteContent();

  return (
    <section id="gallery" className="section-space section-shell section-transition" ref={ref}>
      <div
        className={`mb-16 md:mb-20 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="eyebrow mb-5">Gallery</p>
        <h2 className="font-editorial text-4xl md:text-6xl text-foreground max-w-2xl">
          Work and impact in motion.
        </h2>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
        {content.galleryItems.slice(0, 6).map((img, i) => (
          <div
            key={`${img.src}-${i}`}
            className={`relative overflow-hidden group break-inside-avoid transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <MediaAsset
              src={img.src}
              alt={img.caption}
              className="w-full object-cover min-h-[240px] md:min-h-[280px] grayscale-[35%] dark:brightness-75 group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/45 transition-all duration-500 flex items-end">
              <p className="text-background text-sm p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                {img.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Link to="/gallery" className="inline-block mt-10 text-sm text-accent">
        View full portfolio →
      </Link>
    </section>
  );
}

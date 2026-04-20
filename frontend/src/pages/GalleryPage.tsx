import { Seo } from "@/components/Seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSiteContent } from "@/content/SiteContentContext";
import MediaAsset from "@/components/MediaAsset";

export default function GalleryPage() {
  const { content } = useSiteContent();

  return (
    <>
      <Seo
        title="Gallery"
        path="/gallery"
        description="Photo gallery: projects, events, and impact across FP Conglomerate business units and programs."
      />
      <Navbar />
      <main className="pt-32 pb-28">
        <section className="section-shell">
          <p className="eyebrow mb-5">Portfolio</p>
          <h1 className="font-editorial text-5xl md:text-7xl max-w-4xl">
            A visual record of execution, impact, and growth.
          </h1>
        </section>

        <section className="section-shell py-20 md:py-24">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {content.galleryItems.map((item, index) => (
              <figure
                key={`${item.src}-${index}`}
                className={`break-inside-avoid border border-border overflow-hidden ${
                  index % 3 === 1 ? "lg:translate-y-10" : ""
                }`}
              >
                <MediaAsset
                  src={item.src}
                  alt={item.caption}
                  className="w-full object-cover grayscale-[20%] dark:brightness-75 hover:grayscale-0 transition-all duration-500"
                />
                <figcaption className="px-5 py-4 text-sm text-muted-foreground">{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

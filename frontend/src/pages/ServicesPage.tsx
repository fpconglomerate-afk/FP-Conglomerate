import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSiteContent } from "@/content/SiteContentContext";
import MediaAsset from "@/components/MediaAsset";

export default function ServicesPage() {
  const { content } = useSiteContent();

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-28">
        <section className="section-shell">
          <p className="eyebrow mb-5">Services</p>
          <h1 className="font-editorial text-5xl md:text-7xl max-w-4xl">
            Practical capabilities across high-impact sectors.
          </h1>
          <p className="mt-8 text-lg text-muted-foreground max-w-2xl">
            Our service portfolio combines commercial execution, ministry impact, and
            humanitarian response under one coordinated group structure.
          </p>
        </section>

        <section className="section-shell py-20 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {content.serviceAreas.map((service, index) => (
              <article
                key={service.title}
                className={`bg-background p-8 md:p-10 ${index % 2 === 0 ? "md:translate-y-6" : ""}`}
              >
                <p className="eyebrow mb-4">Service Area</p>
                <h2 className="font-editorial text-3xl mb-4">{service.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{service.summary}</p>
                <MediaAsset
                  src={service.image || content.galleryItems[0]?.src}
                  alt={service.title}
                  className="w-full h-44 object-cover border border-border mt-6 dark:brightness-75"
                />
              </article>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {(content.pageImages?.services ?? []).map((image, index) => (
              <MediaAsset
                key={`${image}-${index}`}
                src={image}
                alt={`Services visual ${index + 1}`}
                className="w-full h-56 md:h-72 object-cover border border-border dark:brightness-75"
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

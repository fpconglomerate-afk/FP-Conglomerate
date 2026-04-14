import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSiteContent } from "@/content/SiteContentContext";
import MediaAsset from "@/components/MediaAsset";

const values = ["Trust", "Excellence", "Integrity", "Service"];

export default function AboutPage() {
  const { content } = useSiteContent();

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-28">
        <section className="section-shell">
          <p className="eyebrow mb-5">About</p>
          <h1 className="font-editorial text-5xl md:text-7xl max-w-4xl">
            A new-generation conglomerate built to restore confidence in service delivery.
          </h1>
          <p className="mt-8 text-lg text-muted-foreground max-w-2xl">
            {content.brand.name} brings together distinct institutions under one
            commitment: honest leadership, dependable execution, and value that
            lasts for customers, communities, and partners.
          </p>
        </section>

        <section className="section-shell py-24 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5 border border-border bg-secondary/30 p-8 md:p-10">
              <p className="eyebrow mb-4">Our Story</p>
              <p className="text-muted-foreground leading-relaxed">
                We launched in 2026 with a clear conviction: trust must be earned
                through results. From faith expression to electronics, media,
                hospitality, and humanitarian programs, every unit in our group is
                built to solve real needs with disciplined follow-through.
              </p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 lg:translate-y-10 border border-border p-8 md:p-10">
              <p className="eyebrow mb-4">Vision and Mission</p>
              <p className="text-foreground font-medium mb-4">
                Vision: To become Africa's rallying point for trusted service,
                durable value, and institution-grade excellence.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Mission: Build and support businesses that match words with action,
                close the trust gap in service delivery, and create lasting social
                and commercial impact.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {(content.pageImages?.about ?? []).map((image, index) => (
              <MediaAsset
                key={`${image}-${index}`}
                src={image}
                alt={`About visual ${index + 1}`}
                className="w-full h-56 md:h-72 object-cover border border-border dark:brightness-75"
              />
            ))}
          </div>
        </section>

        <section className="section-shell pb-28 md:pb-32">
          <p className="eyebrow mb-6">Core Values</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {values.map((value) => (
              <div key={value} className="bg-background p-8 md:p-10">
                <p className="font-editorial text-3xl">{value}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

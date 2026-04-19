import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSiteContent } from "@/content/SiteContentContext";
import MediaAsset from "@/components/MediaAsset";
import RevealOnScroll from "@/components/humanitarian/RevealOnScroll";

const values = ["Trust", "Excellence", "Integrity", "Service"];

export default function AboutPage() {
  const { content } = useSiteContent();
  const L = content.aboutLeadership;

  return (
    <>
      <Seo
        title="About"
        path="/about"
        description="About FP Conglomerate: Abuja-based multi-sector group, founder story, values, and units including MIA humanitarian NGO programs."
      />
      <Navbar />
      <main className="pt-32 pb-28">
        <section className="section-shell">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6 xl:col-span-7">
              <p className="eyebrow mb-5">About</p>
              <h1 className="font-editorial text-5xl md:text-6xl xl:text-7xl max-w-3xl leading-[1.05]">
                A new-generation conglomerate built to restore confidence in service delivery.
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
                {content.brand.name} brings together distinct institutions under one commitment:
                honest leadership, dependable execution, and value that lasts for customers,
                communities, and partners.
              </p>
              <div className="mt-8 border-l-2 border-foreground/20 pl-6">
                <p className="font-editorial text-xl md:text-2xl text-foreground max-w-xl">
                  {L.tagline}
                </p>
                <p className="mt-4 text-sm font-medium text-foreground">{L.name}</p>
                <p className="text-sm text-muted-foreground">{L.title}</p>
              </div>
            </div>
            <div className="lg:col-span-6 xl:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div
                  className="absolute -inset-3 -z-10 rounded-2xl bg-gradient-to-br from-secondary/80 via-secondary/20 to-transparent opacity-90 dark:from-secondary/40 dark:via-secondary/10"
                  aria-hidden
                />
                <MediaAsset
                  src={L.portraitSrc}
                  alt={L.portraitAlt}
                  priority
                  className="aspect-[4/5] w-full rounded-2xl object-cover object-top shadow-2xl ring-1 ring-border/60 dark:brightness-[0.92]"
                />
              </div>
            </div>
          </div>
        </section>

        <RevealOnScroll>
          <section className="section-shell py-24 md:py-28">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-5 border border-border bg-secondary/25 p-8 md:p-10 lg:-rotate-1">
                <p className="eyebrow mb-4">Our story</p>
                <p className="text-muted-foreground leading-relaxed">
                  We launched in 2026 with a clear conviction: trust must be earned through results.
                  From faith expression to electronics, media, hospitality, and humanitarian
                  programs, every unit in our group is built to solve real needs with disciplined
                  follow-through—one standard from the parent group down.
                </p>
              </div>
              <div className="lg:col-span-6 lg:col-start-7 border border-border p-8 md:p-10 lg:translate-y-6 lg:rotate-1">
                <p className="eyebrow mb-4">Vision &amp; mission</p>
                <p className="text-foreground font-medium mb-4">
                  Vision: To become Africa&apos;s rallying point for trusted service, durable value,
                  and institution-grade excellence.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Mission: Build and support businesses that match words with action, close the
                  trust gap in service delivery, and create lasting social and commercial impact.
                </p>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
              {(content.pageImages?.about ?? []).map((image, index) => (
                <MediaAsset
                  key={`${image}-${index}`}
                  src={image}
                  alt={`About visual ${index + 1}`}
                  className="h-52 w-full object-cover border border-border md:h-64 dark:brightness-75"
                />
              ))}
            </div>
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <section className="section-shell pb-20 md:pb-24">
            <p className="eyebrow mb-3">Leadership</p>
            <h2 className="font-editorial text-4xl md:text-5xl max-w-3xl">
              {L.name}
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">{L.title}</p>

            <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="space-y-6 text-muted-foreground leading-relaxed lg:col-span-7">
                {L.bio.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
                <p className="pt-2 text-foreground">
                  <Link
                    to="/contact"
                    className="border-b border-foreground/30 pb-0.5 text-sm font-medium transition hover:border-foreground"
                  >
                    Start a conversation with the group
                  </Link>
                  <span className="text-muted-foreground"> — partnerships, programs, or press.</span>
                </p>
              </div>
              <div className="lg:col-span-5">
                <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  At a glance
                </p>
                <ul className="grid gap-3">
                  {L.highlights.map((item) => (
                    <li
                      key={item}
                      className="border border-border bg-card/40 px-4 py-3 text-sm text-foreground md:px-5 md:py-4"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </RevealOnScroll>

        <section className="section-shell pb-28 md:pb-32">
          <p className="eyebrow mb-6">Core values</p>
          <div className="grid grid-cols-2 gap-px bg-border lg:grid-cols-4">
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

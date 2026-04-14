import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSiteContent } from "@/content/SiteContentContext";
import MediaAsset from "@/components/MediaAsset";

export default function BlogPage() {
  const { ref, isVisible } = useScrollReveal(0.1);
  const { content } = useSiteContent();

  const featured = content.blogPosts[0];
  const rest = content.blogPosts.slice(1);

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-32 section-shell" ref={ref}>
        <div
          className={`mb-20 md:mb-24 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="eyebrow mb-5">Blog and News</p>
          <h1 className="font-editorial text-5xl md:text-7xl text-foreground max-w-4xl">
            Insights and field updates from across the FP group.
          </h1>
        </div>

        <article
          className={`border border-border bg-secondary/30 p-8 md:p-12 lg:p-14 mb-14 md:mb-16 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <MediaAsset
            src={featured.image || content.galleryItems[0]?.src}
            alt={featured.title}
            className="w-full h-[240px] md:h-[360px] object-cover border border-border mb-8 dark:brightness-75"
            priority
          />
          <p className="text-xs text-muted-foreground tracking-wide mb-4">{featured.date}</p>
          <h2 className="font-editorial text-3xl md:text-5xl text-foreground mb-6 leading-tight max-w-4xl">
            {featured.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl leading-relaxed mb-8">{featured.excerpt}</p>
          <span className="text-sm text-accent font-medium">Read more →</span>
        </article>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-0 gap-x-8">
          {rest.map((post, i) => (
            <article
              key={post.title}
                className={`py-9 border-b border-border group transition-all duration-500 lg:col-span-10 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${300 + i * 100}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground tracking-wide mb-2">{post.date}</p>
                  <h3 className="text-2xl font-editorial text-foreground group-hover:text-accent transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 max-w-xl">{post.excerpt}</p>
                </div>
                <MediaAsset
                  src={post.image || content.galleryItems[0]?.src}
                  alt={post.title}
                  className="w-full md:w-40 h-28 object-cover border border-border dark:brightness-75"
                />
                <span className="text-sm text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0">
                  Read →
                </span>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSiteContent } from "@/content/SiteContentContext";
import MediaAsset from "@/components/MediaAsset";
import { useElevateBlogPosts } from "@/hooks/elevateQueries";
import { isPublicCmsEnabled } from "@/lib/elevateApi";
import type { BlogPostPublic } from "@/lib/elevateApiTypes";

export default function BlogPage() {
  const { ref, isVisible } = useScrollReveal(0.1);
  const { content } = useSiteContent();
  const orgCms = isPublicCmsEnabled();
  const { data: apiPosts, isLoading, isError, isSuccess } = useElevateBlogPosts();
  const staticPosts = content.blogPosts;

  /** Public org feed is published-only; if the API omits status, treat as published. */
  const publishedFromApi =
    orgCms && isSuccess && Array.isArray(apiPosts)
      ? apiPosts.filter((p) => {
          const st = (p as BlogPostPublic & { status?: string }).status;
          return st == null || st === "" || st === "published";
        })
      : [];

  const useApi =
    orgCms && isSuccess && !isError && publishedFromApi.length > 0;

  const featured: BlogPostPublic | (typeof staticPosts)[0] = useApi ? publishedFromApi[0] : staticPosts[0];
  const rest: BlogPostPublic[] | typeof staticPosts = useApi ? publishedFromApi.slice(1) : staticPosts.slice(1);
  const showCmsEmptyNote =
    orgCms && isSuccess && !isError && publishedFromApi.length === 0 && staticPosts.length > 0;

  const featuredImage = useApi
    ? (featured as BlogPostPublic).coverUrl || content.galleryItems[0]?.src
    : (featured as (typeof staticPosts)[0]).image || content.galleryItems[0]?.src;
  const featuredTitle = (featured as { title: string }).title;
  const featuredExcerpt = (featured as { excerpt?: string }).excerpt ?? "";
  const featuredDate = useApi
    ? formatDate((featured as BlogPostPublic).publishedAt ?? (featured as BlogPostPublic).createdAt)
    : (featured as (typeof staticPosts)[0]).date;

  return (
    <>
      <Seo
        title="Blog"
        path="/blog"
        description="News, field updates, and longer reads from FP Conglomerate: Abuja-based multi-sector group and MIA humanitarian programs."
      />
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
          {orgCms && isLoading && (
            <p className="mt-4 text-sm text-muted-foreground">Loading latest posts…</p>
          )}
          {showCmsEmptyNote ? (
            <p className="mt-4 text-sm text-muted-foreground max-w-2xl">
              No published posts from your CMS yet (drafts stay private). Showing the site’s default stories until you
              publish at least one post in the admin.
            </p>
          ) : null}
          {orgCms && isError ? (
            <p className="mt-4 text-sm text-muted-foreground max-w-2xl">
              Could not load posts from the API. Showing default stories. Check your connection and{" "}
              <code className="text-xs bg-muted px-1 rounded">VITE_PUBLIC_ORGANIZATION_SLUG</code> / API base in the build.
            </p>
          ) : null}
        </div>

        <article
          className={`border border-border bg-secondary/30 p-8 md:p-12 lg:p-14 mb-14 md:mb-16 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <MediaAsset
            src={featuredImage || ""}
            alt={featuredTitle}
            className="w-full h-[240px] md:h-[360px] object-cover border border-border mb-8 dark:brightness-75"
            priority
          />
          <p className="text-xs text-muted-foreground tracking-wide mb-4">{featuredDate}</p>
          <h2 className="font-editorial text-3xl md:text-5xl text-foreground mb-6 leading-tight max-w-4xl">{featuredTitle}</h2>
          <p className="text-muted-foreground max-w-2xl leading-relaxed mb-8">{featuredExcerpt}</p>
          {useApi && (featured as BlogPostPublic).slug ? (
            <Link
              to={`/blog/${encodeURIComponent((featured as BlogPostPublic).slug)}`}
              className="text-sm text-accent font-medium hover:underline"
            >
              Read more →
            </Link>
          ) : (
            <span className="text-sm text-accent font-medium">Read more →</span>
          )}
        </article>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-0 gap-x-8">
          {rest.map((post, i) => {
            const isApiPost = useApi;
            const title = (post as { title: string }).title;
            const excerpt = (post as { excerpt?: string }).excerpt ?? "";
            const date = isApiPost
              ? formatDate((post as BlogPostPublic).publishedAt ?? (post as BlogPostPublic).createdAt)
              : (post as (typeof staticPosts)[0]).date;
            const img = isApiPost
              ? (post as BlogPostPublic).coverUrl || content.galleryItems[0]?.src
              : (post as (typeof staticPosts)[0]).image || content.galleryItems[0]?.src;
            const slug = isApiPost ? (post as BlogPostPublic).slug : null;

            return (
              <article
                key={isApiPost ? (post as BlogPostPublic).id ?? title : title}
                className={`py-9 border-b border-border group transition-all duration-500 lg:col-span-10 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${300 + i * 100}ms` }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground tracking-wide mb-2">{date}</p>
                    {slug ? (
                      <Link to={`/blog/${encodeURIComponent(slug)}`}>
                        <h3 className="text-2xl font-editorial text-foreground group-hover:text-accent transition-colors duration-300">
                          {title}
                        </h3>
                      </Link>
                    ) : (
                      <h3 className="text-2xl font-editorial text-foreground group-hover:text-accent transition-colors duration-300">
                        {title}
                      </h3>
                    )}
                    <p className="text-sm text-muted-foreground mt-2 max-w-xl">{excerpt}</p>
                  </div>
                  <MediaAsset
                    src={img || ""}
                    alt={title}
                    className="w-full md:w-40 h-28 object-cover border border-border dark:brightness-75"
                  />
                  {slug ? (
                    <Link
                      to={`/blog/${encodeURIComponent(slug)}`}
                      className="text-sm text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0"
                    >
                      Read →
                    </Link>
                  ) : (
                    <span className="text-sm text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0">
                      Read →
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}

function formatDate(iso: string | null | undefined): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString();
  } catch {
    return iso;
  }
}

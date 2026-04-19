import { Link, useParams } from "react-router-dom";
import { Seo, SEO_DEFAULT_DESCRIPTION, SITE_NAME } from "@/components/Seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useElevateBlogPost } from "@/hooks/elevateQueries";
import { isPublicCmsEnabled } from "@/lib/elevateApi";
import type { BlogPostPublic } from "@/lib/elevateApiTypes";
import MediaAsset from "@/components/MediaAsset";
import { Button } from "@/components/ui/button";

function truncateMeta(s: string, max = 160): string {
  const t = s.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

function blogPostDescription(post: BlogPostPublic): string {
  if (post.excerpt?.trim()) return truncateMeta(post.excerpt);
  if (post.body?.trim()) return truncateMeta(post.body);
  return SEO_DEFAULT_DESCRIPTION;
}

/** Resolve relative asset paths against `VITE_SITE_URL` for canonicals and schema. */
function absoluteSiteUrl(pathOrUrl: string): string | undefined {
  const base = import.meta.env.VITE_SITE_URL?.replace(/\/$/, "");
  if (!pathOrUrl) return undefined;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  if (!base) return undefined;
  const p = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${base}${p}`;
}

function blogPostingJsonLd(post: BlogPostPublic, path: string): Record<string, unknown> {
  const canonical = absoluteSiteUrl(path);
  const cover = post.coverUrl?.trim();
  const imageUrl = cover ? absoluteSiteUrl(cover) ?? cover : undefined;
  const logoUrl = absoluteSiteUrl("/logos/bsc-logo.png");
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.publishedAt ?? post.createdAt,
    ...(imageUrl ? { image: [imageUrl] } : {}),
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      ...(logoUrl ? { logo: { "@type": "ImageObject", url: logoUrl } } : {}),
    },
    ...(canonical ? { mainEntityOfPage: { "@type": "WebPage", "@id": canonical } } : {}),
  };
}

export default function BlogPostPage() {
  const { postSlug } = useParams<{ postSlug: string }>();
  const enabled = Boolean(postSlug) && isPublicCmsEnabled();
  const { data: post, isLoading, isError } = useElevateBlogPost(enabled ? postSlug : undefined);
  const path = postSlug ? `/blog/${postSlug}` : "/blog";

  if (!enabled) {
    return (
      <>
        <Seo
          title="Blog"
          path="/blog"
          description="Blog posts load on the live site when the public CMS is configured. Use the blog index for default stories."
          noindex
        />
        <Navbar />
        <main className="section-shell pt-32 pb-24">
          <p className="text-muted-foreground">
            Online stories aren’t available in preview here. Open the live site or ask your team to finish connecting the
            blog.
          </p>
          <Button asChild variant="outline" className="mt-4">
            <Link to="/blog">Back to blog</Link>
          </Button>
        </main>
        <Footer />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <Seo title="Blog" path={path} description={SEO_DEFAULT_DESCRIPTION} />
        <Navbar />
        <main className="section-shell pt-32 pb-24 text-muted-foreground">Loading…</main>
        <Footer />
      </>
    );
  }

  if (isError || !post) {
    return (
      <>
        <Seo
          title="Blog post"
          path={path}
          description="This post could not be loaded. Return to the blog index."
          noindex
        />
        <Navbar />
        <main className="section-shell pt-32 pb-24">
          <p className="text-destructive mb-4">Could not load this post.</p>
          <Button asChild variant="outline">
            <Link to="/blog">Back to blog</Link>
          </Button>
        </main>
        <Footer />
      </>
    );
  }

  const dateLabel = post.publishedAt ?? post.createdAt ?? "";
  const img = post.coverUrl ?? "";
  const postPath = `/blog/${post.slug}`;
  const description = blogPostDescription(post);
  const ogImage = img ? absoluteSiteUrl(img) ?? img : undefined;

  return (
    <>
      <Seo
        title={post.title}
        path={postPath}
        description={description}
        ogImage={ogImage}
        ogType="article"
        jsonLd={blogPostingJsonLd(post, postPath)}
      />
      <Navbar />
      <main className="pt-32 pb-32 section-shell">
        <p className="eyebrow mb-4">
          <Link to="/blog" className="text-muted-foreground hover:text-foreground">
            Blog
          </Link>
        </p>
        {img ? (
          <MediaAsset
            src={img}
            alt={post.title}
            className="w-full h-[240px] md:h-[420px] object-cover border border-border mb-10 dark:brightness-75"
            priority
          />
        ) : null}
        {dateLabel ? (
          <p className="text-xs text-muted-foreground tracking-wide mb-4">{new Date(dateLabel).toLocaleDateString()}</p>
        ) : null}
        <h1 className="font-editorial text-4xl md:text-6xl text-foreground mb-8 max-w-4xl leading-tight">{post.title}</h1>
        {post.excerpt ? <p className="text-lg text-muted-foreground max-w-3xl mb-10">{post.excerpt}</p> : null}
        {post.body ? (
          <div className="prose prose-neutral dark:prose-invert max-w-3xl whitespace-pre-wrap text-foreground leading-relaxed">
            {post.body}
          </div>
        ) : (
          <p className="text-muted-foreground max-w-3xl">No body content.</p>
        )}
      </main>
      <Footer />
    </>
  );
}

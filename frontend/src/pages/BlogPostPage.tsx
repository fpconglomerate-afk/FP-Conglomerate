import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useElevateBlogPost } from "@/hooks/elevateQueries";
import { isPublicCmsEnabled } from "@/lib/elevateApi";
import MediaAsset from "@/components/MediaAsset";
import { Button } from "@/components/ui/button";

export default function BlogPostPage() {
  const { postSlug } = useParams<{ postSlug: string }>();
  const enabled = Boolean(postSlug) && isPublicCmsEnabled();
  const { data: post, isLoading, isError } = useElevateBlogPost(enabled ? postSlug : undefined);

  if (!enabled) {
    return (
      <>
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
        <Navbar />
        <main className="section-shell pt-32 pb-24 text-muted-foreground">Loading…</main>
        <Footer />
      </>
    );
  }

  if (isError || !post) {
    return (
      <>
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

  return (
    <>
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

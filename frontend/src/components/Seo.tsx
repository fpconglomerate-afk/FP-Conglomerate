import { Helmet } from "react-helmet-async";

export const SITE_NAME = "FP Conglomerate";

export const SEO_DEFAULT_DESCRIPTION =
  "FP Conglomerate is an Abuja-based multi-sector African group: Ordained Believers Army (OBA), Anate Grand Empire Solutions (AGE), Boys Sterling Company Limited (BSC), and Mogadishu Initiative Response (MIA) humanitarian NGO programs.";

function canonicalFromPath(path: string): string | undefined {
  const base = import.meta.env.VITE_SITE_URL?.replace(/\/$/, "");
  if (!base) return undefined;
  if (!path || path === "/") return `${base}/`;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

type SeoProps = {
  title: string;
  description?: string;
  path: string;
  noindex?: boolean;
  /** Comma-separated keywords for meta keywords (use sparingly; primary SEO is title + description). */
  keywords?: string;
  /** Absolute image URL for Open Graph / Twitter when a page has a primary image (e.g. blog cover). */
  ogImage?: string;
  ogType?: "website" | "article";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

export function Seo({
  title,
  description = SEO_DEFAULT_DESCRIPTION,
  path,
  noindex: noindexProp,
  keywords,
  ogImage,
  ogType = "website",
  jsonLd,
}: SeoProps) {
  const forceNoIndex = import.meta.env.VITE_NOINDEX === "true";
  const noindex = forceNoIndex || Boolean(noindexProp);
  const canonical = canonicalFromPath(path);
  const fullTitle = `${title} | ${SITE_NAME}`;
  const ldList = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      {canonical ? <link rel="canonical" href={canonical} /> : null}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {canonical ? <meta property="og:url" content={canonical} /> : null}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={ogType} />
      {ogImage ? <meta property="og:image" content={ogImage} /> : null}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage ? <meta name="twitter:image" content={ogImage} /> : null}
      {noindex ? <meta name="robots" content="noindex, follow" /> : null}
      {ldList.map((obj, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(obj)}
        </script>
      ))}
    </Helmet>
  );
}

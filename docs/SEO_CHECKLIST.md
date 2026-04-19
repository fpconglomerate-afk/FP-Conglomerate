# SEO checklist (marketing site + blog)

Use this as a **repeatable** process for the FP Conglomerate site and CMS-driven blog posts. Nothing here guarantees rankings; the goal is **discoverability, clarity, and sustainable technical signals**.

**Deployment:** Set `VITE_SITE_URL` to your production origin (no trailing slash) in hosting env and rebuild. See [`DEPLOYMENT.md`](DEPLOYMENT.md). Without it, XML sitemap emission and canonical/OG URLs from the build may be incomplete.

---

## A. On-page (site + important URLs)

- [ ] **Unique `<title>`** per route (~50–60 characters target). Pattern: `Page | FP Conglomerate` (implemented via `Seo` + `react-helmet-async`).
- [ ] **Unique meta description** per important URL (~150–160 characters). Avoid duplicate boilerplate across many pages.
- [ ] **One clear H1** per page; logical **H2/H3** hierarchy for scanability.
- [ ] **Internal links** to key hubs: `/business-units`, `/contact`, pillar unit pages, `/blog` where relevant.
- [ ] **Alt text** on meaningful images (heroes, gallery, blog covers). Decorative images can use empty alt or `aria-hidden` patterns already in components.
- [ ] Avoid **thin or duplicate** copy blocks repeated site-wide without variation.

---

## B. Content quality (helpful content / trust)

Reference: [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) (Google Search Central).

- [ ] State clearly **who** you are (group, units, Abuja interim office where relevant).
- [ ] Describe **what** each unit does using **on-site facts**; avoid unverifiable superlatives.
- [ ] Explain **why** it matters to the reader (partners, clients, applicants, donors).
- [ ] For blog posts: add a real **excerpt** in the CMS when possible — it doubles as the meta description baseline.
- [ ] When a post is **materially updated**, refresh body/excerpt and consider updating visible dates in copy if you show them.

---

## C. Technical

- [ ] **HTTPS** on the production host.
- [ ] **`robots.txt`** + **XML sitemap**: emitted on production build when `VITE_SITE_URL` is set (`frontend` Vite `fp-seo` plugin).
- [ ] **Canonical URLs**: per-route via `Seo`; homepage fallback in `index.html` when `VITE_SITE_URL` is present at build.
- [ ] **Stable URLs**: avoid unnecessary slug changes; use redirects if URLs must move.
- [ ] Fix **404**s and broken internal links; monitor in **Google Search Console**.
- [ ] Submit the sitemap in **Google Search Console**: `https://<your-domain>/sitemap.xml` (manual step after deploy).

---

## D. Performance / Core Web Vitals

- [ ] Prioritize **LCP**: hero images with appropriate dimensions; `priority` on above-the-fold media where used.
- [ ] **Lazy-load** below-the-fold images and non-critical embeds.
- [ ] Keep **JS payload** reasonable; verify field data in Search Console / PageSpeed when available (lab scores are hints; field data matters more for real users).

---

## E. Blog-specific (CMS)

- [ ] **Readable slug** (short, descriptive; set in CMS).
- [ ] **Excerpt** as primary meta description source; body truncated only as fallback.
- [ ] **Cover image** + descriptive alt (title is used as alt fallback in the template).
- [ ] **Internal links** to related units or contact where natural.
- [ ] **BlogPosting** JSON-LD is injected on post pages when the public CMS loads a post (`BlogPostPage`).

---

## F. Ongoing

- [ ] **Search Console**: monitor coverage, queries, and page experience; fix regressions.
- [ ] Periodic **content refreshes** on pillar pages (About, units, humanitarian) when facts change.
- [ ] **Ranking is not guaranteed**; consistency and accuracy beat short-term tricks.

---

## Quick verification after a deploy

1. View **page source** or DevTools → **Elements** → `<head>` on `/`, `/contact`, `/blog`, and one `/blog/:slug` with a live post: check `title`, `meta name="description"`, `link rel="canonical"`, `og:*`.
2. Open `https://<your-domain>/sitemap.xml` and `https://<your-domain>/robots.txt`.
3. Optional: [Rich Results Test](https://search.google.com/test/rich-results) for homepage Organization JSON-LD and a blog URL for BlogPosting.

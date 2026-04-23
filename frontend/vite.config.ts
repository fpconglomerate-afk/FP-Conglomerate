import { defineConfig, type Plugin, type PluginContext } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function siteOrigin(): string {
  const fromEnv = process.env.VITE_SITE_URL?.trim().replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, "")}`;
  return "";
}

const SITEMAP_PATHS: string[] = (() => {
  const staticPaths = [
    "/",
    "/about",
    "/business-units",
    "/idp-camps",
    "/services",
    "/gallery",
    "/careers",
    "/blog",
    "/portfolio",
    "/contact",
    "/faq",
  ];
  const units: { id: string; subs: string[] }[] = [
    { id: "fp-parent", subs: ["governance", "strategy"] },
    { id: "ordained-believers", subs: ["ministry", "outreach"] },
    { id: "amgi", subs: ["product-lines", "quality-assurance"] },
    { id: "boys-sterling", subs: ["gwarinpa-mall", "real-estate", "media-entertainment"] },
    { id: "mogadishu-initiative", subs: ["humanitarian-programs", "idp-camps", "social-justice"] },
  ];
  const dynamic: string[] = [];
  for (const u of units) {
    dynamic.push(`/business-units/${u.id}`);
    for (const s of u.subs) {
      dynamic.push(`/business-units/${u.id}/${s}`);
    }
  }
  // Keep in sync with `blogPosts[].slug` in `src/content/brand.ts` when adding posts.
  const blogPaths = [
    "/blog/abuja-multi-sector-group-fp-conglomerate-seo-trust",
    "/blog/humanitarian-programs-nigeria-mia-field-transparency",
    "/blog/gwarinpa-mall-abuja-commercial-project-site-documentation",
    "/blog/anate-grand-empire-solutions-age-services-nigeria",
    "/blog/ordained-believers-army-oba-faith-community-nigeria",
  ];
  return [...staticPaths, ...dynamic, ...blogPaths];
})();

function seoPlugin(): Plugin {
  const orgJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "FP Conglomerate",
        description:
          "Multi-sector African business group spanning faith, commerce, construction, real estate, humanitarian programs, and appliances.",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Plot 78/79, Dagiri Layout",
          addressLocality: "Gwagwalada",
          addressRegion: "Abuja",
          addressCountry: "NG",
        },
        areaServed: [{ "@type": "Country", name: "Nigeria" }, { "@type": "Place", name: "Africa" }],
        subOrganization: [
          { "@type": "Organization", name: "Ordained Believers Army (OBA)" },
          { "@type": "Organization", name: "Anate Grand Empire Solutions (AGE)" },
          { "@type": "Organization", name: "Boys Sterling Company Limited (BSC)" },
          {
            "@type": "Organization",
            name: "Mogadishu Initiative Response (MIA)",
            description:
              "Humanitarian and NGO-oriented programs: field response, IDP support, and social impact aligned with FP Conglomerate standards.",
          },
        ],
      },
      {
        "@type": "WebSite",
        name: "FP Conglomerate",
        description:
          "Official site for FP Conglomerate: business units, services, careers, and contact.",
        publisher: { "@type": "Organization", name: "FP Conglomerate" },
        inLanguage: "en",
      },
    ],
  };

  return {
    name: "fp-seo",
    transformIndexHtml(html) {
      const site = siteOrigin();
      const doc = structuredClone(orgJson) as typeof orgJson;
      const graph = doc["@graph"] as Record<string, unknown>[];
      if (site) {
        (graph[0] as Record<string, unknown>).url = site;
        (graph[0] as Record<string, unknown>).logo = `${site}/logos/bsc-logo.png`;
        (graph[1] as Record<string, unknown>).url = site;
      }
      const jsonLd = JSON.stringify(doc);
      const extra: string[] = [];
      extra.push(
        `<script type="application/ld+json">${jsonLd}</script>`,
      );
      if (site) {
        extra.push(`<link rel="canonical" href="${site}/" />`);
        extra.push(`<meta property="og:url" content="${site}/" />`);
        extra.push(`<meta property="og:site_name" content="FP Conglomerate" />`);
      }
      return html.replace("</head>", `${extra.join("\n    ")}\n  </head>`);
    },
       generateBundle(this: PluginContext) {
      const site = siteOrigin();
      if (!site) {
        return;
      }
      const urls = SITEMAP_PATHS.map((p) => {
        const loc = p === "/" ? `${site}/` : `${site}${p}`;
        const priority = p === "/" ? "1.0" : p.startsWith("/business-units/") ? "0.7" : "0.85";
        return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
      }).join("\n");
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: sitemap,
      });
      const robotsPublic = path.resolve(__dirname, "public", "robots.txt");
      const robotsBase = readFileSync(robotsPublic, "utf8").trimEnd();
      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: `${robotsBase}\n\nSitemap: ${site}/sitemap.xml\n`,
      });
      const llmsPublic = path.resolve(__dirname, "public", "llms.txt");
      try {
        const llms = readFileSync(llmsPublic, "utf8");
        const llmsOut = llms.replace(
          /^# FP Conglomerate/m,
          `# FP Conglomerate\n\nCanonical site: ${site}/`,
        );
        this.emitFile({
          type: "asset",
          fileName: "llms.txt",
          source: llmsOut,
        });
      } catch {
        /* optional */
      }
    },
  };
}

/** Dev-only proxy target when using VITE_PUBLIC_API_RELATIVE=true (same-origin /v1 → Render, avoids CORS in local dev). */
const elevateDevProxyTarget =
  process.env.VITE_ELEVATE_DEV_PROXY_URL?.trim().replace(/\/$/, "") ||
  "https://elevate-backend-vpo3.onrender.com";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    proxy: {
      "/v1": {
        target: elevateDevProxyTarget,
        changeOrigin: true,
        secure: true,
      },
    },
  },
  plugins: [react(), seoPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  build: {
    target: "es2022",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react-dom/") || id.includes("node_modules/react/")) {
            return "react-vendor";
          }
          if (id.includes("node_modules/react-router")) {
            return "router";
          }
          if (id.includes("node_modules/@radix-ui")) {
            return "radix";
          }
          if (id.includes("node_modules/lucide-react")) {
            return "icons";
          }
          if (id.includes("node_modules/recharts")) {
            return "recharts";
          }
          if (id.includes("node_modules/date-fns")) {
            return "date-fns";
          }
        },
      },
    },
  },
}));

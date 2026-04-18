import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendSrc = path.resolve(__dirname, "../frontend/src");
const adminPackageJson = path.join(__dirname, "package.json");
const requireFromAdmin = createRequire(adminPackageJson);

/** Dev-only: proxy /v1 → Elevate API so the browser uses same-origin http://localhost:5174/v1 (no CORS to Render). */
const elevateDevProxyTarget =
  process.env.VITE_ELEVATE_DEV_PROXY_URL?.trim().replace(/\/$/, "") ||
  "https://elevate-backend-vpo3.onrender.com";

/** Files under ../frontend/src resolve bare imports from admin/node_modules (admin is the build root). */
function resolveFrontendBareImportsFromAdmin(): Plugin {
  return {
    name: "resolve-frontend-bare-imports-from-admin",
    enforce: "pre",
    resolveId(source, importer) {
      if (!importer) return null;
      const normImporter = importer.replace(/\\/g, "/");
      if (!normImporter.includes("/frontend/src/")) return null;
      if (source.startsWith(".") || source.startsWith("/") || source.startsWith("\0")) return null;
      if (source.startsWith("@/")) return null;
      try {
        return requireFromAdmin.resolve(source);
      } catch {
        return null;
      }
    },
  };
}

export default defineConfig({
  root: __dirname,
  publicDir: path.resolve(__dirname, "../frontend/public"),
  server: {
    host: "::",
    port: 5174,
    hmr: { overlay: false },
    proxy: {
      "/v1": {
        target: elevateDevProxyTarget,
        changeOrigin: true,
        secure: true,
      },
    },
  },
  plugins: [resolveFrontendBareImportsFromAdmin(), react()],
  resolve: {
    alias: {
      "@": frontendSrc,
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
    outDir: "dist",
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
        },
      },
    },
  },
});

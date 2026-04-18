# Deploy FP Conglomerate + Elevate API

This repo contains the **marketing site** (`frontend/`) and **staff + local CMS admin** (`admin/`). The **Elevate Central API** (Node/Fastify + Postgres) is a **separate service** — the `elevate-backend/` folder in this workspace is **reference only**; deploy the API from its own repository or copy of that project.

---

## What you need from where

### A. Values that belong **only on the API server** (never in this repo)

These are **not** `VITE_*` variables. You set them in Render/Railway/Fly/VPS **where the Elevate API runs**:

| Secret / variable | Where to get it |
|-------------------|-----------------|
| `DATABASE_URL` | Your Postgres provider (Neon, Supabase, Render Postgres, etc.) — connection string. |
| `JWT_SECRET` | Generate a long random string (≥32 chars); store only on the API host. |
| `SITE_KEY_PEPPER` | Generate a random string (≥16 chars); used to hash publishable site keys server-side. |
| `SUPER_ADMIN_JWT_SECRET` | Separate long random string (≥32 chars) for platform admin JWTs. |
| `CORS_ORIGINS` | **You choose** a comma-separated list of **exact** browser origins for this website and admin, e.g. `https://www.yourdomain.com,https://admin.yourdomain.com`. For local dev include `http://localhost:8080,http://localhost:5174`. |
| Cloudinary / Resend keys | Only if you use those integrations — from Cloudinary/Resend dashboards. |

After the API is migrated and seeded:

| Value | Where to get it |
|-------|-----------------|
| **API public URL** | Your API deployment URL, e.g. `https://api.yourdomain.com` — **no trailing slash**. |
| **Publishable site key** | Output of `npm run seed` on the API, or from your operator / super-admin when a site is created. This is the **raw** key the browser sends as `X-Site-Key`. |
| **Organization slug** | From seed or org record — used on staff login with email/password. |
| **Staff email/password** | From seed or created users in the API. |

### B. Values for **this repo** (Vite — safe to expose in the browser)

Set these in **`frontend/.env`** locally and in **hosting “Environment variables”** for production builds:

| Variable | Required | Meaning |
|----------|----------|---------|
| `VITE_PUBLIC_API_BASE_URL` | Optional | **Leave empty** for production to use same-origin `/v1` (hosting proxies to Render — see below). Set to full API URL only if you want **direct** browser calls and have fixed **CORS** on the API for this origin. |
| `VITE_PUBLIC_API_RELATIVE` | Optional | Only needed to **disable** relative mode: `false` if you omit the base URL intentionally (rare). Default when base URL is empty: **relative** `/v1` on this host. |
| `VITE_ELEVATE_DEV_PROXY_URL` | Optional | Local dev: Vite proxies `/v1` to this URL when `VITE_PUBLIC_API_BASE_URL` is empty (defaults in `vite.config.ts`). |
| `VITE_PUBLIC_SITE_KEY` | Yes (marketing) | Publishable site key from seed/ops. |
| `VITE_PUBLIC_LEAD_INDUSTRY_VERTICAL` | Recommended | Must be one of: `construction`, `real_estate`, `ngo`, `hospital`, `marketing`, `other`. |
| `VITE_PUBLIC_LEAD_SOURCE_SYSTEM` | Optional | Default `marketing-site` if unset. |
| `VITE_PUBLIC_LEAD_FORM_ID` | Optional | Default `contact-main` if unset. |
| `VITE_SITE_URL` | Recommended in prod | Canonical marketing URL for sitemap/SEO (no trailing slash). |
| `VITE_PUBLIC_ORGANIZATION_SLUG` | Optional | **Hybrid CMS:** org slug for public reads (`GET /v1/public/org/:slug/...`). No `X-Site-Key` on these requests. When unset or on error, blog/careers/portfolio use local [`SiteContent`](../frontend/src/content/SiteContentContext.tsx) data. |

For **`admin/`**, set at least:

| Variable | Required | Meaning |
|----------|----------|---------|
| `VITE_PUBLIC_API_BASE_URL` | **Recommended: empty** | Empty = browser calls **`/v1` on the admin host only** (Vercel [`admin/vercel.json`](../admin/vercel.json) proxies to Render). **No CORS** to the API. Set a full API URL only if you intentionally use direct cross-origin calls **and** `CORS_ORIGINS` on the API lists this admin origin. |
| `VITE_PUBLIC_ORGANIZATION_SLUG` | Optional | Default org slug on the staff login form (same value as marketing if you use hybrid CMS). |
| `VITE_PUBLIC_SITE_URL` | Optional | Public site URL for “back” navigation. |

**Vite bakes `VITE_*` at build time** — change hosting env and **redeploy** after updates.

---

## API-side checklist (CORS + optional origin allowlist)

1. **`CORS_ORIGINS`** on the API must include every origin that will call the API **directly** (full URL in `VITE_PUBLIC_API_BASE_URL`):
   - Production marketing: `https://www.yourdomain.com`
   - Production admin: `https://admin.yourdomain.com`
2. If the API **site** row has **`allowed_origins`** set, the browser **`Origin`** for `POST /v1/public/leads` must match. Easiest first-time setup: leave allowed origins empty for the site, or set them to the same HTTPS marketing origin.

### Marketing site: avoid CORS (recommended)

If the contact form shows **“No response from the API”** on **https://www.fpconglomerate.com** (or any host), the usual cause is **cross-origin** requests to Render without **`CORS_ORIGINS`** including your exact site origin.

**Fix A — Same-origin proxy (no CORS on Render for the marketing site)**

1. In **Vercel** (or Netlify) env for the marketing project: **remove** `VITE_PUBLIC_API_BASE_URL` if it is set (empty = use `/v1` on your own domain).
2. Keep **`VITE_PUBLIC_SITE_KEY`** set.
3. Ensure rewrites exist: [`frontend/vercel.json`](../frontend/vercel.json) (Vercel) and [`frontend/public/_redirects`](../frontend/public/_redirects) (Netlify) proxy `/v1/*` to your Render API. Update the Render hostname in both files if it changes.
4. Redeploy. The built app will call **`https://www.fpconglomerate.com/v1/...`**, not Render directly.

**Fix B — Direct API URL**

Keep `VITE_PUBLIC_API_BASE_URL=https://elevate-backend-vpo3.onrender.com` and on **Render** set **`CORS_ORIGINS`** to include **`https://www.fpconglomerate.com`** (and preview URLs if needed). No trailing slashes; exact match to the browser `Origin`.

**Admin (recommended):** leave **`VITE_PUBLIC_API_BASE_URL` empty** so the built app uses same-origin **`/v1`** on your admin domain; [`admin/vercel.json`](../admin/vercel.json) already proxies `/v1/*` to Render. You do **not** need CORS from the browser to Render for admin in that setup. Only use a **direct** API URL if you accept maintaining **CORS** for every admin origin (local dev, previews, production).

---

## Local development

1. Run the **Elevate API** (from your API project) with Postgres and env configured; default listen is often port **3000**.
2. Copy `frontend/.env.example` → `frontend/.env` and `admin/.env.example` → `admin/.env`.
   - **Marketing:** set `VITE_PUBLIC_SITE_KEY` and either point `VITE_PUBLIC_API_BASE_URL` at `http://localhost:3000` **or** leave it empty and rely on the [frontend Vite proxy](../frontend/vite.config.ts) for `/v1`.
   - **Admin (recommended):** leave **`VITE_PUBLIC_API_BASE_URL` empty** so requests go to `http://localhost:5174/v1/...` and the [admin Vite proxy](../admin/vite.config.ts) forwards to the API (default: Render URL, override with `VITE_ELEVATE_DEV_PROXY_URL`). This avoids CORS issues when testing against a remote API. To hit a **local** API instead, set `VITE_ELEVATE_DEV_PROXY_URL=http://localhost:3000`.
3. `npm install --prefix frontend && npm install --prefix admin`
4. `npm run dev` (marketing) and `npm run dev --prefix admin` (admin).

Verify: `GET http://localhost:3000/v1/health` (or your proxy target) returns JSON with `"status":"ok"`.

---

## Production: Vercel (two projects)

Create **two** Vercel projects from the same Git repo with different **Root Directory** and env vars.

### Marketing (`frontend/`)

| Setting | Value |
|---------|--------|
| Root Directory | `frontend` |
| Build Command | `npm run build` |
| Output | `dist` |
| Environment Variables | All `VITE_*` from `frontend/.env.example` |

[`frontend/vercel.json`](../frontend/vercel.json) already configures SPA fallback and caching.

### Admin (`admin/`)

| Setting | Value |
|---------|--------|
| Root Directory | `admin` |
| Build Command | `npm run build` |
| Output | `dist` |
| Environment Variables | Prefer **empty** `VITE_PUBLIC_API_BASE_URL` (same-origin `/v1` proxy). Optional `VITE_PUBLIC_ORGANIZATION_SLUG`, `VITE_PUBLIC_SITE_URL` |

[`admin/vercel.json`](../admin/vercel.json) configures SPA rewrites so client routes work (`/login`, `/leads`, `/settings`, `/cms/*`, `/content`, etc.).

---

## Production: Netlify

Same idea: two sites, **Base directory** `frontend` or `admin`, build `npm run build`, publish `dist`, set the same `VITE_*` variables per site.

---

## Smoke tests after deploy

1. Open marketing **Contact** page → submit → DevTools Network: `POST …/v1/public/leads` → **201**.
2. With `VITE_PUBLIC_ORGANIZATION_SLUG` set, open **Blog**, **Careers**, or **Portfolio** → `GET …/v1/public/org/<slug>/…` → **200** (or fallback content if the API is unavailable).
3. Open admin **/login** → sign in → **/leads** → `GET …/v1/leads` → **200** with `items`; **/settings** and **/cms/*** should load with staff JWT.
4. **Delete inquiry:** `DELETE …/v1/leads/<uuid>` → **204** (or **200**). If you see **404**, the API build on Render likely does **not** register `DELETE /v1/leads/:id` yet — implement that route in the Elevate API (org-scoped, same auth as `GET /v1/leads`), deploy, and try again. A 404 can also mean the lead id is wrong or the row was already removed.

If you see **CORS** errors, fix **`CORS_ORIGINS`** on the API. If **403** on leads POST, check **site `allowed_origins`** vs your marketing **Origin**.

---

## Admin CMS vs Elevate API (field alignment)

Staff JWT (`POST /v1/auth/login`) and `org_admin` are required for destructive CMS writes. Paths use `/v1/admin/...`.

| Area | Elevate endpoints | Notes |
|------|-------------------|--------|
| **Blog** | `GET/POST /v1/admin/blog-posts`, `PATCH/DELETE …/:id` | Body must be **non-empty** (min 1 character). Send `publishedAt` when status is `published` (ISO string); use `null` when draft. |
| **Hiring** | `GET/POST /v1/admin/hiring-positions`, `PATCH/DELETE …/:id` | Supported: `title`, `description` (required), `location`, `applicationUrl` (optional URL), `isPublished`, `sortOrder`. No `type` or hero image field in the API schema. |
| **Portfolio** | `GET/POST /v1/admin/portfolio-projects`, `PATCH/DELETE …/:id` | Supported: `title`, `summary`, `body`, `imageMediaAssetId`, `isPublished`, `sortOrder`. **No per-project slug** in the API — public listing is by org. |
| **Content dashboard** (`/content`) | — | Brand/hero/units/gallery JSON is **browser-only** (`SiteContentContext`), not persisted by Elevate. |

Public marketing reads use `GET /v1/public/org/:slug/...` when `VITE_PUBLIC_ORGANIZATION_SLUG` and API base are configured.

---

## Reference code

The `elevate-backend/` folder in this workspace documents the API behavior (routes, enums, env). Do not deploy production secrets from this monorepo; deploy the API from its dedicated repo/host.

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
| `VITE_PUBLIC_API_BASE_URL` | Yes | Same API URL as in section A (HTTPS in production). |
| `VITE_PUBLIC_SITE_KEY` | Yes (marketing) | Publishable site key from seed/ops. |
| `VITE_PUBLIC_LEAD_INDUSTRY_VERTICAL` | Recommended | Must be one of: `construction`, `real_estate`, `ngo`, `hospital`, `marketing`, `other`. |
| `VITE_PUBLIC_LEAD_SOURCE_SYSTEM` | Optional | Default `marketing-site` if unset. |
| `VITE_PUBLIC_LEAD_FORM_ID` | Optional | Default `contact-main` if unset. |
| `VITE_SITE_URL` | Recommended in prod | Canonical marketing URL for sitemap/SEO (no trailing slash). |

For **`admin/`**, set at least:

| Variable | Required | Meaning |
|----------|----------|---------|
| `VITE_PUBLIC_API_BASE_URL` | Yes | Same as marketing. |
| `VITE_PUBLIC_ORGANIZATION_SLUG` | Optional | Default org slug on the login form. |
| `VITE_PUBLIC_SITE_URL` | Optional | Public site URL for “back” navigation. |

**Vite bakes `VITE_*` at build time** — change hosting env and **redeploy** after updates.

---

## API-side checklist (CORS + optional origin allowlist)

1. **`CORS_ORIGINS`** on the API must include every origin that will call the API:
   - Production marketing: `https://www.yourdomain.com`
   - Production admin: `https://admin.yourdomain.com`
2. If the API **site** row has **`allowed_origins`** set, the browser **`Origin`** for `POST /v1/public/leads` must match. Easiest first-time setup: leave allowed origins empty for the site, or set them to the same HTTPS marketing origin.

---

## Local development

1. Run the **Elevate API** (from your API project) with Postgres and env configured; default listen is often port **3000**.
2. Copy `frontend/.env.example` → `frontend/.env` and `admin/.env.example` → `admin/.env`; set `VITE_PUBLIC_API_BASE_URL=http://localhost:3000` and your seed `VITE_PUBLIC_SITE_KEY`.
3. `npm install --prefix frontend && npm install --prefix admin`
4. `npm run dev` (marketing) and `npm run dev --prefix admin` (admin).

Verify: `GET http://localhost:3000/v1/health` returns JSON with `"status":"ok"`.

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
| Environment Variables | `VITE_PUBLIC_API_BASE_URL`, optional `VITE_PUBLIC_ORGANIZATION_SLUG`, `VITE_PUBLIC_SITE_URL` |

[`admin/vercel.json`](../admin/vercel.json) configures SPA rewrites for `/login`, `/leads`, `/content`.

---

## Production: Netlify

Same idea: two sites, **Base directory** `frontend` or `admin`, build `npm run build`, publish `dist`, set the same `VITE_*` variables per site.

---

## Smoke tests after deploy

1. Open marketing **Contact** page → submit → DevTools Network: `POST …/v1/public/leads` → **201**.
2. Open admin **/login** → sign in → **/leads** → `GET …/v1/leads` → **200** with `items`.

If you see **CORS** errors, fix **`CORS_ORIGINS`** on the API. If **403** on leads POST, check **site `allowed_origins`** vs your marketing **Origin**.

---

## Reference code

The `elevate-backend/` folder in this workspace documents the API behavior (routes, enums, env). Do not deploy production secrets from this monorepo; deploy the API from its dedicated repo/host.

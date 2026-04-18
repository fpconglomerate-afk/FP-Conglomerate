# FP Conglomerate — marketing + admin

Monorepo: **Vite + React** marketing site in [`frontend/`](frontend/), staff + local content tools in [`admin/`](admin/). Lead capture and org staff features call the **Elevate Central API** over HTTPS. **This repo does not run the API** — only static/SPA clients.

**Deploying the site + wiring the API:** see **[`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)** (env vars, Vercel/Netlify, CORS, where secrets live).

## Quick start (local)

```bash
npm install --prefix frontend
npm install --prefix admin
```

1. Copy [`frontend/.env.example`](frontend/.env.example) → `frontend/.env` and [`admin/.env.example`](admin/.env.example) → `admin/.env`.
2. Set `VITE_PUBLIC_API_BASE_URL` and `VITE_PUBLIC_SITE_KEY` (see deployment doc for where those values come from).
3. Run:

```bash
npm run dev              # marketing → http://localhost:8080
npm run dev --prefix admin   # admin → http://localhost:5174
```

## Build

```bash
npm run build            # marketing `frontend/dist`
npm run build:admin      # admin `admin/dist`
npm run build:all        # both
```

Production: set `VITE_*` in the **hosting provider** for each app, then build — Vite inlines them at **build time**.

## What goes where (short)

| Kind | Where it lives |
|------|----------------|
| Database, JWT secrets, `SITE_KEY_PEPPER`, API `CORS_ORIGINS` | **Elevate API server only** (not in this repo) |
| `VITE_PUBLIC_API_BASE_URL`, `VITE_PUBLIC_SITE_KEY`, lead metadata | **This repo’s** `frontend/.env` + hosting env for builds |
| Staff passwords | Typed in the admin login form; not stored in repo |

## Elevate API variables (this repo)

| Variable | App | Purpose |
|----------|-----|---------|
| `VITE_PUBLIC_API_BASE_URL` | frontend, admin | API origin, no trailing slash |
| `VITE_PUBLIC_SITE_KEY` | frontend | Publishable key → `X-Site-Key` on `POST /v1/public/leads` |
| `VITE_PUBLIC_LEAD_INDUSTRY_VERTICAL` | frontend | One of: `construction`, `real_estate`, `ngo`, `hospital`, `marketing`, `other` |
| `VITE_PUBLIC_ORGANIZATION_SLUG` | admin | Optional default on staff login |
| `VITE_PUBLIC_SITE_URL` | admin | Optional “back to site” URL |
| `VITE_SITE_URL` | frontend | Optional canonical URL for SEO |

## CORS

The API must list your **exact** marketing and admin **origins** in `CORS_ORIGINS`. Per-site `allowed_origins` may also apply to public lead posts. Configure that on the **API**, not only in this frontend. Details: [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

## Major API flows

| UI | HTTP | Auth |
|----|------|------|
| Contact form | `POST /v1/public/leads` | `X-Site-Key` |
| Staff login | `POST /v1/auth/login` | `email`, `password`, `organizationSlug` |
| Leads list | `GET /v1/leads` | `Authorization: Bearer <access_token>` |
| Delete lead | `DELETE /v1/leads/:id` | Same JWT (**must exist on the API** — if missing, the admin UI gets **404**) |
| Blog / hiring / portfolio (admin CMS) | `/v1/admin/blog-posts`, `…/hiring-positions`, `…/portfolio-projects` | Bearer JWT; field lists must match OpenAPI (blog **body** min 1 char; hiring has **no** type/image columns; portfolio **no** stored slug). |

The **content dashboard** at `/content` uses **localStorage** only — not Elevate. Blog, hiring, portfolio under `/cms/*` and settings/leads use the API.

OpenAPI (when exposed): `GET {BASE}/v1/openapi.json`.

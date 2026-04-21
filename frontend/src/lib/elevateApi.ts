/** Elevate Central API — HTTP helpers (base URL + auth). No backend in this repo. */

const STAFF_TOKEN_KEY = "elevate_v1_access_token";

async function readJsonError(res: Response): Promise<string> {
  const text = await res.text();
  try {
    const j = JSON.parse(text) as { message?: string; error?: string };
    if (typeof j.message === "string") return j.message;
    if (typeof j.error === "string") return j.error;
    return text || res.statusText;
  } catch {
    return text || res.statusText;
  }
}

/** Non-OK responses: status line plus API body when useful (avoids vague messages on 404/403). */
async function readHttpError(res: Response): Promise<string> {
  const detail = (await readJsonError(res)).trim();
  const prefix = `${res.status} ${res.statusText}`.trim();
  if (!detail || detail === res.statusText) return prefix;
  return `${prefix} — ${detail}`;
}

/**
 * Same-origin `/v1/...` requests (hosting rewrites to Render — no browser CORS to the API).
 * - `true` when `VITE_PUBLIC_API_BASE_URL` is unset/empty (recommended for production with `vercel.json` / Netlify `_redirects`).
 * - `false` when an explicit API URL is set (then CORS on the API must allow this site’s origin).
 * - Set `VITE_PUBLIC_API_RELATIVE=false` to disable relative mode when you intentionally omit the base URL (rare).
 */
export function usesRelativeApiBase(): boolean {
  const raw = import.meta.env.VITE_PUBLIC_API_BASE_URL?.trim();
  if (raw) return false;
  const rel = import.meta.env.VITE_PUBLIC_API_RELATIVE?.trim().toLowerCase();
  if (rel === "false" || rel === "0" || rel === "no") return false;
  return true;
}

export function getPublicApiBaseUrl(): string {
  if (usesRelativeApiBase()) return "";
  const raw = import.meta.env.VITE_PUBLIC_API_BASE_URL?.trim();
  if (!raw) return "";
  return raw.replace(/\/$/, "");
}

export function isElevateConfigured(): boolean {
  const key = import.meta.env.VITE_PUBLIC_SITE_KEY?.trim();
  if (!key) return false;
  return usesRelativeApiBase() || Boolean(getPublicApiBaseUrl());
}

export function apiUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (usesRelativeApiBase()) return p;
  const base = getPublicApiBaseUrl();
  if (!base) {
    throw new Error(
      "Set VITE_PUBLIC_API_BASE_URL, or VITE_PUBLIC_API_RELATIVE=true with a same-origin /v1 proxy (see frontend/vercel.json).",
    );
  }
  return `${base}${p}`;
}

export function isApiBaseConfigured(): boolean {
  return usesRelativeApiBase() || Boolean(getPublicApiBaseUrl());
}

/** Public org slug for marketing CMS (`GET /v1/public/org/:slug/...`). */
export function getMarketingOrganizationSlug(): string | undefined {
  const s = import.meta.env.VITE_PUBLIC_ORGANIZATION_SLUG?.trim();
  return s || undefined;
}

export function isPublicCmsEnabled(): boolean {
  return Boolean(getMarketingOrganizationSlug() && isApiBaseConfigured());
}

/** Public catalog reads — no site key, no JWT (published content only). */
export async function publicOrgFetch(path: string, init?: RequestInit): Promise<Response> {
  if (!isApiBaseConfigured()) {
    throw new Error("API base not configured.");
  }
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(init?.headers as Record<string, string> | undefined),
  };
  if (init?.body != null && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }
  return fetch(apiUrl(path), { ...init, headers });
}

/** GET JSON from public org routes (no auth). */
export async function publicOrgJson<T>(path: string): Promise<T> {
  const res = await publicOrgFetch(path, { method: "GET" });
  if (!res.ok) throw new Error(await readJsonError(res));
  return res.json() as Promise<T>;
}

/** Normalize list endpoints: bare array, or `{ items }`, `{ data }`, `{ sites }`, etc. */
export function normalizeItems<T>(data: unknown): T[] {
  if (Array.isArray(data)) return data as T[];
  if (data && typeof data === "object") {
    const o = data as Record<string, unknown>;
    const list = o.items ?? o.data ?? o.sites ?? o.results;
    if (Array.isArray(list)) return list as T[];
  }
  return [];
}

/** Public marketing / lead capture — requires site key (never JWT). */
export async function publicFetch(path: string, init?: RequestInit): Promise<Response> {
  const siteKey = import.meta.env.VITE_PUBLIC_SITE_KEY?.trim();
  if (!siteKey || (!usesRelativeApiBase() && !getPublicApiBaseUrl())) {
    throw new Error("Missing VITE_PUBLIC_SITE_KEY or API base (VITE_PUBLIC_API_BASE_URL or VITE_PUBLIC_API_RELATIVE).");
  }
  return fetch(apiUrl(path), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
      "X-Site-Key": siteKey,
    },
  });
}

export function getStaffToken(): string | null {
  if (typeof sessionStorage === "undefined") return null;
  return sessionStorage.getItem(STAFF_TOKEN_KEY);
}

export function setStaffToken(token: string): void {
  sessionStorage.setItem(STAFF_TOKEN_KEY, token);
}

export function clearStaffToken(): void {
  sessionStorage.removeItem(STAFF_TOKEN_KEY);
}

/** Org staff — Bearer JWT from POST /v1/auth/login. */
export async function staffFetch(path: string, init?: RequestInit): Promise<Response> {
  const token = getStaffToken();
  if (!token) {
    throw new Error("Not authenticated");
  }
  const headers = new Headers(init?.headers);
  headers.set("Authorization", `Bearer ${token}`);
  const body = init?.body;
  if (typeof body === "string" && body.length > 0 && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  let res: Response;
  try {
    res = await fetch(apiUrl(path), {
      ...init,
      headers,
    });
  } catch (e) {
    throw new Error(describeFetchFailure(e));
  }
  if (res.status === 401) {
    clearStaffToken();
    if (typeof window !== "undefined" && !window.location.pathname.endsWith("/login")) {
      window.location.assign("/login");
    }
  }
  return res;
}

export type StaffLoginBody = {
  email: string;
  password: string;
  organizationSlug: string;
};

export type StaffLoginResponse = {
  access_token: string;
};

/** User-facing hint when fetch() fails with no response (CORS, DNS, TLS, mixed content, etc.). */
export function describeFetchFailure(cause: unknown): string {
  const raw = cause instanceof Error ? cause.message : String(cause);
  const isNetwork =
    raw === "Failed to fetch" ||
    /networkerror|load failed|fetch.*abort/i.test(raw) ||
    (cause instanceof TypeError && /fetch/i.test(raw));
  if (!isNetwork) return raw;

  const pageHttps =
    typeof window !== "undefined" && window.location.protocol === "https:";
  const baseStr = getPublicApiBaseUrl();
  const apiHttp = baseStr.startsWith("http://");

  const parts = [
    "No response from the API.",
    usesRelativeApiBase()
      ? "Same-origin /v1 proxy failed — confirm Vercel rewrites /v1 to your Render service and redeploy."
      : pageHttps && apiHttp
        ? "This page is HTTPS but the API URL is HTTP (mixed content is blocked). Use an https:// API URL."
        : "Check the API is running, VITE_PUBLIC_API_BASE_URL is correct, and CORS_ORIGINS on the API includes this origin.",
    usesRelativeApiBase()
      ? "Mode: VITE_PUBLIC_API_RELATIVE=true (paths under /v1 on this host)."
      : `Current API base: ${baseStr || "(empty)"}.`,
  ].filter(Boolean) as string[];
  return parts.join(" ");
}

/** POST /v1/public/leads — body must match OpenAPI (industryVertical, sourceSystem, formId, email, fullName, message, …). */
export async function submitPublicLead(body: Record<string, unknown>): Promise<void> {
  let res: Response;
  try {
    res = await publicFetch("/v1/public/leads", {
      method: "POST",
      body: JSON.stringify(body),
    });
  } catch (e) {
    throw new Error(describeFetchFailure(e));
  }
  if (res.ok) return;
  let detail = res.statusText || "Request failed";
  try {
    const err = (await res.json()) as { message?: string; error?: string };
    if (typeof err.message === "string") detail = err.message;
    else if (typeof err.error === "string") detail = err.error;
  } catch {
    /* ignore */
  }
  throw new Error(detail);
}

export async function postStaffLogin(body: StaffLoginBody): Promise<StaffLoginResponse> {
  let res: Response;
  try {
    res = await fetch(apiUrl("/v1/auth/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (e) {
    throw new Error(describeFetchFailure(e));
  }
  const data = (await res.json().catch(() => ({}))) as StaffLoginResponse & { message?: string; error?: string };
  if (!res.ok) {
    const msg = typeof data.message === "string" ? data.message : res.statusText || "Login failed";
    throw new Error(msg);
  }
  if (!data.access_token) {
    throw new Error("Invalid login response");
  }
  return { access_token: data.access_token };
}

export async function staffJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await staffFetch(path, init);
  if (!res.ok) throw new Error(await readHttpError(res));
  if (res.status === 204 || res.status === 205) return undefined as T;
  const text = await res.text();
  if (!text.trim()) return undefined as T;
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error("Invalid JSON from API");
  }
}

export async function staffGet<T>(path: string): Promise<T> {
  return staffJson<T>(path, { method: "GET" });
}

export async function staffPost<T>(path: string, body: unknown): Promise<T> {
  return staffJson<T>(path, { method: "POST", body: JSON.stringify(body) });
}

export async function staffPatch<T>(path: string, body: unknown): Promise<T> {
  return staffJson<T>(path, { method: "PATCH", body: JSON.stringify(body) });
}

export async function staffDelete(path: string): Promise<void> {
  const res = await staffFetch(path, { method: "DELETE" });
  if (!res.ok) throw new Error(await readHttpError(res));
}

export function decodeStaffJwtPayload(): { sub?: string; role?: string; org_id?: string } | null {
  const t = getStaffToken();
  if (!t) return null;
  const parts = t.split(".");
  if (parts.length < 2) return null;
  try {
    const b64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const pad = "=".repeat((4 - (b64.length % 4)) % 4);
    const json = atob(b64 + pad);
    return JSON.parse(json) as { sub?: string; role?: string; org_id?: string };
  } catch {
    return null;
  }
}

export function staffCanWrite(): boolean {
  return decodeStaffJwtPayload()?.role === "org_admin";
}

export type CloudinarySignatureResponse = {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  signature: string;
  folder: string;
  tags?: string[];
  resourceType: "image" | "video";
  uploadUrl: string;
};

/** Request signed upload params (fails if API has no Cloudinary env). */
export async function requestCloudinaryUploadSignature(
  body: { resourceType?: "image" | "video"; context?: string; tags?: string[] } = {},
): Promise<CloudinarySignatureResponse> {
  return staffPost<CloudinarySignatureResponse>("/v1/admin/cloudinary/upload-signature", body);
}

/** Register asset after direct Cloudinary upload. */
export async function registerCloudinaryAsset(body: Record<string, unknown>): Promise<Record<string, unknown>> {
  return staffPost<Record<string, unknown>>("/v1/admin/cloudinary/assets", body);
}

/**
 * Full flow: signature → multipart to Cloudinary → register metadata. Returns media asset id when API includes it.
 */
export async function uploadStaffImageAndRegister(
  file: File,
  opts?: { context?: string },
): Promise<{ mediaAssetId: string | undefined; secureUrl: string; publicId: string }> {
  const sig = await requestCloudinaryUploadSignature({
    resourceType: "image",
    context: opts?.context,
  });
  const form = new FormData();
  form.append("file", file);
  form.append("api_key", sig.apiKey);
  form.append("timestamp", String(sig.timestamp));
  form.append("signature", sig.signature);
  form.append("folder", sig.folder);
  if (sig.tags?.length) {
    form.append("tags", sig.tags.join(","));
  }
  const up = await fetch(sig.uploadUrl, { method: "POST", body: form });
  if (!up.ok) {
    throw new Error(`Cloudinary upload failed: ${up.status}`);
  }
  const uploaded = (await up.json()) as { secure_url?: string; public_id?: string; width?: number; height?: number };
  const secureUrl = uploaded.secure_url ?? "";
  const publicId = uploaded.public_id ?? "";
  if (!secureUrl || !publicId) {
    throw new Error("Unexpected Cloudinary response");
  }
  const reg = await registerCloudinaryAsset({
    publicId,
    secureUrl,
    resourceType: "image",
    width: uploaded.width,
    height: uploaded.height,
    folder: sig.folder,
  });
  const id =
    typeof reg.id === "string"
      ? reg.id
      : typeof reg.mediaAssetId === "string"
        ? reg.mediaAssetId
        : typeof reg.media_asset_id === "string"
          ? reg.media_asset_id
        : undefined;
  return { mediaAssetId: id, secureUrl, publicId };
}

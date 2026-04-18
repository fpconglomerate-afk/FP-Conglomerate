/** Minimal shapes for Elevate API JSON — align with GET /v1/openapi.json on your deployment. */

export type Paginated<T> = {
  items: T[];
  total?: number;
  limit?: number;
  offset?: number;
};

export type OrganizationAdmin = {
  id?: string;
  name?: string;
  slug?: string;
  leadsNotificationEmail?: string | null;
};

export type SiteAdmin = {
  id: string;
  organizationId?: string;
  label?: string;
  leadsNotificationEmail?: string | null;
  isActive?: boolean;
  allowedOrigins?: string[] | null;
};

export type BlogPostPublic = {
  id?: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  body?: string | null;
  status?: string;
  publishedAt?: string | null;
  coverMediaAssetId?: string | null;
  coverUrl?: string | null;
  createdAt?: string;
};

/** Fields returned by Elevate public + admin hiring routes (see OpenAPI). */
export type HiringPositionPublic = {
  id?: string;
  title: string;
  description?: string | null;
  location?: string | null;
  applicationUrl?: string | null;
  isPublished?: boolean;
  sortOrder?: number;
  /** Not stored by current Elevate API — may appear in older payloads. */
  type?: string | null;
  imageMediaAssetId?: string | null;
  imageUrl?: string | null;
};

/** Elevate does not persist per-project slug; marketing lists by org. Optional slug may appear from older data. */
export type PortfolioProjectPublic = {
  id?: string;
  slug?: string;
  title: string;
  summary?: string | null;
  body?: string | null;
  imageMediaAssetId?: string | null;
  imageUrl?: string | null;
  isPublished?: boolean;
  sortOrder?: number;
};

export type BlogPostAdmin = BlogPostPublic & Record<string, unknown>;
export type HiringPositionAdmin = HiringPositionPublic & Record<string, unknown>;
export type PortfolioProjectAdmin = PortfolioProjectPublic & Record<string, unknown>;

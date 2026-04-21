import { useQuery } from "@tanstack/react-query";
import {
  getMarketingOrganizationSlug,
  isPublicCmsEnabled,
  normalizeItems,
  publicOrgJson,
} from "@/lib/elevateApi";
import type { BlogPostPublic, HiringPositionPublic, PortfolioProjectPublic } from "@/lib/elevateApiTypes";

function normalizeBlogPost(item: BlogPostPublic & Record<string, unknown>): BlogPostPublic {
  return {
    ...item,
    coverMediaAssetId:
      typeof item.coverMediaAssetId === "string"
        ? item.coverMediaAssetId
        : typeof item.cover_media_asset_id === "string"
          ? item.cover_media_asset_id
          : undefined,
    coverUrl:
      typeof item.coverUrl === "string"
        ? item.coverUrl
        : typeof item.cover_url === "string"
          ? item.cover_url
          : undefined,
  };
}

function normalizeHiringPosition(item: HiringPositionPublic & Record<string, unknown>): HiringPositionPublic {
  return {
    ...item,
    applicationUrl:
      typeof item.applicationUrl === "string"
        ? item.applicationUrl
        : typeof item.application_url === "string"
          ? item.application_url
          : undefined,
    imageMediaAssetId:
      typeof item.imageMediaAssetId === "string"
        ? item.imageMediaAssetId
        : typeof item.image_media_asset_id === "string"
          ? item.image_media_asset_id
          : undefined,
    imageUrl:
      typeof item.imageUrl === "string"
        ? item.imageUrl
        : typeof item.image_url === "string"
          ? item.image_url
          : undefined,
  };
}

function normalizePortfolioProject(item: PortfolioProjectPublic & Record<string, unknown>): PortfolioProjectPublic {
  return {
    ...item,
    imageMediaAssetId:
      typeof item.imageMediaAssetId === "string"
        ? item.imageMediaAssetId
        : typeof item.image_media_asset_id === "string"
          ? item.image_media_asset_id
          : undefined,
    imageUrl:
      typeof item.imageUrl === "string"
        ? item.imageUrl
        : typeof item.image_url === "string"
          ? item.image_url
          : undefined,
  };
}

export function useElevateBlogPosts(limit = 24) {
  const slug = getMarketingOrganizationSlug();
  const enabled = Boolean(slug) && isPublicCmsEnabled();
  return useQuery({
    queryKey: ["elevate", "blog-posts", slug, limit],
    enabled,
    queryFn: async () => {
      const data = await publicOrgJson<unknown>(
        `/v1/public/org/${encodeURIComponent(slug!)}/blog-posts?limit=${limit}&offset=0`,
      );
      return normalizeItems<BlogPostPublic & Record<string, unknown>>(data).map(normalizeBlogPost);
    },
  });
}

export function useElevateBlogPost(postSlug: string | undefined) {
  const org = getMarketingOrganizationSlug();
  const enabled = Boolean(org && postSlug) && isPublicCmsEnabled();
  return useQuery({
    queryKey: ["elevate", "blog-post", org, postSlug],
    enabled: enabled && Boolean(postSlug),
    queryFn: async () => {
      const item = await publicOrgJson<BlogPostPublic & Record<string, unknown>>(
        `/v1/public/org/${encodeURIComponent(org!)}/blog-posts/${encodeURIComponent(postSlug!)}`,
      );
      return normalizeBlogPost(item);
    },
  });
}

export function useElevateHiringPositions() {
  const slug = getMarketingOrganizationSlug();
  const enabled = Boolean(slug) && isPublicCmsEnabled();
  return useQuery({
    queryKey: ["elevate", "hiring-positions", slug],
    enabled,
    queryFn: async () => {
      const data = await publicOrgJson<unknown>(
        `/v1/public/org/${encodeURIComponent(slug!)}/hiring-positions`,
      );
      return normalizeItems<HiringPositionPublic & Record<string, unknown>>(data).map(normalizeHiringPosition);
    },
  });
}

export function useElevatePortfolioProjects() {
  const slug = getMarketingOrganizationSlug();
  const enabled = Boolean(slug) && isPublicCmsEnabled();
  return useQuery({
    queryKey: ["elevate", "portfolio-projects", slug],
    enabled,
    queryFn: async () => {
      const data = await publicOrgJson<unknown>(
        `/v1/public/org/${encodeURIComponent(slug!)}/portfolio-projects`,
      );
      return normalizeItems<PortfolioProjectPublic & Record<string, unknown>>(data).map(normalizePortfolioProject);
    },
  });
}

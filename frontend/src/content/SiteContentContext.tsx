import { createContext, useContext, useMemo, useState } from "react";
import { defaultSiteContent, type SiteContent } from "@/content/brand";

const STORAGE_KEY = "fp-site-content-v1";

function cloneDefault(): SiteContent {
  return JSON.parse(JSON.stringify(defaultSiteContent)) as SiteContent;
}

function normalizeContent(raw: Partial<SiteContent>): SiteContent {
  const base = cloneDefault();
  return {
    ...base,
    ...raw,
    brand: {
      ...base.brand,
      ...raw.brand,
      mapsSearchQuery: raw.brand?.mapsSearchQuery ?? base.brand.mapsSearchQuery,
    },
    hero: { ...base.hero, ...raw.hero },
    aboutLeadership: {
      ...base.aboutLeadership,
      ...raw.aboutLeadership,
      bio: raw.aboutLeadership?.bio ?? base.aboutLeadership.bio,
      highlights: raw.aboutLeadership?.highlights ?? base.aboutLeadership.highlights,
      quickFacts: raw.aboutLeadership?.quickFacts ?? base.aboutLeadership.quickFacts,
      journeyTimeline:
        raw.aboutLeadership?.journeyTimeline ?? base.aboutLeadership.journeyTimeline,
      gallery: raw.aboutLeadership?.gallery ?? base.aboutLeadership.gallery,
      videoHighlights:
        raw.aboutLeadership?.videoHighlights ?? base.aboutLeadership.videoHighlights,
      references: raw.aboutLeadership?.references ?? base.aboutLeadership.references,
    },
    pageImages: { ...base.pageImages, ...raw.pageImages },
    hiring: {
      ...base.hiring,
      ...raw.hiring,
      roles: raw.hiring?.roles ?? base.hiring.roles,
    },
    businessUnits: raw.businessUnits?.map((unit, index) => {
      const baseUnit = base.businessUnits[index];
      const baseSubs = baseUnit?.subPages ?? [];
      const mergedSubPages =
        unit.subPages == null
          ? baseSubs
          : baseSubs.map((baseSp, si) => {
              const sp = unit.subPages?.[si];
              if (!sp) return baseSp;
              return {
                ...baseSp,
                ...sp,
                gallery: sp.gallery ?? baseSp.gallery,
              };
            });
      return {
        ...baseUnit,
        ...unit,
        subPages: mergedSubPages,
        gallery: unit.gallery ?? baseUnit?.gallery ?? [],
      };
    }) ?? base.businessUnits,
    serviceAreas: raw.serviceAreas?.map((item, index) => ({
      ...base.serviceAreas[index],
      ...item,
    })) ?? base.serviceAreas,
    blogPosts: raw.blogPosts?.map((item, index) => ({
      ...base.blogPosts[index],
      ...item,
    })) ?? base.blogPosts,
    portfolioProjects:
      raw.portfolioProjects?.map((item, index) => ({
        ...base.portfolioProjects[index],
        ...item,
      })) ?? base.portfolioProjects,
    galleryItems: raw.galleryItems ?? base.galleryItems,
  };
}

function readStored(): SiteContent {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return cloneDefault();
    return normalizeContent(JSON.parse(raw) as Partial<SiteContent>);
  } catch {
    return cloneDefault();
  }
}

type SiteContentContextType = {
  content: SiteContent;
  setContent: (content: SiteContent) => void;
  resetContent: () => void;
};

const SiteContentContext = createContext<SiteContentContextType | null>(null);

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContentState] = useState<SiteContent>(() =>
    typeof window === "undefined" ? cloneDefault() : readStored()
  );

  const setContent = (next: SiteContent) => {
    setContentState(next);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }
  };

  const resetContent = () => {
    const reset = cloneDefault();
    setContent(reset);
  };

  const value = useMemo(
    () => ({ content, setContent, resetContent }),
    [content]
  );

  return (
    <SiteContentContext.Provider value={value}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) {
    throw new Error("useSiteContent must be used within SiteContentProvider");
  }
  return ctx;
}

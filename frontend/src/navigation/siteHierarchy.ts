/** Canonical URL for a business unit sub-page (some MIA routes use dedicated pages). */
export function businessUnitSubPageHref(unitId: string, slug: string): string {
  if (unitId === "mogadishu-initiative") {
    if (slug === "humanitarian-programs") {
      return "/business-units/mogadishu-initiative/humanitarian-programs";
    }
    if (slug === "idp-camps") {
      return "/business-units/mogadishu-initiative/idp-camps";
    }
  }
  return `/business-units/${unitId}/${slug}`;
}

/**
 * Parent path one level up toward top-level nav (not browser history).
 * Used when PageBackButton has no explicit target.
 */
export function getHierarchyParent(pathname: string): string {
  const normalized = pathname.replace(/\/$/, "") || "/";

  if (normalized === "/idp-camps") {
    return "/business-units/mogadishu-initiative/humanitarian-programs";
  }

  const buNested = normalized.match(/^\/business-units\/([^/]+)\/(.+)$/);
  if (buNested) {
    const unitId = buNested[1];
    const rest = buNested[2];

    if (unitId === "mogadishu-initiative") {
      if (rest === "idp-camps") {
        return "/business-units/mogadishu-initiative/humanitarian-programs";
      }
      if (rest === "humanitarian-programs") {
        return `/business-units/${unitId}`;
      }
    }

    return `/business-units/${unitId}`;
  }

  if (/^\/business-units\/[^/]+$/.test(normalized)) {
    return "/business-units";
  }

  if (normalized !== "/" && /^\/[^/]+$/.test(normalized)) {
    return "/";
  }

  return "/";
}

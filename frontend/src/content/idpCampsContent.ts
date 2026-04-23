/**
 * Standalone IDP camp awareness page. Shares narrative cards with humanitarianProgramsContent.idp.
 * Gallery imagery restored from `/images/mia/humanitarian/idp-*.png`.
 */

import { humanitarianProgramsContent, MIA_UNIT_ID } from "./humanitarianProgramsContent";

export { MIA_UNIT_ID };

/** Core copy and cards imported from shared humanitarian content. */
export const idpCampsBody = humanitarianProgramsContent.idp;

export const idpCampsPageContent = {
  hero: {
    headline: "IDP Camp Awareness Across Nigeria",
    subtext:
      "Awareness begins with context: conditions in camps and informal settlements, what communities navigate every day, and how we communicate without turning hardship into spectacle.",
    imageSrc: "/images/mia/humanitarian/idp-06.png",
    imageAlt:
      "Wide elevated view of many temporary shelters in an IDP settlement, illustrating the scale of displacement.",
  },
  /** Full-width grid below the main narrative (documentary IDP imagery). */
  gallery: [
    {
      src: "/images/mia/humanitarian/idp-01.png",
      alt: "Wide elevated view of clustered temporary shelters across dry ground in a settlement.",
    },
    {
      src: "/images/mia/humanitarian/idp-02.png",
      alt: "Rows of blue and white tarp shelters along a path with a green hillside in the background.",
    },
    {
      src: "/images/mia/humanitarian/idp-03.png",
      alt: "White canvas shelters on open ground with trees and structures visible beyond the camp.",
    },
    {
      src: "/images/mia/humanitarian/idp-04.png",
      alt: "Makeshift shelters and open ground between structures in a densely settled camp area.",
    },
    {
      src: "/images/mia/humanitarian/idp-05.png",
      alt: "Dense rows of temporary dwellings stretching toward the horizon under a bright sky.",
    },
    {
      src: "/images/mia/humanitarian/idp-06.png",
      alt: "Elevated perspective across many white temporary shelters on sandy terrain.",
    },
    {
      src: "/images/mia/humanitarian/idp-07.png",
      alt: "Organized rows of light-colored shelters with narrow paths and scattered figures in the distance.",
    },
    {
      src: "/images/mia/humanitarian/idp-08.png",
      alt: "Young people gathered on open ground near low buildings with blue roofs in a camp setting.",
    },
    {
      src: "/images/mia/humanitarian/idp-09.png",
      alt: "Wide view of shelter materials and terrain at the edge of a settlement.",
    },
  ],
  gallerySection: {
    title: "Field perspectives",
    description:
      "Nine documentary frames from settlements referenced in our awareness work—shared to inform partners and the public, not to sensationalize.",
  },
  cta: {
    title: "Support responsible relief",
    paragraph:
      "Partner with Mogadishu Initiative Response to extend essentials, awareness, and dignity-first engagement.",
    partnerHref: "/contact?intent=partnership",
    contactHref: "/contact",
    backToProgramsHref: "/business-units/mogadishu-initiative/humanitarian-programs",
  },
} as const;

/**
 * Standalone IDP camp awareness page — shares narrative cards with humanitarianProgramsContent.idp.
 */

import { humanitarianProgramsContent, MIA_UNIT_ID } from "./humanitarianProgramsContent";

export { MIA_UNIT_ID };

const base = "/images/mia/humanitarian";

/** Core copy and cards imported from shared humanitarian content. */
export const idpCampsBody = humanitarianProgramsContent.idp;

export const idpCampsPageContent = {
  hero: {
    headline: "IDP Camp Awareness Across Nigeria",
    subtext:
      "A calm, credible view of displacement in camps and informal settlements—what communities face, and how we respond with respect.",
    imageSrc: `${base}/idp-03.jpg`,
    imageAlt:
      "Documentary view of temporary shelters and settlement conditions relevant to internally displaced persons in Nigeria.",
  },
  /** Full-width grid below the main narrative (documentary IDP imagery). */
  gallery: [
    { src: `${base}/idp-01.jpg`, alt: "Settlement environment illustrating conditions in an IDP context." },
    { src: `${base}/idp-02.jpg`, alt: "Pathways between temporary shelters in a camp setting." },
    { src: `${base}/idp-03.jpg`, alt: "Broader perspective on shelter structures and surrounding terrain." },
    { src: `${base}/idp-04.jpg`, alt: "Wide view of temporary shelters illustrating scale of a settlement." },
    { src: `${base}/idp-05.jpg`, alt: "Field documentation of housing materials and camp layout." },
    { src: `${base}/idp-06.jpg`, alt: "Community interaction during a humanitarian field visit." },
    { src: `${base}/idp-07.jpg`, alt: "Residents near shelter structures during a program." },
    { src: `${base}/idp-08.jpg`, alt: "Aerial or wide perspective on shelter density across a camp area." },
  ],
  cta: {
    title: "Support responsible relief",
    paragraph:
      "Partner with Mogadishu Initiative Response to extend essentials, awareness, and dignity-first engagement.",
    partnerHref: "/contact?intent=partnership",
    contactHref: "/contact",
    backToProgramsHref: "/business-units/mogadishu-initiative/humanitarian-programs",
  },
} as const;

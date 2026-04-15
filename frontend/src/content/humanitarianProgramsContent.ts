/**
 * Copy and image paths for the Mogadishu Initiative — Humanitarian Programs page.
 * Replace `/images/mia/humanitarian/*.jpg` files in public/ with owner-provided photos anytime.
 */

export const MIA_UNIT_ID = "mogadishu-initiative" as const;

const base = "/images/mia/humanitarian";

export const humanitarianProgramsContent = {
  hero: {
    headline: "Humanitarian Programs That Restore Dignity",
    subtext:
      "Measured relief, transparent field engagement, and community-first delivery across Nigeria—aligned with FP Conglomerate standards for trust and accountability.",
    imageSrc: `${base}/hero.jpg`,
    imageAlt:
      "Humanitarian field context: community support and coordinated outreach in Nigeria.",
    exploreWorkHref: "#kogi-outreach",
    partnerHref: "/contact?intent=partnership",
  },
  idp: {
    sectionEyebrow: "IDP camp awareness",
    title: "Supporting displaced communities across Nigeria",
    sectionIntro:
      "Focus on internally displaced persons (IDP) camps and informal settlements—credible information and practical relief without sensational framing.",
    paragraphs: [
      "Millions of Nigerians live with displacement—often with limited infrastructure, interrupted schooling, and day-to-day uncertainty. Mogadishu Initiative Response focuses on awareness and practical support that respects dignity.",
      "Our aim is not sensational storytelling. We document realities responsibly, partner where it helps, and channel resources toward shelter, essentials, and pathways to stability.",
    ],
    /** Featured image for the two-column awareness block (wide, documentary tone). */
    featureImageSrc: `${base}/idp-04.jpg`,
    featureImageAlt:
      "Wide view of temporary shelters in a settlement, illustrating scale and living conditions in an IDP context.",
    cards: [
      { title: "Limited access to basic needs", description: "Water, nutrition, and essentials can remain inconsistent without sustained support." },
      { title: "Disrupted education", description: "Children and young adults often face interrupted learning and long commutes to schools." },
      { title: "Uncertain future", description: "Households navigate resettlement questions while meeting immediate safety and health needs." },
    ],
  },
  /** Teaser on Humanitarian Programs page linking to the standalone IDP camp page. */
  idpTeaser: {
    title: "IDP camp awareness",
    body:
      "Learn how we approach displacement in camps and informal settlements—factual context, dignity-first messaging, and practical support.",
    href: "/business-units/mogadishu-initiative/idp-camps",
    linkLabel: "Open the IDP camp page",
  },
  kogi: {
    id: "kogi-outreach",
    title: "Kogi Special Arms Blanket Outreach",
    subtitle: "Field distribution focused on warmth, essentials, and respectful engagement with vulnerable households.",
    body:
      "This outreach brings blankets and core supplies directly to communities in Kogi State. Distribution is coordinated with local contacts, recorded for accountability, and executed to minimize disruption while maximizing reach.",
    gallery: [
      { src: `${base}/kogi-01.jpg`, alt: "Team members coordinating supply bags during a community distribution." },
      { src: `${base}/kogi-02.jpg`, alt: "Volunteers preparing essentials for handoff to residents." },
      { src: `${base}/kogi-03.jpg`, alt: "Community members receiving packaged support during outreach." },
      { src: `${base}/kogi-04.jpg`, alt: "Distribution moment between field team and local leaders." },
      { src: `${base}/kogi-05.jpg`, alt: "Supplies staged for organized delivery in a local area." },
      { src: `${base}/kogi-06.jpg`, alt: "Residents and outreach staff in conversation during the program." },
      { src: `${base}/kogi-07.jpg`, alt: "Closing segment of the outreach with essentials distributed." },
    ],
    impact: [
      { label: "Location", value: "Kogi State" },
      { label: "Focus", value: "Vulnerable communities" },
      { label: "Support", value: "Blankets & essentials" },
    ],
  },
  impactPillars: {
    title: "How We Create Impact",
    items: [
      {
        title: "Community Outreach",
        description: "On-the-ground distributions and listening sessions that meet people where they are.",
      },
      {
        title: "Awareness Initiatives",
        description: "Clear, factual communication on displacement and justice—without exploitation or noise.",
      },
      {
        title: "Collaborative Efforts",
        description: "Structured partnerships with aligned organizations to extend reach and maintain standards.",
      },
    ],
  },
  /** Horizontal strip — mix of field moments (IDs reference documentary tone). */
  moments: [
    { src: `${base}/idp-02.jpg`, alt: "Settlement pathways between temporary shelters in an IDP context." },
    { src: `${base}/idp-06.jpg`, alt: "Community interaction during a humanitarian visit." },
    { src: `${base}/kogi-02.jpg`, alt: "Volunteers preparing outreach supplies." },
    { src: `${base}/idp-07.jpg`, alt: "Residents near shelter structures during a field program." },
    { src: `${base}/idp-08.jpg`, alt: "Broader view of shelter density across a camp area." },
    { src: `${base}/kogi-04.jpg`, alt: "Coordinated distribution moment during Kogi outreach." },
  ],
  cta: {
    title: "Be Part of the Impact",
    paragraph:
      "Whether you represent an organization or want to explore responsible collaboration, our team will respond with clarity and care.",
    partnerHref: "/contact?intent=partnership",
    contactHref: "/contact",
  },
} as const;

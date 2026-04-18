/**
 * Copy and image paths for the Mogadishu Initiative Humanitarian Programs page.
 * Replace `/images/mia/humanitarian/*` media in public/ with owner-provided photos anytime.
 */

export const MIA_UNIT_ID = "mogadishu-initiative" as const;

const base = "/images/mia/humanitarian";

export const humanitarianProgramsContent = {
  hero: {
    headline: "Humanitarian Programs That Restore Dignity",
    subtext:
      "Honest relief work in the field, open communication with communities, and delivery that keeps people at the center. We aim to meet real needs across Nigeria in line with FP Conglomerate standards for trust and accountability.",
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
      "We talk about life in IDP camps and informal settlements with accuracy and restraint—context first, people at the center, and no sensational headlines.",
    paragraphs: [
      "Displacement affects households across Nigeria: strained infrastructure, interrupted schooling, and day-to-day uncertainty. Mogadishu Initiative Response focuses on awareness and practical support that keeps dignity intact.",
      "We document conditions carefully, collaborate where it strengthens outcomes, and channel attention toward shelter, essentials, and steadier footing—not performative crisis imagery.",
    ],
    /** Featured image for the two-column awareness block (wide, documentary tone). */
    featureImageSrc: `${base}/idp-04.png`,
    featureImageAlt:
      "Documentary view of pathways and clustered temporary shelters, illustrating scale and conditions in an IDP context.",
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
      "Grounded context on camps and informal settlements, respectful language, and a clear path to the support we can help coordinate.",
    href: "/business-units/mogadishu-initiative/idp-camps",
    linkLabel: "Open the IDP camp page",
  },
  kogi: {
    id: "kogi-outreach",
    title: "Kogi Special Arms Blanket Outreach",
    subtitle: "Field distribution focused on warmth, essentials, and respectful engagement with vulnerable households.",
    body:
      "This outreach brings blankets and core supplies directly to communities in Kogi State. We coordinate with local contacts, keep records for accountability, and run distributions so people get help with as little disruption as possible.",
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
        description: "Straight talk on displacement and justice, without exploitation or noise.",
      },
      {
        title: "Collaborative Efforts",
        description: "Partnerships with aligned organizations so we can reach further and keep standards high.",
      },
    ],
  },
  /** Horizontal strip of field moments (documentary tone). */
  moments: [
    { src: `${base}/idp-02.png`, alt: "Settlement pathways between temporary shelters in an IDP context." },
    { src: `${base}/idp-06.png`, alt: "Elevated view across temporary shelters in a camp setting." },
    { src: `${base}/kogi-02.jpg`, alt: "Volunteers preparing outreach supplies." },
    { src: `${base}/idp-07.png`, alt: "Organized shelter rows and paths visible across a camp area." },
    { src: `${base}/idp-08.png`, alt: "Community gathering on open ground in a settlement context." },
    { src: `${base}/kogi-04.jpg`, alt: "Coordinated distribution moment during Kogi outreach." },
  ],
  cta: {
    title: "Be Part of the Impact",
    paragraph:
      "Whether you represent an organization or want to explore a responsible collaboration, reach out. We will respond with clarity and care.",
    partnerHref: "/contact?intent=partnership",
    contactHref: "/contact",
  },
} as const;

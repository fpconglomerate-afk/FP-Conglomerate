/**
 * Mogadishu Initiative Humanitarian Programs page.
 * Field photography is restored from `/images/mia/humanitarian/*`; external URLs are not used here.
 */

export const MIA_UNIT_ID = "mogadishu-initiative" as const;

export const humanitarianProgramsContent = {
  hero: {
    headline: "Humanitarian Programs That Restore Dignity",
    subtext:
      "Honest relief work in the field, open communication with communities, and delivery that keeps people at the center. We aim to meet real needs across Nigeria in line with FP Conglomerate standards for trust and accountability.",
    imageSrc: "/images/mia/humanitarian/kogi-01.png",
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
    featureImageSrc: "/images/mia/humanitarian/idp-01.png",
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
    subtitle:
      "On-the-ground distribution in Kogi State—blankets, essentials, and face-to-face engagement that respects every household.",
    body:
      "This program meets people where they live: coordinated handoffs, clear accountability with local contacts, and distributions designed to minimize disruption. We focus on warmth, core supplies, and steady communication—not optics.",
    galleryNote:
      "Field documentation from outreach days in Kogi—shared to show real delivery, not sensationalize hardship.",
    gallery: [
      { src: "/images/mia/humanitarian/kogi-01.png", alt: "Outdoor distribution: outreach team and community members gathered on unpaved ground near modest structures." },
      { src: "/images/mia/humanitarian/kogi-02.png", alt: "Volunteers and residents during a supply handoff beside weathered corrugated shelters." },
      { src: "/images/mia/humanitarian/kogi-03.png", alt: "Aid items being shared with seated community members in an informal settlement setting." },
      { src: "/images/mia/humanitarian/kogi-04.png", alt: "Team members distributing supplies from bags during a community visit." },
      { src: "/images/mia/humanitarian/kogi-05.png", alt: "Residents receiving support during an outdoor outreach session." },
      { src: "/images/mia/humanitarian/kogi-06.png", alt: "Conversation and coordination between outreach workers and local community members." },
      { src: "/images/mia/humanitarian/kogi-07.png", alt: "Distribution moment with supplies passed hand to hand in a camp-like environment." },
      { src: "/images/mia/humanitarian/kogi-08.png", alt: "Volunteers engaging with women and children during blanket and essentials outreach." },
      { src: "/images/mia/humanitarian/kogi-09.png", alt: "Field team members preparing to hand over packaged essentials to residents." },
      { src: "/images/mia/humanitarian/kogi-10.png", alt: "Community gathering during relief distribution between makeshift buildings." },
      { src: "/images/mia/humanitarian/kogi-11.png", alt: "Outreach workers and residents in discussion during a distribution pause." },
      { src: "/images/mia/humanitarian/kogi-12.png", alt: "Supplies carried through a narrow outdoor lane between shelters." },
      { src: "/images/mia/humanitarian/kogi-13.png", alt: "Residents lining up or receiving items during a structured distribution." },
      { src: "/images/mia/humanitarian/kogi-14.png", alt: "Elderly and younger community members present during an essentials handoff." },
      { src: "/images/mia/humanitarian/kogi-15.png", alt: "Wider view of outreach activity across a dusty common area." },
      { src: "/images/mia/humanitarian/kogi-16.png", alt: "Volunteer leaning to pass supplies to a seated community member." },
      { src: "/images/mia/humanitarian/kogi-17.png", alt: "Closing moments of outreach with residents and field team still engaged." },
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
    { src: "/images/mia/humanitarian/idp-02.png", alt: "Settlement pathways between temporary shelters in an IDP context." },
    { src: "/images/mia/humanitarian/idp-03.png", alt: "Elevated view across temporary shelters in a camp setting." },
    { src: "/images/mia/humanitarian/kogi-03.png", alt: "Volunteers preparing outreach supplies." },
    { src: "/images/mia/humanitarian/idp-04.png", alt: "Organized shelter rows and paths visible across a camp area." },
    { src: "/images/mia/humanitarian/kogi-05.png", alt: "Community gathering on open ground in a settlement context." },
    { src: "/images/mia/humanitarian/idp-05.png", alt: "Coordinated distribution moment during Kogi outreach." },
  ],
  cta: {
    title: "Be Part of the Impact",
    paragraph:
      "Whether you represent an organization or want to explore a responsible collaboration, reach out. We will respond with clarity and care.",
    partnerHref: "/contact?intent=partnership",
    contactHref: "/contact",
  },
} as const;

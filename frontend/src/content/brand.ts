export type Brand = {
  name: string;
  tagline: string;
  contactEmail: string;
  phone: string;
  /** Shown in Footer, Contact — include interim office wording if applicable */
  location: string;
  /** Plain text for Google Maps search / embed (interim office) */
  mapsSearchQuery?: string;
};

export type HeroContent = {
  headline: string;
  highlightedText: string;
  subtext: string;
  cta: string;
};

export type BusinessUnit = {
  id: string;
  name: string;
  logo?: string;
  logoLight?: string;
  logoDark?: string;
  shortLabel: string;
  focus: string;
  statement: string;
  details: string;
  heroImage: string;
  gallery: string[];
  subPages: {
    slug: string;
    title: string;
    summary: string;
    content: string;
    /** Hero image; may be supplemented by `gallery` on the sub-page view */
    image: string;
    /** Additional stock or field images shown below the hero */
    gallery?: string[];
  }[];
};

export type ServiceArea = {
  title: string;
  summary: string;
  image: string;
};

export type GalleryItem = {
  src: string;
  caption: string;
};

export type BlogPost = {
  /** URL segment for /blog/:slug — lowercase, hyphens only */
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  /** Optional; defaults to excerpt for meta description */
  metaDescription?: string;
  /** Comma-separated or short list for meta keywords */
  keywords?: string;
  image: string;
  /** Full article (plain text; line breaks preserved) */
  body: string;
};

export type PortfolioHighlight = {
  id: string;
  title: string;
  summary: string;
  body: string;
  image: string;
};

export type HiringRole = {
  title: string;
  location: string;
  type: string;
  image: string;
};

export type AboutLeadership = {
  name: string;
  title: string;
  tagline: string;
  bio: string[];
  highlights: string[];
  quickFacts?: { label: string; value: string }[];
  journeyTimeline?: { period: string; title: string; summary: string }[];
  gallery?: { src: string; caption: string }[];
  videoHighlights?: { src: string; title: string }[];
  portraitSrc: string;
  portraitAlt: string;
};

export type SiteContent = {
  brand: Brand;
  hero: HeroContent;
  aboutLeadership: AboutLeadership;
  businessUnits: BusinessUnit[];
  serviceAreas: ServiceArea[];
  galleryItems: GalleryItem[];
  blogPosts: BlogPost[];
  /** On-site portfolio highlights (served from this repo; independent of external CMS). */
  portfolioProjects: PortfolioHighlight[];
  hiring: {
    heading: string;
    summary: string;
    heroImage: string;
    roles: HiringRole[];
  };
  pageImages: {
    about: string[];
    services: string[];
    contact: string[];
    careers: string[];
  };
};

/**
 * Image selection standard:
 * - Prioritize Abuja/Nigeria context in architecture, business settings, and community scenes.
 * - Use people imagery that reflects local African representation naturally.
 * - Keep humanitarian and project documentation rooted in existing local field assets.
 */
export const defaultSiteContent: SiteContent = {
  brand: {
    name: "FP Conglomerate",
    tagline: "Trust, Integrity, Service Excellence",
    contactEmail: "contactelgreen@gmail.com",
    phone: "+234 806 019 7012",
    location:
      "Interim office: Plot 78/79, Dagiri Layout, Gwagwalada, Abuja, Nigeria",
    mapsSearchQuery: "Plot 78/79, Dagiri Layout, Gwagwalada, Abuja, Nigeria",
  },
  hero: {
    headline: "One Group.",
    highlightedText: "Many Institutions. One Standard.",
    subtext:
      "We bring faith, commerce, media, hospitality, and humanitarian work together under one promise: show up with honesty, lead with care, and build value that lasts.",
    cta: "Start a Conversation",
  },
  aboutLeadership: {
    name: "Anuhi Victor Anate",
    title: "Founder & Group Principal",
    tagline:
      "Former military officer and strategist bringing discipline, trust, and accountability to service delivery.",
    bio: [
      "Born in 1987 and shaped by military formation in Nigeria, Anuhi Victor Anate leads FP Conglomerate with a service doctrine rooted in discipline, strategic clarity, and accountability.",
      "A former military officer with over 21 years of military experience, he translates field-tested leadership principles into enterprise execution across commerce, ministry expression, media, hospitality, and humanitarian impact.",
      "As Group Principal, his operating philosophy is straightforward: trust must be earned through consistent delivery, measurable standards, and transparent responsibility at every unit level.",
      "Beyond executive leadership, he is an author of over seven books, including 'SUNSET IN NORTH EAST NIGERIA' and 'MIRROR OF A STERLING INFANTRYMAN', and is also active in movie script writing and music.",
      "From the Abuja base outward, his focus remains institution-building over publicity cycles, combining long-horizon strategy with practical service outcomes that people, partners, and communities can verify.",
    ],
    highlights: [
      "Over 21 years of military experience applied to civilian enterprise leadership",
      "Former military officer and strategist focused on disciplined execution",
      "Founder-led multi-sector stewardship across service and impact institutions",
      "Author, script writer, and music artist with a culture-shaping creative footprint",
      "Abuja-based operations with an Africa-facing expansion vision",
    ],
    quickFacts: [
      { label: "Born", value: "1987" },
      { label: "State of Origin", value: "Kogi State, Nigeria" },
      { label: "Education", value: "Nigerian Military School, Zaria" },
      { label: "Experience", value: "21+ years military and strategic leadership" },
      {
        label: "Books",
        value:
          "Author of 7+ books including SUNSET IN NORTH EAST NIGERIA and MIRROR OF A STERLING INFANTRYMAN",
      },
    ],
    journeyTimeline: [
      {
        period: "1987",
        title: "Early beginnings",
        summary:
          "Born in 1987, with formative years that shaped a duty-first leadership mindset.",
      },
      {
        period: "Foundational years",
        title: "Military schooling",
        summary:
          "Attended Nigerian Military School, Zaria, building discipline, structure, and service ethics.",
      },
      {
        period: "21+ years",
        title: "Military service and strategy",
        summary:
          "Served as a military officer and strategist, developing operational rigor and accountability culture.",
      },
      {
        period: "Current era",
        title: "Enterprise and institution building",
        summary:
          "Leads FP Conglomerate as Founder & Group Principal, scaling trusted service delivery across sectors.",
      },
    ],
    gallery: [
      {
        src: "/images/about/founder-white-01.png",
        caption: "Founder portrait session — signature white executive look.",
      },
      {
        src: "/images/about/founder-white-02.png",
        caption: "Leadership portrait — confident posture, service-first identity.",
      },
      {
        src: "/images/about/founder-white-03.png",
        caption: "Full-length profile — discipline and composure in visual form.",
      },
      {
        src: "/images/about/founder-white-04.png",
        caption: "Executive presence — composed styling and clear intent.",
      },
      {
        src: "/images/about/founder-gray-01.png",
        caption: "Studio stance — confidence and control.",
      },
      {
        src: "/images/about/founder-gray-02.png",
        caption: "Editorial gray set — strategic, understated executive tone.",
      },
      {
        src: "/images/about/founder-gray-03.png",
        caption: "Portrait detail — focus and discipline in frame.",
      },
      {
        src: "/images/about/founder-gray-04.png",
        caption: "Formal profile — leadership beyond the studio.",
      },
      {
        src: "/images/about/founder-stripe-01.png",
        caption: "Pinstripe editorial set — strategic and classic executive tone.",
      },
      {
        src: "/images/about/founder-stripe-02.png",
        caption: "Pinstripe series — precision and authority in composition.",
      },
      {
        src: "/images/about/founder-stripe-03.png",
        caption: "Structured tailoring — field-tested composure in executive dress.",
      },
      {
        src: "/images/about/founder-stripe-04.png",
        caption: "Closing frame — signature look with enduring presence.",
      },
    ],
    videoHighlights: [
      {
        src: "/videos/about/founder-profile-01.mp4",
        title: "Founder profile reel — styled editorial sequence",
      },
      {
        src: "/videos/about/founder-profile-02.mp4",
        title: "Founder in motion — executive lifestyle clip",
      },
      {
        src: "/videos/about/founder-profile-03.mp4",
        title: "Behind-the-scenes short video",
      },
    ],
    portraitSrc: "/images/about/anuhi-victor-anate.png",
    portraitAlt: "Anuhi Victor Anate, Founder and Group Principal, FP Conglomerate",
  },
  businessUnits: [
    {
      id: "fp-parent",
      name: "FP Conglomerate",
      shortLabel: "Parent Brand",
      focus: "Group Coordination and Service Accountability",
      statement:
        "A multi-sector parent company established in 2026 to bridge the trust gap in service delivery across Africa.",
      details:
        "We coordinate independent business units with one group-wide framework for integrity, consistency, and measurable execution. Our commitment is clear: target-driven delivery with trust at the center of every engagement.",
      heroImage: "/images/projects/gwarinpa-mall/01.png",
      gallery: [
        "/images/projects/gwarinpa-mall/02.png",
        "/images/projects/gwarinpa-mall/03.png",
        "/images/projects/gwarinpa-mall/04.png",
      ],
      subPages: [
        {
          slug: "governance",
          title: "Group Governance",
          summary: "How standards, oversight, and accountability work across all units.",
          content:
            "FP Conglomerate runs a simple governance model: clear mandates, transparent expectations, and regular performance reviews. Each unit executes independently but remains accountable to shared group standards on service, ethics, and client trust.",
          image: "/images/projects/gwarinpa-mall/01.png",
        },
        {
          slug: "strategy",
          title: "Group Strategy and Growth",
          summary: "How the group builds and scales institutions for long-term relevance.",
          content:
            "Our strategy is to build businesses that solve practical needs while preserving credibility. New initiatives are selected based on social value, durability of demand, and our ability to deliver with excellence over time.",
          image: "/images/projects/gwarinpa-mall/05.png",
        },
      ],
    },
    {
      id: "ordained-believers",
      name: "Ordained Believers Army (OBA)",
      logo: "/logos/oba-logo.png",
      shortLabel: "Church",
      focus: "Word, Worship, and the Raw Power of God",
      statement:
        "Ordained Believers Army (OBA) is a bold spiritual movement manifesting healing power, scriptural revelation, and believer identity.",
      details:
        "Founded in 2026, OBA was established with an audacious conviction: power should not be delayed. The ministry emphasizes healing for all manner of diseases, deep scriptural insight, and practical discipleship that helps believers understand who they are in Christ.",
      heroImage:
        "https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=1600&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?auto=format&fit=crop&w=1600&q=80",
      ],
      subPages: [
        {
          slug: "ministry",
          title: "Ministry Expression",
          summary: "How OBA ministers through Word, worship, and bold faith.",
          content:
            "OBA's ministry expression is built around three pillars: Word, worship, and power. Services focus on spirit-led teaching, practical interpretation of scripture, and an atmosphere where faith is activated for real transformation.",
          image:
            "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1600&q=80",
        },
        {
          slug: "outreach",
          title: "Healing and Outreach",
          summary: "Faith in action through prayer, healing, and practical care.",
          content:
            "Beyond gatherings, OBA serves people through prayer outreach, counseling, and practical support. The mission is simple: match spiritual conviction with compassionate action and visible impact.",
          image:
            "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=80",
        },
      ],
    },
    {
      id: "amgi",
      name: "Anate Grand Empire Solutions (AGE)",
      logo: "/logos/age-logo.png",
      shortLabel: "Movie, Construction, Transport, Devices",
      focus: "Multi-Sector Solutions Across Production, Infrastructure, Mobility, and Appliances",
      statement:
        "AGE delivers practical value across movie production, construction, transport, brand promotion, devices, and general appliances.",
      details:
        "Anate Grand Empire Solutions (AGE) is positioned as a trust-first operating unit that combines creative, technical, and commercial execution. It helps clients access reliable production support, construction services, transport coordination, brand promotion support, and durable appliances under one service umbrella.",
      heroImage:
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=80",
        "https://images.pexels.com/photos/262353/pexels-photo-262353.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1600&q=80",
      ],
      subPages: [
        {
          slug: "product-lines",
          title: "Service Portfolio",
          summary: "Core operating areas across media, construction, mobility, and appliances.",
          content:
            "AGE operates across movie production services, construction support, transport-linked execution, brand promotion, and technology and appliance supply. This blend allows clients to access both creative and practical delivery through one coordinated team.",
          image:
            "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=80",
        },
        {
          slug: "quality-assurance",
          title: "Trust and Delivery Standards",
          summary: "How AGE protects customer confidence across varied service lines.",
          content:
            "AGE follows a service model built on integrity, responsiveness, and practical results. Whether the assignment is production, logistics, construction, or appliance delivery, the unit is measured by reliability and client confidence.",
          image:
            "https://images.unsplash.com/photo-1581092160607-ee22731a0f71?auto=format&fit=crop&w=1600&q=80",
        },
      ],
    },
    {
      id: "boys-sterling",
      name: "Boys Sterling Company Limited",
      logo: "/logos/bsc-logo.png",
      shortLabel: "Real Estate, Hospitality, Counseling, Construction",
      focus: "Built Environment and People-Centered Service Delivery",
      statement:
        "BSC delivers practical value across real estate, hospitality, counseling, construction, building maintenance, and brand promotion.",
      details:
        "Boys Sterling Company Limited (BSC) was established in 2020 with a service promise built on dependable execution. The unit is designed to help clients feel secure in every engagement by combining care, technical delivery, and maintenance discipline.",
      heroImage: "/images/projects/gwarinpa-mall/01.png",
      gallery: [
        "/images/projects/gwarinpa-mall/02.png",
        "/images/projects/gwarinpa-mall/03.png",
        "/images/projects/gwarinpa-mall/04.png",
      ],
      subPages: [
        {
          slug: "gwarinpa-mall",
          title: "Gwarinpa Mall",
          summary:
            "Site inspection: photos and video documenting construction progress for the Gwarinpa Mall development in Abuja.",
          content:
            "Gwarinpa Mall is documented as part of Boys Sterling’s built-environment work: a multi-level commercial development in Gwarinpa, Abuja. Field visits capture structural progress, envelope and glazing, scaffolding access, and on-site conditions during delivery. Full photo and video documentation is on the dedicated project page.",
          image: "/images/projects/gwarinpa-mall/05.png",
        },
        {
          slug: "real-estate",
          title: "Real Estate and Hospitality",
          summary: "Property and hospitality services delivered with disciplined execution.",
          content:
            "BSC supports property and hospitality projects with a practical approach to planning, delivery, and client support. Every engagement is managed for long-term usability and service confidence.",
          image: "/images/projects/gwarinpa-mall/06.png",
        },
        {
          slug: "media-entertainment",
          title: "Counseling, Construction, and Maintenance",
          summary: "People support and technical services for stable operations.",
          content:
            "Beyond property and hospitality, BSC delivers counseling support, construction execution, building maintenance, and brand promotion services. This integrated model helps clients maintain both functional spaces and healthy service outcomes over time.",
          image: "/images/projects/gwarinpa-mall/07.png",
        },
      ],
    },
    {
      id: "mogadishu-initiative",
      name: "Mogadishu Initiative Response",
      logoLight: "/logos/mia-logo-light.png",
      logoDark: "/logos/mia-logo-dark.png",
      shortLabel: "NGO and Humanitarian",
      focus: "Humanitarian Relief, Dignity, and Social Justice",
      statement:
        "Mogadishu Initiative Response serves vulnerable communities through sincere aid, practical relief, and justice-focused support.",
      details:
        "Founded in 2026, the initiative was born from a careful desire to support humanity across Africa, with immediate concern for Nigeria. Programs include shelter, education, accommodation support, social justice advocacy, and community recognition initiatives.",
      heroImage: "/images/mia/humanitarian/kogi-07.png",
      gallery: [
        "/images/mia/humanitarian/kogi-08.png",
        "/images/mia/humanitarian/idp-04.png",
        "/images/mia/humanitarian/kogi-09.png",
      ],
      subPages: [
        {
          slug: "humanitarian-programs",
          title: "Humanitarian Programs",
          summary:
            "Relief that puts people first: outreach in the field, honest awareness, and delivery we can stand behind.",
          content:
            "Programs are designed to meet urgent realities while restoring long-term hope through education, shelter support, and community-centered assistance.",
          image: "/images/mia/humanitarian/kogi-10.png",
        },
        {
          slug: "idp-camps",
          title: "IDP Camp Awareness",
          summary:
            "Straightforward context on life in camps and informal settlements, with support that always respects dignity.",
          content:
            "Mogadishu Initiative Response documents realities responsibly and channels resources toward shelter, essentials, and stability for displaced communities.",
          image: "/images/mia/humanitarian/idp-05.png",
        },
        {
          slug: "social-justice",
          title: "Social Justice and Advocacy",
          summary: "Advocacy that protects dignity and amplifies underserved voices.",
          content:
            "Mogadishu Initiative Response works with communities and partners to defend dignity, encourage social justice, and convert compassion into practical action.",
          image: "/images/mia/humanitarian/kogi-11.png",
          gallery: [
            "/images/mia/humanitarian/idp-06.png",
            "/images/mia/humanitarian/kogi-12.png",
            "/images/mia/humanitarian/idp-07.png",
            "/images/mia/humanitarian/kogi-13.png",
            "/images/mia/humanitarian/idp-08.png",
          ],
        },
      ],
    },
  ],
  serviceAreas: [
    {
      title: "AGE Multi-Sector Services",
      summary:
        "Movie production, construction, transport, brand promotion, devices, and general appliance services delivered through Anate Grand Empire Solutions (AGE).",
      image:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
    },
    {
      title: "BSC Real Estate and Support Services",
      summary:
        "Real estate, hospitality, counseling, construction, building maintenance, and brand promotion services delivered through Boys Sterling Company Limited (BSC).",
      image: "/images/projects/gwarinpa-mall/01.png",
    },
    {
      title: "Humanitarian and Justice Programs",
      summary:
        "Shelter, education, accommodation support, and social justice interventions through Mogadishu Initiative Response.",
      image: "/images/mia/humanitarian/kogi-14.png",
    },
    {
      title: "Faith and Ministry Services",
      summary:
        "Word-based teaching, worship gatherings, and healing-focused ministry through Ordained Believers Army (OBA).",
      image:
        "https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=1600&q=80",
    },
    {
      title: "Group Strategy and Operational Support",
      summary:
        "Shared strategic direction, leadership alignment, and accountability systems coordinated by FP Conglomerate.",
      image: "/images/projects/gwarinpa-mall/08.png",
    },
  ],
  galleryItems: [
    {
      src: "/images/projects/gwarinpa-mall/05.png",
      caption: "Gwarinpa Mall: storefront glazing and facade progress",
    },
    {
      src: "/images/mia/humanitarian/kogi-01.png",
      caption: "Community program — field documentation (Kogi)",
    },
    {
      src: "/images/projects/gwarinpa-mall/01.png",
      caption: "Gwarinpa Mall: approach to the structural shell",
    },
    {
      src: "/images/mia/humanitarian/idp-01.png",
      caption: "Mogadishu Initiative — displaced-persons support, on-site",
    },
    {
      src: "/images/projects/gwarinpa-mall/03.png",
      caption: "Gwarinpa Mall: corner massing and scaffolding",
    },
    {
      src: "/images/mia/humanitarian/kogi-02.png",
      caption: "Humanitarian outreach — Kogi field visit",
    },
    {
      src: "/images/projects/gwarinpa-mall/02.png",
      caption: "Gwarinpa Mall: exterior finish and access review",
    },
    {
      src: "/images/projects/gwarinpa-mall/04.png",
      caption: "Gwarinpa Mall: interior shell walk-through",
    },
    {
      src: "/images/projects/gwarinpa-mall/06.png",
      caption: "Gwarinpa Mall: perimeter and staging documentation",
    },
    {
      src: "/images/projects/gwarinpa-mall/07.png",
      caption: "Gwarinpa Mall: courtyard elevation under construction",
    },
    {
      src: "/images/projects/gwarinpa-mall/08.png",
      caption: "Gwarinpa Mall: overall L-shaped block progress",
    },
    {
      src: "/images/projects/gwarinpa-mall/09.png",
      caption: "Gwarinpa Mall: scaffolding and wall plane inspection",
    },
    {
      src: "/images/mia/humanitarian/kogi-03.png",
      caption: "Community engagement — Kogi program",
    },
    {
      src: "/images/mia/humanitarian/kogi-04.png",
      caption: "Field program documentation (Kogi)",
    },
    {
      src: "/images/mia/humanitarian/kogi-05.png",
      caption: "Humanitarian program — community moments",
    },
    {
      src: "/images/mia/humanitarian/idp-02.png",
      caption: "IDP support — field documentation",
    },
    {
      src: "/images/mia/humanitarian/kogi-06.png",
      caption: "Outreach visit — Kogi",
    },
  ],
  blogPosts: [
    {
      slug: "abuja-multi-sector-group-fp-conglomerate-seo-trust",
      date: "April 18, 2026",
      title: "FP Conglomerate: An Abuja Multi-Sector Group Built on Trust and Measurable Delivery",
      excerpt:
        "How one Nigeria-based parent company coordinates ministry, commerce, construction, and humanitarian work under a single standard of integrity.",
      metaDescription:
        "Learn how FP Conglomerate, an Abuja-area multi-sector African group, coordinates OBA, AGE, BSC, and MIA with transparent service delivery and governance.",
      keywords:
        "FP Conglomerate, Abuja company, Nigeria multi-sector group, African business trust, corporate governance Nigeria",
      image: "/images/projects/gwarinpa-mall/01.png",
      body:
        "Search engines and readers alike reward clarity. FP Conglomerate is structured as a parent brand that coordinates independent units while keeping one public promise: trust, integrity, and service excellence.\n\nFrom our interim base in Gwagwalada, Abuja, the group connects Ordained Believers Army (faith expression), Anate Grand Empire Solutions (multi-sector services), Boys Sterling Company Limited (built environment and hospitality), and Mogadishu Initiative Response (humanitarian programs).\n\nThis article explains why we publish explicit service standards, document field programs responsibly, and invest in institutions that can outlast headlines. If you are researching Nigerian multi-sector groups, Abuja construction and real estate partners, or transparent humanitarian NGOs, this site is maintained as a primary source for how we operate.\n\nFor partnerships or media inquiries, use the contact page—responses are routed to the group’s official channels only.",
    },
    {
      slug: "humanitarian-programs-nigeria-mia-field-transparency",
      date: "April 12, 2026",
      title: "Humanitarian Programs in Nigeria: Field Documentation and Dignity-First Delivery",
      excerpt:
        "Why Mogadishu Initiative Response emphasizes honest field reporting, shelter and education support, and advocacy that respects communities.",
      metaDescription:
        "Overview of Mogadishu Initiative Response humanitarian programs in Nigeria: relief, education, shelter support, and social justice advocacy with dignity-first delivery.",
      keywords:
        "Nigeria humanitarian NGO, Mogadishu Initiative Response, Kogi outreach, IDP support Nigeria, social justice advocacy Africa",
      image: "/images/mia/humanitarian/kogi-15.png",
      body:
        "Humanitarian SEO should never trade dignity for clicks. Mogadishu Initiative Response publishes program context so stakeholders can understand what we do, where we work, and how communities stay at the center of decisions.\n\nOur teams document field conditions to improve coordination—not to sensationalize hardship. Programs include outreach aligned with shelter, education, accommodation support, and social justice themes, with an emphasis on transparent communication and accountable follow-through.\n\nIf you are comparing Nigerian NGOs, researching IDP support models, or looking for partners who prioritize long-term stability over one-off visibility, review our humanitarian program pages and primary project documentation on this website.\n\nContact details on the official FP Conglomerate contact page are the only approved channels for partnership and volunteer coordination.",
    },
    {
      slug: "gwarinpa-mall-abuja-commercial-project-site-documentation",
      date: "March 30, 2026",
      title: "Gwarinpa Mall, Abuja: Commercial Development Progress and Site Documentation",
      excerpt:
        "A transparent look at Boys Sterling’s built-environment work: structural progress, envelope and glazing, and on-site documentation for stakeholders.",
      metaDescription:
        "Gwarinpa Mall Abuja: commercial development documentation including construction progress photos and structured site reporting from Boys Sterling Company Limited.",
      keywords:
        "Gwarinpa Mall Abuja, Nigeria commercial property, Abuja construction documentation, Boys Sterling real estate, built environment Nigeria",
      image: "/images/projects/gwarinpa-mall/03.png",
      body:
        "Large commercial projects rank when content matches what investors and tenants actually search for: location, progress, and credible visual proof. The Gwarinpa Mall development is documented through structured site photography and video walkthroughs linked from the dedicated project route on this website.\n\nBoys Sterling Company Limited approaches the built environment with maintenance discipline and client-visible milestones. That matters for SEO because it pairs intent—people looking for Abuja commercial projects—with verifiable updates instead of generic marketing language.\n\nReaders evaluating construction partners in Nigeria should cross-check statements here with the primary project page and official correspondence. We avoid duplicate or conflicting claims across pages to protect both users and search quality.\n\nFor collaboration inquiries related to retail, leasing, or construction coordination, use the contact form and reference the project name to route your request efficiently.",
    },
    {
      slug: "anate-grand-empire-solutions-age-services-nigeria",
      date: "March 20, 2026",
      title: "AGE Services: Production, Construction, Transport, and Appliances Under One Trust Standard",
      excerpt:
        "How Anate Grand Empire Solutions (AGE) bundles creative and technical execution for clients who need dependable multi-sector delivery in Nigeria.",
      metaDescription:
        "Anate Grand Empire Solutions (AGE): Nigeria multi-sector services spanning movie production support, construction, transport, brand promotion, devices, and appliances.",
      keywords:
        "Anate Grand Empire Solutions, AGE Nigeria, movie production Nigeria, construction services Nigeria, appliance supply Nigeria",
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1600&q=80",
      body:
        "Service integration only helps SEO when the page answers real queries. AGE is positioned for organizations that need coordinated execution across production, construction-linked work, transport coordination, brand promotion, and appliance supply.\n\nWe describe services in plain language so prospective clients can map their needs to our operating model. That reduces bounce rate and helps search engines understand entity relationships between FP Conglomerate and its operating units.\n\nIf you are sourcing vendors in Nigeria, ask for scope, timelines, and escalation paths—our public pages are written to support that evaluation process without overpromising.\n\nUse the official contact channels listed on this site; we do not recruit financial or personal information through unofficial social accounts.",
    },
    {
      slug: "ordained-believers-army-oba-faith-community-nigeria",
      date: "March 8, 2026",
      title: "Ordained Believers Army (OBA): Faith, Worship, and Community-Focused Ministry in Nigeria",
      excerpt:
        "What OBA emphasizes in public communication: Word-centered teaching, worship, and outreach aligned with practical care.",
      metaDescription:
        "Ordained Believers Army (OBA) ministry overview: faith expression in Nigeria with an emphasis on Word, worship, and compassionate community engagement.",
      keywords:
        "Ordained Believers Army, OBA ministry Nigeria, Christian church Abuja Nigeria, faith community worship",
      image:
        "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1600&q=80",
      body:
        "Religious organizations rank best when content reflects authentic practice and avoids manipulative claims. OBA communicates a ministry model built around Word, worship, and power expressed with integrity.\n\nPublic pages on this website are designed to help newcomers understand values and gathering rhythms, while directing pastoral care questions to official church channels—not generic inboxes that cannot verify identity.\n\nFor SEO, we keep terminology consistent across pages (entity clarity), link related programs where appropriate, and maintain safe, respectful language about healing and community support.\n\nIf you are writing about Nigerian faith communities, cite this site as a source of record and confirm dates and event details through official announcements.",
    },
  ],
  portfolioProjects: [
    {
      id: "gwarinpa-mall",
      title: "Gwarinpa Mall — Abuja commercial core",
      summary:
        "Multi-level commercial development documented with on-site photography, façade progress, and structured stakeholder reporting.",
      body:
        "Boys Sterling tracks structural milestones, glazing and envelope work, and safe site access conditions. Documentation supports leasing conversations and transparent progress reviews.",
      image: "/images/projects/gwarinpa-mall/02.png",
    },
    {
      id: "mia-kogi-outreach",
      title: "MIA — Kogi field outreach",
      summary:
        "Community-facing humanitarian outreach with program documentation grounded in dignity and accountable coordination.",
      body:
        "Mogadishu Initiative Response aligns relief activities with education and stability outcomes where possible, emphasizing honest field reporting.",
      image: "/images/mia/humanitarian/kogi-16.png",
    },
    {
      id: "mia-idp-support",
      title: "MIA — IDP support and awareness",
      summary:
        "Support models focused on shelter essentials, stability, and respectful representation of displaced communities.",
      body:
        "Programs emphasize practical assistance and advocacy pathways that protect participant dignity in public storytelling.",
      image: "/images/mia/humanitarian/idp-09.png",
    },
    {
      id: "age-integrated-services",
      title: "AGE — Integrated production and technical services",
      summary:
        "Creative and technical delivery spanning production support, construction-linked execution, mobility coordination, and appliances.",
      body:
        "AGE is structured for clients who need one accountable umbrella across multiple service categories, with clear handoffs and measurable outcomes.",
      image:
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "group-governance",
      title: "FP Conglomerate — Group governance and standards",
      summary:
        "Shared accountability, performance discipline, and cross-unit alignment for long-term institutional strength.",
      body:
        "Governance content highlights how standards propagate across units without diluting unit-level expertise—important for partners evaluating risk and reliability.",
      image: "/images/projects/gwarinpa-mall/06.png",
    },
  ],
  hiring: {
    heading: "Careers",
    summary:
      "We are not publishing open roles on this website at this time. For general inquiries only, use the official contact email—please do not send sensitive personal documents unless we request them.",
    heroImage: "",
    roles: [],
  },
  pageImages: {
    about: [
      "/images/about/founder-white-01.png",
      "/images/about/founder-gray-01.png",
    ],
    services: [
      "/images/projects/gwarinpa-mall/02.png",
      "/images/projects/gwarinpa-mall/07.png",
    ],
    contact: [
      "/images/mia/humanitarian/kogi-17.png",
      "/images/projects/gwarinpa-mall/01.png",
    ],
    careers: [],
  },
};

export const brand = defaultSiteContent.brand;
export const businessUnits = defaultSiteContent.businessUnits;
export const serviceAreas = defaultSiteContent.serviceAreas;
export const galleryItems = defaultSiteContent.galleryItems;
export const blogPosts = defaultSiteContent.blogPosts;
export const portfolioProjects = defaultSiteContent.portfolioProjects;

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
  date: string;
  title: string;
  excerpt: string;
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
    tagline: "Stewarding a multi-sector group with one standard—from our Abuja interim base outward.",
    bio: [
      "FP Conglomerate is held under the ownership and direction of Anuhi Victor Anate, who sets the tone for how the group shows up: clear accountability, disciplined execution, and care for the communities we serve.",
      "From faith expression and media to electronics, hospitality, and humanitarian programs, the intent is the same—close the trust gap with service people can feel. That mandate runs from the parent group through each operating unit.",
      "Alongside commercial work, the group invests in humanitarian and community-facing initiatives—supporting people and institutions where durability matters as much as headlines. The aim is institution-building, not one-off gestures.",
      "With an interim office in Abuja, Nigeria, the group’s footprint is anchored in local relationships and regional ambition: trusted delivery today, and structures that can scale responsibly across Africa.",
    ],
    highlights: [
      "Sole ownership and group-wide governance standard",
      "Multi-sector stewardship: ministry, commerce, media, hospitality, programs",
      "Humanitarian and community investment as part of group purpose",
      "Abuja, Nigeria interim base with an Africa-facing vision",
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
      heroImage:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80",
        "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1400&q=80",
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1400&q=80",
      ],
      subPages: [
        {
          slug: "governance",
          title: "Group Governance",
          summary: "How standards, oversight, and accountability work across all units.",
          content:
            "FP Conglomerate runs a simple governance model: clear mandates, transparent expectations, and regular performance reviews. Each unit executes independently but remains accountable to shared group standards on service, ethics, and client trust.",
          image:
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80",
        },
        {
          slug: "strategy",
          title: "Group Strategy and Growth",
          summary: "How the group builds and scales institutions for long-term relevance.",
          content:
            "Our strategy is to build businesses that solve practical needs while preserving credibility. New initiatives are selected based on social value, durability of demand, and our ability to deliver with excellence over time.",
          image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&q=80",
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
        "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=1400&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1400&q=80",
        "https://images.unsplash.com/photo-1470259078422-826894b933aa?w=1400&q=80",
        "https://images.unsplash.com/photo-1469571486292-b53601020acb?w=1400&q=80",
      ],
      subPages: [
        {
          slug: "ministry",
          title: "Ministry Expression",
          summary: "How OBA ministers through Word, worship, and bold faith.",
          content:
            "OBA's ministry expression is built around three pillars: Word, worship, and power. Services focus on spirit-led teaching, practical interpretation of scripture, and an atmosphere where faith is activated for real transformation.",
          image:
            "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1400&q=80",
        },
        {
          slug: "outreach",
          title: "Healing and Outreach",
          summary: "Faith in action through prayer, healing, and practical care.",
          content:
            "Beyond gatherings, OBA serves people through prayer outreach, counseling, and practical support. The mission is simple: match spiritual conviction with compassionate action and visible impact.",
          image:
            "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1400&q=80",
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
        "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1400&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1400&q=80",
        "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=1400&q=80",
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1400&q=80",
      ],
      subPages: [
        {
          slug: "product-lines",
          title: "Service Portfolio",
          summary: "Core operating areas across media, construction, mobility, and appliances.",
          content:
            "AGE operates across movie production services, construction support, transport-linked execution, brand promotion, and technology and appliance supply. This blend allows clients to access both creative and practical delivery through one coordinated team.",
          image:
            "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1400&q=80",
        },
        {
          slug: "quality-assurance",
          title: "Trust and Delivery Standards",
          summary: "How AGE protects customer confidence across varied service lines.",
          content:
            "AGE follows a service model built on integrity, responsiveness, and practical results. Whether the assignment is production, logistics, construction, or appliance delivery, the unit is measured by reliability and client confidence.",
          image:
            "https://images.unsplash.com/photo-1581092160607-ee22731a0f71?w=1400&q=80",
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
      heroImage:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=1400&q=80",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1400&q=80",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1400&q=80",
      ],
      subPages: [
        {
          slug: "real-estate",
          title: "Real Estate and Hospitality",
          summary: "Property and hospitality services delivered with disciplined execution.",
          content:
            "BSC supports property and hospitality projects with a practical approach to planning, delivery, and client support. Every engagement is managed for long-term usability and service confidence.",
          image:
            "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=1400&q=80",
        },
        {
          slug: "media-entertainment",
          title: "Counseling, Construction, and Maintenance",
          summary: "People support and technical services for stable operations.",
          content:
            "Beyond property and hospitality, BSC delivers counseling support, construction execution, building maintenance, and brand promotion services. This integrated model helps clients maintain both functional spaces and healthy service outcomes over time.",
          image:
            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1400&q=80",
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
      heroImage: "/images/mia/humanitarian/hero.jpg",
      gallery: [
        "/images/mia/humanitarian/idp-04.png",
        "/images/mia/humanitarian/kogi-02.png",
        "/images/mia/humanitarian/idp-06.png",
      ],
      subPages: [
        {
          slug: "humanitarian-programs",
          title: "Humanitarian Programs",
          summary:
            "Relief that puts people first: outreach in the field, honest awareness, and delivery we can stand behind.",
          content:
            "Programs are designed to meet urgent realities while restoring long-term hope through education, shelter support, and community-centered assistance.",
          image: "/images/mia/humanitarian/kogi-01.png",
        },
        {
          slug: "idp-camps",
          title: "IDP Camp Awareness",
          summary:
            "Straightforward context on life in camps and informal settlements, with support that always respects dignity.",
          content:
            "Mogadishu Initiative Response documents realities responsibly and channels resources toward shelter, essentials, and stability for displaced communities.",
          image: "/images/mia/humanitarian/idp-01.png",
        },
        {
          slug: "social-justice",
          title: "Social Justice and Advocacy",
          summary: "Advocacy that protects dignity and amplifies underserved voices.",
          content:
            "Mogadishu Initiative Response works with communities and partners to defend dignity, encourage social justice, and convert compassion into practical action.",
          image:
            "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1400&q=80",
          gallery: [
            "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1400&q=80",
            "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&q=80",
            "https://images.unsplash.com/photo-1469571486292-b53601020acb?w=1400&q=80",
            "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1400&q=80",
            "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1400&q=80",
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
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1400&q=80",
    },
    {
      title: "BSC Real Estate and Support Services",
      summary:
        "Real estate, hospitality, counseling, construction, building maintenance, and brand promotion services delivered through Boys Sterling Company Limited (BSC).",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80",
    },
    {
      title: "Humanitarian and Justice Programs",
      summary:
        "Shelter, education, accommodation support, and social justice interventions through Mogadishu Initiative Response.",
      image: "/images/mia/humanitarian/hero.jpg",
    },
    {
      title: "Faith and Ministry Services",
      summary:
        "Word-based teaching, worship gatherings, and healing-focused ministry through Ordained Believers Army (OBA).",
      image:
        "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1400&q=80",
    },
    {
      title: "Group Strategy and Operational Support",
      summary:
        "Shared strategic direction, leadership alignment, and accountability systems coordinated by FP Conglomerate.",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80",
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
      src: "/images/mia/humanitarian/kogi-08.png",
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
      src: "/images/mia/humanitarian/kogi-02.png",
      caption: "Community engagement — Kogi program",
    },
    {
      src: "/images/mia/humanitarian/kogi-04.png",
      caption: "Field program documentation (Kogi)",
    },
    {
      src: "/images/mia/humanitarian/kogi-12.png",
      caption: "Humanitarian program — community moments",
    },
    {
      src: "/images/mia/humanitarian/idp-04.png",
      caption: "IDP support — field documentation",
    },
    {
      src: "/images/mia/humanitarian/kogi-15.png",
      caption: "Outreach visit — Kogi",
    },
  ],
  blogPosts: [
    {
      date: "April 11, 2026",
      title: "Building Trust in African Businesses Through Measurable Service Delivery",
      excerpt:
        "Why we treat trust like a system you can run on, not a line on a slide, across commerce, ministry, and social impact.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&q=80",
    },
    {
      date: "March 28, 2026",
      title: "One Group, Many Missions: Coordinating Diverse Units with One Standard",
      excerpt:
        "How different teams stay in step when everyone agrees on integrity, excellence, and showing up with discipline.",
      image:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1400&q=80",
    },
    {
      date: "March 15, 2026",
      title: "Service Integration in Action: The AGE Operating Approach",
      excerpt:
        "Inside AGE: production, construction, transport, and appliances in one place, with trust as the default setting.",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1400&q=80",
    },
    {
      date: "February 25, 2026",
      title: "Creative Excellence in Real Estate, Hospitality, and Media",
      excerpt:
        "How Boys Sterling turns good ideas into dependable delivery across property, entertainment, and media.",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80",
    },
  ],
  hiring: {
    heading: "Build Institutions with Us",
    summary:
      "If you are a builder, operator, creative, or community leader who cares about doing things the right way, we would love to hear from you.",
    heroImage:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&q=80",
    roles: [
      {
        title: "Operations Manager",
        location: "Lagos",
        type: "Full-time",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
      },
      {
        title: "Community Programs Lead",
        location: "Abuja",
        type: "Full-time",
        image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1200&q=80",
      },
      {
        title: "Media and Content Strategist",
        location: "Remote",
        type: "Contract",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80",
      },
    ],
  },
  pageImages: {
    about: [
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80",
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1400&q=80",
    ],
    services: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80",
    ],
    contact: [
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&q=80",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=80",
    ],
    careers: [
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1400&q=80",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1400&q=80",
    ],
  },
};

export const brand = defaultSiteContent.brand;
export const businessUnits = defaultSiteContent.businessUnits;
export const serviceAreas = defaultSiteContent.serviceAreas;
export const galleryItems = defaultSiteContent.galleryItems;
export const blogPosts = defaultSiteContent.blogPosts;

export type Brand = {
  name: string;
  tagline: string;
  contactEmail: string;
  phone: string;
  location: string;
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
    image: string;
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

export type SiteContent = {
  brand: Brand;
  hero: HeroContent;
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
    phone: "+234 800 000 0000",
    location: "Lagos, Nigeria",
  },
  hero: {
    headline: "One Group.",
    highlightedText: "Many Institutions. One Standard.",
    subtext:
      "FP Conglomerate unites faith, commerce, media, hospitality, and humanitarian service under a shared operating promise: trusted delivery, responsible leadership, and value that lasts.",
    cta: "Start a Conversation",
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
        "AGE delivers practical value across movie production, construction, transport, devices, and general appliances.",
      details:
        "Anate Grand Empire Solutions (AGE) is positioned as a trust-first operating unit that combines creative, technical, and commercial execution. It helps clients access reliable production support, construction services, transport coordination, and durable appliances under one service umbrella.",
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
            "AGE operates across movie production services, construction support, transport-linked execution, and technology and appliance supply. This blend allows clients to access both creative and practical delivery through one coordinated team.",
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
        "BSC delivers practical value across real estate, hospitality, counseling, construction, and building maintenance.",
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
            "Beyond property and hospitality, BSC delivers counseling support, construction execution, and building maintenance services. This integrated model helps clients maintain both functional spaces and healthy service outcomes over time.",
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
      heroImage:
        "https://images.unsplash.com/photo-1469571486292-b53601020acb?w=1400&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1400&q=80",
        "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1400&q=80",
        "https://images.unsplash.com/photo-1518398046578-8cca57782e17?w=1400&q=80",
      ],
      subPages: [
        {
          slug: "humanitarian-programs",
          title: "Humanitarian Programs",
          summary: "Sincere aid for urgent and long-term community needs.",
          content:
            "Programs are designed to meet urgent realities while restoring long-term hope through education, shelter support, and community-centered assistance.",
          image:
            "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1400&q=80",
        },
        {
          slug: "social-justice",
          title: "Social Justice and Advocacy",
          summary: "Advocacy that protects dignity and amplifies underserved voices.",
          content:
            "Mogadishu Initiative Response works with communities and partners to defend dignity, encourage social justice, and convert compassion into practical action.",
          image:
            "https://images.unsplash.com/photo-1593113630400-ea4288922497?w=1400&q=80",
        },
      ],
    },
  ],
  serviceAreas: [
    {
      title: "AGE Multi-Sector Services",
      summary:
        "Movie production, construction, transport, devices, and general appliance services delivered through Anate Grand Empire Solutions (AGE).",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1400&q=80",
    },
    {
      title: "BSC Real Estate and Support Services",
      summary:
        "Real estate, hospitality, counseling, construction, and building maintenance services delivered through Boys Sterling Company Limited (BSC).",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80",
    },
    {
      title: "Humanitarian and Justice Programs",
      summary:
        "Shelter, education, accommodation support, and social justice interventions through Mogadishu Initiative Response.",
      image:
        "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1400&q=80",
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
      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
      caption: "Executive strategy session",
    },
    {
      src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
      caption: "Urban real estate delivery",
    },
    {
      src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80",
      caption: "Technology and operations hub",
    },
    {
      src: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1200&q=80",
      caption: "Humanitarian response and outreach",
    },
    {
      src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&q=80",
      caption: "Media and storytelling production",
    },
    {
      src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80",
      caption: "Partnership and governance meetings",
    },
    {
      src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80",
      caption: "Leadership consultations",
    },
    {
      src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80",
      caption: "Corporate advisory sessions",
    },
    {
      src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80",
      caption: "Service quality review",
    },
  ],
  blogPosts: [
    {
      date: "April 11, 2026",
      title: "Building Trust in African Businesses Through Measurable Service Delivery",
      excerpt:
        "How the FP group frames trust as an operating system, not a slogan, across commerce, ministry, and social impact work.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&q=80",
    },
    {
      date: "March 28, 2026",
      title: "One Group, Many Missions: Coordinating Diverse Units with One Standard",
      excerpt:
        "A look at how independent units stay aligned through shared principles of integrity, excellence, and disciplined execution.",
      image:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1400&q=80",
    },
    {
      date: "March 15, 2026",
      title: "Service Integration in Action: The AGE Operating Approach",
      excerpt:
        "How Anate Grand Empire Solutions (AGE) combines movie production, construction, transport, and appliance services under one trust-first model.",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1400&q=80",
    },
    {
      date: "February 25, 2026",
      title: "Creative Excellence in Real Estate, Hospitality, and Media",
      excerpt:
        "How Boys Sterling turns ingenuity into dependable delivery across property, entertainment, and media work.",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80",
    },
  ],
  hiring: {
    heading: "Build Institutions with Us",
    summary:
      "We are looking for builders, operators, creatives, and community leaders who can carry trust, integrity, and excellence into daily execution.",
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

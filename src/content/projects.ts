// Case-study content. Overviews and screens describe each live product as it
// appeared on 26 Oct 2026. `role` is supplied by Rahul; design rationale and
// `learnings` stay as placeholders until he provides them — never fill them with guesses.

export type Shot = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  mobile?: boolean;
};

export type StackClaim = {
  name: string;
  evidence: string;
};

export type Decision = {
  title: string;
  /** What is observable in the shipped interface. */
  observed: string;
};

type BaseProject = {
  slug: string;
  name: string;
  url: string;
  category: string;
  summary: string;
  tagline: string;
  platform: string;
  /** Deep tint behind previews, derived from the product's brand colour (site is dark). */
  tint: string;
  tintInk: "light" | "dark";
  stack: StackClaim[];
  /** Small note under the stack in the meta row. */
  stackNote?: string;
  /** Meta-row label for the stack, e.g. "Website platform" when Rahul didn't build it. */
  stackLabel?: string;
  /** null = not yet provided by Rahul. */
  role: string | null;
  /** Unique search title (~60 chars, before " | Rahul Kulathoor") and description (~155 chars). */
  seo: { title: string; description: string };
  /**
   * The project's own brand colours, read from the live site's CSS (named
   * tokens where the site defines them, otherwise computed colours of its
   * backgrounds, buttons and links). Shown in the "Visual direction" section.
   */
  palette?: { name: string; hex: string }[];
  shots: Shot[];
};

/** Case study about a product, written from what the live product shows. */
export type ProductCaseStudy = BaseProject & {
  kind?: "product";
  roleSource?: string;
  facts?: { label: string; value: string; source: string }[];
  overview: string[];
  overviewSource: string;
  problem: { intro: string; points?: string[]; source: string };
  decisions: Decision[];
  learnings: string[] | null;
};

/**
 * Case study about a website Rahul worked on (not the product or company it
 * promotes). Content here is as supplied by Rahul; `role`/`roleDetails`
 * state exactly what he did — e.g. design only, where development was separate.
 */
export type WebsiteCaseStudy = BaseProject & {
  kind: "website";
  projectType: string;
  description: string;
  roleDetails: { title: string; text: string }[];
  figma: {
    title: string;
    description: string;
    /**
     * Folder under /public holding exported Figma frames (.webp/.png/.jpg),
     * shown in filename order. Empty or missing → only the heading shows.
     */
    framesDir: string;
  };
  experience: {
    /** Side label for the section; defaults to "Website experience". */
    label?: string;
    title: string;
    description?: string;
    items: string[];
  };
  /** Optional "Technology Stack" section (from the project's package.json). */
  techStack?: { name: string; use: string }[];
};

type DesignPoint = { title: string; text: string };
export type DesignFrame = { file: string; caption: string };

/**
 * Design-only case study spanning a landing page and a product dashboard
 * (Figma), with interaction design. Development was done by others — the
 * page must never imply implementation.
 */
export type DesignCaseStudy = BaseProject & {
  kind: "design";
  projectType: string;
  description: string;
  roleDetails: DesignPoint[];
  visual: {
    title: string;
    description: string;
    points: DesignPoint[];
  };
  landing: { title: string; description: string };
  /**
   * Galleries read real exports from /public/<framesDir> at build time, in
   * filename order; until files exist they show labelled placeholders.
   */
  dashboard: {
    title: string;
    description: string;
    points: DesignPoint[];
    framesDir: string;
    /** Explicit order + captions for files in framesDir; omit to list the folder in filename order. */
    frames?: DesignFrame[];
    placeholders: number;
  };
  interactions: {
    title: string;
    description: string;
    points: DesignPoint[];
    framesDir: string;
    /** Before → after state pairs (files in framesDir). Shown instead of a plain frame list. */
    pairs?: { title: string; text: string; from: DesignFrame; to: DesignFrame }[];
    placeholders: number;
  };
  outcome: { title: string; text: string };
};

export type Project = ProductCaseStudy | WebsiteCaseStudy | DesignCaseStudy;

const shot = (slug: string, file: string, caption: string, alt: string): Shot => {
  const mobile = file.includes("mobile");
  return {
    src: `/work/${slug}/${file}`,
    width: mobile ? 780 : 2000,
    height: mobile ? 1688 : 1250,
    mobile,
    caption,
    alt,
  };
};

// Role for every case study, as supplied by Rahul.
const ROLE = "UI/UX Design · Visual Design · Frontend Development";

export const projects: Project[] = [
  {
    slug: "lottoposs",
    name: "LottoPoss",
    url: "https://lottoposs.com/",
    seo: {
      title: "LottoPoss — Marketing Website Design & Development",
      description: "Case study: designing and developing the marketing website for LottoPoss, a desktop billing solution for Kerala lottery retailers — UI/UX, visual design and Next.js.",
    },
    // The case study is the marketing website, not the desktop application it promotes.
    kind: "website",
    category: "Marketing website · Desktop software",
    summary: "The marketing website for LottoPoss, a desktop solution built for Kerala lottery retailers.",
    tagline: "Desktop software marketing website",
    projectType: "Desktop Software Marketing Website",
    platform: "Responsive website — desktop, tablet & mobile",
    tint: "#1E1836",
    tintInk: "light",
    // Matches the lottoposs-nextjs project's package.json; Next.js also confirmed by the live site's response headers.
    stack: [
      { name: "Next.js", evidence: "package.json; x-powered-by: Next.js response header" },
      { name: "React", evidence: "package.json" },
      { name: "TypeScript", evidence: "package.json, tsconfig.json" },
      { name: "Tailwind CSS", evidence: "package.json" },
    ],
    stackNote: "Website front end",
    role: ROLE,
    description:
      "Designed and developed the marketing website for LottoPoss, a desktop solution built for Kerala lottery retailers. The website introduces the product, communicates its key features, showcases its benefits, and helps potential customers understand how LottoPoss supports their daily shop operations.",
    roleDetails: [
      {
        title: "UI/UX Design",
        text: "Planned the website structure, user journey, content hierarchy, and page layouts to help visitors understand the product and explore its features.",
      },
      {
        title: "Visual Design",
        text: "Designed the website's visual identity, typography, color palette, section layouts, feature presentations, and responsive design system in Figma.",
      },
      {
        title: "Frontend Development",
        text: "Implemented the website interface using Next.js, React, TypeScript, and Tailwind CSS, with responsive layouts, interactive elements, and animations.",
      },
    ],
    figma: {
      title: "Website Design in Figma",
      description: "Exploring the visual direction, page structure, and interface details behind the LottoPoss marketing website.",
      framesDir: "work/lottoposs/figma",
    },
    experience: {
      title: "Building the Website Experience",
      items: [
        "Product-focused hero section and clear calls to action.",
        "Website sections presenting the desktop software and its key features.",
        "Feature layouts designed for clarity and readability.",
        "Responsive layouts for desktop, tablet, and mobile.",
        "Subtle animations and interactive visual elements.",
        "Clear navigation and conversion-focused page structure.",
      ],
    },
    // lottoposs.com computed colours: primary violet backgrounds, CTA violet, dark sections, tinted surfaces, offer badges.
    palette: [
      { name: "Violet", hex: "#6D28D9" },
      { name: "Bright violet", hex: "#7C3AED" },
      { name: "Midnight", hex: "#0A0818" },
      { name: "Lavender mist", hex: "#F6F5FB" },
      { name: "Highlight yellow", hex: "#FACC15" },
    ],
    shots: [
      shot("lottoposs", "01.webp", "Hero — “Your entire lottery business, one screen.”", "LottoPoss website hero with a violet Kerala skyline illustration"),
      shot("lottoposs", "02.webp", "Built for Kerala section", "Website section introducing lottery shops, agents and counter staff"),
      shot("lottoposs", "03.webp", "Daily workflow section", "Website section presenting the opening-stock feature"),
      shot("lottoposs", "04.webp", "The problem section", "Website section with three photos of manual lottery record keeping"),
      shot("lottoposs", "05.webp", "Pricing section", "Website pricing table with Starter, Growth and Multi-Shop plans"),
      shot("lottoposs", "06.webp", "Mobile app section", "Dark website section previewing the LottoPoss mobile app"),
      shot("lottoposs", "07-mobile.webp", "Mobile — homepage hero", "LottoPoss website on a mobile screen"),
    ],
  },
  {
    slug: "purple-dotts",
    name: "Purple Dotts",
    url: "https://purpledotts.com/",
    seo: {
      title: "Purple Dotts — Corporate Website UI/UX & Motion Design",
      description: "Case study: UI/UX, visual and motion design for the Purple Dotts corporate website — information architecture, Figma designs for every page and motion-led interactions.",
    },
    // Design-only engagement: Rahul did UI/UX, visual and motion design (Figma for all
    // pages). Frontend development and the WordPress backend were handled separately.
    kind: "website",
    category: "Corporate website · Technology company",
    summary: "Corporate website design for a technology company connecting business systems, people and data.",
    tagline: "Corporate website design",
    projectType: "Corporate Website Design",
    platform: "Responsive website",
    tint: "#22142C",
    tintInk: "light",
    stack: [{ name: "WordPress", evidence: "generator meta tag and wp-content asset paths on the live site" }],
    stackLabel: "Website platform",
    stackNote: "Development handled separately",
    role: "UI/UX Design · Visual Design · Motion Design",
    description:
      "Designed the Purple Dotts corporate website to communicate the company's vision, showcase its digital products and solutions, and present its services through a cohesive and engaging digital experience. The design focused on clear content hierarchy, modern visual storytelling, and motion-led interactions.",
    roleDetails: [
      {
        title: "UI/UX Design",
        text: "Designed the information architecture, page layouts, navigation, content hierarchy, and user experience across the website's pages.",
      },
      {
        title: "Visual Design",
        text: "Created the website's visual direction, typography, color usage, section layouts, reusable design patterns, and high-fidelity Figma designs for all pages.",
      },
      {
        title: "Motion Design",
        text: "Designed animated interactions, motion concepts, and transitions to make the website feel more dynamic and engaging while maintaining a consistent visual experience.",
      },
    ],
    figma: {
      title: "Website Design in Figma",
      description:
        "From page structure to high-fidelity interfaces, the design brings together a consistent visual system across the Purple Dotts website.",
      // e.g. 01-homepage.webp, 02-about.webp, 03-solutions.webp, 04-case-studies.webp, 05-insights.webp, 06-contact.webp
      framesDir: "work/purple-dotts/figma",
    },
    experience: {
      title: "Crafting a Cohesive Digital Experience",
      description:
        "The design combines structured content, expressive visual elements, and purposeful motion to present Purple Dotts' capabilities in a clear and engaging way.",
      items: [
        "Consistent UI design across all website pages.",
        "Clear content hierarchy for company information, solutions, products, and case studies.",
        "Modern visual storytelling and distinctive section layouts.",
        "Motion concepts, animated transitions, and interactive visual elements.",
        "Consistent typography, spacing, colors, and reusable design patterns.",
        "Responsive design considerations for different screen sizes.",
      ],
    },
    // purpledotts.com CSS: --purple-primary, --purple-deep, --bg-dark; plum stats banner; light section ground.
    palette: [
      { name: "Electric purple", hex: "#A900FF" },
      { name: "Deep purple", hex: "#28118F" },
      { name: "Plum", hex: "#3B0B5E" },
      { name: "Black", hex: "#000000" },
      { name: "Mist", hex: "#F5F5F5" },
    ],
    shots: [
      shot("purple-dotts", "01.webp", "Hero — “Connecting the dots behind every growing business”", "Purple Dotts dark hero with scattered glowing purple dots"),
      shot("purple-dotts", "02.webp", "Narrative — growth creates complexity", "A single purple dot in concentric circles beside the heading Growth Creates Complexity"),
      shot("purple-dotts", "03.webp", "Narrative — complexity lives between the dots", "Dot network connecting people, platforms, data and processes"),
      shot("purple-dotts", "04.webp", "Solutions — six capabilities", "Dark grid of six capability cards"),
      shot("purple-dotts", "05.webp", "Trusted technology and case studies", "Purple stats banner above case-study cards with device mockups"),
      shot("purple-dotts", "06.webp", "Insights", "Blog section titled Fresh from Purple Dotts"),
      shot("purple-dotts", "07.webp", "Closing call to action and footer", "Dark footer with the question Ready to simplify complexity"),
      shot("purple-dotts", "08-mobile.webp", "Mobile — homepage hero", "Purple Dotts homepage on a mobile screen"),
    ],
  },
  {
    slug: "rc-marketspace",
    name: "RC Marketspace",
    url: "https://rcmarketspace.com/",
    seo: {
      title: "RC Marketspace — Marketplace Website UI/UX Design",
      description: "Case study: UI/UX and visual design for RC Marketspace, a global marketplace for buying and selling RC models — product discovery, listing layouts and consistent browsing.",
    },
    // Design-only engagement: Rahul did UI/UX and visual design. Website development,
    // marketplace functionality and the backend were handled separately.
    // category/summary are left as-is: the homepage card reads them.
    kind: "website",
    category: "Marketplace · Hobby community",
    summary: "A free global marketplace for buying and selling RC jets, planes, helicopters, cars, boats and parts.",
    tagline: "Online marketplace website design",
    projectType: "Online Marketplace Website Design",
    platform: "Responsive marketplace website",
    tint: "#122030",
    tintInk: "light",
    stack: [
      { name: "React", evidence: "React DOM runtime and createRoot in the live site's production bundle" },
      { name: "Vite", evidence: "single hashed /assets/index-*.js module entry with a #root mount" },
    ],
    stackLabel: "Website stack",
    stackNote: "Development handled separately",
    role: "UI/UX Design · Visual Design",
    description:
      "Designed the user experience and visual interface for RC Marketspace, an online marketplace dedicated to buying and selling RC models. The design focuses on making product discovery intuitive, presenting listings clearly, and creating a consistent browsing experience for the RC community.",
    roleDetails: [
      {
        title: "UI/UX Design",
        text: "Designed the website's information architecture, page layouts, navigation, and user journeys, with a focus on helping users browse and discover RC model listings.",
      },
      {
        title: "Visual Design",
        text: "Created the visual direction, typography, color usage, content layouts, and interface styling to establish a cohesive and easy-to-navigate marketplace experience.",
      },
    ],
    figma: {
      title: "Website Design in Figma",
      description:
        "Designed the marketplace interface with a focus on product discovery, clear listing presentation, and a consistent visual experience across the website.",
      // e.g. 01-homepage.webp, 02-browse-listings.webp, 03-product-detail.webp, 04-search-filters.webp
      framesDir: "work/rc-marketspace/figma",
    },
    experience: {
      label: "Marketplace experience",
      title: "Designing the Marketplace Experience",
      description:
        "The design aims to make exploring an RC marketplace feel straightforward and engaging, with clear content hierarchy, well-organized listings, and a consistent interface.",
      items: [
        "Clear visual hierarchy for marketplace content.",
        "Readable product listing layouts.",
        "Intuitive browsing and navigation patterns.",
        "Consistent typography, spacing, and visual styling.",
        "Responsive design considerations across screen sizes.",
        "A cohesive experience suited to an RC enthusiast community.",
      ],
    },
    // rcmarketspace.com computed colours: navy sections, CTA/link blue, hero sky, page ground, text.
    palette: [
      { name: "Navy", hex: "#011C42" },
      { name: "Sky blue", hex: "#1795E2" },
      { name: "Ice blue", hex: "#CFE3F5" },
      { name: "Cloud", hex: "#F9FAFB" },
      { name: "Ink", hex: "#141414" },
    ],
    shots: [
      shot("rc-marketspace", "01.webp", "Hero — search-first marketplace", "RC Marketspace hero with a jet over mountains and a three-field search bar"),
      shot("rc-marketspace", "02.webp", "Browse by category", "Row of category tiles for planes, jets, turbines and transmitters"),
      shot("rc-marketspace", "03.webp", "Sponsored spotlight and featured listing", "Sponsored RC listings with photos, location and price"),
      shot("rc-marketspace", "04.webp", "Fresh from the marketplace", "Grid of recent RC listings"),
      shot("rc-marketspace", "05.webp", "Trust — escrow, global reach, always active", "Section titled A world built on RC passion with three trust features"),
      shot("rc-marketspace", "06.webp", "Forum and RC networks", "Forum promotion above media and trusted partner logos"),
      shot("rc-marketspace", "07.webp", "App download section and newsletter", "Website section promoting the app downloads, with an RC plane and car"),
      shot("rc-marketspace", "08-mobile.webp", "Mobile web — homepage hero", "RC Marketspace website on a mobile screen"),
    ],
  },
  {
    slug: "dip-trading",
    name: "DIP Trading",
    url: "https://dip.trading/",
    seo: {
      title: "DIP Trading — Fintech Dashboard & Landing Page Design",
      description: "Case study: landing page and dashboard UI/UX design for DIP Trading, a digital investment platform — black-and-gold visual design, financial data hierarchy and interactions.",
    },
    // Design-only: Rahul designed the landing page and dashboard (UI/UX, visual,
    // interaction) in Figma. Development was done separately — never claim it.
    // The summary is left as-is: the homepage card reads it.
    kind: "design",
    category: "Fintech · Investment Platform",
    summary: "A digital revenue participation platform, designed to present investment data as a calm, decision-friendly experience.",
    tagline: "Landing page & dashboard design",
    projectType: "Landing Page & Dashboard Design",
    platform: "Web platform & dashboard",
    tint: "#221C12",
    tintInk: "light",
    stack: [{ name: "Next.js", evidence: "x-powered-by: Next.js and x-nextjs-cache response headers on the live site" }],
    stackLabel: "Live site built with",
    stackNote: "Development handled separately",
    role: "UI/UX Design · Visual Design · Interaction Design",
    description:
      "DIP Trading is a digital investment platform designed to bring clarity and structure to a complex financial experience. I designed the landing page and dashboard experience with a premium black-and-gold visual language, focusing on clear information hierarchy, intuitive navigation, and meaningful interactions.",
    roleDetails: [
      { title: "UI/UX Design", text: "Shaped the experience across the complete landing page and dashboard, from structure to final screens." },
      { title: "Visual design & direction", text: "Set the black-and-gold visual language, typography and interface details used throughout the project." },
      { title: "Landing page design", text: "Designed the complete landing page in Figma." },
      { title: "Dashboard interface design", text: "Designed the dashboard interface in Figma." },
      { title: "Interaction design", text: "Designed the interactions and UI states for the different dashboard areas." },
      { title: "Flows & usability", text: "Worked through user flows, interface hierarchy and usability considerations across both experiences." },
    ],
    visual: {
      title: "A premium black-and-gold design language",
      description:
        "A dark interface lets financial information carry the page, while a single gold accent signals what matters. The same visual system runs through the landing page and the dashboard.",
      points: [
        { title: "Dark interface", text: "Near-black surfaces keep the interface calm and let data, charts and key actions stand out." },
        { title: "Gold accents", text: "Gold is used sparingly, for emphasis, highlights and key figures, so it keeps its weight." },
        { title: "Typography", text: "Refined, restrained type gives headings and figures a clear order without decoration." },
        { title: "Contrast & spacing", text: "Generous spacing and strong contrast build a visual hierarchy that is easy to scan." },
      ],
    },
    // dip.trading CSS: --bg-dark, --bg-card, --gold, --gold-light; #BCA15E is the gold used on text and CTAs.
    palette: [
      { name: "Black", hex: "#050505" },
      { name: "Card", hex: "#101010" },
      { name: "Gold", hex: "#BCA15E" },
      { name: "Rich gold", hex: "#D4A44A" },
      { name: "Light gold", hex: "#DFBF57" },
    ],
    landing: {
      title: "Landing Page Design",
      description:
        "The complete landing page, designed in Figma, introduces the platform and its participation model in the same black-and-gold language as the product. Screens below are from the live site built from the design.",
    },
    dashboard: {
      title: "Dashboard UI/UX Design",
      description:
        "The dashboard is the core of the experience: an overview of portfolio performance, with dedicated screens for earnings and activity, investment plans and withdrawals.",
      // Grounded in the Figma exports in /public/work/dip-trading/dashboard.
      points: [
        {
          title: "Information hierarchy",
          text: "Key figures — portfolio value, available balance, total returns and active investments — lead as summary cards, with charts and recent activity beneath.",
        },
        {
          title: "Navigation",
          text: "A persistent sidebar groups Finance and Account areas, while primary actions — Withdraw and New Investment — sit at the top of the dashboard.",
        },
        {
          title: "Financial data presentation",
          text: "Transaction charts, an ROI gauge, a portfolio breakdown and start-to-maturity progress make the numbers quick to read.",
        },
        {
          title: "Interface consistency",
          text: "The same dark cards, gold accents and outlined icon tiles carry through the dashboard, finance, investment and withdrawal screens.",
        },
      ],
      framesDir: "work/dip-trading/dashboard",
      frames: [
        { file: "Dashboard.webp", caption: "Dashboard overview — portfolio, returns and activity" },
        { file: "finance.webp", caption: "Earnings & activity — income, returns and transaction history" },
        { file: "investment3-plan.webp", caption: "Investment plans — choose and compare packages" },
        { file: "investment-packages-3compare.webp", caption: "Compare plans — side-by-side comparison panel" },
        { file: "withdra-funds.webp", caption: "Withdraw funds — payment method, amount and summary" },
        { file: "otp-verification.webp", caption: "Identity verification — OTP before a withdrawal" },
      ],
      placeholders: 3,
    },
    interactions: {
      title: "Interaction Design",
      description:
        "Key dashboard tasks were designed as clear sequences of states — from choosing and comparing investment plans to verifying a withdrawal.",
      // Grounded in the plan-compare and withdraw/OTP frames.
      points: [
        { title: "Navigation", text: "Back links and numbered steps guide people through multi-step tasks like withdrawals." },
        { title: "Clarity", text: "Selected states — the chosen payment method, active filters and added plans — are clearly marked." },
        { title: "Feedback", text: "Quick-select amounts, a live withdrawal summary and a resend-OTP timer respond as people act." },
        { title: "Smoother experience", text: "Comparison and verification open as overlays above a dimmed page, so people keep their place." },
      ],
      framesDir: "work/dip-trading/dashboard",
      pairs: [
        {
          title: "Choose and compare plans",
          text: "Plans added from the cards collect in a tray; Compare Plans opens a side-by-side panel over the page.",
          from: { file: "investment3-plan.webp", caption: "Plans selected" },
          to: { file: "investment-packages-3compare.webp", caption: "Comparison panel" },
        },
        {
          title: "Secure withdrawal",
          text: "A three-step withdrawal form leads into an identity check, with a one-time code before funds move.",
          from: { file: "withdra-funds.webp", caption: "Withdrawal form" },
          to: { file: "otp-verification.webp", caption: "OTP verification" },
        },
      ],
      placeholders: 4,
    },
    outcome: {
      title: "Design Outcome",
      text: "A cohesive design across the DIP Trading landing page and dashboard: one black-and-gold visual system, a clear hierarchy for financial information, and interaction design that carries through the dashboard experience.",
    },
    shots: [
      shot("dip-trading", "01.webp", "Hero — live orders activity", "DIP dark hero with a gold live orders chart"),
      shot("dip-trading", "02.webp", "Revenue participation model", "Cards describing four participation models next to revenue stream status bars"),
      shot("dip-trading", "03.webp", "About — the future of digital participation", "About section with a 3D coin graphic"),
      shot("dip-trading", "04.webp", "Testimonials", "Member testimonial carousel on a dark background"),
      shot("dip-trading", "05.webp", "Join call to action and footer", "Email sign-up card and footer"),
      shot("dip-trading", "06-mobile.webp", "Mobile — homepage hero", "DIP homepage on a mobile screen"),
    ],
  },
  {
    slug: "vakmi",
    name: "Vakmi",
    url: "https://vakmi.app/",
    seo: {
      title: "Vakmi — Product Website Design & Development",
      description: "Case study: designing and developing the Vakmi website for a voice-to-text product in 22+ Indian languages — UI/UX, visual and motion design, built with Next.js.",
    },
    // Rahul designed and built the website (design + frontend + motion).
    // category/summary are left as-is: the homepage card reads them.
    kind: "website",
    category: "AI product · Voice to text",
    summary: "An AI voice-to-text assistant: speak in any of 22+ Indian languages and get polished, professional writing.",
    tagline: "Product website design & development",
    projectType: "Product Website Design & Development",
    platform: "Responsive website — desktop, tablet & mobile",
    tint: "#1B1F12",
    tintInk: "light",
    // Matches the vakmi project's package.json; Next.js also confirmed by the live site's response headers.
    stack: [
      { name: "Next.js", evidence: "package.json; x-powered-by: Next.js response header" },
      { name: "React", evidence: "package.json" },
      { name: "TypeScript", evidence: "package.json, tsconfig.json" },
      { name: "Tailwind CSS", evidence: "package.json, postcss.config.mjs" },
    ],
    stackNote: "Website front end",
    role: "UI/UX Design · Visual Design · Frontend Development · Motion Design",
    description:
      "Designed and developed the Vakmi website, presenting a voice-to-text product built to make multilingual typing easier. The experience combines clear product storytelling, a modern visual direction, responsive layouts, and subtle motion to communicate the product's value and guide visitors through its features.",
    roleDetails: [
      {
        title: "UI/UX Design",
        text: "Planned the website structure, information architecture, user journeys, and page layouts to communicate the product clearly.",
      },
      {
        title: "Visual Design",
        text: "Created the visual direction, typography, color system, reusable interface patterns, and polished website sections.",
      },
      {
        title: "Frontend Development",
        text: "Implemented the responsive website using Next.js, React, TypeScript, and Tailwind CSS, translating the designs into working interfaces.",
      },
      {
        title: "Motion Design",
        text: "Created animated transitions, interactive elements, and smooth visual movements to make the browsing experience more engaging.",
      },
    ],
    figma: {
      title: "Website Design in Figma",
      description:
        "From the initial visual direction to polished website sections, the design balances product clarity, distinctive branding, and a smooth browsing experience.",
      // e.g. 01-homepage.webp, 02-features.webp, 03-languages.webp, 04-pricing.webp
      framesDir: "work/vakmi/figma",
    },
    experience: {
      title: "Building the Vakmi Experience",
      description:
        "The website brings together product storytelling, clear feature presentation, responsive implementation, and purposeful motion to introduce Vakmi to its audience.",
      // Each item is visible on vakmi.app; motion/smooth scrolling are backed by framer-motion and lenis in the repo.
      items: [
        "Product-focused hero section and clear calls to action.",
        "Feature sections explaining the voice-to-text experience.",
        "Language and product capability presentation.",
        "Pricing and conversion-focused sections.",
        "Responsive layouts for desktop, tablet, and mobile.",
        "Animated transitions and interactive visual elements.",
        "Smooth scrolling and carefully timed motion effects.",
      ],
    },
    techStack: [
      { name: "Next.js", use: "Framework" },
      { name: "React", use: "UI library" },
      { name: "TypeScript", use: "Language" },
      { name: "Tailwind CSS", use: "Styling" },
      { name: "Framer Motion", use: "Animation" },
      { name: "Lenis", use: "Smooth scrolling" },
    ],
    // vakmi.app CSS: --color-brand, --color-brand-light, --color-cream, --color-sage-soft, --color-ink.
    palette: [
      { name: "Olive", hex: "#74801B" },
      { name: "Light olive", hex: "#A8B23A" },
      { name: "Cream", hex: "#F7F5E9" },
      { name: "Sage", hex: "#EDEED8" },
      { name: "Ink", hex: "#1D1E19" },
    ],
    shots: [
      shot("vakmi", "01.webp", "Hero — “Think in your language, we do the rest”", "Vakmi cream hero with an olive green headline"),
      shot("vakmi", "02.webp", "See it in action — voice to polished text", "Dark demo panel turning Malayalam voice input into English text"),
      shot("vakmi", "03.webp", "22 Indian languages, one voice", "Language selector over a softly blurred photo"),
      shot("vakmi", "04.webp", "Voice in, confidence out — speak naturally", "Step one of the walkthrough with Malayalam speech on a card"),
      shot("vakmi", "05.webp", "Sound like you — tone selection", "Tone chips for Professional, Friendly and Concise"),
      shot("vakmi", "06.webp", "Pricing — Basic and Pro", "Two pricing cards, Basic at ₹0 and Pro at ₹1,499 a month"),
      shot("vakmi", "07.webp", "FAQ", "Accordion of common questions"),
      shot("vakmi", "08-mobile.webp", "Mobile — homepage hero", "Vakmi homepage on a mobile screen"),
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const getNextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};

export const coverShot = (p: Project) => p.shots[0];
export const mobileShot = (p: Project) => p.shots.find((s) => s.mobile);

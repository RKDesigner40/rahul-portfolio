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

export type Project = ProductCaseStudy | WebsiteCaseStudy;

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
    category: "Fintech · Dashboard & UX strategy",
    summary: "A digital revenue participation platform, designed to present investment data as a calm, decision-friendly experience.",
    tagline: "Making complex financial information clear.",
    platform: "Web platform & dashboard",
    tint: "#221C12",
    tintInk: "light",
    stack: [{ name: "Next.js", evidence: "x-powered-by: Next.js and x-nextjs-cache response headers" }],
    role: ROLE,
    facts: [
      { label: "Timeline", value: "4 weeks", source: "Previous portfolio case study" },
      { label: "Deliverables", value: "Research, flows, UI system, prototype", source: "Previous portfolio case study" },
      { label: "Process", value: "Discovery → Research → Wireframes → UI Design → Prototype → Handoff", source: "Previous portfolio case study" },
    ],
    overview: [
      "DIP presents itself as a digital revenue ecosystem, where participants share in revenue from digital commerce, online services and advertising.",
      "The design aim was to present investment data as a calm, decision-friendly experience that builds confidence over the long term.",
    ],
    overviewSource: "dip.trading and the previous portfolio case study",
    problem: {
      intro:
        "Design an investment platform that makes complex financial information clear and easy to use — building trust, reducing cognitive load and helping people make informed decisions with confidence.",
      source: "Previous portfolio case study",
    },
    decisions: [
      {
        title: "Live data above the fold",
        observed: "The hero leads with a “Live Orders Activity” chart and time filters rather than marketing imagery.",
      },
      {
        title: "A restrained dark palette with one accent",
        observed: "Near-black surfaces with a single gold accent reserved for key figures, chart lines and emphasis.",
      },
      {
        title: "The model explained in modules",
        observed:
          "Digital Commerce, Advertising Participation, Revenue Sharing and Referral Network each get a card, next to a panel showing each revenue stream's status.",
      },
    ],
    learnings: null,
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

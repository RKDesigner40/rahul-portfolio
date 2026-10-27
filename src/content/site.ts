// Personal content. Everything here comes from rahulkulathoor.framer.website
// unless marked otherwise — don't add claims that Rahul hasn't confirmed.

export const profile = {
  shortName: "Rahul Kulathoor",
  name: "Rahul Kulathoor",
  role: "UI/UX Designer",
  tagline: "Designing digital experiences people love.",
  // Hero description, as supplied by Rahul.
  intro:
    "I’m Rahul Kulathoor, a UI/UX Designer crafting intuitive digital experiences through thoughtful design and interaction.",
  about: [
    "I'm a UI/UX designer with over ten years of experience helping businesses turn complex ideas into intuitive, usable and modern interfaces.",
    "My background spans wireframes, prototypes, visual design and front-end implementation, which means I design with how things get built in mind.",
  ],
  status: "Available for freelance and select collaborations",
  location: "India — working globally",
  yearsExperience: "10+",
  email: "rkdesignux@gmail.com",
  // Destination of the "Email Me" link in the contact section (never shown as text).
  contactEmail: "rahulk4060@gmail.com",
  // WhatsApp number for the floating chat button: country code + number, digits only
  // (no "+", spaces or dashes). Used only in the wa.me link, never shown as text.
  whatsappNumber: "919746584060",
  links: {
    linkedin: "https://www.linkedin.com/in/rahul-kulathoor",
    behance: "https://www.behance.net/rahulkulathoor",
    // Served from /public/resume; links use the `download` attribute so it saves directly.
    resume: "/resume/Rahul_K_A_UI_UX.pdf",
  },
} as const;

export type ExperienceItem = {
  period: string;
  role: string;
  company: string;
  place: string;
  summary: string;
};

export const experience: ExperienceItem[] = [
  {
    period: "Oct 2025 — Present",
    role: "Independent UI/UX Design Partner",
    company: "Freelance",
    place: "Remote",
    summary: "Design partner for digital product teams.",
  },
  {
    period: "Feb 2020 — Oct 2025",
    role: "UI/UX Designer",
    company: "Centelon Solutions",
    place: "Kochi, Kerala",
    summary: "Wireframes, prototypes, visual design and front-end implementation for web and mobile.",
  },
  {
    period: "Jul 2017 — Feb 2020",
    role: "UI Designer",
    company: "ISPG Technologies",
    place: "Kochi, Kerala",
    summary: "Web and mobile layouts, wireframes and prototypes.",
  },
  {
    period: "Oct 2014 — Jun 2017",
    role: "UI Designer / Developer",
    company: "Webovasoft",
    place: "Changanacherry, Kerala",
    summary: "Website design, HTML/CSS implementation and graphic design support.",
  },
  {
    period: "May 2012 — Jun 2013",
    role: "UI Designer",
    company: "DD Infoways",
    place: "Kottayam, Kerala",
    summary: "Website layouts, wireframes, prototypes and responsive mobile views.",
  },
  {
    period: "Feb 2012 — Mar 2013",
    role: "UI Designer / Developer",
    company: "Consolidated Solutions",
    place: "Changanacherry, Kerala",
    summary: "Website designs and front-end HTML, working alongside developers.",
  },
];

// Grouped from the responsibilities listed in the experience history above.
export const skills = [
  {
    group: "Product & UX",
    items: ["Product design", "UX strategy", "User flows", "Wireframing", "Prototyping"],
  },
  {
    group: "Interface",
    items: ["Visual & UI design", "Dashboard design", "Responsive web & mobile", "Design systems"],
  },
  {
    group: "Build",
    items: ["HTML & CSS implementation", "Next.js", "Tailwind CSS", "Developer handoff", "Graphic design support"],
  },
];

// As supplied by Rahul.
export const aiTools = {
  label: "AI tools & workflow",
  title: "AI-Assisted Design & Development",
  items: [
    { name: "ChatGPT", use: "Research, UX ideation, content refinement" },
    { name: "Claude", use: "UI development, code assistance, problem-solving" },
    { name: "Google Antigravity", use: "AI-assisted website development" },
    { name: "OpenAI Codex", use: "Code generation, debugging, development tasks" },
  ],
};

// Process phases as listed on the DIP case study of the previous portfolio.
export const process = [
  { step: "Discovery", text: "Understand the business, the people involved and what success needs to look like." },
  { step: "Research", text: "Look at users, competitors and constraints before committing to a direction." },
  { step: "Wireframes", text: "Map flows and structure in low fidelity, so decisions stay cheap to change." },
  { step: "UI Design", text: "Shape the visual language, components and states across every breakpoint." },
  { step: "Prototype", text: "Make it clickable to test the flow and align the team on behaviour." },
  { step: "Handoff", text: "Specs, assets and tokens that developers can build from with confidence." },
];

export const tools = [
  { name: "ChatGPT", logo: "/logos/chatgpt.svg" },
  { name: "Google Antigravity", logo: "/logos/antigravity-mark.svg" },
  { name: "Claude", logo: "/logos/claude.svg" },
  { name: "Adobe Firefly", logo: "/logos/firefly-mono.svg" },
  { name: "Figma", logo: "/logos/figma.svg" },
  { name: "Photoshop", logo: "/logos/photoshop-mono.svg" },
  { name: "Illustrator", logo: "/logos/illustrator.svg" },
  { name: "VS Code", logo: "/logos/vscode.svg" },
] as const;

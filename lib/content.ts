export type Category = "Film" | "Commercial" | "Documentary" | "Culture" | "Post";

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  category: Category;
  role: string;
  summary: string;
  description: string;
  services: string[];
  credits: string[];
  awards?: string[];
  cover: string;
  poster: string;
  teaser: string;
  video: {
    muxPlaybackId?: string;
    vimeoUrl?: string;
    youtubeUrl?: string;
    directMp4?: string;
    directWebm?: string;
    googleDrivePreviewUrl?: string;
    externalUrl?: string;
    captions?: string;
  };
  order: number;
  visible: boolean;
};

export const siteCopy = {
  headline: "DEFLICK / PRODUCTION + POST",
  intro:
    "Independent production and post-production studio working across film, commercials, documentaries and cultural projects.",
  capability: "From first treatment to final master.",
  company:
    "DeFlick is a compact production and post house built for directors, brands and cultural institutions that need the work to feel authored from the first treatment to the final master.",
  email: "info@deflick.com",
  location: "Yerevan / Dubai / remote",
  portfolioUrl: "https://drive.google.com/drive/folders/1MFVtgtpsBuOWQX2C1ZdNML1yzmv3w9QY?usp=sharing",
  showreelUrl: "https://drive.google.com/file/d/1PgbHhn2IG8BE6hos-hox7ESjkinRtTkD/view?usp=drive_link",
  showreelPreviewUrl: "https://drive.google.com/file/d/1PgbHhn2IG8BE6hos-hox7ESjkinRtTkD/preview",
  socials: {
    instagram: "https://www.instagram.com/deflick.production/",
    facebook: "https://fb.com/deflick.production",
    vimeo: "",
    linkedin: ""
  }
};

export const capabilities = [
  "Production",
  "Post-production",
  "Editing",
  "Color",
  "Commercial films",
  "Documentaries",
  "Cultural projects",
  "Distribution and festival promotion"
];

export const clients = [
  { name: "Mercedes-Benz Fashion Week Moscow", visible: true },
  { name: "MTS 4G", visible: true },
  { name: "7UP", visible: true },
  { name: "GAP", visible: true },
  { name: "Golden Apricot International Film Festival", visible: true },
  { name: "Kochar Museum", visible: true },
  { name: "National Museum of Armenia", visible: true }
];

const posterA =
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1800&q=80";
const posterB =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80";
const posterC =
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1800&q=80";
const posterD =
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1800&q=80";

const projectRecords: Project[] = [
  {
    slug: "deflick-showreel",
    title: "DeFlick Showreel",
    client: "DeFlick Production",
    year: "Portfolio reel",
    category: "Film",
    role: "Production + post",
    summary: "The supplied DeFlick showreel is now wired as the first portfolio entry.",
    description:
      "This entry uses the owner-supplied Google Drive showreel link as a temporary playback source. For production-grade adaptive streaming, replace it with Mux, Vimeo or a direct MP4/WebM master after upload.",
    services: ["Production", "Post-production", "Editing", "Color"],
    credits: ["DeFlick Production"],
    cover: "/assets/deflick-logo.jpg",
    poster: "/assets/deflick-logo.jpg",
    teaser: "/assets/deflick-logo.jpg",
    video: {
      googleDrivePreviewUrl: siteCopy.showreelPreviewUrl,
      externalUrl: siteCopy.showreelUrl
    },
    order: 0,
    visible: true
  },
  {
    slug: "fashion-week-motion",
    title: "Fashion Week Motion",
    client: "Mercedes-Benz Fashion Week Moscow",
    year: "Verified client candidate",
    category: "Commercial",
    role: "Production + post",
    summary: "A high-contrast fashion film placeholder ready for verified final materials.",
    description:
      "This record is intentionally conservative. It is editable from the admin model and should be replaced with verified stills, film links, credits and exact dates before public case-study claims are expanded.",
    services: ["Production", "Editing", "Color"],
    credits: ["DeFlick Production"],
    cover: posterA,
    poster: posterA,
    teaser: posterA,
    video: {},
    order: 1,
    visible: true
  },
  {
    slug: "mts-4g-signal",
    title: "MTS 4G Signal",
    client: "MTS 4G",
    year: "Verified client candidate",
    category: "Commercial",
    role: "Post-production",
    summary: "Telecom campaign record prepared for verified video and final client details.",
    description:
      "Use this page as a modular case shell: add the main film, final images, production notes and credits only after the materials are verified.",
    services: ["Editing", "Color", "Delivery"],
    credits: ["DeFlick Production"],
    cover: posterB,
    poster: posterB,
    teaser: posterB,
    video: {},
    order: 2,
    visible: true
  },
  {
    slug: "golden-apricot-culture",
    title: "Golden Apricot Culture",
    client: "Golden Apricot International Film Festival",
    year: "Verified client candidate",
    category: "Culture",
    role: "Production support",
    summary: "Cultural partner page prepared for verified festival materials.",
    description:
      "The page supports festival notes, galleries, awards and embeds, but no unverified awards or project descriptions are claimed.",
    services: ["Production", "Festival promotion"],
    credits: ["DeFlick Production"],
    cover: posterC,
    poster: posterC,
    teaser: posterC,
    video: {},
    order: 3,
    visible: true
  },
  {
    slug: "museum-image-system",
    title: "Museum Image System",
    client: "Kochar Museum / National Museum of Armenia",
    year: "Verified client candidate",
    category: "Documentary",
    role: "Production + post",
    summary: "Museum and heritage project shell for verified documentary content.",
    description:
      "Designed for short company context, image galleries, behind-the-scenes material and external video embeds when the verified materials are ready.",
    services: ["Documentary production", "Editing", "Color"],
    credits: ["DeFlick Production"],
    cover: posterD,
    poster: posterD,
    teaser: posterD,
    video: {},
    order: 4,
    visible: true
  },
  {
    slug: "post-production-room",
    title: "Post Production Room",
    client: "DeFlick",
    year: "2026",
    category: "Post",
    role: "Editing + color",
    summary: "A capability-led page for editing, grade and final delivery.",
    description:
      "A studio-owned project entry that can be replaced by a verified showreel or post-production breakdown.",
    services: ["Editing", "Color", "Final master"],
    credits: ["DeFlick Production"],
    cover: posterA,
    poster: posterA,
    teaser: posterA,
    video: {},
    order: 5,
    visible: true
  },
  {
    slug: "commercial-cut",
    title: "Commercial Cut",
    client: "7UP / GAP",
    year: "Verified client candidate",
    category: "Commercial",
    role: "Production + post",
    summary: "Commercial case shell for verified campaign assets.",
    description:
      "This starter record keeps the client candidate visible but avoids invented claims. Replace with exact deliverables after verification.",
    services: ["Production", "Post-production", "Delivery"],
    credits: ["DeFlick Production"],
    cover: posterB,
    poster: posterB,
    teaser: posterB,
    video: {},
    order: 6,
    visible: true
  }
];

export const projects: Project[] = projectRecords.sort((a, b) => a.order - b.order);

export const categories = ["All", ...Array.from(new Set(projects.map((project) => project.category)))];

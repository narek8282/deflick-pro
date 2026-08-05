export type Category =
  | "FILMMAKING"
  | "TRAILERS"
  | "COMMERCIAL"
  | "MUSIC VIDEOS"
  | "ANIMATION"
  | "DOCUMENTARY";

export type Project = {
  slug: string;
  title: string;
  symbol: string;
  client: string;
  year: string;
  audience: string;
  category: Category;
  role: string;
  summary: string;
  description: string;
  services: string[];
  technical: string[];
  backstage: string;
  vfx: string;
  color: string;
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
  headline: "WE MAKE\nFILMS MOVE.",
  intro: "Commercials, cinema, music videos, animation and documentary work from Yerevan.",
  capability: "From development to final master.",
  company:
    "DeFlick Production is a Yerevan studio for film, commercials, trailers, music videos, animation and documentary work.",
  email: "info@deflick.com",
  location: "ARMENIA, YEREVAN",
  address: "Manushian 4 house, 0012",
  phone: "+374 41 313-539",
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
  "Film making",
  "Trailer house",
  "Commercial",
  "Music videos",
  "Animation",
  "Doc. films"
];

export const clients = [
  { name: "MTS", visible: true },
  { name: "Golden Apricot", visible: true },
  { name: "7UP", visible: true },
  { name: "SAMP", visible: true },
  { name: "ABSOLUT.", visible: true },
  { name: "Mercedes-Benz", visible: true },
  { name: "Kochar Museum", visible: true },
  { name: "GAP", visible: true },
  { name: "M&S", visible: true }
];

export const categoryTiles = [
  {
    title: "MUSIC VIDEOS",
    number: "01",
    category: "MUSIC VIDEOS" as Category,
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
    wide: false
  },
  {
    title: "FILMMAKING",
    number: "02",
    category: "FILMMAKING" as Category,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    wide: true
  },
  {
    title: "COMMERCIAL",
    number: "03",
    category: "COMMERCIAL" as Category,
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80",
    wide: false
  },
  {
    title: "ANIMATION",
    number: "04",
    category: "ANIMATION" as Category,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    wide: false
  },
  {
    title: "DOC. FILMS",
    number: "05",
    category: "DOCUMENTARY" as Category,
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
    wide: false
  },
  {
    title: "TRAILER",
    number: "06",
    category: "TRAILERS" as Category,
    image: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1600&q=80",
    wide: true
  }
];

const imageA = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80";
const imageB = "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1800&q=80";
const imageC = "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1800&q=80";
const imageD = "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1800&q=80";
const imageE = "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1800&q=80";
const imageF = "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?auto=format&fit=crop&w=1800&q=80";

const baseProject = {
  audience: "Regional / digital",
  role: "Production + post",
  services: ["Film making", "Editing", "Color correction"],
  technical: ["16:9 master", "Web / broadcast delivery", "Stereo mix", "Color managed finish"],
  backstage: "Backstage gallery is prepared for owner supplied production stills.",
  vfx: "Before/after slot prepared for verified VFX plates.",
  color: "Before/after slot prepared for verified grade stills.",
  credits: ["DeFlick Production"],
  video: {}
};

const projectRecords: Project[] = [
  {
    ...baseProject,
    slug: "au79",
    title: "AU79",
    symbol: "Au",
    client: "AU79",
    year: "2019",
    audience: "1.2M+",
    category: "FILMMAKING",
    summary: "A case-study shell built to match the AU79 reference structure.",
    description:
      "AU79 is the primary project template for DeFlick. The layout keeps verified facts separate from replaceable media fields, so the page can become a full case study as original video, stills, credits and festival selections arrive.",
    cover: imageA,
    poster: imageA,
    teaser: imageB,
    order: 0,
    visible: true
  },
  {
    ...baseProject,
    slug: "mts",
    title: "MTS",
    symbol: "Mt",
    client: "MTS",
    year: "2018",
    category: "COMMERCIAL",
    summary: "Telecom commercial page prepared for the red MTS campaign materials.",
    description: "The MTS record is visible because it appears in the supplied homepage reference.",
    cover: imageB,
    poster: imageB,
    teaser: imageA,
    order: 1,
    visible: true
  },
  {
    ...baseProject,
    slug: "mercedes-benz",
    title: "Mercedes-Benz",
    symbol: "Mb",
    client: "Mercedes-Benz",
    year: "2017",
    category: "COMMERCIAL",
    summary: "Commercial project shell for verified Mercedes-Benz materials.",
    description: "Prepared for final campaign stills, video source and credits.",
    cover: imageC,
    poster: imageC,
    teaser: imageB,
    order: 2,
    visible: true
  },
  {
    ...baseProject,
    slug: "gap",
    title: "GAP",
    symbol: "Ga",
    client: "GAP",
    year: "2017",
    category: "COMMERCIAL",
    summary: "Retail commercial project shell.",
    description: "Prepared for original GAP visuals and confirmed production notes.",
    cover: imageD,
    poster: imageD,
    teaser: imageB,
    order: 3,
    visible: true
  },
  {
    ...baseProject,
    slug: "marks-and-spencer",
    title: "Marks and Spencer",
    symbol: "Ms",
    client: "M&S",
    year: "2017",
    category: "COMMERCIAL",
    summary: "Retail commercial page prepared for verified media.",
    description: "No unverified campaign claims are added until original materials arrive.",
    cover: imageE,
    poster: imageE,
    teaser: imageC,
    order: 4,
    visible: true
  },
  {
    ...baseProject,
    slug: "7up",
    title: "7UP",
    symbol: "Up",
    client: "7UP",
    year: "2016",
    category: "COMMERCIAL",
    summary: "Commercial record from the legacy client list.",
    description: "Ready for final artwork, video and credits.",
    cover: imageF,
    poster: imageF,
    teaser: imageC,
    order: 5,
    visible: true
  },
  {
    ...baseProject,
    slug: "lotte",
    title: "Lotte",
    symbol: "Lt",
    client: "Lotte",
    year: "2016",
    category: "COMMERCIAL",
    summary: "Commercial project shell.",
    description: "Prepared for owner supplied media.",
    cover: imageA,
    poster: imageA,
    teaser: imageD,
    order: 6,
    visible: true
  },
  {
    ...baseProject,
    slug: "tamar-kaprelian",
    title: "Tamar Kaprelian",
    symbol: "Tk",
    client: "Tamar Kaprelian",
    year: "2015",
    category: "MUSIC VIDEOS",
    summary: "Music video project shell.",
    description: "Prepared for clip, stills and music video credits.",
    cover: imageB,
    poster: imageB,
    teaser: imageE,
    order: 7,
    visible: true
  },
  {
    ...baseProject,
    slug: "two-unknowns",
    title: "Two Unknowns",
    symbol: "Tu",
    client: "Two Unknowns",
    year: "2015",
    category: "FILMMAKING",
    summary: "Film project shell.",
    description: "Prepared for original film materials and crew list.",
    cover: imageC,
    poster: imageC,
    teaser: imageA,
    order: 8,
    visible: true
  },
  {
    ...baseProject,
    slug: "armenian-scratches",
    title: "Armenian Sc(r)atches",
    symbol: "As",
    client: "Armenian Sc(r)atches",
    year: "2014",
    category: "DOCUMENTARY",
    summary: "Documentary project shell.",
    description: "Prepared for documentary synopsis, stills and festival data.",
    cover: imageD,
    poster: imageD,
    teaser: imageF,
    order: 9,
    visible: true
  },
  {
    ...baseProject,
    slug: "republic-group",
    title: "Republic Group",
    symbol: "Rg",
    client: "Republic Group",
    year: "2014",
    category: "COMMERCIAL",
    summary: "Commercial project shell.",
    description: "Prepared for verified client materials.",
    cover: imageE,
    poster: imageE,
    teaser: imageA,
    order: 10,
    visible: true
  },
  {
    ...baseProject,
    slug: "golden-apricot",
    title: "Golden Apricot",
    symbol: "Ga",
    client: "Golden Apricot",
    year: "2014",
    category: "TRAILERS",
    summary: "Festival trailer project shell.",
    description: "Prepared for festival trailer video, stills and confirmed selections.",
    cover: imageF,
    poster: imageF,
    teaser: imageB,
    order: 11,
    visible: true
  },
  {
    ...baseProject,
    slug: "rukolla",
    title: "Rukolla",
    symbol: "Ru",
    client: "Rukolla",
    year: "2013",
    category: "ANIMATION",
    summary: "Animation project shell.",
    description: "Prepared for animation stills and breakdowns.",
    cover: imageA,
    poster: imageA,
    teaser: imageC,
    order: 12,
    visible: true
  },
  {
    ...baseProject,
    slug: "g12-rounds",
    title: "G12 Rounds",
    symbol: "G12",
    client: "G12 Rounds",
    year: "2013",
    category: "FILMMAKING",
    summary: "Film project shell.",
    description: "Prepared for main film and production details.",
    cover: imageB,
    poster: imageB,
    teaser: imageD,
    order: 13,
    visible: true
  },
  {
    ...baseProject,
    slug: "yervand-kochar-museum-two-balconies",
    title: "Yervand Kochar Museum Two Balconies",
    symbol: "Ko",
    client: "Yervand Kochar Museum",
    year: "2012",
    category: "DOCUMENTARY",
    summary: "Museum documentary project shell.",
    description: "Prepared for museum film materials and credits.",
    cover: imageC,
    poster: imageC,
    teaser: imageE,
    order: 14,
    visible: true
  },
  {
    ...baseProject,
    slug: "anyone-there",
    title: "Anyone There?",
    symbol: "At",
    client: "Anyone There?",
    year: "2012",
    category: "FILMMAKING",
    summary: "Film project shell.",
    description: "Prepared for final film materials.",
    cover: imageD,
    poster: imageD,
    teaser: imageF,
    order: 15,
    visible: true
  },
  {
    ...baseProject,
    slug: "deflick-showreel",
    title: "DeFlick Showreel",
    symbol: "Df",
    client: "DeFlick Production",
    year: "2026",
    category: "FILMMAKING",
    summary: "The supplied DeFlick showreel is wired as a temporary playback entry.",
    description:
      "This entry uses the owner-supplied Google Drive showreel link as a temporary playback source. Replace it with Mux, Vimeo or direct MP4/WebM for production-grade adaptive streaming.",
    cover: "/assets/deflick-logo-black.png",
    poster: "/assets/deflick-logo-black.png",
    teaser: "/assets/deflick-logo-black.png",
    video: {
      googleDrivePreviewUrl: siteCopy.showreelPreviewUrl,
      externalUrl: siteCopy.showreelUrl
    },
    order: 99,
    visible: true
  }
];

export const projects: Project[] = projectRecords.sort((a, b) => a.order - b.order);

export const categories = [
  "ALL",
  "FILMMAKING",
  "TRAILERS",
  "COMMERCIAL",
  "MUSIC VIDEOS",
  "ANIMATION",
  "DOCUMENTARY"
];

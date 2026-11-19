import { ASSETS } from '../config/assets';

export interface ExpertiseItem {
  id: string;
  title: string;
  description: string;
}

export interface HobbySlide {
  id: string;
  heading: string;
  paragraphs: string[];
  imageSrc: string;
  imageAlt: string;
  aspectRatio: string;
  objectPosition: string;
  theme: 'light' | 'dark';
}

export const SEO_EXPERTISE: ExpertiseItem[] = [
  {
    id: 'seo',
    title: 'SEO',
    description:
      'End-to-end organic search strategy aligning search intent research, information architecture, and editorial content systems for sustainable brand visibility.',
  },
  {
    id: 'international-seo',
    title: 'International SEO',
    description:
      'Multi-regional search expansion across NATAM, LATAM, EMEA, and APAC markets using structured hreflang implementation and localized keyword mapping.',
  },
  {
    id: 'local-seo',
    title: 'Local SEO',
    description:
      'Geo-targeted visibility frameworks covering regional landing architecture, local entity consistency, and location-specific search discovery.',
  },
  {
    id: 'technical-seo',
    title: 'Technical SEO',
    description:
      'Crawl budget governance, log and indexation diagnostics, Core Web Vitals optimization, canonicalization, and structured schema implementation.',
  },
];

export const AEO_GEO_EXPERTISE: ExpertiseItem[] = [
  {
    id: 'aeo',
    title: 'AEO',
    description:
      'Answer Engine Optimization structuring authoritative entity definitions, concise Q&A hierarchies, and machine-readable schema for direct answer surfaces.',
  },
  {
    id: 'geo',
    title: 'GEO',
    description:
      'Generative Engine Optimization strengthening topical authority, brand citations, and semantic clarity across AI-driven discovery and synthesis platforms.',
  },
  {
    id: 'orm',
    title: 'ORM',
    description:
      'Ethical Online Reputation Management focused on brand SERP stewardship, owned-asset authority building, and transparent digital presence alignment.',
  },
];

export const HOBBY_SLIDES: HobbySlide[] = [
  {
    id: 'trekking',
    heading: 'TREKKING',
    paragraphs: [
      'Stepping away from search consoles and analytics dashboards to explore high-altitude ridges, mountain trails, and open horizons.',
      'Endurance trekking sharpens patience, route planning, and long-term perspective — the same discipline behind compounding organic growth.',
    ],
    imageSrc: ASSETS.images.hobbies.trekking.src,
    imageAlt: ASSETS.images.hobbies.trekking.alt,
    aspectRatio: ASSETS.images.hobbies.trekking.aspectRatio,
    objectPosition: '72% center',
    theme: 'light',
  },
  {
    id: 'football',
    heading: 'FOOTBALL',
    paragraphs: [
      'Fast-paced pitch sessions keep tactical awareness, spatial anticipation, and team rhythm sharp outside the desk.',
      'Just like organic search campaigns, winning on the field relies on disciplined positioning, quick transitions, and consistent execution.',
    ],
    imageSrc: ASSETS.images.hobbies.football.src,
    imageAlt: ASSETS.images.hobbies.football.alt,
    aspectRatio: ASSETS.images.hobbies.football.aspectRatio,
    objectPosition: 'center 55%',
    theme: 'dark',
  },
  {
    id: 'swimming',
    heading: 'SWIMMING',
    paragraphs: [
      'Early-morning laps build calm focus, controlled pacing, and steady endurance through structured sets.',
      'In the water, reducing drag matters more than brute force — a principle that applies directly to technical SEO and clean site architecture.',
    ],
    imageSrc: ASSETS.images.hobbies.swimming.src,
    imageAlt: ASSETS.images.hobbies.swimming.alt,
    aspectRatio: ASSETS.images.hobbies.swimming.aspectRatio,
    objectPosition: '62% 38%',
    theme: 'dark',
  },
];

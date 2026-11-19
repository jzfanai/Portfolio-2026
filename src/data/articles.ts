import { ASSETS } from '../config/assets';

export interface ArticleItem {
  id: string;
  index: number;
  title: string;
  category: string;
  summary: string;
  readTime: string;
  imageSrc: string;
  imageAlt: string;
  /**
   * Placeholder destination URL — replace with published blog URLs.
   */
  url: string;
  isPlaceholderUrl: boolean;
  previewParagraphs: string[];
}

export const ARTICLES: ArticleItem[] = [
  {
    id: 'connection-seo-smo',
    index: 1,
    title: 'THE CONNECTION BETWEEN SEO AND SMO',
    category: 'Organic Synergy',
    summary:
      'How social momentum, brand search demand, and structured content distribution reinforce organic search rankings.',
    readTime: '5 min read',
    imageSrc: ASSETS.images.articles.seoSmo.src,
    imageAlt: ASSETS.images.articles.seoSmo.alt,
    url: '#article-placeholder-seo-and-smo',
    isPlaceholderUrl: true,
    previewParagraphs: [
      'Search Engine Optimization and Social Media Optimization are often siloed across separate marketing teams, yet modern search engines evaluate brand authority holistically.',
      'When social distribution drives consistent branded search volume, referral engagement, and editorial citations, organic pages gain stronger discovery velocity and entity validation.',
      'Configure this article URL in src/data/articles.ts when linking to the full published post.',
    ],
  },
  {
    id: 'creative-marketing-strategies-seos',
    index: 2,
    title: 'CREATIVE MARKETING STRATEGIES FOR SEOS',
    category: 'Creative Growth',
    summary:
      'Moving beyond formulaic keyword checklists toward memorable editorial campaigns that earn natural authority.',
    readTime: '6 min read',
    imageSrc: ASSETS.images.articles.creativeMarketing.src,
    imageAlt: ASSETS.images.articles.creativeMarketing.alt,
    url: '#article-placeholder-creative-marketing-seos',
    isPlaceholderUrl: true,
    previewParagraphs: [
      'Technical hygiene sets the baseline, but durable organic differentiation comes from original creative angles that people actively remember and share.',
      'By pairing search-intent architecture with distinctive storytelling, SaaS and consumer brands stand out in crowded SERPs and AI-generated answer summaries alike.',
      'Configure this article URL in src/data/articles.ts when linking to the full published post.',
    ],
  },
  {
    id: 'aizawl-cafe-culture-organic-growth',
    index: 3,
    title: "AIZAWL'S CAFE CULTURE AND IT'S ORGANIC GROWTH",
    category: 'Local SEO & Culture',
    summary:
      'Examining how community-driven hospitality spaces build hyper-local discovery without heavy paid ad spend.',
    readTime: '4 min read',
    imageSrc: ASSETS.images.articles.aizawlCafe.src,
    imageAlt: ASSETS.images.articles.aizawlCafe.alt,
    url: '#article-placeholder-aizawl-cafe-culture',
    isPlaceholderUrl: true,
    previewParagraphs: [
      'Independent cafes in Aizawl demonstrate how authentic local atmosphere, visual storytelling, and consistent Google Business profiles compound word-of-mouth into steady search discovery.',
      'Local SEO thrives when digital touchpoints reflect real-world hospitality, accurate local citations, and engaged customer reviews.',
      'Configure this article URL in src/data/articles.ts when linking to the full published post.',
    ],
  },
  {
    id: 'orm-vs-reversed-orm',
    index: 4,
    title: 'ORM VS REVERSED ORM. WHAT IS ETHICAL ORM?',
    category: 'Brand Reputation',
    summary:
      'Clarifying ethical online reputation stewardship versus manipulative suppression tactics on brand search results.',
    readTime: '7 min read',
    imageSrc: ASSETS.images.articles.ethicalOrm.src,
    imageAlt: ASSETS.images.articles.ethicalOrm.alt,
    url: '#article-placeholder-ethical-orm',
    isPlaceholderUrl: true,
    previewParagraphs: [
      'Online Reputation Management is rooted in transparent brand communication, strengthening owned digital properties, and addressing stakeholder feedback constructively.',
      'Ethical ORM focuses on long-term credibility and accurate representation in search ecosystems rather than deceptive or adversarial tactics.',
      'Configure this article URL in src/data/articles.ts when linking to the full published post.',
    ],
  },
];

import { ASSETS } from '../config/assets';

export interface ToolIcon {
  name: string;
  src: string;
}

export interface CareerMilestone {
  id: string;
  segment: 'WORK EXPERIENCE' | 'TECHNICAL INTERNSHIP';
  side: 'left' | 'right';
  company: string;
  position: string;
  duration: string;
  accentColor: string;
  glowColor: string;
  iconRows: ToolIcon[][];
  summary: string;
}

export const CAREER_MILESTONES: CareerMilestone[] = [
  {
    id: 'esko-graphics',
    segment: 'WORK EXPERIENCE',
    side: 'left',
    company: 'ESKO Graphics pvt. ltd',
    position: 'SEO Specialist, Contractor',
    duration: 'Feb 2026 - Present',
    accentColor: '#78B87E',
    glowColor: 'rgba(100, 216, 197, 0.45)',
    summary:
      'Leading global organic search initiatives, technical site architecture, SaaS demand capture, and multi-regional International SEO across NATAM, LATAM, EMEA, and APAC.',
    iconRows: [
      [
        { name: 'Ahrefs', src: ASSETS.icons.ahrefs },
        { name: 'Claude', src: ASSETS.icons.claude },
        { name: 'Screaming Frog', src: ASSETS.icons.screamingFrog },
      ],
      [
        { name: 'Webflow', src: ASSETS.icons.webflow },
        { name: 'Antigravity', src: ASSETS.icons.antigravity },
        { name: 'HubSpot', src: ASSETS.icons.hubspot },
      ],
    ],
  },
  {
    id: 'im-solutions',
    segment: 'WORK EXPERIENCE',
    side: 'right',
    company: 'IM Solutions',
    position: 'Sr. SEO Executive',
    duration: 'Nov 2024 - Feb 2026',
    accentColor: '#E05246',
    glowColor: 'rgba(224, 82, 70, 0.45)',
    summary:
      'Executed full-funnel organic growth campaigns across real estate and B2B verticals, Looker Studio reporting, technical audits, and AI-assisted content workflows.',
    iconRows: [
      [
        { name: 'Ubersuggest', src: ASSETS.icons.ubersuggest },
        { name: 'Looker Studio', src: ASSETS.icons.lookerStudio },
        { name: 'Microsoft 365', src: ASSETS.icons.ms365 },
        { name: 'OpenAI', src: ASSETS.icons.openai },
      ],
    ],
  },
  {
    id: 'take-it-smart',
    segment: 'TECHNICAL INTERNSHIP',
    side: 'left',
    company: 'TIS (TAKE IT SMART)',
    position: 'Python Web Developer, Intern',
    duration: 'April - Nov 2024',
    accentColor: '#4EA8DE',
    glowColor: 'rgba(78, 168, 222, 0.45)',
    summary:
      'Built foundational full-stack web engineering fluency in Python, semantic HTML5, CSS3, and structured DOM architectures that underpin modern Technical SEO.',
    iconRows: [
      [
        { name: 'VS Code', src: ASSETS.icons.vscode },
        { name: 'Python', src: ASSETS.icons.python },
      ],
      [
        { name: 'HTML5', src: ASSETS.icons.html5 },
        { name: 'CSS3', src: ASSETS.icons.css3 },
      ],
    ],
  },
];

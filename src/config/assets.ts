import jonathanAvatar from '../assets/images/jonathan-avatar.png';
import hobbiesTrekking from '../assets/images/hobbies-trekking.jpg';
import hobbiesFootball from '../assets/images/hobbies-football.jpg';
import hobbiesSwimming from '../assets/images/hobbies-swimming.jpg';
import articleSeoSmo from '../assets/images/article-seo-smo.jpg';
import articleCreativeMarketing from '../assets/images/article-creative-marketing.jpg';
import articleAizawlCafe from '../assets/images/article-aizawl-cafe.jpg';
import articleEthicalOrm from '../assets/images/article-ethical-orm.jpg';

import ahrefsIcon from '../assets/icons/ahrefs.png';
import antigravityIcon from '../assets/icons/antigravity.webp';
import claudeIcon from '../assets/icons/claude.png';
import css3Icon from '../assets/icons/css3.png';
import designThinkingIcon from '../assets/icons/design-thinking.webp';
import html5Icon from '../assets/icons/html5.png';
import hubspotIcon from '../assets/icons/hubspot.png';
import instagramIcon from '../assets/icons/instagram.png';
import linkedinIcon from '../assets/icons/linkedin.png';
import lookerStudioIcon from '../assets/icons/looker-studio.png';
import ms365Icon from '../assets/icons/ms365.png';
import openaiIcon from '../assets/icons/openai.png';
import pythonIcon from '../assets/icons/python.png';
import screamingFrogIcon from '../assets/icons/screaming-frog.png';
import ubersuggestIcon from '../assets/icons/ubersuggest.webp';
import vscodeIcon from '../assets/icons/vscode.png';
import webflowIcon from '../assets/icons/webflow.png';

/**
 * Centralized Asset Registry
 * Replace any imported file in src/assets/ or update paths here
 * to swap imagery without touching presentation components.
 */
export const ASSETS = {
  images: {
    avatar: {
      src: jonathanAvatar,
      alt: 'Jonathan Fanai — SEO Specialist Portrait',
      aspectRatio: '458 / 550',
      width: 458,
      height: 550,
    },
    hobbies: {
      trekking: {
        src: hobbiesTrekking,
        alt: 'Mountain trekking and outdoor trail exploration',
        aspectRatio: '1721 / 1165',
        width: 1721,
        height: 1165,
      },
      football: {
        src: hobbiesFootball,
        alt: 'Football on turf pitch with cleats',
        aspectRatio: '555 / 981',
        width: 555,
        height: 981,
      },
      swimming: {
        src: hobbiesSwimming,
        alt: 'Swimmer standing on starting block at indoor lap pool',
        aspectRatio: '736 / 1308',
        width: 736,
        height: 1308,
      },
    },
    articles: {
      seoSmo: {
        src: articleSeoSmo,
        alt: 'The Connection Between SEO and SMO',
      },
      creativeMarketing: {
        src: articleCreativeMarketing,
        alt: 'Creative Marketing Strategies for SEOs',
      },
      aizawlCafe: {
        src: articleAizawlCafe,
        alt: "Aizawl's Cafe Culture and Its Organic Growth",
      },
      ethicalOrm: {
        src: articleEthicalOrm,
        alt: 'ORM vs Reversed ORM: What Is Ethical ORM?',
      },
    },
  },
  icons: {
    ahrefs: ahrefsIcon,
    antigravity: antigravityIcon,
    claude: claudeIcon,
    css3: css3Icon,
    designThinking: designThinkingIcon,
    html5: html5Icon,
    hubspot: hubspotIcon,
    instagram: instagramIcon,
    linkedin: linkedinIcon,
    lookerStudio: lookerStudioIcon,
    ms365: ms365Icon,
    openai: openaiIcon,
    python: pythonIcon,
    screamingFrog: screamingFrogIcon,
    ubersuggest: ubersuggestIcon,
    vscode: vscodeIcon,
    webflow: webflowIcon,
  },
} as const;

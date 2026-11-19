import { ASSETS } from '../config/assets';

export interface SocialLinkItem {
  id: 'linkedin' | 'instagram';
  label: string;
  href: string;
  isPlaceholder: boolean;
  iconSrc: string;
}

export const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jzfanai/',
    isPlaceholder: false,
    iconSrc: ASSETS.icons.linkedin,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/jzfanai',
    isPlaceholder: false,
    iconSrc: ASSETS.icons.instagram,
  },
];

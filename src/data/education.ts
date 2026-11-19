import { ASSETS } from '../config/assets';

export interface EducationMilestone {
  id: string;
  side: 'left' | 'right';
  institution: string;
  qualification: string;
  duration: string;
  accentColor: string;
  glowColor: string;
  badgeIcon?: {
    name: string;
    src: string;
  };
}

export const EDUCATION_MILESTONES: EducationMilestone[] = [
  {
    id: 'bmsce',
    side: 'right',
    institution: 'BMS College of Engineering',
    qualification: 'MCA',
    duration: 'Nov 2021 - Nov 2024',
    accentColor: '#D4A359',
    glowColor: 'rgba(212, 163, 89, 0.45)',
    badgeIcon: {
      name: 'Design Thinking',
      src: ASSETS.icons.designThinking,
    },
  },
  {
    id: 'serchhip-govt-college',
    side: 'left',
    institution: 'Serchhip Govt. College',
    qualification: 'BCA',
    duration: 'June 2016 - April 2018',
    accentColor: '#8DB596',
    glowColor: 'rgba(141, 181, 150, 0.45)',
  },
];

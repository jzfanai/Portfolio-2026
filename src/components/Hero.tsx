import { motion } from 'motion/react';
import { Header } from './Header';
import { SOCIAL_LINKS } from '../data/socialLinks';
import {
  heroBackdropWordVariants,
  heroNavContainerVariants,
  heroNavItemVariants,
  heroSocialVariants,
} from '../animations/heroAnimations';
import { MOTION_DURATION, MOTION_EASE } from '../animations/motionConfig';

interface HeroProps {
  onOpenArticlesHub: () => void;
  onDownloadCV: () => void;
}

const SPECIALIST_LETTERS = ['S', 'P', 'E', 'C', 'I', 'A', 'L', 'I', 'S', 'T'] as const;

export function Hero({ onOpenArticlesHub, onDownloadCV }: HeroProps) {
  return (
    <section
      id="top"
      aria-label="Hero Introduction"
      className="relative w-full min-h-[78vh] sm:min-h-[84vh] flex flex-col justify-between bg-black overflow-hidden"
    >
      {/* Subtle Ambient Atmospheric Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 65% 48% at 50% 44%, rgba(113, 193, 173, 0.08) 0%, rgba(6, 77, 64, 0.09) 35%, rgba(0, 0, 0, 0) 72%)',
        }}
      />

      {/* Top Identity Header */}
      <div className="relative z-10">
        <Header />
      </div>

      {/* Centerpiece Oversized Typography */}
      <div className="relative z-10 w-full max-w-[1380px] mx-auto px-4 sm:px-8 lg:px-12 my-auto py-12 sm:py-16 flex flex-col items-center justify-center text-center">
        {/* Shared width lock: SEO defines the intrinsic box width, SPECIALIST distributes across 100% of that exact width */}
        <div className="relative inline-flex items-center justify-center select-none max-w-full">
          {/* Oversized Dark Serif "SEO" Backdrop */}
          <motion.span
            variants={heroBackdropWordVariants}
            initial="hidden"
            animate="visible"
            aria-hidden="true"
            className="font-serif font-medium uppercase leading-none text-[clamp(4.75rem,20vw,16.5rem)] tracking-[0.22em] sm:tracking-[0.28em] mr-[-0.22em] sm:mr-[-0.28em] bg-gradient-to-b from-[#2E3436] via-[#1C2022] to-[#0A0C0D] bg-clip-text text-transparent"
          >
            SEO
          </motion.span>

          {/* Dominant Masked Serif "SPECIALIST" Layer locked to exact SEO width */}
          <h1 className="absolute inset-0 flex items-center justify-center">
            <span className="sr-only">Jonathan Fanai — SEO Specialist</span>
            <motion.span
              aria-hidden="true"
              initial={{ opacity: 0, y: 18, scaleX: 0.82 }}
              animate={{ opacity: 1, y: 0, scaleX: 1 }}
              transition={{
                duration: MOTION_DURATION.cinematic,
                delay: 0.18,
                ease: MOTION_EASE.editorial,
              }}
              className="w-full flex items-center justify-between font-serif font-normal uppercase text-white text-[clamp(0.95rem,3.4vw,3.15rem)] leading-none drop-shadow-[0_2px_24px_rgba(0,0,0,0.95)]"
            >
              {SPECIALIST_LETTERS.map((char, idx) => (
                <span key={idx} className="inline-block">
                  {char}
                </span>
              ))}
            </motion.span>
          </h1>
        </div>

        {/* Fine Horizontal Divider & Navigation Pills */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45, ease: MOTION_EASE.editorial }}
          className="w-full max-w-[640px] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mt-6 sm:mt-8 mb-6"
        />

        <motion.nav
          aria-label="Primary Portfolio Actions"
          variants={heroNavContainerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center justify-center gap-5 sm:gap-12 md:gap-16"
        >
          <motion.button
            type="button"
            variants={heroNavItemVariants}
            onClick={onDownloadCV}
            className="px-7 py-2 rounded-full border border-white/30 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.26em] text-white/90 hover:border-[#71c1ad] hover:text-[#71c1ad] hover:bg-[#71c1ad]/5 transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#71c1ad]"
          >
            Download CV
          </motion.button>

          <motion.button
            type="button"
            variants={heroNavItemVariants}
            onClick={onOpenArticlesHub}
            className="px-7 py-2 rounded-full border border-white/30 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.26em] text-white/90 hover:border-[#71c1ad] hover:text-[#71c1ad] hover:bg-[#71c1ad]/5 transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#71c1ad]"
          >
            Case Studies
          </motion.button>
        </motion.nav>
      </div>

      {/* Bottom Right Social Icons Row */}
      <motion.div
        variants={heroSocialVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 pb-6 flex justify-end items-center gap-3"
      >
        {SOCIAL_LINKS.map((social) => (
          <a
            key={social.id}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            title={social.label}
            className="w-7 h-7 rounded-[4px] overflow-hidden opacity-85 hover:opacity-100 hover:scale-110 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#71c1ad]"
          >
            <img
              src={social.iconSrc}
              alt={social.label}
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </a>
        ))}
      </motion.div>
    </section>
  );
}

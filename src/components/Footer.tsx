import { useState, type MouseEvent } from 'react';
import { motion } from 'motion/react';
import { SITE_CONFIG } from '../config/siteConfig';
import { SOCIAL_LINKS } from '../data/socialLinks';
import { staggerContainerVariants, staggerItemVariants } from '../animations/scrollAnimations';
import { MOTION_DURATION, MOTION_EASE, VIEWPORT_ONCE } from '../animations/motionConfig';

interface FooterProps {
  onDownloadCV: () => void;
  onOpenContact: () => void;
  onOpenArticlesHub: () => void;
  onNavigateHome?: () => void;
}

export function Footer({
  onDownloadCV,
  onOpenContact,
  onOpenArticlesHub,
  onNavigateHome,
}: FooterProps) {
  const [isWordmarkHovered, setIsWordmarkHovered] = useState(false);
  const [pointerPos, setPointerPos] = useState({ x: 50, y: 50 });

  const scrollToSection = (id: string) => {
    if (onNavigateHome) {
      onNavigateHome();
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 60);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWordmarkMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPointerPos({ x, y });
  };

  return (
    <footer
      aria-label="Site Footer"
      className="relative w-full max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 pt-10 pb-8 sm:pb-12 overflow-hidden"
    >
      {/* Subtle Ambient Footer Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-0 w-[420px] h-[220px] rounded-full bg-[#71c1ad]/[0.06] blur-3xl"
      />

      {/* Top Row: Quick Links & Address */}
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        className="relative z-10 flex flex-col sm:flex-row items-start justify-between gap-10"
      >
        {/* Left: Quick Links */}
        <motion.div variants={staggerItemVariants} className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-white">
            QUICK LINKS
          </h2>

          <nav aria-label="Footer Quick Links" className="flex flex-col gap-2 text-xs text-[#A5A5A5]">
            <button
              type="button"
              onClick={onDownloadCV}
              className="text-left hover:text-[#71c1ad] transition-colors w-fit cursor-pointer"
            >
              Download CV
            </button>
            <button
              type="button"
              onClick={onOpenContact}
              className="text-left hover:text-[#71c1ad] transition-colors w-fit cursor-pointer"
            >
              Contact
            </button>
            <a
              href="#expertise"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('expertise');
              }}
              className="hover:text-[#71c1ad] transition-colors w-fit"
            >
              Services
            </a>
            <button
              type="button"
              onClick={onOpenArticlesHub}
              className="text-left hover:text-[#71c1ad] transition-colors w-fit cursor-pointer"
            >
              Blogs
            </button>
          </nav>
        </motion.div>

        {/* Right: Address */}
        <motion.div variants={staggerItemVariants} className="sm:text-right space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-white">
            ADDRESS
          </h2>
          <address className="not-italic text-xs leading-relaxed text-[#A5A5A5] space-y-0.5 tabular-nums">
            <p>{SITE_CONFIG.location.street}</p>
            <p>{SITE_CONFIG.location.cityFull}</p>
            <p>{SITE_CONFIG.location.postalCode}</p>
          </address>
        </motion.div>
      </motion.div>

      {/* Bottom Row: Social Icons & Interactive Gradient-Lit JZFANAI Wordmark */}
      <div className="relative z-10 mt-10 sm:mt-14 flex flex-col-reverse sm:flex-row items-start sm:items-end justify-between gap-6">
        {/* Bottom-left Social Icons */}
        <div className="flex items-center gap-3 pb-1">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="w-6 h-6 rounded-[4px] overflow-hidden opacity-85 hover:opacity-100 hover:scale-110 transition-all duration-200"
            >
              <img
                src={social.iconSrc}
                alt={social.label}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </a>
          ))}
        </div>

        {/* Bottom-right Interactive JZFANAI Wordmark with Cursor-Tracked Gradient Lights */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: MOTION_DURATION.slow, ease: MOTION_EASE.editorial }}
          onMouseEnter={() => setIsWordmarkHovered(true)}
          onMouseLeave={() => setIsWordmarkHovered(false)}
          onMouseMove={handleWordmarkMouseMove}
          onClick={() => scrollToSection('top')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              scrollToSection('top');
            }
          }}
          aria-label="Scroll back to top — JZFANAI"
          className="relative group select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#71c1ad]"
        >
          {/* Ambient behind-text gradient light halo */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute -inset-x-6 -inset-y-3 rounded-full blur-2xl transition-opacity duration-500 ${
              isWordmarkHovered ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: `radial-gradient(circle 140px at ${pointerPos.x}% ${pointerPos.y}%, rgba(113, 193, 173, 0.36), rgba(6, 77, 64, 0.16) 55%, transparent 80%)`,
            }}
          />

          {/* Base White Wordmark */}
          <motion.span
            animate={{
              letterSpacing: isWordmarkHovered ? '0.09em' : '0.04em',
              y: isWordmarkHovered ? -2 : 0,
            }}
            transition={{ duration: 0.4, ease: MOTION_EASE.editorial }}
            className="relative block font-sans font-extrabold uppercase text-[clamp(2.5rem,7vw,5rem)] leading-[0.88] text-white transition-opacity duration-300"
          >
            {SITE_CONFIG.brand}
          </motion.span>

          {/* Interactive Gradient Light Sweep Overlay */}
          <motion.span
            aria-hidden="true"
            animate={{
              letterSpacing: isWordmarkHovered ? '0.09em' : '0.04em',
              y: isWordmarkHovered ? -2 : 0,
              opacity: isWordmarkHovered ? 1 : 0,
            }}
            transition={{ duration: 0.4, ease: MOTION_EASE.editorial }}
            className="pointer-events-none absolute inset-0 block font-sans font-extrabold uppercase text-[clamp(2.5rem,7vw,5rem)] leading-[0.88] bg-clip-text text-transparent"
            style={{
              backgroundImage: `radial-gradient(circle 135px at ${pointerPos.x}% ${pointerPos.y}%, #ffffff 0%, #9ce8d6 26%, #71c1ad 54%, rgba(255, 255, 255, 0.25) 100%)`,
            }}
          >
            {SITE_CONFIG.brand}
          </motion.span>
        </motion.div>
      </div>
    </footer>
  );
}

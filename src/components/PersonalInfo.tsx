import { motion } from 'motion/react';
import { SITE_CONFIG } from '../config/siteConfig';
import { SOCIAL_LINKS } from '../data/socialLinks';
import { staggerContainerVariants, staggerItemVariants } from '../animations/scrollAnimations';
import { VIEWPORT_ONCE } from '../animations/motionConfig';

export function PersonalInfo() {
  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      className="relative flex items-stretch gap-4 sm:gap-5"
    >
      {/* Rotated Vertical Label matching PDF */}
      <div className="hidden sm:flex items-center justify-center w-5 shrink-0">
        <span className="-rotate-90 whitespace-nowrap text-[10px] tracking-[0.35em] uppercase text-[#A5A5A5] font-medium">
          PERSONAL INFO
        </span>
      </div>

      {/* Personal Data Stack */}
      <div className="border-l border-white/20 pl-4 sm:pl-5 py-1 flex flex-col gap-3 text-xs sm:text-[13px] leading-relaxed">
        <div className="sm:hidden text-[10px] tracking-[0.28em] uppercase text-[#707070] mb-1">
          Personal Info
        </div>

        <motion.div variants={staggerItemVariants} className="space-y-0.5">
          <p className="text-white font-medium">{SITE_CONFIG.name}</p>
          <p className="text-[#A5A5A5]">
            {SITE_CONFIG.title},{' '}
            <span className="text-[#64D8C5] font-semibold tracking-wide">
              {SITE_CONFIG.organizationShort}
            </span>
          </p>
          <p className="text-[#A5A5A5] tabular-nums">AGE: {SITE_CONFIG.age}</p>
        </motion.div>

        <motion.div variants={staggerItemVariants} className="space-y-0.5 text-[#A5A5A5]">
          <p>{SITE_CONFIG.location.city}</p>
          <p>{SITE_CONFIG.location.street}</p>
        </motion.div>

        <motion.div variants={staggerItemVariants} className="space-y-0.5 tabular-nums">
          <a
            href={`tel:${SITE_CONFIG.contact.phoneHref}`}
            className="block text-[#A5A5A5] hover:text-[#64D8C5] transition-colors w-fit"
          >
            {SITE_CONFIG.contact.phoneDisplay}
          </a>
          <a
            href={`mailto:${SITE_CONFIG.contact.email}`}
            className="block text-[#A5A5A5] hover:text-[#64D8C5] transition-colors w-fit"
          >
            {SITE_CONFIG.contact.email}
          </a>
        </motion.div>

        <motion.div variants={staggerItemVariants} className="flex items-center gap-2.5 pt-1">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              title={social.isPlaceholder ? `${social.label} — placeholder link` : social.label}
              className="w-5 h-5 rounded-[3px] overflow-hidden opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-200"
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
      </div>
    </motion.div>
  );
}

import { Mail, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { SITE_CONFIG } from '../config/siteConfig';
import { heroHeaderVariants } from '../animations/heroAnimations';

interface HeaderProps {
  compact?: boolean;
  onNavigateHome?: () => void;
}

export function Header({ compact = false, onNavigateHome }: HeaderProps) {
  return (
    <motion.header
      variants={heroHeaderVariants}
      initial={compact ? false : 'hidden'}
      animate={compact ? undefined : 'visible'}
      className={`w-full max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-start sm:items-start justify-between gap-4 ${
        compact ? 'py-6 border-t border-white/10' : 'pt-6 sm:pt-8 pb-4'
      }`}
    >
      {/* Left Identity Block */}
      <div className="flex flex-col gap-1.5">
        <div className="w-fit">
          <a
            href="#top"
            onClick={(e) => {
              if (onNavigateHome) {
                e.preventDefault();
                onNavigateHome();
              }
            }}
            className="text-sm sm:text-[15px] font-semibold tracking-[0.06em] uppercase text-white hover:text-[#71c1ad] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#71c1ad] block"
          >
            {SITE_CONFIG.name.toUpperCase()}
          </a>
          <div aria-hidden="true" className="h-[1.5px] w-full bg-[#71c1ad] mt-1" />
        </div>

        <div className="flex flex-col gap-1 text-[11px] sm:text-xs text-[#A5A5A5] pt-0.5">
          <a
            href={`mailto:${SITE_CONFIG.contact.email}`}
            className="inline-flex items-center gap-2 hover:text-white transition-colors w-fit"
          >
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#71c1ad]/15 text-[#71c1ad]">
              <Mail className="w-2.5 h-2.5" strokeWidth={2} />
            </span>
            <span>{SITE_CONFIG.contact.email}</span>
          </a>
          <a
            href={`tel:${SITE_CONFIG.contact.phoneHref}`}
            className="inline-flex items-center gap-2 hover:text-white transition-colors w-fit tabular-nums"
          >
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#71c1ad]/15 text-[#71c1ad]">
              <Phone className="w-2.5 h-2.5" strokeWidth={2} />
            </span>
            <span>{SITE_CONFIG.contact.phoneDisplay}</span>
          </a>
        </div>
      </div>

      {/* Right Designation Block */}
      <div className="flex flex-col items-start sm:items-end text-left sm:text-right">
        <div className="w-fit">
          <span className="text-sm sm:text-[15px] font-semibold tracking-[0.06em] uppercase text-white whitespace-nowrap shrink-0 block">
            {SITE_CONFIG.title.toUpperCase()}
          </span>
          <div aria-hidden="true" className="h-[1.5px] w-full bg-[#71c1ad] mt-1" />
        </div>
        <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.12em] uppercase text-[#9AB89A] mt-1.5 whitespace-nowrap shrink-0">
          {SITE_CONFIG.organization.toUpperCase()}
        </span>
      </div>
    </motion.header>
  );
}

import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import type { ArticleItem } from '../data/articles';
import { MOTION_EASE } from '../animations/motionConfig';

interface BlogCardProps {
  article: ArticleItem;
  isActive: boolean;
  hasAnyActive: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onSelect: (article: ArticleItem) => void;
}

export function BlogCard({
  article,
  isActive,
  hasAnyActive,
  onHoverStart,
  onHoverEnd,
  onSelect,
}: BlogCardProps) {
  // Desktop flex-grow ratios: hovered card smoothly expands while neighbors contract proportionally
  const desktopFlexGrow = isActive ? 2.35 : hasAnyActive ? 0.72 : 1;

  return (
    <motion.article
      layout
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onFocus={onHoverStart}
      onBlur={onHoverEnd}
      onClick={() => onSelect(article)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(article);
        }
      }}
      tabIndex={0}
      role="button"
      aria-expanded={isActive}
      aria-label={`${article.title} — ${article.category}`}
      animate={{
        flexGrow: desktopFlexGrow,
      }}
      transition={{
        duration: 0.55,
        ease: MOTION_EASE.editorial,
      }}
      className={`group relative overflow-hidden cursor-pointer select-none border transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64D8C5] ${
        isActive
          ? 'border-[#64D8C5]/75 shadow-[0_0_28px_rgba(100,216,197,0.14)]'
          : 'border-white/15 hover:border-white/35'
      } h-[300px] sm:h-[340px] lg:h-[390px] w-full lg:w-auto lg:min-w-[140px] lg:basis-0`}
    >
      {/* Background Photo with subtle zoom on hover/active */}
      <img
        src={article.imageSrc}
        alt={article.imageAlt}
        loading="lazy"
        referrerPolicy="no-referrer"
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out ${
          isActive ? 'scale-[1.06]' : 'scale-100'
        }`}
      />

      {/* Editorial Scrim ensuring >= 4.5:1 text contrast */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 transition-opacity duration-500 ${
          isActive
            ? 'bg-gradient-to-t from-black/95 via-black/60 to-black/25'
            : 'bg-gradient-to-t from-black/90 via-black/45 to-black/20'
        }`}
      />

      {/* Card Content Overlay */}
      <div className="relative z-10 h-full w-full p-4 sm:p-5 flex flex-col justify-between">
        {/* Top Metadata (Clean unboxed text, zero-pill discipline) */}
        <div className="flex items-center justify-between gap-2 text-[10px] uppercase tracking-[0.2em] text-white/75">
          <span className="font-mono tabular-nums text-[#64D8C5]">
            0{article.index}
          </span>
          <span
            className={`transition-opacity duration-300 truncate ${
              isActive ? 'opacity-100' : 'opacity-0 lg:group-hover:opacity-100'
            }`}
          >
            {article.category} · {article.readTime}
          </span>
        </div>

        {/* Bottom Title + Expanding Summary + Read Indicator */}
        <div className="space-y-2.5">
          <h3
            className={`font-sans uppercase tracking-[0.06em] leading-snug text-white transition-all duration-300 ${
              isActive
                ? 'text-sm sm:text-base lg:text-lg font-semibold'
                : 'text-[11px] sm:text-xs font-medium text-white/90'
            }`}
          >
            {article.title}
          </h3>

          {/* Reveal summary & read more only when active/expanded */}
          <div
            className={`grid transition-all duration-500 ease-out ${
              isActive
                ? 'grid-rows-[1fr] opacity-100'
                : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="overflow-hidden space-y-2.5">
              <p className="text-xs leading-relaxed text-[#D0D0D0] line-clamp-3">
                {article.summary}
              </p>

              <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] text-[#64D8C5] font-medium pt-0.5">
                <span>Read Article</span>
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

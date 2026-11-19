import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { BlogCard } from './BlogCard';
import { ARTICLES, type ArticleItem } from '../data/articles';
import { SITE_CONFIG } from '../config/siteConfig';
import { VIEWPORT_ONCE, MOTION_DURATION, MOTION_EASE } from '../animations/motionConfig';

interface BlogSectionProps {
  onSelectArticle: (article: ArticleItem) => void;
  onOpenArticlesHub: () => void;
}

export function BlogSection({ onSelectArticle, onOpenArticlesHub }: BlogSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileExpandedId, setMobileExpandedId] = useState<string | null>(null);

  const activeDisplayNumber = hoveredIndex !== null ? hoveredIndex + 1 : 2;
  const progressRatio = activeDisplayNumber / ARTICLES.length;

  const handleCardAction = (article: ArticleItem) => {
    const isTouchOrSmall = typeof window !== 'undefined' && window.innerWidth < 1024;
    if (isTouchOrSmall && mobileExpandedId !== article.id) {
      setMobileExpandedId(article.id);
      setHoveredIndex(article.index - 1);
      return;
    }
    onSelectArticle(article);
  };

  return (
    <section
      id="articles"
      aria-label="Featured Editorial Articles"
      className="relative w-full pt-8 pb-12 overflow-hidden"
    >
      {/* Subtle Ambient Burgundy-to-Teal Radial Glow behind article strip */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-16 bottom-0"
        style={{
          background:
            'radial-gradient(ellipse 40% 50% at 22% 55%, rgba(92, 34, 58, 0.22) 0%, rgba(0, 0, 0, 0) 75%), radial-gradient(ellipse 42% 52% at 78% 55%, rgba(6, 77, 64, 0.24) 0%, rgba(0, 0, 0, 0) 75%)',
        }}
      />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 pt-6 border-t border-white/10">
        {/* Top Action Bar replacing repeated Header with "Read More" button */}
        <div className="flex items-center justify-end pb-5">
          <button
            type="button"
            onClick={onOpenArticlesHub}
            className="inline-flex items-center gap-2.5 px-6 py-2 rounded-full border border-white/30 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.24em] text-white/90 hover:border-[#71c1ad] hover:text-[#71c1ad] hover:bg-[#71c1ad]/5 transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#71c1ad]"
          >
            <span>Read More</span>
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
          </button>
        </div>

        {/* Outer Editorial Hairline Frame */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: MOTION_DURATION.medium, ease: MOTION_EASE.editorial }}
          className="border border-white/20 p-2 sm:p-3 bg-black/50 backdrop-blur-[1px]"
        >
          {/* Desktop: Horizontal Flex Expanding Cards | Mobile: Stacked Tap-to-Expand */}
          <div className="flex flex-col lg:flex-row gap-2 sm:gap-2.5">
            {ARTICLES.map((article, idx) => {
              const isDesktopHovered = hoveredIndex === idx;
              const isMobileActive = mobileExpandedId === article.id;
              const isActive = isDesktopHovered || isMobileActive;

              return (
                <BlogCard
                  key={article.id}
                  article={article}
                  isActive={isActive}
                  hasAnyActive={hoveredIndex !== null}
                  onHoverStart={() => setHoveredIndex(idx)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  onSelect={handleCardAction}
                />
              );
            })}
          </div>
        </motion.div>

        {/* Bottom Editorial Tagline & #71c1ad Progress Bar + Index Numbers */}
        <div className="mt-7 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] leading-[1.6] text-[#A5A5A5] max-w-[260px]">
            {SITE_CONFIG.tagline}
          </p>

          <div className="flex items-center gap-4 sm:gap-5 self-end">
            {/* Thin Interactive Progress Bar filling with #71c1ad */}
            <div
              role="progressbar"
              aria-label="Article highlight progress"
              aria-valuemin={1}
              aria-valuemax={ARTICLES.length}
              aria-valuenow={activeDisplayNumber}
              className="w-28 sm:w-48 h-[2px] bg-white/15 overflow-hidden relative rounded-full"
            >
              <motion.div
                className="h-full w-full origin-left bg-[#71c1ad] shadow-[0_0_8px_rgba(113,193,173,0.65)]"
                animate={{ scaleX: progressRatio }}
                transition={{ duration: 0.45, ease: MOTION_EASE.editorial }}
              />
            </div>

            <div className="flex items-baseline gap-3 sm:gap-4 font-serif tabular-nums">
              {ARTICLES.map((article) => {
                const isSelected = activeDisplayNumber === article.index;
                return (
                  <button
                    key={article.id}
                    type="button"
                    onClick={() => {
                      setHoveredIndex(article.index - 1);
                      setMobileExpandedId(article.id);
                    }}
                    aria-label={`Highlight article ${article.index}`}
                    className={`transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:text-[#71c1ad] ${
                      isSelected
                        ? 'text-2xl sm:text-3xl text-[#71c1ad] font-medium'
                        : 'text-base sm:text-lg text-[#707070] hover:text-white/85'
                    }`}
                  >
                    {article.index}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

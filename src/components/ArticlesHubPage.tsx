import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './Header';
import { Newsletter } from './Newsletter';
import { Footer } from './Footer';
import { ARTICLES, type ArticleItem } from '../data/articles';
import { SOCIAL_LINKS } from '../data/socialLinks';
import { MOTION_DURATION, MOTION_EASE, VIEWPORT_ONCE } from '../animations/motionConfig';

interface ArticlesHubPageProps {
  initialArticleId?: string | null;
  onBackHome: () => void;
  onDownloadCV: () => void;
  onOpenContact: () => void;
  onOpenPrivacy: () => void;
}

const HUB_BACKDROP_LETTERS = 'SEO';
const HUB_FORE_LETTERS = ['A', 'R', 'T', 'I', 'C', 'L', 'E', 'S'] as const;

export function ArticlesHubPage({
  initialArticleId = null,
  onBackHome,
  onDownloadCV,
  onOpenContact,
  onOpenPrivacy,
}: ArticlesHubPageProps) {
  const categories = ['All', ...Array.from(new Set(ARTICLES.map((a) => a.category)))];
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<ArticleItem | null>(() => {
    if (!initialArticleId) return null;
    return ARTICLES.find((a) => a.id === initialArticleId) || null;
  });

  useEffect(() => {
    if (!initialArticleId) {
      setActiveArticle(null);
    } else {
      setActiveArticle(ARTICLES.find((a) => a.id === initialArticleId) || null);
    }
  }, [initialArticleId]);

  const filteredArticles =
    selectedCategory === 'All'
      ? ARTICLES
      : ARTICLES.filter((a) => a.category === selectedCategory);

  const handleOpenArticle = (article: ArticleItem) => {
    setActiveArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Subtle Ambient Lighting matching Home Page */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 65% 42% at 50% 18%, rgba(113, 193, 173, 0.08) 0%, rgba(6, 77, 64, 0.08) 38%, rgba(0, 0, 0, 0) 75%)',
        }}
      />

      {/* Top Identity Header */}
      <div className="relative z-10">
        <Header onNavigateHome={onBackHome} />
      </div>

      <main className="relative z-10 flex-1 w-full max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 pb-16">
        {/* Top Back Navigation */}
        <div className="pt-2 pb-6 flex items-center justify-between gap-4 border-b border-white/10">
          <button
            type="button"
            onClick={() => {
              if (activeArticle) {
                setActiveArticle(null);
              } else {
                onBackHome();
              }
            }}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#A5A5A5] hover:text-[#71c1ad] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#71c1ad]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{activeArticle ? 'Back to Articles Hub' : 'Back to Portfolio'}</span>
          </button>

          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-6 h-6 rounded-[4px] overflow-hidden opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-200"
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
        </div>

        <AnimatePresence mode="wait">
          {activeArticle ? (
            /* Dedicated Article Detail View */
            <motion.article
              key={activeArticle.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.38, ease: MOTION_EASE.editorial }}
              className="py-10 sm:py-14 max-w-4xl mx-auto"
            >
              <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[#A5A5A5] mb-4">
                <span className="font-mono tabular-nums text-[#71c1ad]">
                  0{activeArticle.index}
                </span>
                <span aria-hidden="true">/</span>
                <span>{activeArticle.category}</span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#71c1ad]" />
                  {activeArticle.readTime}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl font-medium tracking-wide text-white leading-tight mb-6">
                {activeArticle.title}
              </h1>

              <div className="h-[1.5px] w-24 bg-[#71c1ad] mb-8" />

              <div className="border border-white/20 p-2 sm:p-3 bg-black/60 mb-10">
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={activeArticle.imageSrc}
                    alt={activeArticle.imageAlt}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <div className="space-y-6 text-sm sm:text-base leading-[1.85] text-[#D4D4D4]">
                <p className="text-base sm:text-lg text-white/95 font-normal leading-relaxed border-b border-white/10 pb-6">
                  {activeArticle.summary}
                </p>

                {activeArticle.previewParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {/* Next / Related Articles Strip */}
              <div className="mt-14 pt-8 border-t border-white/15">
                <p className="text-[11px] uppercase tracking-[0.24em] text-[#71c1ad] mb-5">
                  More Editorial Insights
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {ARTICLES.filter((a) => a.id !== activeArticle.id).map((other) => (
                    <button
                      key={other.id}
                      type="button"
                      onClick={() => handleOpenArticle(other)}
                      className="text-left border border-white/15 bg-[#050606] hover:border-[#71c1ad]/60 p-4 transition-colors cursor-pointer group"
                    >
                      <span className="text-[10px] font-mono tabular-nums text-[#71c1ad]">
                        0{other.index} · {other.readTime}
                      </span>
                      <h2 className="mt-2 text-xs font-medium uppercase tracking-[0.06em] text-white group-hover:text-[#71c1ad] transition-colors line-clamp-2">
                        {other.title}
                      </h2>
                    </button>
                  ))}
                </div>
              </div>
            </motion.article>
          ) : (
            /* Articles Hub Landing Composition matching Home Hero & Editorial Strip */
            <motion.div
              key="hub-overview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {/* Hub Hero Header matching Home Page SEO / SPECIALIST motif */}
              <div className="py-12 sm:py-16 flex flex-col items-center text-center">
                <div className="relative inline-flex items-center justify-center select-none max-w-full">
                  <span
                    aria-hidden="true"
                    className="font-serif font-medium uppercase leading-none text-[clamp(4.25rem,18vw,13.5rem)] tracking-[0.22em] sm:tracking-[0.28em] mr-[-0.22em] sm:mr-[-0.28em] bg-gradient-to-b from-[#2E3436] via-[#1C2022] to-[#0A0C0D] bg-clip-text text-transparent"
                  >
                    {HUB_BACKDROP_LETTERS}
                  </span>

                  <h1 className="absolute inset-0 flex items-center justify-center">
                    <span className="sr-only">Articles and Case Studies Hub — Jonathan Fanai</span>
                    <motion.span
                      aria-hidden="true"
                      initial={{ opacity: 0, y: 14, scaleX: 0.88 }}
                      animate={{ opacity: 1, y: 0, scaleX: 1 }}
                      transition={{ duration: MOTION_DURATION.slow, ease: MOTION_EASE.editorial }}
                      className="w-full flex items-center justify-between font-serif font-normal uppercase text-white text-[clamp(1rem,3.1vw,2.75rem)] leading-none drop-shadow-[0_2px_24px_rgba(0,0,0,0.95)]"
                    >
                      {HUB_FORE_LETTERS.map((ch, i) => (
                        <span key={i}>{ch}</span>
                      ))}
                    </motion.span>
                  </h1>
                </div>

                <div className="w-full max-w-[680px] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mt-6 mb-6" />

                <p className="text-xs sm:text-sm text-[#A5A5A5] max-w-xl leading-relaxed mb-7">
                  Editorial essays, organic growth perspectives, and search strategy notes across{' '}
                  <span className="text-[#71c1ad]">SEO</span>,{' '}
                  <span className="text-[#71c1ad]">AEO / GEO</span>, and brand stewardship.
                </p>

                {/* Category Filter Tabs */}
                <div
                  role="tablist"
                  aria-label="Filter articles by category"
                  className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
                >
                  {categories.map((cat) => {
                    const isActive = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-5 py-2 rounded-full border text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.22em] transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                          isActive
                            ? 'border-[#71c1ad] bg-[#71c1ad]/10 text-[#71c1ad]'
                            : 'border-white/25 text-white/80 hover:border-white/50 hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Editorial Grid framed with matching hairline border */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: MOTION_DURATION.medium, ease: MOTION_EASE.editorial }}
                className="border border-white/20 p-3 sm:p-4 bg-[#040505]"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {filteredArticles.map((article) => (
                    <article
                      key={article.id}
                      onClick={() => handleOpenArticle(article)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleOpenArticle(article);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      className="group relative border border-white/15 hover:border-[#71c1ad]/70 bg-black overflow-hidden cursor-pointer transition-colors duration-300 flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#71c1ad]"
                    >
                      <div className="relative aspect-[16/9] w-full overflow-hidden">
                        <img
                          src={article.imageSrc}
                          alt={article.imageAlt}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent"
                        />
                      </div>

                      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-4">
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between gap-2 text-[10px] uppercase tracking-[0.2em] text-[#A5A5A5]">
                            <span className="font-mono tabular-nums text-[#71c1ad]">
                              0{article.index}
                            </span>
                            <span>
                              {article.category} · {article.readTime}
                            </span>
                          </div>

                          <h2 className="text-base sm:text-lg font-semibold uppercase tracking-[0.05em] text-white group-hover:text-[#71c1ad] transition-colors">
                            {article.title}
                          </h2>

                          <p className="text-xs leading-relaxed text-[#A5A5A5]">
                            {article.summary}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                          <span className="text-[11px] uppercase tracking-[0.22em] text-[#71c1ad] font-medium inline-flex items-center gap-1.5">
                            <span>Read Article</span>
                            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Newsletter onOpenPrivacy={onOpenPrivacy} />

      <Footer
        onDownloadCV={onDownloadCV}
        onOpenContact={onOpenContact}
        onOpenArticlesHub={() => {
          setActiveArticle(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateHome={onBackHome}
      />
    </div>
  );
}

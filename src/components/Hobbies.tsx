import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { HOBBY_SLIDES } from '../data/expertise';
import { MOTION_DURATION, MOTION_EASE, VIEWPORT_ONCE } from '../animations/motionConfig';

interface HobbiesProps {
  onHireMe: () => void;
}

export function Hobbies({ onHireMe }: HobbiesProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = HOBBY_SLIDES[activeSlide];
  const isLight = slide.theme === 'light';

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + HOBBY_SLIDES.length) % HOBBY_SLIDES.length);
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % HOBBY_SLIDES.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, clipPath: 'inset(0% 0% 0% 8%)' }}
      whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: MOTION_DURATION.slow, ease: MOTION_EASE.editorial }}
      className="relative w-full h-full min-h-[440px] lg:min-h-[510px] overflow-hidden bg-[#0B0D0E] select-none flex flex-col justify-between"
    >
      {/* Background Photograph with smooth crossfade */}
      <AnimatePresence mode="wait">
        <motion.img
          key={slide.id}
          src={slide.imageSrc}
          alt={slide.imageAlt}
          loading="lazy"
          referrerPolicy="no-referrer"
          initial={{ opacity: 0.25, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0.25 }}
          transition={{ duration: 0.5, ease: MOTION_EASE.editorial }}
          style={{ objectPosition: slide.objectPosition }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Theme-aware measured contrast scrim */}
      <div
        aria-hidden="true"
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: isLight
            ? 'linear-gradient(90deg, rgba(236, 239, 241, 0.93) 0%, rgba(236, 239, 241, 0.78) 44%, rgba(236, 239, 241, 0.14) 74%, rgba(0, 0, 0, 0) 100%)'
            : 'linear-gradient(90deg, rgba(5, 7, 8, 0.90) 0%, rgba(5, 7, 8, 0.72) 48%, rgba(5, 7, 8, 0.28) 80%, rgba(5, 7, 8, 0.18) 100%)',
        }}
      />

      {/* Giant Top-Right Stencil Header "HOBBIES" */}
      <div className="relative z-10 flex justify-end px-6 sm:px-8 pt-4 sm:pt-5">
        <span
          className={`font-sans font-extrabold uppercase tracking-[0.04em] text-[clamp(2.1rem,4.4vw,3.5rem)] leading-none transition-colors duration-300 ${
            isLight
              ? 'text-[#535A5E]/90 drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]'
              : 'text-white/25 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]'
          }`}
        >
          HOBBIES
        </span>
      </div>

      {/* Left Overlay Content: TREKKING / FOOTBALL / SWIMMING + Hire Me */}
      <div className="relative z-10 px-6 sm:px-8 pt-4 pb-14 max-w-[320px] sm:max-w-[340px] flex flex-col justify-between my-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: MOTION_EASE.editorial }}
          >
            <h3
              className={`text-sm sm:text-[15px] font-bold uppercase tracking-[0.16em] pb-1.5 w-fit mb-3.5 border-b ${
                isLight
                  ? 'text-[#111111] border-black/45'
                  : 'text-[#71c1ad] border-[#71c1ad]/60'
              }`}
            >
              {slide.heading}
            </h3>

            <div
              className={`space-y-3 text-[11px] sm:text-xs leading-[1.6] font-medium ${
                isLight ? 'text-[#1F2426]' : 'text-[#E2E8E7]'
              }`}
            >
              {slide.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-7 flex items-center gap-3">
          <button
            type="button"
            onClick={onHireMe}
            className={`px-8 py-2 rounded-full border text-[11px] font-semibold uppercase tracking-[0.26em] transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#71c1ad] ${
              isLight
                ? 'border-[#111111]/75 text-[#111111] hover:bg-[#111111] hover:text-[#71c1ad]'
                : 'border-white/50 text-white hover:border-[#71c1ad] hover:bg-[#71c1ad] hover:text-black'
            }`}
          >
            Hire Me
          </button>
        </div>
      </div>

      {/* Previous & Next Carousel Controls */}
      <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next hobby highlight"
          className="w-9 h-9 rounded-full bg-black/35 hover:bg-black/70 border border-white/20 text-white flex items-center justify-center backdrop-blur-[2px] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#71c1ad]"
        >
          <ChevronRight className="w-4 h-4" strokeWidth={2} />
        </button>
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous hobby highlight"
          className="w-9 h-9 rounded-full bg-black/35 hover:bg-black/70 border border-white/20 text-white flex items-center justify-center backdrop-blur-[2px] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#71c1ad]"
        >
          <ChevronLeft className="w-4 h-4" strokeWidth={2} />
        </button>
      </div>

      {/* Bottom Slide Switcher & Pagination Dots */}
      <div
        className="absolute bottom-4 left-6 right-6 z-20 flex items-center justify-between gap-4"
        role="tablist"
        aria-label="Hobbies slides"
      >
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.18em]">
          {HOBBY_SLIDES.map((s, idx) => {
            const isActive = idx === activeSlide;
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveSlide(idx)}
                className={`transition-colors cursor-pointer whitespace-nowrap ${
                  isActive
                    ? isLight
                      ? 'text-[#111111] font-bold underline underline-offset-4'
                      : 'text-[#71c1ad] font-bold underline underline-offset-4'
                    : isLight
                      ? 'text-[#111111]/55 hover:text-[#111111]'
                      : 'text-white/60 hover:text-white'
                }`}
              >
                {s.heading}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5">
          {HOBBY_SLIDES.map((s, idx) => {
            const isActive = idx === activeSlide;
            return (
              <button
                key={s.id}
                type="button"
                aria-label={`Show ${s.heading}`}
                onClick={() => setActiveSlide(idx)}
                className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'w-5 bg-[#71c1ad]'
                    : isLight
                      ? 'w-2 bg-black/30 hover:bg-black/60'
                      : 'w-2 bg-white/45 hover:bg-white'
                }`}
              />
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

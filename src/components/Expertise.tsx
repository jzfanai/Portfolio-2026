import { motion } from 'motion/react';
import { SEO_EXPERTISE, AEO_GEO_EXPERTISE } from '../data/expertise';
import { Hobbies } from './Hobbies';
import { staggerContainerVariants, staggerItemVariants } from '../animations/scrollAnimations';
import { VIEWPORT_ONCE } from '../animations/motionConfig';

interface ExpertiseProps {
  onHireMe: () => void;
}

export function Expertise({ onHireMe }: ExpertiseProps) {
  return (
    <section
      id="expertise"
      aria-label="Expertise, Skills and Hobbies"
      className="relative w-full max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16"
    >
      <div className="border border-white/15 bg-[#040505]">
        {/* Slightly decreased Hobbies column width (~42% vs 50%) for balanced 3-column editorial proportions */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr_1.45fr] lg:divide-x divide-y lg:divide-y-0 divide-white/15 items-stretch">
          {/* Left Column: SEO */}
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="p-6 sm:p-7 flex flex-col"
          >
            <div className="border-b border-white/25 pb-2.5 mb-6 text-center">
              <h2 className="text-xs sm:text-[13px] font-medium uppercase tracking-[0.22em] text-[#A5A5A5]">
                SEO
              </h2>
            </div>

            <div className="space-y-6">
              {SEO_EXPERTISE.map((item) => (
                <motion.div
                  key={item.id}
                  variants={staggerItemVariants}
                  className="group"
                >
                  <h3 className="text-sm sm:text-[15px] font-medium text-white group-hover:text-[#71c1ad] transition-colors pb-1 border-b border-white/20 w-fit pr-8">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-[11px] sm:text-xs leading-[1.65] text-[#A5A5A5]">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Middle Column: AEO / GEO */}
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="p-6 sm:p-7 flex flex-col"
          >
            <div className="border-b border-white/25 pb-2.5 mb-6 text-center">
              <h2 className="text-xs sm:text-[13px] font-medium uppercase tracking-[0.22em] text-[#A5A5A5]">
                AEO / GEO
              </h2>
            </div>

            <div className="space-y-7">
              {AEO_GEO_EXPERTISE.map((item) => (
                <motion.div
                  key={item.id}
                  variants={staggerItemVariants}
                  className="group"
                >
                  <h3 className="text-sm sm:text-[15px] font-medium text-white group-hover:text-[#71c1ad] transition-colors pb-1 border-b border-white/20 w-fit pr-8">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-[11px] sm:text-xs leading-[1.65] text-[#A5A5A5]">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Hobbies / Trekking / Football / Swimming */}
          <div className="p-3 sm:p-4 flex">
            <Hobbies onHireMe={onHireMe} />
          </div>
        </div>
      </div>
    </section>
  );
}

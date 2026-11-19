import { motion } from 'motion/react';
import { SITE_CONFIG } from '../config/siteConfig';
import { PersonalInfo } from './PersonalInfo';
import { InteractiveAvatar } from './InteractiveAvatar';
import { fadeUpVariants, imageClipRevealVariants } from '../animations/scrollAnimations';
import { VIEWPORT_ONCE } from '../animations/motionConfig';

export function Introduction() {
  return (
    <section
      id="about"
      aria-label="Personal Introduction and Information"
      className="relative w-full max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-6">
        {/* Left: Personal Information */}
        <div className="lg:col-span-4 order-2 lg:order-1 flex justify-start">
          <PersonalInfo />
        </div>

        {/* Center: B&W Interactive Portrait Avatar with Gradient Pixel Scatter */}
        <motion.div
          variants={imageClipRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="lg:col-span-4 order-1 lg:order-2 flex justify-center relative"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 w-[260px] h-[260px] rounded-full bg-[#71c1ad]/[0.06] blur-3xl"
          />
          <InteractiveAvatar />
        </motion.div>

        {/* Right: Introduction Copy */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="lg:col-span-4 order-3 flex flex-col items-start lg:items-end text-left lg:text-right"
        >
          <div className="w-full max-w-[440px]">
            <h2 className="text-xl sm:text-2xl lg:text-[26px] font-light tracking-wide text-white mb-4 flex items-baseline justify-start lg:justify-end gap-2.5 border-r-0 lg:border-r lg:border-white/25 lg:pr-4">
              <span className="text-[#D4D4D4]">{SITE_CONFIG.intro.greetingPrefix}</span>
              <span className="font-semibold tracking-[0.06em] text-white">
                {SITE_CONFIG.intro.greetingName}
              </span>
            </h2>

            <p className="text-xs sm:text-[13.5px] leading-[1.75] text-[#A5A5A5] font-normal">
              {SITE_CONFIG.intro.bioSegments.map((segment, index) =>
                segment.accent ? (
                  <span key={index} className="text-[#71c1ad] font-medium">
                    {segment.text}
                  </span>
                ) : (
                  <span key={index}>{segment.text}</span>
                )
              )}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

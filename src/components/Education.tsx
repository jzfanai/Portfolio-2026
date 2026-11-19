import type { EducationMilestone } from '../data/education';

interface EducationProps {
  milestones: EducationMilestone[];
}

export function Education({ milestones }: EducationProps) {
  return (
    <div id="education" className="relative">
      {/* Mobile Section Heading */}
      <div className="md:hidden pl-8 mb-4">
        <h2 className="font-serif text-3xl font-medium text-[#3A3F42] tracking-tight">
          Education
        </h2>
      </div>

      {milestones.map((edu, index) => {
        const isLeft = edu.side === 'left';
        const showEducationHeading = index === 0;
        const showEducationSpineLabel = index === 0;

        const eduCard = (
          <div
            className={`timeline-milestone-card ${
              isLeft ? 'md:text-left' : 'md:text-right'
            }`}
          >
            <h3
              className="text-lg sm:text-xl lg:text-[22px] font-semibold tracking-tight"
              style={{ color: edu.accentColor }}
            >
              {edu.institution}
            </h3>

            <p className="text-sm sm:text-[15px] text-white/95 font-normal mt-1">
              {edu.qualification}
            </p>

            <p className="text-xs sm:text-[13px] text-[#A5A5A5] font-mono tabular-nums mt-0.5">
              {edu.duration}
            </p>

            {/* Design Thinking Badge */}
            {edu.badgeIcon && (
              <div
                className={`mt-3.5 flex items-center gap-3 ${
                  isLeft ? 'justify-start' : 'md:justify-end justify-start'
                }`}
              >
                <div
                  title={edu.badgeIcon.name}
                  className="w-10 h-10 rounded-md bg-white/[0.04] border border-white/10 p-1 flex items-center justify-center"
                >
                  <img
                    src={edu.badgeIcon.src}
                    alt={edu.badgeIcon.name}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}
          </div>
        );

        return (
          <div
            key={edu.id}
            data-side={edu.side}
            className="timeline-milestone-row relative grid grid-cols-1 md:grid-cols-12 items-start py-10 md:py-12 pl-8 md:pl-0"
          >
            {/* Mobile Left Node */}
            <div className="md:hidden absolute left-[7px] top-12 -translate-x-1/2 flex items-center justify-center z-20">
              <span
                className="timeline-node-halo absolute w-6 h-6 rounded-full blur-[4px]"
                style={{ backgroundColor: edu.glowColor }}
              />
              <span
                className="timeline-node-dot relative w-2.5 h-2.5 rounded-full border border-white/80 bg-black"
                style={{ boxShadow: `0 0 10px ${edu.glowColor}` }}
              />
            </div>

            {/* Left Column */}
            <div className="md:col-span-5 md:pr-10 lg:pr-14 relative">
              {isLeft ? eduCard : <div className="hidden md:block" aria-hidden="true" />}
            </div>

            {/* Center Spine Node & Connector */}
            <div className="hidden md:flex md:col-span-2 relative justify-center items-start pt-3">
              {showEducationSpineLabel && (
                <div className="absolute top-14 right-[calc(50%+12px)] z-20 pointer-events-none select-none">
                  <span
                    className="text-[9px] tracking-[0.34em] uppercase font-medium whitespace-nowrap text-[#D4A359]"
                    style={{
                      writingMode: 'vertical-rl',
                      transform: 'rotate(180deg)',
                    }}
                  >
                    EDUCATION
                  </span>
                </div>
              )}

              <div className="relative flex items-center justify-center z-20">
                <span
                  className="timeline-node-halo absolute w-7 h-7 rounded-full blur-[6px]"
                  style={{ backgroundColor: edu.glowColor }}
                />
                <span
                  className="timeline-node-dot relative w-3 h-3 rounded-full border-2 bg-black"
                  style={{
                    borderColor: edu.accentColor,
                    boxShadow: `0 0 14px ${edu.glowColor}`,
                  }}
                />
              </div>

              {isLeft ? (
                <svg
                  aria-hidden="true"
                  className="absolute right-1/2 top-[18px] w-[140px] lg:w-[200px] h-[36px] pointer-events-none overflow-visible"
                  viewBox="0 0 200 36"
                  fill="none"
                >
                  <path
                    className="timeline-branch-path"
                    d="M 200 2 L 130 2 L 106 24 L 0 24"
                    stroke="rgba(255,255,255,0.28)"
                    strokeWidth="1"
                  />
                </svg>
              ) : (
                <svg
                  aria-hidden="true"
                  className="absolute left-1/2 top-[18px] w-[140px] lg:w-[200px] h-[36px] pointer-events-none overflow-visible"
                  viewBox="0 0 200 36"
                  fill="none"
                >
                  <path
                    className="timeline-branch-path"
                    d="M 0 2 L 70 2 L 94 24 L 200 24"
                    stroke="rgba(255,255,255,0.28)"
                    strokeWidth="1"
                  />
                </svg>
              )}
            </div>

            {/* Right Column */}
            <div className="md:col-span-5 md:pl-10 lg:pl-14 relative">
              {showEducationHeading && (
                <div className="timeline-section-heading hidden md:block text-right mb-10 select-none">
                  <h2 className="font-serif text-[clamp(2.5rem,4.6vw,4rem)] leading-[0.95] font-medium text-[#2A2E30] tracking-tight">
                    Education
                  </h2>
                </div>
              )}

              {!isLeft ? eduCard : <div className="hidden md:block" aria-hidden="true" />}
            </div>
          </div>
        );
      })}
    </div>
  );
}

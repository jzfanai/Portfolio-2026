import type { CareerMilestone } from '../data/career';

interface TimelineMilestoneProps {
  milestone: CareerMilestone;
  sectionHeading?: {
    line1: string;
    line2?: string;
  };
  segmentLabel?: {
    text: string;
    color: string;
    side: 'left' | 'right';
  };
  isExpanded: boolean;
  onToggleExpand: (id: string) => void;
}

export function TimelineMilestone({
  milestone,
  sectionHeading,
  segmentLabel,
  isExpanded,
  onToggleExpand,
}: TimelineMilestoneProps) {
  const isLeft = milestone.side === 'left';

  const contentBlock = (
    <div
      className={`timeline-milestone-card group cursor-pointer transition-opacity duration-500 ${
        isLeft ? 'md:text-left' : 'md:text-right'
      }`}
      onClick={() => onToggleExpand(milestone.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggleExpand(milestone.id);
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
    >
      <h3
        className="text-lg sm:text-xl lg:text-[22px] font-semibold tracking-tight transition-colors duration-300"
        style={{ color: milestone.accentColor }}
      >
        {milestone.company}
      </h3>

      <p className="text-sm sm:text-[15px] text-white/95 font-normal mt-1">
        {milestone.position}
      </p>

      <p className="text-xs sm:text-[13px] text-[#A5A5A5] font-mono tabular-nums mt-0.5">
        {milestone.duration}
      </p>

      {/* Expandable concise role context */}
      <div
        className={`grid transition-all duration-300 ease-out ${
          isExpanded ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0 mt-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-xs leading-relaxed text-[#A5A5A5] max-w-sm border-t border-white/10 pt-2.5 inline-block">
            {milestone.summary}
          </p>
        </div>
      </div>

      {/* Tool & Technology Icons */}
      <div
        className={`mt-4 flex flex-col gap-2.5 ${
          isLeft ? 'items-start' : 'md:items-end items-start'
        }`}
      >
        {milestone.iconRows.map((row, rowIdx) => (
          <div key={rowIdx} className="flex items-center gap-3 flex-wrap">
            {row.map((tool) => (
              <div
                key={tool.name}
                title={tool.name}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-white/[0.04] border border-white/10 p-1 flex items-center justify-center hover:border-[#64D8C5]/50 hover:bg-white/[0.08] transition-all duration-200"
              >
                <img
                  src={tool.src}
                  alt={tool.name}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <span className="mt-2.5 inline-block text-[10px] uppercase tracking-[0.2em] text-[#707070] group-hover:text-[#64D8C5] transition-colors">
        {isExpanded ? 'Hide focus −' : 'Role focus +'}
      </span>
    </div>
  );

  return (
    <div
      data-side={milestone.side}
      className="timeline-milestone-row relative grid grid-cols-1 md:grid-cols-12 items-start py-10 md:py-14 pl-8 md:pl-0"
    >
      {/* Mobile Left Node */}
      <div className="md:hidden absolute left-[7px] top-12 -translate-x-1/2 flex items-center justify-center z-20">
        <span
          className="timeline-node-halo absolute w-6 h-6 rounded-full blur-[4px]"
          style={{ backgroundColor: milestone.glowColor }}
        />
        <span
          className="timeline-node-dot relative w-2.5 h-2.5 rounded-full border border-white/80 bg-black"
          style={{ boxShadow: `0 0 10px ${milestone.glowColor}` }}
        />
      </div>

      {/* Left Column (Desktop) */}
      <div className="md:col-span-5 md:pr-10 lg:pr-14 relative">
        {isLeft ? (
          contentBlock
        ) : (
          <div className="hidden md:block" aria-hidden="true" />
        )}
      </div>

      {/* Center Spine Node & Stepped Horizontal Connector (Desktop) */}
      <div className="hidden md:flex md:col-span-2 relative justify-center items-start pt-3">
        {/* Vertical Rotated Segment Label tucked next to the central spine */}
        {segmentLabel && (
          <div
            className={`absolute top-16 z-20 pointer-events-none select-none flex items-center gap-2 ${
              segmentLabel.side === 'left' ? 'right-[calc(50%+12px)]' : 'left-[calc(50%+12px)]'
            }`}
          >
            <span
              className="text-[9px] tracking-[0.34em] uppercase font-medium whitespace-nowrap"
              style={{
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
                color: segmentLabel.color,
              }}
            >
              {segmentLabel.text}
            </span>
          </div>
        )}

        {/* Glowing Center Node */}
        <div className="relative flex items-center justify-center z-20">
          <span
            className="timeline-node-halo absolute w-7 h-7 rounded-full blur-[6px]"
            style={{ backgroundColor: milestone.glowColor }}
          />
          <span
            className="timeline-node-dot relative w-3 h-3 rounded-full border-2 bg-black transition-transform duration-300"
            style={{
              borderColor: milestone.accentColor,
              boxShadow: `0 0 14px ${milestone.glowColor}`,
            }}
          />
        </div>

        {/* Stepped SVG Branch Line extending Left or Right */}
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

      {/* Right Column (Desktop) */}
      <div className="md:col-span-5 md:pl-10 lg:pl-14 relative">
        {sectionHeading && (
          <div className="timeline-section-heading hidden md:block text-right mb-10 select-none">
            <h2 className="font-serif text-[clamp(2.5rem,4.6vw,4rem)] leading-[0.95] font-medium text-[#2A2E30] tracking-tight">
              {sectionHeading.line1}
              {sectionHeading.line2 && (
                <>
                  <br />
                  {sectionHeading.line2}
                </>
              )}
            </h2>
          </div>
        )}

        {!isLeft ? (
          <div className={sectionHeading ? 'mt-4' : ''}>{contentBlock}</div>
        ) : (
          <div className="hidden md:block" aria-hidden="true" />
        )}
      </div>
    </div>
  );
}

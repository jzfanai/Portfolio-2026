import { useEffect, useRef, useState } from 'react';
import { ArrowDownCircle } from 'lucide-react';
import { CAREER_MILESTONES } from '../data/career';
import { EDUCATION_MILESTONES } from '../data/education';
import { TimelineMilestone } from './TimelineMilestone';
import { Education } from './Education';
import { initCareerTimelineAnimations } from '../animations/timelineAnimations';

interface CareerTimelineProps {
  onDownloadCV: () => void;
}

export function CareerTimeline({ onDownloadCV }: CareerTimelineProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = initCareerTimelineAnimations(el);
    return () => {
      ctx.revert();
    };
  }, []);

  const handleToggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="career"
      ref={containerRef}
      aria-label="Career Journey and Education"
      className="relative w-full max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-20"
    >
      {/* Mobile Section Heading */}
      <div className="md:hidden pl-8 mb-6">
        <h2 className="font-serif text-3xl font-medium text-[#3A3F42] tracking-tight">
          Work Experience
        </h2>
      </div>

      {/* Timeline Track Wrapper */}
      <div className="relative">
        {/* Desktop Central Vertical Spine */}
        <div
          aria-hidden="true"
          className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-14 w-[1.5px] bg-white/15"
        >
          <div
            className="timeline-progress-line w-full h-full origin-top"
            style={{
              background:
                'linear-gradient(180deg, #64D8C5 0%, #78B87E 30%, #4EA8DE 62%, #D4A359 88%, #64D8C5 100%)',
              boxShadow: '0 0 12px rgba(100, 216, 197, 0.4)',
            }}
          />
        </div>

        {/* Mobile Left Vertical Spine */}
        <div
          aria-hidden="true"
          className="md:hidden absolute left-[7px] top-0 bottom-12 w-[1.5px] bg-white/15"
        >
          <div
            className="timeline-mobile-progress w-full h-full origin-top"
            style={{
              background:
                'linear-gradient(180deg, #64D8C5 0%, #4EA8DE 55%, #D4A359 100%)',
            }}
          />
        </div>

        {/* Career Experience Milestones */}
        {CAREER_MILESTONES.map((milestone, index) => {
          const isEsko = index === 0;
          const isTis = milestone.segment === 'TECHNICAL INTERNSHIP';

          return (
            <TimelineMilestone
              key={milestone.id}
              milestone={milestone}
              isExpanded={expandedId === milestone.id}
              onToggleExpand={handleToggleExpand}
              sectionHeading={
                isEsko ? { line1: 'Work', line2: 'Experience' } : undefined
              }
              segmentLabel={
                isEsko
                  ? {
                      text: 'WORK EXPERIENCE',
                      color: '#78B87E',
                      side: 'left',
                    }
                  : isTis
                    ? {
                        text: 'TECHNICAL INTERNSHIP',
                        color: '#4EA8DE',
                        side: 'right',
                      }
                    : undefined
              }
            />
          );
        })}

        {/* Education Continuation */}
        <Education milestones={EDUCATION_MILESTONES} />

        {/* Stage 5 — Journey Completion Milestone & Download CV CTA */}
        <div className="timeline-completion relative pt-8 pb-2 flex flex-col items-start md:items-center pl-8 md:pl-0">
          <div className="hidden md:flex items-center justify-center mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-[#64D8C5] shadow-[0_0_16px_rgba(100,216,197,0.85)]" />
          </div>

          <button
            type="button"
            onClick={onDownloadCV}
            className="inline-flex items-center gap-2.5 px-7 py-2.5 rounded-full border border-white/35 bg-black text-[11px] font-medium uppercase tracking-[0.26em] text-white hover:border-[#64D8C5] hover:text-[#64D8C5] hover:shadow-[0_0_24px_rgba(100,216,197,0.2)] transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64D8C5]"
          >
            <span>Download CV</span>
            <ArrowDownCircle className="w-4 h-4 text-[#64D8C5]" strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </section>
  );
}

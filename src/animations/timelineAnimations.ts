import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './motionConfig';

gsap.registerPlugin(ScrollTrigger);

/**
 * Initializes the GSAP ScrollTrigger cinematic career journey.
 * Uses gsap.context() for clean React 19 StrictMode teardown.
 */
export function initCareerTimelineAnimations(containerEl: HTMLElement): gsap.Context {
  const ctx = gsap.context(() => {
    if (prefersReducedMotion()) {
      gsap.set('.timeline-progress-line', { scaleY: 1 });
      gsap.set('.timeline-branch-path', { strokeDashoffset: 0 });
      gsap.set('.timeline-milestone-card', { opacity: 1, x: 0, y: 0 });
      gsap.set('.timeline-node-dot', { scale: 1, opacity: 1 });
      return;
    }

    // 1. Continuous central spine progress driven by scroll
    const progressLine = containerEl.querySelector('.timeline-progress-line');
    if (progressLine) {
      gsap.fromTo(
        progressLine,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerEl,
            start: 'top 68%',
            end: 'bottom 78%',
            scrub: 0.45,
          },
        }
      );
    }

    // 2. Mobile left vertical spine progress
    const mobileProgressLine = containerEl.querySelector('.timeline-mobile-progress');
    if (mobileProgressLine) {
      gsap.fromTo(
        mobileProgressLine,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerEl,
            start: 'top 72%',
            end: 'bottom 80%',
            scrub: 0.45,
          },
        }
      );
    }

    // 3. Milestone-by-milestone progressive illumination, branch drawing & subtle parallax
    const milestoneItems = gsap.utils.toArray<HTMLElement>('.timeline-milestone-row', containerEl);

    milestoneItems.forEach((row) => {
      const side = row.dataset.side || 'left';
      const card = row.querySelector<HTMLElement>('.timeline-milestone-card');
      const branchPath = row.querySelector<SVGPathElement>('.timeline-branch-path');
      const nodeDot = row.querySelector<HTMLElement>('.timeline-node-dot');
      const nodeHalo = row.querySelector<HTMLElement>('.timeline-node-halo');
      const sectionHeading = row.querySelector<HTMLElement>('.timeline-section-heading');

      // Prepare SVG stroke dash draw
      if (branchPath) {
        const length = branchPath.getTotalLength ? branchPath.getTotalLength() : 220;
        gsap.set(branchPath, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      }

      const xOffset = side === 'left' ? -36 : 36;

      if (card) {
        gsap.set(card, { opacity: 0.25, x: xOffset });
      }

      // Main milestone reveal timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: 'top 76%',
          end: 'bottom 45%',
          toggleActions: 'play none none reverse',
          onEnter: () => row.setAttribute('data-active', 'true'),
          onLeave: () => row.setAttribute('data-active', 'past'),
          onEnterBack: () => row.setAttribute('data-active', 'true'),
          onLeaveBack: () => row.setAttribute('data-active', 'upcoming'),
        },
      });

      if (nodeHalo) {
        tl.fromTo(
          nodeHalo,
          { scale: 0.4, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.45, ease: 'power2.out' },
          0
        );
      }

      if (nodeDot) {
        tl.fromTo(
          nodeDot,
          { scale: 0.65, opacity: 0.5 },
          { scale: 1.15, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' },
          0
        );
      }

      if (branchPath) {
        tl.to(
          branchPath,
          {
            strokeDashoffset: 0,
            duration: 0.65,
            ease: 'power2.out',
          },
          0.08
        );
      }

      if (card) {
        tl.to(
          card,
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power3.out',
          },
          0.14
        );
      }

      // Subtle restrained parallax on giant muted headings ("Work Experience", "Education")
      if (sectionHeading) {
        gsap.fromTo(
          sectionHeading,
          { y: 28, opacity: 0.35 },
          {
            y: -16,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: row,
              start: 'top 90%',
              end: 'bottom 20%',
              scrub: 0.6,
            },
          }
        );
      }
    });

    // 4. Journey completion CTA reveal
    const completionEl = containerEl.querySelector('.timeline-completion');
    if (completionEl) {
      gsap.fromTo(
        completionEl,
        { opacity: 0, y: 20, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: completionEl,
            start: 'top 86%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, containerEl);

  return ctx;
}

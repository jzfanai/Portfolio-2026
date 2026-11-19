import { useState, type FormEvent } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { SITE_CONFIG } from '../config/siteConfig';
import { SOCIAL_LINKS } from '../data/socialLinks';
import { fadeUpVariants } from '../animations/scrollAnimations';
import { VIEWPORT_ONCE } from '../animations/motionConfig';

interface NewsletterProps {
  onOpenPrivacy: () => void;
}

export function Newsletter({ onOpenPrivacy }: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'configured-notice'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    if (!SITE_CONFIG.newsletterEndpoint) {
      setStatus('configured-notice');
      setMessage(
        'Newsletter endpoint not yet connected. Configure SITE_CONFIG.newsletterEndpoint in src/config/siteConfig.ts to activate live subscriptions.'
      );
      return;
    }

    // Ready for live provider integration when endpoint is configured
    setStatus('configured-notice');
    setMessage('Request prepared for newsletter integration.');
  };

  return (
    <motion.section
      aria-label="Newsletter and Copyright Bar"
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      className="relative z-10 w-full max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 pt-4 pb-10 border-b border-white/10"
    >
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        {/* Left: Copyright */}
        <div className="text-[11px] sm:text-xs text-[#A5A5A5] tracking-wide">
          <span>&copy; {SITE_CONFIG.copyrightYear} </span>
          <span className="text-[#64D8C5] font-semibold">{SITE_CONFIG.brand}</span>
          <span> All Rights Reserved.</span>
        </div>

        {/* Right: Newsletter Input + Socials + Privacy Policy */}
        <div className="w-full md:w-auto flex flex-col items-start md:items-end gap-2.5">
          <div className="w-full md:w-auto flex flex-wrap sm:flex-nowrap items-end gap-4">
            <form onSubmit={handleSubmit} noValidate className="flex-1 sm:flex-initial">
              <label
                htmlFor="newsletter-email"
                className="block text-[10px] uppercase tracking-[0.22em] text-[#A5A5A5] mb-1.5"
              >
                Newsletter
              </label>

              <div className="flex items-center border-b border-white/30 focus-within:border-[#64D8C5] transition-colors pb-1.5 w-full sm:w-[270px]">
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== 'idle') setStatus('idle');
                  }}
                  placeholder="Enter your email"
                  aria-describedby={message ? 'newsletter-feedback' : undefined}
                  className="w-full bg-transparent text-xs text-white placeholder:text-[#707070] focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="ml-2 text-white/75 hover:text-[#64D8C5] transition-colors shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#64D8C5]"
                >
                  {status === 'configured-notice' ? (
                    <Check className="w-4 h-4 text-[#64D8C5]" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </button>
              </div>
            </form>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pb-1">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-6 h-6 rounded-[4px] overflow-hidden opacity-85 hover:opacity-100 hover:scale-110 transition-all duration-200"
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

          {message && (
            <p
              id="newsletter-feedback"
              role="status"
              className={`text-[11px] max-w-sm md:text-right ${
                status === 'error' ? 'text-rose-400' : 'text-[#64D8C5]'
              }`}
            >
              {message}
            </p>
          )}

          <button
            type="button"
            onClick={onOpenPrivacy}
            className="text-[10px] uppercase tracking-[0.2em] text-[#A5A5A5] hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:underline"
          >
            Privacy Policy
          </button>
        </div>
      </div>
    </motion.section>
  );
}

import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import {
  X,
  Download,
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SITE_CONFIG } from '../config/siteConfig';
import { CAREER_MILESTONES } from '../data/career';
import { EDUCATION_MILESTONES } from '../data/education';
import type { ArticleItem } from '../data/articles';
import { MOTION_EASE } from '../animations/motionConfig';

export type ModalType =
  | { kind: 'cv' }
  | { kind: 'contact' }
  | { kind: 'article'; article: ArticleItem }
  | { kind: 'privacy' }
  | null;

interface ModalsProps {
  activeModal: ModalType;
  onClose: () => void;
}

function ModalShell({
  title,
  subtitle,
  onClose,
  children,
}: {
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.28, ease: MOTION_EASE.editorial }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-[#080A0A] border border-white/20 shadow-[0_24px_80px_rgba(0,0,0,0.9)] overflow-hidden my-auto max-h-[88vh] flex flex-col"
      >
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-white/15 shrink-0">
          <div>
            {subtitle && (
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#71c1ad] mb-1">
                {subtitle}
              </p>
            )}
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-white tracking-wide">
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="w-9 h-9 flex items-center justify-center border border-white/15 text-[#A5A5A5] hover:text-white hover:border-[#71c1ad] transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#71c1ad]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5 text-sm text-[#D4D4D4]">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Modals({ activeModal, onClose }: ModalsProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactNotice, setContactNotice] = useState<string | null>(null);

  useEffect(() => {
    setContactNotice(null);
  }, [activeModal]);

  const handleCopy = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(label);
      setTimeout(() => setCopiedField(null), 1800);
    } catch {
      // Clipboard fallback ignored silently
    }
  };

  const handleDownloadPdf = async () => {
    try {
      const response = await fetch(SITE_CONFIG.cvPdfUrl);
      if (response.ok) {
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = SITE_CONFIG.cvFileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
        return;
      }
    } catch {
      // Fallback to direct anchor download below
    }
    const fallbackLink = document.createElement('a');
    fallbackLink.href = SITE_CONFIG.cvGoogleDriveDownloadUrl;
    fallbackLink.target = '_blank';
    fallbackLink.rel = 'noopener noreferrer';
    document.body.appendChild(fallbackLink);
    fallbackLink.click();
    document.body.removeChild(fallbackLink);
  };

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMsg.trim()) {
      setContactNotice('Please complete your name, email, and project inquiry.');
      return;
    }
    const subject = encodeURIComponent(`SEO Inquiry from ${contactName.trim()}`);
    const body = encodeURIComponent(
      `Name: ${contactName.trim()}\nEmail: ${contactEmail.trim()}\n\n${contactMsg.trim()}`
    );
    window.location.href = `mailto:${SITE_CONFIG.contact.email}?subject=${subject}&body=${body}`;
    setContactNotice('Opening your default email client with a pre-filled inquiry to jzfanai@gmail.com.');
  };

  return (
    <AnimatePresence>
      {activeModal?.kind === 'cv' && (
        <ModalShell
          title={`${SITE_CONFIG.name} — Curriculum Vitae`}
          subtitle={`${SITE_CONFIG.title} · ${SITE_CONFIG.organization}`}
          onClose={onClose}
        >
          <div className="border border-white/15 bg-black/50 p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
              <div>
                <p className="text-white font-semibold">{SITE_CONFIG.name}</p>
                <p className="text-xs text-[#A5A5A5]">
                  {SITE_CONFIG.location.street}, {SITE_CONFIG.location.cityFull} {SITE_CONFIG.location.postalCode}
                </p>
              </div>
              <div className="text-xs text-[#A5A5A5] sm:text-right tabular-nums">
                <p>{SITE_CONFIG.contact.email}</p>
                <p>{SITE_CONFIG.contact.phoneDisplay}</p>
              </div>
            </div>

            <div>
              <h3 className="text-[11px] uppercase tracking-[0.22em] text-[#71c1ad] mb-2">
                Experience
              </h3>
              <ul className="space-y-2.5 text-xs">
                {CAREER_MILESTONES.map((c) => (
                  <li key={c.id} className="flex flex-col sm:flex-row sm:justify-between gap-1">
                    <span>
                      <strong className="text-white">{c.company}</strong> — {c.position}
                    </span>
                    <span className="font-mono tabular-nums text-[#A5A5A5]">{c.duration}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[11px] uppercase tracking-[0.22em] text-[#71c1ad] mb-2">
                Education
              </h3>
              <ul className="space-y-2 text-xs">
                {EDUCATION_MILESTONES.map((ed) => (
                  <li key={ed.id} className="flex flex-col sm:flex-row sm:justify-between gap-1">
                    <span>
                      <strong className="text-white">{ed.institution}</strong> — {ed.qualification}
                    </span>
                    <span className="font-mono tabular-nums text-[#A5A5A5]">{ed.duration}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-end pt-2">
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#71c1ad] bg-[#71c1ad]/15 text-[11px] font-medium uppercase tracking-[0.22em] text-[#71c1ad] hover:bg-[#71c1ad] hover:text-black transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>
        </ModalShell>
      )}

      {activeModal?.kind === 'contact' && (
        <ModalShell
          title="Connect & Hire Jonathan"
          subtitle="Direct Inquiry"
          onClose={onClose}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="border border-white/15 bg-black/50 p-4 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#707070]">Email</p>
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="text-xs text-white hover:text-[#71c1ad] truncate block mt-0.5"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </div>
              <button
                type="button"
                onClick={() => handleCopy('email', SITE_CONFIG.contact.email)}
                aria-label="Copy email address"
                className="p-2 text-[#A5A5A5] hover:text-[#71c1ad] cursor-pointer"
              >
                {copiedField === 'email' ? (
                  <Check className="w-3.5 h-3.5 text-[#71c1ad]" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            <div className="border border-white/15 bg-black/50 p-4 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#707070]">Phone</p>
                <a
                  href={`tel:${SITE_CONFIG.contact.phoneHref}`}
                  className="text-xs text-white hover:text-[#71c1ad] tabular-nums block mt-0.5"
                >
                  {SITE_CONFIG.contact.phoneDisplay}
                </a>
              </div>
              <button
                type="button"
                onClick={() => handleCopy('phone', SITE_CONFIG.contact.phoneDisplay)}
                aria-label="Copy phone number"
                className="p-2 text-[#A5A5A5] hover:text-[#71c1ad] cursor-pointer"
              >
                {copiedField === 'phone' ? (
                  <Check className="w-3.5 h-3.5 text-[#71c1ad]" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#A5A5A5]">
            <MapPin className="w-3.5 h-3.5 text-[#71c1ad] shrink-0" />
            <span>
              {SITE_CONFIG.location.street}, {SITE_CONFIG.location.cityFull} {SITE_CONFIG.location.postalCode}
            </span>
          </div>

          <form onSubmit={handleContactSubmit} className="space-y-4 pt-2 border-t border-white/10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-[10px] uppercase tracking-[0.2em] text-[#A5A5A5] mb-1.5">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Alex Rivera"
                  className="w-full bg-black border border-white/20 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#71c1ad]"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-[10px] uppercase tracking-[0.2em] text-[#A5A5A5] mb-1.5">
                  Your Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className="w-full bg-black border border-white/20 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#71c1ad]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-[10px] uppercase tracking-[0.2em] text-[#A5A5A5] mb-1.5">
                SEO / Organic Growth Scope
              </label>
              <textarea
                id="contact-message"
                rows={3}
                value={contactMsg}
                onChange={(e) => setContactMsg(e.target.value)}
                placeholder="Share details on your website, target regions, or SEO objectives..."
                className="w-full bg-black border border-white/20 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#71c1ad]"
              />
            </div>

            {contactNotice && (
              <p className="text-xs text-[#71c1ad]" role="status">
                {contactNotice}
              </p>
            )}

            <div className="flex items-center justify-end gap-3">
              <a
                href={`tel:${SITE_CONFIG.contact.phoneHref}`}
                className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 text-[11px] uppercase tracking-[0.2em] text-[#A5A5A5] hover:text-white"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call</span>
              </a>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-[#71c1ad] bg-[#71c1ad]/10 text-[11px] font-medium uppercase tracking-[0.22em] text-[#71c1ad] hover:bg-[#71c1ad] hover:text-black transition-all cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Compose Email</span>
              </button>
            </div>
          </form>
        </ModalShell>
      )}

      {activeModal?.kind === 'article' && (
        <ModalShell
          title={activeModal.article.title}
          subtitle={`${activeModal.article.category} · ${activeModal.article.readTime}`}
          onClose={onClose}
        >
          <div className="w-full aspect-[16/9] overflow-hidden border border-white/15">
            <img
              src={activeModal.article.imageSrc}
              alt={activeModal.article.imageAlt}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="space-y-3 leading-relaxed text-[#D4D4D4]">
            {activeModal.article.previewParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-[#707070] font-mono">
              Target URL: {activeModal.article.url}
            </span>
            {!activeModal.article.isPlaceholderUrl && (
              <a
                href={activeModal.article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#71c1ad] hover:underline uppercase tracking-[0.18em] text-[11px]"
              >
                <span>Open Full Article</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </ModalShell>
      )}

      {activeModal?.kind === 'privacy' && (
        <ModalShell
          title="Privacy Policy"
          subtitle={SITE_CONFIG.brand}
          onClose={onClose}
        >
          <p className="text-xs leading-relaxed text-[#A5A5A5]">
            This portfolio website for {SITE_CONFIG.name} ({SITE_CONFIG.brand}) respects visitor privacy.
            Email addresses entered in the newsletter field are not transmitted to third parties unless you
            connect an authorized email marketing provider in the site configuration.
          </p>
          <p className="text-xs leading-relaxed text-[#A5A5A5]">
            Direct contact links (<span className="text-white">{SITE_CONFIG.contact.email}</span> and{' '}
            <span className="text-white">{SITE_CONFIG.contact.phoneDisplay}</span>) open your own device&apos;s
            mail or phone client. For privacy questions, please reach out directly via email.
          </p>
        </ModalShell>
      )}
    </AnimatePresence>
  );
}

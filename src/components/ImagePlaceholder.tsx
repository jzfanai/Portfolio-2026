import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface ImagePlaceholderProps {
  src?: string | null;
  alt: string;
  aspectRatio?: string;
  className?: string;
  imgClassName?: string;
  objectPosition?: string;
  loading?: 'eager' | 'lazy';
  placeholderLabel?: string;
  width?: number;
  height?: number;
}

/**
 * Reusable Dimension-Preserving Image & Placeholder Component
 * Maintains exact aspect ratio and framing; gracefully falls back if an asset is missing or replaced later.
 */
export function ImagePlaceholder({
  src,
  alt,
  aspectRatio,
  className = '',
  imgClassName = 'object-cover',
  objectPosition = 'center center',
  loading = 'lazy',
  placeholderLabel,
  width,
  height,
}: ImagePlaceholderProps) {
  const [hasError, setHasError] = useState(false);

  const showFallback = !src || hasError;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {showFallback ? (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#080A0A] border border-white/15 text-center p-4">
          <ImageIcon className="w-6 h-6 text-[#64D8C5]/70 mb-2" strokeWidth={1.5} />
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#A5A5A5]">
            {placeholderLabel || alt}
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className={`w-full h-full ${imgClassName}`}
          style={{ objectPosition }}
        />
      )}
    </div>
  );
}

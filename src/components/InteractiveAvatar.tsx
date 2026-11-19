import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { ASSETS } from '../config/assets';
import { prefersReducedMotion } from '../animations/motionConfig';

interface PixelCell {
  bx: number;
  by: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  lum: number;
  angle: number;
  sizeJitter: number;
}

function sampleGradientColor(nx: number, ny: number, lum: number): [number, number, number] {
  // Editorial gradient: #71c1ad (teal-mint) -> #38bdf8 (cyan-sky) -> #e879f9 (orchid-magenta) -> #fbbf24 (warm amber)
  const t = Math.min(1, Math.max(0, nx * 0.65 + ny * 0.35));
  let r = 113;
  let g = 193;
  let b = 173;

  if (t < 0.45) {
    const k = t / 0.45;
    r = Math.round(113 + (56 - 113) * k);
    g = Math.round(193 + (189 - 193) * k);
    b = Math.round(173 + (248 - 173) * k);
  } else if (t < 0.8) {
    const k = (t - 0.45) / 0.35;
    r = Math.round(56 + (217 - 56) * k);
    g = Math.round(189 + (119 - 189) * k);
    b = Math.round(248 + (246 - 248) * k);
  } else {
    const k = (t - 0.8) / 0.2;
    r = Math.round(217 + (245 - 217) * k);
    g = Math.round(119 + (178 - 119) * k);
    b = Math.round(246 + (95 - 246) * k);
  }

  // Modulate brightness by portrait luminance so facial structure & glasses stay crisp
  const brightness = 0.32 + lum * 0.95;
  return [
    Math.min(255, Math.round(r * brightness)),
    Math.min(255, Math.round(g * brightness)),
    Math.min(255, Math.round(b * brightness)),
  ];
}

export function InteractiveAvatar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cellsRef = useRef<PixelCell[]>([]);
  const dimsRef = useRef({ w: 270, h: 324, cellSize: 7 });
  const pointerRef = useRef({ x: -999, y: -999, active: false });
  const rafRef = useRef<number | null>(null);
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Sample portrait pixels once into an interactive grid
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = ASSETS.images.avatar.src;

    img.onload = () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;

      const w = container.clientWidth || 270;
      const h = Math.round((w * ASSETS.images.avatar.height) / ASSETS.images.avatar.width);
      const cellSize = 7;

      dimsRef.current = { w, h, cellSize };
      canvas.width = w;
      canvas.height = h;

      const offscreen = document.createElement('canvas');
      offscreen.width = w;
      offscreen.height = h;
      const octx = offscreen.getContext('2d', { willReadFrequently: true });
      if (!octx) return;

      // Match object-contain object-bottom framing
      const scale = Math.min(w / img.width, h / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = (w - dw) / 2;
      const dy = h - dh;
      octx.drawImage(img, dx, dy, dw, dh);

      const imageData = octx.getImageData(0, 0, w, h).data;
      const sampled: PixelCell[] = [];

      for (let y = 0; y < h; y += cellSize) {
        for (let x = 0; x < w; x += cellSize) {
          const sx = Math.min(w - 1, x + Math.floor(cellSize / 2));
          const sy = Math.min(h - 1, y + Math.floor(cellSize / 2));
          const idx = (sy * w + sx) * 4;
          const a = imageData[idx + 3];
          if (a < 40) continue;

          const r = imageData[idx];
          const g = imageData[idx + 1];
          const b = imageData[idx + 2];
          const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

          sampled.push({
            bx: x,
            by: y,
            x,
            y,
            vx: 0,
            vy: 0,
            lum,
            angle: ((x * 13 + y * 29) % 360) * (Math.PI / 180),
            sizeJitter: 0.78 + (((x * 7 + y * 11) % 10) / 22),
          });
        }
      }

      cellsRef.current = sampled;
    };
  }, []);

  const startLoop = () => {
    if (rafRef.current !== null) return;
    const reduced = prefersReducedMotion();

    const tick = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        rafRef.current = null;
        return;
      }
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        rafRef.current = null;
        return;
      }

      const { w, h, cellSize } = dimsRef.current;
      const { x: px, y: py, active } = pointerRef.current;
      const radius = 84;

      ctx.clearRect(0, 0, w, h);

      let anyMoving = false;
      const cells = cellsRef.current;

      for (let i = 0; i < cells.length; i++) {
        const c = cells[i];
        const dx = c.bx - px;
        const dy = c.by - py;
        const dist = Math.hypot(dx, dy);

        let proximity = 0;
        if (active && dist < radius) {
          proximity = 1 - dist / radius;
          if (!reduced) {
            const push = proximity * 18;
            const dirX = dist > 0.5 ? dx / dist : Math.cos(c.angle);
            const dirY = dist > 0.5 ? dy / dist : Math.sin(c.angle);
            const targetX = c.bx + dirX * push + Math.cos(c.angle) * proximity * 6;
            const targetY = c.by + dirY * push + Math.sin(c.angle) * proximity * 6;
            c.vx += (targetX - c.x) * 0.24;
            c.vy += (targetY - c.y) * 0.24;
          }
        } else if (!reduced) {
          c.vx += (c.bx - c.x) * 0.16;
          c.vy += (c.by - c.y) * 0.16;
        }

        if (!reduced) {
          c.vx *= 0.76;
          c.vy *= 0.76;
          c.x += c.vx;
          c.y += c.vy;
        }

        const displacement = Math.hypot(c.x - c.bx, c.y - c.by);
        if (displacement > 0.25 || Math.abs(c.vx) > 0.1 || Math.abs(c.vy) > 0.1) {
          anyMoving = true;
        }

        const intensity = Math.max(proximity, Math.min(1, displacement / 14));
        if (intensity > 0.04) {
          const [r, g, b] = sampleGradientColor(c.x / w, c.y / h, c.lum);
          const blockSize = cellSize * (0.9 + intensity * 0.35) * c.sizeJitter;
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${Math.min(0.95, intensity * 1.1)})`;
          ctx.fillRect(c.x, c.y, blockSize, blockSize);
        }
      }

      if (active || anyMoving) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, w, h);
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const scaleX = dimsRef.current.w / rect.width;
    const scaleY = dimsRef.current.h / rect.height;
    pointerRef.current = {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
      active: true,
    };
    if (!isHovered) setIsHovered(true);
    startLoop();
  };

  const handleMouseLeave = () => {
    pointerRef.current.active = false;
    setIsHovered(false);
    startLoop();
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-[220px] sm:w-[250px] lg:w-[270px] cursor-crosshair portrait-bottom-fade"
      style={{ aspectRatio: ASSETS.images.avatar.aspectRatio }}
    >
      {imgError ? (
        <div className="w-full h-full flex items-center justify-center bg-[#080A0A] border border-white/15 text-xs uppercase tracking-[0.2em] text-[#A5A5A5]">
          {ASSETS.images.avatar.alt}
        </div>
      ) : (
        <img
          src={ASSETS.images.avatar.src}
          alt={ASSETS.images.avatar.alt}
          width={ASSETS.images.avatar.width}
          height={ASSETS.images.avatar.height}
          loading="eager"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="w-full h-full object-contain object-bottom grayscale contrast-110 transition-all duration-300"
        />
      )}

      {/* Pixelated Gradient Scatter Canvas Overlay */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full"
      />
    </div>
  );
}

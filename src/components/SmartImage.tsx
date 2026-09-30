import React, { useState, useRef, useEffect } from 'react';

export interface SmartImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  category?: 'doctor' | 'clinic' | 'studio' | 'general';
  caption?: string;
  interactive?: boolean;
  enableSpotlight?: boolean;
  badge?: string;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  fallbackSrc,
  alt,
  className = '',
  category = 'general',
  caption,
  interactive = true,
  enableSpotlight = true,
  badge,
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<1 | 1.5>(1);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync if src changes
  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  // Keyboard escape for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
        setZoomLevel(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setHasError(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableSpotlight || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePos(null);
  };

  if (hasError) {
    return (
      <div className={`flex flex-col items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-950 text-white p-6 relative overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-[2px]" />
        <div className="relative z-10 flex flex-col items-center text-center max-w-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            {category === 'doctor' && (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            )}
            {category === 'clinic' && (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            )}
            {category === 'studio' && (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            )}
            {category === 'general' && (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            )}
          </div>
          <div>
            <div className="font-semibold text-sm text-neutral-100">{alt}</div>
            <div className="text-xs text-neutral-400 mt-1 font-mono">Shanti Digital Agency · Healthcare Growth</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative group/smart overflow-hidden w-full h-full select-none"
      >
        {/* Progressive Blur Placeholder Shimmer */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-neutral-200 animate-pulse flex items-center justify-center">
            <span className="text-xs font-mono text-neutral-400 tracking-wider">LOADING ASSET · SDA</span>
          </div>
        )}

        {/* Primary Image with progressive sharpen & elegant zoom transition */}
        <img
          src={currentSrc}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
          className={`${className} transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isLoaded ? 'opacity-100 blur-0 scale-100' : 'opacity-40 blur-md scale-[1.02]'
          } group-hover/smart:scale-[1.025]`}
          loading="lazy"
        />

        {/* Interactive Subtle Cursor Spotlight Effect */}
        {enableSpotlight && mousePos && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 240px at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.13), transparent 70%)`,
            }}
          />
        )}

        {/* Diagonal Specular Reflection Sweep */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover/smart:opacity-100 transition-opacity duration-500"
          style={{
            background:
              'linear-gradient(115deg, transparent 20%, rgba(255, 255, 255, 0.08) 45%, rgba(255, 255, 255, 0.18) 50%, rgba(255, 255, 255, 0.08) 55%, transparent 80%)',
            backgroundSize: '200% 200%',
          }}
        />

        {/* Subtle Vignette & Frame Edge Lighting */}
        <div className="absolute inset-0 pointer-events-none border border-neutral-900/5 rounded-[inherit] transition-colors duration-500 group-hover/smart:border-emerald-500/25" />

        {/* Optional Clean Metadata Badge */}
        {badge && (
          <div className="absolute top-3 left-3 pointer-events-none z-10">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium tracking-tight bg-neutral-950/70 text-white backdrop-blur-md border border-white/10 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {badge}
            </span>
          </div>
        )}

        {/* Interactive Fullscreen Lightbox Trigger Button */}
        {interactive && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsLightboxOpen(true);
            }}
            title="Inspect photograph in high-resolution"
            className="absolute top-3 right-3 z-10 opacity-0 group-hover/smart:opacity-100 focus:opacity-100 transition-all duration-300 transform translate-y-1 group-hover/smart:translate-y-0 px-2.5 py-1.5 rounded-lg bg-neutral-950/75 hover:bg-neutral-950 text-white/90 hover:text-white backdrop-blur-md border border-white/15 text-xs font-mono flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
            </svg>
            <span className="text-[11px] tracking-wide">Inspect</span>
          </button>
        )}

        {/* Optional Caption Strip */}
        {caption && (
          <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-neutral-950/80 via-neutral-950/40 to-transparent text-white text-xs opacity-0 group-hover/smart:opacity-100 transition-opacity duration-300 pointer-events-none">
            <p className="line-clamp-2 text-neutral-200 font-medium text-[11px] leading-tight">{caption}</p>
          </div>
        )}
      </div>

      {/* Minimal & Elegant High-Fidelity Lightbox Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-neutral-950/85 backdrop-blur-xl animate-fade-in-up"
          onClick={() => {
            setIsLightboxOpen(false);
            setZoomLevel(1);
          }}
        >
          {/* Top Bar with Clean Metadata & Controls */}
          <div
            className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between z-20 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase">
                SDA Healthcare Asset Inspection
              </span>
              <span className="text-neutral-500 hidden sm:inline">·</span>
              <span className="text-xs text-neutral-300 truncate max-w-sm hidden sm:inline">
                {alt}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setZoomLevel((prev) => (prev === 1 ? 1.5 : 1))}
                className="px-3 py-1.5 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 text-xs font-mono text-neutral-200 border border-neutral-700/60 transition-colors flex items-center gap-1 cursor-pointer"
                title="Toggle Zoom"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>{zoomLevel === 1 ? '1.5× Zoom' : 'Reset Fit'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsLightboxOpen(false);
                  setZoomLevel(1);
                }}
                className="p-1.5 rounded-lg bg-neutral-800/80 hover:bg-rose-950/80 hover:text-rose-200 text-neutral-300 border border-neutral-700/60 transition-colors cursor-pointer"
                title="Close (Esc)"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Centered High-Fidelity Image Container */}
          <div
            className="relative max-w-5xl max-h-[82vh] overflow-auto rounded-2xl border border-white/10 shadow-2xl bg-neutral-900 flex items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentSrc}
              alt={alt}
              className={`max-h-[76vh] w-auto object-contain rounded-xl transition-transform duration-500 ease-out ${
                zoomLevel === 1.5 ? 'scale-150 cursor-grab' : 'scale-100 cursor-zoom-in'
              }`}
              onClick={() => setZoomLevel((prev) => (prev === 1 ? 1.5 : 1))}
            />
          </div>

          {/* Bottom Caption Information */}
          <div
            className="absolute bottom-4 inset-x-4 sm:inset-x-8 flex items-center justify-between z-20 text-neutral-400 text-xs font-mono"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              Click image to toggle zoom · Press <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-200 border border-neutral-700 text-[10px]">Esc</kbd> to exit
            </div>
            <div className="text-right text-[11px] text-emerald-400">
              Shanti Digital Agency · Siliguri Studio
            </div>
          </div>
        </div>
      )}
    </>
  );
};

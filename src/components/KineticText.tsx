import React, { useState, useEffect } from 'react';

interface KineticTextProps {
  phrases: string[];
  intervalMs?: number;
  className?: string;
}

export const KineticText: React.FC<KineticTextProps> = ({
  phrases,
  intervalMs = 3600,
  className = '',
}) => {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (phrases.length <= 1) return;

    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % phrases.length);
        setIsAnimating(false);
      }, 350); // half transition duration
    }, intervalMs);

    return () => clearInterval(timer);
  }, [phrases, intervalMs]);

  return (
    <span className={`inline-block overflow-hidden align-baseline ${className}`}>
      <span
        className={`inline-block transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isAnimating
            ? 'opacity-0 -translate-y-2 blur-[1px]'
            : 'opacity-100 translate-y-0 blur-0'
        }`}
      >
        {phrases[index]}
      </span>
    </span>
  );
};

interface TextShimmerProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'subtle' | 'emerald';
}

export const TextShimmer: React.FC<TextShimmerProps> = ({
  children,
  className = '',
  variant = 'emerald',
}) => {
  const variantClass = variant === 'emerald' ? 'text-shimmer-emerald' : 'text-shimmer-subtle';
  return (
    <span className={`${variantClass} font-semibold transition-all duration-300 ${className}`}>
      {children}
    </span>
  );
};

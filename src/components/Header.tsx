import React, { useState } from 'react';
import { useCms } from '../cms/cmsStore';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const { content } = useCms();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Growth System', path: '/patient-growth-system' },
    { label: 'Healthcare & Fertility', path: '/healthcare' },
    { label: 'Solutions', path: '/solutions' },
    { label: 'Case Studies', path: '/case-studies' },
    { label: 'About', path: '/about' },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-neutral-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('/')}
          className="text-left font-semibold text-lg sm:text-xl tracking-tight text-neutral-900 hover:text-neutral-700 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2"
        >
          <span className="font-extrabold tracking-tighter text-emerald-800">SDA</span>
          <span className="text-neutral-300 font-light" aria-hidden="true">|</span>
          <span className="font-medium text-neutral-800 tracking-tight text-sm sm:text-base">Shanti Digital Agency</span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-600">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`transition-colors whitespace-nowrap py-1 relative cursor-pointer ${
                  isActive
                    ? 'text-neutral-950 font-semibold'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('/contact')}
            className="px-4 py-2 text-xs sm:text-sm font-medium text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 active:scale-[0.99] transition-all whitespace-nowrap cursor-pointer shadow-sm"
          >
            Request Consultation
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-700 hover:text-neutral-950 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-neutral-200 bg-[#FAF9F5] px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => handleNavClick(link.path)}
              className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                currentPath === link.path ? 'bg-neutral-100 text-neutral-900 font-semibold' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-400">
            <span>Healthcare &amp; Fertility Growth</span>
            <span>Siliguri, WB</span>
          </div>
        </div>
      )}
    </header>
  );
};

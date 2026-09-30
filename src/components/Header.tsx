import React, { useState } from 'react';
import { useCms } from '../cms/cmsStore';
import { SdaLogo } from './SdaLogo';

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Official Brand Logo with Network Nodes & Beacon */}
        <button
          onClick={() => handleNavClick('/')}
          className="text-left cursor-pointer flex items-center gap-3 py-1 group hover:opacity-95 transition-opacity"
          aria-label="Shanti Digital Agency Home"
        >
          <SdaLogo height={42} variant="full" />
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
                    : 'text-neutral-600 hover:text-neutral-900 link-editorial'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6A00] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions + Direct WhatsApp */}
        <div className="flex items-center gap-2.5">
          <a
            href="https://wa.me/918944083896?text=Hello%20Shanti%20Digital%20Agency%2C%20I%20would%20like%20to%20inquire%20about%20the%20Patient%20Growth%20System."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-all"
            title="Chat on WhatsApp: +91 89440 83896"
          >
            <svg className="w-3.5 h-3.5 fill-current text-[#25D366]" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z" />
            </svg>
            <span>WhatsApp</span>
          </a>

          <button
            onClick={() => handleNavClick('/contact')}
            className="px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 active:scale-[0.99] transition-all whitespace-nowrap cursor-pointer shadow-sm"
          >
            Consultation
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

          <div className="pt-3 border-t border-neutral-200 space-y-2">
            <a
              href="https://wa.me/918944083896?text=Hello%20Shanti%20Digital%20Agency%2C%20I%20would%20like%20to%20inquire%20about%20the%20Patient%20Growth%20System."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#25D366] text-white rounded-lg font-semibold text-xs shadow-sm"
            >
              <span>Chat on WhatsApp (+91 89440 83896)</span>
            </a>
            <a
              href="tel:8944083896"
              className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-white border border-neutral-200 text-neutral-800 rounded-lg font-medium text-xs"
            >
              <span>Call: +91 89440 83896</span>
            </a>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-neutral-400">
            <span>Healthcare &amp; Fertility Growth</span>
            <span>Siliguri, WB</span>
          </div>
        </div>
      )}
    </header>
  );
};

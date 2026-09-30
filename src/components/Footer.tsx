import React from 'react';
import { useCms } from '../cms/cmsStore';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { content } = useCms();

  const handleNav = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-900 text-neutral-300 border-t border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-neutral-800">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-xl tracking-tight">SDA</span>
              <span className="text-neutral-600">|</span>
              <span className="font-medium text-neutral-200 text-base">{content.company.name}</span>
            </div>
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              {content.company.tagline}. We connect marketing, content, advertising, CRM, and appointment conversion into one unified patient acquisition system.
            </p>
            <div className="pt-2 text-xs text-neutral-400 space-y-1">
              <p className="font-medium text-neutral-300">Regional Operations &amp; Strategy Hub:</p>
              <p>{content.company.address}</p>
              <p>Serving healthcare &amp; fertility clinics across India</p>
            </div>
          </div>

          {/* Column 1: System */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">The System</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleNav('/patient-growth-system')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Patient Growth System™
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/performance-marketing')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Performance Marketing
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/content')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Healthcare Content
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/crm-automation')} className="hover:text-white transition-colors text-left cursor-pointer">
                  CRM &amp; WhatsApp Flow
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Specializations */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Specializations</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleNav('/healthcare')} className="hover:text-white transition-colors text-left cursor-pointer">
                  IVF &amp; Fertility Clinics
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/healthcare')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Specialized Doctors
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/healthcare')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Hospitals &amp; Daycare
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/case-studies')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Proof &amp; Case Studies
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Company & Direct */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Inquiries</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleNav('/about')} className="hover:text-white transition-colors text-left cursor-pointer">
                  About SDA Philosophy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/contact')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Request Consultation
                </button>
              </li>
              <li className="pt-2 text-xs text-neutral-400">
                <a href={`mailto:${content.company.email}`} className="text-emerald-400 hover:underline">
                  {content.company.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} {content.company.name}. All rights reserved.</span>
            <span>·</span>
            <span>Siliguri, West Bengal</span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => handleNav('/privacy')} className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <button onClick={() => handleNav('/terms')} className="hover:text-white transition-colors cursor-pointer">
              Terms of Engagement
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

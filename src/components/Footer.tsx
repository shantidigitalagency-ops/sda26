import React from 'react';
import { useCms } from '../cms/cmsStore';
import { SdaLogo } from './SdaLogo';

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
          {/* Brand Column with Official SdaLogo */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => handleNav('/')}
              className="text-left cursor-pointer block hover:opacity-95 transition-opacity"
              aria-label="Shanti Digital Agency"
            >
              <SdaLogo height={44} variant="full" theme="dark" />
            </button>
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
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Direct Inquiries</h4>
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
              <li className="pt-2 text-xs text-neutral-300">
                <a href="tel:8944083896" className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <span className="text-neutral-400">Phone:</span>
                  <strong className="text-emerald-400">+91 89440 83896</strong>
                </a>
              </li>
              <li className="text-xs">
                <a
                  href="https://wa.me/918944083896?text=Hello%20Shanti%20Digital%20Agency%2C%20I%20would%20like%20to%20inquire%20about%20the%20Patient%20Growth%20System."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 mt-1 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold rounded-lg transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z" />
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>
              </li>
              <li className="pt-1 text-xs text-neutral-400">
                <a href={`mailto:${content.company.email}`} className="text-neutral-300 hover:text-white transition-colors">
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

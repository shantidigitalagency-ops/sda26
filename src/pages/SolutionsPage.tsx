import React from 'react';
import { useCms } from '../cms/cmsStore';

interface SolutionsPageProps {
  onNavigate: (path: string) => void;
}

export const SolutionsPage: React.FC<SolutionsPageProps> = ({ onNavigate }) => {
  const { content } = useCms();
  const { items } = content.home.capabilities;

  return (
    <div className="w-full">
      <section className="pt-16 pb-20 border-b border-neutral-200/80 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              System Components
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 mt-2 text-balance">
              Everything the System Needs
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 mt-4 leading-relaxed">
              We do not sell disconnected marketing services or vanity deliverables. Every capability exists exclusively to turn digital attention into qualified clinic appointments.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((sol) => (
              <div
                key={sol.id}
                className="p-8 rounded-2xl bg-[#FAF9F5] border border-neutral-200 hover:border-neutral-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-sm font-mono font-bold text-emerald-800 mb-2">
                    {sol.number}
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 tracking-tight">
                    {sol.title}
                  </h3>
                  <div className="text-xs text-neutral-500 font-medium mt-1 mb-4">
                    {sol.subtitle}
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                    {sol.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-200/60">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                    System Deliverables
                  </div>
                  <ul className="space-y-1.5 text-xs text-neutral-700">
                    {sol.items.map((it, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-emerald-700">✓</span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-6">
                    {sol.id === 'performance' && (
                      <button
                        onClick={() => onNavigate('/performance-marketing')}
                        className="text-xs font-bold text-neutral-900 hover:text-emerald-800 underline underline-offset-4 cursor-pointer"
                      >
                        Deep dive on Performance Marketing →
                      </button>
                    )}
                    {sol.id === 'content' && (
                      <button
                        onClick={() => onNavigate('/content')}
                        className="text-xs font-bold text-neutral-900 hover:text-emerald-800 underline underline-offset-4 cursor-pointer"
                      >
                        Deep dive on Healthcare Content →
                      </button>
                    )}
                    {sol.id === 'crm' && (
                      <button
                        onClick={() => onNavigate('/crm-automation')}
                        className="text-xs font-bold text-neutral-900 hover:text-emerald-800 underline underline-offset-4 cursor-pointer"
                      >
                        Deep dive on CRM &amp; Automation →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross link */}
      <section className="py-20 bg-[#FAF9F5] text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-neutral-900">
            Need a tailored diagnosis for your clinic?
          </h3>
          <p className="text-neutral-600 text-sm mt-2">
            Schedule an initial consultation. We assess your specialty, catchment, and current front-desk responsiveness.
          </p>
          <button
            onClick={() => onNavigate('/contact')}
            className="mt-6 px-6 py-3 bg-neutral-900 text-white font-semibold text-sm rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Request a Growth Consultation
          </button>
        </div>
      </section>
    </div>
  );
};

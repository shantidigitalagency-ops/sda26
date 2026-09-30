import React from 'react';
import { useCms } from '../cms/cmsStore';
import { InteractiveSystemFlow } from '../components/InteractiveSystemFlow';
import { FunnelCalculator } from '../components/FunnelCalculator';

interface PatientGrowthSystemPageProps {
  onNavigate: (path: string) => void;
}

export const PatientGrowthSystemPage: React.FC<PatientGrowthSystemPageProps> = ({ onNavigate }) => {
  const { content } = useCms();
  const { steps } = content.home.system;

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="pt-16 pb-20 border-b border-neutral-200/80 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 animate-fade-in-up">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-soft-pulse" />
              <span>The Flagship Architecture</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 mt-2 text-balance text-gradient-headline animate-fade-in-up-delay-1">
              SDA Patient Growth System™
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 mt-4 leading-relaxed animate-fade-in-up-delay-2">
              A closed-loop operating system connecting high-intent search, medical credibility, landing pages, counselor triage, and OPD conversion.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive System Flow Engine */}
      <section className="py-16 sm:py-20 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InteractiveSystemFlow />
        </div>
      </section>

      {/* Detailed 6 Stages Grid */}
      <section className="py-20 bg-[#FAF9F5] border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Stage Specifications
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 mt-2">
              Inside Each Stage of the System
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 mt-2">
              Why each component is non-negotiable for clinic appointment growth.
            </p>
          </div>

          <div className="space-y-12">
            {steps.map((st) => (
              <div
                key={st.id}
                className="p-8 sm:p-10 rounded-2xl bg-white border border-neutral-200/90 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                <div className="lg:col-span-4">
                  <div className="text-3xl font-black font-mono text-emerald-800 mb-2">
                    {st.stepNumber}
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 tracking-tight">
                    {st.title}
                  </h3>
                  <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mt-1">
                    {st.subtitle}
                  </div>
                </div>

                <div className="lg:col-span-8 space-y-6">
                  <p className="text-neutral-700 leading-relaxed text-sm sm:text-base">
                    {st.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-100">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-2">
                        Deployed Tooling &amp; Protocols
                      </span>
                      <ul className="space-y-1 text-xs text-neutral-700">
                        {st.tools.map((t, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="text-emerald-700 font-bold">✓</span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-2">
                        Audited Performance Indicators
                      </span>
                      <ul className="space-y-1 text-xs text-emerald-800 font-mono">
                        {st.metrics.map((m, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="text-neutral-400 font-sans">·</span>
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Funnel simulation */}
      <section className="py-20 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FunnelCalculator onConsultationClick={() => onNavigate('/contact')} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#FAF9F5] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
            Ready to integrate the system into your clinic?
          </h2>
          <p className="text-neutral-600 text-sm mt-3 max-w-xl mx-auto">
            Book an introductory growth consultation. We will map out your patient catchment and identify where appointments are currently being lost.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => onNavigate('/contact')}
              className="px-6 py-3 bg-neutral-900 text-white font-semibold rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Request a Growth Consultation
            </button>
            <button
              onClick={() => onNavigate('/solutions')}
              className="px-6 py-3 bg-white text-neutral-800 border border-neutral-300 font-semibold rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              View Capabilities
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

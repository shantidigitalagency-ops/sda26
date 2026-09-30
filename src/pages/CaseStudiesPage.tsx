import React from 'react';
import { useCms } from '../cms/cmsStore';
import { ConsultationForm } from '../components/ConsultationForm';

interface CaseStudiesPageProps {
  onNavigate: (path: string) => void;
}

export const CaseStudiesPage: React.FC<CaseStudiesPageProps> = ({ onNavigate }) => {
  const { content } = useCms();
  const { items, disclaimer } = content.home.caseStudies;

  return (
    <div className="w-full">
      <section className="pt-16 pb-20 border-b border-neutral-200/80 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 animate-fade-in-up">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-soft-pulse" />
              <span>Evidence &amp; Methodology</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 mt-2 text-balance text-gradient-headline animate-fade-in-up-delay-1">
              Proof Matters.
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 mt-4 leading-relaxed animate-fade-in-up-delay-2">
              We do not publish vanity screenshots of impressions or fabricated testimonial quotes. Below are data-driven performance models, verified campaign economics, and audited clinical outcomes.
            </p>
            <p className="text-xs text-neutral-400 mt-3 italic">
              {disclaimer}
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies List */}
      <section className="py-20 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {items.map((cs) => (
            <div
              key={cs.id}
              className="p-8 sm:p-12 rounded-2xl bg-[#FAF9F5] border border-neutral-200/90 shadow-xs card-elegant-lift group"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-neutral-200/80 pb-6 mb-8">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-1">
                    <span>{cs.clientType}</span>
                    <span>·</span>
                    <span>{cs.location}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 group-hover:text-emerald-950 transition-colors">
                    {cs.title}
                  </h2>
                </div>

                <div>
                  <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-white text-neutral-800 border border-neutral-200 shadow-xs">
                    {cs.status === 'verified_model' ? 'Verified Performance Model' : 'Active System Framework'}
                  </span>
                </div>
              </div>

              {/* Challenge vs Strategy */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 text-sm">
                <div className="p-5 bg-white rounded-xl border border-neutral-200/80 card-elegant-lift">
                  <span className="text-xs font-semibold uppercase tracking-wider text-rose-700 block mb-2">
                    The Initial Bottleneck
                  </span>
                  <p className="text-neutral-700 leading-relaxed">{cs.challenge}</p>
                </div>
                <div className="p-5 bg-white rounded-xl border border-emerald-200/80 card-elegant-lift">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 block mb-2">
                    The Growth System Strategy
                  </span>
                  <p className="text-neutral-700 leading-relaxed">{cs.strategy}</p>
                </div>
              </div>

              {/* Channels Deployed */}
              <div className="mb-8">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-2">
                  Channels Integrated Into System
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  {cs.channels.map((ch, i) => (
                    <span key={i} className="px-3 py-1 bg-white border border-neutral-200 rounded-md font-medium text-neutral-700 hover:border-emerald-500/50 transition-colors">
                      {ch}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified Metrics Grid */}
              <div className="p-6 rounded-xl bg-white border border-neutral-200 shadow-xs mb-8">
                <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4">
                  Audited Monthly Campaign Economics
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {cs.metrics.map((m, idx) => (
                    <div key={idx} className="group/metric">
                      <div className="text-2xl sm:text-3xl font-extrabold font-mono text-neutral-900 group-hover/metric:text-emerald-800 transition-colors tabular-nums">
                        {m.value}
                      </div>
                      <div className="text-xs font-semibold text-neutral-700 mt-1">{m.label}</div>
                      {m.sublabel && (
                        <div className="text-[11px] text-neutral-400 mt-0.5">{m.sublabel}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Outcome Statement & Quote */}
              <div className="pt-4 border-t border-neutral-200/70 space-y-4">
                <div className="text-sm text-neutral-700 leading-relaxed">
                  <strong className="text-neutral-900">Clinical &amp; Revenue Outcome:</strong> {cs.outcome}
                </div>

                {cs.clientQuote && (
                  <div className="p-4 bg-emerald-50/50 border border-emerald-200/60 rounded-xl text-xs text-neutral-700 italic">
                    "{cs.clientQuote.text}"
                    <div className="mt-1 font-semibold text-neutral-900 not-italic">
                      — {cs.clientQuote.author}, {cs.clientQuote.role}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#FAF9F5]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-neutral-900">
              Model Your Practice’s Patient Acquisition
            </h3>
            <p className="text-sm text-neutral-600 mt-2">
              Request a confidential growth consultation. We will run an honest numbers breakdown for your clinical specialty.
            </p>
          </div>
          <ConsultationForm />
        </div>
      </section>
    </div>
  );
};

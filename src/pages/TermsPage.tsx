import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="w-full bg-[#FAF9F5] py-16 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-2xl border border-neutral-200 shadow-xs space-y-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
            Terms of Service &amp; Engagement
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mt-1">
            Terms of Engagement
          </h1>
          <p className="text-xs text-neutral-400 mt-2 font-mono">
            Effective Date: January 2026 · Shanti Digital Agency, Siliguri, West Bengal
          </p>
        </div>

        <div className="space-y-6 text-sm text-neutral-700 leading-relaxed border-t border-neutral-100 pt-6">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900">1. Nature of Engagement</h2>
            <p>
              Shanti Digital Agency ("SDA") delivers the proprietary <strong>SDA Patient Growth System™</strong>, connecting performance advertising, doctor authority content, landing architecture, CRM automation, and counselor triage protocols for healthcare practices. SDA does not practice medicine and provides exclusively strategic growth and digital operations infrastructure.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900">2. Medical Regulatory Compliance</h2>
            <p>
              All campaigns engineered by SDA are developed to comply strictly with the National Medical Commission (NMC) regulations, Indian Council of Medical Research (ICMR) standards for reproductive medicine (for IVF partners), and Google/Meta healthcare policies. SDA strictly prohibits the advertisement of unapproved treatments, fabricated success percentages, or misleading claims. The consulting clinician maintains ultimate editorial responsibility for all clinical medical statements.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900">3. Asset Ownership</h2>
            <p>
              Unlike legacy agencies that hold ad accounts hostage, SDA operates with full client transparency: all Google Ads accounts, Meta Business Managers, domain names, CRM instances, and patient databases configured during the engagement remain the sole property of the client clinic or hospital.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900">4. Illustrative Models &amp; Performance Disclaimers</h2>
            <p>
              Any simulations, calculators, or performance models displayed on this website are illustrative benchmarks based on historical healthcare sector averages. Patient acquisition outcomes are inherently subject to local catchment competition, doctor reputation, consultation pricing, and clinic staff follow-up discipline.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900">5. Governing Law &amp; Jurisdiction</h2>
            <p>
              These Terms and any engagement contracts entered into with SDA shall be governed by and construed in accordance with the laws of India. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the competent courts in Siliguri, West Bengal, India.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

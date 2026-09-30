import React from 'react';
import { ConsultationForm } from '../components/ConsultationForm';

interface PerformanceMarketingPageProps {
  onNavigate: (path: string) => void;
}

export const PerformanceMarketingPage: React.FC<PerformanceMarketingPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full">
      <section className="pt-16 pb-20 border-b border-neutral-200/80 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              System Component 01
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 mt-2 text-balance">
              Healthcare Performance Marketing
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 mt-4 leading-relaxed">
              Google Ads and Meta Ads configured strictly for medical intent, regulatory compliance, and cost-per-appointment efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* Search vs Social Matrix */}
      <section className="py-20 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Google Search */}
            <div className="p-8 sm:p-10 rounded-2xl bg-[#FAF9F5] border border-neutral-200 space-y-4">
              <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                HIGH-INTENT CAPTURE
              </span>
              <h3 className="text-2xl font-bold text-neutral-900">
                Google Search Advertising for Clinics
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                When a patient searches for <em>"best IVF doctor near me"</em> or <em>"knee replacement surgeon Siliguri"</em>, they have acute commercial intent. If your practice does not capture that query, a competing clinic does.
              </p>

              <div className="space-y-3 pt-3 border-t border-neutral-200/60 text-xs text-neutral-700">
                <div className="font-semibold text-neutral-900">SDA Performance Protocols:</div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span><strong>Exhaustive Negative Keyword Sculpting:</strong> Eliminating non-paying searches (e.g. "free government hospital", "medical college syllabus").</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span><strong>Catchment Geo-Targeting:</strong> Focusing spend within realistic patient transit radii (e.g. Siliguri, Jalpaiguri, Cooch Behar, Gangtok).</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span><strong>Condition-Specific Extensions:</strong> Displaying clinic OPD timings, doctor qualifications, and direct appointment phone extensions.</span>
                </div>
              </div>
            </div>

            {/* Meta Ads */}
            <div className="p-8 sm:p-10 rounded-2xl bg-[#FAF9F5] border border-neutral-200 space-y-4">
              <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                DEMOGRAPHIC TRUST BUILDING
              </span>
              <h3 className="text-2xl font-bold text-neutral-900">
                Meta (Facebook &amp; Instagram) Health Ads
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Patients do not open Instagram looking for surgery. Meta campaigns are engineered for education, demystifying treatments, introducing senior doctors, and retargeting warm visitors.
              </p>

              <div className="space-y-3 pt-3 border-t border-neutral-200/60 text-xs text-neutral-700">
                <div className="font-semibold text-neutral-900">SDA Performance Protocols:</div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span><strong>Video Explainer Funnels:</strong> Doctor video clips answering common patient anxieties (AMH levels, robotic surgery safety).</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span><strong>Direct WhatsApp Lead Routing:</strong> Allowing interested patients to start a private, secure counseling chat with one tap.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span><strong>Retargeting Sequences:</strong> Educational follow-up ads delivered only to visitors who spent over 45 seconds on your clinic pages.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Compliance & Ethics */}
          <div className="mt-12 p-8 rounded-2xl bg-neutral-900 text-white space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
              Healthcare Ethics &amp; Compliance Standards
            </span>
            <h4 className="text-xl sm:text-2xl font-bold">
              100% Compliant With National Medical Commission &amp; Google Health Policies
            </h4>
            <p className="text-sm text-neutral-300 max-w-3xl leading-relaxed">
              Healthcare advertising requires strict adherence to ethical boundaries. We never publish sensationalist guarantees, fake before-and-after imagery, or misleading success rates. Every campaign is built to protect your medical license and elevate clinical prestige.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900">
              Audit Your Current Ad Performance
            </h2>
            <p className="text-neutral-600 text-sm mt-2">
              Find out how much of your current ad spend is being wasted on junk clicks and unmanaged leads.
            </p>
          </div>
          <ConsultationForm />
        </div>
      </section>
    </div>
  );
};

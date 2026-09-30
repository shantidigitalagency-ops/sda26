import React from 'react';
import { useCms } from '../cms/cmsStore';
import { ConsultationForm } from '../components/ConsultationForm';

const STUDIO_IMAGE = '/src/assets/images/sda_growth_studio_siliguri_1790749575851.jpg';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { content } = useCms();

  return (
    <div className="w-full">
      <section className="pt-16 pb-20 border-b border-neutral-200/80 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              The SDA Philosophy
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 mt-2 text-balance">
              We Believe Marketing Should Work as a System.
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 mt-4 leading-relaxed">
              We did not build another generic digital agency selling random social posts. We built the operating system that turns clinical attention into confirmed patient appointments.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Body */}
      <section className="py-20 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900">
                The Objective Is Not More Activity. The Objective Is Measurable Patient Growth.
              </h2>
              <p className="text-neutral-600 leading-relaxed text-base">
                For years, healthcare marketing in India has been dominated by two ineffective extremes: either expensive, opaque hospital branding billboards, or freelance agencies churning out low-quality social media graphics and festival greetings that generate zero clinical inquiries.
              </p>
              <p className="text-neutral-600 leading-relaxed text-base">
                Shanti Digital Agency (SDA) was founded on the conviction that healthcare practices do not need more noise. They need a connected, accountable operating system:
              </p>

              <div className="p-6 rounded-2xl bg-[#FAF9F5] border border-neutral-200 text-sm space-y-2">
                <div className="font-bold text-neutral-900">What SDA Brings Together Into One Unified System:</div>
                <div className="grid grid-cols-2 gap-2 text-xs text-neutral-700 pt-2 font-medium">
                  <div>• Medical Market Strategy</div>
                  <div>• Doctor Authority Creative</div>
                  <div>• Compliant Performance Ads</div>
                  <div>• High-Speed Conversion UX</div>
                  <div>• Healthcare CRM Architecture</div>
                  <div>• WhatsApp Speed-to-Lead</div>
                  <div>• Closed-Loop Attribution</div>
                  <div>• Chamber Utilization Metrics</div>
                </div>
              </div>

              <div className="pt-2 text-sm text-neutral-700 font-medium">
                Headquartered in <strong>Siliguri, West Bengal</strong>, we serve fertility centres, private doctor chambers, and specialized hospitals across North Bengal, Eastern India, and nationwide.
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-md">
                <img
                  src={STUDIO_IMAGE}
                  alt="SDA Growth Studio workspace in Siliguri"
                  referrerPolicy="no-referrer"
                  className="w-full h-[420px] object-cover"
                />
              </div>
              <div className="text-xs text-neutral-400 mt-2 text-center">
                SDA Operations Hub · Sevoke Road, Siliguri, West Bengal
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operating Tenets */}
      <section className="py-20 bg-[#FAF9F5] border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Guiding Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 mt-2">
              How We Work With Healthcare Partners
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-neutral-200 shadow-xs space-y-3">
              <div className="text-xs font-mono font-bold text-neutral-400">TENET 01</div>
              <h3 className="text-lg font-bold text-neutral-900">Clinical Respect &amp; Ethics</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                We never compromise medical ethics. No sensationalist clickbait, no misleading success percentages, and zero fake reviews. We protect and elevate the doctor's reputation.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-neutral-200 shadow-xs space-y-3">
              <div className="text-xs font-mono font-bold text-neutral-400">TENET 02</div>
              <h3 className="text-lg font-bold text-neutral-900">Radical Focus</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Inspired by Steve Jobs' discipline of saying no to unnecessary things. We eliminate cosmetic agency deliverables and focus 100% of energy on what brings patients through the clinic door.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-neutral-200 shadow-xs space-y-3">
              <div className="text-xs font-mono font-bold text-neutral-400">TENET 03</div>
              <h3 className="text-lg font-bold text-neutral-900">Closed-Loop Accountability</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                We don't hide behind reach, impressions, or page likes. We track leads to counselor calls, confirmed chamber appointments, and procedure show-up rates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Contact */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-neutral-900">
              Ready to Discuss Your Clinic’s Growth?
            </h3>
            <p className="text-sm text-neutral-600 mt-2">
              Speak directly with an SDA healthcare strategist. No high-pressure sales pitch — just an honest operational diagnosis.
            </p>
          </div>
          <ConsultationForm />
        </div>
      </section>
    </div>
  );
};

import React from 'react';
import { useCms } from '../cms/cmsStore';
import { ConsultationForm } from '../components/ConsultationForm';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { content } = useCms();

  return (
    <div className="w-full">
      <section className="pt-16 pb-20 border-b border-neutral-200/80 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Direct Strategic Intake
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 mt-2 text-balance">
              Request a Growth Consultation
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 mt-4 leading-relaxed">
              Let us analyze your clinic's regional patient catchment, identify where prospective appointments are leaking, and demonstrate how the SDA Patient Growth System™ works for your specialty.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Contact Info & Expectations */}
            <div className="lg:col-span-4 space-y-8">
              <div className="p-6 rounded-2xl bg-[#FAF9F5] border border-neutral-200 space-y-4">
                <h3 className="text-lg font-bold text-neutral-900">
                  Direct Clinic Inquiries
                </h3>
                <div className="space-y-3 text-sm text-neutral-600">
                  <div>
                    <span className="text-xs font-semibold text-neutral-400 block uppercase">Office &amp; Strategy Studio</span>
                    <span className="font-medium text-neutral-800">{content.company.address}</span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-neutral-400 block uppercase">Official Email</span>
                    <a href={`mailto:${content.company.email}`} className="text-emerald-700 font-medium hover:underline">
                      {content.company.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-neutral-400 block uppercase">Regional Focus</span>
                    <span className="text-neutral-700">Siliguri, North Bengal, Eastern India &amp; Nationwide Partners</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-neutral-900 text-white space-y-3">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                  Our Consultation Guarantee
                </span>
                <h4 className="text-base font-bold">
                  Clinical Confidentiality
                </h4>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  We respect the sensitive nature of healthcare practice management. All operational information, OPD volumes, and strategic challenges shared with SDA are held in strict confidence.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-neutral-200 space-y-3 text-xs text-neutral-600">
                <span className="font-bold text-neutral-900 text-sm block">What Happens During the Consultation:</span>
                <div>1. <strong>Catchment Search Audit:</strong> We analyze search volume for your medical specialty in your city.</div>
                <div>2. <strong>Competitor Gap Assessment:</strong> Identify where other hospitals or clinics in your region are winning patient attention.</div>
                <div>3. <strong>System Blueprint:</strong> We map out the exact 6-stage architecture required to turn enquiries into appointments.</div>
              </div>
            </div>

            {/* Right: The High-Conversion Form */}
            <div className="lg:col-span-8">
              <ConsultationForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

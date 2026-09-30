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
                <div className="space-y-4 text-sm text-neutral-600">
                  <div>
                    <span className="text-xs font-semibold text-neutral-400 block uppercase">Direct Phone</span>
                    <a href="tel:8944083896" className="font-bold text-neutral-900 hover:text-emerald-700 transition-colors text-base block mt-0.5">
                      +91 89440 83896
                    </a>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-neutral-400 block uppercase">Instant WhatsApp Triage</span>
                    <a
                      href="https://wa.me/918944083896?text=Hello%20Shanti%20Digital%20Agency%2C%20I%20would%20like%20to%20inquire%20about%20the%20Patient%20Growth%20System."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-1 px-4 py-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z" />
                      </svg>
                      <span>Chat on WhatsApp (+91 89440 83896)</span>
                    </a>
                  </div>
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

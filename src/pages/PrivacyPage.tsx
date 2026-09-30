import React from 'react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="w-full bg-[#FAF9F5] py-16 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-2xl border border-neutral-200 shadow-xs space-y-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
            Legal &amp; Clinical Data Standards
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mt-1">
            Privacy Policy
          </h1>
          <p className="text-xs text-neutral-400 mt-2 font-mono">
            Last Updated: January 2026 · Compliant with the Digital Personal Data Protection (DPDP) Act, India
          </p>
        </div>

        <div className="space-y-6 text-sm text-neutral-700 leading-relaxed border-t border-neutral-100 pt-6">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900">1. Commitment to Healthcare Privacy</h2>
            <p>
              Shanti Digital Agency ("SDA", "we", "us", "our"), based in Siliguri, West Bengal, provides patient growth systems, marketing infrastructure, and CRM automation exclusively for doctors, IVF &amp; fertility clinics, hospitals, and specialized healthcare practices. We recognize that patient data and clinical practice operational metrics require the highest standard of security and confidentiality.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900">2. Collection of Information</h2>
            <p>
              When a healthcare provider interacts with our website or submits a growth consultation request, we collect contact credentials, including practitioner name, clinic or hospital name, official phone number, email address, city/region, clinical specialty, and estimated monthly investment. When deploying client CRM systems, all patient inquiry data collected through Google, Meta, or WhatsApp is managed within secured, client-owned data containers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900">3. Use of Information</h2>
            <p>
              We utilize collected practitioner information solely to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-600">
              <li>Conduct clinical market catchment audits and competitor analyses.</li>
              <li>Coordinate growth consultation meetings and review clinical growth blueprints.</li>
              <li>Provide customer support, SLA notifications, and system optimization recommendations.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900">4. Patient Confidentiality &amp; Non-Disclosure</h2>
            <p>
              SDA never sells, rents, or commercializes patient inquiries or practitioner contact lists to third-party pharmaceutical companies, aggregators, or unauthorized third parties. Any patient case studies presented publicly on our website are strictly anonymized, de-identified, and used solely with express partner authorization or as generalized system performance models.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900">5. Contact Information</h2>
            <p>
              For data privacy inquiries or rights requests under the DPDP Act, contact our Privacy Officer at{' '}
              <a href="mailto:shantidigitalagency@gmail.com" className="text-emerald-700 underline">
                shantidigitalagency@gmail.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

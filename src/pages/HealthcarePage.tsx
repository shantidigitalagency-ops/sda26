import React from 'react';
import { useCms } from '../cms/cmsStore';
import { ConsultationForm } from '../components/ConsultationForm';

const FERTILITY_IMAGE = '/src/assets/images/sda_fertility_clinic_lab_1790749566046.jpg';

interface HealthcarePageProps {
  onNavigate: (path: string) => void;
}

export const HealthcarePage: React.FC<HealthcarePageProps> = ({ onNavigate }) => {
  const { content } = useCms();

  return (
    <div className="w-full">
      {/* Header */}
      <section className="pt-16 pb-20 border-b border-neutral-200/80 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Primary Practice Specialization
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 mt-2 text-balance">
              Healthcare &amp; Fertility Patient Growth
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 mt-4 leading-relaxed">
              Medical decisions are founded on deep emotional trust, procedural transparency, and counselor responsiveness. We do not apply generic consumer agency playbooks to healthcare.
            </p>
          </div>
        </div>
      </section>

      {/* IVF & Fertility Deep Dive */}
      <section className="py-20 border-b border-neutral-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded">
                FLAGSHIP SPECIALTY
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
                IVF &amp; Reproductive Fertility Clinics
              </h2>
              <p className="text-base text-neutral-600 leading-relaxed">
                Infertility treatment is emotionally sensitive, complex, and high-ticket. Couples research in secret for months before picking up the phone. If your digital touchpoints present stock images and aggressive sales claims, you lose their trust before they ever consult.
              </p>

              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-sm">
                  <h4 className="font-bold text-neutral-900 mb-1">Doctor Authority Video Education</h4>
                  <p className="text-neutral-600 text-xs leading-relaxed">
                    We script and guide clinical video explainers on AMH levels, IVF vs IUI, and embryo quality that demystify treatment and establish your medical team as trusted guides.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-sm">
                  <h4 className="font-bold text-neutral-900 mb-1">Discreet WhatsApp Counselor Triage</h4>
                  <p className="text-neutral-600 text-xs leading-relaxed">
                    Patients prefer text messaging over phone calls during early inquiry phases. Our WhatsApp automations provide compassionate, non-intrusive responses with clinic timings.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-sm">
                  <h4 className="font-bold text-neutral-900 mb-1">High Show-Up Consultation Protocols</h4>
                  <p className="text-neutral-600 text-xs leading-relaxed">
                    We implement pre-consultation educational prep and 2-step confirmations that decrease fertility OPD no-shows by up to 40%.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-md">
                <img
                  src={FERTILITY_IMAGE}
                  alt="Modern clean reproductive clinic and embryo lab"
                  referrerPolicy="no-referrer"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors, Surgeons & Hospitals */}
      <section className="py-20 border-b border-neutral-200/80 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Other Healthcare Verticals
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 mt-2">
              Systems Designed for Clinical Workflows
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-neutral-200 shadow-xs space-y-4">
              <div className="text-xs font-mono font-bold text-emerald-800">VERTICAL 01</div>
              <h3 className="text-xl font-bold text-neutral-900">Specialized Doctors &amp; Surgeons</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Orthopedics, Gynecology, Laparoscopy, Cardiology, and Pediatrics. We build personal chamber booking pipelines that make clinicians independent of third-party platforms.
              </p>
              <div className="pt-2 text-xs text-neutral-500 font-medium">
                Deliverables: Chamber landing system, procedure video series, Google Business profile dominance.
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-neutral-200 shadow-xs space-y-4">
              <div className="text-xs font-mono font-bold text-emerald-800">VERTICAL 02</div>
              <h3 className="text-xl font-bold text-neutral-900">Multi-Specialty &amp; Daycare Facilities</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Centralized lead routing across departments. Inquiries from Google and Meta are triaged instantly to the exact department counselor with zero lead leakage.
              </p>
              <div className="pt-2 text-xs text-neutral-500 font-medium">
                Deliverables: Hospital-wide CRM, department attribution, speed-to-lead monitoring dashboards.
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-neutral-200 shadow-xs space-y-4">
              <div className="text-xs font-mono font-bold text-emerald-800">VERTICAL 03</div>
              <h3 className="text-xl font-bold text-neutral-900">Advanced Dental &amp; Aesthetics</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Implants, aligners, laser treatments, and cosmetic surgery. Shifting prospective patients away from price-shopping toward clinical expertise and long-term results.
              </p>
              <div className="pt-2 text-xs text-neutral-500 font-medium">
                Deliverables: Case-study transformation funnels, consultation qualification screening, calendar booking.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Healthcare Growth Audit
            </span>
            <h2 className="text-3xl font-bold text-neutral-900 mt-1">
              Analyze Your Clinic's Patient Intake
            </h2>
            <p className="text-sm text-neutral-600 mt-2">
              Request a strategic consultation. We will audit your regional catchment area and present the exact patient system architecture for your specialty.
            </p>
          </div>
          <ConsultationForm />
        </div>
      </section>
    </div>
  );
};

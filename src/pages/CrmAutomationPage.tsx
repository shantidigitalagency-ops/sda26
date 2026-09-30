import React from 'react';
import { ConsultationForm } from '../components/ConsultationForm';

interface CrmAutomationPageProps {
  onNavigate: (path: string) => void;
}

export const CrmAutomationPage: React.FC<CrmAutomationPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full">
      <section className="pt-16 pb-20 border-b border-neutral-200/80 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              System Component 05
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 mt-2 text-balance">
              Healthcare CRM &amp; WhatsApp Automation
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 mt-4 leading-relaxed">
              Eliminating the fatal gap between ad clicks and front-desk phone calls. Immediate patient notification, counselor routing, and automated appointment reminders.
            </p>
          </div>
        </div>
      </section>

      {/* Speed to Lead Concept */}
      <section className="py-20 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                THE 5-MINUTE WINDOW
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
                Why 62% of Healthcare Leads Drop Off
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed">
                When a prospective patient submits an enquiry for an IVF consultation or surgical evaluation, they are actively looking for reassurance. If your clinic waits 4 hours or until the next day to respond, they have already messaged three other clinics.
              </p>
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs space-y-2">
                <div className="font-bold text-neutral-900">With Standard Agency:</div>
                <div className="text-neutral-600">Leads sit in Facebook Ads Manager or an unmonitored spreadsheet. No alert is sent to the clinic receptionist. The lead cools down.</div>
                <div className="font-bold text-emerald-800 pt-2">With SDA Patient Growth System™:</div>
                <div className="text-neutral-700">Within 30 seconds of submission, the patient receives a warm, verified WhatsApp message with doctor credentials and clinic location, while the counselor’s phone pings with patient details.</div>
              </div>
            </div>

            {/* Architecture Diagram */}
            <div className="p-8 rounded-2xl bg-neutral-900 text-white space-y-4">
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                Automated Patient Workflow
              </div>
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 bg-neutral-800 rounded-lg border border-neutral-700">
                  <span className="text-neutral-400">01. Intake:</span> Lead submits Google/Meta landing form
                </div>
                <div className="text-center text-neutral-500">↓</div>
                <div className="p-3 bg-neutral-800 rounded-lg border border-neutral-700">
                  <span className="text-neutral-400">02. CRM Sync:</span> Data classified by treatment &amp; urgency
                </div>
                <div className="text-center text-neutral-500">↓</div>
                <div className="p-3 bg-neutral-800 rounded-lg border border-neutral-700">
                  <span className="text-neutral-400">03. Counselor Alert:</span> WhatsApp ping to clinic coordinator
                </div>
                <div className="text-center text-neutral-500">↓</div>
                <div className="p-3 bg-neutral-800 rounded-lg border border-neutral-700">
                  <span className="text-neutral-400">04. Patient Concierge:</span> Automated welcome, map &amp; doctor video
                </div>
                <div className="text-center text-neutral-500">↓</div>
                <div className="p-3 bg-emerald-950 text-emerald-200 rounded-lg border border-emerald-700 font-bold">
                  05. Outcome: Confirmed Chamber Appointment + Calendar Reminder
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Features */}
      <section className="py-20 bg-[#FAF9F5] border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Official WhatsApp Business API
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 mt-2">
              Structured Patient Follow-Up Cadence
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-neutral-200 space-y-2">
              <h4 className="text-base font-bold text-neutral-900">Instant Triage Cadence</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Automated immediate confirmation with clinic address, Google Maps pin, consulting hours, and consultation fee breakdown.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-neutral-200 space-y-2">
              <h4 className="text-base font-bold text-neutral-900">Pre-Visit Preparation</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Reminding patients to bring previous ultrasound scans, blood test reports, and medical prescriptions before arriving.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-neutral-200 space-y-2">
              <h4 className="text-base font-bold text-neutral-900">2-Hour Reminder Pin</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Automated morning and 2-hour appointment alerts that reduce chamber no-shows by up to 45%.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-neutral-900">
              Upgrade Your Clinic's Lead Management
            </h3>
            <p className="text-sm text-neutral-600 mt-2">
              Stop losing high-value patient enquiries to unanswered phones and disorganized receptionists.
            </p>
          </div>
          <ConsultationForm />
        </div>
      </section>
    </div>
  );
};

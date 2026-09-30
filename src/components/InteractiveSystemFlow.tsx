import React, { useState } from 'react';
import { useCms } from '../cms/cmsStore';

interface FlowStep {
  id: string;
  stageNumber: string;
  title: string;
  shortLabel: string;
  tagline: string;
  mechanics: string;
  agencyMistake: string;
  sdaMethod: string;
  tools: string[];
  metrics: string[];
}

const FLOW_STEPS: FlowStep[] = [
  {
    id: 'attention',
    stageNumber: '01',
    title: 'ATTENTION',
    shortLabel: 'Acquisition',
    tagline: 'High-Intent Healthcare Search & Meta Demographics',
    mechanics: 'Prospective patients or anxious families discover your clinic precisely when they search for specific medical procedures, symptoms, or doctor specialties.',
    agencyMistake: 'Buying generic clicks on broad keywords ("gynecologist near me") without negative keywords, draining budget on non-clinical queries.',
    sdaMethod: 'Intent-sculpted Google Search campaigns and educational video ads targeting qualified age and geographic bands with zero waste.',
    tools: ['Google Search Ads', 'Meta Health Campaigns', 'Local Geo-Fencing', 'Organic Search Grounding'],
    metrics: ['Search Impression Share', 'Cost Per Clinical Click', 'Intent Ratio'],
  },
  {
    id: 'trust',
    stageNumber: '02',
    title: 'TRUST',
    shortLabel: 'Credibility',
    tagline: 'Doctor Authority Videos & Clinical Reputation',
    mechanics: 'Patients do not buy healthcare on impulse. They seek deep clinical validation, doctor eminence, procedural clarity, and ethical transparency.',
    agencyMistake: 'Posting generic Canva festival templates, stock photography of Caucasian doctors, and hollow quotes that inspire zero medical confidence.',
    sdaMethod: 'In-clinic video interviews where the senior consultant explains treatment risks, success benchmarks, and real patient recovery paths.',
    tools: ['Consultant Video Series', 'Procedure Guides', 'Google Review Governance', 'Verified Patient Proof'],
    metrics: ['Video Completion Rate', 'Doctor Search Uplift', 'Reputation Trust Score'],
  },
  {
    id: 'enquiry',
    stageNumber: '03',
    title: 'ENQUIRY',
    shortLabel: 'Conversion',
    tagline: 'Friction-Free WhatsApp & Medical Booking Funnels',
    mechanics: 'The patient transitions from reading to reaching out. Friction must be zero, with immediate clarity on consultation times and location.',
    agencyMistake: 'Sending traffic to a slow 10-page hospital website where the contact form has 12 fields and the phone number is unclickable.',
    sdaMethod: 'Dedicated mobile-optimized treatment landing pages with 1-click verified WhatsApp booking, call tracking, and structured symptom intake.',
    tools: ['High-Speed Landing Engine', '1-Tap WhatsApp Intake', 'Call Routing Architecture', 'Pre-Consultation Forms'],
    metrics: ['Landing Conversion %', 'Cost Per Enquiry (CPE)', 'WhatsApp Click-Through'],
  },
  {
    id: 'followup',
    stageNumber: '04',
    title: 'FOLLOW-UP',
    shortLabel: 'Triage',
    tagline: 'Dedicated CRM, Instant Alerts & Automated Cadence',
    mechanics: 'The crucial window: 62% of patients book with the healthcare practice that contacts and reassures them within the first 5 minutes.',
    agencyMistake: 'Leads dumped into a Google Sheet once a week with no staff notification. Enquiries grow cold and book with competing hospitals.',
    sdaMethod: 'Instant counselor mobile notifications, automated WhatsApp introduction with clinic map and doctor bio, and 5-minute response protocol.',
    tools: ['Healthcare CRM Pipeline', 'WhatsApp API Automation', 'Counselor Speed-to-Lead Timer', 'Call Recording Logs'],
    metrics: ['First Response Time (<5 min)', 'Contacted Rate (>90%)', 'Triage Qualification %'],
  },
  {
    id: 'appointment',
    stageNumber: '05',
    title: 'APPOINTMENT',
    shortLabel: 'Chamber Visit',
    tagline: 'Confirmed Consultations in Your Clinic Chamber',
    mechanics: 'The prospective patient arrives physically in your OPD chamber, educated, pre-briefed, and confident in the consulting doctor.',
    agencyMistake: 'Measuring "leads generated" without caring whether any patient ever walked through the clinic door.',
    sdaMethod: 'Automated 24h & 2h appointment reminder cadences via WhatsApp with location pins, reducing clinic no-show rates by up to 45%.',
    tools: ['Calendar Confirmation Flow', 'Clinic Location Dispatch', 'Pre-Visit Checklists', 'Show-Up Verification'],
    metrics: ['Cost Per Appointment (CPA)', 'Show-Up Rate (80%+)', 'OPD Footfall'],
  },
  {
    id: 'growth',
    stageNumber: '06',
    title: 'GROWTH',
    shortLabel: 'Revenue',
    tagline: 'Closed-Loop Procedure Attribution & Compounding',
    mechanics: 'Connecting ad spend directly to actual surgical procedures, IVF cycles, or ongoing care regimens to continuously reinvest in profitable channels.',
    agencyMistake: 'Vanity monthly reports highlighting impressions and Facebook page likes with zero financial connection to clinic revenue.',
    sdaMethod: 'Audited monthly performance reviews measuring true Patient Lifetime Value, Procedure ROAS, and continuous CPA reduction.',
    tools: ['Closed-Loop Attribution', 'OPD-to-IPD Conversion Tracking', 'Quarterly Budget Reallocation', 'LTV Modeling'],
    metrics: ['True Procedure ROAS', 'Cost Per Acquired Patient', 'Chamber Utilization Rate'],
  },
];

export const InteractiveSystemFlow: React.FC = () => {
  const [activeStepId, setActiveStepId] = useState<string>('attention');
  const activeStep = FLOW_STEPS.find((s) => s.id === activeStepId) || FLOW_STEPS[0];

  return (
    <div className="w-full bg-white rounded-2xl border border-neutral-200/90 shadow-sm overflow-hidden transition-all">
      {/* Visual System Pipeline Header */}
      <div className="p-6 sm:p-8 border-b border-neutral-200/80 bg-neutral-50/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-emerald-800">
              SDA Patient Growth System™ Architecture
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 mt-1">
              The Six-Stage Connected Engine
            </h3>
          </div>
          <div className="text-xs text-neutral-500 font-mono">
            Click any stage to inspect operational mechanics
          </div>
        </div>

        {/* Step Progression Bar */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {FLOW_STEPS.map((step, idx) => {
            const isSelected = step.id === activeStepId;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStepId(step.id)}
                className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer relative group ${
                  isSelected
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className={`font-mono ${isSelected ? 'text-emerald-400' : 'text-neutral-400'}`}>
                    {step.stageNumber}
                  </span>
                  <span className={`text-[10px] uppercase tracking-wider font-semibold ${isSelected ? 'text-neutral-300' : 'text-neutral-400'}`}>
                    {step.shortLabel}
                  </span>
                </div>
                <div className="font-bold text-sm tracking-tight truncate">
                  {step.title}
                </div>
                {idx < FLOW_STEPS.length - 1 && (
                  <span className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-neutral-300 pointer-events-none">
                    →
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stage Detail Inspector */}
      <div className="p-6 sm:p-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-baseline gap-3 mb-2">
            <span className="text-sm font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              STAGE {activeStep.stageNumber}
            </span>
            <h4 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
              {activeStep.title} — {activeStep.tagline}
            </h4>
          </div>

          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed mt-3">
            {activeStep.mechanics}
          </p>

          {/* Contrast: Typical Agency Failure vs SDA Operating System */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="p-5 rounded-xl bg-neutral-50 border border-neutral-200">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-700 mb-2">
                <span>✕</span>
                <span>The Typical Agency Flaw</span>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {activeStep.agencyMistake}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
                <span>✓</span>
                <span>The SDA System Integration</span>
              </div>
              <p className="text-sm text-neutral-800 leading-relaxed font-medium">
                {activeStep.sdaMethod}
              </p>
            </div>
          </div>

          {/* Tools & Core Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 pt-6 border-t border-neutral-100">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-2">
                Infrastructure &amp; Tools Deployed
              </span>
              <div className="flex flex-wrap gap-2 text-xs text-neutral-700">
                {activeStep.tools.map((t, idx) => (
                  <span key={idx} className="bg-neutral-100 px-2.5 py-1 rounded border border-neutral-200/70">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-2">
                Audited Success Metrics
              </span>
              <div className="flex flex-wrap gap-2 text-xs text-emerald-800 font-mono">
                {activeStep.metrics.map((m, idx) => (
                  <span key={idx} className="bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

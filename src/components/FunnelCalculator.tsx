import React, { useState } from 'react';

interface SpecialtyProfile {
  id: string;
  name: string;
  avgCpe: number; // Cost per enquiry in INR
  qualRate: number; // % qualified
  apptRate: number; // % who show up for appointment
  procRate: number; // % who convert to high ticket / procedure
  avgPatientValue: number; // Estimated patient value in INR
}

const SPECIALTY_PROFILES: SpecialtyProfile[] = [
  {
    id: 'fertility',
    name: 'IVF & Fertility Clinic',
    avgCpe: 280,
    qualRate: 0.45,
    apptRate: 0.42,
    procRate: 0.28,
    avgPatientValue: 120000,
  },
  {
    id: 'ortho',
    name: 'Orthopedic / Surgical Chamber',
    avgCpe: 220,
    qualRate: 0.50,
    apptRate: 0.40,
    procRate: 0.22,
    avgPatientValue: 65000,
  },
  {
    id: 'hospital',
    name: 'Daycare Hospital / Multi-Specialty',
    avgCpe: 180,
    qualRate: 0.55,
    apptRate: 0.45,
    procRate: 0.20,
    avgPatientValue: 40000,
  },
  {
    id: 'specialist',
    name: 'Doctor Private Chamber',
    avgCpe: 160,
    qualRate: 0.60,
    apptRate: 0.50,
    procRate: 0.15,
    avgPatientValue: 15000,
  },
];

export const FunnelCalculator: React.FC<{ onConsultationClick?: () => void }> = ({ onConsultationClick }) => {
  const [adSpend, setAdSpend] = useState<number>(30000);
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<string>('fertility');
  const [systemMode, setSystemMode] = useState<'sda' | 'fragmented'>('sda');

  const specialty = SPECIALTY_PROFILES.find((s) => s.id === selectedSpecialtyId) || SPECIALTY_PROFILES[0];

  // If fragmented agency (no CRM, slow response, generic landing page):
  // Cost per lead is 40% higher, qualification is 50% lower, appointment show-up drops drastically
  const modifier = systemMode === 'sda' ? 1.0 : 0.4;
  const costModifier = systemMode === 'sda' ? 1.0 : 1.35;

  const effectiveCpe = Math.round(specialty.avgCpe * costModifier);
  const estimatedEnquiries = Math.max(1, Math.round(adSpend / effectiveCpe));
  const qualifiedEnquiries = Math.max(1, Math.round(estimatedEnquiries * (specialty.qualRate * (systemMode === 'sda' ? 1 : 0.65))));
  const confirmedAppointments = Math.max(1, Math.round(qualifiedEnquiries * (specialty.apptRate * modifier)));
  const acquiredProcedures = Math.max(0, Math.round(confirmedAppointments * specialty.procRate));

  const costPerAppointment = Math.round(adSpend / confirmedAppointments);
  const estimatedProcedurePipeline = acquiredProcedures * specialty.avgPatientValue;

  return (
    <div className="w-full bg-white rounded-2xl border border-neutral-200/90 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 sm:p-8 border-b border-neutral-200/80 bg-neutral-50/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-emerald-800">
              Interactive Funnel Model
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 mt-1">
              From Ad Spend to Chamber Appointment
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              Benchmark simulation to visualize how a connected follow-up architecture protects clinic revenue.
            </p>
          </div>

          {/* Model Toggle */}
          <div className="flex items-center gap-1 p-1 bg-neutral-200/70 rounded-lg self-start md:self-auto">
            <button
              onClick={() => setSystemMode('sda')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                systemMode === 'sda'
                  ? 'bg-neutral-900 text-white shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              SDA Connected System
            </button>
            <button
              onClick={() => setSystemMode('fragmented')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                systemMode === 'fragmented'
                  ? 'bg-rose-700 text-white shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Fragmented Marketing
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {/* Controls Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Specialty Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
              Select Clinical Specialty
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SPECIALTY_PROFILES.map((prof) => (
                <button
                  key={prof.id}
                  onClick={() => setSelectedSpecialtyId(prof.id)}
                  className={`text-left p-3 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                    selectedSpecialtyId === prof.id
                      ? 'border-neutral-900 bg-neutral-900 text-white'
                      : 'border-neutral-200 hover:border-neutral-300 text-neutral-700 bg-neutral-50/50'
                  }`}
                >
                  <div className="font-semibold">{prof.name}</div>
                  <div className={`text-[10px] mt-0.5 ${selectedSpecialtyId === prof.id ? 'text-neutral-300' : 'text-neutral-400'}`}>
                    Avg Patient Val: ₹{prof.avgPatientValue.toLocaleString('en-IN')}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Ad Spend Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Monthly Ad Spend Model
              </label>
              <span className="text-xl font-bold font-mono text-neutral-950">
                ₹{adSpend.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min={15000}
              max={150000}
              step={5000}
              value={adSpend}
              onChange={(e) => setAdSpend(Number(e.target.value))}
              className="w-full accent-neutral-900 h-2 bg-neutral-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono text-neutral-400">
              <span>₹15,000 (Chamber Launch)</span>
              <span>₹75,000</span>
              <span>₹1,50,000 (Clinic Hub)</span>
            </div>

            {systemMode === 'fragmented' && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 leading-relaxed">
                <strong>The Fragmentation Penalty:</strong> Without immediate counselor triage, speed-to-lead automation, and treatment-specific landing pages, up to 60% of patient inquiries are lost to rival clinics.
              </div>
            )}
          </div>
        </div>

        {/* Funnel Metrics Waterfall */}
        <div className="pt-4 border-t border-neutral-100">
          <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4">
            Simulated Patient Waterfall ({specialty.name})
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {/* Step 1 */}
            <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/60">
              <span className="text-[11px] font-mono text-neutral-400 block mb-1">STAGE 1</span>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-neutral-900 tabular-nums">
                {estimatedEnquiries}
              </div>
              <div className="text-xs font-medium text-neutral-700 mt-1">Patient Enquiries</div>
              <div className="text-[11px] text-neutral-400 mt-0.5">~₹{effectiveCpe} / enquiry</div>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/60">
              <span className="text-[11px] font-mono text-neutral-400 block mb-1">STAGE 2</span>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-neutral-900 tabular-nums">
                {qualifiedEnquiries}
              </div>
              <div className="text-xs font-medium text-neutral-700 mt-1">Medically Qualified</div>
              <div className="text-[11px] text-neutral-400 mt-0.5">Filter out non-clinical calls</div>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/50">
              <span className="text-[11px] font-mono text-emerald-800 block mb-1">STAGE 3</span>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-900 tabular-nums">
                {confirmedAppointments}
              </div>
              <div className="text-xs font-bold text-emerald-950 mt-1">Chamber Appointments</div>
              <div className="text-[11px] text-emerald-700 font-mono mt-0.5">
                ₹{costPerAppointment.toLocaleString('en-IN')} / show
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-xl border border-neutral-900 bg-neutral-900 text-white">
              <span className="text-[11px] font-mono text-emerald-400 block mb-1">STAGE 4</span>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tabular-nums">
                {acquiredProcedures}
              </div>
              <div className="text-xs font-medium text-neutral-200 mt-1">Procedures / Cycles</div>
              <div className="text-[11px] text-neutral-400 mt-0.5">
                ~₹{estimatedProcedurePipeline.toLocaleString('en-IN')} pipeline
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer & Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-neutral-100 text-xs text-neutral-500">
          <p className="max-w-2xl leading-relaxed">
            * <em>Illustrative benchmark simulation for strategic healthcare modeling.</em> Actual clinic outcomes vary depending on doctor credibility, pricing transparency, clinic location, and front-desk counselor discipline.
          </p>

          {onConsultationClick && (
            <button
              onClick={onConsultationClick}
              className="px-4 py-2 bg-neutral-900 text-white font-medium rounded-lg hover:bg-neutral-800 transition-colors whitespace-nowrap cursor-pointer self-start sm:self-auto"
            >
              Get Custom Clinic Model
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

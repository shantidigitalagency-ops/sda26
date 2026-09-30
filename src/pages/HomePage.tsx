import React from 'react';
import { useCms } from '../cms/cmsStore';
import { InteractiveSystemFlow } from '../components/InteractiveSystemFlow';
import { FunnelCalculator } from '../components/FunnelCalculator';
import { ConsultationForm } from '../components/ConsultationForm';
import { SmartImage } from '../components/SmartImage';
import { KineticText, TextShimmer } from '../components/KineticText';
import doctorHeroImg from '../assets/images/sda_doctor_consultation_1790749551637.jpg';
import fertilityClinicImg from '../assets/images/sda_fertility_clinic_lab_1790749566046.jpg';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { content } = useCms();
  const { home } = content;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      {/* ==================================================
          SECTION 1 — HERO SECTION
          ================================================== */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Outcome Statement */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              {/* Unboxed Metadata / Eyebrow */}
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-emerald-800 uppercase animate-fade-in-up">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-soft-pulse" />
                <span>{home.hero.eyebrow}</span>
              </div>

              {/* Primary Headline with Subtle Editorial Gradient */}
              <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-extrabold tracking-tight text-neutral-900 leading-[1.08] text-balance text-gradient-headline animate-fade-in-up-delay-1">
                {home.hero.title}
              </h1>

              {/* Supporting Copy */}
              <p className="text-lg sm:text-xl text-neutral-600 font-normal leading-relaxed max-w-2xl animate-fade-in-up-delay-2">
                {home.hero.description}
              </p>

              {/* Subtle Dynamic Kinetic Specialization Indicator */}
              <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-500 font-mono animate-fade-in-up-delay-2 pt-0.5">
                <span className="text-neutral-400">Tailored For:</span>
                <KineticText
                  phrases={[
                    'Fertility & IVF Practices',
                    'Specialized Surgeons & Clinics',
                    'Advanced Diagnostics & Labs',
                    'Healthcare OPD Centers',
                  ]}
                  className="font-semibold text-emerald-800"
                />
              </div>

              {/* Actions + WhatsApp CTA */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 animate-fade-in-up-delay-3">
                <button
                  onClick={() => onNavigate('/contact')}
                  className="px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-neutral-900 hover:bg-neutral-800 active:scale-[0.99] rounded-xl transition-all shadow-sm text-center cursor-pointer"
                >
                  {home.hero.primaryCta}
                </button>

                <a
                  href="https://wa.me/918944083896?text=Hello%20Shanti%20Digital%20Agency%2C%20I%20would%20like%20to%20inquire%20about%20the%20Patient%20Growth%20System."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#25D366] hover:bg-[#20ba5a] active:scale-[0.99] rounded-xl transition-all shadow-sm text-center"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z" />
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>

                <button
                  onClick={() => scrollToSection('growth-system')}
                  className="px-5 py-3.5 text-sm sm:text-base font-semibold text-neutral-800 bg-white hover:bg-neutral-50 active:scale-[0.99] border border-neutral-300 rounded-xl transition-all text-center cursor-pointer shadow-xs"
                >
                  {home.hero.secondaryCta}
                </button>
              </div>

              {/* Footnote */}
              <div className="pt-4 border-t border-neutral-200/80 text-xs text-neutral-500 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span>{home.hero.footnote}</span>
              </div>
            </div>

            {/* Right Column: Hero Visual Photography with Specular Reflection & Lightbox */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-neutral-200 shadow-md bg-neutral-100 group group-specular card-elegant-lift">
                <SmartImage
                  src={doctorHeroImg}
                  fallbackSrc="/images/sda_doctor_consultation.jpg"
                  alt="Doctor consulting with a patient in a modern clinical room"
                  category="doctor"
                  badge="Verified Clinical Chamber"
                  caption="Audited Doctor Consultation Protocol · High Trust & Dignity · Siliguri Studio"
                  className="w-full h-[380px] sm:h-[460px] object-cover object-center"
                />

                {/* Overlaid Minimalist System Indicator */}
                <div className="absolute inset-x-4 bottom-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-neutral-200/90 shadow-lg text-xs space-y-2 pointer-events-auto">
                  <div className="flex items-center justify-between font-mono text-[10px] text-neutral-500 uppercase tracking-wider">
                    <span>SDA Architecture</span>
                    <span className="text-emerald-700 font-bold">Closed-Loop</span>
                  </div>
                  <div className="flex items-center justify-between text-neutral-900 font-bold text-xs">
                    <span>Attention</span>
                    <span className="text-neutral-300">→</span>
                    <span>Trust</span>
                    <span className="text-neutral-300">→</span>
                    <span>Enquiry</span>
                    <span className="text-neutral-300">→</span>
                    <span>Appointment</span>
                  </div>
                  <p className="text-[11px] text-neutral-500 leading-tight">
                    Connecting Meta &amp; Google Ads directly to clinic counselor WhatsApp follow-up.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 2 — THE PROBLEM (Fragmentation)
          ================================================== */}
      <section className="py-20 sm:py-28 bg-[#FAF9F5] border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-semibold tracking-wider uppercase text-emerald-800">
              {home.problem.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 mt-2 text-balance">
              {home.problem.title}
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 mt-4 leading-relaxed">
              {home.problem.description}
            </p>
          </div>

          {/* Six Disconnected Realities */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {home.problem.fragmentedPoints.map((pt, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-white border border-neutral-200/80 shadow-xs hover:border-neutral-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono text-neutral-400 mb-2">0{idx + 1}</div>
                  <h3 className="text-lg font-bold text-neutral-900 tracking-tight mb-2">
                    {pt.issue}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {pt.reality}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-neutral-100 text-[11px] font-medium text-rose-700 flex items-center gap-1">
                  <span>✕</span>
                  <span>Patient Opportunity Lost</span>
                </div>
              </div>
            ))}
          </div>

          {/* Synthesis Statement */}
          <div className="mt-14 p-8 sm:p-10 rounded-2xl bg-neutral-900 text-white max-w-4xl mx-auto text-center space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
              The Fundamental Principle
            </span>
            <p className="text-xl sm:text-2xl font-bold tracking-tight leading-snug">
              {home.problem.closingStatement}
            </p>
            <div className="pt-2 flex flex-wrap justify-center items-center gap-2 text-xs font-mono text-neutral-300">
              <span className="px-2 py-1 bg-neutral-800 rounded">Ads</span>
              <span>+</span>
              <span className="px-2 py-1 bg-neutral-800 rounded">Content</span>
              <span>+</span>
              <span className="px-2 py-1 bg-neutral-800 rounded">Landing Pages</span>
              <span>+</span>
              <span className="px-2 py-1 bg-neutral-800 rounded">CRM</span>
              <span>+</span>
              <span className="px-2 py-1 bg-neutral-800 rounded">WhatsApp</span>
              <span>=</span>
              <span className="px-2 py-1 bg-emerald-800 text-white font-bold rounded">ONE SYSTEM</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 3 — THE BIG IDEA (Walkthrough)
          ================================================== */}
      <section className="py-20 sm:py-28 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-semibold tracking-wider uppercase text-emerald-800">
              {home.bigIdea.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 mt-2 text-balance">
              {home.bigIdea.title}
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 mt-4 leading-relaxed">
              {home.bigIdea.description}
            </p>
          </div>

          {/* 9-Step Clean Horizontal / Vertical Flow */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {home.bigIdea.journeySteps.map((j) => (
              <div
                key={j.step}
                className="p-6 rounded-2xl border border-neutral-200/90 bg-[#FAF9F5]/50 hover:bg-[#FAF9F5] transition-all relative"
              >
                <div className="text-2xl font-black font-mono text-emerald-800 mb-3">
                  {j.step}
                </div>
                <h3 className="text-base font-bold text-neutral-900 tracking-tight mb-2">
                  {j.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {j.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 4 — PATIENT GROWTH SYSTEM™ (HERO PRODUCT)
          ================================================== */}
      <section id="growth-system" className="py-20 sm:py-28 bg-[#FAF9F5] border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-semibold tracking-wider uppercase text-emerald-800">
              {home.system.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 mt-2 text-balance">
              {home.system.title}
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 mt-4 leading-relaxed">
              {home.system.description}
            </p>
          </div>

          {/* Interactive Flow Component */}
          <InteractiveSystemFlow />

          <div className="mt-8 flex justify-end">
            <button
              onClick={() => onNavigate('/patient-growth-system')}
              className="text-xs font-bold text-neutral-900 hover:text-emerald-800 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Explore the comprehensive 6-stage deep dive</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 5 — HEALTHCARE SPECIALIZATION
          ================================================== */}
      <section className="py-20 sm:py-28 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
            <div className="lg:col-span-8">
              <span className="text-xs font-semibold tracking-wider uppercase text-emerald-800">
                {home.healthcare.eyebrow}
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 mt-2 text-balance">
                {home.healthcare.title}
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 mt-4 leading-relaxed max-w-2xl">
                {home.healthcare.description}
              </p>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <button
                onClick={() => onNavigate('/healthcare')}
                className="px-6 py-3 text-sm font-semibold text-neutral-900 border border-neutral-300 hover:bg-neutral-50 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
              >
                Explore Healthcare Growth →
              </button>
            </div>
          </div>

          {/* Four Segments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {home.healthcare.segments.map((seg) => (
              <div
                key={seg.id}
                className="p-8 rounded-2xl border border-neutral-200 bg-[#FAF9F5] hover:border-neutral-300 transition-all space-y-4"
              >
                <div className="flex items-center justify-between border-b border-neutral-200/80 pb-4">
                  <h3 className="text-xl font-bold text-neutral-900 tracking-tight">
                    {seg.title}
                  </h3>
                  <span className="text-xs font-mono text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-1 rounded">
                    SDA Specialization
                  </span>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-0.5">
                      The Clinical Nature
                    </span>
                    <p className="text-neutral-700">{seg.focus}</p>
                  </div>

                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-0.5">
                      The Core Bottleneck
                    </span>
                    <p className="text-neutral-700">{seg.painPoint}</p>
                  </div>

                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-0.5">
                      The Growth System Solution
                    </span>
                    <p className="text-neutral-900 font-medium">{seg.solution}</p>
                  </div>

                  <div className="pt-2 text-xs text-neutral-500 font-mono">
                    <strong>Primary Audited Outcome:</strong> {seg.keyMetric}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Visual Showcase Card for IVF / Clinic */}
          <div className="mt-12 rounded-2xl overflow-hidden border border-neutral-200 shadow-md relative group group-specular card-elegant-lift">
            <SmartImage
              src={fertilityClinicImg}
              fallbackSrc="/images/sda_fertility_clinic_lab.jpg"
              alt="State-of-the-art modern fertility and reproductive clinic interior"
              category="clinic"
              badge="Clean Room Class 10,000"
              caption="Embryology Lab Standards & Patient Trust Center · Audited Clinical Facility"
              className="w-full h-72 sm:h-96 object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/35 to-transparent flex items-end p-6 sm:p-8 pointer-events-none">
              <div className="text-white max-w-xl">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Clinical Standards &amp; Dignity
                </span>
                <h4 className="text-lg sm:text-2xl font-bold mt-1 text-white leading-snug">
                  Built to reflect medical excellence, emotional dignity, and procedural trust.
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 6 — WHAT SDA ACTUALLY DOES
          ================================================== */}
      <section className="py-20 sm:py-28 bg-[#FAF9F5] border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-semibold tracking-wider uppercase text-emerald-800">
              {home.capabilities.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 mt-2 text-balance">
              {home.capabilities.title}
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 mt-4 leading-relaxed">
              {home.capabilities.description}
            </p>
          </div>

          {/* 6 Capabilities */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {home.capabilities.items.map((cap) => (
              <div
                key={cap.id}
                className="p-7 rounded-2xl bg-white border border-neutral-200/90 hover:border-neutral-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono text-emerald-800 font-bold mb-2">
                    {cap.number}
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 tracking-tight">
                    {cap.title}
                  </h3>
                  <div className="text-xs text-neutral-500 font-medium mt-0.5 mb-3">
                    {cap.subtitle}
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                    {cap.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                    Included Components
                  </div>
                  <ul className="space-y-1.5 text-xs text-neutral-700">
                    {cap.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-emerald-700">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 7 — FROM LEAD TO APPOINTMENT (INTERACTIVE FUNNEL)
          ================================================== */}
      <section className="py-20 sm:py-28 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-semibold tracking-wider uppercase text-emerald-800">
              {home.funnel.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 mt-2 text-balance">
              {home.funnel.title}
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 mt-4 leading-relaxed">
              {home.funnel.description}
            </p>
          </div>

          <FunnelCalculator onConsultationClick={() => onNavigate('/contact')} />
        </div>
      </section>

      {/* ==================================================
          SECTION 8 — CASE STUDIES (PROOF MATTERS)
          ================================================== */}
      <section className="py-20 sm:py-28 bg-[#FAF9F5] border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-semibold tracking-wider uppercase text-emerald-800">
              {home.caseStudies.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 mt-2 text-balance">
              {home.caseStudies.title}
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 mt-4 leading-relaxed">
              {home.caseStudies.description}
            </p>
            <p className="text-xs text-neutral-400 mt-2 italic">
              {home.caseStudies.disclaimer}
            </p>
          </div>

          <div className="space-y-8">
            {home.caseStudies.items.map((cs) => (
              <div
                key={cs.id}
                className="p-8 sm:p-10 rounded-2xl bg-white border border-neutral-200/90 shadow-xs"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-neutral-200/80 pb-6 mb-6">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-1">
                      <span>{cs.clientType}</span>
                      <span>·</span>
                      <span>{cs.location}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
                      {cs.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-neutral-100 text-neutral-800 border border-neutral-200">
                      {cs.status === 'verified_model' ? 'Verified Performance Model' : 'Active System Framework'}
                    </span>
                  </div>
                </div>

                {/* Challenge & Strategy */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 text-sm">
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-rose-700">
                      The Clinical Bottleneck
                    </span>
                    <p className="text-neutral-700 leading-relaxed">{cs.challenge}</p>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                      The System Deployment
                    </span>
                    <p className="text-neutral-700 leading-relaxed">{cs.strategy}</p>
                  </div>
                </div>

                {/* Quantified Metrics Row */}
                <div className="p-6 rounded-xl bg-neutral-50 border border-neutral-200/80 mb-6">
                  <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                    Audited Campaign Economics
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {cs.metrics.map((m, idx) => (
                      <div key={idx}>
                        <div className="text-xl sm:text-2xl font-bold font-mono text-neutral-950 tabular-nums">
                          {m.value}
                        </div>
                        <div className="text-xs font-medium text-neutral-700 mt-0.5">{m.label}</div>
                        {m.sublabel && (
                          <div className="text-[10px] text-neutral-400">{m.sublabel}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Outcome & Quote */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-neutral-600">
                  <div>
                    <strong>Core System Outcome:</strong> {cs.outcome}
                  </div>
                  {cs.clientQuote && (
                    <div className="italic text-neutral-500 max-w-md">
                      "{cs.clientQuote.text}" — <span className="font-semibold text-neutral-700">{cs.clientQuote.role}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 9 — WHY SDA (PHILOSOPHY)
          ================================================== */}
      <section className="py-20 sm:py-28 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-semibold tracking-wider uppercase text-emerald-800">
              {home.whySda.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 mt-2 text-balance">
              {home.whySda.title}
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 mt-4 leading-relaxed">
              {home.whySda.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {home.whySda.principles.map((pr) => (
              <div
                key={pr.number}
                className="p-8 rounded-2xl border border-neutral-200 bg-[#FAF9F5] hover:border-neutral-300 transition-all space-y-3"
              >
                <div className="text-2xl font-black font-mono text-emerald-800">
                  {pr.number}
                </div>
                <h3 className="text-xl font-bold text-neutral-900 tracking-tight">
                  {pr.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {pr.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center text-sm font-medium text-neutral-700">
            {home.whySda.closing}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 10 — CLIENT EXPERIENCE (7-DAY DEPLOYMENT)
          ================================================== */}
      <section className="py-20 sm:py-28 bg-[#FAF9F5] border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-semibold tracking-wider uppercase text-emerald-800">
              {home.clientExperience.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 mt-2 text-balance">
              {home.clientExperience.title}
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 mt-4 leading-relaxed">
              {home.clientExperience.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {home.clientExperience.timeline.map((item) => (
              <div
                key={item.day}
                className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider mb-2">
                    {item.day}
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 tracking-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100">
                  <div className="text-[10px] uppercase font-semibold text-neutral-400 mb-1.5">
                    Key Deliverables
                  </div>
                  <ul className="space-y-1 text-xs text-neutral-700">
                    {item.deliverables.map((d, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="text-emerald-700">•</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 11 — CLOSING CTA & DIRECT CONSULTATION
          ================================================== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-xs font-semibold tracking-wider uppercase text-emerald-800">
              {home.cta.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 mt-2 text-balance">
              {home.cta.title}
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 mt-4 leading-relaxed">
              {home.cta.description}
            </p>
          </div>

          {/* Embedded Consultation Form */}
          <ConsultationForm />
        </div>
      </section>
    </div>
  );
};

import React from 'react';
import { ConsultationForm } from '../components/ConsultationForm';
import { SmartImage } from '../components/SmartImage';
import doctorHeroImg from '../assets/images/sda_doctor_consultation_1790749551637.jpg';

interface ContentPageProps {
  onNavigate: (path: string) => void;
}

export const ContentPage: React.FC<ContentPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full">
      <section className="pt-16 pb-20 border-b border-neutral-200/80 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              System Component 02
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 mt-2 text-balance">
              Doctor Authority &amp; Clinical Content
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 mt-4 leading-relaxed">
              We produce zero festival graphics or generic quotes. We create clinical video assets that establish your senior consultants as the undisputed medical authorities in your region.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy of Clinical Content */}
      <section className="py-20 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                THE PATIENT TRUST MATRIX
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
                Why Doctor Videos Convert When Graphics Fail
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed">
                When a patient is anxious about an impending surgery, laparoscopic procedure, or IVF cycle, they do not care about promotional agency slogans. They want to look their doctor in the eye, assess their demeanor, hear their clinical clarity, and feel safe.
              </p>

              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-xl bg-[#FAF9F5] border border-neutral-200 text-xs">
                  <strong className="block text-sm text-neutral-900 mb-1">1. Condition Explainer Videos</strong>
                  <p className="text-neutral-600">
                    2 to 3 minute focused walkthroughs answering specific patient questions: <em>"When is IVF actually necessary?", "What happens during a robotic knee replacement?", "Are fibroids dangerous?"</em>
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF9F5] border border-neutral-200 text-xs">
                  <strong className="block text-sm text-neutral-900 mb-1">2. Procedure Transparency Walkthroughs</strong>
                  <p className="text-neutral-600">
                    Showcasing clinic hygiene, OT standards, anesthesia safety protocols, and post-operative recovery timelines.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF9F5] border border-neutral-200 text-xs">
                  <strong className="block text-sm text-neutral-900 mb-1">3. Reputation &amp; Google Review Protocols</strong>
                  <p className="text-neutral-600">
                    Systematic post-discharge review capture that builds genuine 4.8+ Google Maps ratings without spam or fake testimonials.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-md">
                <SmartImage
                  src={doctorHeroImg}
                  fallbackSrc="/images/sda_doctor_consultation.jpg"
                  alt="Doctor consulting with medical authority"
                  category="doctor"
                  className="w-full h-[440px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Production Framework */}
      <section className="py-20 bg-[#FAF9F5] border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Turnkey Production
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 mt-2">
              Zero Burden on the Doctor's Time
            </h2>
            <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
              We know doctors have exhausting OPD schedules. SDA handles clinical research, script outlines, teleprompter setup, multi-camera lighting in your chamber, and high-retention editing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-neutral-200 space-y-2">
              <div className="text-xs font-mono font-bold text-neutral-400">STEP 1</div>
              <h4 className="text-base font-bold text-neutral-900">Script &amp; Topic Strategy</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                We identify the top 10 search queries patients ask in your city and draft conversational, medically sound script outlines.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-neutral-200 space-y-2">
              <div className="text-xs font-mono font-bold text-neutral-400">STEP 2</div>
              <h4 className="text-base font-bold text-neutral-900">In-Chamber 2-Hour Shoot</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Our production team arrives at your chamber, sets up audio and lighting, and records an entire quarter's video content in one sitting.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-neutral-200 space-y-2">
              <div className="text-xs font-mono font-bold text-neutral-400">STEP 3</div>
              <h4 className="text-base font-bold text-neutral-900">Funnel Distribution</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Videos are reformatted into Meta ad creatives, YouTube clinical libraries, and website landing page video trust anchors.
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
              Build Clinical Authority for Your Practice
            </h3>
            <p className="text-sm text-neutral-600 mt-2">
              Let us produce the content system that turns passive searchers into confident appointments.
            </p>
          </div>
          <ConsultationForm />
        </div>
      </section>
    </div>
  );
};

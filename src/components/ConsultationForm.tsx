import React, { useState } from 'react';
import { useCms } from '../cms/cmsStore';

interface ConsultationFormProps {
  onSuccess?: () => void;
}

export const ConsultationForm: React.FC<ConsultationFormProps> = ({ onSuccess }) => {
  const { addSubmission, content } = useCms();

  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    phone: '',
    email: '',
    city: 'Siliguri',
    businessType: 'IVF & Fertility Clinic',
    website: '',
    monthlyBudget: '₹50,000 - ₹1,00,000',
    currentChannels: ['Meta Ads'] as string[],
    mainGrowthChallenge: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const availableChannels = [
    'Google Ads (Search)',
    'Meta Ads (Facebook/Instagram)',
    'Organic Social Media Posts',
    'Doctor & Hospital Referrals',
    'Third-Party Portals (Practo/JustDial)',
    'Offline Banners & Newspaper',
  ];

  const handleChannelToggle = (channel: string) => {
    setFormData((prev) => {
      const exists = prev.currentChannels.includes(channel);
      return {
        ...prev,
        currentChannels: exists
          ? prev.currentChannels.filter((c) => c !== channel)
          : [...prev.currentChannels, channel],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Basic validation
    if (!formData.name.trim() || !formData.businessName.trim()) {
      setErrorMsg('Please enter your full name and clinic/hospital name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setErrorMsg('Please enter a valid contact phone number.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }

    setSubmitting(true);
    try {
      await addSubmission({
        name: formData.name.trim(),
        businessName: formData.businessName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        city: formData.city.trim(),
        businessType: formData.businessType,
        website: formData.website.trim(),
        monthlyBudget: formData.monthlyBudget,
        currentChannels: formData.currentChannels,
        mainGrowthChallenge: formData.mainGrowthChallenge.trim(),
      });

      setSubmitted(true);
      if (onSuccess) onSuccess();
    } catch {
      setErrorMsg('An error occurred while transmitting your request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-emerald-200 p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-sm">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-5 text-2xl font-bold">
          ✓
        </div>
        <h3 className="text-2xl font-bold text-neutral-900 tracking-tight">
          Consultation Request Registered
        </h3>
        <p className="text-neutral-600 mt-3 text-sm sm:text-base leading-relaxed">
          Thank you, <strong>{formData.name}</strong>. Your clinical profile for{' '}
          <strong>{formData.businessName}</strong> ({formData.city}) has been routed to our senior healthcare growth strategist.
        </p>

        <div className="mt-6 p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-600 text-left space-y-1">
          <div className="font-semibold text-neutral-800">What happens next:</div>
          <div>1. We run a preliminary catchment search audit for {formData.city}.</div>
          <div>2. We identify competitor visibility and patient drop-off risks.</div>
          <div>3. A strategist will contact you at <strong>{formData.phone}</strong> within 4 business hours with an initial diagnosis.</div>
        </div>

        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: '',
              businessName: '',
              phone: '',
              email: '',
              city: 'Siliguri',
              businessType: 'IVF & Fertility Clinic',
              website: '',
              monthlyBudget: '₹50,000 - ₹1,00,000',
              currentChannels: ['Meta Ads'],
              mainGrowthChallenge: '',
            });
          }}
          className="mt-8 px-6 py-2.5 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-10 shadow-sm max-w-3xl mx-auto">
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
          Direct Intake Protocol
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mt-1">
          Request a Growth Consultation
        </h3>
        <p className="text-sm text-neutral-600 mt-2">
          Tell us about your practice. We will review your current marketing leakages and map out how the SDA Patient Growth System™ applies to your clinic.
        </p>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-medium">
          {errorMsg}
        </div>
      )}

      <div className="space-y-6">
        {/* Row 1: Name & Business Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1.5">
              Doctor / Director Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Dr. A. K. Banerjee"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-neutral-50/50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900 focus:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1.5">
              Clinic / Hospital Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Hope Fertility & Women Clinic"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-neutral-50/50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Row 2: Phone & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1.5">
              Phone / WhatsApp Number <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="+91 98000 00000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-neutral-50/50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900 focus:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1.5">
              Official Email <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="doctor@clinic.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-neutral-50/50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Row 3: City & Business Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1.5">
              City / Catchment Region
            </label>
            <input
              type="text"
              placeholder="e.g. Siliguri, Jalpaiguri, Gangtok, Kolkata..."
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-neutral-50/50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900 focus:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1.5">
              Healthcare Category
            </label>
            <select
              value={formData.businessType}
              onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-neutral-50/50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900 focus:bg-white transition-colors"
            >
              <option value="IVF & Fertility Clinic">IVF &amp; Fertility Clinic</option>
              <option value="Specialized Doctor / Surgeon">Specialized Doctor / Surgeon Chamber</option>
              <option value="Multi-Specialty / Daycare Hospital">Multi-Specialty / Daycare Hospital</option>
              <option value="Advanced Healthcare Practice">Advanced Healthcare Practice (Dental, Aesthetics, Ortho)</option>
              <option value="Diagnostic / Pathology Network">Diagnostic / Pathology Network</option>
              <option value="Other Selective Practice">Other Selective Enterprise</option>
            </select>
          </div>
        </div>

        {/* Row 4: Website & Budget */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1.5">
              Website or Google Profile URL (Optional)
            </label>
            <input
              type="text"
              placeholder="https://yourclinic.com"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-neutral-50/50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900 focus:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1.5">
              Planned Monthly Marketing Investment
            </label>
            <select
              value={formData.monthlyBudget}
              onChange={(e) => setFormData({ ...formData, monthlyBudget: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-neutral-50/50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900 focus:bg-white transition-colors"
            >
              <option value="₹25,000 - ₹50,000">₹25,000 – ₹50,000 / month</option>
              <option value="₹50,000 - ₹1,00,000">₹50,000 – ₹1,00,000 / month</option>
              <option value="₹1,00,000 - ₹2,50,000">₹1,00,000 – ₹2,50,000 / month</option>
              <option value="₹2,50,000+">₹2,50,000+ / month (Enterprise Hospital)</option>
              <option value="Exploring First System">Exploring First System Setup</option>
            </select>
          </div>
        </div>

        {/* Current Channels */}
        <div>
          <label className="block text-xs font-medium text-neutral-700 mb-2">
            Current Channels Being Used (Select all that apply)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {availableChannels.map((ch) => {
              const checked = formData.currentChannels.includes(ch);
              return (
                <button
                  type="button"
                  key={ch}
                  onClick={() => handleChannelToggle(ch)}
                  className={`text-left p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                    checked
                      ? 'border-neutral-900 bg-neutral-900 text-white font-medium'
                      : 'border-neutral-200 bg-neutral-50/40 text-neutral-700 hover:border-neutral-300'
                  }`}
                >
                  <span>{ch}</span>
                  <span className={`text-xs ${checked ? 'text-emerald-400' : 'text-neutral-400'}`}>
                    {checked ? '✓' : '+'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Growth Challenge */}
        <div>
          <label className="block text-xs font-medium text-neutral-700 mb-1.5">
            Main Growth Challenge or Current Bottleneck <span className="text-neutral-400">(Optional)</span>
          </label>
          <textarea
            rows={3}
            placeholder="e.g. 'We are getting inquiries but no-show rates are high' or 'We need more IVF consultations without relying on agent commissions'..."
            value={formData.mainGrowthChallenge}
            onChange={(e) => setFormData({ ...formData, mainGrowthChallenge: e.target.value })}
            className="w-full px-3.5 py-2.5 text-sm bg-neutral-50/50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900 focus:bg-white transition-colors"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 px-6 text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-400 rounded-xl transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Processing Clinical Intake...</span>
              </>
            ) : (
              <span>Request a Growth Consultation</span>
            )}
          </button>
          <div className="flex items-center justify-center gap-4 text-[11px] text-neutral-500 mt-3">
            <span>Direct Strategy Review</span>
            <span>·</span>
            <span>Strict Healthcare Confidentiality</span>
            <span>·</span>
            <span>Siliguri &amp; Pan-India</span>
          </div>
        </div>
      </div>
    </form>
  );
};

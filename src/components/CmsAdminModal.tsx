import React, { useState } from 'react';
import { useCms } from '../cms/cmsStore';
import { CmsContent } from '../cms/types';

export const CmsAdminModal: React.FC = () => {
  const {
    content,
    updateContent,
    resetToDefaults,
    exportJson,
    importJson,
    submissions,
    updateSubmissionStatus,
    webhookUrl,
    setWebhookUrl,
    isAdminOpen,
    setIsAdminOpen,
  } = useCms();

  const [activeTab, setActiveTab] = useState<'hero' | 'problem' | 'system' | 'healthcare' | 'casestudies' | 'leads' | 'settings'>('leads');
  const [formData, setFormData] = useState<CmsContent>(content);
  const [importText, setImportText] = useState('');
  const [saveNotice, setSaveNotice] = useState<string | null>(null);

  if (!isAdminOpen) return null;

  const handleSave = () => {
    updateContent(formData);
    setSaveNotice('All CMS changes published live across the site.');
    setTimeout(() => setSaveNotice(null), 3500);
  };

  const handleReset = () => {
    if (window.confirm('Reset all CMS content to factory defaults?')) {
      resetToDefaults();
      setFormData(content);
      setSaveNotice('Reset to default content.');
      setTimeout(() => setSaveNotice(null), 3000);
    }
  };

  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(exportJson());
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `sda-cms-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImport = () => {
    if (!importText.trim()) return;
    const ok = importJson(importText);
    if (ok) {
      setSaveNotice('Content successfully imported from JSON.');
      setTimeout(() => setSaveNotice(null), 3000);
      setImportText('');
    } else {
      alert('Invalid JSON structure. Please check and retry.');
    }
  };

  const exportLeadsCsv = () => {
    if (submissions.length === 0) return;
    const headers = ['ID', 'Date', 'Name', 'Clinic', 'Phone', 'Email', 'City', 'Category', 'Budget', 'Status', 'Challenge'];
    const rows = submissions.map((s) => [
      s.id,
      s.submittedAt,
      `"${s.name.replace(/"/g, '""')}"`,
      `"${s.businessName.replace(/"/g, '""')}"`,
      s.phone,
      s.email,
      s.city,
      `"${s.businessType}"`,
      `"${s.monthlyBudget}"`,
      s.status,
      `"${s.mainGrowthChallenge.replace(/"/g, '""')}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `sda-consultations-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl border border-neutral-300 w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-emerald-400 text-base">SDA CMS Studio</span>
            <span className="text-neutral-500">|</span>
            <span className="text-xs text-neutral-300">Live Content &amp; Lead Management Engine</span>
          </div>

          <div className="flex items-center gap-3">
            {saveNotice && (
              <span className="text-xs font-semibold text-emerald-300 bg-emerald-950 px-2.5 py-1 rounded">
                ✓ {saveNotice}
              </span>
            )}
            <button
              onClick={() => setIsAdminOpen(false)}
              className="text-neutral-400 hover:text-white p-1 rounded transition-colors text-lg"
              aria-label="Close CMS Studio"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 px-6 py-2 border-b border-neutral-200 bg-neutral-50 text-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'leads' ? 'bg-neutral-900 text-white shadow-sm' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Leads Inbox ({submissions.length})
          </button>
          <button
            onClick={() => setActiveTab('hero')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'hero' ? 'bg-neutral-900 text-white shadow-sm' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Hero &amp; Identity
          </button>
          <button
            onClick={() => setActiveTab('problem')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'problem' ? 'bg-neutral-900 text-white shadow-sm' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            The Problem
          </button>
          <button
            onClick={() => setActiveTab('system')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'system' ? 'bg-neutral-900 text-white shadow-sm' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            6-Stage System
          </button>
          <button
            onClick={() => setActiveTab('healthcare')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'healthcare' ? 'bg-neutral-900 text-white shadow-sm' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Healthcare Segments
          </button>
          <button
            onClick={() => setActiveTab('casestudies')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'casestudies' ? 'bg-neutral-900 text-white shadow-sm' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Case Studies
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'settings' ? 'bg-neutral-900 text-white shadow-sm' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Webhook &amp; Backups
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB: LEADS INBOX */}
          {activeTab === 'leads' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-base font-bold text-neutral-900">Inbound Clinical Consultations</h4>
                  <p className="text-xs text-neutral-500">Live submissions recorded by the contact &amp; consultation intake engine.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={exportLeadsCsv}
                    className="px-3 py-1.5 text-xs font-semibold border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
                  >
                    Export CSV
                  </button>
                </div>
              </div>

              {submissions.length === 0 ? (
                <div className="p-8 text-center text-sm text-neutral-500 border border-dashed rounded-xl">
                  No consultation inquiries received yet. Submit a test inquiry via the Contact form.
                </div>
              ) : (
                <div className="space-y-3">
                  {submissions.map((sub) => (
                    <div key={sub.id} className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 hover:bg-neutral-50 transition-colors space-y-3">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-neutral-900">{sub.name}</span>
                            <span className="text-xs text-neutral-400">·</span>
                            <span className="font-medium text-xs text-neutral-700">{sub.businessName}</span>
                            <span className="text-xs text-neutral-400">({sub.city})</span>
                          </div>
                          <div className="text-xs text-neutral-500 mt-0.5">
                            {sub.businessType} · Budget: {sub.monthlyBudget}
                          </div>
                        </div>

                        {/* Status selector */}
                        <div className="flex items-center gap-2">
                          <select
                            value={sub.status}
                            onChange={(e) => updateSubmissionStatus(sub.id, e.target.value as any)}
                            className="text-xs px-2.5 py-1 rounded border border-neutral-300 bg-white font-medium"
                          >
                            <option value="new">New Inquiry</option>
                            <option value="contacted">Contacted / Scheduled</option>
                            <option value="audit_prepared">Audit Prepared</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-600 pt-2 border-t border-neutral-200/60">
                        <div>
                          <strong>Phone:</strong> {sub.phone} | <strong>Email:</strong> {sub.email}
                        </div>
                        <div>
                          <strong>Channels:</strong> {sub.currentChannels.join(', ') || 'None specified'}
                        </div>
                      </div>

                      {sub.mainGrowthChallenge && (
                        <div className="text-xs bg-white p-2.5 rounded border border-neutral-200 text-neutral-700">
                          <strong>Growth Challenge:</strong> {sub.mainGrowthChallenge}
                        </div>
                      )}

                      <div className="text-[10px] text-neutral-400 flex items-center justify-between">
                        <span>ID: {sub.id}</span>
                        <span>Logged: {new Date(sub.submittedAt).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: HERO & IDENTITY */}
          {activeTab === 'hero' && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-neutral-900">Hero Section Content</h4>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Hero Eyebrow</label>
                <input
                  type="text"
                  value={formData.home.hero.eyebrow}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      home: { ...formData.home, hero: { ...formData.home.hero, eyebrow: e.target.value } },
                    })
                  }
                  className="w-full text-xs p-2.5 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Primary Headline</label>
                <input
                  type="text"
                  value={formData.home.hero.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      home: { ...formData.home, hero: { ...formData.home.hero, title: e.target.value } },
                    })
                  }
                  className="w-full text-sm font-bold p-2.5 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Supporting Copy</label>
                <textarea
                  rows={3}
                  value={formData.home.hero.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      home: { ...formData.home, hero: { ...formData.home.hero, description: e.target.value } },
                    })
                  }
                  className="w-full text-xs p-2.5 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Primary CTA Label</label>
                  <input
                    type="text"
                    value={formData.home.hero.primaryCta}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        home: { ...formData.home, hero: { ...formData.home.hero, primaryCta: e.target.value } },
                      })
                    }
                    className="w-full text-xs p-2.5 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Secondary CTA Label</label>
                  <input
                    type="text"
                    value={formData.home.hero.secondaryCta}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        home: { ...formData.home, hero: { ...formData.home.hero, secondaryCta: e.target.value } },
                      })
                    }
                    className="w-full text-xs p-2.5 border rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB: PROBLEM */}
          {activeTab === 'problem' && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-neutral-900">The Problem (Fragmentation)</h4>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Problem Title</label>
                <input
                  type="text"
                  value={formData.home.problem.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      home: { ...formData.home, problem: { ...formData.home.problem, title: e.target.value } },
                    })
                  }
                  className="w-full text-sm font-bold p-2.5 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Problem Description</label>
                <textarea
                  rows={2}
                  value={formData.home.problem.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      home: { ...formData.home, problem: { ...formData.home.problem, description: e.target.value } },
                    })
                  }
                  className="w-full text-xs p-2.5 border rounded-lg"
                />
              </div>

              <div className="pt-2">
                <label className="block text-xs font-semibold text-neutral-700 mb-2">Fragmented Points</label>
                <div className="space-y-3">
                  {formData.home.problem.fragmentedPoints.map((pt, idx) => (
                    <div key={idx} className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 space-y-2">
                      <input
                        type="text"
                        value={pt.issue}
                        onChange={(e) => {
                          const updated = [...formData.home.problem.fragmentedPoints];
                          updated[idx] = { ...updated[idx], issue: e.target.value };
                          setFormData({ ...formData, home: { ...formData.home, problem: { ...formData.home.problem, fragmentedPoints: updated } } });
                        }}
                        className="w-full text-xs font-semibold p-1.5 border rounded bg-white"
                        placeholder="Issue title"
                      />
                      <textarea
                        rows={2}
                        value={pt.reality}
                        onChange={(e) => {
                          const updated = [...formData.home.problem.fragmentedPoints];
                          updated[idx] = { ...updated[idx], reality: e.target.value };
                          setFormData({ ...formData, home: { ...formData.home, problem: { ...formData.home.problem, fragmentedPoints: updated } } });
                        }}
                        className="w-full text-xs p-1.5 border rounded bg-white"
                        placeholder="Detailed clinical reality"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: SYSTEM */}
          {activeTab === 'system' && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-neutral-900">SDA Patient Growth System™ Stages</h4>
              <p className="text-xs text-neutral-500">Edit the 6 core stages of the operating system.</p>

              <div className="space-y-4">
                {formData.home.system.steps.map((st, idx) => (
                  <div key={st.id} className="p-4 border rounded-xl bg-neutral-50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-emerald-800">STAGE {st.stepNumber}</span>
                      <input
                        type="text"
                        value={st.title}
                        onChange={(e) => {
                          const updated = [...formData.home.system.steps];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          setFormData({ ...formData, home: { ...formData.home, system: { ...formData.home.system, steps: updated } } });
                        }}
                        className="text-xs font-bold p-1 border rounded bg-white"
                      />
                    </div>
                    <input
                      type="text"
                      value={st.subtitle}
                      onChange={(e) => {
                        const updated = [...formData.home.system.steps];
                        updated[idx] = { ...updated[idx], subtitle: e.target.value };
                        setFormData({ ...formData, home: { ...formData.home, system: { ...formData.home.system, steps: updated } } });
                      }}
                      className="w-full text-xs p-1.5 border rounded bg-white"
                      placeholder="Subtitle"
                    />
                    <textarea
                      rows={2}
                      value={st.description}
                      onChange={(e) => {
                        const updated = [...formData.home.system.steps];
                        updated[idx] = { ...updated[idx], description: e.target.value };
                        setFormData({ ...formData, home: { ...formData.home, system: { ...formData.home.system, steps: updated } } });
                      }}
                      className="w-full text-xs p-1.5 border rounded bg-white"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: HEALTHCARE */}
          {activeTab === 'healthcare' && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-neutral-900">Healthcare Specialization Segments</h4>
              <div className="space-y-4">
                {formData.home.healthcare.segments.map((seg, idx) => (
                  <div key={seg.id} className="p-4 border rounded-xl bg-neutral-50 space-y-2">
                    <input
                      type="text"
                      value={seg.title}
                      onChange={(e) => {
                        const updated = [...formData.home.healthcare.segments];
                        updated[idx] = { ...updated[idx], title: e.target.value };
                        setFormData({ ...formData, home: { ...formData.home, healthcare: { ...formData.home.healthcare, segments: updated } } });
                      }}
                      className="w-full text-xs font-bold p-1.5 border rounded bg-white"
                    />
                    <textarea
                      rows={2}
                      value={seg.painPoint}
                      onChange={(e) => {
                        const updated = [...formData.home.healthcare.segments];
                        updated[idx] = { ...updated[idx], painPoint: e.target.value };
                        setFormData({ ...formData, home: { ...formData.home, healthcare: { ...formData.home.healthcare, segments: updated } } });
                      }}
                      className="w-full text-xs p-1.5 border rounded bg-white"
                      placeholder="Specialty pain point"
                    />
                    <textarea
                      rows={2}
                      value={seg.solution}
                      onChange={(e) => {
                        const updated = [...formData.home.healthcare.segments];
                        updated[idx] = { ...updated[idx], solution: e.target.value };
                        setFormData({ ...formData, home: { ...formData.home, healthcare: { ...formData.home.healthcare, segments: updated } } });
                      }}
                      className="w-full text-xs p-1.5 border rounded bg-white"
                      placeholder="SDA Growth Solution"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: CASE STUDIES */}
          {activeTab === 'casestudies' && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-neutral-900">Proof &amp; Case Studies</h4>
              <p className="text-xs text-neutral-500">
                Remember the Steve Jobs &amp; SDA principle: Only publish data-driven proof models. Never invent fake names or fake statistics.
              </p>

              <div className="space-y-4">
                {formData.home.caseStudies.items.map((cs, idx) => (
                  <div key={cs.id} className="p-4 border rounded-xl bg-neutral-50 space-y-2">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={cs.title}
                        onChange={(e) => {
                          const updated = [...formData.home.caseStudies.items];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          setFormData({ ...formData, home: { ...formData.home, caseStudies: { ...formData.home.caseStudies, items: updated } } });
                        }}
                        className="text-xs font-bold p-1.5 border rounded bg-white flex-1 mr-2"
                      />
                      <span className="text-[10px] font-mono bg-neutral-200 px-2 py-0.5 rounded">{cs.status}</span>
                    </div>

                    <textarea
                      rows={2}
                      value={cs.challenge}
                      onChange={(e) => {
                        const updated = [...formData.home.caseStudies.items];
                        updated[idx] = { ...updated[idx], challenge: e.target.value };
                        setFormData({ ...formData, home: { ...formData.home, caseStudies: { ...formData.home.caseStudies, items: updated } } });
                      }}
                      className="w-full text-xs p-1.5 border rounded bg-white"
                      placeholder="Clinical challenge"
                    />

                    <textarea
                      rows={2}
                      value={cs.outcome}
                      onChange={(e) => {
                        const updated = [...formData.home.caseStudies.items];
                        updated[idx] = { ...updated[idx], outcome: e.target.value };
                        setFormData({ ...formData, home: { ...formData.home, caseStudies: { ...formData.home.caseStudies, items: updated } } });
                      }}
                      className="w-full text-xs p-1.5 border rounded bg-white"
                      placeholder="System outcome"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SETTINGS & BACKUPS */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-bold text-neutral-900">Webhook Integration (n8n / CRM / Zapier)</h4>
                <p className="text-xs text-neutral-500 mb-2">
                  When a doctor or clinic submits a consultation request, SDA will POST the payload to this webhook for instant WhatsApp counselor notification.
                </p>
                <input
                  type="text"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="w-full text-xs p-2.5 border rounded-lg font-mono bg-neutral-50"
                  placeholder="https://hooks.zapier.com/..."
                />
              </div>

              <div className="pt-4 border-t border-neutral-200">
                <h4 className="text-sm font-bold text-neutral-900 mb-1">Export / Import Content State</h4>
                <div className="flex gap-3 mb-4">
                  <button
                    onClick={handleExport}
                    className="px-3.5 py-2 text-xs font-semibold bg-neutral-900 text-white rounded-lg hover:bg-neutral-800"
                  >
                    Export Full JSON Backup
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-3.5 py-2 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100"
                  >
                    Reset Content to Defaults
                  </button>
                </div>

                <textarea
                  rows={4}
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  placeholder="Paste exported CMS JSON here to restore or update content..."
                  className="w-full text-xs p-2.5 font-mono border rounded-lg"
                />
                <button
                  onClick={handleImport}
                  disabled={!importText.trim()}
                  className="mt-2 px-4 py-2 text-xs font-semibold bg-neutral-200 hover:bg-neutral-300 disabled:opacity-50 rounded-lg"
                >
                  Import JSON
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between">
          <div className="text-xs text-neutral-500">
            Changes persist in browser storage and reflect immediately on all pages.
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAdminOpen(false)}
              className="px-4 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-900"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 text-xs font-bold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg shadow-sm"
            >
              Publish Live Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

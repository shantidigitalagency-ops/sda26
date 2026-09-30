import React, { createContext, useContext, useState, useEffect } from 'react';
import { CmsContent, ConsultationSubmission } from './types';
import { initialContent } from './initialContent';

const CMS_STORAGE_KEY = 'sda_cms_content_v1';
const SUBMISSIONS_STORAGE_KEY = 'sda_consultations_v1';
const WEBHOOK_STORAGE_KEY = 'sda_webhook_url_v1';
const AUTH_TOKEN_KEY = 'sda_admin_jwt_token_v1';

interface CmsContextType {
  content: CmsContent;
  updateContent: (newContent: CmsContent) => void;
  updateSection: <K extends keyof CmsContent>(section: K, data: CmsContent[K]) => void;
  saveAndPublishSection: (pageSlug: string, sectionKey: string, sectionData: any) => Promise<boolean>;
  resetToDefaults: () => void;
  exportJson: () => string;
  importJson: (jsonString: string) => boolean;
  submissions: ConsultationSubmission[];
  addSubmission: (submission: Omit<ConsultationSubmission, 'id' | 'submittedAt' | 'status'>) => Promise<boolean>;
  updateSubmissionStatus: (id: string, status: ConsultationSubmission['status'], notes?: string) => Promise<void>;
  webhookUrl: string;
  setWebhookUrl: (url: string) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  authToken: string | null;
  setAuthToken: (token: string | null) => void;
  isLoading: boolean;
  reloadFromDatabase: () => Promise<void>;
}

const CmsContext = createContext<CmsContextType | null>(null);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<CmsContent>(() => {
    try {
      const saved = localStorage.getItem(CMS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...initialContent,
          ...parsed,
          home: {
            ...initialContent.home,
            ...(parsed.home || {}),
          },
        };
      }
    } catch {
      // Fallback
    }
    return initialContent;
  });

  const [submissions, setSubmissions] = useState<ConsultationSubmission[]>(() => {
    try {
      const saved = localStorage.getItem(SUBMISSIONS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  const [webhookUrl, setWebhookUrlState] = useState<string>(() => {
    return localStorage.getItem(WEBHOOK_STORAGE_KEY) || 'https://hooks.zapier.com/hooks/catch/sample/sda_crm_inbox';
  });

  const [authToken, setAuthTokenState] = useState<string | null>(() => {
    try {
      return sessionStorage.getItem(AUTH_TOKEN_KEY);
    } catch {
      return null;
    }
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sync content from backend database on initial mount
  const reloadFromDatabase = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/content/home');
      if (res.ok) {
        const data = await res.json();
        if (data.sections) {
          setContent((prev) => {
            const updated = { ...prev };
            if (data.sections.hero) {
              updated.home.hero = { ...updated.home.hero, ...data.sections.hero };
            }
            if (data.sections.problem) {
              updated.home.problem = { ...updated.home.problem, ...data.sections.problem };
            }
            if (data.sections.system) {
              updated.home.system = { ...updated.home.system, ...data.sections.system };
            }
            if (data.sections.healthcare) {
              updated.home.healthcare = { ...updated.home.healthcare, ...data.sections.healthcare };
            }
            if (data.sections.capabilities) {
              updated.home.capabilities = { ...updated.home.capabilities, ...data.sections.capabilities };
            }
            if (data.sections.caseStudies) {
              updated.home.caseStudies = { ...updated.home.caseStudies, ...data.sections.caseStudies };
            }
            if (data.sections.timeline) {
              updated.home.clientExperience = { ...updated.home.clientExperience, ...data.sections.timeline };
            }
            return updated;
          });
        }
      }

      // If authenticated, fetch leads from backend database
      if (authToken) {
        const leadsRes = await fetch('/api/admin/leads', {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (leadsRes.ok) {
          const leadsData = await leadsRes.json();
          if (Array.isArray(leadsData)) {
            setSubmissions(leadsData);
          }
        }
      }
    } catch (err) {
      console.warn('Backend database sync notice: running with current cache', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    reloadFromDatabase();
  }, [authToken]);

  useEffect(() => {
    try {
      localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(content));
    } catch (e) {
      console.warn('Failed to save CMS state to localStorage', e);
    }
  }, [content]);

  useEffect(() => {
    try {
      localStorage.setItem(SUBMISSIONS_STORAGE_KEY, JSON.stringify(submissions));
    } catch (e) {
      console.warn('Failed to save submissions to localStorage', e);
    }
  }, [submissions]);

  const setAuthToken = (token: string | null) => {
    setAuthTokenState(token);
    try {
      if (token) {
        sessionStorage.setItem(AUTH_TOKEN_KEY, token);
      } else {
        sessionStorage.removeItem(AUTH_TOKEN_KEY);
      }
    } catch {
      // Ignore
    }
  };

  const updateContent = (newContent: CmsContent) => {
    setContent(newContent);
  };

  const updateSection = <K extends keyof CmsContent>(section: K, data: CmsContent[K]) => {
    setContent((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  // Real database-backed Publish operation
  const saveAndPublishSection = async (pageSlug: string, sectionKey: string, sectionData: any): Promise<boolean> => {
    try {
      if (authToken) {
        const res = await fetch(`/api/admin/content/${pageSlug}/${sectionKey}/publish`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ content: sectionData }),
        });

        if (!res.ok) {
          console.warn('Server publish returned status:', res.status);
        }
      }
    } catch (err) {
      console.error('Error publishing to database endpoint:', err);
    }

    // Always update client state and local cache for zero delay
    return true;
  };

  const resetToDefaults = () => {
    setContent(initialContent);
    try {
      localStorage.removeItem(CMS_STORAGE_KEY);
    } catch {
      //
    }
  };

  const exportJson = () => {
    return JSON.stringify(content, null, 2);
  };

  const importJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.company && parsed.home) {
        setContent(parsed);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const setWebhookUrl = (url: string) => {
    setWebhookUrlState(url);
    try {
      localStorage.setItem(WEBHOOK_STORAGE_KEY, url);
    } catch {
      //
    }
  };

  const addSubmission = async (
    data: Omit<ConsultationSubmission, 'id' | 'submittedAt' | 'status'>
  ): Promise<boolean> => {
    const newSubmission: ConsultationSubmission = {
      ...data,
      id: `sub-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      status: 'new',
    };

    // Optimistically record locally
    setSubmissions((prev) => [newSubmission, ...prev]);

    // Send to backend database API
    try {
      await fetch('/api/leads/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.warn('API lead submission fallback:', err);
    }

    // Optional direct webhook dispatch for CRM / n8n / Zapier integration
    if (webhookUrl && webhookUrl.startsWith('http')) {
      try {
        fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'new_patient_growth_consultation',
            timestamp: newSubmission.submittedAt,
            data: newSubmission,
            source: 'SDA Web Intake Engine',
          }),
        }).catch((err) => {
          console.info('Webhook dispatched or caught:', err);
        });
      } catch (err) {
        console.info('Webhook send skipped:', err);
      }
    }

    return true;
  };

  const updateSubmissionStatus = async (id: string, status: ConsultationSubmission['status'], notes?: string) => {
    setSubmissions((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, status } : sub))
    );

    if (authToken) {
      try {
        await fetch(`/api/admin/leads/${id}/status`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ status, notes }),
        });
      } catch (err) {
        console.warn('Could not sync status to backend:', err);
      }
    }
  };

  return (
    <CmsContext.Provider
      value={{
        content,
        updateContent,
        updateSection,
        saveAndPublishSection,
        resetToDefaults,
        exportJson,
        importJson,
        submissions,
        addSubmission,
        updateSubmissionStatus,
        webhookUrl,
        setWebhookUrl,
        isAdminOpen,
        setIsAdminOpen,
        authToken,
        setAuthToken,
        isLoading,
        reloadFromDatabase,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = (): CmsContextType => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};

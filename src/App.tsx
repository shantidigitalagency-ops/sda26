/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CmsProvider, useCms } from './cms/cmsStore';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

import { HomePage } from './pages/HomePage';
import { HealthcarePage } from './pages/HealthcarePage';
import { PatientGrowthSystemPage } from './pages/PatientGrowthSystemPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { PerformanceMarketingPage } from './pages/PerformanceMarketingPage';
import { ContentPage } from './pages/ContentPage';
import { CrmAutomationPage } from './pages/CrmAutomationPage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { AdminPage } from './pages/AdminPage';

const AppContent: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const { content } = useCms();

  useEffect(() => {
    // Listen for browser popstate
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync document title dynamically with page context
  useEffect(() => {
    const titles: Record<string, string> = {
      '/': 'Shanti Digital Agency – Patient Growth Systems for Healthcare & Fertility',
      '/healthcare': 'Healthcare & Fertility Growth Systems | Shanti Digital Agency',
      '/patient-growth-system': 'SDA Patient Growth System™ | Six-Stage Operating System',
      '/solutions': 'Solutions & Capabilities | Shanti Digital Agency',
      '/performance-marketing': 'Healthcare Performance Marketing (Google & Meta) | SDA',
      '/content': 'Doctor Authority Videos & Clinical Content | SDA',
      '/crm-automation': 'Healthcare CRM & WhatsApp Automation | SDA',
      '/case-studies': 'Proof Matters – Audited Case Studies & Models | SDA',
      '/about': 'About SDA – The Operating System Philosophy | Siliguri',
      '/contact': 'Request a Healthcare Growth Consultation | SDA',
      '/privacy': 'Privacy Policy | Shanti Digital Agency',
      '/terms': 'Terms of Engagement | Shanti Digital Agency',
      '/admin': 'Admin Panel & CMS Studio | Shanti Digital Agency',
    };

    document.title = titles[currentPath] || 'Shanti Digital Agency – Patient Growth Systems';
  }, [currentPath]);

  // Render view based on route
  const renderPage = () => {
    switch (currentPath) {
      case '/admin':
        return <AdminPage onNavigate={navigate} />;
      case '/healthcare':
        return <HealthcarePage onNavigate={navigate} />;
      case '/patient-growth-system':
        return <PatientGrowthSystemPage onNavigate={navigate} />;
      case '/solutions':
        return <SolutionsPage onNavigate={navigate} />;
      case '/performance-marketing':
        return <PerformanceMarketingPage onNavigate={navigate} />;
      case '/content':
        return <ContentPage onNavigate={navigate} />;
      case '/crm-automation':
        return <CrmAutomationPage onNavigate={navigate} />;
      case '/case-studies':
        return <CaseStudiesPage onNavigate={navigate} />;
      case '/about':
        return <AboutPage onNavigate={navigate} />;
      case '/contact':
        return <ContactPage onNavigate={navigate} />;
      case '/privacy':
        return <PrivacyPage />;
      case '/terms':
        return <TermsPage />;
      case '/':
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  const isAdminRoute = currentPath === '/admin';

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Top Bar Header adhering strictly to Top Bar Contract (hidden on dedicated admin page) */}
      {!isAdminRoute && <Header currentPath={currentPath} onNavigate={navigate} />}

      {/* Main View Area */}
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Quiet, Comprehensive Footer (hidden on dedicated admin page) */}
      {!isAdminRoute && <Footer onNavigate={navigate} />}

      {/* Floating Instant WhatsApp Button on all public pages */}
      {!isAdminRoute && <FloatingWhatsApp />}
    </div>
  );
};

export default function App() {
  return (
    <CmsProvider>
      <AppContent />
    </CmsProvider>
  );
}

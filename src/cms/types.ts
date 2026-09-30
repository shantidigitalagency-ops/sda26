export interface SystemStep {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  tools: string[];
  metrics: string[];
}

export interface HealthcareSegment {
  id: string;
  title: string;
  focus: string;
  painPoint: string;
  solution: string;
  keyMetric: string;
}

export interface CapabilityItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  items: string[];
}

export interface CaseStudyItem {
  id: string;
  title: string;
  clientType: string;
  location: string;
  status: 'verified_model' | 'active_pilot' | 'framework';
  challenge: string;
  strategy: string;
  channels: string[];
  metrics: {
    label: string;
    value: string;
    sublabel?: string;
  }[];
  outcome: string;
  clientQuote?: {
    text: string;
    author: string;
    role: string;
  };
}

export interface TimelineDay {
  day: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface ConsultationSubmission {
  id: string;
  name: string;
  businessName: string;
  phone: string;
  email: string;
  city: string;
  businessType: string;
  website?: string;
  monthlyBudget: string;
  currentChannels: string[];
  mainGrowthChallenge: string;
  submittedAt: string;
  status: 'new' | 'contacted' | 'audit_prepared';
}

export interface CmsContent {
  company: {
    name: string;
    shortName: string;
    tagline: string;
    subtagline: string;
    city: string;
    region: string;
    country: string;
    email: string;
    phone: string;
    whatsapp?: string;
    address: string;
  };
  home: {
    hero: {
      eyebrow: string;
      title: string;
      description: string;
      primaryCta: string;
      secondaryCta: string;
      footnote: string;
    };
    problem: {
      eyebrow: string;
      title: string;
      description: string;
      fragmentedPoints: {
        issue: string;
        reality: string;
      }[];
      closingStatement: string;
    };
    bigIdea: {
      eyebrow: string;
      title: string;
      description: string;
      journeySteps: {
        step: string;
        title: string;
        description: string;
      }[];
    };
    system: {
      eyebrow: string;
      title: string;
      description: string;
      steps: SystemStep[];
    };
    healthcare: {
      eyebrow: string;
      title: string;
      description: string;
      segments: HealthcareSegment[];
    };
    capabilities: {
      eyebrow: string;
      title: string;
      description: string;
      items: CapabilityItem[];
    };
    funnel: {
      eyebrow: string;
      title: string;
      description: string;
      defaultSpend: number;
    };
    caseStudies: {
      eyebrow: string;
      title: string;
      description: string;
      disclaimer: string;
      items: CaseStudyItem[];
    };
    whySda: {
      eyebrow: string;
      title: string;
      description: string;
      principles: {
        number: string;
        title: string;
        description: string;
      }[];
      closing: string;
    };
    clientExperience: {
      eyebrow: string;
      title: string;
      description: string;
      timeline: TimelineDay[];
    };
    cta: {
      eyebrow: string;
      title: string;
      description: string;
      primaryCta: string;
      secondaryCta: string;
    };
  };
}

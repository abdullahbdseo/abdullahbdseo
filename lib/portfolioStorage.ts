'use client';

import { 
  personalInfo as defaultPersonalInfo,
  aboutSection as defaultAboutSection,
  skills as defaultSkills,
  services as defaultServices,
  projectCategories as defaultProjectCategories,
  projects as defaultProjects,
  blogPosts as defaultBlogPosts,
  adminPasscode as defaultPasscode,
  certifications as defaultCertifications,
  pricingPackages as defaultPricingPackages,
  clientGuarantees as defaultClientGuarantees,
  metrics as defaultMetrics,
  experienceItems as defaultExperienceItems,
  educationItems as defaultEducationItems,
  faqItems as defaultFaqItems,
  seoSettings as defaultSeoSettings,
  SiteSeoSettings,
  BlogPostItem,
  CertificationItem,
  PricingPackageItem,
  ClientGuaranteeItem,
  MetricItemData,
  ExperienceItemData,
  EducationItemData,
  FaqItemData
} from '@/data/portfolioData';

const STORAGE_KEY = 'portfolio_admin_data_v1';
const PASSCODE_STORAGE_KEY = 'portfolio_admin_passcode';

export interface PortfolioStoreData {
  adminPasscode?: string;
  personalInfo: typeof defaultPersonalInfo;
  aboutSection: typeof defaultAboutSection;
  skills: typeof defaultSkills;
  services: typeof defaultServices;
  projectCategories: typeof defaultProjectCategories;
  projects: typeof defaultProjects;
  blogPosts: BlogPostItem[];
  certifications: CertificationItem[];
  pricingPackages: PricingPackageItem[];
  clientGuarantees: ClientGuaranteeItem[];
  metrics: MetricItemData[];
  experienceItems: ExperienceItemData[];
  educationItems: EducationItemData[];
  faqItems: FaqItemData[];
  seoSettings: SiteSeoSettings;
}

export function getAdminPasscode(): string {
  if (typeof window === 'undefined') return defaultPasscode || 'abdullah2026';
  return localStorage.getItem(PASSCODE_STORAGE_KEY) || defaultPasscode || 'abdullah2026';
}

export function setAdminPasscode(newPasscode: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(PASSCODE_STORAGE_KEY, newPasscode);
  }
}

export function getDefaultPortfolioData(): PortfolioStoreData {
  return {
    adminPasscode: defaultPasscode || 'abdullah2026',
    personalInfo: { ...defaultPersonalInfo },
    aboutSection: { ...defaultAboutSection },
    skills: [...defaultSkills],
    services: [...defaultServices],
    projectCategories: [...defaultProjectCategories],
    projects: [...defaultProjects],
    blogPosts: [...defaultBlogPosts],
    certifications: [...defaultCertifications],
    pricingPackages: [...defaultPricingPackages],
    clientGuarantees: [...defaultClientGuarantees],
    metrics: [...defaultMetrics],
    experienceItems: [...defaultExperienceItems],
    educationItems: [...defaultEducationItems],
    faqItems: [...defaultFaqItems],
    seoSettings: { ...defaultSeoSettings },
  };
}

export function loadPortfolioData(): PortfolioStoreData {
  if (typeof window === 'undefined') {
    return getDefaultPortfolioData();
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultPortfolioData();
    const parsed = JSON.parse(raw);
    if (parsed.personalInfo) {
      if (parsed.personalInfo.email === 'abdullahsaleh701@gmail.com' || !parsed.personalInfo.email) {
        parsed.personalInfo.email = defaultPersonalInfo.email;
      }
      if (parsed.personalInfo.phone || parsed.personalInfo.phoneRaw) {
        parsed.personalInfo.phone = '';
        parsed.personalInfo.phoneRaw = '';
      }
    }
    return {
      personalInfo: { ...defaultPersonalInfo, ...(parsed.personalInfo || {}) },
      aboutSection: { ...defaultAboutSection, ...(parsed.aboutSection || {}) },
      skills: parsed.skills || defaultSkills,
      services: parsed.services || defaultServices,
      projectCategories: parsed.projectCategories || defaultProjectCategories,
      projects: parsed.projects || defaultProjects,
      blogPosts: (parsed.blogPosts && parsed.blogPosts.length > 0) ? parsed.blogPosts : defaultBlogPosts,
      certifications: parsed.certifications || defaultCertifications,
      pricingPackages: parsed.pricingPackages || defaultPricingPackages,
      clientGuarantees: parsed.clientGuarantees || defaultClientGuarantees,
      metrics: parsed.metrics || defaultMetrics,
      experienceItems: parsed.experienceItems || defaultExperienceItems,
      educationItems: parsed.educationItems || defaultEducationItems,
      faqItems: parsed.faqItems || defaultFaqItems,
      seoSettings: { ...defaultSeoSettings, ...(parsed.seoSettings || {}) },
    };
  } catch (err) {
    console.error('Failed to load portfolio admin data:', err);
    return getDefaultPortfolioData();
  }
}

export function savePortfolioData(data: PortfolioStoreData): boolean {
  if (typeof window === 'undefined') return false;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    // Dispatch a custom event so other components on page update immediately
    window.dispatchEvent(new CustomEvent('portfolioDataUpdated', { detail: data }));

    // Also persist to disk via local server API if running
    fetch('/api/save-portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).catch(() => {
      // Ignored if hosted statically on Netlify
    });

    return true;
  } catch (err) {
    console.error('Failed to save portfolio admin data:', err);
    return false;
  }
}

export function resetPortfolioData(): PortfolioStoreData {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
    const defaults = getDefaultPortfolioData();
    window.dispatchEvent(new CustomEvent('portfolioDataUpdated', { detail: defaults }));
    return defaults;
  }
  return getDefaultPortfolioData();
}

/**
 * Generate TypeScript code for data/portfolioData.ts
 */
export function exportToTypeScript(data: PortfolioStoreData): string {
  return `/**
 * ═══════════════════════════════════════════════════════════════════════════
 *                    PORTFOLIO CENTRAL DATA CONFIGURATION
 * ═══════════════════════════════════════════════════════════════════════════
 * Generated by Admin Panel on ${new Date().toLocaleDateString()}
 */

export const adminPasscode = ${JSON.stringify(data.adminPasscode || 'abdullah2026')};

export const personalInfo = ${JSON.stringify(data.personalInfo, null, 2)};

export const aboutSection = ${JSON.stringify(data.aboutSection, null, 2)};

export const skills = ${JSON.stringify(data.skills, null, 2)};

export const services = ${JSON.stringify(data.services, null, 2)};

export const projectCategories = ${JSON.stringify(data.projectCategories, null, 2)};

export const projects = ${JSON.stringify(data.projects, null, 2)};

export const blogPosts = ${JSON.stringify(data.blogPosts, null, 2)};

export const certifications = ${JSON.stringify(data.certifications || defaultCertifications, null, 2)};

export const pricingPackages = ${JSON.stringify(data.pricingPackages || defaultPricingPackages, null, 2)};

export const clientGuarantees = ${JSON.stringify(data.clientGuarantees || defaultClientGuarantees, null, 2)};

export const metrics = ${JSON.stringify(data.metrics || defaultMetrics, null, 2)};

export const experienceItems = ${JSON.stringify(data.experienceItems || defaultExperienceItems, null, 2)};

export const educationItems = ${JSON.stringify(data.educationItems || defaultEducationItems, null, 2)};

export const faqItems = ${JSON.stringify(data.faqItems || defaultFaqItems, null, 2)};

export const seoSettings = ${JSON.stringify(data.seoSettings || defaultSeoSettings, null, 2)};
`;
}

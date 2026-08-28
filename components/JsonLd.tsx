import React from 'react';
import { personalInfo, seoSettings, services, faqItems } from '@/data/portfolioData';

export default function JsonLd() {
  const baseUrl = seoSettings.canonicalBase || 'https://abdullahbdseo.vercel.app';

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    url: baseUrl,
    name: seoSettings.siteTitle || `${personalInfo.name} | SEO Growth Specialist`,
    description: seoSettings.siteDescription || `${personalInfo.name} is an SEO Growth Specialist helping businesses scale organic rankings.`,
    publisher: {
      '@id': `${baseUrl}/#person`,
    },
    inLanguage: 'en-US',
  };

  const sameAsProfiles = Object.values(seoSettings.socialProfiles || {}).filter(Boolean);

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${baseUrl}/#person`,
    name: personalInfo.name,
    url: baseUrl,
    image: `${baseUrl}${personalInfo.photo}`,
    jobTitle: personalInfo.title,
    description: personalInfo.heroBio,
    sameAs: sameAsProfiles.length > 0 ? sameAsProfiles : [
      'https://github.com/abdullahbdseo',
      'https://www.linkedin.com/in/abdullah-saleh'
    ],
    knowsAbout: [
      'Search Engine Optimization (SEO)',
      'Answer Engine Optimization (AEO)',
      'Generative Engine Optimization (GEO)',
      'Technical SEO Auditing',
      'Core Web Vitals & Performance',
      'Semantic Schema Entity Graphs',
      'Meta Ads & Paid Acquisition',
      'JavaScript Hydration & Crawl Hygiene'
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dhaka',
      addressCountry: 'BD',
    },
    email: personalInfo.email || 'abdullahbd.seo@gmail.com',
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Northern University of Business & Technology, Khulna',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'HATIL',
      url: 'https://hatil.com',
    },
  };

  const servicesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Services by ${personalInfo.name}`,
    itemListElement: (services || []).map((svc, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Service',
        name: svc.title,
        provider: { '@id': `${baseUrl}/#person` },
        areaServed: 'Worldwide',
        description: svc.desc,
      },
    })),
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (faqItems || []).map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

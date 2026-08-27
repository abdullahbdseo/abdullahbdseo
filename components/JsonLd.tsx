import React from 'react';

export default function JsonLd() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://ahsan-jannat.netlify.app/#website',
    url: 'https://ahsan-jannat.netlify.app',
    name: 'Abdullah | SEO · AEO · GEO Expert',
    description: 'Official portfolio of Abdullah — SEO, AEO & GEO specialist based in Dhaka, Bangladesh.',
    publisher: {
      '@id': 'https://ahsan-jannat.netlify.app/#person',
    },
    inLanguage: 'en-US',
  };

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://ahsan-jannat.netlify.app/#person',
    name: 'Abdullah',
    url: 'https://ahsan-jannat.netlify.app',
    image: 'https://ahsan-jannat.netlify.app/assets/images/abdullah.jpg',
    jobTitle: 'SEO, AEO & GEO Expert',
    description: 'Bangladesh-based SEO, AEO & GEO specialist helping brands rank on Google, appear in AI answers, and dominate generative search.',
    knowsAbout: [
      'Search Engine Optimization',
      'Answer Engine Optimization',
      'Generative Engine Optimization',
      'Technical SEO',
      'Security-Aware SEO',
      'Meta Ads',
      'IT Support',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dhaka',
      addressCountry: 'BD',
    },
    email: 'abdullahsaleh701@gmail.com',
    telephone: '+8801670769816',
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
    name: 'Services by Abdullah',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'Service',
          name: 'Search Engine Optimization (SEO)',
          provider: { '@id': 'https://ahsan-jannat.netlify.app/#person' },
          areaServed: 'Worldwide',
          description: 'On-page, off-page and technical SEO to achieve page-1 rankings on Google.',
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'Service',
          name: 'Answer Engine Optimization (AEO)',
          provider: { '@id': 'https://ahsan-jannat.netlify.app/#person' },
          areaServed: 'Worldwide',
          description: 'Optimizing content to appear in featured snippets, PAA boxes, and AI Overviews.',
        },
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          '@type': 'Service',
          name: 'Generative Engine Optimization (GEO)',
          provider: { '@id': 'https://ahsan-jannat.netlify.app/#person' },
          areaServed: 'Worldwide',
          description: 'Building brand visibility in ChatGPT, Gemini, and Perplexity outputs.',
        },
      },
      {
        '@type': 'ListItem',
        position: 4,
        item: {
          '@type': 'Service',
          name: 'Technical SEO Audit',
          provider: { '@id': 'https://ahsan-jannat.netlify.app/#person' },
          areaServed: 'Worldwide',
          description: 'Deep technical audits covering Core Web Vitals, schema, crawlability and indexation.',
        },
      },
      {
        '@type': 'ListItem',
        position: 5,
        item: {
          '@type': 'Service',
          name: 'Meta Ads (Facebook & Instagram Advertising)',
          provider: { '@id': 'https://ahsan-jannat.netlify.app/#person' },
          areaServed: 'Worldwide',
          description: 'Facebook and Instagram paid ad campaigns — audience targeting, creative strategy, ROAS optimisation and retargeting.',
        },
      },
      {
        '@type': 'ListItem',
        position: 6,
        item: {
          '@type': 'Service',
          name: 'Security-Aware SEO',
          provider: { '@id': 'https://ahsan-jannat.netlify.app/#person' },
          areaServed: 'Worldwide',
          description: 'Basic security checks and SSL/malware screening as part of an SEO engagement, to protect search rankings.',
        },
      },
      {
        '@type': 'ListItem',
        position: 7,
        item: {
          '@type': 'Service',
          name: 'IT Support & Systems',
          provider: { '@id': 'https://ahsan-jannat.netlify.app/#person' },
          areaServed: 'Worldwide',
          description: 'Network management, system administration and IT support.',
        },
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What does Abdullah do?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Abdullah is a Bangladesh-based SEO, AEO & GEO specialist and Meta Ads consultant, currently working as Officer of Digital Marketing at HATIL. He helps businesses rank on Google, get featured in AI-generated answers (ChatGPT, Gemini, Perplexity), and grow through paid social.',
        },
      },
      {
        '@type': 'Question',
        name: "What's the difference between SEO, AEO, and GEO?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SEO (Search Engine Optimization) targets traditional Google rankings. AEO (Answer Engine Optimization) targets featured snippets, People Also Ask boxes, and voice search results. GEO (Generative Engine Optimization) targets being cited as a source inside AI-generated answers from tools like ChatGPT and Gemini.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are the results shown on this site real?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes — every number in the case studies is pulled directly from Google Search Console, GA4, or Meta Ads Manager dashboards. No estimates, no projections, no fabricated testimonials.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Abdullah available for new projects?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes — currently open to freelance SEO, AEO/GEO, and Meta Ads projects alongside full-time work. The fastest way to start is the contact page or WhatsApp.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I get a free SEO audit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes — the free audit tool checks Performance, Core Web Vitals, and SEO score for any website instantly, powered by Google PageSpeed Insights. No signup required.',
        },
      },
    ],
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

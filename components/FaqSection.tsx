'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, Plus, Minus } from 'lucide-react';

interface FaqItem {
  q: string;
  a: React.ReactNode;
}

const FAQS: FaqItem[] = [
  {
    q: 'What does Abdullah do?',
    a: (
      <p>
        Abdullah is a Bangladesh-based SEO, AEO & GEO specialist and Meta Ads consultant, currently working as Officer of Digital Marketing at HATIL. He helps businesses rank on Google, get featured in AI-generated answers (ChatGPT, Gemini, Perplexity), and grow through paid social.
      </p>
    ),
  },
  {
    q: "What's the difference between SEO, AEO, and GEO?",
    a: (
      <p>
        SEO (Search Engine Optimization) targets traditional Google rankings. AEO (Answer Engine Optimization) targets featured snippets, People Also Ask boxes, and voice search results. GEO (Generative Engine Optimization) targets being cited as a source inside AI-generated answers from tools like ChatGPT and Gemini.{' '}
        <Link href="/#blog" className="text-sage font-semibold hover:underline">
          Read full breakdown
        </Link>.
      </p>
    ),
  },
  {
    q: 'Are the results shown on this site real?',
    a: (
      <p>
        Yes — every number in the{' '}
        <Link href="/#cases" className="text-sage font-semibold hover:underline">
          case studies
        </Link>{' '}
        is pulled directly from Google Search Console, GA4, or Meta Ads Manager dashboards. No estimates, no projections, no fabricated testimonials.
      </p>
    ),
  },
  {
    q: 'Is Abdullah available for new projects?',
    a: (
      <p>
        Yes — currently open to freelance SEO, AEO/GEO, and Meta Ads projects alongside full-time work. The fastest way to start is the{' '}
        <Link href="/#contact" className="text-sage font-semibold hover:underline">
          contact page
        </Link>{' '}
        or WhatsApp.
      </p>
    ),
  },
  {
    q: 'Can I get a free SEO audit?',
    a: (
      <p>
        Yes — the{' '}
        <Link href="/free-audit" className="text-sage font-semibold hover:underline">
          free audit tool
        </Link>{' '}
        checks Performance, Core Web Vitals, and SEO score for any website instantly, powered by Google PageSpeed Insights. No signup required.
      </p>
    ),
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-surface">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sage/10 text-sage border border-sage/20 mb-3">
            <HelpCircle className="w-3.5 h-3.5" /> Quick Answers
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-ink leading-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className="rounded-2xl bg-card border border-border overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-display font-semibold text-base sm:text-lg text-ink hover:text-sage transition-colors"
                >
                  <span>{item.q}</span>
                  <span className="w-8 h-8 rounded-full bg-cardSubtle flex items-center justify-center shrink-0 text-muted">
                    {isOpen ? <Minus className="w-4 h-4 text-sage" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-muted leading-relaxed border-t border-border/60 pt-4 animate-in fade-in duration-150">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, Plus, Minus } from 'lucide-react';
import { usePortfolio } from '@/lib/usePortfolio';
import { faqItems as defaultFaqs } from '@/data/portfolioData';

export default function FaqSection() {
  const { faqItems } = usePortfolio();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const list = faqItems && faqItems.length > 0 ? faqItems : defaultFaqs;

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
          {list.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className="rounded-2xl bg-card border border-border overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-6 text-left flex items-center justify-between gap-3 sm:gap-4 font-display font-semibold text-sm sm:text-lg text-ink hover:text-sage transition-colors"
                >
                  <span className="leading-snug">{item.q}</span>
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-cardSubtle flex items-center justify-center shrink-0 text-muted">
                    {isOpen ? <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sage" /> : <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-6 sm:pb-6 text-xs sm:text-sm text-muted leading-relaxed border-t border-border/60 pt-3 sm:pt-4 animate-in fade-in duration-150">
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

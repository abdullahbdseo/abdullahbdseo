'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

interface Props {
  faqs: FaqItem[];
}

export default function ArticleFaqAccordion({ faqs }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
      <div className="flex items-center gap-2 text-sage font-bold text-xs uppercase tracking-wider">
        <HelpCircle className="w-4 h-4" /> Frequently Asked Questions (FAQ Schema Enabled)
      </div>
      <h3 className="text-xl sm:text-2xl font-bold font-display text-ink">
        Key Questions & Strategic Answers
      </h3>

      <div className="space-y-3 pt-2">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="border border-border/80 rounded-2xl overflow-hidden bg-cardSubtle/50 transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-ink hover:text-sage transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={"w-4 h-4 shrink-0 transition-transform duration-200 " + (isOpen ? "rotate-180 text-sage" : "text-muted")}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-muted leading-relaxed border-t border-border/40 pt-3 animate-in fade-in duration-150">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
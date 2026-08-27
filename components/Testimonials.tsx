'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, TrendingUp, Bot, Code, ArrowRight, Award } from 'lucide-react';

const TESTIMONIALS = [
  {
    icon: <ShoppingCart className="w-5 h-5" />,
    stat: '+230% organic traffic in 3 months',
    text: 'Resolved technical SEO issues and rebuilt content architecture from the ground up for an e-commerce brand in Dhaka.',
    tag: 'E-commerce · SEO',
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    stat: '4.2x ROAS in the first month',
    text: "Audience segmentation and a retargeting strategy re-engaged high-intent customers for a fashion brand's Meta Ads account.",
    tag: 'Fashion · Meta Ads',
  },
  {
    icon: <Bot className="w-5 h-5" />,
    stat: 'Featured in AI Overviews & PAA boxes',
    text: 'AEO and GEO optimization positioned a local services company in front of customers at the exact moment they searched.',
    tag: 'Local Services · AEO/GEO',
  },
  {
    icon: <Code className="w-5 h-5" />,
    stat: 'Page-1 rankings restored within weeks',
    text: "A full technical audit uncovered crawl issues, broken schema, and Core Web Vitals failures that were silently limiting a SaaS startup's rankings.",
    tag: 'SaaS · Technical SEO',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sage/10 text-sage border border-sage/20 mb-3">
              <Award className="w-3.5 h-3.5" /> Track Record
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-ink leading-tight">
              Results Across Industries
            </h2>
          </div>

          <Link 
            href="/#cases"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-border bg-card text-ink font-semibold text-xs sm:text-sm hover:border-sage hover:text-sage transition-all shadow-xs"
          >
            View Case Studies <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((item, idx) => (
            <div 
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-card border border-border hover:border-sage/40 shadow-xs hover:shadow-card transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-sage/10 text-sage flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <div className="text-xl font-bold font-display text-ink mb-3 text-sage">
                  {item.stat}
                </div>
                <p className="text-sm text-muted leading-relaxed mb-6">
                  {item.text}
                </p>
              </div>

              <div className="pt-4 border-t border-border/70 text-xs font-semibold text-muted">
                {item.tag}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

'use client';

import React from 'react';
import { Briefcase, GraduationCap, Wrench, Milestone } from 'lucide-react';
import { usePortfolio } from '@/lib/usePortfolio';
import { 
  experienceItems as defaultWorkItems, 
  educationItems as defaultEduItems 
} from '@/data/portfolioData';

const TOOLS = [
  'Google Search Console',
  'Ahrefs',
  'SEMrush',
  'Screaming Frog',
  'ChatGPT / Gemini',
  'Perplexity',
  'PageSpeed Insights',
];

export default function Experience() {
  const { experienceItems, educationItems } = usePortfolio();

  const workList = experienceItems && experienceItems.length > 0 ? experienceItems : defaultWorkItems;
  const eduList = educationItems && educationItems.length > 0 ? educationItems : defaultEduItems;

  return (
    <section id="experience" className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sage/10 text-sage border border-sage/20 mb-3">
            <Milestone className="w-3.5 h-3.5" /> My Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-ink leading-tight">
            Experience & Education
          </h2>
        </div>

        {/* Dual Column Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Work Experience */}
          <div className="space-y-6">
            <div className="flex items-center gap-2.5 text-lg font-bold font-display text-ink pb-2 border-b border-border">
              <Briefcase className="w-5 h-5 text-sage" /> Work Experience
            </div>

            <div className="relative pl-6 space-y-8 border-l-2 border-border/80">
              {workList.map((item, idx) => (
                <div key={item.id || idx} className="relative group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-card border-2 border-sage group-hover:bg-sage transition-colors" />

                  <span className="text-xs font-bold text-sage uppercase tracking-wider block mb-1">
                    {item.date}
                  </span>
                  <h3 className="text-base font-bold font-display text-ink">
                    {item.role}
                  </h3>
                  <div className="text-xs font-medium text-muted mb-2">
                    {item.org}
                  </div>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Tools */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 text-lg font-bold font-display text-ink pb-2 border-b border-border">
                <GraduationCap className="w-5 h-5 text-sage" /> Education
              </div>

              <div className="relative pl-6 space-y-8 border-l-2 border-border/80">
                {eduList.map((item, idx) => (
                  <div key={item.id || idx} className="relative group">
                    <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-card border-2 border-sage group-hover:bg-sage transition-colors" />

                    <span className="text-xs font-bold text-sage uppercase tracking-wider block mb-1">
                      {item.date}
                    </span>
                    <h3 className="text-base font-bold font-display text-ink">
                      {item.role}
                    </h3>
                    <div className="text-xs font-medium text-muted mb-2">
                      {item.org}
                    </div>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools & Platforms */}
            <div className="p-6 rounded-2xl bg-card border border-border shadow-xs">
              <div className="flex items-center gap-2 text-sm font-bold font-display text-ink mb-4">
                <Wrench className="w-4 h-4 text-sage" /> Tools & Platforms I Use Daily
              </div>
              <div className="flex flex-wrap gap-2">
                {TOOLS.map((tool, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-cardSubtle border border-border/70 text-xs font-medium text-ink hover:border-sage hover:text-sage transition-colors"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

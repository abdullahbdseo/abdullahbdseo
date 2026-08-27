'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  ArrowRight, 
  ShoppingCart, 
  Infinity as InfinityIcon, 
  Bot, 
  Code2, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
const caseStudies: any[] = [];

function renderCaseIcon(type: string) {
  switch (type) {
    case 'cart':
      return <ShoppingCart className="w-5 h-5" />;
    case 'meta':
      return <InfinityIcon className="w-5 h-5" />;
    case 'bot':
      return <Bot className="w-5 h-5" />;
    case 'code':
      return <Code2 className="w-5 h-5" />;
    default:
      return <TrendingUp className="w-5 h-5" />;
  }
}

export default function CaseStudies() {
  const [currentPage, setCurrentPage] = useState(0);
  // Default to Card 2 (Fashion Meta Ads) highlighted with green border, exactly as in the reference screenshot
  const [activeCardId, setActiveCardId] = useState<number>(2);

  // Exactly 2 cards per page as in the reference screenshot
  const CARDS_PER_PAGE = 2;
  const totalPages = Math.ceil(caseStudies.length / CARDS_PER_PAGE);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const currentCases = caseStudies.slice(
    currentPage * CARDS_PER_PAGE,
    currentPage * CARDS_PER_PAGE + CARDS_PER_PAGE
  );

  return (
    <section id="cases" className="py-24 bg-cardSubtle/30 border-y border-border/70 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            {/* Outlined Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wider text-sage bg-sage-pal border border-sage/30 uppercase mb-4 shadow-2xs transition-colors duration-500">
              <TrendingUp className="w-3.5 h-3.5" /> Track Record
            </div>

            {/* Main Heading (Large DM Serif Display) */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-ink tracking-tight leading-[1.15] transition-colors duration-500">
              Results Across Industries
            </h2>
          </div>

          {/* View Case Studies Rounded Button (Matches Screenshot) */}
          <div className="shrink-0">
            <Link 
              href="/#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-card text-ink font-semibold text-xs sm:text-sm hover:border-sage hover:text-sage transition-all shadow-xs hover:shadow-sm"
            >
              View Case Studies <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Exactly 2-Column Cards Grid (Matches Screenshot) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {currentCases.map((cs) => {
            const isActive = cs.id === activeCardId;

            return (
              <div 
                key={cs.id}
                onClick={() => setActiveCardId(cs.id)}
                onMouseEnter={() => setActiveCardId(cs.id)}
                className={`rounded-3xl p-8 sm:p-9 bg-card transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between cursor-pointer ${
                  isActive 
                    ? 'border-2 border-sage shadow-md shadow-sage/10' 
                    : 'border border-border/80 shadow-xs hover:border-sage/50'
                }`}
              >
                <div>
                  {/* Soft Blush Icon Box */}
                  <div className="w-11 h-11 rounded-xl bg-blush-pal text-blush2 flex items-center justify-center mb-6 shadow-2xs border border-blush/20">
                    {renderCaseIcon(cs.iconType)}
                  </div>

                  {/* Metric Headline (Serif font like in screenshot) */}
                  <h3 className="text-xl sm:text-2xl font-serif text-ink font-medium leading-snug mb-3 group-hover:text-sage transition-colors duration-300">
                    {cs.headline}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted leading-relaxed font-normal mb-8">
                    {cs.desc}
                  </p>
                </div>

                {/* Tag / Category */}
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted/70">
                    {cs.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Centered Carousel Pagination Controls (Matches Screenshot) */}
        <div className="flex items-center justify-center gap-3 mt-12">
          {/* Prev Button */}
          <button 
            onClick={handlePrev}
            aria-label="Previous case studies"
            className="w-10 h-10 rounded-full bg-card border border-border text-ink flex items-center justify-center hover:border-sage hover:text-sage transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots Indicator (Active elongated pill + inactive dots) */}
          <div className="flex items-center gap-1.5 px-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentPage === idx 
                    ? 'w-6 h-2 bg-sage' 
                    : 'w-2 h-2 bg-sage/30 hover:bg-sage/50'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button 
            onClick={handleNext}
            aria-label="Next case studies"
            className="w-10 h-10 rounded-full bg-card border border-border text-ink flex items-center justify-center hover:border-sage hover:text-sage transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Mic, 
  Bot, 
  TrendingUp, 
  ShieldCheck, 
  Code2, 
  Server, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Layers,
  FileSearch,
  RefreshCw
} from 'lucide-react';
import { usePortfolio } from '@/lib/usePortfolio';

function renderServiceIcon(type: string) {
  switch (type) {
    case 'google':
      return <span className="font-bold text-lg font-display">G</span>;
    case 'mic':
      return <Mic className="w-5 h-5" />;
    case 'bot':
      return <Bot className="w-5 h-5" />;
    case 'trending':
      return <TrendingUp className="w-5 h-5" />;
    case 'shield':
      return <ShieldCheck className="w-5 h-5" />;
    case 'code':
      return <Code2 className="w-5 h-5" />;
    case 'server':
      return <Server className="w-5 h-5" />;
    case 'audit':
      return <FileSearch className="w-5 h-5" />;
    case 'refresh':
      return <RefreshCw className="w-5 h-5" />;
    default:
      return <Layers className="w-5 h-5" />;
  }
}

export default function Services() {
  const { services } = usePortfolio();
  const [currentPage, setCurrentPage] = useState(0);

  const CARDS_PER_PAGE = 3;
  const totalPages = Math.ceil(services.length / CARDS_PER_PAGE);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const currentServices = services.slice(
    currentPage * CARDS_PER_PAGE,
    currentPage * CARDS_PER_PAGE + CARDS_PER_PAGE
  );

  return (
    <section id="services" className="py-24 bg-cardSubtle/50 border-y border-border transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            {/* Dynamic Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wider text-sage bg-sage-pal border border-sage/30 uppercase mb-4 shadow-2xs transition-colors duration-500">
              <Layers className="w-3.5 h-3.5" /> What I Do Best
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-ink tracking-tight leading-[1.15] transition-colors duration-500">
              Solutions That Drive Real Growth
            </h2>
          </div>

          {/* Action Buttons Header */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Work With Me Button */}
            <Link 
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-card text-ink font-semibold text-sm hover:border-sage hover:text-sage transition-all shadow-xs hover:shadow-sm"
            >
              Work With Me <ArrowRight className="w-4 h-4" />
            </Link>

            {/* All Services Gradient Button */}
            <Link 
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-sage to-blush text-white font-semibold text-sm hover:opacity-90 transition-all shadow-md shadow-sage/20 hover:shadow-sage/30 hover:scale-[1.02]"
            >
              All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {currentServices.map((svc) => {
            if (svc.isFeatured) {
              return (
                <div 
                  key={svc.id}
                  className="relative rounded-[2rem] p-7 sm:p-8 flex flex-col justify-between overflow-hidden shadow-lg transition-all duration-500 hover:-translate-y-1 bg-gradient-to-b from-sage/25 via-sage/15 to-blush/20 border-2 border-sage"
                >
                  <div>
                    {/* Top Icon & Badge */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-card/85 text-sage backdrop-blur-md flex items-center justify-center shadow-xs border border-white/50 dark:border-white/10 transition-colors duration-500">
                        {renderServiceIcon(svc.iconType)}
                      </div>

                      {svc.badge && (
                        <span className="px-3 py-1 rounded-md text-[11px] font-bold tracking-wider text-sage bg-card/90 backdrop-blur-md border border-white/60 dark:border-white/10 uppercase shadow-xs transition-colors duration-500">
                          {svc.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold font-display text-ink mb-3 transition-colors duration-500">
                      {svc.title}
                    </h3>

                    <p className="text-sm text-ink/80 leading-relaxed font-normal mb-8 transition-colors duration-500">
                      {svc.desc}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-4">
                    {svc.tags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="px-3 py-1.5 rounded-full text-xs font-semibold bg-card/80 text-sage border border-sage/30 shadow-2xs transition-colors duration-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <div 
                key={svc.id}
                className="relative rounded-[2rem] p-7 sm:p-8 bg-card border border-border flex flex-col justify-between shadow-sm hover:shadow-cardHover transition-all duration-500 hover:-translate-y-1 group"
              >
                <div>
                  {/* Top Icon */}
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-2xs bg-sage-pal text-sage border border-sage/20 group-hover:bg-sage group-hover:text-white transition-all duration-300">
                    {renderServiceIcon(svc.iconType)}
                  </div>

                  <h3 className="text-xl font-bold font-display text-ink mb-3 group-hover:text-sage transition-colors duration-300">
                    {svc.title}
                  </h3>

                  <p className="text-sm text-muted leading-relaxed font-normal mb-8 transition-colors duration-300">
                    {svc.desc}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-4">
                  {svc.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="px-3 py-1.5 rounded-full text-xs font-semibold bg-sage-pal text-sage border border-sage/20 shadow-2xs group-hover:border-sage/40 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Pagination & Arrows Controls */}
        <div className="flex items-center justify-center gap-3 mt-12">
          {/* Prev Button */}
          <button 
            onClick={handlePrev}
            aria-label="Previous services"
            className="w-10 h-10 rounded-full bg-card border border-border text-ink flex items-center justify-center hover:border-sage hover:text-sage transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5 px-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx)}
                aria-label={`Go to services slide ${idx + 1}`}
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
            aria-label="Next services"
            className="w-10 h-10 rounded-full bg-card border border-border text-ink flex items-center justify-center hover:border-sage hover:text-sage transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}

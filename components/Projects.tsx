'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Folder, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { ProjectCategoryKey } from '@/data/portfolioData';
import { usePortfolio } from '@/lib/usePortfolio';

export default function Projects() {
  const { projects, projectCategories } = usePortfolio();
  const [filter, setFilter] = useState<ProjectCategoryKey>('all');
  const [currentPage, setCurrentPage] = useState(0);

  const CARDS_PER_PAGE = 3;

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter((p) => p.categoryKey === filter);

  const totalPages = Math.ceil(filteredProjects.length / CARDS_PER_PAGE);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const currentProjects = filteredProjects.slice(
    currentPage * CARDS_PER_PAGE,
    currentPage * CARDS_PER_PAGE + CARDS_PER_PAGE
  );

  return (
    <section id="projects" className="py-24 bg-cardSubtle/40 border-y border-border transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badge */}
        <div className="mb-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wider text-sage bg-sage-pal border border-sage/30 uppercase shadow-2xs transition-colors duration-500">
            <Folder className="w-3.5 h-3.5" /> Portfolio
          </span>
        </div>

        {/* Main Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-ink tracking-tight mb-8 transition-colors duration-500">
          Recent Projects
        </h2>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2.5 mb-10">
          {projectCategories.map((cat) => {
            const isActive = filter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setFilter(cat.id);
                  setCurrentPage(0);
                }}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-sage-pal text-sage border-2 border-sage shadow-xs'
                    : 'bg-card border border-border text-muted hover:text-ink hover:border-sage/40'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {currentProjects.map((project) => (
            <div 
              key={project.id}
              className="rounded-[2rem] overflow-hidden bg-card border border-border/80 shadow-sm hover:shadow-cardHover transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between group"
            >
              {/* Image Preview Container */}
              <div className="relative h-56 sm:h-60 w-full bg-cardSubtle overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-2xs">
                  {project.link !== '#' ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-ink text-xs font-bold shadow-lg hover:scale-105 transition-transform"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> View Live Site
                    </a>
                  ) : (
                    <span className="px-4 py-2 rounded-full bg-white/90 text-ink text-xs font-bold shadow-lg">
                      Graphic Presentation
                    </span>
                  )}
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-6">
                <span className="text-[11px] font-bold text-sage uppercase tracking-wider block mb-1.5">
                  {project.categoryLabel}
                </span>
                <h3 className="text-xl font-bold font-display text-ink group-hover:text-sage transition-colors duration-300">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Pagination & Arrows Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-12">
            {/* Prev Button */}
            <button 
              onClick={handlePrev}
              aria-label="Previous projects"
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
                  aria-label={`Go to projects slide ${idx + 1}`}
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
              aria-label="Next projects"
              className="w-10 h-10 rounded-full bg-card border border-border text-ink flex items-center justify-center hover:border-sage hover:text-sage transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

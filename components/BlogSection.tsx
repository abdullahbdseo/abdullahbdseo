'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  PenTool, 
  Calendar, 
  Clock, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight,
  X
} from 'lucide-react';
import { usePortfolio } from '@/lib/usePortfolio';

export default function BlogSection() {
  const { personalInfo, blogPosts } = usePortfolio();
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  const CARDS_PER_PAGE = 3;
  const totalPages = Math.ceil(blogPosts.length / CARDS_PER_PAGE);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const currentPosts = blogPosts.slice(
    currentPage * CARDS_PER_PAGE,
    currentPage * CARDS_PER_PAGE + CARDS_PER_PAGE
  );

  return (
    <section id="blog" className="py-24 bg-cardSubtle/30 border-y border-border/70 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Matches ahsan-jannat.netlify.app) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            {/* Outlined Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wider text-sage bg-sage-pal border border-sage/30 uppercase mb-4 shadow-2xs transition-colors duration-500">
              <PenTool className="w-3.5 h-3.5" /> Latest Insights
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-ink tracking-tight leading-[1.15] transition-colors duration-500">
              SEO & Digital Growth Reads
            </h2>
          </div>

          {/* View All Posts Button (Links to /blog) */}
          <div className="shrink-0">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-card text-ink font-semibold text-sm hover:border-sage hover:text-sage transition-all shadow-xs hover:shadow-sm"
            >
              View All Posts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 3-Column Blog Cards Grid (Matches ahsan-jannat.netlify.app) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {currentPosts.map((post) => (
            <div 
              key={post.id}
              className="rounded-3xl overflow-hidden bg-card border border-border/80 shadow-sm hover:shadow-cardHover transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between group cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div>
                {/* 16:9 Thumbnail with Zoom on Hover */}
                <div className="relative aspect-video w-full overflow-hidden bg-cardSubtle">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Floating Category Pill */}
                  <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-card/95 text-ink border border-border/60 shadow-sm backdrop-blur-xs">
                    {post.category}
                  </span>
                </div>

                <div className="p-7 sm:p-8">
                  {/* Date & Read Time */}
                  <div className="flex items-center gap-4 text-xs text-muted font-medium mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-sage" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-sage" /> {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold font-display text-ink mb-3 group-hover:text-sage transition-colors duration-300 leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Description Excerpt */}
                  <p className="text-sm text-muted leading-relaxed font-normal line-clamp-3">
                    {post.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Read Article Link */}
              <div className="px-7 sm:px-8 pb-7 pt-0">
                <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-sage group-hover:gap-3 transition-all duration-300">
                  Read Article <ArrowRight className="w-4 h-4" />
                </span>
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
              aria-label="Previous articles"
              className="w-10 h-10 rounded-full bg-card border border-border text-ink flex items-center justify-center hover:border-sage hover:text-sage transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Pagination Indicators */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
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
              aria-label="Next articles"
              className="w-10 h-10 rounded-full bg-card border border-border text-ink flex items-center justify-center hover:border-sage hover:text-sage transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

      </div>

      {/* ═══════════════════════════════════
           ARTICLE READING MODAL / POPUP
      ═══════════════════════════════════ */}
      {selectedPost && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
          onClick={() => setSelectedPost(null)}
        >
          <div 
            className="bg-card border border-border rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 text-white hover:bg-black/80 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Image */}
            <div className="relative aspect-video w-full overflow-hidden bg-cardSubtle">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-card/95 text-ink border border-border shadow-md backdrop-blur-xs">
                {selectedPost.category}
              </span>
            </div>

            {/* Article Content Area */}
            <div className="p-6 sm:p-10 space-y-6">
              
              {/* Meta Row */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted font-medium border-b border-border pb-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-sage" /> {selectedPost.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-sage" /> {selectedPost.readTime}
                </span>
                <span>•</span>
                <span className="text-sage font-semibold">By {personalInfo.name}</span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-bold font-display text-ink leading-tight">
                {selectedPost.title}
              </h1>

              {/* Author Badge */}
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-cardSubtle border border-border/60">
                <div className="w-10 h-10 rounded-full bg-sage text-white font-bold text-sm flex items-center justify-center shadow-xs">
                  {personalInfo.monogram}
                </div>
                <div>
                  <div className="text-xs font-bold text-ink">{personalInfo.name}</div>
                  <div className="text-[11px] text-muted">{personalInfo.title}</div>
                </div>
              </div>

              {/* Body Text */}
              <div className="text-sm sm:text-base text-ink/90 leading-relaxed font-normal space-y-4 pt-2">
                <p className="font-medium text-ink leading-relaxed">
                  {selectedPost.desc}
                </p>
                {selectedPost.content ? (
                  <div className="whitespace-pre-line text-muted leading-relaxed pt-2">
                    {selectedPost.content}
                  </div>
                ) : (
                  <div className="space-y-4 text-muted leading-relaxed text-sm pt-2">
                    <p>
                      In modern organic search, staying ahead requires understanding how algorithms and AI answer engines interpret authority and relevance. By aligning on-page content architecture with technical crawl efficiency, brands can secure placements in traditional SERP features as well as generative answer boxes.
                    </p>
                    <p>
                      Key takeaways from this strategy:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Optimize for user intent and direct answers rather than keyword stuffing.</li>
                      <li>Implement structured schema markup (Article, FAQ, HowTo) to maximize snippet visibility.</li>
                      <li>Maintain optimal Core Web Vitals (LCP &lt; 2.5s, CLS &lt; 0.1) to protect search crawl budgets.</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Bottom CTA */}
              <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-border text-xs font-semibold text-muted hover:text-ink hover:bg-cardSubtle transition-colors cursor-pointer"
                >
                  ← Close
                </button>
                <Link
                  href="/free-audit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-sage text-white text-xs font-bold hover:opacity-90 transition-opacity text-center shadow-xs"
                >
                  Get a Free SEO Audit →
                </Link>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}

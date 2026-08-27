'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search, 
  ArrowRight, 
  BookOpen, 
  Layers, 
  Repeat, 
  PenTool, 
  Star, 
  Calendar, 
  Clock, 
  Cpu, 
  Bot, 
  TrendingUp, 
  MapPin, 
  Sparkles,
  CheckCircle2,
  ChevronRight,
  X
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import { blogTopics } from '@/data/portfolioData';
import { usePortfolio } from '@/lib/usePortfolio';

export default function BlogPage() {
  const { personalInfo, blogPosts } = usePortfolio();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  // Filter posts based on active category and search keyword
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = 
        activeFilter === 'all' || 
        post.topicGroup.toLowerCase() === activeFilter.toLowerCase() ||
        post.category.toLowerCase().includes(activeFilter.toLowerCase());

      const query = searchQuery.toLowerCase().trim();
      const matchesQuery = 
        !query || 
        post.title.toLowerCase().includes(query) ||
        post.desc.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, activeFilter, blogPosts]);

  const handlePopularSearch = (term: string) => {
    setSearchQuery(term);
    // Scroll smoothly to post grid
    const el = document.getElementById('postGrid');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-surface text-ink transition-colors duration-500">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-muted mb-8 font-medium">
            <Link href="/" className="hover:text-sage transition-colors">Home</Link>
            <span>/</span>
            <span className="text-ink">Blog</span>
          </nav>

          {/* ═══════════════════════════════════
               HERO SECTION (bhv2)
          ═══════════════════════════════════ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
            
            {/* Left Column: Heading & Search */}
            <div className="lg:col-span-7">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wider text-sage bg-sage-pal border border-sage/30 uppercase mb-4 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5" /> Knowledge Hub
              </div>

              {/* Title with Sage Span */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display text-ink tracking-tight leading-[1.15] mb-4">
                SEO, AEO & GEO <br className="hidden sm:inline" />
                <span className="text-sage block sm:inline">Insights That Drive Growth</span>
              </h1>

              <p className="text-base sm:text-lg text-muted leading-relaxed max-w-xl mb-8">
                Actionable guides, deep dives, and real frameworks on SEO, AEO, GEO & AI Search to help your brand rank higher and capture demand.
              </p>

              {/* Interactive Search Bar */}
              <div className="relative flex items-center bg-card border-1.5 border-border rounded-2xl p-2 sm:p-2.5 shadow-sm max-w-xl focus-within:border-sage transition-colors">
                <Search className="w-5 h-5 text-muted ml-3 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search any topic, guide or keyword..."
                  className="w-full bg-transparent border-0 px-3 py-2 text-sm text-ink outline-none placeholder:text-muted/60 font-sans"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-muted hover:text-ink px-2 font-semibold"
                  >
                    Clear
                  </button>
                )}
                <button
                  type="button"
                  aria-label="Search"
                  className="w-10 h-10 rounded-xl bg-sage text-white flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity shadow-xs"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Popular Searches */}
              <div className="flex flex-wrap items-center gap-2 mt-4 text-xs text-muted">
                <span className="font-medium">Popular:</span>
                {['Core Web Vitals', 'GEO', 'AI Search', 'Schema', 'Technical SEO'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handlePopularSearch(tag)}
                    className="px-3 py-1 rounded-full bg-card border border-border text-ink text-xs hover:border-sage hover:text-sage hover:bg-sage-pal transition-all cursor-pointer shadow-2xs"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Stat Cards (2x2 Grid) */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3.5 sm:gap-4">
              <div className="bg-card border border-border/80 rounded-2xl p-5 text-center flex flex-col items-center justify-center shadow-xs">
                <div className="w-10 h-10 rounded-full bg-sage-pal text-sage flex items-center justify-center mb-2.5">
                  <BookOpen className="w-5 h-5" />
                </div>
                <strong className="text-2xl sm:text-3xl font-display font-bold text-ink">25+</strong>
                <span className="text-xs text-muted font-medium mt-1">Articles Published</span>
              </div>

              <div className="bg-card border border-border/80 rounded-2xl p-5 text-center flex flex-col items-center justify-center shadow-xs">
                <div className="w-10 h-10 rounded-full bg-sage-pal text-sage flex items-center justify-center mb-2.5">
                  <Layers className="w-5 h-5" />
                </div>
                <strong className="text-2xl sm:text-3xl font-display font-bold text-ink">6</strong>
                <span className="text-xs text-muted font-medium mt-1">Topics Covered</span>
              </div>

              <div className="bg-card border border-border/80 rounded-2xl p-5 text-center flex flex-col items-center justify-center shadow-xs">
                <div className="w-10 h-10 rounded-full bg-sage-pal text-sage flex items-center justify-center mb-2.5">
                  <Repeat className="w-5 h-5" />
                </div>
                <strong className="text-2xl sm:text-3xl font-display font-bold text-ink">Weekly</strong>
                <span className="text-xs text-muted font-medium mt-1">New Publishing</span>
              </div>

              <div className="bg-card border border-border/80 rounded-2xl p-5 text-center flex flex-col items-center justify-center shadow-xs">
                <div className="w-10 h-10 rounded-full bg-sage-pal text-sage flex items-center justify-center mb-2.5">
                  <PenTool className="w-5 h-5" />
                </div>
                <strong className="text-2xl sm:text-3xl font-display font-bold text-ink">3+</strong>
                <span className="text-xs text-muted font-medium mt-1">Years Writing</span>
              </div>
            </div>

          </div>

          {/* ═══════════════════════════════════
               FEATURED THIS WEEK (Grid)
          ═══════════════════════════════════ */}
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ink/80">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> Featured This Week
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Big Featured Card (Left, Spans 7 Cols) */}
              <div 
                onClick={() => blogPosts[0] && setSelectedPost(blogPosts[0])}
                className="lg:col-span-7 rounded-3xl overflow-hidden bg-[#18231c] text-white p-7 sm:p-9 flex flex-col justify-between shadow-lg relative border border-sage/20 group cursor-pointer"
              >
                <div>
                  {/* Badges */}
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-blush2 text-white">
                      Featured
                    </span>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-sage/30 text-emerald-300 border border-emerald-400/30">
                      {blogPosts[0]?.category || 'SEO'}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mb-4 leading-snug group-hover:text-emerald-300 transition-colors">
                    {blogPosts[0]?.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed font-normal mb-8 max-w-xl">
                    {blogPosts[0]?.desc}
                  </p>
                </div>

                <div>
                  {/* Author Meta */}
                  <div className="flex items-center justify-between gap-4 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-sage text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {personalInfo.monogram}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{personalInfo.name}</div>
                        <div className="text-[10px] text-white/60">{personalInfo.title}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-white/60">
                      <span className="hidden sm:inline">{blogPosts[0]?.date}</span>
                      <span>•</span>
                      <span>{blogPosts[0]?.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stack of 2 Smaller Featured Cards (Right, Spans 5 Cols) */}
              <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
                {blogPosts.slice(1, 3).map((post) => (
                  <div 
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className="rounded-3xl p-6 sm:p-7 bg-card border border-border/80 shadow-sm hover:shadow-cardHover transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sage-pal text-sage border border-sage/20">
                          {post.category}
                        </span>
                        <span className="text-xs text-muted">•</span>
                        <span className="text-xs text-muted font-medium">{post.readTime}</span>
                      </div>

                      <h3 className="text-lg font-bold font-display text-ink mb-2 group-hover:text-sage transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-muted leading-relaxed font-normal line-clamp-2 mb-4">
                        {post.desc}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted pt-3 border-t border-border/40">
                      <span>{post.date}</span>
                      <span className="font-semibold text-sage flex items-center gap-1 group-hover:gap-1.5 transition-all">
                        Read Guide <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* ═══════════════════════════════════
               TOPIC PILLS GRID
          ═══════════════════════════════════ */}
          <div className="mb-14">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { name: 'SEO', icon: Search, count: '8 Articles', filter: 'SEO' },
                { name: 'AEO & GEO', icon: Bot, count: '6 Articles', filter: 'AEO & GEO' },
                { name: 'Technical SEO', icon: Cpu, count: '5 Articles', filter: 'Technical SEO' },
                { name: 'Meta Ads', icon: TrendingUp, count: '4 Articles', filter: 'Meta Ads' },
                { name: 'Local SEO', icon: MapPin, count: '3 Articles', filter: 'Local SEO' },
                { name: 'AI Search', icon: Sparkles, count: '2 Articles', filter: 'AI Search' },
              ].map((topic) => {
                const IconComponent = topic.icon;
                const isSelected = activeFilter.toLowerCase() === topic.filter.toLowerCase();

                return (
                  <button
                    key={topic.name}
                    onClick={() => setActiveFilter(isSelected ? 'all' : topic.filter)}
                    className={`p-4 rounded-2xl border text-center transition-all duration-300 flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                      isSelected 
                        ? 'border-sage bg-sage-pal shadow-sm scale-105' 
                        : 'border-border bg-card hover:border-sage/40 hover:-translate-y-1'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-sage-pal text-sage flex items-center justify-center mb-1">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <strong className="text-xs font-bold text-ink">{topic.name}</strong>
                    <span className="text-[10px] text-muted">{topic.count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ═══════════════════════════════════
               ALL ARTICLES HEADER & TABS
          ═══════════════════════════════════ */}
          <div id="postGrid" className="mb-8 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-ink">
                All Articles {searchQuery && <span className="text-base font-normal text-muted">for &ldquo;{searchQuery}&rdquo;</span>}
              </h2>
              <span className="text-xs text-muted font-medium">
                Showing {filteredPosts.length} of {blogPosts.length} articles
              </span>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {blogTopics.map((t) => (
                <button
                  key={t.filter}
                  onClick={() => setActiveFilter(t.filter)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeFilter.toLowerCase() === t.filter.toLowerCase()
                      ? 'bg-sage text-white shadow-xs'
                      : 'bg-card border border-border text-ink hover:border-sage hover:text-sage'
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* ═══════════════════════════════════
               POST CARDS GRID (pc)
          ═══════════════════════════════════ */}
          {filteredPosts.length === 0 ? (
            <div className="py-20 text-center bg-card border border-border rounded-3xl p-8">
              <BookOpen className="w-10 h-10 text-muted mx-auto mb-3" />
              <h3 className="text-lg font-bold text-ink mb-1">No articles found</h3>
              <p className="text-sm text-muted mb-4">Try adjusting your search keyword or selected category filter.</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}
                className="px-5 py-2 rounded-xl bg-sage text-white text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {filteredPosts.map((post) => (
                <div 
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="rounded-3xl overflow-hidden bg-card border border-border/80 shadow-sm hover:shadow-cardHover transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    {/* 16:9 Thumbnail */}
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
                      {/* Meta */}
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

                  {/* Read Article Link */}
                  <div className="px-7 sm:px-8 pb-7 pt-0">
                    <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-sage group-hover:gap-3 transition-all duration-300">
                      Read Article <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ═══════════════════════════════════
               FREE AUDIT CALLOUT BANNER
          ═══════════════════════════════════ */}
          <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-card to-cardSubtle border border-sage/30 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider text-sage bg-sage-pal border border-sage/20 uppercase mb-3">
                <CheckCircle2 className="w-3.5 h-3.5" /> Growth Acceleration
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-ink mb-2">
                Want to know where your site ranks on Google and AI answers?
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Run our instant free SEO audit tool to discover technical crawl errors, AEO readiness, and quick ranking wins.
              </p>
            </div>
            <Link
              href="/free-audit"
              className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-sage text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-sm"
            >
              Run Free SEO Audit <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </main>

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
                  ← Back to Articles
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

      <Footer />
      <WhatsAppWidget />
    </div>
  );
}

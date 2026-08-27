'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { personalInfo } from '@/data/portfolioData';
import { useTheme, StyleTheme } from '@/context/ThemeContext';
import { 
  ChevronDown, 
  Moon, 
  Sun, 
  Palette, 
  Menu, 
  X, 
  ArrowRight, 
  Search, 
  Mic, 
  Bot, 
  Code, 
  ShieldCheck, 
  Server, 
  Route, 
  FileSearch, 
  TrendingUp, 
  Images, 
  CheckSquare, 
  LayoutGrid, 
  User, 
  GraduationCap, 
  Mail
} from 'lucide-react';

export default function Navbar() {
  const { theme, style, toggleTheme, setStyle, cycleStyle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [styleDropdown, setStyleDropdown] = useState(false);

  const styleMenuRef = useRef<HTMLDivElement>(null);
  const megaTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
      setScrolled(window.scrollY > 40);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (styleMenuRef.current && !styleMenuRef.current.contains(e.target as Node)) {
        setStyleDropdown(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMouseEnter = (menu: string) => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    setActiveMega(menu);
  };

  const handleMouseLeave = () => {
    megaTimeoutRef.current = setTimeout(() => {
      setActiveMega(null);
    }, 150);
  };

  const stylesList: { id: StyleTheme; label: string; color: string }[] = [
    { id: 'sage', label: 'Default (Sage Minimal)', color: '#3D6B50' },
    { id: 'glass', label: 'Glassmorphism', color: '#5E72EB' },
    { id: 'neumorphism', label: 'Neumorphism', color: '#7B93DB' },
    { id: 'claymorphism', label: 'Claymorphism', color: '#FF8A65' },
    { id: 'skeuomorphism', label: 'Modern Skeuomorphism', color: '#4757C7' },
  ];

  return (
    <>
      {/* Scroll progress bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-sage z-[100] transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-surface/90 backdrop-blur-md border-b border-border shadow-sm py-3' 
            : 'bg-surface/70 backdrop-blur-sm py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-sage text-white font-bold flex items-center justify-center font-display text-lg tracking-wider shadow-sm group-hover:scale-105 transition-transform">
              {personalInfo.monogram}
            </div>
            <div className="flex flex-col">
              <strong className="text-base text-ink font-semibold leading-tight font-display tracking-wide">
                {personalInfo.name}
              </strong>
              <span className="text-[11px] text-muted tracking-tight">
                {personalInfo.title}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 font-medium text-sm text-ink">
            <Link 
              href="/" 
              className="px-3 py-2 rounded-lg hover:text-sage transition-colors"
            >
              Home
            </Link>

            {/* Services Mega Menu */}
            <div 
              className="relative" 
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}
            >
              <button 
                type="button"
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors hover:text-sage ${
                  activeMega === 'services' ? 'text-sage font-semibold' : ''
                }`}
              >
                Services <ChevronDown className="w-4 h-4" />
              </button>

              {activeMega === 'services' && (
                <div 
                  className="absolute top-full -left-20 w-[780px] bg-card border border-border rounded-2xl shadow-xl p-6 mt-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseEnter={() => handleMouseEnter('services')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="grid grid-cols-12 gap-6">
                    {/* Col 1 */}
                    <div className="col-span-5 space-y-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                        Search & AI Visibility
                      </span>
                      <Link href="/#services" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-cardSubtle transition-colors group">
                        <div className="p-2 rounded-lg bg-sage/10 text-sage group-hover:bg-sage group-hover:text-white transition-colors">
                          <Search className="w-4 h-4" />
                        </div>
                        <div>
                          <strong className="block text-sm text-ink group-hover:text-sage">SEO</strong>
                          <span className="text-xs text-muted">Organic rankings & traffic growth</span>
                        </div>
                      </Link>
                      <Link href="/#services" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-cardSubtle transition-colors group">
                        <div className="p-2 rounded-lg bg-sage/10 text-sage group-hover:bg-sage group-hover:text-white transition-colors">
                          <Mic className="w-4 h-4" />
                        </div>
                        <div>
                          <strong className="block text-sm text-ink group-hover:text-sage">Answer Engine Optimization</strong>
                          <span className="text-xs text-muted">Win featured snippets & voice results</span>
                        </div>
                      </Link>
                      <Link href="/#services" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-cardSubtle transition-colors group">
                        <div className="p-2 rounded-lg bg-sage/10 text-sage group-hover:bg-sage group-hover:text-white transition-colors">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div>
                          <strong className="block text-sm text-ink group-hover:text-sage">Generative Engine Optimization</strong>
                          <span className="text-xs text-muted">Get cited in AI Overviews & LLMs</span>
                        </div>
                      </Link>
                      <Link href="/#services" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-cardSubtle transition-colors group">
                        <div className="p-2 rounded-lg bg-sage/10 text-sage group-hover:bg-sage group-hover:text-white transition-colors">
                          <Code className="w-4 h-4" />
                        </div>
                        <div>
                          <strong className="block text-sm text-ink group-hover:text-sage">Technical SEO</strong>
                          <span className="text-xs text-muted">Crawlability, speed & Core Web Vitals</span>
                        </div>
                      </Link>
                    </div>

                    {/* Col 2 */}
                    <div className="col-span-4 space-y-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                        Growth & Security
                      </span>
                      <Link href="/#services" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-cardSubtle transition-colors group">
                        <div className="p-2 rounded-lg bg-blush2/10 text-blush2 group-hover:bg-blush2 group-hover:text-white transition-colors">
                          <TrendingUp className="w-4 h-4" />
                        </div>
                        <div>
                          <strong className="block text-sm text-ink group-hover:text-blush2">Meta Ads Management</strong>
                          <span className="text-xs text-muted">Facebook & Instagram campaigns</span>
                        </div>
                      </Link>
                      <Link href="/#services" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-cardSubtle transition-colors group">
                        <div className="p-2 rounded-lg bg-sage/10 text-sage group-hover:bg-sage group-hover:text-white transition-colors">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <strong className="block text-sm text-ink group-hover:text-sage">Security-Aware SEO</strong>
                          <span className="text-xs text-muted">Protect rankings from blacklists</span>
                        </div>
                      </Link>
                      <Link href="/#services" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-cardSubtle transition-colors group">
                        <div className="p-2 rounded-lg bg-sage/10 text-sage group-hover:bg-sage group-hover:text-white transition-colors">
                          <Server className="w-4 h-4" />
                        </div>
                        <div>
                          <strong className="block text-sm text-ink group-hover:text-sage">IT Support & Systems</strong>
                          <span className="text-xs text-muted">Network & system administration</span>
                        </div>
                      </Link>
                      <Link href="/#services" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-cardSubtle transition-colors group">
                        <div className="p-2 rounded-lg bg-sage/10 text-sage group-hover:bg-sage group-hover:text-white transition-colors">
                          <Route className="w-4 h-4" />
                        </div>
                        <div>
                          <strong className="block text-sm text-ink group-hover:text-sage">Process & Strategy</strong>
                          <span className="text-xs text-muted">End-to-end client workflow</span>
                        </div>
                      </Link>
                    </div>

                    {/* Col 3: CTA Card */}
                    <div className="col-span-3 bg-gradient-to-br from-sage/10 to-blush-pal p-4 rounded-xl flex flex-col justify-between border border-sage/20">
                      <div>
                        <div className="w-9 h-9 rounded-lg bg-sage text-white flex items-center justify-center mb-3">
                          <FileSearch className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-ink text-sm mb-1 font-display">Free SEO Audit</h4>
                        <p className="text-xs text-muted leading-relaxed">
                          Run an instant audit of your site's speed, Core Web Vitals & SEO score.
                        </p>
                      </div>
                      <Link 
                        href="/free-audit" 
                        className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-sage hover:underline"
                      >
                        Try it free <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Work Mega Menu */}
            <div 
              className="relative" 
              onMouseEnter={() => handleMouseEnter('work')}
              onMouseLeave={handleMouseLeave}
            >
              <button 
                type="button"
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors hover:text-sage ${
                  activeMega === 'work' ? 'text-sage font-semibold' : ''
                }`}
              >
                Work <ChevronDown className="w-4 h-4" />
              </button>

              {activeMega === 'work' && (
                <div 
                  className="absolute top-full left-0 w-80 bg-card border border-border rounded-2xl shadow-xl p-4 mt-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseEnter={() => handleMouseEnter('work')}
                  onMouseLeave={handleMouseLeave}
                >
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted px-2 block mb-2">
                    Proof of Work
                  </span>
                  <Link href="/#projects" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-cardSubtle transition-colors group">
                    <div className="p-2 rounded-lg bg-sage/10 text-sage group-hover:bg-sage group-hover:text-white transition-colors">
                      <Images className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="block text-sm text-ink group-hover:text-sage">Recent Projects</strong>
                      <span className="text-xs text-muted">SEO campaigns & Web architectures</span>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* My Creations Mega Menu */}
            <div 
              className="relative" 
              onMouseEnter={() => handleMouseEnter('creations')}
              onMouseLeave={handleMouseLeave}
            >
              <button 
                type="button"
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors hover:text-sage ${
                  activeMega === 'creations' ? 'text-sage font-semibold' : ''
                }`}
              >
                My Creations <ChevronDown className="w-4 h-4" />
              </button>

              {activeMega === 'creations' && (
                <div 
                  className="absolute top-full left-0 w-80 bg-card border border-border rounded-2xl shadow-xl p-4 mt-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseEnter={() => handleMouseEnter('creations')}
                  onMouseLeave={handleMouseLeave}
                >
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted px-2 block mb-2">
                    Software & Tools
                  </span>
                  <div className="p-2.5 rounded-xl hover:bg-cardSubtle transition-colors">
                    <div className="flex items-center gap-2">
                      <CheckSquare className="w-4 h-4 text-sage" />
                      <strong className="text-sm text-ink">WorkLog OS</strong>
                    </div>
                    <span className="text-xs text-muted block pl-6">Desktop daily work & time tracker</span>
                  </div>
                  <div className="p-2.5 rounded-xl hover:bg-cardSubtle transition-colors">
                    <div className="flex items-center gap-2">
                      <LayoutGrid className="w-4 h-4 text-sage" />
                      <strong className="text-sm text-ink">TabDeck</strong>
                    </div>
                    <span className="text-xs text-muted block pl-6">Chrome new-tab dashboard & bookmarks</span>
                  </div>
                  <div className="p-2.5 rounded-xl hover:bg-cardSubtle transition-colors">
                    <div className="flex items-center gap-2">
                      <Images className="w-4 h-4 text-sage" />
                      <strong className="text-sm text-ink">WebP Converter Pro</strong>
                    </div>
                    <span className="text-xs text-muted block pl-6">Free batch image converter for desktop</span>
                  </div>
                </div>
              )}
            </div>

            {/* Blog Direct Link */}
            <Link 
              href="/blog"
              className="px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:text-sage text-ink"
            >
              Blog
            </Link>

            {/* About Mega Menu */}
            <div 
              className="relative" 
              onMouseEnter={() => handleMouseEnter('about')}
              onMouseLeave={handleMouseLeave}
            >
              <button 
                type="button"
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors hover:text-sage ${
                  activeMega === 'about' ? 'text-sage font-semibold' : ''
                }`}
              >
                About <ChevronDown className="w-4 h-4" />
              </button>

              {activeMega === 'about' && (
                <div 
                  className="absolute top-full left-0 w-80 bg-card border border-border rounded-2xl shadow-xl p-4 mt-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseEnter={() => handleMouseEnter('about')}
                  onMouseLeave={handleMouseLeave}
                >
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted px-2 block mb-2">
                    About
                  </span>
                  <Link href="/#about" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-cardSubtle transition-colors group">
                    <div className="p-2 rounded-lg bg-sage/10 text-sage group-hover:bg-sage group-hover:text-white transition-colors">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="block text-sm text-ink group-hover:text-sage">About Me</strong>
                      <span className="text-xs text-muted">My story, background & approach</span>
                    </div>
                  </Link>
                  <Link href="/#experience" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-cardSubtle transition-colors group">
                    <div className="p-2 rounded-lg bg-sage/10 text-sage group-hover:bg-sage group-hover:text-white transition-colors">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="block text-sm text-ink group-hover:text-sage">Experience & Education</strong>
                      <span className="text-xs text-muted">Career timeline & B.Sc. CSE degree</span>
                    </div>
                  </Link>
                  <Link href="/#contact" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-cardSubtle transition-colors group">
                    <div className="p-2 rounded-lg bg-sage/10 text-sage group-hover:bg-sage group-hover:text-white transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="block text-sm text-ink group-hover:text-sage">Contact</strong>
                      <span className="text-xs text-muted">Let's talk about your project</span>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Direct Free Audit Link */}
            <Link 
              href="/free-audit"
              className="px-3 py-2 rounded-lg text-sage font-semibold hover:bg-sage/10 transition-colors"
            >
              Free Audit
            </Link>
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle (Dark/Light) */}
            <button 
              onClick={toggleTheme}
              aria-label="Toggle theme mode"
              className="p-2.5 rounded-xl text-ink hover:bg-cardSubtle border border-border/50 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Style System Switcher (Instant automatic cycle on click) */}
            <div className="relative flex items-center" ref={styleMenuRef}>
              <button 
                onClick={() => cycleStyle()}
                aria-label="Switch visual style automatically"
                className="p-2.5 rounded-xl text-ink hover:bg-cardSubtle border border-border/50 transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 group"
                title="Click to automatically change color & style"
              >
                <Palette className="w-4 h-4 text-sage transition-transform group-hover:rotate-45" />
                <span className="w-2 h-2 rounded-full hidden sm:inline-block shadow-xs" style={{ backgroundColor: stylesList.find(s => s.id === style)?.color || '#3D6B50' }} />
              </button>

              <button
                onClick={() => setStyleDropdown(!styleDropdown)}
                aria-label="Choose visual style from list"
                className="p-1 -ml-1 text-muted hover:text-ink transition-colors"
                title="Choose style from list"
              >
                <ChevronDown className={`w-3 h-3 transition-transform ${styleDropdown ? 'rotate-180' : ''}`} />
              </button>

              {styleDropdown && (
                <div className="absolute right-0 top-full mt-2 w-60 bg-card border border-border rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between px-2 py-1 mb-1 border-b border-border/60">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                      Visual Themes
                    </span>
                    <span className="text-[10px] text-sage font-medium">Click to pick</span>
                  </div>
                  {stylesList.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setStyle(item.id);
                        setStyleDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors ${
                        style === item.id 
                          ? 'bg-sage text-white font-semibold shadow-xs' 
                          : 'text-ink hover:bg-cardSubtle'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span 
                          className="w-3 h-3 rounded-full inline-block shrink-0 shadow-xs border border-white/20" 
                          style={{ backgroundColor: item.color }} 
                        />
                        {item.label}
                      </div>
                      {style === item.id && <span className="text-xs">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Let's Talk CTA */}
            <Link 
              href="/#contact" 
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-ink text-surface font-semibold text-xs hover:bg-sage transition-all shadow-sm"
            >
              Let's Talk <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button 
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle mobile menu"
              className="p-2.5 rounded-xl text-ink hover:bg-cardSubtle border border-border/50 lg:hidden"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileOpen && (
        <div className="fixed inset-0 top-[65px] bg-surface z-40 lg:hidden overflow-y-auto p-5 border-t border-border flex flex-col gap-3 animate-in slide-in-from-top-4 duration-200">
          <Link 
            href="/" 
            onClick={() => setMobileOpen(false)}
            className="p-3 font-semibold text-ink border-b border-border/40"
          >
            Home
          </Link>

          {/* Mobile Accordion: Services */}
          <div>
            <button 
              onClick={() => setMobileAccordion(mobileAccordion === 'services' ? null : 'services')}
              className="w-full flex items-center justify-between p-3 font-semibold text-ink border-b border-border/40"
            >
              Services <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === 'services' ? 'rotate-180' : ''}`} />
            </button>
            {mobileAccordion === 'services' && (
              <div className="pl-4 py-2 space-y-2 bg-cardSubtle/40 rounded-lg text-sm">
                <Link href="/#services" onClick={() => setMobileOpen(false)} className="block py-1 text-ink">SEO Optimization</Link>
                <Link href="/#services" onClick={() => setMobileOpen(false)} className="block py-1 text-ink">Answer Engine Optimization (AEO)</Link>
                <Link href="/#services" onClick={() => setMobileOpen(false)} className="block py-1 text-ink">Generative Engine Optimization (GEO)</Link>
                <Link href="/#services" onClick={() => setMobileOpen(false)} className="block py-1 text-ink">Technical SEO Audit</Link>
                <Link href="/#services" onClick={() => setMobileOpen(false)} className="block py-1 text-ink">Meta Ads Management</Link>
                <Link href="/#services" onClick={() => setMobileOpen(false)} className="block py-1 text-ink">Security-Aware SEO</Link>
                <Link href="/free-audit" onClick={() => setMobileOpen(false)} className="block py-1 text-sage font-bold">Free SEO Audit Tool →</Link>
              </div>
            )}
          </div>

          {/* Mobile Accordion: Work */}
          <div>
            <button 
              onClick={() => setMobileAccordion(mobileAccordion === 'work' ? null : 'work')}
              className="w-full flex items-center justify-between p-3 font-semibold text-ink border-b border-border/40"
            >
              Work <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === 'work' ? 'rotate-180' : ''}`} />
            </button>
            {mobileAccordion === 'work' && (
              <div className="pl-4 py-2 space-y-2 bg-cardSubtle/40 rounded-lg text-sm">
                <Link href="/#projects" onClick={() => setMobileOpen(false)} className="block py-1 text-ink">Recent Projects</Link>
              </div>
            )}
          </div>

          {/* Mobile Blog Link */}
          <Link 
            href="/blog" 
            onClick={() => setMobileOpen(false)}
            className="p-3 font-semibold text-ink border-b border-border/40 hover:text-sage transition-colors block"
          >
            Blog
          </Link>

          <Link 
            href="/free-audit" 
            onClick={() => setMobileOpen(false)}
            className="p-3 font-bold text-sage border-b border-border/40"
          >
            Free SEO Audit Tool
          </Link>

          <button
            onClick={() => cycleStyle()}
            className="w-full flex items-center justify-between p-3 font-semibold text-ink border-b border-border/40 hover:bg-cardSubtle transition-colors text-left"
          >
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-sage" />
              <span>Change Visual Theme</span>
            </div>
            <span className="text-xs text-sage font-medium">
              {stylesList.find(s => s.id === style)?.label.split(' ')[0]} ↻
            </span>
          </button>

          <Link 
            href="/#contact" 
            onClick={() => setMobileOpen(false)}
            className="mt-4 w-full text-center py-3 rounded-xl bg-sage text-white font-bold text-sm"
          >
            Let's Talk →
          </Link>
        </div>
      )}
    </>
  );
}

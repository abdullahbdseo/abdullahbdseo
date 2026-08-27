'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { 
  Download, 
  ArrowRight, 
  Cpu, 
  Bot, 
  TrendingUp, 
  Sparkles,
  Code2
} from 'lucide-react';
import { usePortfolio } from '@/lib/usePortfolio';

function renderPillarIcon(icon: string) {
  switch (icon) {
    case 'Cpu':
      return <Cpu className="w-4 h-4" />;
    case 'Bot':
      return <Bot className="w-4 h-4" />;
    case 'TrendingUp':
      return <TrendingUp className="w-4 h-4" />;
    default:
      return <Sparkles className="w-4 h-4" />;
  }
}

export default function About() {
  const { personalInfo, aboutSection, skills } = usePortfolio();
  const [animateBars, setAnimateBars] = useState(false);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateBars(true);
        }
      },
      { threshold: 0.25 }
    );

    if (skillsRef.current) observer.observe(skillsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-24 bg-surface relative overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sage/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* Left Column: Bio & Authority Pillars */}
          <div className="lg:col-span-7 space-y-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-sage/10 text-sage border border-sage/20">
              <Sparkles className="w-3.5 h-3.5" /> {personalInfo.badge}
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-ink leading-[1.15] tracking-tight">
              Engineering Search Visibility for the <span className="text-sage">AI & Google</span> Era
            </h2>

            <div className="space-y-4 text-base sm:text-lg leading-relaxed">
              <p className="font-medium text-ink">
                I'm <strong className="text-sage font-bold">{personalInfo.name}</strong> — an {personalInfo.title} with a degree in <span className="text-ink underline decoration-sage/40 underline-offset-4 font-semibold">{personalInfo.degree}</span>. I approach organic search through code, algorithms, and data — not guesswork.
              </p>

              <p className="text-muted text-sm sm:text-base leading-relaxed">
                {aboutSection.p1}
              </p>

              <p className="text-muted text-sm sm:text-base leading-relaxed">
                {aboutSection.p2}
              </p>
            </div>

            {/* 3 Strategic SEO Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {aboutSection.pillars.map((pillar, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-card border border-border/80 hover:border-sage/40 transition-colors shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-sage/10 text-sage flex items-center justify-center mb-3">
                    {renderPillarIcon(pillar.icon)}
                  </div>
                  <h4 className="text-xs font-bold text-ink uppercase tracking-wider mb-1">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-muted leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Credentials Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-card border border-border">
                <small className="block text-[10px] uppercase tracking-wider text-muted font-semibold mb-0.5">Specialist</small>
                <span className="text-xs sm:text-sm font-semibold text-ink">{personalInfo.name}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-card border border-border">
                <small className="block text-[10px] uppercase tracking-wider text-muted font-semibold mb-0.5">Background</small>
                <span className="text-xs sm:text-sm font-semibold text-ink">{personalInfo.degree}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-card border border-border">
                <small className="block text-[10px] uppercase tracking-wider text-muted font-semibold mb-0.5">Location</small>
                <span className="text-xs sm:text-sm font-semibold text-ink">{personalInfo.location}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-card border border-border">
                <small className="block text-[10px] uppercase tracking-wider text-muted font-semibold mb-0.5">Availability</small>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> {personalInfo.status}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-card border border-border">
                <small className="block text-[10px] uppercase tracking-wider text-muted font-semibold mb-0.5">Email</small>
                <a href={`mailto:${personalInfo.email}`} className="text-xs sm:text-sm font-semibold text-sage hover:underline truncate block">
                  {personalInfo.email}
                </a>
              </div>
              <div className="p-3.5 rounded-xl bg-card border border-border">
                <small className="block text-[10px] uppercase tracking-wider text-muted font-semibold mb-0.5">Response Time</small>
                <span className="text-xs sm:text-sm font-semibold text-ink">Within 24 Hours</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a 
                href={personalInfo.cvFile} 
                download={personalInfo.cvDownloadName}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-ink text-surface font-semibold text-xs sm:text-sm hover:bg-sage transition-all shadow-md hover:scale-[1.02]"
              >
                <Download className="w-4 h-4" /> Download CV
              </a>
              <Link 
                href="/#contact"
                className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl border border-sage bg-sage/10 text-sage font-semibold text-xs sm:text-sm hover:bg-sage hover:text-white transition-all shadow-xs"
              >
                Start a Project <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/free-audit"
                className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl border border-border bg-card text-ink font-semibold text-xs sm:text-sm hover:border-sage hover:text-sage transition-all"
              >
                Free SEO Audit <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Core Expertise & Impact Stats */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Skill Matrix Card */}
            <div 
              ref={skillsRef}
              className="p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-card"
            >
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-border/80">
                <h3 className="text-xl font-bold font-display text-ink flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-sage" /> Technical Competencies
                </h3>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-sage/10 text-sage">
                  2026 Ready
                </span>
              </div>

              <div className="space-y-4">
                {skills.map((skill, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                      <span className="font-semibold text-ink">{skill.name}</span>
                      <span className="font-bold text-sage">{skill.pct}%</span>
                    </div>
                    <div className="h-2 w-full bg-cardSubtle rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-sage rounded-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: animateBars ? `${skill.pct}%` : '0%',
                          transitionDelay: `${idx * 100}ms`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Engineering Note */}
              <div className="mt-7 pt-5 border-t border-border/80 bg-cardSubtle/30 -mx-6 -mb-6 p-6 rounded-b-3xl">
                <p className="text-xs text-muted leading-relaxed">
                  <strong className="text-ink">The CS Advantage:</strong> Most marketers treat SEO as blog keywords. A computer science approach unlocks server-level crawling optimization, automated audit scripts, entity-graph modeling, and algorithmic resilience against core updates.
                </p>
              </div>
            </div>

            {/* Micro Metrics Band */}
            <div className="grid grid-cols-3 gap-3 text-center">
              {aboutSection.metrics.map((m, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-card border border-border">
                  <strong className={`block text-2xl font-bold font-display ${m.highlight ? 'text-sage' : 'text-ink'}`}>
                    {m.value}
                  </strong>
                  <span className="text-[11px] text-muted font-medium">{m.label}</span>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

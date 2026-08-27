'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search, 
  Bot, 
  Brain, 
  TrendingUp, 
  ArrowRight, 
  FileSearch, 
  Download,
  Calendar
} from 'lucide-react';
import { usePortfolio } from '@/lib/usePortfolio';
import { triggerBookingModal } from '@/components/BookingModal';

const TYPE_WORDS = ['Find', 'Discover', 'Choose', 'Remember'];

export default function Hero() {
  const { personalInfo } = usePortfolio();
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = TYPE_WORDS[wordIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && charIndex < currentWord.length) {
      timer = setTimeout(() => setCharIndex((prev) => prev + 1), 100);
    } else if (!isDeleting && charIndex === currentWord.length) {
      timer = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && charIndex > 0) {
      timer = setTimeout(() => setCharIndex((prev) => prev - 1), 60);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % TYPE_WORDS.length);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, wordIndex]);

  const displayedWord = TYPE_WORDS[wordIndex].substring(0, charIndex);

  return (
    <section 
      id="home" 
      className="relative min-h-[90vh] flex items-center pt-28 pb-16 overflow-hidden dot-pattern"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Stats */}
          <div className="lg:col-span-7 lg:pr-8 lg:border-r border-border/80 flex flex-col justify-center">
            
            {/* Chips */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sage/10 text-sage border border-sage/20">
                <Search className="w-3.5 h-3.5" /> SEO
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sage/10 text-sage border border-sage/20">
                <Bot className="w-3.5 h-3.5" /> AEO
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sage/10 text-sage border border-sage/20">
                <Brain className="w-3.5 h-3.5" /> GEO
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blush-pal text-blush2 border border-blush/30">
                <TrendingUp className="w-3.5 h-3.5" /> Meta Ads
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display text-ink font-bold leading-[1.2] mb-4">
              Your customers are searching.<br />
              I make sure they{' '}
              <span className="text-sage font-serif italic">{displayedWord}</span>
              <span className="text-sage cursor-blink font-light">|</span> you<br />
              — not your competitors.
            </h1>

            {/* Tagline */}
            <p className="text-sm sm:text-base font-medium text-sage mb-3">
              {personalInfo.heroTagline}
            </p>

            {/* Description */}
            <p className="text-sm sm:text-base text-muted max-w-xl leading-relaxed mb-8">
              {personalInfo.heroBio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-10">
              <button
                onClick={triggerBookingModal}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sage text-white font-bold text-sm hover:opacity-95 transition-all shadow-md cursor-pointer hover:scale-[1.02]"
              >
                <Calendar className="w-4 h-4" /> Book 15-Min Call
              </button>

              <Link 
                href="/#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-ink text-surface font-semibold text-sm hover:bg-sage transition-all shadow-sm"
              >
                Start a Project <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/free-audit"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-sage text-sage font-semibold text-sm hover:bg-sage/10 transition-all"
              >
                <FileSearch className="w-4 h-4" /> Free SEO Audit
              </Link>
              <a 
                href={personalInfo.cvFile} 
                download={personalInfo.cvDownloadName}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-border bg-card text-ink font-semibold text-sm hover:border-sage hover:text-sage transition-all shadow-xs"
              >
                <Download className="w-4 h-4 text-sage" /> CV
              </a>
            </div>

            {/* Stat Row */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="pr-2">
                <div className="text-2xl sm:text-3xl font-bold font-display text-sage mb-1">
                  +230%
                </div>
                <div className="text-[11px] sm:text-xs text-muted leading-tight">
                  Organic Traffic Growth
                </div>
              </div>
              <div className="px-2 sm:px-4 border-x border-border">
                <div className="text-2xl sm:text-3xl font-bold font-display text-sage mb-1">
                  120+
                </div>
                <div className="text-[11px] sm:text-xs text-muted leading-tight">
                  Keywords Ranked Top 10
                </div>
              </div>
              <div className="pl-2">
                <div className="text-2xl sm:text-3xl font-bold font-display text-blush2 mb-1">
                  4.2x
                </div>
                <div className="text-[11px] sm:text-xs text-muted leading-tight">
                  Meta Ads ROAS
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Portrait Card & Identity */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center text-center lg:pl-6">
            
            {/* Card Container - Clean & Professional */}
            <div className="relative w-[280px] sm:w-[320px] h-[370px] sm:h-[420px] rounded-3xl overflow-hidden shadow-2xl border-2 border-border/70 bg-card group">
              <Image 
                src={personalInfo.photo} 
                alt={`${personalInfo.name} – ${personalInfo.title}`} 
                fill 
                priority
                className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
              />
            </div>

            {/* Clean Professional Identity - Only Name and Title */}
            <div className="flex flex-col items-center text-center mt-5">
              <h3 className="text-2xl sm:text-3xl font-bold text-ink font-display tracking-tight">
                {personalInfo.name}
              </h3>
              <p className="text-sm sm:text-base font-semibold text-sage mt-1 tracking-wide">
                {personalInfo.title}
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

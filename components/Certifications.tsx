'use client';

import React, { useState } from 'react';
import { 
  Award, 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles,
  Search,
  Bot,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { usePortfolio } from '@/lib/usePortfolio';
import { CertificationItem } from '@/data/portfolioData';

export default function Certifications() {
  const { certifications } = usePortfolio();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const getBadgeStyle = (type: CertificationItem['badgeType']) => {
    switch (type) {
      case 'google':
        return {
          border: 'border-blue-500/30',
          bg: 'bg-blue-500/10',
          text: 'text-blue-600 dark:text-blue-400',
          tag: 'Google Verified',
        };
      case 'semrush':
        return {
          border: 'border-orange-500/30',
          bg: 'bg-orange-500/10',
          text: 'text-orange-600 dark:text-orange-400',
          tag: 'Semrush Academy',
        };
      case 'hubspot':
        return {
          border: 'border-amber-500/30',
          bg: 'bg-amber-500/10',
          text: 'text-amber-600 dark:text-amber-400',
          tag: 'HubSpot Certified',
        };
      case 'upwork':
        return {
          border: 'border-emerald-500/30',
          bg: 'bg-emerald-500/10',
          text: 'text-emerald-600 dark:text-emerald-400',
          tag: 'Upwork Top Rated',
        };
      case 'meta':
        return {
          border: 'border-indigo-500/30',
          bg: 'bg-indigo-500/10',
          text: 'text-indigo-600 dark:text-indigo-400',
          tag: 'Meta Blueprint',
        };
      default:
        return {
          border: 'border-sage/30',
          bg: 'bg-sage/10',
          text: 'text-sage',
          tag: 'Industry Accredited',
        };
    }
  };

  if (!certifications || certifications.length === 0) return null;

  return (
    <section id="certifications" className="py-20 bg-surface relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-sage/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-blush/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sage/10 text-sage border border-sage/20 shadow-xs">
            <Award className="w-3.5 h-3.5" /> Industry Verified Authority
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-ink tracking-tight">
            Accreditations &amp; Professional Certifications
          </h2>

          <p className="text-sm sm:text-base text-muted leading-relaxed">
            Rigorous certifications validating technical acumen across Technical SEO, Google Analytics 4 measurement, Inbound Strategy, and Generative Engine (GEO) optimization.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => {
            const badge = getBadgeStyle(cert.badgeType);
            const isCopied = copiedId === cert.id;

            return (
              <div
                key={cert.id}
                className="group p-6 sm:p-7 rounded-3xl bg-card border border-border hover:border-sage/50 shadow-card hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sage/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-4">
                  {/* Badge & Issuer Row */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border ${badge.border} ${badge.bg} ${badge.text} inline-flex items-center gap-1`}>
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {badge.tag}
                    </span>

                    <span className="text-[11px] font-semibold text-muted flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      {cert.issueDate}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold font-display text-ink group-hover:text-sage transition-colors leading-snug">
                    {cert.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                {/* Footer Meta & Actions */}
                <div className="pt-6 mt-6 border-t border-border/70 flex items-center justify-between gap-2 text-xs">
                  {cert.credentialId ? (
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-muted font-mono bg-cardSubtle px-2 py-1 rounded-md border border-border/50">
                        {cert.credentialId}
                      </span>
                      <button
                        onClick={() => handleCopy(cert.id, cert.credentialId || '')}
                        title="Copy Credential ID"
                        className="p-1.5 rounded-lg text-muted hover:text-ink hover:bg-cardSubtle transition-colors cursor-pointer"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  ) : (
                    <span className="text-[11px] text-muted font-medium">Verified Program</span>
                  )}

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-sage hover:underline"
                    >
                      Verify Badge <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Metrics Bar */}
        <div className="mt-12 sm:mt-14 p-5 sm:p-6 rounded-3xl bg-card border border-border shadow-xs flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-sage/10 text-sage flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <strong className="text-sm sm:text-base font-bold text-ink block font-display">
                Computer Science &amp; Engineering Foundation
              </strong>
              <p className="text-xs text-muted mt-0.5">
                Combining a B.Sc. in CSE with rigorous industry certifications to deliver data-backed search ranking results.
              </p>
            </div>
          </div>

          <a
            href="/assets/files/abdullah-saleh-cv.pdf"
            download="Abdullah-Saleh-CV.pdf"
            className="w-full md:w-auto text-center px-5 py-2.5 rounded-xl bg-ink text-surface font-semibold text-xs hover:bg-sage transition-all whitespace-nowrap shadow-xs cursor-pointer"
          >
            Download Verified CV (PDF)
          </a>
        </div>

      </div>
    </section>
  );
}

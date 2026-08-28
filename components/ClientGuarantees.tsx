'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  TrendingUp, 
  Zap, 
  MessageSquare, 
  Cpu, 
  Sparkles,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { usePortfolio } from '@/lib/usePortfolio';
import { triggerBookingModal } from '@/components/BookingModal';
import { ClientGuaranteeItem } from '@/data/portfolioData';

export default function ClientGuarantees() {
  const { clientGuarantees } = usePortfolio();

  const renderIcon = (iconName: ClientGuaranteeItem['iconName'], colorClass: string) => {
    switch (iconName) {
      case 'shield':
        return <ShieldCheck className={`w-6 h-6 ${colorClass}`} />;
      case 'lock':
        return <Lock className={`w-6 h-6 ${colorClass}`} />;
      case 'trending':
        return <TrendingUp className={`w-6 h-6 ${colorClass}`} />;
      case 'zap':
        return <Zap className={`w-6 h-6 ${colorClass}`} />;
      case 'message':
        return <MessageSquare className={`w-6 h-6 ${colorClass}`} />;
      case 'cpu':
        return <Cpu className={`w-6 h-6 ${colorClass}`} />;
      default:
        return <ShieldCheck className={`w-6 h-6 ${colorClass}`} />;
    }
  };

  const getCardColor = (color: string) => {
    switch (color) {
      case 'emerald':
        return {
          iconText: 'text-emerald-500',
          iconBg: 'bg-emerald-500/10',
          badgeText: 'text-emerald-600 dark:text-emerald-400',
          badgeBg: 'bg-emerald-500/10 border-emerald-500/20',
          hoverBorder: 'hover:border-emerald-500/40',
        };
      case 'blue':
        return {
          iconText: 'text-blue-500',
          iconBg: 'bg-blue-500/10',
          badgeText: 'text-blue-600 dark:text-blue-400',
          badgeBg: 'bg-blue-500/10 border-blue-500/20',
          hoverBorder: 'hover:border-blue-500/40',
        };
      case 'sage':
        return {
          iconText: 'text-sage',
          iconBg: 'bg-sage/10',
          badgeText: 'text-sage',
          badgeBg: 'bg-sage/10 border-sage/20',
          hoverBorder: 'hover:border-sage/50',
        };
      case 'amber':
        return {
          iconText: 'text-amber-500',
          iconBg: 'bg-amber-500/10',
          badgeText: 'text-amber-600 dark:text-amber-400',
          badgeBg: 'bg-amber-500/10 border-amber-500/20',
          hoverBorder: 'hover:border-amber-500/40',
        };
      case 'indigo':
        return {
          iconText: 'text-indigo-500',
          iconBg: 'bg-indigo-500/10',
          badgeText: 'text-indigo-600 dark:text-indigo-400',
          badgeBg: 'bg-indigo-500/10 border-indigo-500/20',
          hoverBorder: 'hover:border-indigo-500/40',
        };
      case 'purple':
        return {
          iconText: 'text-purple-500',
          iconBg: 'bg-purple-500/10',
          badgeText: 'text-purple-600 dark:text-purple-400',
          badgeBg: 'bg-purple-500/10 border-purple-500/20',
          hoverBorder: 'hover:border-purple-500/40',
        };
      default:
        return {
          iconText: 'text-sage',
          iconBg: 'bg-sage/10',
          badgeText: 'text-sage',
          badgeBg: 'bg-sage/10 border-sage/20',
          hoverBorder: 'hover:border-sage/50',
        };
    }
  };

  if (!clientGuarantees || clientGuarantees.length === 0) return null;

  return (
    <section id="guarantee" className="py-24 bg-surface relative overflow-hidden border-y border-border/70">
      {/* Subtle Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-sage/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5" /> Risk-Free Partnership
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-ink tracking-tight">
            Six Non-Negotiable Client Commitments
          </h2>

          <p className="text-sm sm:text-base text-muted leading-relaxed">
            High-ticket organic search campaigns built on absolute algorithmic integrity, data confidentiality, and verifiable pipeline return on investment.
          </p>
        </div>

        {/* 6 Guarantees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {clientGuarantees.map((item) => {
            const styles = getCardColor(item.badgeColor);

            return (
              <div
                key={item.id}
                className={`p-6 sm:p-7 rounded-3xl bg-card border border-border ${styles.hoverBorder} shadow-card hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden`}
              >
                {/* Accent Top Gradient */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity text-sage" />

                <div className="space-y-4">
                  {/* Icon & Pill Tag */}
                  <div className="flex items-center justify-between gap-3">
                    <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl ${styles.iconBg} flex items-center justify-center transition-transform group-hover:scale-110 duration-200`}>
                      {renderIcon(item.iconName, styles.iconText)}
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${styles.badgeBg} ${styles.badgeText}`}>
                      {item.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold font-display text-ink group-hover:text-sage transition-colors leading-snug">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 sm:pt-5 mt-4 sm:mt-5 border-t border-border/60 flex items-center gap-2 text-[11px] font-semibold text-muted">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Guaranteed in writing</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Callout */}
        <div className="mt-12 sm:mt-14 p-6 sm:p-8 rounded-3xl bg-cardSubtle border border-border text-center sm:text-left max-w-4xl mx-auto shadow-xs flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <strong className="text-base sm:text-lg font-bold text-ink block font-display">
              Ready to scale organic pipeline with complete peace of mind?
            </strong>
            <p className="text-xs sm:text-sm text-muted">
              Book a 15-minute strategy call. No sales pitch, no pressure — just an engineering analysis of your website.
            </p>
          </div>

          <button
            onClick={triggerBookingModal}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-sage text-white text-xs sm:text-sm font-bold hover:opacity-95 transition-all shadow-md flex items-center justify-center gap-2 shrink-0 cursor-pointer hover:scale-[1.02] active:scale-95"
          >
            <Calendar className="w-4 h-4" /> Schedule Strategy Call →
          </button>
        </div>

      </div>
    </section>
  );
}

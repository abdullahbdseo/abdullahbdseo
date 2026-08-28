'use client';

import React from 'react';
import { 
  Check, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Calendar, 
  Layers,
  HelpCircle
} from 'lucide-react';
import { usePortfolio } from '@/lib/usePortfolio';
import { triggerBookingModal } from '@/components/BookingModal';

export default function Pricing() {
  const { pricingPackages } = usePortfolio();

  if (!pricingPackages || pricingPackages.length === 0) return null;

  return (
    <section id="pricing" className="py-24 bg-cardSubtle/40 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sage/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blush/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sage/10 text-sage border border-sage/20 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" /> Transparent Investment
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-ink tracking-tight">
            Simple, High-Impact Growth Packages
          </h2>

          <p className="text-sm sm:text-base text-muted leading-relaxed">
            Transparent pricing with predictable deliverables. Whether you need a comprehensive diagnosis or full-funnel organic search domination.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {pricingPackages.map((pkg) => {
            const isPopular = pkg.popular;

            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'bg-card border-2 border-sage shadow-xl lg:scale-[1.02] z-10'
                    : 'bg-card border border-border shadow-card hover:border-sage/40 hover:shadow-lg'
                }`}
              >
                {/* Popular Ribbon */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-sage text-white shadow-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Most Popular
                    </span>
                  </div>
                )}

                {/* Plan Header */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold font-display text-ink">{pkg.name}</h3>
                    <p className="text-xs text-muted mt-1.5 leading-relaxed sm:min-h-[36px]">
                      {pkg.tagline}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="pt-2 pb-4 border-b border-border flex items-baseline gap-1.5">
                    <span className="text-3xl xs:text-4xl sm:text-5xl font-bold font-display text-ink tracking-tight">
                      {pkg.price}
                    </span>
                    <span className="text-xs text-muted font-medium">
                      {pkg.billingPeriod}
                    </span>
                  </div>

                  {/* Deliverables / Features */}
                  <div className="space-y-3 pt-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted block">
                      What&apos;s Included:
                    </span>
                    <ul className="space-y-2.5">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-ink/90 leading-normal">
                          <div className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA Action Button */}
                <div className="pt-8 mt-6 border-t border-border/60">
                  {pkg.ctaAction === 'book' ? (
                    <button
                      onClick={triggerBookingModal}
                      className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                        isPopular
                          ? 'bg-sage hover:opacity-95 text-white shadow-md hover:scale-[1.02]'
                          : 'bg-ink text-surface hover:bg-sage'
                      }`}
                    >
                      <Calendar className="w-4 h-4" /> {pkg.ctaText}
                    </button>
                  ) : (
                    <a
                      href="/#contact"
                      className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs ${
                        isPopular
                          ? 'bg-sage hover:opacity-95 text-white shadow-md hover:scale-[1.02]'
                          : 'bg-ink text-surface hover:bg-sage'
                      }`}
                    >
                      {pkg.ctaText} <ArrowRight className="w-4 h-4" />
                    </a>
                  )}

                  <p className="text-[11px] text-center text-muted mt-2.5 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    Guaranteed NDA &amp; Transparent Metrics
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Scope Card */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-card border border-border text-center max-w-3xl mx-auto shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-sage-pal border border-sage/30 text-sage flex items-center justify-center mx-auto">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-lg font-bold font-display text-ink">Need a Tailored Growth Scope?</h4>
            <p className="text-xs sm:text-sm text-muted mt-1 max-w-xl mx-auto leading-relaxed">
              Every business has unique organic bottlenecks. We can structure custom combinations of Enterprise Technical Fixes, programmatic SEO, and international migrations.
            </p>
          </div>
          <div className="pt-1 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={triggerBookingModal}
              className="px-5 py-2.5 rounded-xl bg-sage text-white text-xs font-bold hover:opacity-95 transition-all shadow-xs cursor-pointer"
            >
              Discuss Custom Scope on Call →
            </button>
            <a
              href="/#contact"
              className="px-5 py-2.5 rounded-xl border border-border bg-cardSubtle text-ink text-xs font-semibold hover:border-sage transition-all"
            >
              Send Project Brief
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

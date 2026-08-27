'use client';

import React from 'react';
import { Handshake } from 'lucide-react';

const BRANDS = [
  { name: 'HATIL', icon: '🏠' },
  { name: 'Bangla City', icon: '🏙️' },
  { name: 'FinalTouch', icon: '✨' },
  { name: 'UKASHIA', icon: '🛍️' },
  { name: 'Brand Hive', icon: '🐝' },
  { name: 'Creative People', icon: '🎨' },
];

export default function TrustedMarquee() {
  const looped = [...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <div id="trusted" className="border-y border-border bg-cardSubtle/50 py-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-4 flex items-center justify-center">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
          <Handshake className="w-4 h-4 text-sage" /> Trusted by Businesses & Brands
        </span>
      </div>

      <div className="relative w-full overflow-hidden flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex shrink-0 items-center gap-6 sm:gap-12 animate-marquee">
          {looped.map((brand, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-card border border-border/60 shadow-xs shrink-0 hover:border-sage transition-colors"
            >
              <span className="text-lg">{brand.icon}</span>
              <span className="text-sm font-semibold font-display text-ink">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useEffect, useState, useRef } from 'react';
import { TrendingUp, Crown, BarChart3, Smile } from 'lucide-react';

import { usePortfolio } from '@/lib/usePortfolio';

interface MetricItemProps {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
}

function MetricItem({ icon, value, suffix, prefix = '', label }: MetricItemProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          let current = 0;
          const step = Math.max(1, Math.floor(value / 40));
          const interval = setInterval(() => {
            current += step;
            if (current >= value) {
              setCount(value);
              clearInterval(interval);
            } else {
              setCount(current);
            }
          }, 30);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-card border border-border shadow-xs hover:shadow-card transition-all">
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-sage/10 text-sage flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xl sm:text-3xl font-bold font-display text-ink leading-none mb-0.5 sm:mb-1 truncate">
          {prefix}{count}{suffix}
        </div>
        <div className="text-[11px] sm:text-xs text-muted font-medium leading-tight line-clamp-2">
          {label}
        </div>
      </div>
    </div>
  );
}

export default function MetricsBar() {
  const { metrics } = usePortfolio();

  const getMetricIcon = (idx: number) => {
    switch (idx) {
      case 0: return <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 1: return <Crown className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 2: return <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 3: return <Smile className="w-5 h-5 sm:w-6 sm:h-6" />;
      default: return <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />;
    }
  };

  const list = metrics && metrics.length > 0 ? metrics : [
    { id: 'm-1', prefix: '+', value: 230, suffix: '%', label: 'Organic Traffic Growth' },
    { id: 'm-2', prefix: '', value: 120, suffix: '+', label: 'Keywords Ranked Top 10' },
    { id: 'm-3', prefix: '+', value: 80, suffix: '%', label: 'Conversions Increase' },
    { id: 'm-4', prefix: '', value: 98, suffix: '%', label: 'Client Satisfaction' }
  ];

  return (
    <section id="metrics" className="py-8 sm:py-10 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {list.map((m, idx) => (
            <MetricItem 
              key={m.id || idx}
              icon={getMetricIcon(idx)}
              prefix={m.prefix || ''}
              value={m.value}
              suffix={m.suffix || ''}
              label={m.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

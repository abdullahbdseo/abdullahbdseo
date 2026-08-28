'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, FileSearch, ArrowRight } from 'lucide-react';
import { triggerBookingModal } from '@/components/BookingModal';

interface Props {
  isCentered?: boolean;
}

export default function ServiceActionButtons({ isCentered = false }: Props) {
  return (
    <div className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2 ${isCentered ? 'justify-center' : ''}`}>
      <button
        onClick={triggerBookingModal}
        className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-sage text-white text-xs sm:text-sm font-bold hover:opacity-95 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-95 text-center"
      >
        <Calendar className="w-4 h-4" /> Book 15-Min Strategy Call
      </button>

      <Link
        href="/free-audit"
        className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-ink text-surface text-xs sm:text-sm font-semibold hover:bg-sage transition-all shadow-xs flex items-center justify-center gap-2 text-center"
      >
        <FileSearch className="w-4 h-4" /> Run Free SEO Audit
      </Link>

      <Link
        href="/#pricing"
        className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-border bg-card text-ink text-xs sm:text-sm font-semibold hover:border-sage hover:text-sage transition-all text-center"
      >
        View Pricing Tiers →
      </Link>
    </div>
  );
}

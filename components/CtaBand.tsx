'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Handshake, MessageSquare, Layers, Mail, Calendar } from 'lucide-react';
import { personalInfo } from '@/data/portfolioData';
import { triggerBookingModal } from '@/components/BookingModal';

export default function CtaBand() {
  return (
    <div id="cta-band" className="relative py-20 bg-ink text-surface overflow-hidden">
      {/* Glow blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-sage/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blush/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-emerald-400 border border-white/15 mb-6">
          <Handshake className="w-3.5 h-3.5" /> Let's Work Together
        </span>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white mb-6 leading-tight">
          Ready to <span className="text-sage font-serif italic">Grow Your</span><br />
          Search Visibility?
        </h2>

        <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Whether you need SEO, AEO, GEO or a full digital strategy — I'm ready to help you rank, get answered, and dominate your market.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={triggerBookingModal}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-sage text-white font-bold text-sm hover:bg-emerald-600 transition-all shadow-lg hover:scale-105 cursor-pointer"
          >
            <Calendar className="w-4 h-4" /> Book 15-Min Strategy Call
          </button>

          <Link 
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-ink font-semibold text-sm hover:bg-gray-100 transition-all shadow-lg hover:scale-105"
          >
            Start a Project <ArrowRight className="w-4 h-4" />
          </Link>

          {personalInfo.phoneRaw ? (
            <a 
              href={`https://wa.me/${personalInfo.phoneRaw}?text=${encodeURIComponent(`Hi ${personalInfo.name}! I'm interested in your services.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-ink font-semibold text-sm hover:bg-gray-100 transition-all shadow-lg hover:scale-105"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" /> WhatsApp Me
            </a>
          ) : (
            <a 
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-ink font-semibold text-sm hover:bg-gray-100 transition-all shadow-lg hover:scale-105"
            >
              <Mail className="w-4 h-4 text-emerald-600" /> Email Me Directly
            </a>
          )}

          <Link 
            href="/#services"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-all"
          >
            <Layers className="w-4 h-4" /> View Services
          </Link>
        </div>
      </div>
    </div>
  );
}

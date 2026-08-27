'use client';

import React from 'react';
import Link from 'next/link';
import { usePortfolio } from '@/lib/usePortfolio';

export default function Footer() {
  const { personalInfo } = usePortfolio();

  return (
    <footer id="footer" className="bg-surface border-t border-border pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-border">
          
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sage text-white font-bold flex items-center justify-center font-display text-lg tracking-wider">
                {personalInfo.monogram}
              </div>
              <strong className="text-lg font-display text-ink">{personalInfo.name}</strong>
            </div>

            <p className="text-xs sm:text-sm text-muted max-w-sm leading-relaxed">
              Driving organic growth through Search, Answer & Generative Engine Optimization — with a Computer Science foundation that makes the difference.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink font-display">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-muted">
              <li><Link href="/" className="hover:text-sage transition-colors">Home</Link></li>
              <li><Link href="/#about" className="hover:text-sage transition-colors">About</Link></li>
              <li><Link href="/#services" className="hover:text-sage transition-colors">Services</Link></li>
              <li><Link href="/#experience" className="hover:text-sage transition-colors">Experience</Link></li>
              <li><Link href="/#projects" className="hover:text-sage transition-colors">Projects</Link></li>
              <li><Link href="/blog" className="hover:text-sage transition-colors">Blog</Link></li>
              <li><Link href="/#contact" className="hover:text-sage transition-colors">Contact</Link></li>
              <li><Link href="/free-audit" className="text-sage font-semibold hover:underline">Free SEO Audit Tool</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink font-display">
              Specializations
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-muted">
              <li><Link href="/#services" className="hover:text-sage transition-colors">SEO Optimization</Link></li>
              <li><Link href="/#services" className="hover:text-sage transition-colors">Answer Engine Optimization (AEO)</Link></li>
              <li><Link href="/#services" className="hover:text-sage transition-colors">Generative Engine Optimization (GEO)</Link></li>
              <li><Link href="/#services" className="hover:text-sage transition-colors">Meta Ads Management</Link></li>
              <li><Link href="/#services" className="hover:text-sage transition-colors">Technical SEO Audit</Link></li>
              <li><Link href="/#services" className="hover:text-sage transition-colors">Security-Aware SEO</Link></li>
              <li><Link href="/#services" className="hover:text-sage transition-colors">IT Support & Systems</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <div>
            &copy; {new Date().getFullYear()} <strong className="text-ink">{personalInfo.name}</strong>. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>{personalInfo.location}</span>
            <span>•</span>
            <Link 
              href="/admin" 
              className="inline-flex items-center gap-1 text-muted hover:text-sage font-medium transition-colors"
            >
              🔒 Admin Console
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

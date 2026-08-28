'use client';

import React, { useState } from 'react';
import { Share2, Check, Link2 } from 'lucide-react';

interface Props {
  title: string;
  url: string;
}

export default function ArticleSocialShare({ title, url }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted">
        <Share2 className="w-4 h-4 text-sage" /> Share This Strategy Guide:
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <a
          href={"https://www.linkedin.com/sharing/share-offsite/?url=" + encodedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3.5 py-1.5 rounded-xl bg-card border border-border text-xs font-semibold text-ink hover:border-[#0077b5] hover:text-[#0077b5] transition-colors shadow-2xs"
        >
          LinkedIn
        </a>

        <a
          href={"https://twitter.com/intent/tweet?text=" + encodedTitle + "&url=" + encodedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3.5 py-1.5 rounded-xl bg-card border border-border text-xs font-semibold text-ink hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors shadow-2xs"
        >
          Twitter / X
        </a>

        <a
          href={"https://www.facebook.com/sharer/sharer.php?u=" + encodedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3.5 py-1.5 rounded-xl bg-card border border-border text-xs font-semibold text-ink hover:border-[#1877f2] hover:text-[#1877f2] transition-colors shadow-2xs"
        >
          Facebook
        </a>

        <a
          href={"https://api.whatsapp.com/send?text=" + encodedTitle + "%20" + encodedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3.5 py-1.5 rounded-xl bg-card border border-border text-xs font-semibold text-ink hover:border-[#25D366] hover:text-[#25D366] transition-colors shadow-2xs"
        >
          WhatsApp
        </a>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sage-pal border border-sage/30 text-xs font-bold text-sage hover:opacity-90 transition-opacity cursor-pointer shadow-2xs"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Link2 className="w-3.5 h-3.5" />}
          {copied ? 'Link Copied!' : 'Copy Link'}
        </button>
      </div>
    </div>
  );
}
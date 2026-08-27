'use client';

import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { personalInfo } from '@/data/portfolioData';

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [service, setService] = useState('');
  const [msg, setMsg] = useState('');

  const handleSend = () => {
    const sender = name.trim() || 'interested';
    const chosenService = service || 'General inquiry';
    const messageBody = msg.trim();
    const fullText = `Hi ${personalInfo.name}! I'm ${sender}.\nService: ${chosenService}\n${messageBody}`;
    const url = `https://wa.me/${personalInfo.phoneRaw}?text=${encodeURIComponent(fullText)}`;
    window.open(url, '_blank');
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Trigger Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Chat on WhatsApp"
          className="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl flex items-center justify-center hover:scale-110 hover:shadow-2xl transition-all relative group"
        >
          <MessageSquare className="w-7 h-7" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white animate-ping" />
          
          <span className="absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-ink text-surface text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
            Chat with Abdullah
          </span>
        </button>
      )}

      {/* Popup Drawer / Modal */}
      {open && (
        <div className="w-80 sm:w-96 rounded-3xl bg-card border border-border shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Header */}
          <div className="bg-[#25D366] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              <strong className="text-sm font-semibold">Chat with Abdullah</strong>
            </div>
            <button 
              onClick={() => setOpen(false)}
              className="p-1 rounded-lg hover:bg-black/10 transition-colors"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 space-y-3.5">
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted block">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Doe"
                className="w-full px-3.5 py-2 rounded-xl bg-surface border border-border text-xs text-ink outline-none focus:border-sage transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted block">
                What do you need?
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-surface border border-border text-xs text-ink outline-none focus:border-sage transition-colors"
              >
                <option value="" disabled>Select service</option>
                <option value="SEO Services">SEO Services</option>
                <option value="AEO Services">AEO Services</option>
                <option value="GEO Services">GEO Services</option>
                <option value="Technical SEO">Technical SEO</option>
                <option value="Meta Ads">Meta Ads (Facebook & Instagram)</option>
                <option value="Security-Aware SEO">Security-Aware SEO</option>
                <option value="IT Support">IT Support</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted block">
                Your Message
              </label>
              <textarea
                rows={3}
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Tell me about your site or project requirements…"
                className="w-full px-3.5 py-2 rounded-xl bg-surface border border-border text-xs text-ink outline-none focus:border-sage transition-colors resize-none"
              />
            </div>

            <button
              onClick={handleSend}
              className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] text-white font-bold text-xs hover:bg-[#1EBE5D] transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" /> Send on WhatsApp
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

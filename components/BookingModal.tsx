'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Video, 
  CheckCircle2, 
  X, 
  ArrowRight, 
  Sparkles, 
  Globe, 
  Mail, 
  User, 
  ExternalLink 
} from 'lucide-react';
import { usePortfolio } from '@/lib/usePortfolio';

export interface BookingData {
  id: string;
  name: string;
  email: string;
  website: string;
  date: string;
  timeSlot: string;
  platform: 'Google Meet' | 'Zoom';
  notes: string;
  createdAt: string;
}

export function triggerBookingModal() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('openBookingModal'));
  }
}

const TIME_SLOTS = [
  '10:00 AM - 10:30 AM (BST)',
  '02:00 PM - 02:30 PM (BST)',
  '04:30 PM - 05:00 PM (BST)',
  '07:30 PM - 08:00 PM (BST)',
  '09:30 PM - 10:00 PM (BST)',
];

export default function BookingModal() {
  const { personalInfo } = usePortfolio();
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0]);
  const [platform, setPlatform] = useState<'Google Meet' | 'Zoom'>('Google Meet');
  const [notes, setNotes] = useState('');
  const [lastBooking, setLastBooking] = useState<BookingData | null>(null);

  // Tomorrow as minimum date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setIsSuccess(false);
      if (!date) setDate(minDateStr);
    };

    window.addEventListener('openBookingModal', handleOpen);
    return () => window.removeEventListener('openBookingModal', handleOpen);
  }, [date, minDateStr]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !date || !timeSlot) return;

    setLoading(true);

    const booking: BookingData = {
      id: 'book-' + Date.now(),
      name: name.trim(),
      email: email.trim(),
      website: website.trim() || 'Not specified',
      date,
      timeSlot,
      platform,
      notes: notes.trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      // Save locally
      const existing = JSON.parse(localStorage.getItem('portfolio_client_bookings') || '[]');
      localStorage.setItem('portfolio_client_bookings', JSON.stringify([booking, ...existing]));

      // Send to server API
      await fetch('/api/book-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
      }).catch(() => {});

      // Send Instant Email Notification to your Gmail via FormSubmit
      const notifyEmail = personalInfo.email || 'abdullahbd.seo@gmail.com';
      fetch(`https://formsubmit.co/ajax/${notifyEmail}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `🔔 New 15-Min Strategy Call Booked: ${booking.name}`,
          _template: 'table',
          _captcha: 'false',
          'Client Name': booking.name,
          'Client Email': booking.email,
          'Website': booking.website,
          'Scheduled Date': booking.date,
          'Time Slot': booking.timeSlot,
          'Platform': booking.platform,
          'Client Goals / Notes': booking.notes || 'None provided',
          _replyto: booking.email
        }),
      }).catch(() => {});

      setLastBooking(booking);
      setIsSuccess(true);
    } catch {
      setLastBooking(booking);
      setIsSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  const generateGoogleCalendarUrl = () => {
    if (!lastBooking) return '#';
    const title = encodeURIComponent(`SEO & Growth Strategy Call with ${personalInfo.name}`);
    const details = encodeURIComponent(
      `1-on-1 Strategy Call\nPlatform: ${lastBooking.platform}\nClient: ${lastBooking.name}\nWebsite: ${lastBooking.website}\nTopic: Organic Growth & AI Search Optimization\nEmail: ${personalInfo.email}`
    );
    const location = encodeURIComponent(`${lastBooking.platform} Video Call`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-cardSubtle/40 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sage text-white flex items-center justify-center font-bold text-xs">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sage block leading-none">
                1-on-1 Strategy Consultation
              </span>
              <strong className="text-sm font-display text-ink leading-tight">
                Schedule a 15-Min Strategy Call
              </strong>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close modal"
            className="w-8 h-8 rounded-lg hover:bg-cardSubtle border border-transparent hover:border-border text-muted hover:text-ink flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {!isSuccess ? (
            <>
              {/* Value Banner */}
              <div className="p-4 rounded-2xl bg-sage-pal border border-sage/30 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-ink">
                  <Sparkles className="w-4 h-4 text-sage shrink-0" />
                  What You Get in this Free 15-Min Discovery Call:
                </div>
                <ul className="text-xs text-muted space-y-1.5 pl-6 list-disc">
                  <li><strong>Live Visibility Audit:</strong> Quick check of your Google Page 1 &amp; AI Overview rankings.</li>
                  <li><strong>Growth Roadmap:</strong> Specific 90-day action points for higher organic pipeline.</li>
                  <li><strong>Zero Hard Pitch:</strong> Just honest, actionable engineering advice from a CS graduate.</li>
                </ul>
              </div>

              {/* Calendly Direct Option If Configured */}
              {personalInfo.bookingLink && (
                <div className="p-3.5 rounded-xl bg-card border border-border flex items-center justify-between">
                  <div className="text-xs">
                    <span className="font-semibold text-ink block">Prefer Calendly?</span>
                    <span className="text-muted">Use Abdullah&apos;s direct calendar page</span>
                  </div>
                  <a
                    href={personalInfo.bookingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ink text-surface text-xs font-semibold hover:bg-sage transition-colors"
                  >
                    Open Calendly <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}

              {/* Booking Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                      Your Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-cardSubtle border border-border text-sm text-ink outline-none focus:border-sage"
                      />
                      <User className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                      Your Business Email *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@company.com"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-cardSubtle border border-border text-sm text-ink outline-none focus:border-sage"
                      />
                      <Mail className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                    Website URL or Domain
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="e.g. https://yourbrand.com"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-cardSubtle border border-border text-sm text-ink outline-none focus:border-sage"
                    />
                    <Globe className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      min={minDateStr}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-cardSubtle border border-border text-sm text-ink outline-none focus:border-sage"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                      Video Meeting Platform
                    </label>
                    <select
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value as any)}
                      className="w-full px-3 py-2.5 rounded-xl bg-cardSubtle border border-border text-sm text-ink outline-none focus:border-sage"
                    >
                      <option value="Google Meet">Google Meet (Recommended)</option>
                      <option value="Zoom">Zoom Video</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                    Select Convenient Time Slot *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setTimeSlot(slot)}
                        className={`px-3 py-2 rounded-xl text-xs font-medium text-left border transition-all cursor-pointer flex items-center justify-between ${
                          timeSlot === slot
                            ? 'bg-sage text-white border-sage shadow-xs'
                            : 'bg-cardSubtle border-border text-ink hover:border-sage/40'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 shrink-0" />
                          {slot.split(' (')[0]}
                        </span>
                        {timeSlot === slot && <span className="text-xs">✓</span>}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                    What is your primary goal / focus? (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Need help ranking on Google Page 1 and AI Overviews for an e-commerce store..."
                    className="w-full px-3.5 py-2 rounded-xl bg-cardSubtle border border-border text-xs sm:text-sm text-ink outline-none focus:border-sage resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-sage hover:opacity-95 text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      'Reserving Your Slot...'
                    ) : (
                      <>
                        Confirm 15-Min Strategy Call <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-center text-muted mt-2">
                    🔒 100% Free · No credit card required · Instant confirmation
                  </p>
                </div>
              </form>
            </>
          ) : (
            /* Success State */
            <div className="py-6 text-center space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                  Call Confirmed!
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-ink mt-2">
                  You&apos;re Scheduled with {personalInfo.name}!
                </h3>
                <p className="text-xs sm:text-sm text-muted max-w-md mx-auto mt-1">
                  A calendar invitation and video link have been reserved for your selected slot.
                </p>
              </div>

              {/* Summary Card */}
              {lastBooking && (
                <div className="p-5 rounded-2xl bg-cardSubtle border border-border text-left max-w-md mx-auto space-y-2.5 text-xs">
                  <div className="flex justify-between border-b border-border/50 pb-2">
                    <span className="text-muted">Attendee:</span>
                    <strong className="text-ink">{lastBooking.name} ({lastBooking.email})</strong>
                  </div>
                  <div className="flex justify-between border-b border-border/50 pb-2">
                    <span className="text-muted">Date &amp; Time:</span>
                    <strong className="text-sage">{lastBooking.date} · {lastBooking.timeSlot}</strong>
                  </div>
                  <div className="flex justify-between border-b border-border/50 pb-2">
                    <span className="text-muted">Platform:</span>
                    <strong className="text-ink flex items-center gap-1">
                      <Video className="w-3.5 h-3.5 text-emerald-500" /> {lastBooking.platform}
                    </strong>
                  </div>
                  {lastBooking.website && lastBooking.website !== 'Not specified' && (
                    <div className="flex justify-between">
                      <span className="text-muted">Website:</span>
                      <span className="text-ink font-mono">{lastBooking.website}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={generateGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-ink text-surface text-xs font-bold hover:bg-sage transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <Calendar className="w-4 h-4" /> Add to Google Calendar
                </a>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-border bg-card text-ink text-xs font-semibold hover:border-sage transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

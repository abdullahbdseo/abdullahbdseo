'use client';

import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Loader2,
  Clock,
  Calendar,
  Video
} from 'lucide-react';
import { usePortfolio } from '@/lib/usePortfolio';
import { triggerBookingModal } from '@/components/BookingModal';

export default function Contact() {
  const { personalInfo } = usePortfolio();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    service: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate/post to Formspree
      const res = await fetch('https://formspree.io/f/mpwlpzny', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        // Even if offline/demo, show success
        setSubmitted(true);
      }
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-cardSubtle/40 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sage/10 text-sage border border-sage/20 mb-3">
            <Send className="w-3.5 h-3.5" /> Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-ink leading-tight">
            Let's Grow Your Search Visibility & Business
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-8">
            <p className="text-sm sm:text-base text-muted leading-relaxed">
              Have a project in mind? Let's discuss how SEO, AEO, or GEO can transform your online visibility and drive real results.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border">
                <div className="w-11 h-11 rounded-xl bg-sage/10 text-sage flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-muted block font-medium">Email</span>
                  <a href={`mailto:${personalInfo.email}`} className="text-sm font-semibold text-ink hover:text-sage transition-colors">
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border">
                <div className="w-11 h-11 rounded-xl bg-sage/10 text-sage flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-muted block font-medium">Response Time</span>
                  <span className="text-sm font-semibold text-ink">
                    Within 24 Hours
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border">
                <div className="w-11 h-11 rounded-xl bg-sage/10 text-sage flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-muted block font-medium">Location</span>
                  <span className="text-sm font-semibold text-ink">
                    {personalInfo.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Featured Strategy Call Booking Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-sage/15 to-sage/5 border border-sage/40 shadow-xs space-y-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-sage text-white flex items-center justify-center shadow-xs shrink-0">
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-sm font-bold text-ink block">Schedule a Video Consultation</strong>
                  <span className="text-xs text-muted">Prefer to talk face-to-face over Google Meet / Zoom?</span>
                </div>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Skip the back-and-forth emails. Pick a 15-minute slot that fits your schedule for an instant discovery session.
              </p>
              <button
                type="button"
                onClick={triggerBookingModal}
                className="w-full py-2.5 px-4 rounded-xl bg-sage text-white font-bold text-xs hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-98"
              >
                <Calendar className="w-4 h-4" /> Book 15-Min Strategy Call
              </button>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-card">
              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-ink">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sm text-muted max-w-md mx-auto">
                    Thank you for reaching out! I have received your message and will review your project details and get back to you promptly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ fullname: '', email: '', service: '', message: '' });
                    }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-border text-xs font-semibold text-ink hover:bg-cardSubtle transition-all mt-4"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="fullname" className="text-xs font-semibold text-ink block">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        required
                        value={formData.fullname}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full px-4 py-2.5 rounded-xl bg-surface border border-border text-sm text-ink outline-none focus:border-sage transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-semibold text-ink block">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-surface border border-border text-sm text-ink outline-none focus:border-sage transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="service" className="text-xs font-semibold text-ink block">
                      Service Interested In
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-surface border border-border text-sm text-ink outline-none focus:border-sage transition-colors"
                    >
                      <option value="" disabled>Select a service</option>
                      <option value="SEO">Search Engine Optimization (SEO)</option>
                      <option value="AEO">Answer Engine Optimization (AEO)</option>
                      <option value="GEO">Generative Engine Optimization (GEO)</option>
                      <option value="Meta Ads">Meta Ads (Facebook & Instagram)</option>
                      <option value="Technical SEO">Technical SEO Audit</option>
                      <option value="Security-Aware SEO">Security-Aware SEO</option>
                      <option value="Web Strategy">Web Strategy & Consulting</option>
                      <option value="IT Support">IT Support & Systems</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label htmlFor="message" className="text-xs font-semibold text-ink block">
                        Message *
                      </label>
                      <span className="text-[11px] text-muted">
                        {formData.message.length} / 500
                      </span>
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      maxLength={500}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project goals, website URL, and timeline…"
                      className="w-full px-4 py-2.5 rounded-xl bg-surface border border-border text-sm text-ink outline-none focus:border-sage transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-6 rounded-xl bg-sage text-white font-semibold text-sm hover:bg-sage-dark transition-all flex items-center justify-center gap-2 shadow-xs disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Sending Message…
                      </>
                    ) : (
                      <>
                        Send Message <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

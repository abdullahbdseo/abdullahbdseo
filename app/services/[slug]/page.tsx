import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import { detailedServices } from '@/data/servicesData';
import { 
  Search, 
  Mic, 
  Bot, 
  Code, 
  TrendingUp, 
  ShieldCheck, 
  Server, 
  Route, 
  ArrowRight, 
  Calendar, 
  CheckCircle2, 
  Lock, 
  Sparkles,
  ChevronRight,
  Clock,
  Layers,
  HelpCircle
} from 'lucide-react';
import ServiceActionButtons from './ServiceActionButtons';

export function generateStaticParams() {
  return Object.keys(detailedServices).map((slug) => ({
    slug,
  }));
}

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const service = detailedServices[params.slug];
  if (!service) return { title: 'Service Not Found | Abdullah Saleh' };

  return {
    title: `${service.title} | Abdullah Saleh · SEO Growth Specialist`,
    description: service.tagline,
  };
}

function getServiceIcon(type: string) {
  switch (type) {
    case 'search':
      return <Search className="w-8 h-8 text-sage" />;
    case 'mic':
      return <Mic className="w-8 h-8 text-sage" />;
    case 'bot':
      return <Bot className="w-8 h-8 text-sage" />;
    case 'code':
      return <Code className="w-8 h-8 text-sage" />;
    case 'trending':
      return <TrendingUp className="w-8 h-8 text-sage" />;
    case 'shield':
      return <ShieldCheck className="w-8 h-8 text-sage" />;
    case 'server':
      return <Server className="w-8 h-8 text-sage" />;
    case 'route':
      return <Route className="w-8 h-8 text-sage" />;
    default:
      return <Search className="w-8 h-8 text-sage" />;
  }
}

export default function ServiceDetailPage({ params }: ServicePageProps) {
  const service = detailedServices[params.slug];

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-surface text-ink">
      <Navbar />

      <main className="pt-28 pb-20">
        
        {/* Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <nav className="flex items-center gap-2 text-xs font-medium text-muted">
            <Link href="/" className="hover:text-sage transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-border" />
            <Link href="/services" className="hover:text-sage transition-colors">Services</Link>
            <ChevronRight className="w-3.5 h-3.5 text-border" />
            <span className="text-ink font-semibold">{service.title}</span>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden mb-16">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-sage/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blush/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sage/10 text-sage border border-sage/20 text-xs font-bold uppercase tracking-wider shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                {service.badge}
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display text-ink tracking-tight leading-[1.15]">
                {service.title}
              </h1>

              {/* Tagline */}
              <p className="text-lg sm:text-xl text-sage font-medium leading-relaxed font-display">
                {service.tagline}
              </p>

              {/* Human Bio / Philosophy */}
              <div className="p-6 rounded-3xl bg-card border border-border shadow-card space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-sage-pal border border-sage/20 flex items-center justify-center shrink-0">
                    {getServiceIcon(service.iconType)}
                  </div>
                  <div>
                    <strong className="text-sm font-bold text-ink block font-display">Abdullah Saleh · B.Sc. in CSE</strong>
                    <span className="text-xs text-muted">SEO Growth Specialist &amp; Technical Search Architect</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-ink/90 leading-relaxed pt-2 border-t border-border/60">
                  &ldquo;{service.heroBio}&rdquo;
                </p>
              </div>

              {/* Action Buttons */}
              <ServiceActionButtons />

            </div>
          </div>
        </section>

        {/* KPIs Bar */}
        <section className="border-y border-border bg-cardSubtle/40 py-10 mb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {service.kpis.map((kpi, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-bold font-display text-ink tracking-tight">
                    {kpi.metric}
                  </div>
                  <div className="text-xs text-muted font-medium">
                    {kpi.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Overview & Why It Matters */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Overview Narrative */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-sage">The Engineering Perspective</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-ink">
                Why this discipline requires code and data — not generic guesswork.
              </h2>
              <p className="text-sm text-muted leading-relaxed">
                {service.overview}
              </p>
              
              <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-ink">
                  <Lock className="w-4 h-4 text-emerald-500" />
                  <span>The Abdullah Saleh Standard</span>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  Every campaign is executed with 100% white-hat rigor, backed by real-time Looker Studio dashboards, direct Slack communication, and strict mutual non-disclosure agreements.
                </p>
              </div>
            </div>

            {/* Right: Why It Matters Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {service.whyItMatters.map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-card border border-border hover:border-sage/40 shadow-xs hover:shadow-md transition-all space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-sage/10 text-sage font-bold text-xs flex items-center justify-center font-mono">
                    0{idx + 1}
                  </div>
                  <h3 className="font-bold text-sm text-ink font-display">{item.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Deliverables Section */}
        <section className="bg-cardSubtle/30 py-20 border-y border-border/70 mb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-sage">Tangible Work</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-ink">
                What You Actually Receive
              </h2>
              <p className="text-xs sm:text-sm text-muted">
                No vague promises or vanity reports. Here are the exact engineering and strategic deliverables shipped during our sprints.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.deliverables.map((item, idx) => (
                <div key={idx} className="p-7 rounded-3xl bg-card border border-border shadow-card hover:border-sage/40 transition-all flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    {item.highlight && (
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sage/10 text-sage border border-sage/20">
                        {item.highlight}
                      </span>
                    )}
                    <h3 className="text-base font-bold font-display text-ink">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed">{item.desc}</p>
                  </div>
                  
                  <div className="pt-4 border-t border-border/60 flex items-center gap-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Hand-Crafted Deliverable
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4-Step Process */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-sage">Execution Roadmap</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-ink">
              The 4-Step Working Process
            </h2>
            <p className="text-xs sm:text-sm text-muted">
              How we collaborate to turn diagnostic insights into measurable search pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-card border border-border shadow-xs relative overflow-hidden space-y-3">
                <span className="text-4xl font-bold font-display text-sage/20 block font-mono">
                  {step.step}
                </span>
                <h3 className="text-base font-bold font-display text-ink leading-snug">{step.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sage">Honest Answers</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-ink">
              Common Questions Before Hiring
            </h2>
          </div>

          <div className="space-y-4">
            {service.faqs.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-2">
                <h3 className="font-bold text-sm sm:text-base text-ink flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-sage shrink-0" />
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-muted leading-relaxed pl-6">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-card to-cardSubtle border-2 border-sage/30 shadow-xl text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sage/10 rounded-full blur-3xl pointer-events-none" />
            
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sage text-white shadow-xs">
              <Calendar className="w-3.5 h-3.5" /> 1-on-1 Consultation
            </span>

            <h2 className="text-2xl sm:text-4xl font-bold font-display text-ink max-w-2xl mx-auto leading-tight">
              Ready to engineer your {service.title} roadmap?
            </h2>

            <p className="text-xs sm:text-sm text-muted max-w-xl mx-auto leading-relaxed">
              Book a 15-minute discovery consultation. We will inspect your current domain signals, diagnose your biggest bottlenecks, and map out a clean action plan.
            </p>

            <ServiceActionButtons isCentered={true} />
          </div>
        </section>

      </main>

      <Footer />
      <WhatsAppWidget />
    </div>
  );
}

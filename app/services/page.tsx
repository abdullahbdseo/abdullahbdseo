import React from 'react';
import Link from 'next/link';
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
  Sparkles,
  CheckCircle2,
  FileSearch,
  Calendar
} from 'lucide-react';
import ServiceActionButtons from './[slug]/ServiceActionButtons';

export const metadata: Metadata = {
  title: 'Services & Search Architecture Solutions | Abdullah Saleh',
  description: 'Full-stack search engine optimization, answer engine optimization, technical performance, and paid acquisition services by Abdullah Saleh.',
};

function getServiceIcon(type: string) {
  switch (type) {
    case 'search':
      return <Search className="w-6 h-6 text-sage" />;
    case 'mic':
      return <Mic className="w-6 h-6 text-sage" />;
    case 'bot':
      return <Bot className="w-6 h-6 text-sage" />;
    case 'code':
      return <Code className="w-6 h-6 text-sage" />;
    case 'trending':
      return <TrendingUp className="w-6 h-6 text-sage" />;
    case 'shield':
      return <ShieldCheck className="w-6 h-6 text-sage" />;
    case 'server':
      return <Server className="w-6 h-6 text-sage" />;
    case 'route':
      return <Route className="w-6 h-6 text-sage" />;
    default:
      return <Search className="w-6 h-6 text-sage" />;
  }
}

export default function ServicesHubPage() {
  const servicesList = Object.values(detailedServices);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-surface text-ink">
      <Navbar />

      <main className="pt-28 pb-20">
        
        {/* Header Hero */}
        <section className="relative overflow-hidden mb-16 text-center">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-sage/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blush/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sage/10 text-sage border border-sage/20 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" /> Full-Stack Search Architecture
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display text-ink tracking-tight">
              Services &amp; Growth Solutions
            </h1>

            <p className="text-sm sm:text-base text-muted max-w-2xl mx-auto leading-relaxed">
              Every service is engineered with software discipline: clear deliverables, zero guesswork, and compounding return on investment. Explore our dedicated service specializations below.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((service) => (
              <div 
                key={service.slug}
                className="group p-7 sm:p-8 rounded-3xl bg-card border border-border hover:border-sage/50 shadow-card hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Accent Top Gradient */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sage/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-4">
                  {/* Icon & Badge */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-sage/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {getServiceIcon(service.iconType)}
                    </div>

                    <span className="text-[11px] font-bold text-muted uppercase tracking-wider bg-cardSubtle px-2.5 py-1 rounded-lg border border-border/50">
                      {service.badge.split('&')[0].trim()}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold font-display text-ink group-hover:text-sage transition-colors leading-snug">
                    <Link href={`/services/${service.slug}`} className="hover:underline">
                      {service.title}
                    </Link>
                  </h3>

                  {/* Tagline */}
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    {service.tagline}
                  </p>

                  {/* Top Deliverables */}
                  <div className="pt-2 space-y-2 border-t border-border/60">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted block">
                      Key Capabilities:
                    </span>
                    <ul className="space-y-1.5">
                      {service.deliverables.slice(0, 3).map((d, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-ink/80">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{d.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-6 mt-6 border-t border-border/70 flex items-center justify-between">
                  <span className="text-xs font-mono text-muted">{service.kpis[0]?.metric || 'Proven ROI'}</span>
                  <Link 
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-sage group-hover:translate-x-1 transition-transform"
                  >
                    View Full Scope <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Free Audit Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="p-8 sm:p-10 rounded-3xl bg-card border-2 border-sage/30 shadow-card flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sage/10 text-sage">
                <FileSearch className="w-3.5 h-3.5" /> Immediate Value
              </span>
              <h3 className="text-2xl font-bold font-display text-ink">
                Curious where your domain stands right now?
              </h3>
              <p className="text-xs sm:text-sm text-muted max-w-xl">
                Run our free automated audit tool to test your mobile PageSpeed, Core Web Vitals, and indexation health in 30 seconds.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/free-audit"
                className="px-5 py-3 rounded-xl bg-sage text-white text-xs sm:text-sm font-bold hover:opacity-95 transition-all shadow-xs"
              >
                Run Free Audit →
              </Link>
              <Link
                href="/#pricing"
                className="px-5 py-3 rounded-xl border border-border bg-cardSubtle text-ink text-xs sm:text-sm font-semibold hover:border-sage transition-all"
              >
                View Pricing Packages
              </Link>
            </div>
          </div>
        </section>

        {/* Call Booking Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-ink">
              Need a Customized Search Strategy?
            </h2>
            <p className="text-xs sm:text-sm text-muted">
              Every website faces unique competitive obstacles. Let&apos;s talk 1-on-1 and design a custom sprint plan.
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

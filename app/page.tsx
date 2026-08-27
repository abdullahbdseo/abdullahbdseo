import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MetricsBar from '@/components/MetricsBar';
import About from '@/components/About';
import Services from '@/components/Services';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import Pricing from '@/components/Pricing';
import ToolsGrid from '@/components/ToolsGrid';
import Contact from '@/components/Contact';
import BlogSection from '@/components/BlogSection';
import CtaBand from '@/components/CtaBand';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-surface text-ink">
      <Navbar />

      <main>
        <Hero />
        <MetricsBar />
        <About />
        <Certifications />
        <Services />
        <Pricing />
        <Experience />
        <Projects />
        <ToolsGrid />
        <Contact />
        <BlogSection />
        <CtaBand />
        <FaqSection />
      </main>

      <Footer />
      <WhatsAppWidget />
    </div>
  );
}

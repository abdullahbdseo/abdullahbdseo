'use client';

import React from 'react';
import { 
  Wrench, 
  Search, 
  BarChart, 
  LineChart, 
  Code, 
  Bot, 
  Cpu, 
  Gauge, 
  Layers 
} from 'lucide-react';

const TOOLS = [
  { name: 'Google Search Console', icon: <Search className="w-5 h-5 text-blue-500" /> },
  { name: 'Ahrefs', icon: <LineChart className="w-5 h-5 text-orange-500" /> },
  { name: 'SEMrush', icon: <BarChart className="w-5 h-5 text-amber-500" /> },
  { name: 'Screaming Frog', icon: <Layers className="w-5 h-5 text-emerald-500" /> },
  { name: 'Google Analytics 4', icon: <BarChart className="w-5 h-5 text-yellow-600" /> },
  { name: 'WordPress', icon: <Code className="w-5 h-5 text-sky-600" /> },
  { name: 'Schema.org', icon: <Code className="w-5 h-5 text-sage" /> },
  { name: 'ChatGPT / Gemini', icon: <Bot className="w-5 h-5 text-teal-500" /> },
  { name: 'Perplexity', icon: <Cpu className="w-5 h-5 text-indigo-500" /> },
  { name: 'PageSpeed Insights', icon: <Gauge className="w-5 h-5 text-blue-600" /> },
];

export default function ToolsGrid() {
  return (
    <section id="tools" className="py-16 bg-cardSubtle/40 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sage/10 text-sage border border-sage/20">
            <Wrench className="w-3.5 h-3.5" /> Tools & Technologies I Use
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {TOOLS.map((tool, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-2xl bg-card border border-border flex flex-col items-center justify-center text-center gap-2 hover:border-sage/40 hover:shadow-xs transition-all group"
            >
              <div className="p-2.5 rounded-xl bg-surface group-hover:scale-110 transition-transform">
                {tool.icon}
              </div>
              <span className="text-xs font-semibold text-ink leading-snug">
                {tool.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

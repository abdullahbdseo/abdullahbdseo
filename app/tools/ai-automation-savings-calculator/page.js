"use client";

import { useState } from "react";
import Link from "next/link";

export default function AiAutomationSavingsCalculator() {
  const [teamSize, setTeamSize] = useState(5);
  const [hourlyWage, setHourlyWage] = useState(35);
  const [hoursPerWeekRepetitive, setHoursPerWeekRepetitive] = useState(12);
  const [automationPercent, setAutomationPercent] = useState(65);
  const [aiToolCostMonthly, setAiToolCostMonthly] = useState(250);

  // Calculations
  const weeklyRepetitiveHoursTeam = teamSize * hoursPerWeekRepetitive;
  const weeklyHoursSaved = weeklyRepetitiveHoursTeam * (automationPercent / 100);
  const annualHoursSaved = Math.round(weeklyHoursSaved * 50);
  
  const annualLaborSavings = annualHoursSaved * hourlyWage;
  const annualToolCost = aiToolCostMonthly * 12;
  const netAnnualSavings = annualLaborSavings - annualToolCost;
  const roiMultiplier = annualToolCost > 0 ? (annualLaborSavings / annualToolCost).toFixed(1) : 0;

  return (
    <div className="tool-single-page">
      <section className="page-header-section">
        <div className="container text-center">
          <Link href="/tools" className="tool-back-link"><i className="fa-solid fa-arrow-left"></i> All Tools</Link>
          <div className="sub-badge mt-2">Efficiency & Cost Reduction</div>
          <h1 className="page-title">AI Automation Savings Calculator</h1>
          <p className="page-subtitle max-w-2xl mx-auto">
            Calculate how automating repetitive marketing, reporting, and operational workflows with AI and programmatic SEO reduces labor overhead.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container max-w-4xl">
          <div className="calc-layout-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* INPUTS COLUMN */}
            <div className="calc-inputs md:col-span-2 space-y-4 bg-white p-6 border rounded shadow-sm">
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Team Members Handling Tasks</label>
                  <input 
                    type="number" 
                    value={teamSize} 
                    onChange={(e) => setTeamSize(Number(e.target.value))} 
                    className="form-input" 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Average Hourly Wage ($/hr)</label>
                  <input 
                    type="number" 
                    value={hourlyWage} 
                    onChange={(e) => setHourlyWage(Number(e.target.value))} 
                    className="form-input" 
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="flex justify-between items-center mb-1">
                  <label className="form-label mb-0">Repetitive Hours Per Person / Week</label>
                  <span className="font-bold text-primary">{hoursPerWeekRepetitive} hrs</span>
                </div>
                <input 
                  type="range" 
                  min="2" 
                  max="30" 
                  value={hoursPerWeekRepetitive} 
                  onChange={(e) => setHoursPerWeekRepetitive(Number(e.target.value))} 
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="form-group">
                <div className="flex justify-between items-center mb-1">
                  <label className="form-label mb-0">Estimated Task Automation Rate (%)</label>
                  <span className="font-bold text-emerald-600">{automationPercent}%</span>
                </div>
                <input 
                  type="range" 
                  min="20" 
                  max="90" 
                  value={automationPercent} 
                  onChange={(e) => setAutomationPercent(Number(e.target.value))} 
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Monthly AI / Software Budget ($/mo)</label>
                <input 
                  type="number" 
                  value={aiToolCostMonthly} 
                  onChange={(e) => setAiToolCostMonthly(Number(e.target.value))} 
                  className="form-input" 
                />
              </div>
            </div>

            {/* RESULTS COLUMN */}
            <div className="calc-results">
              <div className="p-6 bg-slate-900 text-white rounded-xl shadow-xl space-y-4">
                <span className="text-xs uppercase font-bold text-emerald-400">Annual Value Created</span>
                
                <div>
                  <div className="text-xs text-slate-400">Net Labor Cost Savings / Year</div>
                  <div className="text-3xl font-bold text-emerald-400">${netAnnualSavings.toLocaleString()}</div>
                </div>

                <div className="border-t border-slate-800 pt-3">
                  <div className="text-xs text-slate-400">Total Engineering Hours Reclaimed</div>
                  <div className="text-2xl font-bold text-cyan-300">
                    {annualHoursSaved.toLocaleString()} Hours / Year
                  </div>
                </div>

                <div className="border-t border-slate-800 pt-3 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400">Software ROI:</span>
                    <div className="font-bold text-white text-base">{roiMultiplier}x</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Annual Software:</span>
                    <div className="font-bold text-white text-base">${annualToolCost.toLocaleString()}</div>
                  </div>
                </div>

                <Link href="/contact" className="btn btn-primary w-full text-center mt-4">
                  Request Automation Strategy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

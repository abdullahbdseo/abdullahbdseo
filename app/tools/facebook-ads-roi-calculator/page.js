"use client";

import { useState } from "react";
import Link from "next/link";

export default function FacebookAdsRoiCalculator() {
  const [adSpend, setAdSpend] = useState(2000);
  const [cpm, setCpm] = useState(18.50);
  const [ctr, setCtr] = useState(1.8);
  const [conversionRate, setConversionRate] = useState(2.8);
  const [aov, setAov] = useState(75);

  // Calculations
  const impressions = Math.round((adSpend / (cpm || 0.01)) * 1000);
  const linkClicks = Math.round(impressions * (ctr / 100));
  const cpc = linkClicks > 0 ? (adSpend / linkClicks).toFixed(2) : 0;
  const purchases = Math.round(linkClicks * (conversionRate / 100));
  const grossRevenue = purchases * aov;
  const netProfit = grossRevenue - adSpend;
  const roas = adSpend > 0 ? ((grossRevenue / adSpend) * 100).toFixed(0) : 0;
  const cpa = purchases > 0 ? (adSpend / purchases).toFixed(2) : 0;

  return (
    <div className="tool-single-page">
      <section className="page-header-section">
        <div className="container text-center">
          <Link href="/tools" className="tool-back-link"><i className="fa-solid fa-arrow-left"></i> All Tools</Link>
          <div className="sub-badge mt-2">Paid Social Simulator</div>
          <h1 className="page-title">Facebook & Meta Ads ROI Calculator</h1>
          <p className="page-subtitle max-w-2xl mx-auto">
            Forecast impressions, click-through rates, e-commerce purchases, and blended return on ad spend (ROAS).
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container max-w-4xl">
          <div className="calc-layout-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* INPUTS COLUMN */}
            <div className="calc-inputs md:col-span-2 space-y-4 bg-white p-6 border rounded shadow-sm">
              <div className="form-group">
                <label className="form-label">Monthly Meta Budget ($)</label>
                <input 
                  type="number" 
                  value={adSpend} 
                  onChange={(e) => setAdSpend(Number(e.target.value))} 
                  className="form-input" 
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Estimated CPM ($)</label>
                  <input 
                    type="number" 
                    step="0.5" 
                    value={cpm} 
                    onChange={(e) => setCpm(Number(e.target.value))} 
                    className="form-input" 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Click-Through Rate (CTR %)</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    value={ctr} 
                    onChange={(e) => setCtr(Number(e.target.value))} 
                    className="form-input" 
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Store Conv. Rate (%)</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    value={conversionRate} 
                    onChange={(e) => setConversionRate(Number(e.target.value))} 
                    className="form-input" 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Average Order Value ($)</label>
                  <input 
                    type="number" 
                    value={aov} 
                    onChange={(e) => setAov(Number(e.target.value))} 
                    className="form-input" 
                  />
                </div>
              </div>
            </div>

            {/* RESULTS COLUMN */}
            <div className="calc-results">
              <div className="p-6 bg-slate-900 text-white rounded-xl shadow-xl space-y-4">
                <span className="text-xs uppercase font-bold text-blue-400">Meta Campaign Projections</span>
                
                <div>
                  <div className="text-xs text-slate-400">Total Store Revenue</div>
                  <div className="text-3xl font-bold text-emerald-400">${grossRevenue.toLocaleString()}</div>
                </div>

                <div className="border-t border-slate-800 pt-3">
                  <div className="text-xs text-slate-400">Net Profit (Post-Ad Spend)</div>
                  <div className={`text-2xl font-bold ${netProfit >= 0 ? "text-white" : "text-rose-400"}`}>
                    ${netProfit.toLocaleString()}
                  </div>
                </div>

                <div className="border-t border-slate-800 pt-3 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400">ROAS:</span>
                    <div className="font-bold text-blue-300 text-base">{roas}%</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Purchases:</span>
                    <div className="font-bold text-white text-base">{purchases}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Est. CPC:</span>
                    <div className="font-bold text-white text-base">${cpc}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Cost / Purchase:</span>
                    <div className="font-bold text-white text-base">${cpa}</div>
                  </div>
                </div>

                <Link href="/services/ecommerce-seo" className="btn btn-primary w-full text-center mt-4">
                  Boost E-Commerce Organically
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

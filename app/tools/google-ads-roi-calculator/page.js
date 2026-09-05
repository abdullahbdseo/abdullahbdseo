"use client";

import { useState } from "react";
import Link from "next/link";

export default function GoogleAdsRoiCalculator() {
  const [adSpend, setAdSpend] = useState(2500);
  const [cpc, setCpc] = useState(2.50);
  const [conversionRate, setConversionRate] = useState(3.5);
  const [closeRate, setCloseRate] = useState(20);
  const [customerValue, setCustomerValue] = useState(850);

  // Calculations
  const clicks = Math.round(adSpend / (cpc || 0.01));
  const leads = Math.round(clicks * (conversionRate / 100));
  const customers = Math.round(leads * (closeRate / 100));
  const grossRevenue = customers * customerValue;
  const netProfit = grossRevenue - adSpend;
  const roas = adSpend > 0 ? ((grossRevenue / adSpend) * 100).toFixed(0) : 0;
  const costPerLead = leads > 0 ? (adSpend / leads).toFixed(2) : 0;
  const costPerAcquisition = customers > 0 ? (adSpend / customers).toFixed(2) : 0;

  return (
    <div className="tool-single-page">
      <section className="page-header-section">
        <div className="container text-center">
          <Link href="/tools" className="tool-back-link"><i className="fa-solid fa-arrow-left"></i> All Tools</Link>
          <div className="sub-badge mt-2">Paid Search Simulator</div>
          <h1 className="page-title">Google Ads ROI & ROAS Calculator</h1>
          <p className="page-subtitle max-w-2xl mx-auto">
            Model click volumes, lead conversion rates, customer lifetime value, and return on ad spend (ROAS).
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container max-w-4xl">
          <div className="calc-layout-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* INPUTS COLUMN */}
            <div className="calc-inputs md:col-span-2 space-y-4 bg-white p-6 border rounded shadow-sm">
              <div className="form-group">
                <label className="form-label">Monthly Ad Spend ($)</label>
                <input 
                  type="number" 
                  value={adSpend} 
                  onChange={(e) => setAdSpend(Number(e.target.value))} 
                  className="form-input" 
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Average CPC ($)</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    value={cpc} 
                    onChange={(e) => setCpc(Number(e.target.value))} 
                    className="form-input" 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Landing Page Conv. Rate (%)</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    value={conversionRate} 
                    onChange={(e) => setConversionRate(Number(e.target.value))} 
                    className="form-input" 
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Sales Close Rate (%)</label>
                  <input 
                    type="number" 
                    value={closeRate} 
                    onChange={(e) => setCloseRate(Number(e.target.value))} 
                    className="form-input" 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Average Customer LTV ($)</label>
                  <input 
                    type="number" 
                    value={customerValue} 
                    onChange={(e) => setCustomerValue(Number(e.target.value))} 
                    className="form-input" 
                  />
                </div>
              </div>
            </div>

            {/* RESULTS COLUMN */}
            <div className="calc-results">
              <div className="p-6 bg-slate-900 text-white rounded-xl shadow-xl space-y-4">
                <span className="text-xs uppercase font-bold text-cyan-400">Projected Performance</span>
                
                <div>
                  <div className="text-xs text-slate-400">Gross Revenue Generated</div>
                  <div className="text-3xl font-bold text-emerald-400">${grossRevenue.toLocaleString()}</div>
                </div>

                <div className="border-t border-slate-800 pt-3">
                  <div className="text-xs text-slate-400">Net Profit (After Ad Spend)</div>
                  <div className={`text-2xl font-bold ${netProfit >= 0 ? "text-white" : "text-rose-400"}`}>
                    ${netProfit.toLocaleString()}
                  </div>
                </div>

                <div className="border-t border-slate-800 pt-3 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400">ROAS:</span>
                    <div className="font-bold text-cyan-300 text-base">{roas}%</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Est. Clicks:</span>
                    <div className="font-bold text-white text-base">{clicks.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Cost / Lead:</span>
                    <div className="font-bold text-white text-base">${costPerLead}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Cost / Customer:</span>
                    <div className="font-bold text-white text-base">${costPerAcquisition}</div>
                  </div>
                </div>

                <Link href="/contact" className="btn btn-primary w-full text-center mt-4">
                  Complement with Organic SEO
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

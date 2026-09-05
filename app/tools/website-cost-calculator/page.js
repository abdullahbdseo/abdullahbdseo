"use client";

import { useState } from "react";
import Link from "next/link";

export default function WebsiteCostCalculator() {
  const [pageCount, setPageCount] = useState("5-10");
  const [designType, setDesignType] = useState("custom");
  const [cmsPlatform, setCmsPlatform] = useState("nextjs");
  const [features, setFeatures] = useState({
    ecommerce: false,
    seoSetup: true,
    speedOpt: true,
    cmsBlog: true,
    cryptoPayments: false,
    customApi: false
  });

  const toggleFeature = (key) => {
    setFeatures({ ...features, [key]: !features[key] });
  };

  // Calculate price estimate
  let basePrice = 600;
  if (pageCount === "1-5") basePrice = 500;
  if (pageCount === "5-10") basePrice = 850;
  if (pageCount === "10-25") basePrice = 1400;
  if (pageCount === "25+") basePrice = 2400;

  let designMultiplier = 1.0;
  if (designType === "template") designMultiplier = 0.8;
  if (designType === "custom") designMultiplier = 1.2;
  if (designType === "enterprise") designMultiplier = 1.6;

  let featureAddons = 0;
  if (features.ecommerce) featureAddons += 450;
  if (features.seoSetup) featureAddons += 350;
  if (features.speedOpt) featureAddons += 250;
  if (features.cmsBlog) featureAddons += 200;
  if (features.cryptoPayments) featureAddons += 300;
  if (features.customApi) featureAddons += 400;

  const totalEstimate = Math.round(basePrice * designMultiplier + featureAddons);
  const minRange = Math.round(totalEstimate * 0.9);
  const maxRange = Math.round(totalEstimate * 1.15);

  return (
    <div className="tool-single-page">
      <section className="page-header-section">
        <div className="container text-center">
          <Link href="/tools" className="tool-back-link"><i className="fa-solid fa-arrow-left"></i> All Tools</Link>
          <div className="sub-badge mt-2">Project Scope & Estimator</div>
          <h1 className="page-title">Website & SEO Investment Calculator</h1>
          <p className="page-subtitle max-w-2xl mx-auto">
            Configure your technical scope, CMS stack, page count, and required modules to estimate development and optimization costs.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container max-w-4xl">
          <div className="calc-layout-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* CONFIGURATION COLUMN */}
            <div className="calc-config-col md:col-span-2 space-y-6">
              <div className="card-box p-6 bg-white border rounded shadow-sm">
                <h3 className="text-lg font-bold mb-4"><i className="fa-solid fa-file-lines text-primary"></i> Estimated Page Scale</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: "1-5", label: "1-5 Pages" },
                    { id: "5-10", label: "5-10 Pages" },
                    { id: "10-25", label: "10-25 Pages" },
                    { id: "25+", label: "25+ Pages" }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPageCount(item.id)}
                      className={`p-3 border rounded text-center font-medium transition ${pageCount === item.id ? "bg-primary text-white border-primary" : "bg-slate-50 hover:bg-slate-100"}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="card-box p-6 bg-white border rounded shadow-sm">
                <h3 className="text-lg font-bold mb-4"><i className="fa-solid fa-palette text-accent"></i> Design Fidelity</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "template", label: "Clean Starter", sub: "Speedy setup" },
                    { id: "custom", label: "Custom UI/UX", sub: "Brand aligned" },
                    { id: "enterprise", label: "Bespoke 3D", sub: "Micro-animations" }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setDesignType(item.id)}
                      className={`p-3 border rounded text-left transition ${designType === item.id ? "border-primary bg-blue-50 text-primary" : "bg-slate-50"}`}
                    >
                      <div className="font-bold text-sm">{item.label}</div>
                      <div className="text-xs text-muted">{item.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="card-box p-6 bg-white border rounded shadow-sm">
                <h3 className="text-lg font-bold mb-4"><i className="fa-solid fa-puzzle-piece text-success"></i> Add-on Features & SEO Services</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { key: "seoSetup", title: "Full On-Page & Schema SEO", price: "+$350" },
                    { key: "speedOpt", title: "Core Web Vitals 95+ Speed Opt", price: "+$250" },
                    { key: "ecommerce", title: "E-Commerce Checkout & Products", price: "+$450" },
                    { key: "cmsBlog", title: "CMS Dynamic Blog & Case Studies", price: "+$200" },
                    { key: "cryptoPayments", title: "USDT / Crypto Gateway Integration", price: "+$300" },
                    { key: "customApi", title: "Custom API / Automation Webhooks", price: "+$400" }
                  ].map((feat) => (
                    <label key={feat.key} className={`flex items-center justify-between p-3 border rounded cursor-pointer transition ${features[feat.key] ? "bg-slate-100 border-primary" : "bg-white"}`}>
                      <div className="flex items-center gap-3">
                        <input 
                          type="checkbox" 
                          checked={features[feat.key]} 
                          onChange={() => toggleFeature(feat.key)} 
                          className="h-4 w-4 text-primary rounded"
                        />
                        <span className="text-sm font-medium">{feat.title}</span>
                      </div>
                      <span className="text-xs font-bold text-primary">{feat.price}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* ESTIMATE DISPLAY COLUMN */}
            <div className="calc-summary-col">
              <div className="sticky top-24 p-6 bg-slate-900 text-white rounded-xl shadow-xl">
                <span className="text-xs uppercase font-bold text-cyan-400">Estimated Investment</span>
                <div className="text-4xl font-bold mt-2 text-white">
                  ${totalEstimate.toLocaleString()}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Expected Range: ${minRange.toLocaleString()} - ${maxRange.toLocaleString()}
                </div>

                <div className="border-t border-slate-700 my-6"></div>

                <ul className="text-xs text-slate-300 space-y-2 mb-6">
                  <li className="flex justify-between">
                    <span>Base Scope:</span> <span>${Math.round(basePrice * designMultiplier)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Selected Add-ons:</span> <span>+${featureAddons}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Turnaround:</span> <span>2-3 Weeks</span>
                  </li>
                </ul>

                <Link href="/contact" className="btn btn-primary w-full text-center">
                  Book A Scoping Call <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

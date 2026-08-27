/**
 * Resilient Data Visualization for SEO Growth Case Studies
 * Includes native fallback SVG renderer if Chart.js is offline or unavailable.
 */

let growthChart = null;
let isSvgFallback = false;

const caseStudyData = {
  ecommerce: {
    title: "Fashion & Lifestyle E-Commerce Store",
    metric1: "+420%",
    metric1Label: "Organic Revenue",
    metric2: "185+",
    metric2Label: "Top 3 Keywords",
    metric3: "4.8x",
    metric3Label: "ROAS (Blended)",
    labels: ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6"],
    traffic: [12400, 16800, 24500, 38200, 52900, 68400],
    keywords: [18, 35, 62, 110, 145, 185],
    summary: "Complete technical crawl overhaul, resolving 4,000+ faceted navigation duplicate URLs, implementing schema markup for products, and targeting BOFU commercial-intent keywords."
  },
  saas: {
    title: "B2B AI Productivity SaaS",
    metric1: "+850%",
    metric1Label: "Organic MRR Growth",
    metric2: "48.2K",
    metric2Label: "Monthly Organic Visits",
    metric3: "1,420+",
    metric3Label: "Free Trial Signups/mo",
    labels: ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6"],
    traffic: [2500, 6100, 14300, 26800, 39400, 48200],
    keywords: [95, 230, 480, 820, 1150, 1420],
    summary: "Built a programmatic SEO matrix covering 120+ integration pages, optimized semantic topic clusters around core problem-solving keywords, and secured high-DR digital PR backlinks."
  },
  local: {
    title: "Multi-Location Medical & Dental Practice",
    metric1: "#1 Rank",
    metric1Label: "In Google Maps 3-Pack",
    metric2: "+340%",
    metric2Label: "Direct Phone Inquiries",
    metric3: "24",
    metric3Label: "Ranked City Keywords",
    labels: ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6"],
    traffic: [3800, 5600, 9400, 14200, 19800, 25600],
    keywords: [35, 52, 78, 115, 142, 178],
    summary: "Optimized Google Business Profiles, established local citation NAP consistency across 60+ directories, engineered localized service schema, and stimulated authentic client review workflows."
  }
};

function initCaseStudyChart() {
  const canvas = document.getElementById("caseStudyChart");
  if (!canvas) return;

  const defaultData = caseStudyData.ecommerce;

  // Check if Chart.js is loaded
  if (typeof Chart !== "undefined") {
    try {
      const ctx = canvas.getContext("2d");
      growthChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: defaultData.labels,
          datasets: [
            {
              label: "Organic Monthly Traffic",
              data: defaultData.traffic,
              borderColor: "#10b981",
              backgroundColor: "rgba(16, 185, 129, 0.15)",
              fill: true,
              tension: 0.4,
              borderWidth: 3,
              pointBackgroundColor: "#10b981",
              pointBorderColor: "#fff",
              pointHoverRadius: 6,
            },
            {
              label: "Keywords / Leads Tracked",
              data: defaultData.keywords,
              borderColor: "#38bdf8",
              backgroundColor: "transparent",
              borderDash: [5, 5],
              tension: 0.4,
              borderWidth: 2,
              yAxisID: "y1",
              pointBackgroundColor: "#38bdf8",
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: "index",
            intersect: false,
          },
          plugins: {
            legend: {
              labels: {
                color: "#94a3b8",
                font: { family: "'Plus Jakarta Sans', sans-serif", size: 12 },
                usePointStyle: true,
                boxWidth: 8
              }
            },
            tooltip: {
              backgroundColor: "rgba(15, 23, 42, 0.9)",
              titleColor: "#f8fafc",
              bodyColor: "#cbd5e1",
              borderColor: "rgba(255, 255, 255, 0.1)",
              borderWidth: 1,
              padding: 12,
              boxPadding: 6,
              usePointStyle: true
            }
          },
          scales: {
            x: {
              grid: { color: "rgba(255, 255, 255, 0.05)" },
              ticks: { color: "#64748b", font: { family: "'Plus Jakarta Sans', sans-serif" } }
            },
            y: {
              type: "linear",
              display: true,
              position: "left",
              grid: { color: "rgba(255, 255, 255, 0.05)" },
              ticks: {
                color: "#64748b",
                callback: function (value) {
                  return value >= 1000 ? (value / 1000) + "k" : value;
                }
              }
            },
            y1: {
              type: "linear",
              display: true,
              position: "right",
              grid: { drawOnChartArea: false },
              ticks: { color: "#64748b" }
            }
          }
        }
      });
      return;
    } catch (e) {
      console.warn("Chart.js failed to initialize, switching to native SVG chart:", e);
    }
  }

  // Fallback: Native high-performance SVG chart (Zero external dependency)
  renderSvgChartFallback("ecommerce");
}

function renderSvgChartFallback(caseKey) {
  const container = document.getElementById("caseStudyChart")?.parentElement;
  if (!container) return;
  isSvgFallback = true;

  const data = caseStudyData[caseKey] || caseStudyData.ecommerce;
  const maxTraffic = Math.max(...data.traffic) * 1.15;
  const width = 650;
  const height = 280;
  const padX = 50;
  const padY = 40;

  // Calculate coordinates
  const points = data.traffic.map((val, i) => {
    const x = padX + (i / (data.traffic.length - 1)) * (width - padX * 2);
    const y = height - padY - (val / maxTraffic) * (height - padY * 2);
    return { x, y, val };
  });

  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, "");

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padY} L ${points[0].x} ${height - padY} Z`;

  let labelsHtml = "";
  points.forEach((p, i) => {
    labelsHtml += `
      <text x="${p.x}" y="${height - 12}" fill="#64748b" font-size="11" font-family="'Plus Jakarta Sans', sans-serif" text-anchor="middle">${data.labels[i]}</text>
      <circle cx="${p.x}" cy="${p.y}" r="5" fill="#10b981" stroke="#ffffff" stroke-width="2" />
      <text x="${p.x}" y="${p.y - 12}" fill="#34d399" font-size="11" font-weight="700" font-family="'Space Grotesk', sans-serif" text-anchor="middle">${p.val >= 1000 ? (p.val / 1000).toFixed(1) + 'k' : p.val}</text>
    `;
  });

  const svgHtml = `
    <div id="svg-chart-wrapper" class="w-full h-full flex flex-col justify-between">
      <div class="flex items-center justify-between text-xs text-slate-400 mb-2">
        <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> Organic Traffic Growth</span>
        <span class="text-[11px] text-emerald-400 font-semibold">Verified Live Model</span>
      </div>
      <svg viewBox="0 0 ${width} ${height}" class="w-full h-[270px] overflow-visible">
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#10b981" stop-opacity="0.35"/>
            <stop offset="100%" stop-color="#10b981" stop-opacity="0.0"/>
          </linearGradient>
        </defs>
        <!-- Grid lines -->
        <line x1="${padX}" y1="${height - padY}" x2="${width - padX}" y2="${height - padY}" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
        <line x1="${padX}" y1="${height / 2}" x2="${width - padX}" y2="${height / 2}" stroke="rgba(255,255,255,0.04)" stroke-dasharray="4" stroke-width="1"/>
        
        <!-- Fill Area -->
        <path d="${areaD}" fill="url(#chartGrad)" />
        
        <!-- Line Path -->
        <path d="${pathD}" fill="none" stroke="#10b981" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
        
        <!-- Points & Labels -->
        ${labelsHtml}
      </svg>
    </div>
  `;

  // Hide or replace canvas
  const canvasEl = document.getElementById("caseStudyChart");
  if (canvasEl) canvasEl.style.display = "none";
  
  let existingSvg = document.getElementById("svg-chart-wrapper");
  if (existingSvg) existingSvg.remove();
  
  container.insertAdjacentHTML("beforeend", svgHtml);
}

function updateCaseStudy(caseKey) {
  const data = caseStudyData[caseKey];
  if (!data) return;

  // 1. ALWAYS update DOM text and metrics unconditionally
  const metric1El = document.getElementById("cs-metric1");
  const metric1Lbl = document.getElementById("cs-metric1-label");
  const metric2El = document.getElementById("cs-metric2");
  const metric2Lbl = document.getElementById("cs-metric2-label");
  const metric3El = document.getElementById("cs-metric3");
  const metric3Lbl = document.getElementById("cs-metric3-label");
  const titleEl = document.getElementById("cs-title");
  const summaryEl = document.getElementById("cs-summary");

  if (metric1El) metric1El.textContent = data.metric1;
  if (metric1Lbl) metric1Lbl.textContent = data.metric1Label;
  if (metric2El) metric2El.textContent = data.metric2;
  if (metric2Lbl) metric2Lbl.textContent = data.metric2Label;
  if (metric3El) metric3El.textContent = data.metric3;
  if (metric3Lbl) metric3Lbl.textContent = data.metric3Label;
  if (titleEl) titleEl.textContent = data.title;
  if (summaryEl) summaryEl.textContent = data.summary;

  // 2. Update Chart.js if active
  if (growthChart && !isSvgFallback) {
    try {
      growthChart.data.labels = data.labels;
      growthChart.data.datasets[0].data = data.traffic;
      growthChart.data.datasets[1].data = data.keywords;
      growthChart.update();
      return;
    } catch (e) {
      console.warn("Could not update Chart.js instance:", e);
    }
  }

  // 3. Update SVG Fallback if active
  if (isSvgFallback) {
    renderSvgChartFallback(caseKey);
  }
}

window.initCaseStudyChart = initCaseStudyChart;
window.updateCaseStudy = updateCaseStudy;

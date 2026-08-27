/**
 * Main Application Logic for Abdullah's SEO Specialist Portfolio
 * Fully integrated with LocalStorage, Interactive Modals, Smart Prefilling & Admin Sync
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Sync Portfolio Settings from Admin Panel if customized
  syncPortfolioSettings();

  // 2. Initialize Case Study Charts (Failsafe & Resilient)
  if (typeof initCaseStudyChart === "function") {
    try {
      initCaseStudyChart();
    } catch (err) {
      console.warn("Chart initialization notice:", err);
    }
  }

  // 3. Mobile Menu Toggle with Outside Click Closing
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle("hidden");
    });

    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });

    document.addEventListener("click", (e) => {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.add("hidden");
      }
    });
  }

  // 4. Navbar Scroll Glassmorphic Backdrop
  const navbar = document.getElementById("navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 40) {
        navbar.classList.add("bg-slate-950/95", "shadow-xl", "shadow-black/50", "border-b", "border-slate-800/80");
        navbar.classList.remove("bg-transparent");
      } else {
        navbar.classList.remove("bg-slate-950/95", "shadow-xl", "shadow-black/50", "border-b", "border-slate-800/80");
        navbar.classList.add("bg-transparent");
      }
    });
  }

  // 5. Stat Counter Animation on Scroll
  const counters = document.querySelectorAll(".stat-counter");
  let countersAnimated = false;

  const animateCounters = () => {
    if (countersAnimated) return;
    const heroSection = document.getElementById("hero");
    if (!heroSection) return;

    const rect = heroSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      counters.forEach(counter => {
        const target = +counter.getAttribute("data-target") || 0;
        const suffix = counter.getAttribute("data-suffix") || "";
        const prefix = counter.getAttribute("data-prefix") || "";
        const duration = 1600;
        const startTime = performance.now();

        const updateCount = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(easeProgress * target);

          counter.innerText = `${prefix}${current.toLocaleString()}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            counter.innerText = `${prefix}${target.toLocaleString()}${suffix}`;
          }
        };

        requestAnimationFrame(updateCount);
      });
      countersAnimated = true;
    }
  };

  window.addEventListener("scroll", animateCounters);
  animateCounters();

  // 6. Case Study Tab Switching
  const caseStudyTabs = document.querySelectorAll(".case-study-tab");
  caseStudyTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      caseStudyTabs.forEach(t => {
        t.classList.remove("active", "border-emerald-500", "text-emerald-400", "bg-emerald-500/10");
        t.classList.add("border-transparent", "text-slate-400", "hover:text-slate-200");
      });
      tab.classList.add("active", "border-emerald-500", "text-emerald-400", "bg-emerald-500/10");
      tab.classList.remove("border-transparent", "text-slate-400");

      const caseKey = tab.getAttribute("data-case");
      if (typeof updateCaseStudy === "function") {
        updateCaseStudy(caseKey);
      }
    });
  });

  // 7. Interactive SEO ROI Calculator
  const trafficInput = document.getElementById("calc-traffic");
  const convRateInput = document.getElementById("calc-conv-rate");
  const dealValueInput = document.getElementById("calc-deal-value");

  const trafficVal = document.getElementById("calc-traffic-val");
  const convRateVal = document.getElementById("calc-conv-rate-val");
  const dealValueVal = document.getElementById("calc-deal-value-val");

  const currentRevEl = document.getElementById("calc-current-revenue");
  const projectedRevEl = document.getElementById("calc-projected-revenue");
  const additionalRevEl = document.getElementById("calc-additional-revenue");

  function calculateROI() {
    if (!trafficInput || !convRateInput || !dealValueInput) return;

    const traffic = parseInt(trafficInput.value, 10);
    const convRate = parseFloat(convRateInput.value) / 100;
    const dealValue = parseFloat(dealValueInput.value);

    if (trafficVal) trafficVal.textContent = traffic.toLocaleString() + " visits/mo";
    if (convRateVal) convRateVal.textContent = (convRate * 100).toFixed(1) + "%";
    if (dealValueVal) dealValueVal.textContent = "$" + dealValue.toLocaleString();

    const currentLeads = traffic * convRate;
    const currentRevenue = Math.round(currentLeads * dealValue);

    const projectedTraffic = traffic * 2.8;
    const projectedLeads = projectedTraffic * (convRate * 1.15);
    const projectedRevenue = Math.round(projectedLeads * dealValue);
    const additionalRevenue = projectedRevenue - currentRevenue;

    if (currentRevEl) currentRevEl.textContent = "$" + currentRevenue.toLocaleString();
    if (projectedRevEl) projectedRevEl.textContent = "$" + projectedRevenue.toLocaleString();
    if (additionalRevEl) additionalRevEl.textContent = "+$" + additionalRevenue.toLocaleString() + "/mo";
  }

  if (trafficInput && convRateInput && dealValueInput) {
    trafficInput.addEventListener("input", calculateROI);
    convRateInput.addEventListener("input", calculateROI);
    dealValueInput.addEventListener("input", calculateROI);
    calculateROI();
  }

  // 8. Smart Prefilling: Service Buttons Click
  document.querySelectorAll("[data-service-btn]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const serviceName = btn.getAttribute("data-service-btn");
      const messageField = document.getElementById("contact-message");
      const nameField = document.getElementById("contact-name");
      if (messageField) {
        messageField.value = `Hi Abdullah,\n\nI would like to inquire about your "${serviceName}" service for my website. Please review our organic search potential.`;
      }
      setTimeout(() => {
        nameField?.focus();
      }, 400);
    });
  });

  // 9. Smart Prefilling: Pricing Buttons Click
  document.querySelectorAll("[data-pricing-tier]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const tier = btn.getAttribute("data-pricing-tier");
      const budgetSelect = document.getElementById("contact-budget");
      const messageField = document.getElementById("contact-message");
      const nameField = document.getElementById("contact-name");

      if (budgetSelect && messageField) {
        if (tier === "starter") {
          budgetSelect.value = "950-1500";
          messageField.value = "Hi Abdullah,\n\nI am interested in getting started with the Starter SEO Package ($950/mo) for our brand.";
        } else if (tier === "growth") {
          budgetSelect.value = "1850-3000";
          messageField.value = "Hi Abdullah,\n\nI would like to claim the Growth SEO Retainer ($1,850/mo) to scale our rankings and organic pipeline.";
        } else if (tier === "enterprise") {
          budgetSelect.value = "3500+";
          messageField.value = "Hi Abdullah,\n\nWe would like to discuss the Scale / Enterprise SEO Retainer ($3,500+/mo) for our multi-market platform.";
        }
      }
      setTimeout(() => {
        nameField?.focus();
      }, 400);
    });
  });

  // 10. Smart Prefilling: ROI Calculator CTA Click
  const calcInquireBtn = document.getElementById("calc-inquire-btn");
  if (calcInquireBtn) {
    calcInquireBtn.addEventListener("click", () => {
      const traffic = trafficVal ? trafficVal.textContent : "our current visits";
      const upside = additionalRevEl ? additionalRevEl.textContent : "the projected revenue upside";
      const messageField = document.getElementById("contact-message");
      const nameField = document.getElementById("contact-name");

      if (messageField) {
        messageField.value = `Hi Abdullah,\n\nBased on your SEO ROI calculator, our website currently receives ${traffic}. We would like to partner with you to unlock the estimated ${upside} organic pipeline potential.`;
      }
      setTimeout(() => {
        nameField?.focus();
      }, 400);
    });
  });

  // 11. Interactive Free SEO Audit Simulation & LocalStorage Lead Capture
  const auditForm = document.getElementById("quick-audit-form");
  const auditProgressContainer = document.getElementById("audit-progress-container");
  const auditProgressBar = document.getElementById("audit-progress-bar");
  const auditStatusText = document.getElementById("audit-status-text");
  const auditModal = document.getElementById("audit-modal");
  const closeModalBtn = document.getElementById("close-audit-modal");

  let latestAuditLeadId = null;

  const auditSteps = [
    { text: "Connecting to domain and checking SSL/DNS...", percent: 20 },
    { text: "Crawling site architecture & indexation...", percent: 45 },
    { text: "Benchmarking Core Web Vitals (LCP, CLS, INP)...", percent: 65 },
    { text: "Checking keyword intent gaps & backlinks...", percent: 85 },
    { text: "Finalizing custom audit overview...", percent: 100 }
  ];

  if (auditForm) {
    auditForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const websiteUrl = document.getElementById("audit-url").value.trim();
      const competitorUrl = document.getElementById("audit-competitor")?.value.trim() || "";
      const targetKeyword = document.getElementById("audit-keyword").value.trim();
      const userEmail = document.getElementById("audit-email").value.trim();

      if (!websiteUrl || !userEmail) {
        showToast("Please enter your website URL and email address.");
        return;
      }

      auditProgressContainer.classList.remove("hidden");
      auditForm.classList.add("opacity-50", "pointer-events-none");

      let currentStep = 0;

      const runStep = () => {
        if (currentStep < auditSteps.length) {
          const step = auditSteps[currentStep];
          auditProgressBar.style.width = step.percent + "%";
          auditStatusText.innerText = step.text;
          currentStep++;
          setTimeout(runStep, 600);
        } else {
          setTimeout(() => {
            auditProgressContainer.classList.add("hidden");
            auditForm.classList.remove("opacity-50", "pointer-events-none");

            // Save lead to LocalStorage for Admin Panel
            const leadRecord = {
              id: "audit_" + Date.now(),
              url: websiteUrl,
              competitor: competitorUrl,
              keyword: targetKeyword,
              email: userEmail,
              phone: "",
              score: 64,
              date: new Date().toLocaleString(),
              status: "New"
            };
            latestAuditLeadId = leadRecord.id;
            saveAuditLead(leadRecord);

            openAuditModal(websiteUrl, targetKeyword, userEmail);
          }, 400);
        }
      };

      runStep();
    });
  }

  function openAuditModal(url, keyword, email) {
    if (!auditModal) return;
    const modalUrl = document.getElementById("modal-domain-display");
    const modalKeyword = document.getElementById("modal-keyword-display");
    if (modalUrl) modalUrl.textContent = url;
    if (modalKeyword) modalKeyword.textContent = keyword || "General Organic Search";

    auditModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  if (closeModalBtn && auditModal) {
    closeModalBtn.addEventListener("click", () => {
      auditModal.classList.add("hidden");
      document.body.style.overflow = "auto";
    });

    auditModal.addEventListener("click", (e) => {
      if (e.target === auditModal) {
        auditModal.classList.add("hidden");
        document.body.style.overflow = "auto";
      }
    });
  }

  // Modal Phone / WhatsApp submit handler
  const modalBookingForm = document.getElementById("modal-booking-form");
  if (modalBookingForm) {
    modalBookingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const phoneInput = document.getElementById("modal-phone-input");
      const phoneVal = phoneInput ? phoneInput.value.trim() : "";

      if (latestAuditLeadId && phoneVal) {
        updateAuditLeadPhone(latestAuditLeadId, phoneVal);
      }

      auditModal.classList.add("hidden");
      document.body.style.overflow = "auto";
      showToast("Audit Report Reserved! Abdullah will email your comprehensive PDF & action plan shortly.");
      modalBookingForm.reset();
    });
  }

  // Download Sample Audit Report
  const downloadSampleBtn = document.getElementById("download-sample-audit");
  if (downloadSampleBtn) {
    downloadSampleBtn.addEventListener("click", () => {
      generateSampleAuditReport();
    });
  }

  // 12. Discovery Consultation Booking Modal
  const openBookingBtn = document.getElementById("open-booking-modal");
  const bookingModal = document.getElementById("booking-modal");
  const closeBookingModalBtn = document.getElementById("close-booking-modal");
  const discoveryBookingForm = document.getElementById("discovery-booking-form");

  if (openBookingBtn && bookingModal) {
    openBookingBtn.addEventListener("click", () => {
      const dateInput = document.getElementById("book-date");
      if (dateInput && !dateInput.value) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.value = tomorrow.toISOString().split("T")[0];
      }
      bookingModal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    });

    if (closeBookingModalBtn) {
      closeBookingModalBtn.addEventListener("click", () => {
        bookingModal.classList.add("hidden");
        document.body.style.overflow = "auto";
      });
    }

    bookingModal.addEventListener("click", (e) => {
      if (e.target === bookingModal) {
        bookingModal.classList.add("hidden");
        document.body.style.overflow = "auto";
      }
    });

    if (discoveryBookingForm) {
      discoveryBookingForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const date = document.getElementById("book-date")?.value;
        const time = document.getElementById("book-time")?.value;
        const name = document.getElementById("book-name")?.value.trim();
        const email = document.getElementById("book-email")?.value.trim();
        const website = document.getElementById("book-website")?.value.trim();
        const notes = document.getElementById("book-notes")?.value.trim();

        const bookingRecord = {
          id: "book_" + Date.now(),
          name,
          email,
          website,
          date,
          time,
          notes,
          created: new Date().toLocaleString(),
          status: "Confirmed"
        };

        saveBooking(bookingRecord);

        bookingModal.classList.add("hidden");
        document.body.style.overflow = "auto";
        discoveryBookingForm.reset();
        showToast("Session Confirmed! Your strategy consultation with Abdullah has been scheduled.");
      });
    }
  }

  // 13. FAQ Accordion Toggle
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const header = item.querySelector(".faq-header");
    if (header) {
      header.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        faqItems.forEach(i => {
          i.classList.remove("active");
          i.querySelector(".faq-icon")?.classList.remove("rotate-180");
        });

        if (!isActive) {
          item.classList.add("active");
          item.querySelector(".faq-icon")?.classList.add("rotate-180");
        }
      });
    }
  });

  // 14. Contact Form Submission & LocalStorage Persistence
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector("button[type='submit']");
      const originalText = submitBtn.innerHTML;

      const name = document.getElementById("contact-name")?.value.trim();
      const email = document.getElementById("contact-email")?.value.trim();
      const website = document.getElementById("contact-website")?.value.trim();
      const budget = document.getElementById("contact-budget")?.value;
      const message = document.getElementById("contact-message")?.value.trim();

      submitBtn.innerHTML = `<span class="inline-block animate-spin mr-2">⟳</span> Sending Inquiry...`;
      submitBtn.disabled = true;

      // Save inquiry to LocalStorage for Admin Panel
      const inquiryRecord = {
        id: "inq_" + Date.now(),
        name,
        email,
        website,
        budget,
        message,
        date: new Date().toLocaleString(),
        status: "New"
      };
      saveContactInquiry(inquiryRecord);

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        contactForm.reset();
        showToast("Success! Your message has been received by Abdullah. Expect a reply within 12 hours.");
      }, 1000);
    });
  }

  // 15. Dynamic Year Update
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 16. Helper: LocalStorage Lead Handlers
  function saveAuditLead(lead) {
    try {
      const leads = JSON.parse(localStorage.getItem("seo_audit_leads") || "[]");
      leads.unshift(lead);
      localStorage.setItem("seo_audit_leads", JSON.stringify(leads));
    } catch (e) {
      console.warn("LocalStorage save error:", e);
    }
  }

  function updateAuditLeadPhone(id, phone) {
    try {
      const leads = JSON.parse(localStorage.getItem("seo_audit_leads") || "[]");
      const idx = leads.findIndex(l => l.id === id);
      if (idx !== -1) {
        leads[idx].phone = phone;
        localStorage.setItem("seo_audit_leads", JSON.stringify(leads));
      }
    } catch (e) {
      console.warn("LocalStorage update error:", e);
    }
  }

  function saveContactInquiry(inquiry) {
    try {
      const inquiries = JSON.parse(localStorage.getItem("seo_contact_inquiries") || "[]");
      inquiries.unshift(inquiry);
      localStorage.setItem("seo_contact_inquiries", JSON.stringify(inquiries));
    } catch (e) {
      console.warn("LocalStorage save error:", e);
    }
  }

  function saveBooking(booking) {
    try {
      const bookings = JSON.parse(localStorage.getItem("seo_bookings") || "[]");
      bookings.unshift(booking);
      localStorage.setItem("seo_bookings", JSON.stringify(bookings));
    } catch (e) {
      console.warn("LocalStorage save error:", e);
    }
  }

  // 17. Sample SEO Audit Report Generator (Instant Download)
  function generateSampleAuditReport() {
    const reportContent = `
================================================================================
            PRELIMINARY SEO & CORE WEB VITALS AUDIT OVERVIEW
            Generated by: Abdullah — Senior SEO Growth Consultant
            Date: ${new Date().toLocaleDateString()}
================================================================================

1. EXECUTIVE HEALTH SUMMARY
   - Overall Organic Health Score: 64 / 100
   - Primary Bottle-neck: Crawl Budget Inefficiencies & Missing Structured Data
   - Target Growth Ceiling: +280% to +340% within 180 Days

2. CRITICAL TECHNICAL FINDINGS (HIGH PRIORITY)
   [!] Missing Canonical Tags on 14 Faceted Navigation filter parameters
   [!] Largest Contentful Paint (LCP) exceeds 3.8s on Mobile (Target: < 2.5s)
   [!] 32 Orphan Pages identified without contextual internal linking
   [!] Missing Organization & Product Schema.org JSON-LD

3. ON-PAGE & KEYWORD INTENT GAP
   - Missing Bottom-of-Funnel (BOFU) transactional landing pages
   - Keyword Cannibalization identified between blog posts and service pages
   - Competitors average 4.2x more topical authority depth on core clusters

4. RECOMMENDED 90-DAY ACTION BLUEPRINT
   Sprint 1: Resolve server response times and deploy automated Schema markup
   Sprint 2: Prune duplicate query URLs and build 3 semantic pillar silos
   Sprint 3: Acquire 5-8 Tier-1 Contextual Editorial Mentions (DR 60+)

For a 1-on-1 walkthrough of your customized ranking roadmap, schedule a session:
Email: abdullah.seo@example.com | WhatsApp: +1 800-555-0199
================================================================================
    `.trim();

    const blob = new Blob([reportContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `SEO_Audit_Report_Sample_${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("Sample Audit Report downloaded successfully!");
  }

  // 18. Synchronize Dynamic Settings from Admin Panel
  function syncPortfolioSettings() {
    try {
      const settings = JSON.parse(localStorage.getItem("seo_portfolio_settings") || "null");
      if (!settings) return;

      if (settings.specialistName) {
        document.title = `${settings.specialistName} | SEO Specialist & Organic Growth Consultant`;
      }
      if (settings.whatsappNumber) {
        const cleanNumber = settings.whatsappNumber.replace(/[^0-9]/g, "");
        const waLinks = document.querySelectorAll('a[href*="wa.me"]');
        waLinks.forEach(link => {
          link.href = `https://wa.me/${cleanNumber}`;
        });
      }
      if (settings.emailAddress) {
        const mailtoLinks = document.querySelectorAll('a[href*="mailto:"]');
        mailtoLinks.forEach(link => {
          link.href = `mailto:${settings.emailAddress}`;
          if (link.querySelector(".font-semibold.text-white")) {
            link.querySelector(".font-semibold.text-white").textContent = settings.emailAddress;
          }
        });
      }
      if (settings.growthPrice) {
        const growthPriceEl = document.getElementById("growth-price-val");
        if (growthPriceEl) growthPriceEl.textContent = "$" + settings.growthPrice;
      }
      if (settings.enterprisePrice) {
        const enterprisePriceEl = document.getElementById("enterprise-price-val");
        if (enterprisePriceEl) enterprisePriceEl.textContent = "$" + settings.enterprisePrice + "+";
      }
    } catch (e) {
      console.warn("Could not sync portfolio settings:", e);
    }
  }

  // 19. Toast Notification Helper
  function showToast(message) {
    const existing = document.getElementById("active-site-toast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.id = "active-site-toast";
    toast.className = "fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-slate-100 px-5 py-4 rounded-2xl border border-emerald-500/60 shadow-2xl shadow-emerald-950/60 text-sm font-medium transition-all duration-300 transform translate-y-10 opacity-0 max-w-md";
    toast.innerHTML = `
      <div class="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
      </div>
      <span class="leading-snug">${message}</span>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove("translate-y-10", "opacity-0");
    }, 50);

    setTimeout(() => {
      toast.classList.add("translate-y-10", "opacity-0");
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }
});

/**
 * Main Application Logic for SEO Specialist Portfolio
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Chart.js
  if (typeof initCaseStudyChart === "function") {
    initCaseStudyChart();
  }

  // 2. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    // Close menu when clicking on a link
    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }

  // 3. Navbar scroll effect
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("bg-slate-950/90", "shadow-lg", "shadow-black/40", "border-b", "border-slate-800/80");
      navbar.classList.remove("bg-transparent");
    } else {
      navbar.classList.remove("bg-slate-950/90", "shadow-lg", "shadow-black/40", "border-b", "border-slate-800/80");
      navbar.classList.add("bg-transparent");
    }
  });

  // 4. Counter Animation on Scroll
  const counters = document.querySelectorAll(".stat-counter");
  let countersAnimated = false;

  const animateCounters = () => {
    if (countersAnimated) return;
    const heroSection = document.getElementById("hero");
    if (!heroSection) return;

    const rect = heroSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        const suffix = counter.getAttribute("data-suffix") || "";
        const prefix = counter.getAttribute("data-prefix") || "";
        const duration = 1800; // ms
        const startTime = performance.now();

        const updateCount = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
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
  animateCounters(); // run initially if in view

  // 5. Case Study Tab Switching
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

  // 6. Interactive SEO ROI Calculator
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

    // Update labels
    if (trafficVal) trafficVal.textContent = traffic.toLocaleString() + " visits/mo";
    if (convRateVal) convRateVal.textContent = (convRate * 100).toFixed(1) + "%";
    if (dealValueVal) dealValueVal.textContent = "$" + dealValue.toLocaleString();

    // Baseline calculation
    const currentLeads = traffic * convRate;
    const currentRevenue = Math.round(currentLeads * dealValue);

    // Projected SEO Growth: Average 2.8x organic surge with optimized intent
    const projectedTraffic = traffic * 2.8;
    // Slight CRO uplift from qualified intent (+15%)
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

  // 7. Interactive Free SEO Audit Simulation
  const auditForm = document.getElementById("quick-audit-form");
  const auditProgressContainer = document.getElementById("audit-progress-container");
  const auditProgressBar = document.getElementById("audit-progress-bar");
  const auditStatusText = document.getElementById("audit-status-text");
  const auditModal = document.getElementById("audit-modal");
  const closeModalBtn = document.getElementById("close-audit-modal");

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
      const websiteUrl = document.getElementById("audit-url").value;
      const targetKeyword = document.getElementById("audit-keyword").value;
      const userEmail = document.getElementById("audit-email").value;

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
          setTimeout(runStep, 700);
        } else {
          setTimeout(() => {
            auditProgressContainer.classList.add("hidden");
            auditForm.classList.remove("opacity-50", "pointer-events-none");
            openAuditModal(websiteUrl, targetKeyword, userEmail);
          }, 500);
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

    // Close on background click
    auditModal.addEventListener("click", (e) => {
      if (e.target === auditModal) {
        auditModal.classList.add("hidden");
        document.body.style.overflow = "auto";
      }
    });
  }

  // 8. FAQ Accordion Toggle
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const header = item.querySelector(".faq-header");
    if (header) {
      header.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        // Close all other items
        faqItems.forEach(i => {
          i.classList.remove("active");
          i.querySelector(".faq-icon")?.classList.remove("rotate-180");
        });

        // Toggle clicked
        if (!isActive) {
          item.classList.add("active");
          item.querySelector(".faq-icon")?.classList.add("rotate-180");
        }
      });
    }
  });

  // 9. Contact Form & Lead Submission Toast
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector("button[type='submit']");
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = `<span class="inline-block animate-spin mr-2">⟳</span> Sending Inquiry...`;
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        contactForm.reset();
        showToast("Success! Your message has been received. I'll get back to you within 12 hours.");
      }, 1200);
    });
  }

  // Modal Consultation Booking form
  const modalBookingForm = document.getElementById("modal-booking-form");
  if (modalBookingForm) {
    modalBookingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      auditModal.classList.add("hidden");
      document.body.style.overflow = "auto";
      showToast("Audit Report reserved! I'll email your comprehensive PDF & action plan shortly.");
    });
  }

  // 10. Simple Toast Notification helper
  function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-slate-100 px-5 py-4 rounded-xl border border-emerald-500/50 shadow-2xl shadow-emerald-950/50 text-sm font-medium transition-all duration-300 transform translate-y-10 opacity-0";
    toast.innerHTML = `
      <div class="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
      </div>
      <span>${message}</span>
    `;

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.classList.remove("translate-y-10", "opacity-0");
    }, 100);

    // Animate out
    setTimeout(() => {
      toast.classList.add("translate-y-10", "opacity-0");
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }

  // 11. Dynamic Year Update
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

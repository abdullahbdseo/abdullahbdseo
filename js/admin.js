/**
 * Admin Portal Logic for Abdullah's SEO Studio
 * Handles PIN Authentication, Lead Management, Status Transitions, CSV Export & Settings Sync
 */

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const authScreen = document.getElementById("auth-screen");
  const adminDashboard = document.getElementById("admin-dashboard");
  const pinLoginForm = document.getElementById("pin-login-form");
  const adminPinInput = document.getElementById("admin-pin-input");
  const logoutBtn = document.getElementById("logout-btn");
  const seedBtn = document.getElementById("seed-test-data-btn");

  // View Message Modal Elements
  const viewMsgModal = document.getElementById("view-message-modal");
  const closeMsgModalBtn = document.getElementById("close-msg-modal");
  const modalClientName = document.getElementById("modal-client-name");
  const modalClientMeta = document.getElementById("modal-client-meta");
  const modalClientMsg = document.getElementById("modal-client-message");
  const modalReplyBtn = document.getElementById("modal-reply-btn");

  // 1. Check Login State
  function checkAuth() {
    const isLoggedIn = sessionStorage.getItem("admin_logged_in");
    if (isLoggedIn === "true") {
      authScreen.classList.add("hidden");
      adminDashboard.classList.remove("hidden");
      loadAllDashboardData();
    } else {
      authScreen.classList.remove("hidden");
      adminDashboard.classList.add("hidden");
      adminPinInput?.focus();
    }
  }

  // 2. PIN Login Form
  if (pinLoginForm) {
    pinLoginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const enteredPin = adminPinInput.value.trim();
      const savedPin = localStorage.getItem("seo_admin_pin") || "1234";

      if (enteredPin === savedPin) {
        sessionStorage.setItem("admin_logged_in", "true");
        adminPinInput.value = "";
        checkAuth();
      } else {
        alert("Incorrect Security PIN. (Default is 1234)");
        adminPinInput.value = "";
        adminPinInput.focus();
      }
    });
  }

  // 3. Logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      sessionStorage.removeItem("admin_logged_in");
      checkAuth();
    });
  }

  // 4. Tab Navigation
  const tabButtons = document.querySelectorAll(".admin-tab-btn");
  const tabContents = document.querySelectorAll(".admin-tab-content");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => {
        b.classList.remove("active", "border-emerald-500", "bg-emerald-500/10", "text-emerald-400");
        b.classList.add("border-transparent", "text-slate-400");
      });
      btn.classList.add("active", "border-emerald-500", "bg-emerald-500/10", "text-emerald-400");
      btn.classList.remove("border-transparent", "text-slate-400");

      const targetTabId = btn.getAttribute("data-tab");
      tabContents.forEach(content => {
        if (content.id === targetTabId) {
          content.classList.remove("hidden");
        } else {
          content.classList.add("hidden");
        }
      });
    });
  });

  // 5. Load All Dashboard Data
  function loadAllDashboardData() {
    renderAuditLeads();
    renderInquiries();
    renderBookings();
    updateStats();
    loadSettingsIntoForm();
  }

  // 6. Render Audit Leads Table
  function renderAuditLeads() {
    const tbody = document.getElementById("audits-table-body");
    const emptyState = document.getElementById("audits-empty-state");
    const badgeCount = document.getElementById("badge-audit-count");
    if (!tbody) return;

    const leads = JSON.parse(localStorage.getItem("seo_audit_leads") || "[]");
    if (badgeCount) badgeCount.textContent = leads.length;

    if (leads.length === 0) {
      tbody.innerHTML = "";
      emptyState?.classList.remove("hidden");
      return;
    }

    emptyState?.classList.add("hidden");
    tbody.innerHTML = leads.map(lead => {
      const cleanUrl = lead.url.replace(/^https?:\/\//, "");
      const fullUrl = lead.url.startsWith("http") ? lead.url : `https://${lead.url}`;
      const statusColor = lead.status === "Completed" ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
        : lead.status === "In Progress" ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
        : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";

      return `
        <tr class="hover:bg-slate-900/60 transition-colors">
          <td class="px-5 py-4 font-semibold text-white">
            <a href="${fullUrl}" target="_blank" rel="noopener" class="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
              <span>${cleanUrl}</span>
              <svg class="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            </a>
            ${lead.competitor ? `<span class="text-[10px] text-slate-500 block mt-0.5">vs ${lead.competitor}</span>` : ""}
          </td>
          <td class="px-5 py-4 text-slate-300">
            <span class="px-2 py-0.5 rounded-md bg-slate-800 text-[11px] font-medium border border-slate-700">${lead.keyword}</span>
          </td>
          <td class="px-5 py-4 text-slate-300">
            <a href="mailto:${lead.email}" class="hover:text-emerald-400 underline decoration-slate-700">${lead.email}</a>
          </td>
          <td class="px-5 py-4">
            ${lead.phone ? `<span class="text-emerald-400 font-mono font-semibold">${lead.phone}</span>` : `<span class="text-slate-500 italic">Not provided</span>`}
          </td>
          <td class="px-5 py-4 text-slate-400 text-[11px]">${lead.date}</td>
          <td class="px-5 py-4">
            <select onchange="window.updateLeadStatus('${lead.id}', this.value)" class="text-[11px] font-semibold px-2.5 py-1 rounded-full border ${statusColor} bg-slate-950 cursor-pointer focus:outline-none">
              <option value="New" ${lead.status === "New" ? "selected" : ""}>🟢 New</option>
              <option value="In Progress" ${lead.status === "In Progress" ? "selected" : ""}>🟡 In Progress</option>
              <option value="Completed" ${lead.status === "Completed" ? "selected" : ""}>🔵 Completed</option>
            </select>
          </td>
          <td class="px-5 py-4 text-right space-x-2">
            <a href="mailto:${lead.email}?subject=Your SEO Audit Results for ${cleanUrl}" class="p-1.5 rounded-lg bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-300 inline-block transition-colors" title="Send Email">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </a>
            <button onclick="window.deleteLead('${lead.id}')" class="p-1.5 rounded-lg bg-slate-800 hover:bg-red-500 hover:text-white text-slate-400 inline-block transition-colors" title="Delete Lead">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </td>
        </tr>
      `;
    }).join("");
  }

  // 7. Render Inquiries Table
  function renderInquiries() {
    const tbody = document.getElementById("inquiries-table-body");
    const emptyState = document.getElementById("inquiries-empty-state");
    const badgeCount = document.getElementById("badge-inquiry-count");
    if (!tbody) return;

    const inqs = JSON.parse(localStorage.getItem("seo_contact_inquiries") || "[]");
    if (badgeCount) badgeCount.textContent = inqs.length;

    if (inqs.length === 0) {
      tbody.innerHTML = "";
      emptyState?.classList.remove("hidden");
      return;
    }

    emptyState?.classList.add("hidden");
    tbody.innerHTML = inqs.map(inq => {
      const budgetBadge = inq.budget === "3500+" ? "text-purple-400 bg-purple-500/10 border-purple-500/30"
        : inq.budget === "1850-3000" ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
        : "text-slate-300 bg-slate-800 border-slate-700";

      return `
        <tr class="hover:bg-slate-900/60 transition-colors">
          <td class="px-5 py-4 font-semibold text-white">${inq.name}</td>
          <td class="px-5 py-4 text-slate-300">
            <a href="mailto:${inq.email}" class="hover:text-emerald-400 underline decoration-slate-700">${inq.email}</a>
          </td>
          <td class="px-5 py-4 text-slate-300">
            <a href="${inq.website.startsWith('http') ? inq.website : 'https://' + inq.website}" target="_blank" rel="noopener" class="hover:text-emerald-400 flex items-center gap-1">
              <span>${inq.website.replace(/^https?:\/\//, "")}</span>
              <svg class="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            </a>
          </td>
          <td class="px-5 py-4">
            <span class="px-2.5 py-1 rounded-md text-[11px] font-semibold border ${budgetBadge}">
              ${inq.budget === '3500+' ? '$3,500+/mo' : inq.budget === '1850-3000' ? '$1,850 - $3,000/mo' : '$950 - $1,500/mo'}
            </span>
          </td>
          <td class="px-5 py-4 text-slate-400 text-[11px]">${inq.date}</td>
          <td class="px-5 py-4">
            <select onchange="window.updateInquiryStatus('${inq.id}', this.value)" class="text-[11px] font-semibold px-2 py-1 rounded-full border border-slate-700 bg-slate-950 text-slate-300 cursor-pointer focus:outline-none">
              <option value="New" ${inq.status === "New" ? "selected" : ""}>🟢 New</option>
              <option value="Replied" ${inq.status === "Replied" ? "selected" : ""}>💬 Replied</option>
              <option value="Converted" ${inq.status === "Converted" ? "selected" : ""}>🏆 Converted</option>
              <option value="Archived" ${inq.status === "Archived" ? "selected" : ""}>📁 Archived</option>
            </select>
          </td>
          <td class="px-5 py-4 text-right space-x-2">
            <button onclick="window.viewMessage('${inq.id}')" class="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 inline-block transition-colors" title="Read Message">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
            </button>
            <button onclick="window.deleteInquiry('${inq.id}')" class="p-1.5 rounded-lg bg-slate-800 hover:bg-red-500 hover:text-white text-slate-400 inline-block transition-colors" title="Delete Inquiry">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </td>
        </tr>
      `;
    }).join("");
  }

  // 8. Render Bookings Table
  function renderBookings() {
    const tbody = document.getElementById("bookings-table-body");
    const emptyState = document.getElementById("bookings-empty-state");
    const badgeCount = document.getElementById("badge-booking-count");
    if (!tbody) return;

    const bookings = JSON.parse(localStorage.getItem("seo_bookings") || "[]");
    if (badgeCount) badgeCount.textContent = bookings.length;

    if (bookings.length === 0) {
      tbody.innerHTML = "";
      emptyState?.classList.remove("hidden");
      return;
    }

    emptyState?.classList.add("hidden");
    tbody.innerHTML = bookings.map(b => {
      return `
        <tr class="hover:bg-slate-900/60 transition-colors">
          <td class="px-5 py-4 font-semibold text-white">${b.name}</td>
          <td class="px-5 py-4 text-slate-300">
            <a href="mailto:${b.email}" class="hover:text-emerald-400 underline decoration-slate-700">${b.email}</a>
          </td>
          <td class="px-5 py-4 text-slate-300">${b.website || "-"}</td>
          <td class="px-5 py-4">
            <span class="px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/30 text-purple-400 font-semibold text-[11px]">
              📅 ${b.date} @ ${b.time}
            </span>
          </td>
          <td class="px-5 py-4 text-slate-400 text-xs max-w-xs truncate">${b.notes || "General Growth Session"}</td>
          <td class="px-5 py-4 text-emerald-400 font-semibold text-[11px]">${b.status || "Confirmed"}</td>
          <td class="px-5 py-4 text-right">
            <button onclick="window.deleteBooking('${b.id}')" class="p-1.5 rounded-lg bg-slate-800 hover:bg-red-500 hover:text-white text-slate-400 inline-block transition-colors" title="Delete Booking">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </td>
        </tr>
      `;
    }).join("");
  }

  // 9. Update Stats KPI Cards
  function updateStats() {
    const audits = JSON.parse(localStorage.getItem("seo_audit_leads") || "[]");
    const inqs = JSON.parse(localStorage.getItem("seo_contact_inquiries") || "[]");
    const bookings = JSON.parse(localStorage.getItem("seo_bookings") || "[]");

    const auditCountEl = document.getElementById("stat-total-audits");
    const inqCountEl = document.getElementById("stat-total-inquiries");
    const bookingCountEl = document.getElementById("stat-total-bookings");
    const pipeValueEl = document.getElementById("stat-pipeline-value");

    if (auditCountEl) auditCountEl.textContent = audits.length;
    if (inqCountEl) inqCountEl.textContent = inqs.length;
    if (bookingCountEl) bookingCountEl.textContent = bookings.length;

    // Calculate Pipeline Value based on budget selections
    let totalPipeline = 0;
    inqs.forEach(inq => {
      if (inq.budget === "3500+") totalPipeline += 4000;
      else if (inq.budget === "1850-3000") totalPipeline += 2400;
      else totalPipeline += 1200;
    });

    // Each audit lead is estimated at a $1,850 opportunity value
    totalPipeline += audits.length * 1850;

    if (pipeValueEl) pipeValueEl.textContent = "$" + totalPipeline.toLocaleString();
  }

  // 10. View Full Message Modal
  window.viewMessage = function(id) {
    const inqs = JSON.parse(localStorage.getItem("seo_contact_inquiries") || "[]");
    const inq = inqs.find(i => i.id === id);
    if (!inq || !viewMsgModal) return;

    modalClientName.textContent = inq.name;
    modalClientMeta.innerHTML = `
      <span>Website: <strong class="text-white">${inq.website}</strong></span> • 
      <span>Budget: <strong class="text-emerald-400">${inq.budget}</strong></span> • 
      <span>Received: ${inq.date}</span>
    `;
    modalClientMsg.textContent = inq.message;
    modalReplyBtn.href = `mailto:${inq.email}?subject=Re: SEO Growth Partnership inquiry for ${inq.website}`;

    viewMsgModal.classList.remove("hidden");
  };

  if (closeMsgModalBtn && viewMsgModal) {
    closeMsgModalBtn.addEventListener("click", () => {
      viewMsgModal.classList.add("hidden");
    });
    viewMsgModal.addEventListener("click", (e) => {
      if (e.target === viewMsgModal) viewMsgModal.classList.add("hidden");
    });
  }

  // 11. Delete & Status Updates
  window.deleteLead = function(id) {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    let leads = JSON.parse(localStorage.getItem("seo_audit_leads") || "[]");
    leads = leads.filter(l => l.id !== id);
    localStorage.setItem("seo_audit_leads", JSON.stringify(leads));
    renderAuditLeads();
    updateStats();
  };

  window.updateLeadStatus = function(id, newStatus) {
    let leads = JSON.parse(localStorage.getItem("seo_audit_leads") || "[]");
    const idx = leads.findIndex(l => l.id === id);
    if (idx !== -1) {
      leads[idx].status = newStatus;
      localStorage.setItem("seo_audit_leads", JSON.stringify(leads));
      renderAuditLeads();
    }
  };

  window.deleteInquiry = function(id) {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    let inqs = JSON.parse(localStorage.getItem("seo_contact_inquiries") || "[]");
    inqs = inqs.filter(i => i.id !== id);
    localStorage.setItem("seo_contact_inquiries", JSON.stringify(inqs));
    renderInquiries();
    updateStats();
  };

  window.updateInquiryStatus = function(id, newStatus) {
    let inqs = JSON.parse(localStorage.getItem("seo_contact_inquiries") || "[]");
    const idx = inqs.findIndex(i => i.id === id);
    if (idx !== -1) {
      inqs[idx].status = newStatus;
      localStorage.setItem("seo_contact_inquiries", JSON.stringify(inqs));
      renderInquiries();
    }
  };

  window.deleteBooking = function(id) {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    let bookings = JSON.parse(localStorage.getItem("seo_bookings") || "[]");
    bookings = bookings.filter(b => b.id !== id);
    localStorage.setItem("seo_bookings", JSON.stringify(bookings));
    renderBookings();
    updateStats();
  };

  // 12. Clear Buttons
  document.getElementById("clear-audits-btn")?.addEventListener("click", () => {
    if (confirm("Clear all SEO audit submissions?")) {
      localStorage.removeItem("seo_audit_leads");
      renderAuditLeads();
      updateStats();
    }
  });

  document.getElementById("clear-inquiries-btn")?.addEventListener("click", () => {
    if (confirm("Clear all contact inquiries?")) {
      localStorage.removeItem("seo_contact_inquiries");
      renderInquiries();
      updateStats();
    }
  });

  document.getElementById("clear-bookings-btn")?.addEventListener("click", () => {
    if (confirm("Clear all discovery call bookings?")) {
      localStorage.removeItem("seo_bookings");
      renderBookings();
      updateStats();
    }
  });

  // 13. Export to CSV Functions
  document.getElementById("export-audits-btn")?.addEventListener("click", () => {
    const leads = JSON.parse(localStorage.getItem("seo_audit_leads") || "[]");
    if (leads.length === 0) {
      alert("No audit leads to export.");
      return;
    }

    let csv = "ID,Domain,Competitor,Keyword,Email,Phone,Score,Date,Status\n";
    leads.forEach(l => {
      csv += `"${l.id}","${l.url}","${l.competitor || ''}","${l.keyword}","${l.email}","${l.phone || ''}","${l.score}","${l.date}","${l.status}"\n`;
    });

    downloadCsvFile(csv, `abdullah_seo_audits_${Date.now()}.csv`);
  });

  document.getElementById("export-inquiries-btn")?.addEventListener("click", () => {
    const inqs = JSON.parse(localStorage.getItem("seo_contact_inquiries") || "[]");
    if (inqs.length === 0) {
      alert("No contact inquiries to export.");
      return;
    }

    let csv = "ID,Name,Email,Website,Budget,Date,Status,Message\n";
    inqs.forEach(i => {
      const cleanMsg = (i.message || "").replace(/"/g, '""');
      csv += `"${i.id}","${i.name}","${i.email}","${i.website}","${i.budget}","${i.date}","${i.status}","${cleanMsg}"\n`;
    });

    downloadCsvFile(csv, `abdullah_seo_inquiries_${Date.now()}.csv`);
  });

  function downloadCsvFile(csvContent, filename) {
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // 14. Settings Form Handlers & Sync
  const settingsForm = document.getElementById("settings-form");

  function loadSettingsIntoForm() {
    const settings = JSON.parse(localStorage.getItem("seo_portfolio_settings") || "null");
    if (settings) {
      if (document.getElementById("set-name")) document.getElementById("set-name").value = settings.specialistName || "Abdullah";
      if (document.getElementById("set-email")) document.getElementById("set-email").value = settings.emailAddress || "abdullah.seo@example.com";
      if (document.getElementById("set-whatsapp")) document.getElementById("set-whatsapp").value = settings.whatsappNumber || "+1 800-555-0199";
      if (document.getElementById("set-growth-price")) document.getElementById("set-growth-price").value = settings.growthPrice || "1850";
      if (document.getElementById("set-enterprise-price")) document.getElementById("set-enterprise-price").value = settings.enterprisePrice || "3500";
    }
    const currentPin = localStorage.getItem("seo_admin_pin") || "1234";
    if (document.getElementById("set-pin")) document.getElementById("set-pin").value = currentPin;
  }

  if (settingsForm) {
    settingsForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const specialistName = document.getElementById("set-name").value.trim();
      const emailAddress = document.getElementById("set-email").value.trim();
      const whatsappNumber = document.getElementById("set-whatsapp").value.trim();
      const growthPrice = document.getElementById("set-growth-price").value.trim();
      const enterprisePrice = document.getElementById("set-enterprise-price").value.trim();
      const newPin = document.getElementById("set-pin").value.trim();

      const settingsObj = {
        specialistName,
        emailAddress,
        whatsappNumber,
        growthPrice,
        enterprisePrice
      };

      localStorage.setItem("seo_portfolio_settings", JSON.stringify(settingsObj));
      if (newPin) {
        localStorage.setItem("seo_admin_pin", newPin);
      }

      alert("Settings saved successfully! These changes will now be reflected on your public portfolio (index.html).");
    });
  }

  // 15. Seed Demo Data Helper (For testing convenience)
  if (seedBtn) {
    seedBtn.addEventListener("click", () => {
      const demoAudits = [
        {
          id: "audit_1700000001",
          url: "nordicgrowthlab.com",
          competitor: "rivalsaas.io",
          keyword: "B2B Lead Generation Tool",
          email: "frederik@nordicgrowthlab.com",
          phone: "+45 42 12 34 56",
          score: 61,
          date: new Date(Date.now() - 3600000 * 4).toLocaleString(),
          status: "New"
        },
        {
          id: "audit_1700000002",
          url: "urbanoptics-store.com",
          competitor: "eyewearhub.com",
          keyword: "Designer Blue Light Glasses",
          email: "claire.tan@urbanoptics-store.com",
          phone: "+1 (415) 882-9011",
          score: 58,
          date: new Date(Date.now() - 3600000 * 28).toLocaleString(),
          status: "In Progress"
        }
      ];

      const demoInquiries = [
        {
          id: "inq_1700000001",
          name: "Daniel Martinez",
          email: "dmartinez@velocitycrm.com",
          website: "velocitycrm.com",
          budget: "1850-3000",
          message: "Hi Abdullah,\n\nWe recently suffered a 35% drop in organic traffic after the latest Google core update. We are looking for an ongoing retainer to revamp our topical authority and audit our technical health. We are ready to start next week.",
          date: new Date(Date.now() - 3600000 * 12).toLocaleString(),
          status: "New"
        }
      ];

      const demoBookings = [
        {
          id: "book_1700000001",
          name: "Dr. Rachel Kim",
          email: "rachel@kimdentalcare.com",
          website: "kimdentalcare.com",
          date: new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0],
          time: "02:30 PM EST",
          notes: "Need Google Maps 3-pack optimization for 2 new clinic locations.",
          created: new Date().toLocaleString(),
          status: "Confirmed"
        }
      ];

      localStorage.setItem("seo_audit_leads", JSON.stringify(demoAudits));
      localStorage.setItem("seo_contact_inquiries", JSON.stringify(demoInquiries));
      localStorage.setItem("seo_bookings", JSON.stringify(demoBookings));

      loadAllDashboardData();
      alert("Demonstration test leads added! You can now test the tables, CSV export, and status switches.");
    });
  }

  // Initial Auth Check
  checkAuth();
});

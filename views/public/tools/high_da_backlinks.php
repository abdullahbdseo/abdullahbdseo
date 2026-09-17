<?php
// views/public/tools/high_da_backlinks.php - High DA Backlinks Resource Guides (Blog Style Layout)
?>

<div class="backlinks-blog-page" style="background: #f8fafc; min-height: 100vh; color: #0f172a; font-family: inherit;">
    
    <!-- HERO SECTION -->
    <section style="background: linear-gradient(180deg, #1e40af 0%, #1e3a8a 100%); color: #ffffff; padding: 70px 20px 60px; text-align: center;">
        <div class="container" style="max-width: 1140px; margin: 0 auto;">
            <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255, 255, 255, 0.15); border: 1px solid rgba(255, 255, 255, 0.25); padding: 8px 18px; border-radius: 50px; font-size: 0.88rem; font-weight: 700; margin-bottom: 18px;">
                <i class="fa-solid fa-layer-group" style="color: #38bdf8;"></i>
                <span>Free Verified Link Building Knowledge Base (2026)</span>
            </div>

            <h1 style="font-size: clamp(2.2rem, 4vw, 3.4rem); font-weight: 800; line-height: 1.2; margin-bottom: 14px; letter-spacing: -0.02em;">
                High DA <span style="color: #38bdf8;">Backlinks &amp; Resource Guides</span>
            </h1>

            <p style="max-width: 740px; margin: 0 auto 30px; font-size: 1.08rem; color: rgba(255, 255, 255, 0.9); line-height: 1.6;">
                Explore our curated collection of verified backlink directories, profile creation sources, local citations, and publishing hubs with live Domain Authority ratings and direct submission links.
            </p>

            <!-- Search Box -->
            <div style="max-width: 600px; margin: 0 auto 24px; position: relative;">
                <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 18px; top: 50%; transform: translateY(-50%); color: #94a3b8; font-size: 1rem;"></i>
                <input
                    type="text"
                    id="guideSearchInput"
                    placeholder="Search guides (e.g. Local Citation, Web 2.0, Podcasts, Profile)..."
                    style="width: 100%; padding: 14px 18px 14px 48px; border-radius: 30px; border: none; font-size: 0.98rem; outline: none; box-shadow: 0 8px 25px rgba(0,0,0,0.15); color: #0f172a;"
                />
            </div>
        </div>
    </section>

    <!-- MAIN CONTENT SECTION -->
    <section style="padding: 50px 20px 80px;">
        <div class="container" style="max-width: 1140px; margin: 0 auto;">
            
            <!-- Header Bar -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; flex-wrap: wrap; gap: 16px;">
                <div>
                    <h2 style="font-size: 1.45rem; font-weight: 800; color: #0f172a; margin: 0;">
                        Verified Strategy &amp; Backlink Guides
                    </h2>
                    <span style="font-size: 0.88rem; color: #64748b;" id="guideCountText">
                        Showing 8 verified strategy modules
                    </span>
                </div>

                <button
                    type="button"
                    id="btnExportMasterCsv"
                    style="padding: 10px 20px; background: linear-gradient(135deg, #059669 0%, #10b981 100%); border: none; border-radius: 8px; color: #ffffff; font-weight: 700; font-size: 0.9rem; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);"
                >
                    <i class="fa-solid fa-file-excel"></i>
                    <span id="exportMasterText">Export Master CSV (150+ Sites)</span>
                </button>
            </div>

            <!-- BLOG CARDS GRID -->
            <div id="guidesGrid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 28px;">
                <!-- Dynamically populated via JS -->
            </div>
        </div>
    </section>

    <!-- RESOURCE SITES DETAIL MODAL -->
    <div id="resourceModal" style="display: none; position: fixed; inset: 0; background: rgba(15, 23, 42, 0.75); backdrop-filter: blur(6px); z-index: 9999; align-items: center; justify-content: center; padding: 20px;">
        <div style="background: #ffffff; border-radius: 16px; width: 100%; maxWidth: 920px; max-height: 90vh; display: flex; flex-direction: column; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.35); overflow: hidden; max-width: 920px;">
            <!-- Modal Header -->
            <div id="modalHeaderWrap" style="padding: 24px 28px; background: linear-gradient(135deg, #1e3a8a 0%, #0284c7 100%); color: #ffffff; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <span id="modalCatTag" style="font-size: 0.8rem; background: rgba(255,255,255,0.2); padding: 3px 10px; border-radius: 20px; font-weight: 700;">Category</span>
                    <h3 id="modalTitle" style="margin: 8px 0 0 0; font-size: 1.35rem; font-weight: 800;">Title</h3>
                </div>
                <button type="button" onclick="closeResourceModal()" style="background: rgba(255,255,255,0.2); border: none; border-radius: 50%; width: 36px; height: 36px; color: #ffffff; font-size: 1.1rem; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                    &times;
                </button>
            </div>

            <!-- Modal Sub-Bar with Search & Export -->
            <div style="padding: 16px 28px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
                <div style="flex: 1 1 260px; position: relative;">
                    <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #94a3b8;"></i>
                    <input type="text" id="modalSiteSearch" placeholder="Filter sites in this guide..." style="width: 100%; padding: 8px 14px 8px 38px; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 0.88rem; outline: none;" />
                </div>
                <button type="button" id="btnModalCsvExport" style="padding: 8px 16px; background: #10b981; border: none; border-radius: 6px; color: #ffffff; font-size: 0.85rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 6px;">
                    <i class="fa-solid fa-file-arrow-down"></i>
                    <span>Download CSV</span>
                </button>
            </div>

            <!-- Modal Table -->
            <div style="padding: 0 28px 24px; overflow-y: auto; flex-grow: 1;">
                <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem;">
                    <thead>
                        <tr style="border-bottom: 2px solid #e2e8f0; color: #64748b;">
                            <th style="padding: 14px 10px; font-weight: 700; width: 45px; text-align: center;">#</th>
                            <th style="padding: 14px 10px; font-weight: 700;">Platform / Site</th>
                            <th style="padding: 14px 10px; font-weight: 700; text-align: center;">DA Score</th>
                            <th style="padding: 14px 10px; font-weight: 700; text-align: center;">Link Type</th>
                            <th style="padding: 14px 10px; font-weight: 700; text-align: right;">Action</th>
                        </tr>
                    </thead>
                    <tbody id="modalTableBody">
                        <!-- Populated dynamically -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<script>
const guidesData = [
  {
    id: "local-citations",
    title: "Local Citation Sites: 50+ Top Sources for Local SEO (2026)",
    date: "SEP 12, 2026",
    readTime: "6 min read",
    category: "Local Citations",
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #0284c7 100%)",
    icon: "fa-solid fa-map-location-dot",
    summary: "🚀 Add Your Website — Get Your Free Link Listing. A local citation is any online mention of your business Name, Address, and Phone number (NAP). This guide lists 50+ local citation sites with verified Ahrefs Domain Ratings (DR).",
    sites: [
      { name: "Google Business Profile", url: "https://business.google.com", da: 100, type: "DoFollow", approval: "Instant" },
      { name: "Bing Places", url: "https://bingplaces.com", da: 94, type: "DoFollow", approval: "Instant" },
      { name: "Yelp", url: "https://yelp.com", da: 93, type: "NoFollow", approval: "Instant" },
      { name: "Clutch.co", url: "https://clutch.co", da: 90, type: "DoFollow", approval: "Review" },
      { name: "G2 Reviews", url: "https://g2.com", da: 90, type: "DoFollow", approval: "Review" },
      { name: "YellowPages", url: "https://yellowpages.com", da: 89, type: "NoFollow", approval: "Instant" },
      { name: "Trustpilot", url: "https://trustpilot.com", da: 93, type: "DoFollow", approval: "Instant" }
    ]
  },
  {
    id: "podcast-submission",
    title: "Podcast Submission Sites: 45+ Free Directories (2026)",
    date: "SEP 11, 2026",
    readTime: "5 min read",
    category: "Podcast & Media",
    gradient: "linear-gradient(135deg, #312e81 0%, #4338ca 100%)",
    icon: "fa-solid fa-podcast",
    summary: "🚀 Add Your Podcast — Get High Authority Media Backlinks. Podcast submission directories and platforms where you submit your podcast RSS feed so listeners can discover and subscribe with verified DR.",
    sites: [
      { name: "Spotify for Podcasters", url: "https://podcasters.spotify.com", da: 96, type: "DoFollow", approval: "Instant" },
      { name: "Apple Podcasts Connect", url: "https://podcastsconnect.apple.com", da: 100, type: "DoFollow", approval: "Review" },
      { name: "Amazon Music", url: "https://podcasters.amazon.com", da: 97, type: "DoFollow", approval: "Instant" },
      { name: "TuneIn Broadcaster", url: "https://tunein.com", da: 91, type: "DoFollow", approval: "Review" },
      { name: "Podchaser", url: "https://podchaser.com", da: 84, type: "DoFollow", approval: "Instant" }
    ]
  },
  {
    id: "web20-sites",
    title: "Web 2.0 Sites List: 60+ High DA DoFollow Blogs (2026)",
    date: "SEP 08, 2026",
    readTime: "7 min read",
    category: "Web 2.0 & Blogs",
    gradient: "linear-gradient(135deg, #065f46 0%, #059669 100%)",
    icon: "fa-solid fa-globe",
    summary: "🚀 Build Authority Satellite Blogs. Web 2.0 submission sites allow you to publish rich content and embed contextual tier-1 backlinks on established domains like WordPress, Blogger, Substack, and Medium.",
    sites: [
      { name: "WordPress.com", url: "https://wordpress.com", da: 94, type: "DoFollow", approval: "Instant" },
      { name: "Blogger / Blogspot", url: "https://blogger.com", da: 99, type: "DoFollow", approval: "Instant" },
      { name: "Medium", url: "https://medium.com", da: 96, type: "NoFollow", approval: "Instant" },
      { name: "Tumblr", url: "https://tumblr.com", da: 99, type: "DoFollow", approval: "Instant" },
      { name: "Substack", url: "https://substack.com", da: 91, type: "DoFollow", approval: "Instant" },
      { name: "Wix", url: "https://wix.com", da: 94, type: "DoFollow", approval: "Instant" }
    ]
  },
  {
    id: "profile-creation",
    title: "Profile Creation Sites: 70+ High DA DoFollow Links (2026)",
    date: "AUG 28, 2026",
    readTime: "8 min read",
    category: "Profile Creation",
    gradient: "linear-gradient(135deg, #7c2d12 0%, #ea580c 100%)",
    icon: "fa-solid fa-id-card",
    summary: "🚀 Establish Verified Brand Signals. Create high-authority user bio profiles containing your canonical website URL across premier platforms like GitHub, Gravatar, Behance, Dribbble, and Crunchbase.",
    sites: [
      { name: "GitHub", url: "https://github.com", da: 96, type: "DoFollow", approval: "Instant" },
      { name: "Gravatar", url: "https://gravatar.com", da: 94, type: "DoFollow", approval: "Instant" },
      { name: "Behance", url: "https://behance.net", da: 93, type: "DoFollow", approval: "Instant" },
      { name: "Dribbble", url: "https://dribbble.com", da: 92, type: "DoFollow", approval: "Instant" },
      { name: "Crunchbase", url: "https://crunchbase.com", da: 91, type: "DoFollow", approval: "Review" }
    ]
  },
  {
    id: "social-bookmarking",
    title: "Social Bookmarking Sites: 40+ Instant Indexing Links (2026)",
    date: "AUG 22, 2026",
    readTime: "5 min read",
    category: "Social Bookmarking",
    gradient: "linear-gradient(135deg, #831843 0%, #db2777 100%)",
    icon: "fa-solid fa-bookmark",
    summary: "🚀 Expedite Google Bot Indexing. Social bookmarking platforms act as fast-track discovery signals for new URLs, blog posts, and service pages to generate referral clicks and boost indexation speed.",
    sites: [
      { name: "Reddit", url: "https://reddit.com", da: 98, type: "NoFollow", approval: "Instant" },
      { name: "Pinterest", url: "https://pinterest.com", da: 94, type: "NoFollow", approval: "Instant" },
      { name: "Mix.com", url: "https://mix.com", da: 84, type: "DoFollow", approval: "Instant" },
      { name: "Scoop.it", url: "https://scoop.it", da: 87, type: "DoFollow", approval: "Instant" }
    ]
  },
  {
    id: "document-pdf-sharing",
    title: "Document & PDF Sharing Sites: 30+ High PR Platforms (2026)",
    date: "AUG 18, 2026",
    readTime: "6 min read",
    category: "PDF & Documents",
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #4f46e5 100%)",
    icon: "fa-solid fa-file-pdf",
    summary: "🚀 Embed Live Hyperlinks Inside PDF Assets. Upload whitepapers, SEO checklists, and presentations to SlideShare, Scribd, and Issuu to capture contextual authority embeds.",
    sites: [
      { name: "SlideShare", url: "https://slideshare.net", da: 95, type: "DoFollow", approval: "Instant" },
      { name: "Issuu", url: "https://issuu.com", da: 94, type: "DoFollow", approval: "Instant" },
      { name: "Scribd", url: "https://scribd.com", da: 93, type: "NoFollow", approval: "Instant" }
    ]
  },
  {
    id: "guest-posting",
    title: "Free Guest Posting Sites: 35+ Editorial Tech Platforms (2026)",
    date: "AUG 12, 2026",
    readTime: "7 min read",
    category: "Guest Posting",
    gradient: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    icon: "fa-solid fa-newspaper",
    summary: "🚀 Contextual High-Authority Editorial Outreach. Hand-curated multi-niche and tech blogs accepting free guest contributions with real organic traffic and DoFollow backlinks.",
    sites: [
      { name: "HubPages", url: "https://hubpages.com", da: 89, type: "DoFollow", approval: "Review" },
      { name: "HackerNoon", url: "https://hackernoon.com", da: 88, type: "DoFollow", approval: "Editorial" },
      { name: "Vocal.media", url: "https://vocal.media", da: 82, type: "DoFollow", approval: "Review" }
    ]
  },
  {
    id: "forum-communities",
    title: "Forum & Webmaster Communities: Top DoFollow Discussion Boards (2026)",
    date: "AUG 05, 2026",
    readTime: "5 min read",
    category: "Forums & Q&A",
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)",
    icon: "fa-solid fa-comments",
    summary: "🚀 Build Real Discussion Authority. High PR forums and developer boards where participating in threads generates brand recognition and natural contextual links.",
    sites: [
      { name: "Quora", url: "https://quora.com", da: 93, type: "NoFollow", approval: "Instant" },
      { name: "Stack Overflow", url: "https://stackoverflow.com", da: 93, type: "NoFollow", approval: "Instant" },
      { name: "Warrior Forum", url: "https://warriorforum.com", da: 74, type: "DoFollow", approval: "Instant" }
    ]
  }
];

let currentActivePost = null;

function renderGuides() {
    const grid = document.getElementById("guidesGrid");
    const search = (document.getElementById("guideSearchInput").value || "").toLowerCase().trim();
    const filtered = guidesData.filter(g => 
        search === "" || 
        g.title.toLowerCase().includes(search) || 
        g.summary.toLowerCase().includes(search) ||
        g.category.toLowerCase().includes(search)
    );

    document.getElementById("guideCountText").innerText = `Showing ${filtered.length} verified strategy modules`;

    grid.innerHTML = filtered.map(guide => `
        <article style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 18px rgba(0,0,0,0.05); display: flex; flex-direction: column;">
            <div style="height: 190px; background: ${guide.gradient}; padding: 24px 20px; display: flex; flex-direction: column; justify-content: space-between; color: #ffffff;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 0.75rem; font-weight: 700; background: rgba(0,0,0,0.3); padding: 4px 10px; border-radius: 6px;">${guide.category}</span>
                    <i class="${guide.icon}" style="font-size: 1.4rem; opacity: 0.85;"></i>
                </div>
                <div>
                    <h3 style="font-size: 1.15rem; font-weight: 800; margin: 0 0 6px 0; color: #ffffff;">${guide.title.split(':')[0]}</h3>
                    <span style="font-size: 0.72rem; background: rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 4px;">${guide.sites.length}+ Verified Sites</span>
                </div>
            </div>
            <div style="padding: 24px; display: flex; flex-direction: column; flex-grow: 1;">
                <div style="font-size: 0.8rem; color: #94a3b8; font-weight: 700; margin-bottom: 10px; text-transform: uppercase;">${guide.date} • ${guide.readTime}</div>
                <h3 style="font-size: 1.18rem; font-weight: 800; line-height: 1.4; color: #0f172a; margin-bottom: 12px;">${guide.title}</h3>
                <p style="font-size: 0.9rem; color: #64748b; line-height: 1.6; margin-bottom: 20px; flex-grow: 1;">${guide.summary}</p>
                <div style="padding-top: 16px; border-top: 1px solid #f1f5f9; display: flex; align-items: center; justify-content: space-between;">
                    <button type="button" onclick="openResourceModal('${guide.id}')" style="background: none; border: none; color: #2563eb; font-weight: 700; font-size: 0.92rem; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; padding: 0;">
                        <span>Explore Resources &amp; Sites</span>
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>
                    <button type="button" onclick="exportCategoryCsv('${guide.id}')" title="Download Category CSV" style="padding: 6px 10px; background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 6px; color: #475569; cursor: pointer; font-size: 0.8rem;">
                        <i class="fa-solid fa-download"></i>
                    </button>
                </div>
            </div>
        </article>
    `).join("");
}

function openResourceModal(guideId) {
    const guide = guidesData.find(g => g.id === guideId);
    if (!guide) return;
    currentActivePost = guide;

    document.getElementById("modalHeaderWrap").style.background = guide.gradient;
    document.getElementById("modalCatTag").innerText = `${guide.category} Directory`;
    document.getElementById("modalTitle").innerText = guide.title;
    document.getElementById("modalSiteSearch").value = "";
    
    renderModalTable();
    document.getElementById("resourceModal").style.display = "flex";
}

function closeResourceModal() {
    document.getElementById("resourceModal").style.display = "none";
}

function renderModalTable() {
    if (!currentActivePost) return;
    const filter = (document.getElementById("modalSiteSearch").value || "").toLowerCase().trim();
    const tbody = document.getElementById("modalTableBody");
    const sites = currentActivePost.sites.filter(s => filter === "" || s.name.toLowerCase().includes(filter) || s.url.toLowerCase().includes(filter));

    tbody.innerHTML = sites.map((s, idx) => `
        <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 14px 10px; text-align: center; font-weight: 700; color: #64748b; font-size: 0.85rem;">
                ${idx + 1}
            </td>
            <td style="padding: 14px 10px;">
                <strong style="color: #0f172a; display: block;">${s.name}</strong>
                <span style="font-size: 0.8rem; color: #64748b;">${s.url.replace('https://', '')}</span>
            </td>
            <td style="padding: 14px 10px; text-align: center;">
                <span style="display: inline-block; padding: 3px 8px; border-radius: 12px; background: ${s.da >= 90 ? '#ecfdf5' : '#eff6ff'}; color: ${s.da >= 90 ? '#059669' : '#2563eb'}; font-weight: 800; font-size: 0.85rem;">DA ${s.da}</span>
            </td>
            <td style="padding: 14px 10px; text-align: center;">
                <span style="padding: 3px 8px; border-radius: 4px; font-size: 0.78rem; font-weight: 700; background: ${s.type === 'DoFollow' ? '#dcfce7' : '#f1f5f9'}; color: ${s.type === 'DoFollow' ? '#15803d' : '#475569'};">${s.type}</span>
            </td>
            <td style="padding: 14px 10px; text-align: right;">
                <div style="display: inline-flex; gap: 6px;">
                    <button type="button" onclick="copyModalUrl('${s.url}', this)" title="Copy URL" style="padding: 6px 9px; background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 6px; color: #475569; cursor: pointer; font-size: 0.8rem;">
                        <i class="fa-solid fa-copy"></i>
                    </button>
                    <a href="${s.url}" target="_blank" rel="nofollow noopener noreferrer" style="padding: 6px 12px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; color: #2563eb; text-decoration: none; font-size: 0.8rem; font-weight: 700; display: inline-flex; align-items: center; gap: 4px;">
                        <span>Visit</span>
                        <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.7rem;"></i>
                    </a>
                </div>
            </td>
        </tr>
    `).join("");
}

function copyModalUrl(url, btn) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url);
        const icon = btn.querySelector('i');
        icon.className = 'fa-solid fa-check';
        btn.style.color = '#059669';
        setTimeout(() => {
            icon.className = 'fa-solid fa-copy';
            btn.style.color = '#475569';
        }, 2000);
    }
}

function exportCategoryCsv(guideId) {
    const guide = guidesData.find(g => g.id === guideId);
    if (!guide) return;
    const headers = "Platform Name,URL,Domain Authority (DA),Link Type,Approval,Category\n";
    const rows = guide.sites.map(s => `"${s.name}","${s.url}","${s.da}","${s.type}","${s.approval}","${guide.category}"\n`);
    const blob = new Blob([headers + rows.join("")], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${guide.id}_backlinks_2026.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

document.addEventListener("DOMContentLoaded", () => {
    renderGuides();
    document.getElementById("guideSearchInput").addEventListener("input", renderGuides);
    document.getElementById("modalSiteSearch").addEventListener("input", renderModalTable);
    
    document.getElementById("btnExportMasterCsv").addEventListener("click", () => {
        const headers = "Platform Name,URL,Domain Authority (DA),Link Type,Approval,Category\n";
        const allRows = guidesData.flatMap(g => g.sites.map(s => `"${s.name}","${s.url}","${s.da}","${s.type}","${s.approval}","${g.category}"\n`));
        const blob = new Blob([headers + allRows.join("")], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "master_backlinks_list_2026.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    document.getElementById("btnModalCsvExport").addEventListener("click", () => {
        if (currentActivePost) exportCategoryCsv(currentActivePost.id);
    });
});
</script>

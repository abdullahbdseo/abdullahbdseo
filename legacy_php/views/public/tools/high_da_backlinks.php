<?php
// legacy_php/views/public/tools/high_da_backlinks.php - High DA Backlinks Resource Guides (Blog Style Layout)
?>

<div class="blog-page">
    
    <!-- HERO SECTION - Matching Site Theme -->
    <section class="blog-hero-section">
        <div class="container text-center">
            <span class="blog-badge">
                <i class="fa-solid fa-link" style="color: var(--digi-blue, #4361ee);"></i> High Authority Link Building Hub
            </span>
            <h1 class="blog-hero-title">
                High DA <span class="text-blue" style="background: linear-gradient(135deg, #4361ee 0%, #00d2d3 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Backlinks &amp; Resource Guides</span>
            </h1>
            <p class="blog-hero-subtitle">
                Curated directories, profile creation sources, Web 2.0 assets, local citations, and publishing hubs with live Domain Authority ratings and direct submission links.
            </p>

            <!-- Search Box -->
            <div class="blog-search-bar">
                <i class="fa-solid fa-magnifying-glass blog-search-icon"></i>
                <input
                    type="text"
                    id="guideSearchInput"
                    placeholder="Search by directory type, platform or niche (e.g. GitHub, Profile Creation, Local Citation)..."
                    class="blog-search-input"
                />
            </div>

            <!-- Filter Pills -->
            <div class="blog-filter-pills" id="guideFilterPills">
                <button type="button" class="blog-filter-pill active" data-cat="all">All Topics</button>
                <button type="button" class="blog-filter-pill" data-cat="Local Citations">Local Citations</button>
                <button type="button" class="blog-filter-pill" data-cat="Podcast & Media">Podcast & Media</button>
                <button type="button" class="blog-filter-pill" data-cat="Web 2.0 & Blogs">Web 2.0 & Blogs</button>
                <button type="button" class="blog-filter-pill" data-cat="Profile Creation">Profile Creation</button>
                <button type="button" class="blog-filter-pill" data-cat="Social Bookmarking">Social Bookmarking</button>
                <button type="button" class="blog-filter-pill" data-cat="PDF & Documents">PDF & Documents</button>
                <button type="button" class="blog-filter-pill" data-cat="Guest Posting">Guest Posting</button>
                <button type="button" class="blog-filter-pill" data-cat="Forums & Q&A">Forums & Q&A</button>
            </div>
        </div>
    </section>

    <!-- MAIN CONTENT SECTION -->
    <section style="padding: 50px 0 60px;">
        <div class="container">
            
            <!-- Header Bar -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; flex-wrap: wrap; gap: 16px;">
                <div>
                    <h2 style="font-size: 1.45rem; font-weight: 800; color: #0f172a; margin: 0; font-family: var(--font-heading);">
                        Latest Strategy &amp; Backlink Guides
                    </h2>
                    <span style="font-size: 0.88rem; color: var(--digi-text-muted, #64748b);" id="guideCountText">
                        Showing 8 verified strategy modules
                    </span>
                </div>

                <div style="display: inline-flex; align-items: center; gap: 8px; background: #eff6ff; border: 1px solid #dbeafe; padding: 8px 16px; border-radius: 6px; font-size: 0.85rem; font-weight: 700; color: #1e40af;">
                    <i class="fa-solid fa-circle-check" style="color: #10b981;"></i>
                    <span>100% Verified DA 80+ Sources</span>
                </div>
            </div>

            <!-- BLOG CARDS GRID -->
            <div id="guidesGrid" class="blog-posts-grid">
                <!-- Dynamically populated via JS -->
            </div>
        </div>
    </section>

    <!-- CTA SECTION -->
    <section style="padding: 0 0 80px;">
        <div class="container">
            <div style="background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #4361ee 100%); border-radius: 6px; padding: 44px; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 24px; box-shadow: 0 20px 40px rgba(67, 97, 238, 0.25);">
                <div style="maxWidth: 680px;">
                    <h3 style="font-size: 1.8rem; font-weight: 800; color: #ffffff; margin-bottom: 10px; line-height: 1.3;">
                        Need High-Tier Editorial Backlinks &amp; Digital PR?
                    </h3>
                    <p style="font-size: 1.05rem; color: rgba(255, 255, 255, 0.9); line-height: 1.6; margin: 0;">
                        Don't have time for manual submissions? Let Abdullah's link building team secure high-authority contextual backlinks that drive real keyword rank jumps.
                    </p>
                </div>
                <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                    <a href="/contact" style="padding: 14px 28px; background: #ffffff; color: #1e40af; font-weight: 800; font-size: 1rem; border-radius: 4px; text-decoration: none; box-shadow: 0 4px 15px rgba(0,0,0,0.15); display: inline-flex; align-items: center; gap: 8px;">
                        <span>Get Custom Link Plan</span>
                        <i class="fa-solid fa-arrow-right"></i>
                    </a>
                    <a href="/services" style="padding: 14px 24px; background: rgba(255, 255, 255, 0.15); border: 1px solid rgba(255, 255, 255, 0.3); color: #ffffff; font-weight: 700; font-size: 1rem; border-radius: 4px; text-decoration: none;">
                        View SEO Packages
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- RESOURCE SITES DETAIL MODAL -->
    <div id="resourceModal" style="display: none; position: fixed; inset: 0; background: rgba(15, 23, 42, 0.75); backdrop-filter: blur(6px); z-index: 9999; align-items: center; justify-content: center; padding: 20px;">
        <div style="background: #ffffff; border-radius: 8px; width: 100%; max-width: 960px; max-height: 92vh; display: flex; flex-direction: column; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.35); overflow: hidden;">
            <!-- Modal Header -->
            <div id="modalHeaderWrap" style="padding: 24px 28px; background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #4361ee 100%); color: #ffffff; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <span id="modalCatTag" style="font-size: 0.8rem; background: rgba(255,255,255,0.2); padding: 3px 10px; border-radius: 4px; font-weight: 700;">Category</span>
                    <h3 id="modalTitle" style="margin: 8px 0 0 0; font-size: 1.35rem; font-weight: 800;">Title</h3>
                </div>
                <button type="button" onclick="closeResourceModal()" style="background: rgba(255,255,255,0.2); border: none; border-radius: 4px; width: 36px; height: 36px; color: #ffffff; font-size: 1.2rem; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                    &times;
                </button>
            </div>

            <!-- Business Highlight Section inside Modal -->
            <div style="padding: 16px 28px; background: linear-gradient(135deg, #eff6ff 0%, #ffffff 100%); border-bottom: 1px solid #dbeafe; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
                <div style="flex: 1 1 500px;">
                    <strong style="font-size: 0.92rem; color: #1e40af; display: flex; align-items: center; gap: 6px; marginBottom: 4px;">
                        <i class="fa-solid fa-shield-halved" style="color: #4361ee;"></i>
                        Abdullah BD SEO Managed Link Building Standards
                    </strong>
                    <p style="margin: 0; font-size: 0.82rem; color: #475569; line-height: 1.5;">
                        Every platform is 100% manually curated, spam-audited, and designed to establish strong entity signals for Google Knowledge Graph &amp; Top SERP rankings.
                    </p>
                </div>
                <a href="/contact" style="padding: 8px 18px; background: #4361ee; color: #ffffff; border-radius: 4px; font-size: 0.85rem; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 8px rgba(67, 97, 238, 0.3);">
                    <span>Hire Abdullah BD SEO</span>
                    <i class="fa-solid fa-arrow-right"></i>
                </a>
            </div>

            <!-- Modal Sub-Bar with Search -->
            <div style="padding: 14px 28px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
                <div style="flex: 1 1 300px; position: relative;">
                    <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #94a3b8;"></i>
                    <input type="text" id="modalSiteSearch" placeholder="Filter platforms by name or URL (e.g. GitHub, Gravatar)..." style="width: 100%; padding: 8px 14px 8px 38px; border-radius: 4px; border: 1px solid #cbd5e1; font-size: 0.88rem; outline: none;" />
                </div>
                <span id="modalSiteCountText" style="font-size: 0.82rem; color: #64748b; font-weight: 600;">Showing verified platforms</span>
            </div>

            <!-- Modal Table -->
            <div style="padding: 0 28px 24px; overflow-y: auto; flex-grow: 1;">
                <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem;">
                    <thead>
                        <tr style="border-bottom: 2px solid #e2e8f0; color: #64748b;">
                            <th style="padding: 14px 10px; font-weight: 700;">Platform / Site</th>
                            <th style="padding: 14px 10px; font-weight: 700; text-align: center;">DA Score</th>
                            <th style="padding: 14px 10px; font-weight: 700; text-align: center;">Link Type</th>
                            <th style="padding: 14px 10px; font-weight: 700; text-align: center;">Approval</th>
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
    id: "profile-creation",
    slug: "profile-creation-sites-list-high-da-2026",
    title: "Profile Creation Sites: 70+ High DA DoFollow Links for Brand Authority (2026)",
    image: "/images/backlinks/profile_creation.jpg",
    category: "Profile Creation"
  },
  {
    id: "local-citations",
    slug: "local-citation-sites-list-2026",
    title: "Local Citation Sites: 50+ Top Sources for Local SEO (2026)",
    image: "/images/backlinks/local_citations.jpg",
    category: "Local Citations"
  },
  {
    id: "podcast-submission",
    slug: "podcast-submission-sites-free-directories-2026",
    title: "Podcast Submission Sites: 45+ Free Directories (2026)",
    image: "/images/backlinks/podcast_submission.jpg",
    category: "Podcast & Media"
  },
  {
    id: "web20-sites",
    slug: "web-20-submission-sites-high-da-2026",
    title: "Web 2.0 Sites List: 60+ High DA DoFollow Blogs (2026)",
    image: "/images/backlinks/web20_blogs.jpg",
    category: "Web 2.0 & Blogs"
  },
  {
    id: "social-bookmarking",
    slug: "social-bookmarking-sites-list-2026",
    title: "Social Bookmarking Sites: 40+ Instant Indexing Links (2026)",
    image: "/images/backlinks/social_bookmarking.jpg",
    category: "Social Bookmarking"
  },
  {
    id: "document-pdf-sharing",
    slug: "pdf-document-sharing-sites-list-2026",
    title: "Document & PDF Sharing Sites: 30+ High PR Platforms (2026)",
    image: "/images/backlinks/pdf_document_sharing.jpg",
    category: "PDF & Documents"
  },
  {
    id: "guest-posting",
    slug: "free-guest-posting-sites-list-2026",
    title: "Free Guest Posting Sites: 35+ Editorial Tech Platforms (2026)",
    image: "/images/backlinks/guest_posting.jpg",
    category: "Guest Posting"
  },
  {
    id: "forum-communities",
    slug: "forum-posting-sites-list-2026",
    title: "Forum & Webmaster Communities: Top DoFollow Discussion Boards (2026)",
    image: "/images/backlinks/forum_communities.jpg",
    category: "Forums & Q&A"
  }
];

let currentCatFilter = "all";

function renderGuides() {
    const grid = document.getElementById("guidesGrid");
    const search = (document.getElementById("guideSearchInput").value || "").toLowerCase().trim();
    const filtered = guidesData.filter(g => {
        const matchCat = currentCatFilter === "all" || g.category === currentCatFilter;
        const matchSearch = search === "" || 
            g.title.toLowerCase().includes(search) || 
            g.category.toLowerCase().includes(search);
        return matchCat && matchSearch;
    });

    document.getElementById("guideCountText").innerText = `Showing ${filtered.length} verified strategy modules`;

    grid.innerHTML = filtered.map(guide => `
        <article class="blog-card" style="display: flex; flex-direction: column;">
            <div class="blog-card-image-wrap" style="height: 220px; position: relative;">
                <a href="/high-da-backlinks/${guide.slug}" target="_blank" rel="noopener noreferrer" style="display: block; width: 100%; height: 100%;">
                    <img src="${guide.image}" alt="${guide.title}" class="blog-card-img" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
                </a>
            </div>
            <div class="blog-card-body" style="padding: 20px 22px; flex-grow: 1; display: flex; align-items: center;">
                <h3 class="blog-card-title" style="margin: 0; font-size: 1.08rem; font-weight: 700; line-height: 1.45;">
                    <a href="/high-da-backlinks/${guide.slug}" target="_blank" rel="noopener noreferrer" style="color: #0f172a; text-decoration: none;">
                        ${guide.title}
                    </a>
                </h3>
            </div>
        </article>
    `).join("");
}

function openResourceModal(guideId) {
    const guide = guidesData.find(g => g.id === guideId);
    if (!guide) return;
    currentActivePost = guide;

    document.getElementById("modalHeaderWrap").style.background = guide.gradient;
    document.getElementById("modalCatTag").innerText = `${guide.category} Master Directory`;
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

    document.getElementById("modalSiteCountText").innerText = `Showing ${sites.length} of ${currentActivePost.sites.length} Verified Sites`;

    tbody.innerHTML = sites.map(s => `
        <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 14px 10px;">
                <strong style="color: #0f172a; display: block;">${s.name}</strong>
                <span style="font-size: 0.8rem; color: #64748b;">${s.url.replace('https://', '')}</span>
            </td>
            <td style="padding: 14px 10px; text-align: center;">
                <span style="display: inline-block; padding: 3px 8px; border-radius: 4px; background: ${s.da >= 90 ? '#ecfdf5' : '#eff6ff'}; color: ${s.da >= 90 ? '#059669' : '#4361ee'}; font-weight: 800; font-size: 0.85rem;">DA ${s.da}</span>
            </td>
            <td style="padding: 14px 10px; text-align: center;">
                <span style="padding: 3px 8px; border-radius: 4px; font-size: 0.78rem; font-weight: 700; background: ${s.type === 'DoFollow' ? '#dcfce7' : '#f1f5f9'}; color: ${s.type === 'DoFollow' ? '#15803d' : '#475569'};">${s.type}</span>
            </td>
            <td style="padding: 14px 10px; text-align: center; color: #64748b; font-size: 0.85rem;">
                <i class="fa-solid fa-bolt" style="color: #f59e0b; margin-right: 4px;"></i>${s.approval}
            </td>
            <td style="padding: 14px 10px; text-align: right;">
                <div style="display: inline-flex; gap: 6px;">
                    <button type="button" onclick="copyModalUrl('${s.url}', this)" title="Copy URL" style="padding: 6px 9px; background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 4px; color: #475569; cursor: pointer; font-size: 0.8rem;">
                        <i class="fa-solid fa-copy"></i>
                    </button>
                    <a href="${s.url}" target="_blank" rel="nofollow noopener noreferrer" style="padding: 6px 12px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 4px; color: #4361ee; text-decoration: none; font-size: 0.8rem; font-weight: 700; display: inline-flex; align-items: center; gap: 4px;">
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

document.addEventListener("DOMContentLoaded", () => {
    renderGuides();
    const searchInput = document.getElementById("guideSearchInput");
    if (searchInput) searchInput.addEventListener("input", renderGuides);
    const modalSearch = document.getElementById("modalSiteSearch");
    if (modalSearch) modalSearch.addEventListener("input", renderModalTable);
    
    document.querySelectorAll(".blog-filter-pill").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".blog-filter-pill").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentCatFilter = btn.getAttribute("data-cat");
            renderGuides();
        });
    });
});
</script>


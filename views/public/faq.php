<?php
// views/public/faq.php - Frequently Asked Questions (Digi Solution Theme)

$siteName = setting('site_name', 'Abdullah Saleh');
$contactEmail = setting('contact_email', 'abdullahbd.seo@gmail.com');
$whatsappNumber = setting('whatsapp_number', '+8801670769816');

// Group FAQs by category if available, or compute category counts
$categories = [];
$totalFaqs = count($faqs ?? []);

foreach ($faqs as $f) {
    $cat = !empty($f['category']) ? $f['category'] : 'General SEO';
    if (!isset($categories[$cat])) {
        $categories[$cat] = 0;
    }
    $categories[$cat]++;
}

// Generate Google FAQPage JSON-LD Schema
$schemaFaqs = [];
foreach ($faqs as $f) {
    $schemaFaqs[] = [
        '@type' => 'Question',
        'name' => $f['question'],
        'acceptedAnswer' => [
            '@type' => 'Answer',
            'text' => strip_tags($f['answer'])
        ]
    ];
}

$faqJsonLd = [
    '@context' => 'https://schema.org',
    '@type' => 'FAQPage',
    'mainEntity' => $schemaFaqs
];
?>

<!-- Schema.org JSON-LD for Google Rich Snippets -->
<script type="application/ld+json">
<?= json_encode($faqJsonLd, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) ?>
</script>

<!-- FAQ Hero Section -->
<section class="faq-hero-section">
    <div class="container" style="text-align: center; position: relative; z-index: 2;">
        <!-- Breadcrumbs -->
        <div class="faq-breadcrumb">
            <a href="<?= url('/') ?>"><i class="fa-solid fa-house" style="font-size: 0.8rem;"></i> Home</a>
            <span>/</span>
            <span style="color: var(--digi-blue); font-weight: 600;">Help & FAQs</span>
        </div>

        <span class="faq-hero-badge">
            <i class="fa-solid fa-circle-question"></i> Help Center & FAQs
        </span>

        <h1 class="faq-hero-title">
            Frequently Asked <span class="text-blue">Questions</span>
        </h1>

        <p class="faq-hero-desc">
            Clear, transparent answers regarding our data-driven SEO processes, ranking timelines, technical audit deliverables, and consulting engagement workflows.
        </p>

        <!-- Live Search Bar -->
        <div class="faq-search-wrapper">
            <div class="faq-search-box">
                <i class="fa-solid fa-magnifying-glass faq-search-icon"></i>
                <input 
                    type="text" 
                    id="faqSearchInput" 
                    class="faq-search-input" 
                    placeholder="Search any question, keyword, or topic (e.g. ranking timeline, audit, backlinks)..." 
                    autocomplete="off"
                    aria-label="Search FAQs"
                >
                <button type="button" id="faqSearchClear" class="faq-search-clear" aria-label="Clear search">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>

        <!-- Category Filter Tabs -->
        <?php if (!empty($categories)): ?>
            <div class="faq-filter-nav" id="faqFilterNav">
                <button type="button" class="faq-filter-btn active" data-filter="all">
                    <i class="fa-solid fa-layer-group"></i> All Questions <span class="filter-count"><?= $totalFaqs ?></span>
                </button>
                <?php foreach ($categories as $catName => $count): ?>
                    <button type="button" class="faq-filter-btn" data-filter="<?= e($catName) ?>">
                        <?= e($catName) ?> <span class="filter-count"><?= $count ?></span>
                    </button>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>

        <!-- Trust Badges Strip -->
        <div class="faq-trust-strip">
            <div class="faq-trust-item">
                <i class="fa-solid fa-circle-check"></i> 100% White-Hat Methodologies
            </div>
            <div class="faq-trust-item">
                <i class="fa-solid fa-shield-halved"></i> Secure Crypto & bKash Checkout
            </div>
            <div class="faq-trust-item">
                <i class="fa-solid fa-file-video"></i> Detailed PDF & Loom Deliverables
            </div>
        </div>
    </div>
</section>

<!-- Main FAQ Section -->
<section class="faq-main-section">
    <div class="container">
        <div class="faq-container-narrow">

            <!-- Controls Toolbar -->
            <div class="faq-toolbar">
                <div class="faq-results-counter">
                    Showing <strong id="faqResultsCount"><?= $totalFaqs ?></strong> of <strong><?= $totalFaqs ?></strong> Questions
                </div>
                <button type="button" class="faq-toggle-all-btn" id="faqToggleAll" title="Expand or collapse all answers">
                    <i class="fa-solid fa-angles-down" id="faqToggleIcon"></i>
                    <span id="faqToggleText">Expand All</span>
                </button>
            </div>

            <!-- Accordion List -->
            <div class="faq-accordion" id="faqAccordionList">
                <?php foreach ($faqs as $idx => $faq): 
                    $category = !empty($faq['category']) ? $faq['category'] : 'General SEO';
                ?>
                    <div 
                        class="faq-item <?= $idx === 0 ? 'active' : '' ?>" 
                        data-category="<?= e($category) ?>"
                        data-search="<?= strtolower(e($faq['question'] . ' ' . strip_tags($faq['answer']) . ' ' . $category)) ?>"
                        id="faq-item-<?= $idx + 1 ?>"
                    >
                        <button 
                            type="button" 
                            class="faq-question" 
                            aria-expanded="<?= $idx === 0 ? 'true' : 'false' ?>"
                            aria-controls="faq-answer-<?= $idx + 1 ?>"
                        >
                            <div class="faq-question-text-wrap">
                                <span class="faq-category-tag"><?= e($category) ?></span>
                                <span><?= e($faq['question']) ?></span>
                            </div>
                            <div class="faq-icon-bubble">
                                <i class="fa-solid fa-chevron-down"></i>
                            </div>
                        </button>
                        <div class="faq-answer" id="faq-answer-<?= $idx + 1 ?>" role="region">
                            <p style="margin: 0;"><?= nl2br(e($faq['answer'])) ?></p>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>

            <!-- Empty Search State -->
            <div class="faq-empty-state" id="faqEmptyState">
                <div class="faq-empty-icon">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </div>
                <div class="faq-empty-title">No Matching Questions Found</div>
                <div class="faq-empty-desc">
                    We couldn't find any questions matching "<strong id="faqQueryHighlight" style="color: var(--digi-blue);"></strong>". Try searching for a different keyword or browse all topics.
                </div>
                <button type="button" class="btn btn-sm btn-outline-blue" id="faqResetSearchBtn" style="margin-right: 8px;">
                    <i class="fa-solid fa-rotate-left"></i> Reset Search
                </button>
                <a href="<?= url('/contact') ?>" class="btn btn-sm btn-blue-solid">
                    <i class="fa-solid fa-paper-plane"></i> Ask Us Directly
                </a>
            </div>

            <!-- High-Conversion "Still Have Questions?" CTA Box -->
            <div class="faq-cta-card">
                <div class="faq-cta-grid">
                    <div class="faq-cta-content">
                        <span style="font-size: 0.82rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #38bdf8; display: inline-block; margin-bottom: 6px;">
                            <i class="fa-solid fa-headset"></i> Need Personalized Guidance?
                        </span>
                        <h3>Have a Specific SEO Question?</h3>
                        <p>
                            Every website architecture is unique. If you have custom enterprise requirements, multi-domain migration concerns, or want a preliminary review of your site, reach out directly.
                        </p>
                        <div class="faq-cta-perks">
                            <div class="faq-cta-perk"><i class="fa-solid fa-check"></i> Response within 24 hours</div>
                            <div class="faq-cta-perk"><i class="fa-solid fa-check"></i> Free preliminary audit review</div>
                            <div class="faq-cta-perk"><i class="fa-solid fa-check"></i> Transparent recommendations</div>
                        </div>
                    </div>

                    <div class="faq-cta-actions">
                        <a href="<?= url('/contact') ?>" class="btn btn-lg btn-blue-solid">
                            <i class="fa-solid fa-envelope"></i> Send Project Inquiry
                        </a>
                        <a href="<?= url('/#pricing') ?>" class="btn btn-lg btn-outline-blue" style="background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.25); color: #ffffff;">
                            <i class="fa-solid fa-tag"></i> View Transparent Pricing
                        </a>
                        <div class="faq-quick-contact-pills">
                            <span>Or reach us via:</span>
                            <a href="https://wa.me/<?= preg_replace('/[^0-9]/', '', $whatsappNumber) ?>" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp" style="color: #25d366;"></i> WhatsApp</a>
                            <span>&bull;</span>
                            <a href="mailto:<?= e($contactEmail) ?>"><i class="fa-solid fa-at" style="color: #38bdf8;"></i> Email</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>

<!-- Interactive Dynamic Search, Category Filter, and Accordion Script -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('faqSearchInput');
    const searchClear = document.getElementById('faqSearchClear');
    const filterButtons = document.querySelectorAll('.faq-filter-btn');
    const faqItems = Array.from(document.querySelectorAll('.faq-item'));
    const emptyState = document.getElementById('faqEmptyState');
    const queryHighlight = document.getElementById('faqQueryHighlight');
    const resultsCountEl = document.getElementById('faqResultsCount');
    const resetSearchBtn = document.getElementById('faqResetSearchBtn');
    const toggleAllBtn = document.getElementById('faqToggleAll');
    const toggleIcon = document.getElementById('faqToggleIcon');
    const toggleText = document.getElementById('faqToggleText');

    let currentFilter = 'all';
    let currentSearch = '';
    let areAllExpanded = false;

    // Filter and search executor
    function applyFilters() {
        let visibleCount = 0;
        const query = currentSearch.trim().toLowerCase();

        faqItems.forEach(function(item) {
            const itemCat = item.getAttribute('data-category') || 'General SEO';
            const itemSearchText = item.getAttribute('data-search') || '';

            const matchesCat = (currentFilter === 'all' || itemCat.toLowerCase() === currentFilter.toLowerCase());
            const matchesQuery = (query === '' || itemSearchText.includes(query));

            if (matchesCat && matchesQuery) {
                item.style.display = 'block';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });

        if (resultsCountEl) {
            resultsCountEl.textContent = visibleCount;
        }

        if (visibleCount === 0) {
            if (emptyState) emptyState.style.display = 'block';
            if (queryHighlight) queryHighlight.textContent = currentSearch || currentFilter;
        } else {
            if (emptyState) emptyState.style.display = 'none';
        }
    }

    // Search Input Listener
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            currentSearch = e.target.value;
            if (searchClear) {
                searchClear.style.display = currentSearch.length > 0 ? 'inline-flex' : 'none';
            }
            applyFilters();
        });
    }

    // Search Clear Button
    if (searchClear) {
        searchClear.addEventListener('click', function() {
            if (searchInput) {
                searchInput.value = '';
                searchInput.focus();
            }
            currentSearch = '';
            searchClear.style.display = 'none';
            applyFilters();
        });
    }

    // Reset Search from Empty State
    if (resetSearchBtn) {
        resetSearchBtn.addEventListener('click', function() {
            if (searchInput) searchInput.value = '';
            if (searchClear) searchClear.style.display = 'none';
            currentSearch = '';
            currentFilter = 'all';
            filterButtons.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-filter') === 'all'));
            applyFilters();
        });
    }

    // Category Filter Buttons
    filterButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            applyFilters();
        });
    });

    // Toggle All (Expand/Collapse All)
    if (toggleAllBtn) {
        toggleAllBtn.addEventListener('click', function() {
            areAllExpanded = !areAllExpanded;

            faqItems.forEach(function(item) {
                // Only toggle items that are currently visible
                if (item.style.display !== 'none') {
                    const btn = item.querySelector('.faq-question');
                    if (areAllExpanded) {
                        item.classList.add('active');
                        if (btn) btn.setAttribute('aria-expanded', 'true');
                    } else {
                        item.classList.remove('active');
                        if (btn) btn.setAttribute('aria-expanded', 'false');
                    }
                }
            });

            if (toggleText) toggleText.textContent = areAllExpanded ? 'Collapse All' : 'Expand All';
            if (toggleIcon) {
                toggleIcon.className = areAllExpanded ? 'fa-solid fa-angles-up' : 'fa-solid fa-angles-down';
            }
        });
    }

    // Check URL parameters (e.g. ?q=keyword or ?cat=Technical+SEO)
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('q');
    const catParam = urlParams.get('cat');

    if (searchParam && searchInput) {
        searchInput.value = searchParam;
        currentSearch = searchParam;
        if (searchClear) searchClear.style.display = 'inline-flex';
    }

    if (catParam) {
        const targetBtn = Array.from(filterButtons).find(b => b.getAttribute('data-filter').toLowerCase() === catParam.toLowerCase());
        if (targetBtn) {
            filterButtons.forEach(b => b.classList.remove('active'));
            targetBtn.classList.add('active');
            currentFilter = targetBtn.getAttribute('data-filter');
        }
    }

    if (searchParam || catParam) {
        applyFilters();
    }
});
</script>

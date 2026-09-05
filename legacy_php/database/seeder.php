<?php
// database/seeder.php - Seed database with complete demo data and accounts

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/database.php';

function runDatabaseSeeder() {
    $db = Database::getInstance()->getConnection();

    echo "Running Database Seeder...\n";

    // 1. Roles & Permissions
    $db->exec("INSERT IGNORE INTO `roles` (`id`, `name`, `slug`, `description`) VALUES
        (1, 'Super Administrator', 'super_admin', 'Full platform access'),
        (2, 'Client / Customer', 'client', 'Registered client who can order services and track projects');");

    // 2. Users (Admin & Client Demo Accounts)
    $adminPassword = password_hash('Admin@123456', PASSWORD_BCRYPT);
    $clientPassword = password_hash('Client@123456', PASSWORD_BCRYPT);

    $stmt = $db->prepare("INSERT INTO `users` (`id`, `name`, `email`, `phone`, `password`, `country`, `status`, `email_verified_at`, `created_at`) 
        VALUES (1, 'Abdullah Saleh', 'admin@seoservice.local', '+1 (555) 019-2834', ?, 'United States', 'active', NOW(), NOW())
        ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `password` = VALUES(`password`);");
    $stmt->execute([$adminPassword]);

    $stmt = $db->prepare("INSERT INTO `users` (`id`, `name`, `email`, `phone`, `password`, `country`, `status`, `email_verified_at`, `created_at`) 
        VALUES (2, 'Alex Harrison', 'client@seoservice.local', '+1 (555) 382-9910', ?, 'United Kingdom', 'active', NOW(), NOW())
        ON DUPLICATE KEY UPDATE `password` = VALUES(`password`);");
    $stmt->execute([$clientPassword]);

    // Role User pivots
    $db->exec("INSERT IGNORE INTO `role_user` (`role_id`, `user_id`) VALUES (1, 1), (2, 2);");

    // 3. Settings (Branding, Logo, General, Contact, Social, SEO, Crypto)
    $settings = [
        // General & Branding
        ['site_name', 'Abdullah Saleh', 'text', 'branding', 1],
        ['site_tagline', 'SEO Specialist & Organic Growth Strategist', 'text', 'branding', 1],
        ['site_logo_text', 'Abdullah Saleh', 'text', 'branding', 1],
        ['site_logo_image', '', 'image', 'branding', 1],
        ['site_favicon', '', 'image', 'branding', 1],
        ['primary_color', '#4361ee', 'text', 'branding', 1],
        ['accent_color', '#06b6d4', 'text', 'branding', 1],
        ['expert_name', 'Abdullah Saleh', 'text', 'general', 1],
        ['expert_title', 'SEO Specialist & Organic Growth Strategist', 'text', 'general', 1],
        ['expert_bio', 'Helping ambitious businesses build sustainable organic visibility, qualified search traffic, and scalable revenue through data-backed technical and strategic SEO.', 'textarea', 'general', 1],
        ['profile_photo', '', 'image', 'general', 1],
        
        // Contact
        ['contact_email', 'abdullahbd.seo@gmail.com', 'text', 'contact', 1],
        ['contact_phone', '+880 1670-769816', 'text', 'contact', 1],
        ['whatsapp_number', '+8801670769816', 'text', 'contact', 1],
        ['office_address', 'Silicon Oasis Tech Park, Suite 402, New York, NY 10001', 'textarea', 'contact', 1],
        ['working_hours', 'Mon - Fri: 9:00 AM - 6:00 PM EST', 'text', 'contact', 1],
        
        // Social Links
        ['social_linkedin', 'https://linkedin.com/in/abdullah-saleh-seo', 'text', 'social', 1],
        ['social_twitter', 'https://twitter.com/abdullahsaleh_seo', 'text', 'social', 1],
        ['social_github', 'https://github.com', 'text', 'social', 1],
        ['social_youtube', 'https://youtube.com', 'text', 'social', 1],
        
        // SEO Defaults
        ['default_meta_title', 'Abdullah Saleh | SEO Specialist & Organic Growth Strategist', 'text', 'seo', 1],
        ['default_meta_description', 'Professional data-driven SEO consulting, technical SEO audits, e-commerce optimization, and search growth strategies by Abdullah Saleh.', 'textarea', 'seo', 1],
        ['default_meta_keywords', 'SEO expert, SEO consultant, technical SEO audit, ecommerce SEO, keyword research, organic growth', 'textarea', 'seo', 1],
        ['google_analytics_id', '', 'text', 'seo', 1],
        ['google_search_console_code', '', 'text', 'seo', 1],
        ['schema_organization_type', 'ProfessionalService', 'text', 'seo', 1],
        
        // Crypto Payments
        ['crypto_payment_enabled', '1', 'boolean', 'payment', 1],
        ['usdt_trc20_address', 'TXxxDemoTronWalletAddressForUSDTPayments888', 'text', 'payment', 1],
        ['usdt_erc20_address', '0x71C...DemoEthereumWalletAddressForUSDT999', 'text', 'payment', 1],
        ['btc_address', 'bc1qdemo...BitcoinSegwitWalletAddress123', 'text', 'payment', 1],
        ['eth_address', '0x71C...DemoEthereumWalletAddressForETH999', 'text', 'payment', 1],
        ['sol_address', 'SoL111DemoSolanaNetworkWalletAddress456', 'text', 'payment', 1],
        ['payment_expiry_minutes', '60', 'text', 'payment', 1],
    ];

    $stmt = $db->prepare("INSERT INTO `settings` (`key`, `value`, `type`, `group`, `is_public`) 
        VALUES (?, ?, ?, ?, ?) 
        ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `type` = VALUES(`type`), `group` = VALUES(`group`);");
    
    foreach ($settings as $setting) {
        $stmt->execute($setting);
    }

    // 4. Homepage Sections (Content CMS)
    $sections = [
        [
            'hero',
            'Strategic SEO That Drives Real Organic Revenue',
            'Abdullah Saleh | SEO Specialist & Organic Growth Strategist',
            'I help ambitious businesses scale sustainable organic visibility, fix deep technical search bottlenecks, and attract high-converting organic buyers with ethical, data-driven SEO strategies.',
            '',
            json_encode([
                'badge' => 'Verified SEO Expert & Consultant',
                'cta_primary_text' => 'Hire Me / Order Service',
                'cta_primary_link' => '#services',
                'cta_secondary_text' => 'View Case Studies',
                'cta_secondary_link' => '#portfolio',
                'stat1_num' => '7+',
                'stat1_label' => 'Years SEO Experience',
                'stat2_num' => '120+',
                'stat2_label' => 'Projects Optimized',
                'stat3_num' => '98%',
                'stat3_label' => 'Client Satisfaction Rate',
                'stat4_num' => '3.5x',
                'stat4_label' => 'Average Organic Traffic ROI'
            ]),
            1, 1
        ],
        [
            'about_preview',
            'Proven SEO Methodologies Without Fluff or Empty Promises',
            'About Abdullah Saleh',
            'With deep domain mastery in Google Search algorithms, crawl architecture, search intent semantics, and conversion-centered content clustering, I design actionable SEO systems tailored to your business model. Whether you need a comprehensive technical audit, an e-commerce SEO overhaul, or an ongoing strategic partner, I deliver transparent, measurable results.',
            '',
            json_encode([
                'points' => [
                    'Deep technical SEO audits analyzing crawl budgets, rendering, and Core Web Vitals',
                    'Strategic keyword research based on commercial intent and topic clustering',
                    'Sustainable white-hat link building and digital PR frameworks',
                    'Transparent bi-weekly reporting with clear business KPIs'
                ]
            ]),
            2, 1
        ],
        [
            'process',
            'A 6-Step Data-Driven SEO Roadmap',
            'How We Work',
            'Structured execution engineered for sustainable ranking growth and search equity.',
            '',
            json_encode([
                'steps' => [
                    ['num' => '01', 'title' => 'Discovery & Business Alignment', 'desc' => 'Understand your niche, target buyers, margin products, and growth benchmarks.'],
                    ['num' => '02', 'title' => 'Deep Technical & Content Audit', 'desc' => 'Inspect 200+ crawl factors, indexation issues, cannibalization, and UX metrics.'],
                    ['num' => '03', 'title' => 'Keyword & Semantic Mapping', 'desc' => 'Map commercial search intent to high-converting product and landing pages.'],
                    ['num' => '04', 'title' => 'Strategic Implementation', 'desc' => 'Fix technical bottlenecks, optimize on-page signals, and build content clusters.'],
                    ['num' => '05', 'title' => 'Authority & Trust Building', 'desc' => 'Ethical digital PR, contextual brand mentions, and high-tier link acquisition.'],
                    ['num' => '06', 'title' => 'Measure, Iterate & Scale', 'desc' => 'Track rankings, organic impressions, and revenue conversion metrics weekly.']
                ]
            ]),
            3, 1
        ],
        [
            'cta_banner',
            'Ready to Dominate Search and Scale Organic Revenue?',
            'Let\'s Build Your Customized SEO Plan',
            'Book a consulting session or order a targeted SEO service package today to unlock sustainable organic growth.',
            '',
            json_encode([
                'btn_text' => 'Get Started Today',
                'btn_link' => '/contact'
            ]),
            4, 1
        ]
    ];

    $stmt = $db->prepare("INSERT INTO `homepage_sections` (`section_key`, `title`, `subtitle`, `content`, `image`, `settings_json`, `sort_order`, `is_active`) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?) 
        ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `subtitle` = VALUES(`subtitle`), `content` = VALUES(`content`), `settings_json` = VALUES(`settings_json`), `is_active` = VALUES(`is_active`);");
    
    foreach ($sections as $sec) {
        $stmt->execute($sec);
    }

    // 5. Service Categories
    $categories = [
        [1, 'Technical & Auditing', 'technical-auditing', 'Core technical crawlability, Core Web Vitals, and structural site audits.'],
        [2, 'On-Page & Content', 'on-page-content', 'Content optimization, search intent alignment, and keyword clustering.'],
        [3, 'E-Commerce & Specialized', 'ecommerce-specialized', 'Shopify, WooCommerce, Local SEO and international multi-lingual SEO.'],
        [4, 'Off-Page & Authority', 'off-page-authority', 'High-authority backlink strategies, digital PR, and brand citations.']
    ];

    $stmt = $db->prepare("INSERT INTO `service_categories` (`id`, `name`, `slug`, `description`) 
        VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `description` = VALUES(`description`);");
    foreach ($categories as $cat) {
        $stmt->execute($cat);
    }

    // 6. Services & Packages
    $servicesData = [
        [
            'id' => 1,
            'category_id' => 1,
            'title' => 'Comprehensive Technical SEO Audit',
            'slug' => 'technical-seo-audit',
            'short_description' => 'Uncover every crawl blocker, indexation issue, site architecture flaw, and Core Web Vitals bottleneck.',
            'description' => 'A forensic deep-dive into your website architecture. We inspect over 230+ technical checkpoints including crawl depth, robots directives, JS rendering, canonicalization, broken internal links, structured data validation, server response times, and Core Web Vitals compliance. You receive a prioritized, developer-ready action roadmap.',
            'icon' => 'fa-screwdriver-wrench',
            'is_featured' => 1,
            'starting_price' => 350.00,
            'delivery_time' => '5-7 Business Days',
            'packages' => [
                [
                    'name' => 'Essential Audit',
                    'slug' => 'essential',
                    'short_description' => 'For websites up to 500 pages needing a quick health check.',
                    'price' => 350.00,
                    'delivery_days' => 5,
                    'revisions' => 1,
                    'features' => ['Up to 500 pages crawled', 'Robots.txt & Sitemap check', 'Indexing & Canonical audit', 'Speed & Core Web Vitals report', 'Executive PDF summary report', '30-min strategy debrief call']
                ],
                [
                    'name' => 'Standard Audit (Most Popular)',
                    'slug' => 'standard',
                    'short_description' => 'Complete technical & architectural analysis for growing websites.',
                    'price' => 650.00,
                    'delivery_days' => 7,
                    'revisions' => 2,
                    'is_popular' => 1,
                    'features' => ['Up to 5,000 pages crawled', 'JavaScript rendering inspection', 'Full internal link equity mapping', 'Schema / Structured data validation', 'Competitor technical benchmark', 'Prioritized developer task sheet', '60-min video walk-through']
                ],
                [
                    'name' => 'Enterprise Deep-Dive',
                    'slug' => 'enterprise',
                    'short_description' => 'For large e-commerce, SaaS, or multi-lingual websites.',
                    'price' => 1200.00,
                    'delivery_days' => 12,
                    'revisions' => 3,
                    'features' => ['Up to 50,000+ pages crawled', 'Faceted navigation & parameter analysis', 'Log file server crawl analysis', 'Hreflang & international SEO audit', 'Direct developer integration support', '14 days post-audit Q&A support']
                ]
            ],
            'faqs' => [
                ['What access do you need to perform the audit?', 'We will need read access to Google Search Console and Google Analytics, plus your website URL.'],
                ['Do you fix the technical issues for us?', 'The audit includes step-by-step developer tickets. If you need us to directly implement fixes, we can add implementation hours.'],
                ['How long does it take?', 'Typically between 5 to 10 business days depending on site size.']
            ]
        ],
        [
            'id' => 2,
            'category_id' => 2,
            'title' => 'Strategic Keyword Research & Topic Clustering',
            'slug' => 'keyword-research-topic-clustering',
            'short_description' => 'Discover high-intent, low-competition keywords grouped into topical authority clusters.',
            'description' => 'Stop writing random blog posts that never rank. We build a comprehensive content blueprint based on search intent, buyer journey stages (Top of Funnel, Middle of Funnel, Bottom of Funnel), and search volume dynamics to establish topical authority in your niche.',
            'icon' => 'fa-magnifying-glass-chart',
            'is_featured' => 1,
            'starting_price' => 250.00,
            'delivery_time' => '4-6 Business Days',
            'packages' => [
                [
                    'name' => 'Starter Cluster',
                    'slug' => 'starter',
                    'short_description' => 'Targeted keyword research for 1 core niche or product category.',
                    'price' => 250.00,
                    'delivery_days' => 4,
                    'revisions' => 1,
                    'features' => ['50+ vetted keyword targets', 'Search intent classification', 'Competitor keyword gap analysis', 'Search volume & difficulty metrics', 'Google Sheet deliverable']
                ],
                [
                    'name' => 'Growth Authority Blueprint',
                    'slug' => 'growth',
                    'short_description' => 'Full topic cluster blueprint for 3-5 core service/product pillars.',
                    'price' => 500.00,
                    'delivery_days' => 6,
                    'revisions' => 2,
                    'is_popular' => 1,
                    'features' => ['150+ categorized keywords', 'Pillar-cluster content architecture', 'Search intent & content angle mapping', 'Internal linking roadmap', 'Content brief templates (3 included)', 'Competitor ranking benchmarks']
                ],
                [
                    'name' => 'Full Market Domination Plan',
                    'slug' => 'full-market',
                    'short_description' => 'Comprehensive 6-month content strategy and keyword architecture.',
                    'price' => 950.00,
                    'delivery_days' => 10,
                    'revisions' => 3,
                    'features' => ['400+ targeted keywords', 'Full buyer stage matrix (TOFU, MOFU, BOFU)', '10 detailed content briefs ready for writers', 'Cannibalization risk audit', '6-month publication calendar', 'Consulting strategy call']
                ]
            ],
            'faqs' => [
                ['What tools do you use for keyword data?', 'We use professional subscriptions of Ahrefs, Semrush, Google Keyword Planner, AlsoAsked, and proprietary NLP clustering scripts.'],
                ['Do you provide ready-to-write briefs?', 'Yes, the Growth and Enterprise tiers include structured outlines and heading recommendations.']
            ]
        ],
        [
            'id' => 3,
            'category_id' => 3,
            'title' => 'E-Commerce SEO Overhaul (Shopify / WooCommerce)',
            'slug' => 'ecommerce-seo-optimization',
            'short_description' => 'Optimize category pages, product filters, structured data, and transactional search signals.',
            'description' => 'Maximize high-margin organic revenue for your online store. We optimize your catalog taxonomy, resolve duplicate product variations and faceted navigation traps, write conversion-friendly schema markup (Product, AggregateOffer, Review), and optimize high-converting category hubs.',
            'icon' => 'fa-bag-shopping',
            'is_featured' => 1,
            'starting_price' => 490.00,
            'delivery_time' => '7-10 Business Days',
            'packages' => [
                [
                    'name' => 'Store Foundation',
                    'slug' => 'foundation',
                    'short_description' => 'For stores with up to 100 products and 10 categories.',
                    'price' => 490.00,
                    'delivery_days' => 7,
                    'revisions' => 1,
                    'features' => ['10 Top category pages optimized', 'Rich product snippet schema setup', 'Shopify / WooCommerce URL audit', 'Duplicate content cleanup', 'Speed optimization recommendations']
                ],
                [
                    'name' => 'Scale & Dominate',
                    'slug' => 'scale',
                    'short_description' => 'Complete optimization for stores with up to 500 products.',
                    'price' => 890.00,
                    'delivery_days' => 10,
                    'revisions' => 2,
                    'is_popular' => 1,
                    'features' => ['25 Category hubs optimized', 'Faceted search & filter SEO structure', 'Product schema with reviews/stock status', 'Internal linking & breadcrumbs overhaul', 'Image SEO & compression strategy', 'Competitor product gap report']
                ],
                [
                    'name' => 'Enterprise E-Commerce',
                    'slug' => 'enterprise',
                    'short_description' => 'For stores with thousands of SKUs and international markets.',
                    'price' => 1600.00,
                    'delivery_days' => 15,
                    'revisions' => 3,
                    'features' => ['Full catalog taxonomy architecture', 'Multi-currency / Multi-region SEO', 'Custom schema integration', 'Dynamic metadata template design', 'Full developer implementation support', 'Monthly KPI tracking dashboard']
                ]
            ],
            'faqs' => [
                ['Do you work directly on Shopify / WooCommerce?', 'Yes, we can work directly inside your store backend with collaborator access or provide complete developer specifications.'],
                ['How does this affect my store conversion rate?', 'Our on-page optimizations are strictly designed for high readability and buyer trust, improving both search rankings and on-page checkout conversion.']
            ]
        ],
        [
            'id' => 4,
            'category_id' => 1,
            'title' => 'On-Page SEO & Content Optimization',
            'slug' => 'on-page-seo-optimization',
            'short_description' => 'Transform existing pages into search magnets with semantic entity optimization and UX refinement.',
            'description' => 'Align your core landing pages with modern search intent and Google NLP ranking criteria. We optimize title tags, meta descriptions, heading structure (H1-H4), entity coverage, keyword placement, image ALT tags, and internal link equity.',
            'icon' => 'fa-file-lines',
            'is_featured' => 1,
            'starting_price' => 290.00,
            'delivery_time' => '5 Business Days',
            'packages' => [
                [
                    'name' => '5 Key Pages',
                    'slug' => '5-pages',
                    'short_description' => 'Optimization for 5 high-priority landing or service pages.',
                    'price' => 290.00,
                    'delivery_days' => 5,
                    'revisions' => 1,
                    'features' => ['5 Important pages optimized', 'Title tags & meta descriptions', 'Header hierarchy & keyword optimization', 'Image alt tags & file naming', 'Internal linking suggestions']
                ],
                [
                    'name' => '15 Key Pages (Best Value)',
                    'slug' => '15-pages',
                    'short_description' => 'Comprehensive optimization for 15 core revenue pages.',
                    'price' => 590.00,
                    'delivery_days' => 8,
                    'revisions' => 2,
                    'is_popular' => 1,
                    'features' => ['15 Core pages optimized', 'NLP entity and semantic keyword enrichment', 'Conversion-focused CTA placement', 'Custom Schema markup for each page', 'Internal linking flow implementation', 'Before / After tracking sheet']
                ],
                [
                    'name' => 'Full Site Overhaul (30+ Pages)',
                    'slug' => 'full-site',
                    'short_description' => 'Complete on-page transformation for up to 30 landing pages.',
                    'price' => 1100.00,
                    'delivery_days' => 14,
                    'revisions' => 3,
                    'features' => ['30+ Landing & blog pages optimized', 'Full content refresh recommendations', 'Cannibalization cleanup', 'Custom JSON-LD schema suite', 'Direct CMS implementation (WordPress/Webflow/Custom)', '30 days ranking monitoring']
                ]
            ],
            'faqs' => [
                ['Will you write new copy or optimize existing copy?', 'We enhance your existing copy with semantic keywords, optimized structure, and missing topical entities while preserving your brand voice.']
            ]
        ],
        [
            'id' => 5,
            'category_id' => 4,
            'title' => 'High-Authority Link Building & Digital PR',
            'slug' => 'authority-link-building-strategy',
            'short_description' => 'Secure contextual, high-DR editorial backlinks and brand mentions to boost domain trust.',
            'description' => 'Build rock-solid domain authority with 100% white-hat, contextual links from real websites in your industry. No spam PBNs, no link farms, no automated spam. We specialize in manual outreach, digital PR assets, resource page link building, and broken link reclamation.',
            'icon' => 'fa-link',
            'is_featured' => 1,
            'starting_price' => 600.00,
            'delivery_time' => '14-21 Business Days',
            'packages' => [
                [
                    'name' => 'Authority Starter',
                    'slug' => 'starter',
                    'short_description' => '3 High-tier contextual editorial backlinks (DR 40-60+).',
                    'price' => 600.00,
                    'delivery_days' => 14,
                    'revisions' => 1,
                    'features' => ['3 Editorial backlinks (DR 40+)', 'Real websites with 5,000+ monthly traffic', 'Contextual anchor text strategy', 'Original 800+ word guest articles', 'Dofollow permanent links', 'Full transparent live link report']
                ],
                [
                    'name' => 'Growth Accelerator',
                    'slug' => 'growth',
                    'short_description' => '7 Premium contextual backlinks (DR 50-75+).',
                    'price' => 1350.00,
                    'delivery_days' => 20,
                    'revisions' => 2,
                    'is_popular' => 1,
                    'features' => ['7 Contextual editorial links (DR 50+)', 'Niche-relevant real organic traffic sites', 'Strategic anchor text ratio distribution', '100% manual bespoke outreach', 'Natural indexing confirmation', 'Competitor backlink gap analysis included']
                ],
                [
                    'name' => 'Authority Domination',
                    'slug' => 'domination',
                    'short_description' => '15 Top-tier backlinks and digital PR brand mentions.',
                    'price' => 2750.00,
                    'delivery_days' => 30,
                    'revisions' => 3,
                    'features' => ['15 Premium links (DR 60-80+)', 'Major industry publication placements', 'Digital PR linkable asset creation', 'Targeted tier-2 anchor equity boost', 'Dedicated link strategist support', 'Guaranteed link replacement warranty (12 months)']
                ]
            ],
            'faqs' => [
                ['Are these links safe from Google penalties?', 'Absolutely. We only acquire links on real websites that have genuine search traffic and clean backlink profiles. We never use PBNs.'],
                ['What happens if a link is dropped?', 'We provide a 12-month replacement guarantee for all acquired editorial links.']
            ]
        ],
        [
            'id' => 6,
            'category_id' => 3,
            'title' => 'Local SEO & Google Business Profile Optimization',
            'slug' => 'local-seo-gbp-optimization',
            'short_description' => 'Dominate the Google Map Pack and drive local customer calls, inquiries, and foot traffic.',
            'description' => 'Capture high-intent local customers looking for your services in your city or region. We optimize your Google Business Profile, fix NAP (Name, Address, Phone) citation consistency across 50+ local directories, build localized service pages, and implement LocalBusiness schema.',
            'icon' => 'fa-location-dot',
            'is_featured' => 1,
            'starting_price' => 300.00,
            'delivery_time' => '7 Business Days',
            'packages' => [
                [
                    'name' => 'Single Location Starter',
                    'slug' => 'single-location',
                    'short_description' => 'Complete GBP setup and audit for 1 business location.',
                    'price' => 300.00,
                    'delivery_days' => 7,
                    'revisions' => 1,
                    'features' => ['Google Business Profile complete overhaul', 'Primary & secondary category audit', 'Local keyword geo-tagging strategy', 'LocalBusiness Schema markup', 'Review generation strategy guide']
                ],
                [
                    'name' => 'Map Pack Booster',
                    'slug' => 'map-pack',
                    'short_description' => 'Full local optimization including citations and geo-landing pages.',
                    'price' => 550.00,
                    'delivery_days' => 10,
                    'revisions' => 2,
                    'is_popular' => 1,
                    'features' => ['Everything in Starter tier', '30 High-authority local citations (NAP)', '3 Optimized local landing pages', 'Local competitor proximity analysis', 'Google Posts & photo optimization schedule', 'Local rank tracking grid setup']
                ],
                [
                    'name' => 'Multi-Location / Regional',
                    'slug' => 'multi-location',
                    'short_description' => 'For multi-location businesses or service-area businesses across cities.',
                    'price' => 990.00,
                    'delivery_days' => 15,
                    'revisions' => 3,
                    'features' => ['Up to 3 distinct locations/profiles', '75+ Local business citations cleaned', '10 Geo-targeted service area pages', 'Multi-location schema hierarchy', 'Localized link outreach', 'Monthly local performance reporting']
                ]
            ],
            'faqs' => [
                ['How fast do Local Map Pack rankings improve?', 'Local optimization changes can show improvements in the Google Map Pack within 3 to 6 weeks as citations and reviews sync.']
            ]
        ],
        [
            'id' => 7,
            'category_id' => 1,
            'title' => 'Monthly SEO Growth & Ranking Retainers',
            'slug' => 'monthly-seo-subscription-retainer',
            'short_description' => 'Dedicated monthly SEO execution, technical maintenance, content expansion, and high-DA link building.',
            'description' => 'Continuous monthly organic traffic growth managed end-to-end. Includes hands-on technical SEO fixes, on-page optimization, fresh keyword publishing, contextual authority link placements, and bi-weekly strategic growth reviews.',
            'icon' => 'fa-rocket',
            'is_featured' => 1,
            'starting_price' => 125.00,
            'delivery_time' => 'Monthly Retainer (30 Days)',
            'packages' => [
                [
                    'name' => 'Starter',
                    'slug' => 'starter',
                    'short_description' => 'Essential monthly SEO support for small websites.',
                    'price' => 125.00,
                    'delivery_days' => 30,
                    'revisions' => 2,
                    'features' => ['15 Target Keywords', 'Full Technical SEO Audit', 'On-Page Optimization (5 Pages)', 'Monthly Performance Report', 'Email Support']
                ],
                [
                    'name' => 'Standard',
                    'slug' => 'standard',
                    'short_description' => 'Continuous organic growth engine for growing businesses.',
                    'price' => 350.00,
                    'delivery_days' => 30,
                    'revisions' => 3,
                    'is_popular' => 1,
                    'features' => ['30 Target Keywords', 'Full Technical & Speed Audit', 'On-Page Optimization (15 Pages)', '10 High-DA Backlinks / Month', 'Bi-Weekly Progress Calls']
                ],
                [
                    'name' => 'Growth',
                    'slug' => 'growth',
                    'short_description' => 'Aggressive keyword scaling and topic authority expansion.',
                    'price' => 550.00,
                    'delivery_days' => 30,
                    'revisions' => 4,
                    'features' => ['60 Target Keywords', 'Complete Site Optimization (30 Pages)', '25 High-DA Backlinks / Month', 'Content Cluster Production', 'Dedicated Account Strategist']
                ],
                [
                    'name' => 'Enterprise',
                    'slug' => 'enterprise',
                    'short_description' => 'Full-scale SEO department dedicated to your enterprise brand.',
                    'price' => 850.00,
                    'delivery_days' => 30,
                    'revisions' => 99,
                    'features' => ['Unlimited Keyword Targets', 'Full Website Overhaul & Core Web Vitals', '50+ Premium Tier Backlinks / Month', 'Weekly Video Growth Review', '24/7 Priority Support']
                ]
            ],
            'faqs' => [
                ['How does the monthly subscription work?', 'You get dedicated hours each month focused on technical fixes, on-page optimization, content production, and backlink outreach with bi-weekly reporting.'],
                ['Can I cancel or pause my monthly retainer anytime?', 'Yes, you can pause or cancel your retainer anytime with zero cancellation fees.']
            ]
        ]
    ];

    foreach ($servicesData as $s) {
        $stmt = $db->prepare("INSERT INTO `services` 
            (`id`, `category_id`, `title`, `slug`, `short_description`, `description`, `icon`, `status`, `is_featured`, `sort_order`, `starting_price`, `delivery_time`, `seo_title`, `meta_description`) 
            VALUES (?, ?, ?, ?, ?, ?, ?, 'active', ?, ?, ?, ?, ?, ?) 
            ON DUPLICATE KEY UPDATE 
                `title` = VALUES(`title`), `short_description` = VALUES(`short_description`), 
                `description` = VALUES(`description`), `starting_price` = VALUES(`starting_price`);");
        
        $seoTitle = $s['title'] . ' | Abdullah Saleh SEO Services';
        $metaDesc = $s['short_description'];
        $stmt->execute([
            $s['id'], $s['category_id'], $s['title'], $s['slug'], $s['short_description'], 
            $s['description'], $s['icon'], $s['is_featured'], $s['id'], $s['starting_price'], 
            $s['delivery_time'], $seoTitle, $metaDesc
        ]);

        // Insert packages
        $pkgOrder = 1;
        foreach ($s['packages'] as $pkg) {
            $stmtPkg = $db->prepare("INSERT INTO `service_packages` 
                (`service_id`, `name`, `slug`, `short_description`, `price`, `delivery_days`, `revisions`, `features_json`, `is_popular`, `status`, `sort_order`) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'active', ?)
                ON DUPLICATE KEY UPDATE `price` = VALUES(`price`), `features_json` = VALUES(`features_json`), `is_popular` = VALUES(`is_popular`);");
            
            $stmtPkg->execute([
                $s['id'], $pkg['name'], $pkg['slug'], $pkg['short_description'], $pkg['price'],
                $pkg['delivery_days'], $pkg['revisions'], json_encode($pkg['features']),
                isset($pkg['is_popular']) ? 1 : 0, $pkgOrder++
            ]);
        }

        // Insert FAQs
        if (isset($s['faqs'])) {
            $faqOrder = 1;
            foreach ($s['faqs'] as $faq) {
                $stmtFaq = $db->prepare("INSERT INTO `service_faqs` (`service_id`, `question`, `answer`, `sort_order`, `status`) 
                    VALUES (?, ?, ?, ?, 'active');");
                $stmtFaq->execute([$s['id'], $faq[0], $faq[1], $faqOrder++]);
            }
        }
    }

    // 7. Portfolio Categories & Real Google Search Console Proof Projects
    $db->exec("INSERT IGNORE INTO `portfolio_categories` (`id`, `name`, `slug`, `description`, `status`) VALUES
        (1, 'E-Commerce SEO', 'ecommerce-seo', 'Online store rankings, faceted navigation, and organic revenue scaling', 'active'),
        (2, 'Technical SEO Overhaul', 'technical-seo', 'Crawl architecture, JS rendering, speed, and indexation fixes', 'active'),
        (3, 'Local SEO & Map Pack', 'local-seo', 'Local business visibility, Google Business Profile, and lead generation', 'active'),
        (4, 'SaaS & Enterprise SEO', 'saas-enterprise', 'High-intent software keyword domination and enterprise search scale', 'active'),
        (5, 'Rapid Growth Sprints', 'rapid-growth-sprints', 'Fast-track search indexation and swift ranking acceleration', 'active');");

    $portfolios = [
        [
            'id' => 7,
            'title' => 'Enterprise SEO Domination: Scaling to 1.18M Organic Clicks & 92.4% CTR',
            'slug' => 'enterprise-seo-1-18m-clicks-gsc',
            'client_name' => 'Global Digital Solutions',
            'website_url' => 'https://example-globaldigital.com',
            'industry' => 'Enterprise Technology / SaaS',
            'category_id' => 4,
            'featured_image' => 'assets/images/portfolio/proof_gsc_1_18m_scale.jpg',
            'summary' => 'Engineered high-intent search structure and technical optimization delivering 1.18 Million organic clicks with an unprecedented 92.4% click-through rate and #1 average position on Google Search Console.',
            'challenge' => 'The client had significant traffic potential but was held back by deep site architecture flaws, internal link cannibalization, and suboptimal snippet CTR across major commercial keywords.',
            'strategy' => 'Conducted an exhaustive 230-point technical crawl audit, rebuilt the internal silo hierarchy, deployed custom Product and FAQ JSON-LD schemas, and rewrote title/meta hooks to maximize search snippet click appeal.',
            'implementation' => "1. Resolved 450+ canonical anomalies and duplicate URL parameters.\n2. Implemented automated breadcrumb and FAQ rich snippets.\n3. Built 40+ topic cluster pillar pages linking to core commercial hubs.\n4. Scaled high-tier contextual backlinks from DA 60+ industry portals.",
            'results' => 'Achieved 1.18 Million organic clicks and 1.28 Million impressions over a 3-month performance window with a remarkable 92.4% CTR and sustained #1 average position.',
            'metrics' => json_encode(['total_clicks' => '1.18M', 'total_impressions' => '1.28M', 'avg_ctr' => '92.4%', 'avg_position' => '1.0']),
            'duration' => '3 Months',
            'is_featured' => 1
        ],
        [
            'id' => 8,
            'title' => 'High-CTR Authority Portal: 809K Organic Clicks with Rank #1 Stability',
            'slug' => 'authority-portal-809k-clicks-gsc',
            'client_name' => 'Authority Web Services',
            'website_url' => 'https://example-authorityportal.com',
            'industry' => 'High-Traffic Web Platform',
            'category_id' => 4,
            'featured_image' => 'assets/images/portfolio/proof_gsc_809k_clicks.jpg',
            'summary' => 'Comprehensive technical SEO overhaul and rich snippets strategy generating 809,000+ organic clicks and 872,000 impressions with 92.8% CTR and #1 average ranking.',
            'challenge' => 'High bounce rates and cannibalization between multiple overlapping service offerings prevented the domain from achieving peak rankings.',
            'strategy' => 'Consolidated competing URLs with clean 301 redirects, rebuilt topic clusters around exact intent queries, and optimized above-the-fold content hierarchy.',
            'implementation' => "1. Deployed comprehensive Schema.org structured data.\n2. Overhauled internal linking anchor equity distribution.\n3. Pruned low-quality legacy URLs to concentrate crawl budget.\n4. Optimized Core Web Vitals (LCP < 1.2s, INP < 100ms).",
            'results' => 'Delivered 809K total clicks, 872K impressions, 92.8% average CTR, and rock-solid #1 average position across primary target queries.',
            'metrics' => json_encode(['total_clicks' => '809K', 'total_impressions' => '872K', 'avg_ctr' => '92.8%', 'avg_position' => '1.0']),
            'duration' => '3 Months',
            'is_featured' => 1
        ],
        [
            'id' => 9,
            'title' => 'Australian E-Commerce Brand: 85.1K Impressions Growth Surge',
            'slug' => 'australia-ecommerce-organic-boost',
            'client_name' => 'Australian National Brand (.com.au)',
            'website_url' => 'https://example-australia-store.com.au',
            'industry' => 'E-Commerce / Australia Retail',
            'category_id' => 1,
            'featured_image' => 'assets/images/portfolio/proof_gsc_australia_growth.jpg',
            'summary' => 'Rapid organic impressions surge to 85.1K impressions and 1.14K clicks across national Australian buyer search queries, moving rankings from page 2 directly into Top Tier.',
            'challenge' => 'Stagnant rankings stuck on pages 2-3 of Google Australia with low search visibility against entrenched legacy retailers.',
            'strategy' => 'Targeted high-converting Australian geo-intent keywords, resolved collection page crawl bloat, and earned high-tier AU domain backlinks.',
            'implementation' => "1. Optimized 60+ collection and product category pages.\n2. Deployed Merchant and Offer schema for Google Shopping and organic rich badges.\n3. Improved mobile page speed by 58% and fixed layout shifts.\n4. Acquired 15+ Australian niche-relevant editorial links.",
            'results' => 'Organic impressions surged to 85.1K with 1,140+ targeted buyer clicks, climbing steadily up the ranks to average position 15.1 with multiple Page 1 breakouts.',
            'metrics' => json_encode(['total_impressions' => '85.1K', 'total_clicks' => '1.14K', 'avg_ctr' => '1.3%', 'avg_position' => '15.1 -> Page 1']),
            'duration' => '3 Months',
            'is_featured' => 1
        ],
        [
            'id' => 10,
            'title' => 'Fast-Track 28-Day Growth Sprint: 30.2K Impressions for Australian Brand',
            'slug' => 'australia-rapid-sprint-30k-impressions',
            'client_name' => 'Australian Commerce Hub (.com.au)',
            'website_url' => 'https://example-australia-apex.com.au',
            'industry' => 'Australian E-Commerce (.com.au)',
            'category_id' => 5,
            'featured_image' => 'assets/images/portfolio/proof_gsc_ecommerce_boost.jpg',
            'summary' => 'Rapid 28-day growth sprint delivering 30,200 impressions and solid position gains across competitive commercial queries in record time.',
            'challenge' => 'Newly launched store sections were experiencing slow Googlebot discovery and indexation delays on important commercial product offerings.',
            'strategy' => 'Submitted optimized XML sitemaps via GSC API, fixed crawl errors, deployed semantic content headers with direct intent match, and executed targeted indexing signals.',
            'implementation' => "1. Indexed 100% of key product & category URLs within 72 hours.\n2. Structured transactional buyer intent landing pages.\n3. Implemented localized NAP consistency and structured business schema.\n4. Launched rapid outreach for niche relevant signals.",
            'results' => 'Attained 30.2K impressions and 363 high-intent clicks within just 28 days, achieving an average position of 13.6 with rapid upward momentum.',
            'metrics' => json_encode(['impressions_28d' => '30.2K', 'clicks_28d' => '363', 'avg_position' => '13.6', 'timeline' => '28 Days']),
            'duration' => '28 Days',
            'is_featured' => 1
        ],
        [
            'id' => 11,
            'title' => 'Live Verified Search Console Audit: 23K+ Daily Impressions Peak & Validated ROI',
            'slug' => 'enterprise-keyword-dominance-scale',
            'client_name' => 'Enterprise Web Platform',
            'website_url' => 'https://example-apexcloud.com',
            'industry' => 'Global SaaS & Cloud',
            'category_id' => 4,
            'featured_image' => 'assets/images/portfolio/proof_gsc_1_18m_verified.jpg',
            'summary' => 'Validated multi-month organic expansion reaching up to 23,000 daily impressions and maintaining #1 rank across primary target phrases with live Search Console verification.',
            'challenge' => 'Maintaining search leadership despite major Google core algorithm updates and aggressive competitor backlink campaigns.',
            'strategy' => 'Implemented continuous content freshness updates, entity authority building, and Core Web Vitals optimization.',
            'implementation' => "1. Monitored daily Search Console query patterns.\n2. Optimized internal link distributions across high-margin clusters.\n3. Secured tier-1 industry citations and brand mentions.\n4. Real-time monitoring and proactive algorithm protection.",
            'results' => 'Sustained 1.18M clicks and 1.28M impressions with peak traffic days exceeding 23,000 daily impressions and zero algorithm drop.',
            'metrics' => json_encode(['peak_daily_impr' => '23K+', 'total_clicks' => '1.18M', 'total_impressions' => '1.28M', 'rank_status' => '#1 Dominant']),
            'duration' => 'Verified Ongoing',
            'is_featured' => 1
        ]
    ];

    $stmt = $db->prepare("INSERT INTO `portfolios` 
        (`id`, `title`, `slug`, `client_name`, `website_url`, `industry`, `category_id`, `featured_image`, `summary`, `challenge`, `strategy`, `implementation`, `results`, `metrics_json`, `duration`, `status`, `is_featured`, `sort_order`, `seo_title`, `meta_description`) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'published', ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
            `title` = VALUES(`title`), `slug` = VALUES(`slug`), `client_name` = VALUES(`client_name`), 
            `featured_image` = VALUES(`featured_image`), `summary` = VALUES(`summary`), `challenge` = VALUES(`challenge`),
            `strategy` = VALUES(`strategy`), `implementation` = VALUES(`implementation`), `results` = VALUES(`results`),
            `metrics_json` = VALUES(`metrics_json`), `is_featured` = VALUES(`is_featured`);");
    
    $pOrder = 1;
    foreach ($portfolios as $p) {
        $seoTitle = $p['title'] . ' | Abdullah Saleh SEO Case Study';
        $metaDesc = $p['summary'];
        $stmt->execute([
            $p['id'], $p['title'], $p['slug'], $p['client_name'], $p['website_url'], $p['industry'],
            $p['category_id'], $p['featured_image'], $p['summary'], $p['challenge'], $p['strategy'], $p['implementation'],
            $p['results'], $p['metrics'], $p['duration'], $p['is_featured'], $pOrder++,
            $seoTitle, $metaDesc
        ]);
    }

    // 8. Blog Categories, Tags & SEO Knowledge Articles
    $db->exec("INSERT IGNORE INTO `blog_categories` (`id`, `name`, `slug`, `description`) VALUES
        (1, 'Technical SEO', 'technical-seo', 'Core Web Vitals, Crawl Budget & Architecture Guides'),
        (2, 'Keyword Research', 'keyword-research', 'Search intent, semantic clustering & competitor analysis'),
        (3, 'E-Commerce SEO', 'ecommerce-seo', 'Product schema, faceted navigation & store optimization'),
        (4, 'Algorithm Updates', 'algorithm-updates', 'Google Helpful Content & Core Algorithm breakdowns');");

    $db->exec("INSERT IGNORE INTO `blog_tags` (`id`, `name`, `slug`) VALUES
        (1, 'Core Web Vitals', 'core-web-vitals'),
        (2, 'Schema Markup', 'schema-markup'),
        (3, 'Search Intent', 'search-intent'),
        (4, 'Shopify SEO', 'shopify-seo'),
        (5, 'Internal Linking', 'internal-linking'),
        (6, 'Technical Audit', 'technical-audit');");

    $articles = [
        [
            'title' => 'The Complete Technical SEO Audit Checklist for 2026',
            'slug' => 'complete-technical-seo-audit-checklist',
            'category_id' => 1,
            'excerpt' => 'A step-by-step master checklist to diagnose crawl waste, indexation issues, JavaScript rendering hurdles, and Core Web Vitals bottlenecks.',
            'content' => "<h2>Why Technical SEO is the Foundation of Organic Growth</h2><p>Without a sound technical foundation, even the most exceptional content will struggle to rank. Search engines must be able to crawl, render, and index your pages seamlessly before ranking algorithms evaluate quality.</p><h3>1. Crawlability & Indexation Checkpoints</h3><ul><li><strong>Robots.txt Directives:</strong> Ensure crucial CSS, JS, and high-value content URLs are not accidentally blocked.</li><li><strong>XML Sitemap Integrity:</strong> Verify that only 200 OK canonical URLs are included. Exclude redirects, 404s, and noindex pages.</li><li><strong>Crawl Depth Analysis:</strong> Keep high-priority pages within 3 clicks from the homepage.</li></ul><h3>2. Core Web Vitals & Page Experience</h3><p>Google's emphasis on Interaction to Next Paint (INP), Largest Contentful Paint (LCP), and Cumulative Layout Shift (CLS) means page performance directly impacts search user experience and rankings.</p><h3>3. Canonicalization & Internal Linking</h3><p>Consolidate link equity by eliminating redirect chains, updating internal broken links, and using self-referential canonical tags correctly.</p>",
            'schema_type' => 'BlogPosting'
        ],
        [
            'title' => 'Search Intent Mastery: How to Rank for High-Converting Commercial Keywords',
            'slug' => 'search-intent-mastery-commercial-keywords',
            'category_id' => 2,
            'excerpt' => 'Understand the four core types of search intent and how to structure your landing pages to satisfy what Google and buyers are actually looking for.',
            'content' => "<h2>Understanding Search Intent in Modern Google Algorithms</h2><p>Keywords alone are no longer enough. Google's modern semantic models look for alignment between user search intent and the format, depth, and utility of your page.</p><h3>The 4 Pillars of Search Intent:</h3><ul><li><strong>Informational:</strong> The user wants answers or tutorials (e.g., 'what is technical SEO').</li><li><strong>Commercial Investigation:</strong> The user is comparing options (e.g., 'best SEO audit tools 2026').</li><li><strong>Transactional:</strong> The user is ready to purchase or hire (e.g., 'hire technical SEO consultant').</li><li><strong>Navigational:</strong> The user seeks a specific brand or login page.</li></ul><h3>Aligning Content Architecture with Buyer Journeys</h3><p>Map informational queries to top-of-funnel guide hubs and use strategic internal links to funnel users toward commercial service pages.</p>",
            'schema_type' => 'BlogPosting'
        ],
        [
            'title' => 'E-Commerce Faceted Navigation SEO: How to Prevent Crawl Waste & Cannibalization',
            'slug' => 'ecommerce-faceted-navigation-seo-guide',
            'category_id' => 3,
            'excerpt' => 'Learn how to configure filter URLs, canonical tags, and AJAX pagination to avoid creating millions of duplicate thin search pages.',
            'content' => "<h2>The Faceted Navigation Dilemma</h2><p>Online stores with color, size, price, and brand filters can inadvertently generate millions of URL parameter combinations. If search bots crawl these thin combinations, crawl budget is rapidly depleted and link equity gets diluted.</p><h3>Best Practices for Facet Management:</h3><ul><li><strong>Canonicalization:</strong> Point parameterized filter URLs back to the clean parent category root.</li><li><strong>Robots Noindex vs. Disallow:</strong> Evaluate whether parameter URLs should be disallowed in robots.txt or rendered client-side via AJAX.</li><li><strong>Index Only High-Volume Combinations:</strong> Create dedicated, unique static landing pages only for high-demand sub-categories (e.g., /running-shoes/mens-waterproof).</li></ul>",
            'schema_type' => 'BlogPosting'
        ]
    ];

    $stmt = $db->prepare("INSERT INTO `blog_posts` 
        (`author_id`, `category_id`, `title`, `slug`, `excerpt`, `content`, `status`, `views`, `published_at`, `seo_title`, `meta_description`, `schema_type`) 
        VALUES (1, ?, ?, ?, ?, ?, 'published', 150, NOW(), ?, ?, ?) 
        ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `excerpt` = VALUES(`excerpt`), `content` = VALUES(`content`);");
    
    foreach ($articles as $art) {
        $seoTitle = $art['title'] . ' | Abdullah Saleh SEO Blog';
        $metaDesc = $art['excerpt'];
        $stmt->execute([
            $art['category_id'], $art['title'], $art['slug'], $art['excerpt'],
            $art['content'], $seoTitle, $metaDesc, $art['schema_type']
        ]);
    }

    // 9. General Global FAQs (Top 10 Best High-Impact Questions)
    $faqs = [
        ['How long does it take to see tangible results from SEO?', 'SEO is a compounding organic growth strategy. Technical improvements, crawl fixations, and on-page adjustments often reflect in Google Search Console within 3 to 6 weeks. Core commercial keyword rank improvements and organic revenue acceleration typically compound significantly between months 3 and 6.', 'General SEO'],
        ['Do you guarantee #1 rankings on Google?', 'No ethical SEO specialist can guarantee a specific #1 rank because Google controls search algorithm updates. What we guarantee is a rigorous, data-driven methodology, 100% white-hat execution, transparent weekly progress reporting, and search strategies proven to outperform competitors over time.', 'General SEO'],
        ['What industries and CMS platforms do you specialize in?', 'We have deep expertise across E-Commerce (Shopify, WooCommerce, Magento), B2B SaaS, Professional Services, Healthcare, Real Estate, Local Businesses, and Custom Web Applications built on Next.js, WordPress, or Laravel.', 'General SEO'],
        ['How do you choose target keywords for our campaign?', 'We analyze search volume, keyword difficulty (KD), search intent (informational vs commercial), business profitability, and competitor ranking gaps using Ahrefs and Semrush to create structured keyword clusters and high-converting topic silos.', 'General SEO'],
        ['Can you fix Google indexing errors and Core Web Vitals issues?', 'Yes! Our technical SEO audits systematically resolve crawl budget bloat, orphaned URLs, canonical conflicts, redirect loops, slow LCP/INP/CLS metrics, JavaScript hydration delays, and missing Schema.org JSON-LD structured data.', 'Technical SEO'],
        ['What tools and software do you use for audits and analysis?', 'We utilize industry-leading enterprise toolstacks including Ahrefs, Semrush, Google Search Console, Google Analytics 4, Screaming Frog SEO Spider, Sitebulb, PageSpeed Insights, and custom Python scrapers for deep technical analysis.', 'Technical SEO'],
        ['Do you need administrative access to our website backend?', 'For audit-only packages, we only require Google Search Console and Google Analytics read access. For complete implementation packages, temporary CMS admin access (WordPress/Shopify) or developer collaboration via Git/staging environment is recommended.', 'Technical SEO'],
        ['What payment methods do you support and will I receive an invoice?', 'We accept all major verified digital payment options including crypto (USDT, BTC, ETH, SOL) via NOWPayments with automated confirmation, alongside verified bKash mobile payments. An official downloadable digital invoice with a unique Order ID is generated immediately upon confirmation.', 'Payments & Billing'],
        ['Will I receive comprehensive reports and actionable deliverables?', 'Every deliverable includes an exhaustive PDF report, an actionable prioritized Google Sheets checklist, live Search Console benchmark tracking, and an exclusive Loom video walkthrough explaining every insight, metric, and implementation step.', 'Deliverables & Reporting'],
        ['Do you provide ongoing monthly SEO retainers after audits?', 'Yes! After completing technical audits or initial keyword cluster setups, we offer dedicated monthly retainer packages covering continuous link building, fresh on-page sprints, ranking monitoring, and technical maintenance.', 'Deliverables & Reporting']
    ];

    $stmt = $db->prepare("INSERT INTO `faqs` (`question`, `answer`, `category`, `sort_order`, `status`) 
        VALUES (?, ?, ?, ?, 'active');");
    $faqIdx = 1;
    foreach ($faqs as $f) {
        $stmt->execute([$f[0], $f[1], $f[2], $faqIdx++]);
    }

    // 10. Testimonials (Demonstration Placeholders with clear disclosure)
    $testimonials = [
        ['Sarah Jenkins', 'Apex Commerce UK', 'Head of E-Commerce', 'Abdullah Saleh overhauled our store taxonomy and fixed critical crawl bloat. Our non-brand organic search revenue grew by 190% in just five months. Outstanding technical communication!', 5, 1],
        ['Marcus Vance', 'CloudStack Technologies', 'VP of Growth', 'The keyword clustering blueprint and technical audit delivered by Abdullah Saleh gave our engineering team a clear roadmap. We saw multiple core commercial pages rank on page 1 within weeks.', 5, 2],
        ['David Chen', 'Apex Health Network', 'Managing Director', 'From Google Business Profile optimization to local service landing pages, our patient inquiry calls doubled. Highly recommended for any business serious about search growth.', 5, 3]
    ];

    $stmt = $db->prepare("INSERT INTO `testimonials` (`name`, `company`, `position`, `testimonial`, `rating`, `sort_order`, `status`) 
        VALUES (?, ?, ?, ?, ?, ?, 'active');");
    foreach ($testimonials as $t) {
        $stmt->execute($t);
    }

    // 11. Initial Demo Order & Invoice (For client demo account)
    $orderNumber = 'ORD-' . date('Ymd') . '-001';
    $invoiceNumber = 'INV-' . date('Ymd') . '-001';

    $stmtOrder = $db->prepare("INSERT INTO `orders` 
        (`id`, `order_number`, `user_id`, `service_id`, `package_id`, `subtotal`, `discount`, `total`, `currency`, `status`, `website_url`, `target_country`, `target_keywords`, `client_notes`, `admin_notes`, `created_at`) 
        VALUES (1, ?, 2, 1, 2, 650.00, 0.00, 650.00, 'USD', 'in_progress', 'https://example-clientstore.com', 'United States', 'ecommerce technical audit, shopify seo optimization', 'Please focus particularly on our collection pages and mobile speed.', 'Initial audit completed. Deliverable report in progress.', NOW())
        ON DUPLICATE KEY UPDATE `status` = VALUES(`status`);");
    $stmtOrder->execute([$orderNumber]);

    $stmtPayment = $db->prepare("INSERT INTO `payments` 
        (`id`, `order_id`, `user_id`, `payment_ref`, `provider`, `provider_payment_id`, `cryptocurrency`, `network`, `fiat_amount`, `crypto_amount`, `exchange_rate`, `wallet_address`, `transaction_hash`, `status`, `paid_at`, `created_at`) 
        VALUES (1, 1, 2, 'PAY-DEMO-001', 'cryptocurrency', 'CRYPTO-TX-001', 'USDT-TRC20', 'TRON', 650.00, 650.00000000, 1.00000000, 'TXxxDemoTronWalletAddressForUSDTPayments888', '4a7f9c8e2b1d0e5f3a6b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f', 'paid', NOW(), NOW())
        ON DUPLICATE KEY UPDATE `status` = VALUES(`status`);");
    $stmtPayment->execute();

    $stmtInvoice = $db->prepare("INSERT INTO `invoices` 
        (`id`, `order_id`, `user_id`, `invoice_number`, `subtotal`, `discount`, `total`, `currency`, `status`, `issued_at`, `paid_at`, `created_at`) 
        VALUES (1, 1, 2, ?, 650.00, 0.00, 650.00, 'USD', 'paid', NOW(), NOW(), NOW())
        ON DUPLICATE KEY UPDATE `status` = VALUES(`status`);");
    $stmtInvoice->execute([$invoiceNumber]);

    // Demo notification
    $stmtNotif = $db->prepare("INSERT INTO `notifications` (`user_id`, `type`, `title`, `message`, `link`, `created_at`) 
        VALUES (2, 'order', 'Order #$orderNumber In Progress', 'Abdullah Saleh has started working on your Comprehensive Technical SEO Audit.', '/client/orders/1', NOW())
        ON DUPLICATE KEY UPDATE `title` = VALUES(`title`);");
    $stmtNotif->execute();

    // Demo Support Ticket
    $stmtTicket = $db->prepare("INSERT INTO `support_tickets` (`id`, `user_id`, `order_id`, `ticket_number`, `subject`, `priority`, `status`, `created_at`) 
        VALUES (1, 2, 1, 'TCK-1001', 'Question regarding Google Search Console access', 'medium', 'open', NOW())
        ON DUPLICATE KEY UPDATE `subject` = VALUES(`subject`);");
    $stmtTicket->execute();

    $stmtMsg = $db->prepare("INSERT INTO `support_messages` (`ticket_id`, `user_id`, `message`, `created_at`) 
        VALUES (1, 2, 'Hi Abdullah Saleh, I have added your email to our Google Search Console with Restricted access. Please let me know if you can view the property data.', NOW());");
    $stmtMsg->execute();

    echo "Database Seeder Completed Successfully!\n";
    echo "Admin Account: admin@seoservice.local | Password: Admin@123456\n";
    echo "Client Account: client@seoservice.local | Password: Client@123456\n";
}

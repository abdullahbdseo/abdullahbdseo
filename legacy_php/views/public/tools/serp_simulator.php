<?php
// views/public/tools/serp_simulator.php - Premium Enterprise Google SERP Simulator & Meta Tag Studio
?>

<div class="tool-page-wrapper" style="background: #f8fafc; min-height: 100vh; padding-top: 30px; padding-bottom: 90px;">
    <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
        
        <!-- Breadcrumb Navigation -->
        <nav aria-label="Breadcrumb" style="margin-bottom: 24px;">
            <ol style="display: inline-flex; align-items: center; gap: 8px; padding: 7px 18px; border-radius: 8px; background: #ffffff; border: 1px solid #e2e8f0; font-size: 0.85rem; font-weight: 500; color: #64748b; list-style: none; margin: 0; box-shadow: 0 1px 3px rgba(0,0,0,0.02);">
                <li style="display: inline-flex; align-items: center; gap: 6px;">
                    <a href="<?= url('/') ?>" style="color: #475569; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
                        <i class="fa-solid fa-house" style="font-size: 0.78rem;"></i> Home
                    </a>
                </li>
                <li><i class="fa-solid fa-angle-right" style="font-size: 0.72rem; color: #94a3b8;"></i></li>
                <li>
                    <a href="<?= url('/tools') ?>" style="color: #475569; text-decoration: none;">Free SEO Tools</a>
                </li>
                <li><i class="fa-solid fa-angle-right" style="font-size: 0.72rem; color: #94a3b8;"></i></li>
                <li style="color: #0f172a; font-weight: 700;">Google SERP Simulator & Meta Studio</li>
            </ol>
        </nav>

        <!-- Header Hero Banner -->
        <div style="text-align: center; margin-bottom: 40px;">
            <div style="display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 9999px; color: #2563eb; font-size: 0.84rem; font-weight: 700; margin-bottom: 14px;">
                <i class="fa-brands fa-google"></i> Pixel-Perfect Google SERP & Social Graph Simulator
            </div>
            <h1 style="font-size: 2.7rem; font-weight: 800; color: #0f172a; letter-spacing: -0.03em; margin: 0 0 14px; line-height: 1.2;">
                Google SERP Simulator & Meta Tag Generator
            </h1>
            <p style="font-size: 1.08rem; color: #475569; max-width: 760px; margin: 0 auto; line-height: 1.65;">
                Preview exactly how your website appears on <strong>Google Desktop</strong>, <strong>Google Mobile</strong>, <strong>Facebook</strong>, <strong>Twitter/X</strong>, and <strong>LinkedIn</strong>. Avoid snippet truncation, maximize click-through rates (CTR), and export copy-paste meta tags instantly.
            </p>
        </div>

        <!-- Quick Industry Preset Buttons Bar -->
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 20px; margin-bottom: 30px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
            <div style="font-size: 0.86rem; font-weight: 700; color: #0f172a; display: flex; align-items: center; gap: 8px;">
                <i class="fa-solid fa-wand-magic-sparkles" style="color: #2563eb;"></i> Quick Template Presets:
            </div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <button type="button" class="preset-pill-btn" onclick="loadPreset('agency')">
                    <i class="fa-solid fa-briefcase"></i> SEO Agency / Service
                </button>
                <button type="button" class="preset-pill-btn" onclick="loadPreset('blog')">
                    <i class="fa-solid fa-newspaper"></i> Blog Post / Article
                </button>
                <button type="button" class="preset-pill-btn" onclick="loadPreset('ecommerce')">
                    <i class="fa-solid fa-cart-shopping"></i> E-Commerce Product
                </button>
                <button type="button" class="preset-pill-btn" onclick="loadPreset('saas')">
                    <i class="fa-solid fa-rocket"></i> SaaS / Software
                </button>
                <button type="button" class="preset-pill-btn" onclick="loadPreset('local')">
                    <i class="fa-solid fa-location-dot"></i> Local Business
                </button>
            </div>
        </div>

        <!-- Main Workspace Two-Column Layout -->
        <div class="serp-workspace-grid">
            
            <!-- ================= LEFT COLUMN: INPUT CONTROLS ================= -->
            <div class="serp-card-box">
                <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #f1f5f9; padding-bottom: 16px; margin-bottom: 22px;">
                    <div>
                        <h3 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin: 0 0 4px; display: flex; align-items: center; gap: 8px;">
                            <i class="fa-solid fa-sliders" style="color: #2563eb;"></i> Meta Tag Editor
                        </h3>
                        <p style="font-size: 0.8rem; color: #64748b; margin: 0;">Fill in your page details to generate live snippets</p>
                    </div>
                    <button type="button" onclick="clearSerpForm()" style="background: #f8fafc; border: 1px solid #cbd5e1; color: #64748b; padding: 6px 12px; border-radius: 6px; font-size: 0.78rem; font-weight: 600; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.color='#ef4444'" onmouseout="this.style.color='#64748b'">
                        <i class="fa-solid fa-rotate-left"></i> Reset
                    </button>
                </div>

                <form id="serpForm" oninput="renderSerpPreview()">
                    
                    <!-- 1. SEO Page Title -->
                    <div class="serp-form-group">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                            <label class="serp-lbl">
                                SEO Title Tag <span style="color: #ef4444;">*</span>
                            </label>
                            <span id="titleCounter" class="serp-counter-badge">0 / 60 chars (0px / 600px)</span>
                        </div>
                        <input type="text" id="serp_title" class="serp-input" placeholder="e.g. SEO Consultant & Organic Growth Services | MD Abdullah" maxlength="110">
                        <div class="serp-progress-track">
                            <div id="titleProgressBar" class="serp-progress-fill" style="width: 0%;"></div>
                        </div>
                        <span class="serp-hint">Google desktop displays titles up to ~600 pixels (approx. 55-60 characters).</span>
                    </div>

                    <!-- 2. Meta Description -->
                    <div class="serp-form-group">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                            <label class="serp-lbl">
                                Meta Description <span style="color: #ef4444;">*</span>
                            </label>
                            <span id="descCounter" class="serp-counter-badge">0 / 160 chars (0px / 960px)</span>
                        </div>
                        <textarea id="serp_desc" class="serp-input" rows="3" placeholder="Skyrocket organic traffic and search rankings with custom data-driven SEO audits, technical fixes, and high-authority link building." maxlength="280"></textarea>
                        <div class="serp-progress-track">
                            <div id="descProgressBar" class="serp-progress-fill" style="width: 0%;"></div>
                        </div>
                        <span class="serp-hint">Keep descriptions between 120 and 160 characters (up to ~960px) for maximum CTR.</span>
                    </div>

                    <!-- 3. Target URL / Slug -->
                    <div class="serp-form-group">
                        <label class="serp-lbl">Target URL / Canonical</label>
                        <div style="position: relative;">
                            <i class="fa-solid fa-link" style="position: absolute; left: 14px; top: 13px; color: #94a3b8; font-size: 0.88rem;"></i>
                            <input type="url" id="serp_url" class="serp-input" style="padding-left: 38px;" placeholder="https://abdullahseo.com/services/technical-seo">
                        </div>
                        <span class="serp-hint">Used for canonical links, Google breadcrumbs, and social card URLs.</span>
                    </div>

                    <!-- 4. Interactive Rich Snippet Enhancements -->
                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px 16px; margin-bottom: 20px;">
                        <span style="font-size: 0.82rem; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.04em; display: block; margin-bottom: 10px;">
                            <i class="fa-solid fa-star" style="color: #f59e0b;"></i> Rich Snippet Extensions (SERP Add-ons)
                        </span>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                            <label style="font-size: 0.84rem; color: #334155; font-weight: 600; display: flex; align-items: center; gap: 8px; cursor: pointer;">
                                <input type="checkbox" id="chkShowDate" onchange="renderSerpPreview()" style="accent-color: #2563eb; width: 16px; height: 16px;">
                                Show Publish Date
                            </label>
                            <label style="font-size: 0.84rem; color: #334155; font-weight: 600; display: flex; align-items: center; gap: 8px; cursor: pointer;">
                                <input type="checkbox" id="chkShowRating" onchange="renderSerpPreview()" style="accent-color: #2563eb; width: 16px; height: 16px;">
                                Show Star Rating (4.9 ★)
                            </label>
                        </div>
                    </div>

                    <!-- 5. Advanced Social & Technical Meta Tags -->
                    <div style="border-top: 1px solid #e2e8f0; padding-top: 16px;">
                        <button type="button" onclick="toggleAdvancedSerp()" class="serp-toggle-btn">
                            <span>
                                <i id="advIcon" class="fa-solid fa-chevron-right" style="transition: transform 0.2s; font-size: 0.78rem; margin-right: 6px;"></i>
                                Advanced Social & Technical Tags (OG, Twitter, Robots)
                            </span>
                            <span style="font-size: 0.75rem; color: #64748b; font-weight: 500;">Optional</span>
                        </button>

                        <div id="advancedFields" style="display: none; margin-top: 16px;">
                            
                            <!-- Featured Image -->
                            <div class="serp-form-group">
                                <label class="serp-lbl">Featured Social Image URL (1200x630px)</label>
                                <div style="position: relative;">
                                    <i class="fa-regular fa-image" style="position: absolute; left: 14px; top: 13px; color: #94a3b8; font-size: 0.88rem;"></i>
                                    <input type="url" id="serp_image" class="serp-input" style="padding-left: 38px;" placeholder="https://abdullahseo.com/assets/img/og-preview.jpg">
                                </div>
                            </div>

                            <!-- Two Columns -->
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px;">
                                <div>
                                    <label class="serp-lbl">Robots Directive</label>
                                    <select id="serp_robots" class="serp-select">
                                        <option value="index, follow" selected>index, follow (Standard)</option>
                                        <option value="noindex, follow">noindex, follow</option>
                                        <option value="index, nofollow">index, nofollow</option>
                                        <option value="noindex, nofollow">noindex, nofollow</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="serp-lbl">Twitter Card Type</label>
                                    <select id="serp_tw_card" class="serp-select">
                                        <option value="summary_large_image" selected>summary_large_image</option>
                                        <option value="summary">summary (Square)</option>
                                    </select>
                                </div>
                            </div>

                            <!-- Site Name / Brand -->
                            <div class="serp-form-group">
                                <label class="serp-lbl">Brand / Site Name</label>
                                <input type="text" id="serp_sitename" class="serp-input" placeholder="MD Abdullah SEO Solutions">
                            </div>

                            <!-- Author & Keyword tags -->
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
                                <div>
                                    <label class="serp-lbl">Author Name</label>
                                    <input type="text" id="serp_author" class="serp-input" placeholder="MD Abdullah">
                                </div>
                                <div>
                                    <label class="serp-lbl">Focus Keyword</label>
                                    <input type="text" id="serp_keywords" class="serp-input" placeholder="SEO consultant, technical SEO">
                                </div>
                            </div>

                        </div>
                    </div>

                </form>
            </div>

            <!-- ================= RIGHT COLUMN: LIVE SIMULATOR & EXPORT ================= -->
            <div>
                
                <!-- Preview Mode Switcher Tabs -->
                <div class="preview-mode-bar">
                    <button type="button" class="preview-tab-btn active" onclick="switchPreviewMode('desktop', this)">
                        <i class="fa-solid fa-desktop"></i> Google Desktop
                    </button>
                    <button type="button" class="preview-tab-btn" onclick="switchPreviewMode('mobile', this)">
                        <i class="fa-solid fa-mobile-screen"></i> Google Mobile
                    </button>
                    <button type="button" class="preview-tab-btn" onclick="switchPreviewMode('facebook', this)">
                        <i class="fa-brands fa-facebook"></i> Facebook
                    </button>
                    <button type="button" class="preview-tab-btn" onclick="switchPreviewMode('twitter', this)">
                        <i class="fa-brands fa-x-twitter"></i> Twitter / X
                    </button>
                    <button type="button" class="preview-tab-btn" onclick="switchPreviewMode('linkedin', this)">
                        <i class="fa-brands fa-linkedin"></i> LinkedIn
                    </button>
                </div>

                <!-- Live Preview Display Card -->
                <div class="preview-display-card">
                    
                    <!-- 1. GOOGLE DESKTOP PREVIEW -->
                    <div id="prev_desktop" class="serp-preview-pane">
                        <div class="preview-pane-header">
                            <span style="display: flex; align-items: center; gap: 6px;">
                                <i class="fa-brands fa-google" style="color: #4285f4;"></i> Google Desktop Search Result
                            </span>
                            <span class="preview-badge">Max ~600px width</span>
                        </div>
                        
                        <div class="google-desktop-box">
                            <!-- Breadcrumb line with Favicon & 3 Dots -->
                            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 5px;">
                                <div style="display: flex; align-items: center; gap: 10px;">
                                    <div class="google-favicon-circle">
                                        <i class="fa-solid fa-globe"></i>
                                    </div>
                                    <div style="display: flex; flex-direction: column;">
                                        <span id="dt_sitename" style="font-size: 0.88rem; color: #202124; font-weight: 500; line-height: 1.2;">abdullahseo.com</span>
                                        <span id="dt_breadcrumb" style="font-size: 0.75rem; color: #4d5156; line-height: 1.2;">https://abdullahseo.com › services › technical-seo</span>
                                    </div>
                                </div>
                                <div style="color: #70757a; font-size: 0.85rem; cursor: pointer;">
                                    <i class="fa-solid fa-ellipsis-vertical"></i>
                                </div>
                            </div>

                            <!-- Clickable Title -->
                            <h3 id="dt_title" class="google-desktop-title">
                                Technical SEO Consultant & Organic Growth Services | MD Abdullah
                            </h3>

                            <!-- Optional Rich Rating Stars -->
                            <div id="dt_rating_row" style="display: none; align-items: center; gap: 6px; font-size: 0.78rem; color: #70757a; margin-bottom: 4px;">
                                <span style="color: #e37400; font-size: 0.85rem;">★★★★★</span>
                                <span style="font-weight: 600; color: #202124;">Rating: 4.9</span>
                                <span>· ‎128 reviews</span>
                            </div>

                            <!-- Snippet description with Date -->
                            <p id="dt_desc" class="google-desktop-desc">
                                <span id="dt_date_badge" style="color: #70757a; font-weight: 500; display: none;">Mar 14, 2026 — </span>Skyrocket organic traffic and search rankings with custom data-driven SEO audits, technical fixes, and high-authority link building.
                            </p>
                        </div>
                    </div>

                    <!-- 2. GOOGLE MOBILE PREVIEW -->
                    <div id="prev_mobile" class="serp-preview-pane" style="display: none;">
                        <div class="preview-pane-header">
                            <span style="display: flex; align-items: center; gap: 6px;">
                                <i class="fa-solid fa-mobile-screen" style="color: #2563eb;"></i> Google Mobile Smartphone Result
                            </span>
                            <span class="preview-badge">Touch Container View</span>
                        </div>
                        
                        <div class="google-mobile-device">
                            <div class="google-mobile-card">
                                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                                    <div class="google-favicon-circle" style="width: 24px; height: 24px; font-size: 0.7rem;">
                                        <i class="fa-solid fa-globe"></i>
                                    </div>
                                    <div style="overflow: hidden;">
                                        <div id="mb_sitename" style="font-size: 0.82rem; color: #202124; font-weight: 600; line-height: 1.2;">abdullahseo.com</div>
                                        <div id="mb_url" style="font-size: 0.72rem; color: #5f6368; line-height: 1.2; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">https://abdullahseo.com/services/technical-seo</div>
                                    </div>
                                </div>
                                <h3 id="mb_title" class="google-mobile-title">
                                    Technical SEO Consultant & Organic Growth Services | MD Abdullah
                                </h3>

                                <!-- Optional Mobile Rating -->
                                <div id="mb_rating_row" style="display: none; align-items: center; gap: 4px; font-size: 0.74rem; color: #70757a; margin-bottom: 4px;">
                                    <span style="color: #e37400;">★★★★★</span>
                                    <span style="font-weight: 600; color: #202124;">4.9 (128)</span>
                                </div>

                                <p id="mb_desc" class="google-mobile-desc">
                                    <span id="mb_date_badge" style="color: #70757a; display: none;">Mar 14, 2026 — </span>Skyrocket organic traffic and search rankings with custom data-driven SEO audits, technical fixes, and high-authority link building.
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- 3. FACEBOOK OPEN GRAPH PREVIEW -->
                    <div id="prev_facebook" class="serp-preview-pane" style="display: none;">
                        <div class="preview-pane-header">
                            <span style="display: flex; align-items: center; gap: 6px;">
                                <i class="fa-brands fa-facebook" style="color: #1877f2;"></i> Facebook Share Snippet
                            </span>
                            <span class="preview-badge">1200 x 630px OG Image</span>
                        </div>
                        
                        <div class="social-card-container">
                            <div id="fb_image_box" class="social-image-wrap">
                                <img id="fb_image" src="" alt="OG Image" style="width: 100%; height: 100%; object-fit: cover; display: none;">
                                <div id="fb_img_placeholder" class="social-placeholder">
                                    <i class="fa-regular fa-image" style="font-size: 2.4rem; display: block; margin-bottom: 8px; color: #94a3b8;"></i>
                                    <span>Recommended: 1200 x 630 pixels (1.91:1)</span>
                                </div>
                            </div>
                            <div style="padding: 14px 16px; background: #f0f2f5;">
                                <div id="fb_domain" style="font-size: 0.76rem; color: #65676b; text-transform: uppercase; font-weight: 700; margin-bottom: 3px;">ABDULLAHSEO.COM</div>
                                <div id="fb_title" style="font-size: 1.05rem; font-weight: 700; color: #050505; line-height: 1.3; margin-bottom: 4px;">Technical SEO Consultant & Organic Growth Services</div>
                                <div id="fb_desc" style="font-size: 0.85rem; color: #65676b; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">Skyrocket organic traffic and search rankings with custom data-driven SEO audits.</div>
                            </div>
                        </div>
                    </div>

                    <!-- 4. TWITTER / X CARD PREVIEW -->
                    <div id="prev_twitter" class="serp-preview-pane" style="display: none;">
                        <div class="preview-pane-header">
                            <span style="display: flex; align-items: center; gap: 6px;">
                                <i class="fa-brands fa-x-twitter" style="color: #0f1419;"></i> Twitter / X Large Summary Card
                            </span>
                            <span class="preview-badge">Summary Large Image</span>
                        </div>
                        
                        <div class="social-card-container" style="border-radius: 16px;">
                            <div id="tw_image_box" class="social-image-wrap" style="background: #0f172a;">
                                <img id="tw_image" src="" alt="Twitter Image" style="width: 100%; height: 100%; object-fit: cover; display: none;">
                                <div id="tw_img_placeholder" class="social-placeholder" style="color: #94a3b8;">
                                    <i class="fa-brands fa-x-twitter" style="font-size: 2.4rem; display: block; margin-bottom: 8px; color: #ffffff;"></i>
                                    <span>Twitter Summary Large Image (1200 x 600px)</span>
                                </div>
                            </div>
                            <div style="padding: 14px 16px; background: #ffffff;">
                                <div id="tw_domain" style="font-size: 0.82rem; color: #536471; margin-bottom: 3px;">abdullahseo.com</div>
                                <div id="tw_title" style="font-size: 1rem; font-weight: 700; color: #0f1419; line-height: 1.35; margin-bottom: 4px;">Technical SEO Consultant & Organic Growth Services</div>
                                <div id="tw_desc" style="font-size: 0.85rem; color: #536471; line-height: 1.45;">Skyrocket organic traffic and search rankings with custom data-driven SEO audits.</div>
                            </div>
                        </div>
                    </div>

                    <!-- 5. LINKEDIN SHARE PREVIEW -->
                    <div id="prev_linkedin" class="serp-preview-pane" style="display: none;">
                        <div class="preview-pane-header">
                            <span style="display: flex; align-items: center; gap: 6px;">
                                <i class="fa-brands fa-linkedin" style="color: #0a66c2;"></i> LinkedIn Feed Post Preview
                            </span>
                            <span class="preview-badge">Professional Feed Card</span>
                        </div>
                        
                        <div class="social-card-container" style="border-radius: 8px;">
                            <div id="li_image_box" class="social-image-wrap" style="background: #e2e8f0;">
                                <img id="li_image" src="" alt="LinkedIn Image" style="width: 100%; height: 100%; object-fit: cover; display: none;">
                                <div id="li_img_placeholder" class="social-placeholder">
                                    <i class="fa-brands fa-linkedin" style="font-size: 2.4rem; display: block; margin-bottom: 8px; color: #0a66c2;"></i>
                                    <span>LinkedIn Share Image Preview (1200 x 627px)</span>
                                </div>
                            </div>
                            <div style="padding: 12px 16px; background: #f3f2ef;">
                                <div id="li_title" style="font-size: 0.98rem; font-weight: 700; color: #000000; line-height: 1.3; margin-bottom: 4px;">Technical SEO Consultant & Organic Growth Services</div>
                                <div id="li_domain" style="font-size: 0.78rem; color: #666666;">abdullahseo.com · 1 min read</div>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- Generated HTML Meta Code Snippet Card -->
                <div class="meta-code-card">
                    <div class="meta-code-header">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <i class="fa-solid fa-code" style="color: #60a5fa;"></i>
                            <span style="color: #f8fafc; font-weight: 700; font-size: 0.88rem;">Ready-to-Use HTML Meta Tags</span>
                        </div>
                        <div style="display: flex; gap: 8px;">
                            <button type="button" onclick="downloadMetaHtml()" class="code-action-btn" style="background: #334155;">
                                <i class="fa-solid fa-download"></i> Download
                            </button>
                            <button type="button" onclick="copyMetaTags()" id="copyMetaBtn" class="code-action-btn" style="background: #2563eb;">
                                <i class="fa-solid fa-copy"></i> Copy All
                            </button>
                        </div>
                    </div>

                    <div style="padding: 16px 20px; background: #0f172a;">
                        <pre id="metaOutput" class="code-pre-block"></pre>
                    </div>
                </div>

            </div>

        </div>

        <!-- SEO Best Practice Guidelines Grid -->
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 32px; margin-bottom: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
            <div style="text-align: center; margin-bottom: 28px;">
                <h3 style="font-size: 1.4rem; font-weight: 800; color: #0f172a; margin-bottom: 6px;">
                    Google SERP & Meta Tag Optimization Guidelines
                </h3>
                <p style="font-size: 0.92rem; color: #64748b;">Follow these proven standards to maximize CTR and organic search impressions</p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px;">
                <div class="guideline-card">
                    <div class="guideline-icon" style="background: #eff6ff; color: #2563eb;">
                        <i class="fa-solid fa-heading"></i>
                    </div>
                    <h4 style="font-size: 1rem; font-weight: 700; color: #0f172a; margin-bottom: 6px;">Title Pixel Limits</h4>
                    <p style="font-size: 0.85rem; color: #64748b; line-height: 1.5;">
                        Google calculates titles by pixels (max ~600px). Keep your primary keyword at the beginning and limit to 50–60 characters to avoid trailing ellipses (...).
                    </p>
                </div>

                <div class="guideline-card">
                    <div class="guideline-icon" style="background: #f0fdf4; color: #16a34a;">
                        <i class="fa-solid fa-paragraph"></i>
                    </div>
                    <h4 style="font-size: 1rem; font-weight: 700; color: #0f172a; margin-bottom: 6px;">Compelling Descriptions</h4>
                    <p style="font-size: 0.85rem; color: #64748b; line-height: 1.5;">
                        Meta descriptions do not directly influence rank scores, but heavily impact CTR. Use a direct value proposition and a clear Call-to-Action within 120-160 characters.
                    </p>
                </div>

                <div class="guideline-card">
                    <div class="guideline-icon" style="background: #faf5ff; color: #9333ea;">
                        <i class="fa-solid fa-share-nodes"></i>
                    </div>
                    <h4 style="font-size: 1rem; font-weight: 700; color: #0f172a; margin-bottom: 6px;">OpenGraph & Twitter Cards</h4>
                    <p style="font-size: 0.85rem; color: #64748b; line-height: 1.5;">
                        Ensure your social cards have a 1200x630px high-resolution banner. This dramatically increases social engagement, clicks, and backlink referrals.
                    </p>
                </div>
            </div>
        </div>

        <!-- Consultation & Action Banner -->
        <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 14px; padding: 36px; color: #ffffff; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 24px; box-shadow: 0 10px 30px rgba(15,23,42,0.1);">
            <div style="max-width: 680px;">
                <span style="font-size: 0.8rem; text-transform: uppercase; font-weight: 800; color: #60a5fa; letter-spacing: 0.08em; display: block; margin-bottom: 8px;">
                    Enterprise CTR & Organic Traffic Optimization
                </span>
                <h3 style="font-size: 1.6rem; font-weight: 800; color: #ffffff; margin-bottom: 8px;">
                    Need Full-Site Metadata Audits & Schema Markup?
                </h3>
                <p style="font-size: 0.95rem; color: #cbd5e1; line-height: 1.6; margin: 0;">
                    Hire <strong>MD Abdullah</strong> to audit your entire website's meta architecture, eliminate duplicate snippets, and build rich Google search features that dominate page one.
                </p>
            </div>
            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                <a href="<?= url('/tools/website-seo-analyzer') ?>" style="background: #334155; color: #ffffff; text-decoration: none; padding: 12px 22px; border-radius: 8px; font-weight: 700; font-size: 0.92rem; display: inline-flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.2s;">
                    <i class="fa-solid fa-gauge-high"></i> Run Full Audit
                </a>
                <a href="<?= url('/contact') ?>" style="background: #2563eb; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 700; font-size: 0.92rem; display: inline-flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 14px rgba(37,99,235,0.4); transition: all 0.2s;">
                    <i class="fa-solid fa-comments"></i> Book Free Consultation
                </a>
            </div>
        </div>

    </div>
</div>

<style>
/* Layout Grid */
.serp-workspace-grid {
    display: grid;
    grid-template-columns: 1fr 1.15fr;
    gap: 28px;
    align-items: start;
    margin-bottom: 40px;
}
@media (max-width: 960px) {
    .serp-workspace-grid {
        grid-template-columns: 1fr;
    }
}

/* Card Box */
.serp-card-box {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    padding: 26px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.03);
}

/* Preset Buttons */
.preset-pill-btn {
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
    color: #475569;
    padding: 6px 14px;
    border-radius: 9999px;
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s;
}
.preset-pill-btn:hover {
    background: #2563eb;
    color: #ffffff;
    border-color: #2563eb;
}

/* Form Styles */
.serp-form-group {
    margin-bottom: 18px;
}
.serp-lbl {
    font-size: 0.84rem;
    font-weight: 700;
    color: #1e293b;
    display: block;
}
.serp-counter-badge {
    font-size: 0.76rem;
    font-weight: 700;
    color: #10b981;
    font-family: 'Fira Code', monospace;
}
.serp-input, .serp-select {
    width: 100%;
    box-sizing: border-box;
    padding: 10px 14px;
    border: 1.5px solid #cbd5e1;
    border-radius: 8px;
    font-size: 0.92rem;
    color: #0f172a;
    background: #ffffff;
    outline: none;
    transition: all 0.2s;
    font-family: inherit;
}
.serp-input:focus, .serp-select:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37,99,235,0.15);
}
.serp-hint {
    font-size: 0.74rem;
    color: #64748b;
    display: block;
    margin-top: 4px;
}
.serp-progress-track {
    height: 4px;
    background: #e2e8f0;
    border-radius: 2px;
    margin-top: 6px;
    overflow: hidden;
}
.serp-progress-fill {
    height: 100%;
    background: #10b981;
    transition: width 0.2s, background-color 0.2s;
}

/* Collapsible Toggle */
.serp-toggle-btn {
    width: 100%;
    background: none;
    border: none;
    padding: 6px 0;
    color: #2563eb;
    font-size: 0.88rem;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

/* Preview Tabs */
.preview-mode-bar {
    display: flex;
    gap: 6px;
    background: #e2e8f0;
    padding: 5px;
    border-radius: 10px;
    margin-bottom: 18px;
    overflow-x: auto;
}
.preview-tab-btn {
    flex: 1;
    background: transparent;
    border: none;
    padding: 9px 12px;
    border-radius: 7px;
    font-size: 0.82rem;
    font-weight: 700;
    color: #64748b;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    white-space: nowrap;
    transition: all 0.2s;
}
.preview-tab-btn:hover {
    color: #0f172a;
}
.preview-tab-btn.active {
    background: #ffffff;
    color: #2563eb;
    box-shadow: 0 2px 6px rgba(0,0,0,0.08);
}

/* Display Card */
.preview-display-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    padding: 24px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.03);
    min-height: 240px;
    margin-bottom: 24px;
}
.preview-pane-header {
    font-size: 0.82rem;
    font-weight: 800;
    color: #475569;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.preview-badge {
    font-size: 0.72rem;
    background: #f1f5f9;
    padding: 3px 8px;
    border-radius: 4px;
    color: #64748b;
    font-weight: 600;
}

/* 1. Google Desktop Preview Component */
.google-desktop-box {
    background: #ffffff;
    border: 1px solid #f1f5f9;
    border-radius: 10px;
    padding: 16px 20px;
    font-family: arial, sans-serif;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
.google-favicon-circle {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: #f1f5f9;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    color: #2563eb;
    border: 1px solid #e2e8f0;
    flex-shrink: 0;
}
.google-desktop-title {
    font-size: 1.25rem;
    font-weight: 400;
    color: #1a0dab;
    margin: 4px 0 6px;
    line-height: 1.3;
    cursor: pointer;
    text-decoration: none;
    word-break: break-word;
}
.google-desktop-title:hover {
    text-decoration: underline;
}
.google-desktop-desc {
    font-size: 0.88rem;
    color: #4d5156;
    line-height: 1.5;
    margin: 0;
    word-break: break-word;
}

/* 2. Google Mobile Preview Component */
.google-mobile-device {
    max-width: 380px;
    margin: 0 auto;
    background: #f8fafc;
    border: 1.5px solid #cbd5e1;
    border-radius: 16px;
    padding: 16px;
    box-shadow: 0 6px 18px rgba(0,0,0,0.06);
}
.google-mobile-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 14px;
    font-family: -apple-system, Roboto, sans-serif;
}
.google-mobile-title {
    font-size: 1.05rem;
    font-weight: 500;
    color: #1a0dab;
    margin: 6px 0;
    line-height: 1.35;
    word-break: break-word;
}
.google-mobile-desc {
    font-size: 0.82rem;
    color: #4d5156;
    line-height: 1.45;
    margin: 0;
    word-break: break-word;
}

/* Social Card Components */
.social-card-container {
    border: 1px solid #dadde1;
    border-radius: 10px;
    overflow: hidden;
    background: #ffffff;
    max-width: 500px;
    margin: 0 auto;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    box-shadow: 0 4px 14px rgba(0,0,0,0.05);
}
.social-image-wrap {
    height: 220px;
    background: #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
}
.social-placeholder {
    color: #64748b;
    text-align: center;
    font-size: 0.85rem;
    font-weight: 600;
    padding: 20px;
}

/* Code Snippet Box */
.meta-code-card {
    background: #0f172a;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.15);
    border: 1px solid #1e293b;
}
.meta-code-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
    background: #1e293b;
    border-bottom: 1px solid #334155;
}
.code-action-btn {
    color: #ffffff;
    border: none;
    padding: 6px 14px;
    border-radius: 6px;
    font-size: 0.78rem;
    font-weight: 700;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s;
}
.code-pre-block {
    margin: 0;
    max-height: 280px;
    overflow-y: auto;
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 0.82rem;
    line-height: 1.55;
    color: #f8fafc;
    white-space: pre-wrap;
    word-break: break-all;
}

/* Guidelines */
.guideline-card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 20px;
}
.guideline-icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    margin-bottom: 12px;
}
</style>

<script>
let currentPreviewMode = 'desktop';

const presets = {
    agency: {
        title: 'Enterprise SEO Consultant & Organic Growth Services | MD Abdullah',
        desc: 'Scale organic search traffic, fix technical crawl bottlenecks, and dominate high-intent keywords with bespoke SEO audit & advisory services by MD Abdullah.',
        url: 'https://abdullahseo.com/services/technical-seo',
        image: 'https://abdullahseo.com/assets/images/technical-seo-banner.jpg',
        sitename: 'MD Abdullah SEO',
        robots: 'index, follow',
        card: 'summary_large_image',
        author: 'MD Abdullah',
        keywords: 'technical SEO, SEO consultant, organic search growth'
    },
    blog: {
        title: 'How to Fix Core Web Vitals & LCP Latency in 2026 (Step-by-Step Guide)',
        desc: 'Discover actionable strategies to pass Google Core Web Vitals, optimize Largest Contentful Paint (LCP), and eliminate Cumulative Layout Shifts (CLS).',
        url: 'https://abdullahseo.com/blog/core-web-vitals-guide-2026',
        image: 'https://abdullahseo.com/assets/images/core-web-vitals-guide.webp',
        sitename: 'MD Abdullah SEO Blog',
        robots: 'index, follow',
        card: 'summary_large_image',
        author: 'MD Abdullah',
        keywords: 'Core Web Vitals, LCP optimization, site speed SEO'
    },
    ecommerce: {
        title: 'Premium Ergonomic Office Chair with Lumbar Support | ModernDesk',
        desc: 'Engineered for all-day posture support, breathable mesh, and adjustable armrests. Free shipping & 30-day risk-free trial. Buy online today!',
        url: 'https://example-shop.com/products/ergonomic-office-chair',
        image: 'https://images.unsplash.com/photo-1580481077197-9b2f64790938?w=1200&h=630&fit=crop',
        sitename: 'ModernDesk Shop',
        robots: 'index, follow',
        card: 'summary_large_image',
        author: 'ModernDesk Store',
        keywords: 'ergonomic office chair, desk chair, posture support'
    },
    saas: {
        title: 'Automated SEO Audit & Rank Tracking Platform | RankPulse',
        desc: 'Real-time keyword monitoring, automated competitor backlink alerts, and Google algorithm volatility insights for high-growth marketing teams.',
        url: 'https://rankpulse.io/platform/rank-tracker',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop',
        sitename: 'RankPulse SaaS',
        robots: 'index, follow',
        card: 'summary_large_image',
        author: 'RankPulse Team',
        keywords: 'rank tracker, SEO software, automated site audit'
    },
    local: {
        title: 'Top-Rated Emergency Plumber in Dallas, TX | 24/7 Rapid Dispatch',
        desc: 'Licensed & insured Dallas plumbers providing fast pipe repair, water heater replacement, and leak detection. Call (214) 555-0199 for instant response.',
        url: 'https://dallasplumbingpro.com/emergency-repairs',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&h=630&fit=crop',
        sitename: 'Dallas Plumbing Pro',
        robots: 'index, follow',
        card: 'summary_large_image',
        author: 'Dallas Plumbing Pro',
        keywords: 'emergency plumber Dallas, Dallas plumbing services'
    }
};

function toggleAdvancedSerp() {
    const adv = document.getElementById('advancedFields');
    const icon = document.getElementById('advIcon');
    if (adv.style.display === 'none') {
        adv.style.display = 'block';
        icon.style.transform = 'rotate(90deg)';
    } else {
        adv.style.display = 'none';
        icon.style.transform = 'rotate(0deg)';
    }
}

function switchPreviewMode(mode, btn) {
    currentPreviewMode = mode;
    document.querySelectorAll('.preview-tab-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    document.querySelectorAll('.serp-preview-pane').forEach(el => el.style.display = 'none');
    const target = document.getElementById('prev_' + mode);
    if (target) target.style.display = 'block';
}

function loadPreset(key) {
    const p = presets[key] || presets.agency;
    document.getElementById('serp_title').value = p.title;
    document.getElementById('serp_desc').value = p.desc;
    document.getElementById('serp_url').value = p.url;
    document.getElementById('serp_image').value = p.image;
    document.getElementById('serp_sitename').value = p.sitename;
    document.getElementById('serp_robots').value = p.robots;
    document.getElementById('serp_tw_card').value = p.card;
    document.getElementById('serp_author').value = p.author;
    document.getElementById('serp_keywords').value = p.keywords;

    if (key === 'blog' || key === 'saas') {
        document.getElementById('chkShowDate').checked = true;
    } else {
        document.getElementById('chkShowDate').checked = false;
    }

    if (key === 'ecommerce' || key === 'local' || key === 'agency') {
        document.getElementById('chkShowRating').checked = true;
    } else {
        document.getElementById('chkShowRating').checked = false;
    }

    renderSerpPreview();
}

function clearSerpForm() {
    document.getElementById('serpForm').reset();
    renderSerpPreview();
}

function renderSerpPreview() {
    const title = document.getElementById('serp_title').value || 'Example Page Title | Your Brand';
    const desc = document.getElementById('serp_desc').value || 'Enter a meta description to preview how your snippet appears in search engine result pages.';
    const rawUrl = document.getElementById('serp_url').value || 'https://yourwebsite.com/page-slug';
    const imageUrl = document.getElementById('serp_image').value || '';
    const siteName = document.getElementById('serp_sitename').value || 'YourBrand';
    const robots = document.getElementById('serp_robots').value || 'index, follow';
    const twCard = document.getElementById('serp_tw_card').value || 'summary_large_image';
    const author = document.getElementById('serp_author').value || '';
    const keywords = document.getElementById('serp_keywords').value || '';

    const showDate = document.getElementById('chkShowDate').checked;
    const showRating = document.getElementById('chkShowRating').checked;

    // Parse URL domain & path
    let domain = 'yourwebsite.com';
    let path = ' › page-slug';
    try {
        const u = new URL(rawUrl.startsWith('http') ? rawUrl : 'https://' + rawUrl);
        domain = u.hostname;
        path = u.pathname && u.pathname !== '/' ? ' › ' + u.pathname.replace(/^\/|\/$/g, '').replace(/\//g, ' › ') : '';
    } catch(e) {}

    // 1. Progress & Warning Bars
    const titleLen = title.length;
    const titlePx = Math.round(titleLen * 9.8); // approximate Google Arial 20px letter-width
    const titleCounter = document.getElementById('titleCounter');
    const titleBar = document.getElementById('titleProgressBar');
    titleCounter.textContent = `${titleLen} / 60 chars (${titlePx}px / 600px)`;

    if (titleLen <= 60 && titlePx <= 600) {
        titleCounter.style.color = '#10b981';
        titleBar.style.background = '#10b981';
        titleBar.style.width = Math.min(100, (titleLen / 60) * 100) + '%';
    } else {
        titleCounter.style.color = '#ef4444';
        titleBar.style.background = '#ef4444';
        titleBar.style.width = '100%';
    }

    const descLen = desc.length;
    const descPx = Math.round(descLen * 6.2);
    const descCounter = document.getElementById('descCounter');
    const descBar = document.getElementById('descProgressBar');
    descCounter.textContent = `${descLen} / 160 chars (${descPx}px / 960px)`;

    if (descLen <= 160 && descPx <= 960) {
        descCounter.style.color = '#10b981';
        descBar.style.background = '#10b981';
        descBar.style.width = Math.min(100, (descLen / 160) * 100) + '%';
    } else {
        descCounter.style.color = '#ef4444';
        descBar.style.background = '#ef4444';
        descBar.style.width = '100%';
    }

    // 2. Google Desktop Snippet
    document.getElementById('dt_sitename').textContent = siteName || domain;
    document.getElementById('dt_breadcrumb').textContent = `https://${domain}${path}`;
    document.getElementById('dt_title').textContent = titleLen > 65 ? title.substring(0, 62) + '...' : title;
    
    const dtDateBadge = document.getElementById('dt_date_badge');
    if (dtDateBadge) dtDateBadge.style.display = showDate ? 'inline' : 'none';
    
    const dtRatingRow = document.getElementById('dt_rating_row');
    if (dtRatingRow) dtRatingRow.style.display = showRating ? 'flex' : 'none';

    document.getElementById('dt_desc').innerHTML = (showDate ? '<span style="color: #70757a; font-weight: 500;">Mar 14, 2026 — </span>' : '') + escapeHtml(descLen > 165 ? desc.substring(0, 160) + '...' : desc);

    // 3. Google Mobile Snippet
    document.getElementById('mb_sitename').textContent = siteName || domain;
    document.getElementById('mb_url').textContent = `https://${domain}${path}`;
    document.getElementById('mb_title').textContent = titleLen > 65 ? title.substring(0, 62) + '...' : title;
    
    const mbRatingRow = document.getElementById('mb_rating_row');
    if (mbRatingRow) mbRatingRow.style.display = showRating ? 'flex' : 'none';

    document.getElementById('mb_desc').innerHTML = (showDate ? '<span style="color: #70757a;">Mar 14, 2026 — </span>' : '') + escapeHtml(descLen > 155 ? desc.substring(0, 150) + '...' : desc);

    // 4. Facebook OG Snippet
    document.getElementById('fb_domain').textContent = domain.toUpperCase();
    document.getElementById('fb_title').textContent = title;
    document.getElementById('fb_desc').textContent = desc;
    renderImageHelper('fb_image', 'fb_img_placeholder', imageUrl);

    // 5. Twitter / X Snippet
    document.getElementById('tw_domain').textContent = domain;
    document.getElementById('tw_title').textContent = title;
    document.getElementById('tw_desc').textContent = desc;
    renderImageHelper('tw_image', 'tw_img_placeholder', imageUrl);

    // 6. LinkedIn Snippet
    document.getElementById('li_domain').textContent = domain + ' · 1 min read';
    document.getElementById('li_title').textContent = title;
    renderImageHelper('li_image', 'li_img_placeholder', imageUrl);

    // 7. Generate HTML Meta Tags
    let tags = `<!-- Primary SEO Meta Tags -->
<title>${escapeHtml(title)}</title>
<meta name="title" content="${escapeHtml(title)}">
<meta name="description" content="${escapeHtml(desc)}">
${keywords ? `<meta name="keywords" content="${escapeHtml(keywords)}">\n` : ''}${author ? `<meta name="author" content="${escapeHtml(author)}">\n` : ''}<meta name="robots" content="${escapeHtml(robots)}">
<link rel="canonical" href="${escapeHtml(rawUrl)}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${escapeHtml(rawUrl)}">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(desc)}">
${imageUrl ? `<meta property="og:image" content="${escapeHtml(imageUrl)}">\n` : ''}${siteName ? `<meta property="og:site_name" content="${escapeHtml(siteName)}">\n` : ''}
<!-- Twitter / X -->
<meta property="twitter:card" content="${escapeHtml(twCard)}">
<meta property="twitter:url" content="${escapeHtml(rawUrl)}">
<meta property="twitter:title" content="${escapeHtml(title)}">
<meta property="twitter:description" content="${escapeHtml(desc)}">
${imageUrl ? `<meta property="twitter:image" content="${escapeHtml(imageUrl)}">` : ''}`;

    document.getElementById('metaOutput').textContent = tags;
}

function renderImageHelper(imgId, placeholderId, url) {
    const img = document.getElementById(imgId);
    const placeholder = document.getElementById(placeholderId);
    if (!img || !placeholder) return;

    if (url) {
        img.src = url;
        img.style.display = 'block';
        placeholder.style.display = 'none';
        img.onerror = () => {
            img.style.display = 'none';
            placeholder.style.display = 'block';
        };
    } else {
        img.style.display = 'none';
        placeholder.style.display = 'block';
    }
}

function escapeHtml(str) {
    return (str || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function copyMetaTags() {
    const text = document.getElementById('metaOutput').textContent;
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById('copyMetaBtn');
        const orig = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        btn.style.background = '#10b981';
        setTimeout(() => {
            btn.innerHTML = orig;
            btn.style.background = '#2563eb';
        }, 2000);
    });
}

function downloadMetaHtml() {
    const text = document.getElementById('metaOutput').textContent;
    const blob = new Blob([text], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'seo-meta-tags.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

document.addEventListener('DOMContentLoaded', () => {
    loadPreset('agency');
});
</script>

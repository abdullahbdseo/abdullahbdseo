<?php
// views/public/tools/schema_generator.php - Interactive Schema Markup (JSON-LD) Generator
?>

<div class="tool-page-wrapper" style="background: #ffffff; min-height: 100vh; padding-top: 30px; padding-bottom: 80px;">
    <div class="container" style="max-width: 1060px; margin: 0 auto; padding: 0 20px;">
        
        <!-- Breadcrumb Pill -->
        <nav aria-label="Breadcrumb" style="margin-bottom: 20px;">
            <ol style="display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px; border-radius: 6px; background: #f1f5f9; border: 1px solid #e2e8f0; font-size: 0.85rem; font-weight: 500; color: #64748b; list-style: none; margin: 0;">
                <li style="display: inline-flex; align-items: center; gap: 6px;">
                    <a href="<?= url('/') ?>" style="color: #475569; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
                        <i class="fa-solid fa-house" style="font-size: 0.78rem;"></i> Home
                    </a>
                </li>
                <li><i class="fa-solid fa-angle-right" style="font-size: 0.72rem; color: #94a3b8;"></i></li>
                <li>
                    <a href="<?= url('/tools') ?>" style="color: #475569; text-decoration: none;">Tools</a>
                </li>
                <li><i class="fa-solid fa-angle-right" style="font-size: 0.72rem; color: #94a3b8;"></i></li>
                <li style="color: #0f172a; font-weight: 600;">Schema Markup Generator</li>
            </ol>
        </nav>

        <!-- Header -->
        <div style="text-align: center; margin-bottom: 36px;">
            <div style="display: inline-flex; align-items: center; gap: 8px; padding: 5px 14px; background: #eff6ff; border: 1px solid #dbeafe; border-radius: 9999px; color: #2563eb; font-size: 0.82rem; font-weight: 600; margin-bottom: 12px;">
                <i class="fa-solid fa-code"></i> Structured Data & Rich Snippets Tool
            </div>
            <h1 style="font-size: 2.6rem; font-weight: 800; color: #0f172a; letter-spacing: -0.03em; margin: 0 0 12px; line-height: 1.15;">
                Schema Markup (JSON-LD) Generator
            </h1>
            <p style="font-size: 1.05rem; color: #475569; max-width: 720px; margin: 0 auto; line-height: 1.6;">
                Generate Google-compliant, error-free JSON-LD structured data in seconds. Boost your click-through rates (CTR) and qualify for rich search snippets.
            </p>
        </div>

        <!-- Schema Type Selector Pills -->
        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-bottom: 32px;">
            <button type="button" class="schema-tab-btn active" data-type="local_business" onclick="switchSchema('local_business', this)">
                <i class="fa-solid fa-store"></i> Local Business
            </button>
            <button type="button" class="schema-tab-btn" data-type="organization" onclick="switchSchema('organization', this)">
                <i class="fa-solid fa-building"></i> Organization
            </button>
            <button type="button" class="schema-tab-btn" data-type="article" onclick="switchSchema('article', this)">
                <i class="fa-solid fa-newspaper"></i> Article / Blog
            </button>
            <button type="button" class="schema-tab-btn" data-type="faq" onclick="switchSchema('faq', this)">
                <i class="fa-solid fa-circle-question"></i> FAQ Page
            </button>
            <button type="button" class="schema-tab-btn" data-type="person" onclick="switchSchema('person', this)">
                <i class="fa-solid fa-user-tie"></i> Person / Author
            </button>
            <button type="button" class="schema-tab-btn" data-type="service" onclick="switchSchema('service', this)">
                <i class="fa-solid fa-briefcase"></i> Service
            </button>
        </div>

        <!-- Two Column Main Layout: Form (Left) vs Real-Time Output (Right) -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 28px; align-items: start; margin-bottom: 50px;" class="tool-split-grid">
            
            <!-- Left Side: Interactive Dynamic Form -->
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
                <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #f1f5f9; padding-bottom: 14px; margin-bottom: 20px;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span id="activeSchemaIcon" style="width: 34px; height: 34px; border-radius: 8px; background: #eff6ff; color: #2563eb; display: flex; align-items: center; justify-content: center; font-size: 1rem;">
                            <i class="fa-solid fa-store"></i>
                        </span>
                        <div>
                            <h3 id="activeSchemaTitle" style="font-size: 1.1rem; font-weight: 700; color: #0f172a; margin: 0;">Local Business Schema</h3>
                            <span style="font-size: 0.78rem; color: #64748b;">Fill in details to update JSON-LD live</span>
                        </div>
                    </div>
                    <button type="button" onclick="loadSampleData()" style="background: #f8fafc; border: 1px solid #cbd5e1; color: #475569; padding: 5px 12px; border-radius: 6px; font-size: 0.78rem; font-weight: 600; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#e2e8f0'" onmouseout="this.style.background='#f8fafc'">
                        <i class="fa-solid fa-wand-magic-sparkles" style="color: #2563eb;"></i> Load Sample
                    </button>
                </div>

                <form id="schemaForm" oninput="updateSchemaOutput()">
                    
                    <!-- LOCAL BUSINESS FIELDS -->
                    <div id="fields_local_business" class="schema-field-group">
                        <div class="form-row">
                            <label class="form-lbl">Business Type</label>
                            <select id="lb_type" class="form-input">
                                <option value="LocalBusiness">General Local Business</option>
                                <option value="ProfessionalService" selected>Professional Service (SEO / Agency)</option>
                                <option value="Store">Store / Retail</option>
                                <option value="Restaurant">Restaurant / Cafe</option>
                                <option value="HealthAndBeautyBusiness">Health & Beauty</option>
                                <option value="RealEstateAgent">Real Estate Agent</option>
                                <option value="AutomotiveBusiness">Automotive Business</option>
                            </select>
                        </div>
                        <div class="form-row">
                            <label class="form-lbl">Business Name *</label>
                            <input type="text" id="lb_name" class="form-input" placeholder="e.g. Abdullah SEO Solutions">
                        </div>
                        <div class="form-row">
                            <label class="form-lbl">Website URL *</label>
                            <input type="url" id="lb_url" class="form-input" placeholder="https://abdullahseo.com">
                        </div>
                        <div class="form-row">
                            <label class="form-lbl">Logo Image URL</label>
                            <input type="url" id="lb_logo" class="form-input" placeholder="https://abdullahseo.com/logo.png">
                        </div>
                        <div class="form-row-2">
                            <div>
                                <label class="form-lbl">Phone Number</label>
                                <input type="text" id="lb_phone" class="form-input" placeholder="+1-555-0199">
                            </div>
                            <div>
                                <label class="form-lbl">Price Range</label>
                                <input type="text" id="lb_price" class="form-input" placeholder="$$$">
                            </div>
                        </div>
                        <div class="form-row">
                            <label class="form-lbl">Street Address</label>
                            <input type="text" id="lb_street" class="form-input" placeholder="123 Growth Boulevard, Suite 400">
                        </div>
                        <div class="form-row-3">
                            <div>
                                <label class="form-lbl">City</label>
                                <input type="text" id="lb_city" class="form-input" placeholder="New York">
                            </div>
                            <div>
                                <label class="form-lbl">State / Region</label>
                                <input type="text" id="lb_state" class="form-input" placeholder="NY">
                            </div>
                            <div>
                                <label class="form-lbl">Postal Code</label>
                                <input type="text" id="lb_zip" class="form-input" placeholder="10001">
                            </div>
                        </div>
                        <div class="form-row-2">
                            <div>
                                <label class="form-lbl">Country (ISO)</label>
                                <input type="text" id="lb_country" class="form-input" placeholder="US">
                            </div>
                            <div>
                                <label class="form-lbl">Opening Hours (e.g. Mo-Fr 09:00-18:00)</label>
                                <input type="text" id="lb_hours" class="form-input" placeholder="Mo-Fr 09:00-18:00">
                            </div>
                        </div>
                    </div>

                    <!-- ORGANIZATION FIELDS -->
                    <div id="fields_organization" class="schema-field-group" style="display: none;">
                        <div class="form-row">
                            <label class="form-lbl">Organization Name *</label>
                            <input type="text" id="org_name" class="form-input" placeholder="e.g. Apex Global Media Inc.">
                        </div>
                        <div class="form-row">
                            <label class="form-lbl">Legal / Alternate Name</label>
                            <input type="text" id="org_legal_name" class="form-input" placeholder="Apex Media Group LLC">
                        </div>
                        <div class="form-row">
                            <label class="form-lbl">Website URL *</label>
                            <input type="url" id="org_url" class="form-input" placeholder="https://example.com">
                        </div>
                        <div class="form-row">
                            <label class="form-lbl">Logo Image URL</label>
                            <input type="url" id="org_logo" class="form-input" placeholder="https://example.com/logo.png">
                        </div>
                        <div class="form-row">
                            <label class="form-lbl">Contact Email / Phone</label>
                            <input type="text" id="org_contact" class="form-input" placeholder="contact@example.com">
                        </div>
                        <div class="form-row">
                            <label class="form-lbl">Social Media Profiles (Comma separated URLs)</label>
                            <textarea id="org_socials" class="form-input" rows="3" placeholder="https://twitter.com/example, https://linkedin.com/company/example"></textarea>
                        </div>
                    </div>

                    <!-- ARTICLE / BLOGPOSTING FIELDS -->
                    <div id="fields_article" class="schema-field-group" style="display: none;">
                        <div class="form-row">
                            <label class="form-lbl">Article Headline *</label>
                            <input type="text" id="art_headline" class="form-input" placeholder="The Definitive Guide to On-Page SEO in 2026">
                        </div>
                        <div class="form-row">
                            <label class="form-lbl">Article Description</label>
                            <textarea id="art_desc" class="form-input" rows="2" placeholder="Master on-page SEO techniques to skyrocket your search rankings."></textarea>
                        </div>
                        <div class="form-row">
                            <label class="form-lbl">Featured Image URL</label>
                            <input type="url" id="art_image" class="form-input" placeholder="https://example.com/blog/featured-image.jpg">
                        </div>
                        <div class="form-row-2">
                            <div>
                                <label class="form-lbl">Author Name *</label>
                                <input type="text" id="art_author" class="form-input" placeholder="MD Abdullah">
                            </div>
                            <div>
                                <label class="form-lbl">Publisher Name</label>
                                <input type="text" id="art_publisher" class="form-input" placeholder="MD Abdullah SEO">
                            </div>
                        </div>
                        <div class="form-row-2">
                            <div>
                                <label class="form-lbl">Date Published</label>
                                <input type="date" id="art_date_pub" class="form-input">
                            </div>
                            <div>
                                <label class="form-lbl">Date Modified</label>
                                <input type="date" id="art_date_mod" class="form-input">
                            </div>
                        </div>
                        <div class="form-row">
                            <label class="form-lbl">Article Canonical URL</label>
                            <input type="url" id="art_url" class="form-input" placeholder="https://example.com/blog/on-page-seo-guide">
                        </div>
                    </div>

                    <!-- FAQ FIELDS -->
                    <div id="fields_faq" class="schema-field-group" style="display: none;">
                        <div id="faqItemsContainer">
                            <!-- Dynamically generated FAQ items -->
                        </div>
                        <button type="button" onclick="addFaqItem()" style="width: 100%; padding: 10px; border: 2px dashed #93c5fd; background: #eff6ff; color: #1d4ed8; border-radius: 8px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.2s;" onmouseover="this.style.background='#dbeafe'" onmouseout="this.style.background='#eff6ff'">
                            <i class="fa-solid fa-plus"></i> Add Another Question & Answer
                        </button>
                    </div>

                    <!-- PERSON / AUTHOR FIELDS -->
                    <div id="fields_person" class="schema-field-group" style="display: none;">
                        <div class="form-row">
                            <label class="form-lbl">Full Name *</label>
                            <input type="text" id="per_name" class="form-input" placeholder="MD Abdullah">
                        </div>
                        <div class="form-row">
                            <label class="form-lbl">Job Title / Role</label>
                            <input type="text" id="per_title" class="form-input" placeholder="Senior Technical SEO Consultant & Organic Growth Strategist">
                        </div>
                        <div class="form-row">
                            <label class="form-lbl">Works For (Company / Agency)</label>
                            <input type="text" id="per_works" class="form-input" placeholder="Abdullah SEO Agency">
                        </div>
                        <div class="form-row">
                            <label class="form-lbl">Personal Website URL</label>
                            <input type="url" id="per_url" class="form-input" placeholder="https://abdullahseo.com">
                        </div>
                        <div class="form-row">
                            <label class="form-lbl">Profile / Avatar Image URL</label>
                            <input type="url" id="per_image" class="form-input" placeholder="https://abdullahseo.com/avatar.jpg">
                        </div>
                        <div class="form-row">
                            <label class="form-lbl">Social Media Profiles (Comma separated URLs)</label>
                            <textarea id="per_socials" class="form-input" rows="3" placeholder="https://linkedin.com/in/md-abdullah, https://twitter.com/abdullahseo"></textarea>
                        </div>
                    </div>

                    <!-- SERVICE FIELDS -->
                    <div id="fields_service" class="schema-field-group" style="display: none;">
                        <div class="form-row">
                            <label class="form-lbl">Service Name *</label>
                            <input type="text" id="srv_name" class="form-input" placeholder="Enterprise Technical SEO Audit & Implementation">
                        </div>
                        <div class="form-row">
                            <label class="form-lbl">Service Provider Name</label>
                            <input type="text" id="srv_provider" class="form-input" placeholder="MD Abdullah">
                        </div>
                        <div class="form-row">
                            <label class="form-lbl">Service Description</label>
                            <textarea id="srv_desc" class="form-input" rows="2" placeholder="Full-suite technical SEO analysis covering site architecture, Core Web Vitals, crawl budget, and indexation."></textarea>
                        </div>
                        <div class="form-row-2">
                            <div>
                                <label class="form-lbl">Service Type / Category</label>
                                <input type="text" id="srv_type" class="form-input" placeholder="Search Engine Optimization">
                            </div>
                            <div>
                                <label class="form-lbl">Area / Geographic Scope</label>
                                <input type="text" id="srv_area" class="form-input" placeholder="Worldwide / Global">
                            </div>
                        </div>
                        <div class="form-row-2">
                            <div>
                                <label class="form-lbl">Price / Rate</label>
                                <input type="text" id="srv_price" class="form-input" placeholder="499">
                            </div>
                            <div>
                                <label class="form-lbl">Currency</label>
                                <input type="text" id="srv_currency" class="form-input" placeholder="USD">
                            </div>
                        </div>
                        <div class="form-row">
                            <label class="form-lbl">Service Page URL</label>
                            <input type="url" id="srv_url" class="form-input" placeholder="https://abdullahseo.com/services/technical-seo">
                        </div>
                    </div>

                </form>
            </div>

            <!-- Right Side: Live JSON-LD Output & Action Panel -->
            <div style="position: sticky; top: 20px;">
                <div style="background: #0f172a; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.15); border: 1px solid #1e293b;">
                    
                    <!-- Code Box Header -->
                    <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 18px; background: #1e293b; border-bottom: 1px solid #334155;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="width: 10px; height: 10px; border-radius: 50%; background: #ef4444; display: inline-block;"></span>
                            <span style="width: 10px; height: 10px; border-radius: 50%; background: #f59e0b; display: inline-block;"></span>
                            <span style="width: 10px; height: 10px; border-radius: 50%; background: #10b981; display: inline-block;"></span>
                            <span style="color: #94a3b8; font-family: monospace; font-size: 0.82rem; margin-left: 8px;">JSON-LD (Structured Data)</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <button type="button" onclick="copySchemaJson()" id="copyJsonBtn" style="background: #2563eb; color: #ffffff; border: none; padding: 6px 14px; border-radius: 6px; font-size: 0.78rem; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.2s;">
                                <i class="fa-solid fa-copy"></i> Copy Code
                            </button>
                        </div>
                    </div>

                    <!-- Code Output Area -->
                    <div style="padding: 16px 18px; position: relative;">
                        <pre style="margin: 0; max-height: 480px; overflow-y: auto; font-family: 'Fira Code', 'Consolas', monospace; font-size: 0.85rem; line-height: 1.55; color: #f8fafc; white-space: pre-wrap; word-break: break-all;" id="schemaOutput">&lt;script type="application/ld+json"&gt;
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "MD Abdullah SEO Solutions",
  "url": "https://abdullahseo.com"
}
&lt;/script&gt;</pre>
                    </div>

                    <!-- Action Bar & Validation Links -->
                    <div style="padding: 14px 18px; background: #131d33; border-top: 1px solid #1e293b; display: flex; flex-wrap: wrap; gap: 10px; justify-content: space-between; align-items: center;">
                        <button type="button" onclick="downloadSchemaJson()" style="background: #334155; color: #f8fafc; border: 1px solid #475569; padding: 7px 14px; border-radius: 6px; font-size: 0.8rem; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
                            <i class="fa-solid fa-download"></i> Download .jsonld
                        </button>
                        <div style="display: flex; gap: 8px;">
                            <a href="https://search.google.com/test/rich-results" target="_blank" rel="noopener noreferrer" style="background: rgba(37, 99, 235, 0.15); color: #60a5fa; border: 1px solid #2563eb; padding: 7px 14px; border-radius: 6px; font-size: 0.8rem; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
                                <i class="fa-brands fa-google"></i> Test with Google <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.7rem;"></i>
                            </a>
                            <a href="https://validator.schema.org/" target="_blank" rel="noopener noreferrer" style="background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid #059669; padding: 7px 14px; border-radius: 6px; font-size: 0.8rem; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
                                <i class="fa-solid fa-check-double"></i> Schema.org Validator <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.7rem;"></i>
                            </a>
                        </div>
                    </div>

                </div>

                <!-- Fast How-To Guide Box -->
                <div style="margin-top: 16px; padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; font-size: 0.85rem; color: #475569; line-height: 1.5;">
                    <strong style="color: #0f172a; display: block; margin-bottom: 6px;">
                        <i class="fa-solid fa-lightbulb" style="color: #f59e0b;"></i> How to use this Schema on your website:
                    </strong>
                    Copy the generated <code>&lt;script&gt;</code> code and paste it inside the <code>&lt;head&gt;</code> section of your HTML, or immediately before the closing <code>&lt;/body&gt;</code> tag.
                </div>
            </div>

        </div>

        <!-- Educational / FAQ Section -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 36px 30px; margin-top: 40px;">
            <h2 style="font-size: 1.5rem; font-weight: 700; color: #0f172a; margin: 0 0 20px; text-align: center;">
                Why JSON-LD Schema Markup is Essential for Modern SEO
            </h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                <div style="background: #ffffff; padding: 20px; border-radius: 10px; border: 1px solid #e2e8f0;">
                    <div style="color: #2563eb; font-size: 1.3rem; margin-bottom: 8px;"><i class="fa-solid fa-star"></i></div>
                    <h3 style="font-size: 1rem; font-weight: 600; color: #0f172a; margin: 0 0 8px;">Earn Google Rich Snippets</h3>
                    <p style="font-size: 0.88rem; color: #64748b; margin: 0; line-height: 1.5;">Structured data enables Google search enhancements such as review stars, FAQ dropdowns, breadcrumbs, and business panels.</p>
                </div>
                <div style="background: #ffffff; padding: 20px; border-radius: 10px; border: 1px solid #e2e8f0;">
                    <div style="color: #10b981; font-size: 1.3rem; margin-bottom: 8px;"><i class="fa-solid fa-arrow-trend-up"></i></div>
                    <h3 style="font-size: 1rem; font-weight: 600; color: #0f172a; margin: 0 0 8px;">Higher Organic Click-Through (CTR)</h3>
                    <p style="font-size: 0.88rem; color: #64748b; margin: 0; line-height: 1.5;">Pages with rich schema take up significantly more visual SERP real estate, resulting in 20% to 35% higher organic CTR.</p>
                </div>
                <div style="background: #ffffff; padding: 20px; border-radius: 10px; border: 1px solid #e2e8f0;">
                    <div style="color: #8b5cf6; font-size: 1.3rem; margin-bottom: 8px;"><i class="fa-solid fa-brain"></i></div>
                    <h3 style="font-size: 1rem; font-weight: 600; color: #0f172a; margin: 0 0 8px;">AI Search & Entity Recognition</h3>
                    <p style="font-size: 0.88rem; color: #64748b; margin: 0; line-height: 1.5;">Helps AI search engines (Google AI Overviews, Perplexity, Bing Copilot) unambiguously understand your entities and content.</p>
                </div>
            </div>
        </div>

    </div>
</div>

<style>
.schema-tab-btn {
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    color: #475569;
    padding: 8px 18px;
    border-radius: 9999px;
    font-size: 0.88rem;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s;
}
.schema-tab-btn:hover {
    background: #e2e8f0;
    color: #0f172a;
}
.schema-tab-btn.active {
    background: #2563eb;
    border-color: #2563eb;
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
}
.form-row {
    margin-bottom: 14px;
}
.form-row-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 14px;
}
.form-row-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    margin-bottom: 14px;
}
.form-lbl {
    display: block;
    font-size: 0.82rem;
    font-weight: 600;
    color: #334155;
    margin-bottom: 5px;
}
.form-input {
    width: 100%;
    box-sizing: border-box;
    padding: 9px 13px;
    border-radius: 7px;
    border: 1px solid #cbd5e1;
    font-size: 0.88rem;
    color: #0f172a;
    background: #ffffff;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
}
.form-input:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}
@media (max-width: 860px) {
    .tool-split-grid {
        grid-template-columns: 1fr !important;
    }
}
</style>

<script>
let currentSchemaType = 'local_business';
let faqItems = [
    { q: 'What is SEO and how does it help my business?', a: 'SEO (Search Engine Optimization) improves your organic visibility on search engines to drive relevant leads and sales.' },
    { q: 'How long does it take to see SEO results?', a: 'Typically, noticeable ranking and traffic improvements appear within 3 to 6 months of continuous technical and content optimization.' }
];

const schemaMeta = {
    'local_business': { title: 'Local Business Schema', icon: 'fa-solid fa-store' },
    'organization': { title: 'Organization Schema', icon: 'fa-solid fa-building' },
    'article': { title: 'Article / Blog Schema', icon: 'fa-solid fa-newspaper' },
    'faq': { title: 'FAQ Page Schema', icon: 'fa-solid fa-circle-question' },
    'person': { title: 'Person / Author Schema', icon: 'fa-solid fa-user-tie' },
    'service': { title: 'Service Schema', icon: 'fa-solid fa-briefcase' }
};

function switchSchema(type, btn) {
    currentSchemaType = type;
    document.querySelectorAll('.schema-tab-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    document.querySelectorAll('.schema-field-group').forEach(el => el.style.display = 'none');
    const targetGroup = document.getElementById('fields_' + type);
    if (targetGroup) targetGroup.style.display = 'block';

    const meta = schemaMeta[type];
    if (meta) {
        document.getElementById('activeSchemaTitle').textContent = meta.title;
        document.getElementById('activeSchemaIcon').innerHTML = `<i class="${meta.icon}"></i>`;
    }

    if (type === 'faq') {
        renderFaqItems();
    }

    updateSchemaOutput();
}

function renderFaqItems() {
    const container = document.getElementById('faqItemsContainer');
    if (!container) return;
    container.innerHTML = faqItems.map((item, idx) => `
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin-bottom: 12px; position: relative;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span style="font-size: 0.8rem; font-weight: 700; color: #2563eb;">Question #${idx + 1}</span>
                ${faqItems.length > 1 ? `<button type="button" onclick="removeFaqItem(${idx})" style="background: none; border: none; color: #ef4444; font-size: 0.8rem; cursor: pointer; padding: 2px 6px;"><i class="fa-solid fa-trash"></i></button>` : ''}
            </div>
            <div class="form-row">
                <input type="text" class="form-input" placeholder="Question" value="${escapeHtml(item.q)}" oninput="faqItems[${idx}].q = this.value; updateSchemaOutput();">
            </div>
            <div class="form-row" style="margin-bottom: 0;">
                <textarea class="form-input" rows="2" placeholder="Answer" oninput="faqItems[${idx}].a = this.value; updateSchemaOutput();">${escapeHtml(item.a)}</textarea>
            </div>
        </div>
    `).join('');
}

function addFaqItem() {
    faqItems.push({ q: '', a: '' });
    renderFaqItems();
    updateSchemaOutput();
}

function removeFaqItem(index) {
    if (faqItems.length > 1) {
        faqItems.splice(index, 1);
        renderFaqItems();
        updateSchemaOutput();
    }
}

function escapeHtml(str) {
    return (str || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function loadSampleData() {
    if (currentSchemaType === 'local_business') {
        document.getElementById('lb_name').value = 'MD Abdullah SEO & Digital Growth';
        document.getElementById('lb_url').value = 'https://abdullahseo.com';
        document.getElementById('lb_logo').value = 'https://abdullahseo.com/assets/img/logo.png';
        document.getElementById('lb_phone').value = '+1-800-555-0199';
        document.getElementById('lb_price').value = '$$$';
        document.getElementById('lb_street').value = '742 Evergreen Terrace, Suite 100';
        document.getElementById('lb_city').value = 'Austin';
        document.getElementById('lb_state').value = 'TX';
        document.getElementById('lb_zip').value = '78701';
        document.getElementById('lb_country').value = 'US';
        document.getElementById('lb_hours').value = 'Mo-Fr 09:00-18:00';
    } else if (currentSchemaType === 'organization') {
        document.getElementById('org_name').value = 'Abdullah Growth Systems LLC';
        document.getElementById('org_legal_name').value = 'Abdullah Growth Systems Incorporated';
        document.getElementById('org_url').value = 'https://abdullahseo.com';
        document.getElementById('org_logo').value = 'https://abdullahseo.com/assets/img/logo.png';
        document.getElementById('org_contact').value = 'abdullahbd.seo@gmail.com';
        document.getElementById('org_socials').value = 'https://twitter.com/abdullahseo, https://linkedin.com/in/md-abdullah';
    } else if (currentSchemaType === 'article') {
        document.getElementById('art_headline').value = 'How to Build High-Converting SEO Topic Clusters';
        document.getElementById('art_desc').value = 'Step-by-step strategy for structuring semantic topic clusters to dominate search rankings.';
        document.getElementById('art_image').value = 'https://abdullahseo.com/uploads/topic-clusters.jpg';
        document.getElementById('art_author').value = 'MD Abdullah';
        document.getElementById('art_publisher').value = 'MD Abdullah SEO Platform';
        document.getElementById('art_date_pub').value = '2026-01-15';
        document.getElementById('art_date_mod').value = '2026-03-01';
        document.getElementById('art_url').value = 'https://abdullahseo.com/blog/topic-clusters-guide';
    } else if (currentSchemaType === 'person') {
        document.getElementById('per_name').value = 'MD Abdullah';
        document.getElementById('per_title').value = 'Senior Technical SEO Expert & Organic Growth Consultant';
        document.getElementById('per_works').value = 'Abdullah SEO Agency';
        document.getElementById('per_url').value = 'https://abdullahseo.com';
        document.getElementById('per_image').value = 'https://abdullahseo.com/assets/img/avatar.jpg';
        document.getElementById('per_socials').value = 'https://linkedin.com/in/md-abdullah, https://twitter.com/abdullahseo';
    } else if (currentSchemaType === 'service') {
        document.getElementById('srv_name').value = 'Comprehensive Technical SEO & Speed Audit';
        document.getElementById('srv_provider').value = 'MD Abdullah SEO Solutions';
        document.getElementById('srv_desc').value = 'Deep on-page, indexing, and Core Web Vitals optimization to rank #1 on Google.';
        document.getElementById('srv_type').value = 'Search Engine Optimization';
        document.getElementById('srv_area').value = 'Global';
        document.getElementById('srv_price').value = '650';
        document.getElementById('srv_currency').value = 'USD';
        document.getElementById('srv_url').value = 'https://abdullahseo.com/services/technical-seo';
    }
    updateSchemaOutput();
}

function updateSchemaOutput() {
    let schemaObj = {};

    if (currentSchemaType === 'local_business') {
        schemaObj = {
            "@context": "https://schema.org",
            "@type": document.getElementById('lb_type').value || "LocalBusiness",
            "name": document.getElementById('lb_name').value || "Your Business Name",
            "url": document.getElementById('lb_url').value || "https://yourwebsite.com",
            "logo": document.getElementById('lb_logo').value || undefined,
            "telephone": document.getElementById('lb_phone').value || undefined,
            "priceRange": document.getElementById('lb_price').value || undefined,
            "address": {
                "@type": "PostalAddress",
                "streetAddress": document.getElementById('lb_street').value || undefined,
                "addressLocality": document.getElementById('lb_city').value || undefined,
                "addressRegion": document.getElementById('lb_state').value || undefined,
                "postalCode": document.getElementById('lb_zip').value || undefined,
                "addressCountry": document.getElementById('lb_country').value || undefined
            },
            "openingHours": document.getElementById('lb_hours').value || undefined
        };
    } else if (currentSchemaType === 'organization') {
        const socials = (document.getElementById('org_socials').value || '')
            .split(',')
            .map(s => s.trim())
            .filter(Boolean);

        schemaObj = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": document.getElementById('org_name').value || "Your Organization Name",
            "alternateName": document.getElementById('org_legal_name').value || undefined,
            "url": document.getElementById('org_url').value || "https://yourwebsite.com",
            "logo": document.getElementById('org_logo').value || undefined,
            "contactPoint": document.getElementById('org_contact').value ? {
                "@type": "ContactPoint",
                "contactType": "customer support",
                "email": document.getElementById('org_contact').value
            } : undefined,
            "sameAs": socials.length ? socials : undefined
        };
    } else if (currentSchemaType === 'article') {
        schemaObj = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": document.getElementById('art_headline').value || "Article Headline",
            "description": document.getElementById('art_desc').value || undefined,
            "image": document.getElementById('art_image').value || undefined,
            "author": {
                "@type": "Person",
                "name": document.getElementById('art_author').value || "Author Name"
            },
            "publisher": {
                "@type": "Organization",
                "name": document.getElementById('art_publisher').value || "Publisher Name"
            },
            "datePublished": document.getElementById('art_date_pub').value || undefined,
            "dateModified": document.getElementById('art_date_mod').value || undefined,
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": document.getElementById('art_url').value || "https://yourwebsite.com/article"
            }
        };
    } else if (currentSchemaType === 'faq') {
        schemaObj = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqItems.filter(item => item.q.trim()).map(item => ({
                "@type": "Question",
                "name": item.q,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item.a
                }
            }))
        };
    } else if (currentSchemaType === 'person') {
        const socials = (document.getElementById('per_socials').value || '')
            .split(',')
            .map(s => s.trim())
            .filter(Boolean);

        schemaObj = {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": document.getElementById('per_name').value || "Full Name",
            "jobTitle": document.getElementById('per_title').value || undefined,
            "worksFor": document.getElementById('per_works').value ? {
                "@type": "Organization",
                "name": document.getElementById('per_works').value
            } : undefined,
            "url": document.getElementById('per_url').value || undefined,
            "image": document.getElementById('per_image').value || undefined,
            "sameAs": socials.length ? socials : undefined
        };
    } else if (currentSchemaType === 'service') {
        schemaObj = {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": document.getElementById('srv_name').value || "Service Name",
            "serviceType": document.getElementById('srv_type').value || undefined,
            "description": document.getElementById('srv_desc').value || undefined,
            "provider": {
                "@type": "Person",
                "name": document.getElementById('srv_provider').value || "Provider Name"
            },
            "areaServed": document.getElementById('srv_area').value || undefined,
            "offers": document.getElementById('srv_price').value ? {
                "@type": "Offer",
                "price": document.getElementById('srv_price').value,
                "priceCurrency": document.getElementById('srv_currency').value || "USD"
            } : undefined,
            "url": document.getElementById('srv_url').value || undefined
        };
    }

    // Clean undefined keys recursively
    const cleaned = JSON.parse(JSON.stringify(schemaObj));
    const jsonString = JSON.stringify(cleaned, null, 2);
    const fullCode = `<script type="application/ld+json">\n${jsonString}\n<\/script>`;
    
    document.getElementById('schemaOutput').textContent = fullCode;
}

function copySchemaJson() {
    const text = document.getElementById('schemaOutput').textContent;
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById('copyJsonBtn');
        const orig = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        btn.style.background = '#10b981';
        setTimeout(() => {
            btn.innerHTML = orig;
            btn.style.background = '#2563eb';
        }, 2000);
    });
}

function downloadSchemaJson() {
    const text = document.getElementById('schemaOutput').textContent;
    const blob = new Blob([text], { type: 'application/ld+json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentSchemaType}_schema.jsonld`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    loadSampleData();
});
</script>

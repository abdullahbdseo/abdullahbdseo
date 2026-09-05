<?php
// views/public/tools/robots_sitemap_generator.php - Robots.txt & XML Sitemap Generator / Validator
?>

<div class="tool-page-wrapper" style="background: #ffffff; min-height: 100vh; padding-top: 30px; padding-bottom: 80px;">
    <div class="container" style="max-width: 1080px; margin: 0 auto; padding: 0 20px;">
        
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
                <li style="color: #0f172a; font-weight: 600;">Robots.txt & Sitemap Builder</li>
            </ol>
        </nav>

        <!-- Header -->
        <div style="text-align: center; margin-bottom: 36px;">
            <div style="display: inline-flex; align-items: center; gap: 8px; padding: 5px 14px; background: #eff6ff; border: 1px solid #dbeafe; border-radius: 9999px; color: #2563eb; font-size: 0.82rem; font-weight: 600; margin-bottom: 12px;">
                <i class="fa-solid fa-robot"></i> Crawler & Indexing Control Suite
            </div>
            <h1 style="font-size: 2.6rem; font-weight: 800; color: #0f172a; letter-spacing: -0.03em; margin: 0 0 12px; line-height: 1.15;">
                Robots.txt & XML Sitemap Generator
            </h1>
            <p style="font-size: 1.05rem; color: #475569; max-width: 720px; margin: 0 auto; line-height: 1.6;">
                Create, customize, and validate crawler directives and XML sitemaps to optimize Google crawl budget and protect sensitive directories.
            </p>
        </div>

        <!-- Mode Switcher Tabs -->
        <div style="display: flex; justify-content: center; gap: 12px; margin-bottom: 30px;">
            <button type="button" class="tool-sub-tab active" onclick="switchToolTab('robots', this)">
                <i class="fa-solid fa-robot"></i> Robots.txt Generator & Live Tester
            </button>
            <button type="button" class="tool-sub-tab" onclick="switchToolTab('sitemap', this)">
                <i class="fa-solid fa-sitemap"></i> XML Sitemap Generator
            </button>
        </div>

        <!-- ================= SECTION 1: ROBOTS.TXT ================= -->
        <div id="section_robots">
            
            <!-- Quick Presets -->
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 20px; margin-bottom: 24px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
                <div style="font-size: 0.88rem; font-weight: 700; color: #334155; display: flex; align-items: center; gap: 8px;">
                    <i class="fa-solid fa-bolt" style="color: #f59e0b;"></i> Quick 1-Click Presets:
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    <button type="button" class="preset-pill" onclick="applyRobotsPreset('standard')">Standard Website</button>
                    <button type="button" class="preset-pill" onclick="applyRobotsPreset('wordpress')">WordPress / WooCommerce</button>
                    <button type="button" class="preset-pill" onclick="applyRobotsPreset('ecommerce')">E-Commerce</button>
                    <button type="button" class="preset-pill" onclick="applyRobotsPreset('block_ai')">Block AI Scraping Bots</button>
                    <button type="button" class="preset-pill" onclick="applyRobotsPreset('disallow_all')">Disallow All (Staging)</button>
                </div>
            </div>

            <!-- Two Column Layout -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 28px; align-items: start; margin-bottom: 50px;" class="tool-split-grid">
                
                <!-- Left: Interactive Form & Tester -->
                <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
                    
                    <h3 style="font-size: 1.05rem; font-weight: 700; color: #0f172a; margin: 0 0 16px;">
                        <i class="fa-solid fa-sliders" style="color: #2563eb; margin-right: 6px;"></i> Crawler Directives Builder
                    </h3>

                    <!-- Sitemap Directive -->
                    <div class="form-row">
                        <label class="form-lbl">XML Sitemap URL</label>
                        <input type="url" id="rb_sitemap" class="form-input" placeholder="https://yourwebsite.com/sitemap.xml" oninput="generateRobotsOutput()">
                    </div>

                    <!-- Crawl Delay -->
                    <div class="form-row-2">
                        <div>
                            <label class="form-lbl">Crawl-Delay (Seconds)</label>
                            <select id="rb_delay" class="form-input" onchange="generateRobotsOutput()">
                                <option value="">No Delay (Default)</option>
                                <option value="2">2 Seconds</option>
                                <option value="5">5 Seconds</option>
                                <option value="10">10 Seconds</option>
                            </select>
                        </div>
                        <div>
                            <label class="form-lbl">Default Robot Access</label>
                            <select id="rb_default_access" class="form-input" onchange="generateRobotsOutput()">
                                <option value="allow" selected>Allow All Crawlers</option>
                                <option value="disallow">Disallow All Crawlers</option>
                            </select>
                        </div>
                    </div>

                    <!-- Disallowed Directories List -->
                    <div class="form-row">
                        <label class="form-lbl">Disallowed Paths (One per line)</label>
                        <textarea id="rb_disallow_paths" class="form-input" rows="4" placeholder="/admin/&#10;/cgi-bin/&#10;/tmp/&#10;/private/" oninput="generateRobotsOutput()"></textarea>
                        <p class="tool-field-hint" style="font-size: 0.75rem; color: #64748b; margin-top: 4px;">Enter paths starting with <code>/</code> to block crawlers from indexing them.</p>
                    </div>

                    <!-- Allowed Exceptions -->
                    <div class="form-row">
                        <label class="form-lbl">Allowed Path Exceptions (One per line)</label>
                        <textarea id="rb_allow_paths" class="form-input" rows="2" placeholder="/admin/public/&#10;/wp-admin/admin-ajax.php" oninput="generateRobotsOutput()"></textarea>
                    </div>

                    <!-- Live URL Block / Allow Tester -->
                    <div style="margin-top: 24px; padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px;">
                        <div style="font-size: 0.85rem; font-weight: 700; color: #0f172a; margin-bottom: 8px;">
                            <i class="fa-solid fa-vial-circle-check" style="color: #2563eb;"></i> Live URL Permission Tester:
                        </div>
                        <div style="display: flex; gap: 8px;">
                            <input type="text" id="testPathInput" class="form-input" placeholder="/admin/settings" value="/admin/settings" oninput="testPathAgainstRobots()">
                        </div>
                        <div id="testPathResult" style="margin-top: 10px; font-size: 0.82rem; font-weight: 600; padding: 8px 12px; border-radius: 6px; background: #fee2e2; color: #991b1b; display: flex; align-items: center; gap: 6px;">
                            <i class="fa-solid fa-circle-xmark"></i> BLOCKED — Googlebot cannot crawl this path based on your rules.
                        </div>
                    </div>

                </div>

                <!-- Right: Output Editor & Actions -->
                <div>
                    <div style="background: #0f172a; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.15); border: 1px solid #1e293b;">
                        
                        <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 18px; background: #1e293b; border-bottom: 1px solid #334155;">
                            <span style="color: #94a3b8; font-family: monospace; font-size: 0.82rem;">robots.txt Live File Preview</span>
                            <div style="display: flex; gap: 8px;">
                                <button type="button" onclick="copyRobotsTxt()" id="copyRobotsBtn" style="background: #2563eb; color: #ffffff; border: none; padding: 6px 14px; border-radius: 6px; font-size: 0.78rem; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
                                    <i class="fa-solid fa-copy"></i> Copy
                                </button>
                                <button type="button" onclick="downloadRobotsTxt()" style="background: #334155; color: #ffffff; border: 1px solid #475569; padding: 6px 14px; border-radius: 6px; font-size: 0.78rem; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
                                    <i class="fa-solid fa-download"></i> Download .txt
                                </button>
                            </div>
                        </div>

                        <div style="padding: 16px 18px;">
                            <textarea id="robotsOutput" style="width: 100%; height: 360px; background: transparent; border: none; color: #f8fafc; font-family: 'Fira Code', 'Consolas', monospace; font-size: 0.88rem; line-height: 1.6; resize: vertical; outline: none;" oninput="testPathAgainstRobots()"></textarea>
                        </div>

                    </div>

                    <div style="margin-top: 16px; padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; font-size: 0.85rem; color: #475569; line-height: 1.5;">
                        <strong style="color: #0f172a; display: block; margin-bottom: 6px;">
                            <i class="fa-solid fa-circle-info" style="color: #2563eb;"></i> Where to upload robots.txt:
                        </strong>
                        Place this file directly in the root directory of your domain (e.g. <code>https://yourwebsite.com/robots.txt</code>).
                    </div>
                </div>

            </div>

        </div>

        <!-- ================= SECTION 2: XML SITEMAP ================= -->
        <div id="section_sitemap" style="display: none;">
            
            <div style="display: grid; grid-template-columns: 1fr 1.1fr; gap: 28px; align-items: start; margin-bottom: 50px;" class="tool-split-grid">
                
                <!-- Left: Sitemap URLs Editor -->
                <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px;">
                        <h3 style="font-size: 1.05rem; font-weight: 700; color: #0f172a; margin: 0;">
                            <i class="fa-solid fa-list-check" style="color: #2563eb; margin-right: 6px;"></i> Sitemap Pages List
                        </h3>
                        <button type="button" onclick="loadSampleSitemap()" style="background: #f8fafc; border: 1px solid #cbd5e1; color: #475569; padding: 5px 12px; border-radius: 6px; font-size: 0.78rem; font-weight: 600; cursor: pointer;">
                            <i class="fa-solid fa-wand-magic-sparkles" style="color: #2563eb;"></i> Load Sample
                        </button>
                    </div>

                    <div id="sitemapUrlsContainer">
                        <!-- Dynamic URL cards -->
                    </div>

                    <button type="button" onclick="addSitemapUrl()" style="width: 100%; padding: 10px; border: 2px dashed #93c5fd; background: #eff6ff; color: #1d4ed8; border-radius: 8px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;">
                        <i class="fa-solid fa-plus"></i> Add Another Web Page URL
                    </button>
                </div>

                <!-- Right: XML Output -->
                <div>
                    <div style="background: #0f172a; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.15); border: 1px solid #1e293b;">
                        
                        <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 18px; background: #1e293b; border-bottom: 1px solid #334155;">
                            <span style="color: #94a3b8; font-family: monospace; font-size: 0.82rem;">sitemap.xml Output</span>
                            <div style="display: flex; gap: 8px;">
                                <button type="button" onclick="copySitemapXml()" id="copySitemapBtn" style="background: #2563eb; color: #ffffff; border: none; padding: 6px 14px; border-radius: 6px; font-size: 0.78rem; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
                                    <i class="fa-solid fa-copy"></i> Copy XML
                                </button>
                                <button type="button" onclick="downloadSitemapXml()" style="background: #334155; color: #ffffff; border: 1px solid #475569; padding: 6px 14px; border-radius: 6px; font-size: 0.78rem; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
                                    <i class="fa-solid fa-download"></i> Download .xml
                                </button>
                            </div>
                        </div>

                        <div style="padding: 16px 18px;">
                            <pre style="margin: 0; max-height: 440px; overflow-y: auto; font-family: 'Fira Code', 'Consolas', monospace; font-size: 0.82rem; line-height: 1.5; color: #f8fafc; white-space: pre-wrap; word-break: break-all;" id="sitemapOutput"></pre>
                        </div>

                    </div>
                </div>

            </div>

        </div>

    </div>
</div>

<style>
.tool-sub-tab {
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
    color: #475569;
    padding: 10px 22px;
    border-radius: 9999px;
    font-size: 0.92rem;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s;
}
.tool-sub-tab:hover {
    background: #e2e8f0;
    color: #0f172a;
}
.tool-sub-tab.active {
    background: #2563eb;
    border-color: #2563eb;
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
}
.preset-pill {
    background: #ffffff;
    border: 1px solid #cbd5e1;
    color: #334155;
    padding: 5px 12px;
    border-radius: 6px;
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}
.preset-pill:hover {
    background: #2563eb;
    color: #ffffff;
    border-color: #2563eb;
}
</style>

<script>
function switchToolTab(tab, btn) {
    document.querySelectorAll('.tool-sub-tab').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    if (tab === 'robots') {
        document.getElementById('section_robots').style.display = 'block';
        document.getElementById('section_sitemap').style.display = 'none';
    } else {
        document.getElementById('section_robots').style.display = 'none';
        document.getElementById('section_sitemap').style.display = 'block';
        renderSitemapUrls();
    }
}

// Preset definitions
function applyRobotsPreset(preset) {
    if (preset === 'standard') {
        document.getElementById('rb_sitemap').value = 'https://yourwebsite.com/sitemap.xml';
        document.getElementById('rb_delay').value = '';
        document.getElementById('rb_default_access').value = 'allow';
        document.getElementById('rb_disallow_paths').value = '/admin/\n/cgi-bin/\n/tmp/\n/private/\n/backup/';
        document.getElementById('rb_allow_paths').value = '/';
    } else if (preset === 'wordpress') {
        document.getElementById('rb_sitemap').value = 'https://yourwebsite.com/sitemap_index.xml';
        document.getElementById('rb_delay').value = '';
        document.getElementById('rb_default_access').value = 'allow';
        document.getElementById('rb_disallow_paths').value = '/wp-admin/\n/wp-includes/\n/wp-content/plugins/\n/trackback/\n/xmlrpc.php';
        document.getElementById('rb_allow_paths').value = '/wp-admin/admin-ajax.php';
    } else if (preset === 'ecommerce') {
        document.getElementById('rb_sitemap').value = 'https://yourwebsite.com/sitemap.xml';
        document.getElementById('rb_delay').value = '';
        document.getElementById('rb_default_access').value = 'allow';
        document.getElementById('rb_disallow_paths').value = '/cart/\n/checkout/\n/account/\n/search\n/*?sort=\n/*&filter=';
        document.getElementById('rb_allow_paths').value = '/';
    } else if (preset === 'block_ai') {
        document.getElementById('rb_sitemap').value = 'https://yourwebsite.com/sitemap.xml';
        document.getElementById('rb_delay').value = '';
        document.getElementById('rb_default_access').value = 'allow';
        document.getElementById('rb_disallow_paths').value = '/admin/\n/private/';
        document.getElementById('rb_allow_paths').value = '/';
        
        let custom = `# Block Known AI Scraping Bots\nUser-agent: GPTBot\nDisallow: /\n\nUser-agent: CCBot\nDisallow: /\n\nUser-agent: Bytespider\nDisallow: /\n\nUser-agent: ClaudeBot\nDisallow: /\n\nUser-agent: *\nDisallow: /admin/\nDisallow: /private/\nAllow: /\n\nSitemap: https://yourwebsite.com/sitemap.xml`;
        document.getElementById('robotsOutput').value = custom;
        testPathAgainstRobots();
        return;
    } else if (preset === 'disallow_all') {
        document.getElementById('rb_sitemap').value = '';
        document.getElementById('rb_delay').value = '';
        document.getElementById('rb_default_access').value = 'disallow';
        document.getElementById('rb_disallow_paths').value = '/';
        document.getElementById('rb_allow_paths').value = '';
    }
    generateRobotsOutput();
}

function generateRobotsOutput() {
    const sitemap = document.getElementById('rb_sitemap').value.trim();
    const delay = document.getElementById('rb_delay').value;
    const defaultAccess = document.getElementById('rb_default_access').value;
    const disallowRaw = document.getElementById('rb_disallow_paths').value;
    const allowRaw = document.getElementById('rb_allow_paths').value;

    let lines = [];
    lines.push('# robots.txt generated by MD Abdullah SEO Platform');
    lines.push('User-agent: *');

    if (delay) {
        lines.push(`Crawl-delay: ${delay}`);
    }

    if (defaultAccess === 'disallow' && !disallowRaw.includes('/')) {
        lines.push('Disallow: /');
    }

    const disallows = disallowRaw.split('\n').map(s => s.trim()).filter(Boolean);
    disallows.forEach(p => lines.push(`Disallow: ${p}`));

    const allows = allowRaw.split('\n').map(s => s.trim()).filter(Boolean);
    allows.forEach(p => lines.push(`Allow: ${p}`));

    if (sitemap) {
        lines.push('');
        lines.push(`Sitemap: ${sitemap}`);
    }

    document.getElementById('robotsOutput').value = lines.join('\n');
    testPathAgainstRobots();
}

function testPathAgainstRobots() {
    const content = document.getElementById('robotsOutput').value;
    const testPath = (document.getElementById('testPathInput').value || '').trim();
    const resEl = document.getElementById('testPathResult');

    if (!testPath) {
        resEl.style.display = 'none';
        return;
    }
    resEl.style.display = 'flex';

    // Parse disallows from content
    const disallowMatches = [];
    const lines = content.split('\n');
    lines.forEach(l => {
        const m = l.match(/^\s*Disallow:\s*(.+)$/i);
        if (m) disallowMatches.push(m[1].trim());
    });

    let isBlocked = false;
    for (let rule of disallowMatches) {
        if (rule === '/' || testPath.startsWith(rule)) {
            isBlocked = true;
            break;
        }
    }

    if (isBlocked) {
        resEl.style.background = '#fee2e2';
        resEl.style.color = '#991b1b';
        resEl.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> BLOCKED — Crawlers are restricted from "${escapeHtml(testPath)}"`;
    } else {
        resEl.style.background = '#dcfce7';
        resEl.style.color = '#166534';
        resEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> ALLOWED — Crawlers can freely index "${escapeHtml(testPath)}"`;
    }
}

function copyRobotsTxt() {
    const text = document.getElementById('robotsOutput').value;
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById('copyRobotsBtn');
        const orig = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        btn.style.background = '#10b981';
        setTimeout(() => {
            btn.innerHTML = orig;
            btn.style.background = '#2563eb';
        }, 2000);
    });
}

function downloadRobotsTxt() {
    const text = document.getElementById('robotsOutput').value;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'robots.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ============= SITEMAP GENERATOR LOGIC =============
let sitemapUrls = [
    { loc: 'https://abdullahseo.com/', priority: '1.0', changefreq: 'weekly', lastmod: '2026-03-01' },
    { loc: 'https://abdullahseo.com/services', priority: '0.9', changefreq: 'weekly', lastmod: '2026-03-01' },
    { loc: 'https://abdullahseo.com/portfolio', priority: '0.8', changefreq: 'monthly', lastmod: '2026-02-28' },
    { loc: 'https://abdullahseo.com/blog', priority: '0.8', changefreq: 'daily', lastmod: '2026-03-02' }
];

function renderSitemapUrls() {
    const container = document.getElementById('sitemapUrlsContainer');
    if (!container) return;
    container.innerHTML = sitemapUrls.map((item, idx) => `
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span style="font-size: 0.8rem; font-weight: 700; color: #2563eb;">Page URL #${idx + 1}</span>
                ${sitemapUrls.length > 1 ? `<button type="button" onclick="removeSitemapUrl(${idx})" style="background: none; border: none; color: #ef4444; font-size: 0.8rem; cursor: pointer;"><i class="fa-solid fa-trash"></i></button>` : ''}
            </div>
            <div class="form-row">
                <input type="url" class="form-input" placeholder="https://yourwebsite.com/page" value="${escapeHtml(item.loc)}" oninput="sitemapUrls[${idx}].loc = this.value; generateSitemapXml();">
            </div>
            <div class="form-row-3" style="margin-bottom: 0;">
                <div>
                    <label class="form-lbl">Priority</label>
                    <select class="form-input" onchange="sitemapUrls[${idx}].priority = this.value; generateSitemapXml();">
                        <option value="1.0" ${item.priority === '1.0' ? 'selected' : ''}>1.0 (Home)</option>
                        <option value="0.9" ${item.priority === '0.9' ? 'selected' : ''}>0.9 (Key Service)</option>
                        <option value="0.8" ${item.priority === '0.8' ? 'selected' : ''}>0.8 (High)</option>
                        <option value="0.6" ${item.priority === '0.6' ? 'selected' : ''}>0.6 (Medium)</option>
                        <option value="0.4" ${item.priority === '0.4' ? 'selected' : ''}>0.4 (Low)</option>
                    </select>
                </div>
                <div>
                    <label class="form-lbl">Change Frequency</label>
                    <select class="form-input" onchange="sitemapUrls[${idx}].changefreq = this.value; generateSitemapXml();">
                        <option value="daily" ${item.changefreq === 'daily' ? 'selected' : ''}>daily</option>
                        <option value="weekly" ${item.changefreq === 'weekly' ? 'selected' : ''}>weekly</option>
                        <option value="monthly" ${item.changefreq === 'monthly' ? 'selected' : ''}>monthly</option>
                        <option value="yearly" ${item.changefreq === 'yearly' ? 'selected' : ''}>yearly</option>
                    </select>
                </div>
                <div>
                    <label class="form-lbl">Last Modified</label>
                    <input type="date" class="form-input" value="${item.lastmod}" oninput="sitemapUrls[${idx}].lastmod = this.value; generateSitemapXml();">
                </div>
            </div>
        </div>
    `).join('');
    generateSitemapXml();
}

function addSitemapUrl() {
    const today = new Date().toISOString().split('T')[0];
    sitemapUrls.push({ loc: 'https://abdullahseo.com/new-page', priority: '0.8', changefreq: 'weekly', lastmod: today });
    renderSitemapUrls();
}

function removeSitemapUrl(idx) {
    if (sitemapUrls.length > 1) {
        sitemapUrls.splice(idx, 1);
        renderSitemapUrls();
    }
}

function loadSampleSitemap() {
    sitemapUrls = [
        { loc: 'https://abdullahseo.com/', priority: '1.0', changefreq: 'weekly', lastmod: '2026-03-01' },
        { loc: 'https://abdullahseo.com/services', priority: '0.9', changefreq: 'weekly', lastmod: '2026-03-01' },
        { loc: 'https://abdullahseo.com/services/technical-seo', priority: '0.9', changefreq: 'monthly', lastmod: '2026-03-01' },
        { loc: 'https://abdullahseo.com/portfolio', priority: '0.8', changefreq: 'monthly', lastmod: '2026-02-28' },
        { loc: 'https://abdullahseo.com/blog', priority: '0.8', changefreq: 'daily', lastmod: '2026-03-02' },
        { loc: 'https://abdullahseo.com/contact', priority: '0.7', changefreq: 'monthly', lastmod: '2026-02-20' }
    ];
    renderSitemapUrls();
}

function generateSitemapXml() {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    sitemapUrls.forEach(u => {
        if (u.loc.trim()) {
            xml += `  <url>\n    <loc>${escapeHtml(u.loc.trim())}</loc>\n`;
            if (u.lastmod) xml += `    <lastmod>${u.lastmod}</lastmod>\n`;
            if (u.changefreq) xml += `    <changefreq>${u.changefreq}</changefreq>\n`;
            if (u.priority) xml += `    <priority>${u.priority}</priority>\n`;
            xml += `  </url>\n`;
        }
    });
    xml += `</urlset>`;
    const out = document.getElementById('sitemapOutput');
    if (out) out.textContent = xml;
}

function copySitemapXml() {
    const text = document.getElementById('sitemapOutput').textContent;
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById('copySitemapBtn');
        const orig = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        btn.style.background = '#10b981';
        setTimeout(() => {
            btn.innerHTML = orig;
            btn.style.background = '#2563eb';
        }, 2000);
    });
}

function downloadSitemapXml() {
    const text = document.getElementById('sitemapOutput').textContent;
    const blob = new Blob([text], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function escapeHtml(str) {
    return (str || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

document.addEventListener('DOMContentLoaded', () => {
    applyRobotsPreset('standard');
});
</script>

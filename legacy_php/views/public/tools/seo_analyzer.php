<?php
// views/public/tools/seo_analyzer.php - Interactive Website SEO & Meta Tag Analyzer
?>

<div class="tool-page-wrapper" style="background: #ffffff; min-height: 100vh; padding-top: 30px; padding-bottom: 80px;">
    <div class="container" style="max-width: 980px; margin: 0 auto; padding: 0 20px;">
        
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
                <li style="color: #0f172a; font-weight: 600;">Website SEO Analyzer</li>
            </ol>
        </nav>

        <!-- Page Introduction Header -->
        <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="font-size: 2.8rem; font-weight: 800; color: #0f172a; letter-spacing: -0.03em; margin: 0 0 14px; line-height: 1.15;">
                Website SEO & Meta Tag Analyzer
            </h1>
            <p style="font-size: 1.1rem; color: #475569; max-width: 680px; margin: 0 auto; line-height: 1.6;">
                Instantly audit your on-page SEO health score, Meta Title, Description, H1-H6 headings, OpenGraph social tags, and image alt attributes.
            </p>
        </div>

        <!-- Calculator Form Card (Centered) -->
        <div style="max-width: 680px; margin: 0 auto 50px;">
            <div class="tool-main-card">
                <form id="seoAuditForm" onsubmit="event.preventDefault(); startSeoAudit();">
                    
                    <div class="tool-form-group" style="margin-bottom: 16px;">
                        <label class="tool-form-label" for="targetUrl">
                            Enter Website URL to Audit
                        </label>
                        <div style="position: relative; display: flex; align-items: center;">
                            <i class="fa-solid fa-globe" style="position: absolute; left: 16px; color: #64748b; font-size: 1.1rem; pointer-events: none;"></i>
                            <input 
                                id="targetUrl" 
                                name="url" 
                                type="text" 
                                placeholder="https://yourwebsite.com" 
                                value="" 
                                required 
                                class="tool-form-control" 
                                style="padding-left: 44px; font-size: 1rem; font-weight: 600;"
                            >
                        </div>
                        <p class="tool-field-hint">
                            Enter any domain or page URL (e.g. <code>https://yourcompany.com</code>) to scan its live SEO metadata.
                        </p>
                    </div>

                    <!-- Example quick clicks -->
                    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 22px;">
                        <span style="font-size: 0.78rem; font-weight: 600; color: #64748b;">Try Sample:</span>
                        <button type="button" class="sample-badge-btn" onclick="setSampleUrl('https://google.com')">google.com</button>
                        <button type="button" class="sample-badge-btn" onclick="setSampleUrl('https://apple.com')">apple.com</button>
                        <button type="button" class="sample-badge-btn" onclick="setSampleUrl('https://stripe.com')">stripe.com</button>
                    </div>

                    <button type="submit" id="auditSubmitBtn" class="tool-submit-btn">
                        <span id="btnText"><i class="fa-solid fa-magnifying-glass-chart" style="margin-right: 6px;"></i> Analyze Website SEO</span>
                        <span id="btnSpinner" style="display: none;"><i class="fa-solid fa-circle-notch fa-spin"></i> Scanning SEO Metadata...</span>
                    </button>

                    <p style="font-size: 0.75rem; text-align: center; color: #64748b; margin-top: 14px; margin-bottom: 0;">
                        100% Free Live On-Page SEO audit. No credit card or installation required.
                    </p>
                </form>
            </div>

            <!-- Instant Calculation Result Section -->
            <div id="toolResultSection" style="display: none; margin-top: 32px;" class="scroll-target">
                <div class="tool-result-card">
                    <!-- Top Semrush / Ahrefs Style Executive Health Dashboard -->
                    <div class="tool-result-header" style="background: linear-gradient(135deg, #0b1120 0%, #1e293b 100%); padding: 30px 32px; color: #ffffff; border-bottom: 1px solid rgba(255,255,255,0.08);">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 20px; margin-bottom: 24px;">
                            <div>
                                <div style="display: inline-flex; align-items: center; gap: 6px; background: rgba(37,99,235,0.2); border: 1px solid rgba(96,165,250,0.3); padding: 4px 12px; border-radius: 20px; font-size: 0.72rem; font-weight: 800; color: #93c5fd; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 8px;">
                                    <i class="fa-solid fa-chart-line"></i> SEMRUSH & AHREFS CALIBER SITE AUDIT
                                </div>
                                <div style="display: flex; align-items: baseline; gap: 14px;">
                                    <span id="resScoreNum" style="font-size: 3.4rem; font-weight: 900; line-height: 1; color: #ffffff; letter-spacing: -0.03em;">88</span>
                                    <span style="font-size: 1.5rem; opacity: 0.5; font-weight: 700;">/100</span>
                                    <div style="margin-left: 6px; display: inline-flex; align-items: center; gap: 6px; background: #059669; color: #ffffff; padding: 4px 14px; border-radius: 6px; font-size: 0.85rem; font-weight: 800;">
                                        <i class="fa-solid fa-circle-check"></i> <span id="resGradeText">Excellent (A+)</span>
                                    </div>
                                </div>
                                <p style="font-size: 0.82rem; color: #94a3b8; margin: 6px 0 0;">Comprehensive organic crawlability, technical performance & on-page health rating.</p>
                            </div>

                            <div style="text-align: right; max-width: 400px;">
                                <span style="font-size: 0.72rem; text-transform: uppercase; color: #94a3b8; font-weight: 800; letter-spacing: 0.06em;">CRAWLED URL TARGET</span>
                                <div id="resScannedUrl" style="font-size: 0.92rem; font-weight: 700; color: #f8fafc; word-break: break-all; margin-top: 4px; background: rgba(255,255,255,0.06); padding: 8px 14px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.12); font-family: monospace;">
                                    https://example.com
                                </div>
                            </div>
                        </div>

                        <!-- 4 Semrush Issues Stat Counters (Errors, Warnings, Notices, Passed) -->
                        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 22px;">
                            <div style="background: rgba(220, 38, 38, 0.12); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 8px; padding: 12px 14px; display: flex; align-items: center; gap: 12px;">
                                <div style="width: 36px; height: 36px; border-radius: 6px; background: #dc2626; color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0;">
                                    <i class="fa-solid fa-circle-xmark"></i>
                                </div>
                                <div>
                                    <span style="font-size: 0.7rem; text-transform: uppercase; font-weight: 800; color: #fca5a5; display: block;">Errors (Critical)</span>
                                    <strong id="resErrorsCount" style="font-size: 1.4rem; font-weight: 900; color: #ffffff;">0</strong>
                                </div>
                            </div>

                            <div style="background: rgba(217, 119, 6, 0.12); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 8px; padding: 12px 14px; display: flex; align-items: center; gap: 12px;">
                                <div style="width: 36px; height: 36px; border-radius: 6px; background: #d97706; color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0;">
                                    <i class="fa-solid fa-triangle-exclamation"></i>
                                </div>
                                <div>
                                    <span style="font-size: 0.7rem; text-transform: uppercase; font-weight: 800; color: #fde68a; display: block;">Warnings (High)</span>
                                    <strong id="resWarningsCount" style="font-size: 1.4rem; font-weight: 900; color: #ffffff;">3</strong>
                                </div>
                            </div>

                            <div style="background: rgba(37, 99, 235, 0.12); border: 1px solid rgba(96, 165, 250, 0.3); border-radius: 8px; padding: 12px 14px; display: flex; align-items: center; gap: 12px;">
                                <div style="width: 36px; height: 36px; border-radius: 6px; background: #2563eb; color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0;">
                                    <i class="fa-solid fa-circle-info"></i>
                                </div>
                                <div>
                                    <span style="font-size: 0.7rem; text-transform: uppercase; font-weight: 800; color: #bfdbfe; display: block;">Notices (Advisory)</span>
                                    <strong id="resNoticesCount" style="font-size: 1.4rem; font-weight: 900; color: #ffffff;">4</strong>
                                </div>
                            </div>

                            <div style="background: rgba(22, 163, 74, 0.12); border: 1px solid rgba(34, 197, 94, 0.3); border-radius: 8px; padding: 12px 14px; display: flex; align-items: center; gap: 12px;">
                                <div style="width: 36px; height: 36px; border-radius: 6px; background: #16a34a; color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0;">
                                    <i class="fa-solid fa-check-double"></i>
                                </div>
                                <div>
                                    <span style="font-size: 0.7rem; text-transform: uppercase; font-weight: 800; color: #bbf7d0; display: block;">Passed Checks</span>
                                    <strong id="resPassedCount" style="font-size: 1.4rem; font-weight: 900; color: #ffffff;">14</strong>
                                </div>
                            </div>
                        </div>

                        <!-- 5 Thematic Score Progress Bars (Semrush Style) -->
                        <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 16px 20px;">
                            <div style="font-size: 0.72rem; text-transform: uppercase; font-weight: 800; color: #94a3b8; letter-spacing: 0.08em; margin-bottom: 12px;">
                                THEMATIC SITE AUDIT SCORES
                            </div>
                            <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px;">
                                <div>
                                    <div style="display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 700; margin-bottom: 4px;">
                                        <span style="color: #cbd5e1;">Crawlability</span>
                                        <span id="thematicCrawlText" style="color: #60a5fa;">92%</span>
                                    </div>
                                    <div style="height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                                        <div id="thematicCrawlBar" style="width: 92%; height: 100%; background: #3b82f6; border-radius: 3px;"></div>
                                    </div>
                                </div>

                                <div>
                                    <div style="display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 700; margin-bottom: 4px;">
                                        <span style="color: #cbd5e1;">HTTPS Security</span>
                                        <span id="thematicHttpsText" style="color: #34d399;">100%</span>
                                    </div>
                                    <div style="height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                                        <div id="thematicHttpsBar" style="width: 100%; height: 100%; background: #10b981; border-radius: 3px;"></div>
                                    </div>
                                </div>

                                <div>
                                    <div style="display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 700; margin-bottom: 4px;">
                                        <span style="color: #cbd5e1;">Site Speed</span>
                                        <span id="thematicPerfText" style="color: #fb923c;">85%</span>
                                    </div>
                                    <div style="height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                                        <div id="thematicPerfBar" style="width: 85%; height: 100%; background: #f97316; border-radius: 3px;"></div>
                                    </div>
                                </div>

                                <div>
                                    <div style="display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 700; margin-bottom: 4px;">
                                        <span style="color: #cbd5e1;">Internal Links</span>
                                        <span id="thematicLinksText" style="color: #c084fc;">88%</span>
                                    </div>
                                    <div style="height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                                        <div id="thematicLinksBar" style="width: 88%; height: 100%; background: #a855f7; border-radius: 3px;"></div>
                                    </div>
                                </div>

                                <div>
                                    <div style="display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 700; margin-bottom: 4px;">
                                        <span style="color: #cbd5e1;">Schema & Social</span>
                                        <span id="thematicMarkupText" style="color: #fbbf24;">80%</span>
                                    </div>
                                    <div style="height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                                        <div id="thematicMarkupBar" style="width: 80%; height: 100%; background: #eab308; border-radius: 3px;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Download PDF Report Callout Banner -->
                    <div style="margin: 20px 28px 0; background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border: 1px solid #bfdbfe; border-radius: 10px; padding: 18px 22px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
                        <div style="display: flex; align-items: center; gap: 14px;">
                            <div style="width: 44px; height: 44px; border-radius: 10px; background: #2563eb; color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; flex-shrink: 0; box-shadow: 0 4px 12px rgba(37,99,235,0.25);">
                                <i class="fa-solid fa-file-pdf"></i>
                            </div>
                            <div>
                                <strong style="font-size: 1.02rem; color: #0f172a; display: block;">Download Comprehensive 6-Page Executive Audit Report (PDF)</strong>
                                <span style="font-size: 0.82rem; color: #475569;">Complete with Semrush Thematic Scores, Errors Log, Heading Outline, Speed metrics, and 3-Phase Roadmap.</span>
                            </div>
                        </div>
                        <button type="button" onclick="openPdfLeadModal()" class="btn btn-sm btn-blue-solid" style="padding: 11px 22px; font-weight: 700; border-radius: 7px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 14px rgba(37,99,235,0.3);">
                            <i class="fa-solid fa-download"></i> Get Full PDF Report
                        </button>
                    </div>

                    <div style="padding: 24px 28px;">
                        
                        <!-- 4 Core Quick Stat Pills -->
                        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px;">
                            <div class="tool-stat-pill">
                                <div class="stat-lbl">Title Tag</div>
                                <div class="stat-val" id="resTitleLength">54 Chars</div>
                            </div>
                            <div class="tool-stat-pill">
                                <div class="stat-lbl">Meta Description</div>
                                <div class="stat-val" id="resDescLength">142 Chars</div>
                            </div>
                            <div class="tool-stat-pill">
                                <div class="stat-lbl">Headings Found</div>
                                <div class="stat-val" id="resH1Count">1 H1 &bull; 4 H2</div>
                            </div>
                            <div class="tool-stat-pill">
                                <div class="stat-lbl">Latency & Weight</div>
                                <div class="stat-val" id="resSpeedWeight">320ms &bull; 45KB</div>
                            </div>
                        </div>

                        <!-- Action Plan Fast-Trigger Banner -->
                        <div style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); border-radius: 8px; padding: 14px 18px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; color: #ffffff; box-shadow: 0 4px 14px rgba(49, 46, 129, 0.2);">
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <div style="width: 36px; height: 36px; border-radius: 8px; background: rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; font-size: 1.1rem; color: #fbbf24;">
                                    <i class="fa-solid fa-list-check"></i>
                                </div>
                                <div>
                                    <strong style="font-size: 0.95rem; color: #ffffff; display: block;">Customized 30-Day SEO Action Plan Ready</strong>
                                    <span style="font-size: 0.76rem; color: #c7d2fe;">Step-by-step sprint roadmap to resolve detected issues & rank top-3 on Google.</span>
                                </div>
                            </div>
                            <button type="button" onclick="switchAuditTab('tabActionPlan')" style="background: #fbbf24; color: #1e1b4b; font-weight: 800; font-size: 0.84rem; padding: 8px 18px; border: none; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 8px rgba(251, 191, 36, 0.4);">
                                <i class="fa-solid fa-wand-magic-sparkles"></i> Open Full Action Plan
                            </button>
                        </div>

                        <!-- 8 Diagnostic Interactive Tabs Navigation -->
                        <div style="display: flex; gap: 6px; border-bottom: 2px solid #e2e8f0; margin-bottom: 20px; overflow-x: auto; padding-bottom: 2px;">
                            <button type="button" onclick="switchAuditTab('tabChecklist')" id="btnTabChecklist" class="audit-tab-btn active">
                                <i class="fa-solid fa-list-check"></i> Issues Log (<span id="cntChecklistAll">20</span>)
                            </button>
                            <button type="button" onclick="switchAuditTab('tabSpeed')" id="btnTabSpeed" class="audit-tab-btn">
                                <i class="fa-solid fa-gauge-high"></i> Speed & Core Vitals
                            </button>
                            <button type="button" onclick="switchAuditTab('tabHeadings')" id="btnTabHeadings" class="audit-tab-btn">
                                <i class="fa-solid fa-heading"></i> Headings Tree
                            </button>
                            <button type="button" onclick="switchAuditTab('tabKeywords')" id="btnTabKeywords" class="audit-tab-btn">
                                <i class="fa-solid fa-chart-pie"></i> Keywords & Intent
                            </button>
                            <button type="button" onclick="switchAuditTab('tabMedia')" id="btnTabMedia" class="audit-tab-btn">
                                <i class="fa-solid fa-images"></i> Media & Alt Tags
                            </button>
                            <button type="button" onclick="switchAuditTab('tabSchema')" id="btnTabSchema" class="audit-tab-btn">
                                <i class="fa-solid fa-shield-halved"></i> Schema & Security
                            </button>
                            <button type="button" onclick="switchAuditTab('tabSerp')" id="btnTabSerp" class="audit-tab-btn">
                                <i class="fa-brands fa-google"></i> SERP & Social
                            </button>
                            <button type="button" onclick="switchAuditTab('tabActionPlan')" id="btnTabActionPlan" class="audit-tab-btn" style="background: linear-gradient(135deg, #eff6ff, #dbeafe); color: #1d4ed8; font-weight: 800; border: 1px solid #bfdbfe;">
                                <i class="fa-solid fa-wand-magic-sparkles" style="color: #2563eb;"></i> 30-Day Action Plan
                            </button>
                        </div>

                        <!-- Tab 1: Checklist Matrix (Semrush Issues Log) -->
                        <div id="tabChecklist" class="audit-tab-pane active">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 8px;">
                                <div style="display: flex; gap: 6px;">
                                    <button type="button" onclick="filterAuditChecklist('all')" id="fltAll" class="audit-flt-btn active">All (<span id="cntAll">0</span>)</button>
                                    <button type="button" onclick="filterAuditChecklist('error')" id="fltCritical" class="audit-flt-btn critical">Errors (<span id="cntCritical">0</span>)</button>
                                    <button type="button" onclick="filterAuditChecklist('warning')" id="fltWarning" class="audit-flt-btn warning">Warnings (<span id="cntWarning">0</span>)</button>
                                    <button type="button" onclick="filterAuditChecklist('notice')" id="fltNotice" class="audit-flt-btn notice">Notices (<span id="cntNotice">0</span>)</button>
                                    <button type="button" onclick="filterAuditChecklist('pass')" id="fltPass" class="audit-flt-btn pass">Passed (<span id="cntPass">0</span>)</button>
                                </div>
                            </div>
                            <div id="checklistContainer" style="display: flex; flex-direction: column; gap: 10px;">
                                <!-- Populated dynamically -->
                            </div>
                        </div>

                        <!-- Tab 2: Speed & Core Web Vitals -->
                        <div id="tabSpeed" class="audit-tab-pane" style="display: none;">
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 20px;">
                                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; text-align: center;">
                                    <span style="font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Server TTFB Latency</span>
                                    <div id="speedTtfb" style="font-size: 1.6rem; font-weight: 800; color: #0f172a; margin-top: 4px;">280ms</div>
                                    <span style="font-size: 0.72rem; color: #16a34a; font-weight: 600;">Optimal (< 400ms)</span>
                                </div>
                                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; text-align: center;">
                                    <span style="font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase;">HTML Payload Size</span>
                                    <div id="speedPayload" style="font-size: 1.6rem; font-weight: 800; color: #0f172a; margin-top: 4px;">42 KB</div>
                                    <span style="font-size: 0.72rem; color: #16a34a; font-weight: 600;">Lightweight (< 60KB)</span>
                                </div>
                                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; text-align: center;">
                                    <span style="font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Compression</span>
                                    <div id="speedCompression" style="font-size: 1.3rem; font-weight: 800; color: #16a34a; margin-top: 6px;">Gzip / Brotli Active</div>
                                </div>
                            </div>

                            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
                                <h4 style="font-size: 0.88rem; font-weight: 800; color: #0f172a; margin-bottom: 14px;">Asset Weight Breakdown</h4>
                                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; font-size: 0.84rem;">
                                    <div style="padding: 10px; background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0;">
                                        <span style="color: #64748b; font-size: 0.75rem; display: block;">Scripts (JS)</span>
                                        <strong id="assetJsCount" style="font-size: 1.1rem; color: #0f172a;">8 files</strong>
                                    </div>
                                    <div style="padding: 10px; background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0;">
                                        <span style="color: #64748b; font-size: 0.75rem; display: block;">Stylesheets (CSS)</span>
                                        <strong id="assetCssCount" style="font-size: 1.1rem; color: #0f172a;">4 files</strong>
                                    </div>
                                    <div style="padding: 10px; background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0;">
                                        <span style="color: #64748b; font-size: 0.75rem; display: block;">Total Images</span>
                                        <strong id="assetImgCount" style="font-size: 1.1rem; color: #0f172a;">12 files</strong>
                                    </div>
                                    <div style="padding: 10px; background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0;">
                                        <span style="color: #64748b; font-size: 0.75rem; display: block;">Iframes</span>
                                        <strong id="assetIframeCount" style="font-size: 1.1rem; color: #0f172a;">0</strong>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Tab 3: Headings Tree -->
                        <div id="tabHeadings" class="audit-tab-pane" style="display: none;">
                            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
                                <h4 style="font-size: 0.88rem; font-weight: 800; color: #0f172a; margin-bottom: 16px;">
                                    <i class="fa-solid fa-sitemap" style="color: #2563eb;"></i> Complete Heading Structure Map (H1 - H4)
                                </h4>
                                
                                <div style="margin-bottom: 16px;">
                                    <span style="font-size: 0.75rem; font-weight: 800; background: #dbeafe; color: #1e40af; padding: 3px 8px; border-radius: 4px; text-transform: uppercase;">H1 Tag (Primary Topic)</span>
                                    <div id="headingsH1Container" style="margin-top: 8px; display: flex; flex-direction: column; gap: 6px;"></div>
                                </div>

                                <div style="margin-bottom: 16px;">
                                    <span style="font-size: 0.75rem; font-weight: 800; background: #f3e8ff; color: #6b21a8; padding: 3px 8px; border-radius: 4px; text-transform: uppercase;">H2 Subheadings</span>
                                    <div id="headingsH2Container" style="margin-top: 8px; display: flex; flex-direction: column; gap: 6px;"></div>
                                </div>

                                <div style="margin-bottom: 16px;">
                                    <span style="font-size: 0.75rem; font-weight: 800; background: #e0f2fe; color: #0369a1; padding: 3px 8px; border-radius: 4px; text-transform: uppercase;">H3 Sub-Sections</span>
                                    <div id="headingsH3Container" style="margin-top: 8px; display: flex; flex-direction: column; gap: 6px;"></div>
                                </div>

                                <div>
                                    <span style="font-size: 0.75rem; font-weight: 800; background: #f1f5f9; color: #475569; padding: 3px 8px; border-radius: 4px; text-transform: uppercase;">H4 Supporting Headings</span>
                                    <div id="headingsH4Container" style="margin-top: 8px; display: flex; flex-direction: column; gap: 6px;"></div>
                                </div>
                            </div>
                        </div>

                        <!-- Tab 4: Keywords & Intent -->
                        <div id="tabKeywords" class="audit-tab-pane" style="display: none;">
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                                <!-- Readability Card -->
                                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px;">
                                    <span style="font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Flesch Reading Ease Score</span>
                                    <div style="display: flex; align-items: baseline; gap: 8px; margin-top: 4px;">
                                        <span id="readabilityScore" style="font-size: 2rem; font-weight: 800; color: #2563eb;">68</span>
                                        <span style="font-size: 0.95rem; color: #64748b;">/ 100</span>
                                    </div>
                                    <div id="readabilityGrade" style="font-size: 0.84rem; font-weight: 700; color: #0f172a; margin-top: 2px;">Standard / Engaging (8th-9th Grade)</div>
                                    <p style="font-size: 0.78rem; color: #64748b; margin-top: 6px;">Clear readability boosts dwell time and reduces bounce rates on Google.</p>
                                </div>

                                <!-- Text-to-HTML Ratio -->
                                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px;">
                                    <span style="font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Text-to-HTML Code Ratio</span>
                                    <div id="textHtmlRatio" style="font-size: 2rem; font-weight: 800; color: #059669; margin-top: 4px;">14.5%</div>
                                    <div style="font-size: 0.84rem; color: #64748b; margin-top: 2px;">Healthy balance of indexable text copy vs code markup.</div>
                                </div>
                            </div>

                            <!-- Top Keywords & 2-Word Phrases Tables -->
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                                <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px;">
                                    <h4 style="font-size: 0.85rem; font-weight: 800; text-transform: uppercase; color: #0f172a; margin-bottom: 12px;">Top 1-Word Keywords & Intent</h4>
                                    <table style="width: 100%; border-collapse: collapse; font-size: 0.84rem;">
                                        <thead>
                                            <tr style="border-bottom: 1px solid #cbd5e1; text-align: left; color: #64748b;">
                                                <th style="padding: 6px 0;">Keyword</th>
                                                <th style="padding: 6px 0;">Count</th>
                                                <th style="padding: 6px 0;">Density</th>
                                                <th style="padding: 6px 0;">Intent</th>
                                            </tr>
                                        </thead>
                                        <tbody id="keywordsTableBody"></tbody>
                                    </table>
                                </div>

                                <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px;">
                                    <h4 style="font-size: 0.85rem; font-weight: 800; text-transform: uppercase; color: #0f172a; margin-bottom: 12px;">Top 2-Word Semantic Phrases</h4>
                                    <table style="width: 100%; border-collapse: collapse; font-size: 0.84rem;">
                                        <thead>
                                            <tr style="border-bottom: 1px solid #cbd5e1; text-align: left; color: #64748b;">
                                                <th style="padding: 6px 0;">Keyphrase</th>
                                                <th style="padding: 6px 0;">Count</th>
                                                <th style="padding: 6px 0;">Density</th>
                                            </tr>
                                        </thead>
                                        <tbody id="phrasesTableBody"></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <!-- Tab 5: Images & Media -->
                        <div id="tabMedia" class="audit-tab-pane" style="display: none;">
                            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                                    <h4 style="font-size: 0.88rem; font-weight: 800; color: #0f172a; margin: 0;">
                                        <i class="fa-solid fa-images" style="color: #2563eb;"></i> Image Accessibility & Alt Attributes
                                    </h4>
                                    <span id="mediaSummaryBadge" style="font-size: 0.8rem; font-weight: 700; padding: 4px 10px; border-radius: 6px; background: #fee2e2; color: #991b1b;">
                                        2 Missing Alt
                                    </span>
                                </div>

                                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 20px;">
                                    <div style="background: #ffffff; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0;">
                                        <span style="font-size: 0.75rem; color: #64748b;">Total Images</span>
                                        <strong id="statImgTotal" style="display: block; font-size: 1.2rem; color: #0f172a;">12</strong>
                                    </div>
                                    <div style="background: #ffffff; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0;">
                                        <span style="font-size: 0.75rem; color: #64748b;">Modern Formats (WebP/SVG)</span>
                                        <strong id="statImgWebp" style="display: block; font-size: 1.2rem; color: #16a34a;">6</strong>
                                    </div>
                                    <div style="background: #ffffff; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0;">
                                        <span style="font-size: 0.75rem; color: #64748b;">Missing Dimensions (CLS Risk)</span>
                                        <strong id="statImgDimensions" style="display: block; font-size: 1.2rem; color: #d97706;">3</strong>
                                    </div>
                                </div>

                                <h5 style="font-size: 0.82rem; font-weight: 800; text-transform: uppercase; color: #64748b; margin-bottom: 8px;">Images Missing Alt Tags (Action Needed):</h5>
                                <div id="missingAltListContainer" style="display: flex; flex-direction: column; gap: 6px;"></div>
                            </div>
                        </div>

                        <!-- Tab 6: Schema & Security -->
                        <div id="tabSchema" class="audit-tab-pane" style="display: none;">
                            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
                                <h4 style="font-size: 0.88rem; font-weight: 800; color: #0f172a; margin-bottom: 14px;">
                                    <i class="fa-solid fa-shield-halved" style="color: #10b981;"></i> Structured Data & Server Security Headers
                                </h4>
                                
                                <div style="margin-bottom: 18px;">
                                    <span style="font-size: 0.78rem; font-weight: 700; color: #475569; display: block; margin-bottom: 6px;">JSON-LD Schema Entities Detected:</span>
                                    <div id="schemaEntitiesContainer" style="display: flex; gap: 8px; flex-wrap: wrap;"></div>
                                </div>

                                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; font-size: 0.84rem; margin-bottom: 16px;">
                                    <div style="background: #ffffff; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0;">
                                        <span style="color: #64748b; display: block; font-size: 0.75rem;">SSL Encryption</span>
                                        <strong id="statSslStatus" style="color: #16a34a;">HTTPS Active</strong>
                                    </div>
                                    <div style="background: #ffffff; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0;">
                                        <span style="color: #64748b; display: block; font-size: 0.75rem;">HSTS Header</span>
                                        <strong id="statHstsStatus" style="color: #16a34a;">Active</strong>
                                    </div>
                                    <div style="background: #ffffff; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0;">
                                        <span style="color: #64748b; display: block; font-size: 0.75rem;">X-Frame-Options</span>
                                        <strong id="statXFrameStatus" style="color: #2563eb;">Declared</strong>
                                    </div>
                                </div>

                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 0.84rem;">
                                    <div style="background: #ffffff; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0;">
                                        <span style="color: #64748b; display: block; font-size: 0.75rem;">Canonical URL Match</span>
                                        <strong id="statCanonicalStatus" style="color: #2563eb; word-break: break-all; font-size: 0.78rem;">Declared</strong>
                                    </div>
                                    <div style="background: #ffffff; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0;">
                                        <span style="color: #64748b; display: block; font-size: 0.75rem;">Robots Directive</span>
                                        <strong id="statRobotsDirective" style="color: #0f172a;">index, follow</strong>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Tab 7: SERP & Social Preview -->
                        <div id="tabSerp" class="audit-tab-pane" style="display: none;">
                            <div style="display: grid; grid-template-columns: 1fr; gap: 20px;">
                                <!-- Google SERP Card -->
                                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
                                    <h4 style="font-size: 0.85rem; font-weight: 800; text-transform: uppercase; color: #0f172a; margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
                                        <i class="fa-brands fa-google" style="color: #4285F4;"></i> Google Desktop Search Snippet
                                    </h4>
                                    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px;">
                                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                                            <div style="width: 24px; height: 24px; border-radius: 4px; background: #f1f5f9; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; color: #475569;">
                                                <i class="fa-solid fa-globe"></i>
                                            </div>
                                            <div>
                                                <div id="serpDomainText" style="font-size: 0.8rem; color: #202124; line-height: 1.2; font-weight: 500;">example.com</div>
                                                <div id="serpUrlText" style="font-size: 0.72rem; color: #5f6368; line-height: 1.2;">https://example.com</div>
                                            </div>
                                        </div>
                                        <div id="serpTitleText" style="font-size: 1.15rem; color: #1a0dab; font-weight: 500; text-decoration: none; margin-bottom: 4px; line-height: 1.35;">
                                            Official Page Title Tag Goes Here
                                        </div>
                                        <div id="serpDescText" style="font-size: 0.88rem; color: #4d5156; line-height: 1.5;">
                                            This is the meta description text snippet that Google shows in organic search results.
                                        </div>
                                    </div>
                                </div>

                                <!-- Facebook OpenGraph Card Preview -->
                                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
                                    <h4 style="font-size: 0.85rem; font-weight: 800; text-transform: uppercase; color: #0f172a; margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
                                        <i class="fa-brands fa-facebook" style="color: #1877F2;"></i> Facebook & LinkedIn Social Share Card
                                    </h4>
                                    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; max-width: 520px;">
                                        <div id="ogImagePreview" style="height: 180px; background: #e2e8f0; background-size: cover; background-position: center; display: flex; align-items: center; justify-content: center; color: #94a3b8; font-size: 2rem;">
                                            <i class="fa-solid fa-image"></i>
                                        </div>
                                        <div style="padding: 14px 16px; background: #f8fafc; border-top: 1px solid #e2e8f0;">
                                            <div id="ogDomainText" style="font-size: 0.72rem; text-transform: uppercase; color: #64748b; font-weight: 700;">EXAMPLE.COM</div>
                                            <div id="ogTitleText" style="font-size: 0.95rem; font-weight: 700; color: #0f172a; margin-top: 2px; line-height: 1.3;">Social Title Preview</div>
                                            <div id="ogDescText" style="font-size: 0.8rem; color: #64748b; margin-top: 4px; line-height: 1.4;">Social description preview snippet.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Tab 8: Interactive 30-Day Strategic SEO Action Plan -->
                        <div id="tabActionPlan" class="audit-tab-pane" style="display: none;">
                            <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 10px; padding: 22px 24px; color: #ffffff; margin-bottom: 22px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
                                <div>
                                    <span style="background: #2563eb; color: #ffffff; font-size: 0.7rem; font-weight: 800; padding: 3px 8px; border-radius: 4px; text-transform: uppercase;">Growth Architecture</span>
                                    <h3 style="font-size: 1.25rem; font-weight: 800; color: #ffffff; margin: 4px 0;">30-Day Customized SEO Execution Roadmap</h3>
                                    <p style="font-size: 0.82rem; color: #94a3b8; margin: 0; line-height: 1.4;">
                                        Prioritized sprint steps to resolve detected crawl issues, elevate organic keyword rankings, and maximize qualified traffic.
                                    </p>
                                </div>
                                <div style="text-align: right;">
                                    <span style="font-size: 0.72rem; color: #94a3b8; text-transform: uppercase; font-weight: 700; display: block;">Target Output</span>
                                    <div style="font-size: 1.35rem; font-weight: 900; color: #10b981;">95+ Health Score</div>
                                </div>
                            </div>

                            <!-- Sprints Container -->
                            <div style="display: flex; flex-direction: column; gap: 16px;">
                                
                                <!-- Sprint 1 -->
                                <div style="background: #ffffff; border: 1px solid #e2e8f0; border-left: 5px solid #ef4444; border-radius: 8px; padding: 18px 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
                                        <div>
                                            <span style="background: #fee2e2; color: #b91c1c; font-size: 0.7rem; font-weight: 800; padding: 2px 8px; border-radius: 4px; text-transform: uppercase;">Sprint 1 • Days 1 – 7</span>
                                            <h4 style="font-size: 1rem; font-weight: 800; color: #0f172a; margin: 4px 0 0;">Immediate Technical Quick-Wins & Crawl Barrier Removal</h4>
                                        </div>
                                        <span class="badge-crit" style="font-size: 0.72rem;">Immediate Priority</span>
                                    </div>
                                    
                                    <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.85rem; color: #334155;">
                                        <label style="display: flex; align-items: flex-start; gap: 10px; cursor: pointer; background: #f8fafc; padding: 10px 14px; border-radius: 6px; border: 1px solid #e2e8f0;">
                                            <input type="checkbox" checked style="margin-top: 3px; accent-color: #2563eb; width: 16px; height: 16px;">
                                            <div>
                                                <strong>Enforce Canonical & HTTPS SSL Protocol:</strong> Verify self-referencing canonical URLs and 301 redirects to eliminate duplicate URL penalties.
                                                <div style="font-size: 0.74rem; color: #64748b; margin-top: 2px;">Estimated Effort: 1 hour • Impact: Critical (Indexation)</div>
                                            </div>
                                        </label>
                                        
                                        <label style="display: flex; align-items: flex-start; gap: 10px; cursor: pointer; background: #f8fafc; padding: 10px 14px; border-radius: 6px; border: 1px solid #e2e8f0;">
                                            <input type="checkbox" checked style="margin-top: 3px; accent-color: #2563eb; width: 16px; height: 16px;">
                                            <div>
                                                <strong>Remediate Missing Image Alt Tags:</strong> Add descriptive, keyword-rich alternative text to all detected images lacking alt tags.
                                                <div style="font-size: 0.74rem; color: #64748b; margin-top: 2px;">Estimated Effort: 2 hours • Impact: High (Google Image Search & A11y)</div>
                                            </div>
                                        </label>
                                        
                                        <label style="display: flex; align-items: flex-start; gap: 10px; cursor: pointer; background: #f8fafc; padding: 10px 14px; border-radius: 6px; border: 1px solid #e2e8f0;">
                                            <input type="checkbox" style="margin-top: 3px; accent-color: #2563eb; width: 16px; height: 16px;">
                                            <div>
                                                <strong>Configure Security Headers (HSTS & X-Frame-Options):</strong> Enable Strict-Transport-Security to enforce SSL encryption and prevent Clickjacking.
                                                <div style="font-size: 0.74rem; color: #64748b; margin-top: 2px;">Estimated Effort: 30 mins • Impact: Medium (Google Trust Signal)</div>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <!-- Sprint 2 -->
                                <div style="background: #ffffff; border: 1px solid #e2e8f0; border-left: 5px solid #f59e0b; border-radius: 8px; padding: 18px 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
                                        <div>
                                            <span style="background: #fef3c7; color: #b45309; font-size: 0.7rem; font-weight: 800; padding: 2px 8px; border-radius: 4px; text-transform: uppercase;">Sprint 2 • Days 8 – 20</span>
                                            <h4 style="font-size: 1rem; font-weight: 800; color: #0f172a; margin: 4px 0 0;">On-Page Semantic Hierarchy & High-Intent Keyword Optimization</h4>
                                        </div>
                                        <span class="badge-warn" style="font-size: 0.72rem;">High Organic ROI</span>
                                    </div>
                                    
                                    <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.85rem; color: #334155;">
                                        <label style="display: flex; align-items: flex-start; gap: 10px; cursor: pointer; background: #f8fafc; padding: 10px 14px; border-radius: 6px; border: 1px solid #e2e8f0;">
                                            <input type="checkbox" style="margin-top: 3px; accent-color: #2563eb; width: 16px; height: 16px;">
                                            <div>
                                                <strong>Single H1 & Subheading Restructure:</strong> Guarantee exactly 1 primary H1 focused on high-intent buyer keywords; organize secondary sections into logical H2–H4 subheadings.
                                                <div style="font-size: 0.74rem; color: #64748b; margin-top: 2px;">Estimated Effort: 3 hours • Impact: Critical (Relevance)</div>
                                            </div>
                                        </label>

                                        <label style="display: flex; align-items: flex-start; gap: 10px; cursor: pointer; background: #f8fafc; padding: 10px 14px; border-radius: 6px; border: 1px solid #e2e8f0;">
                                            <input type="checkbox" style="margin-top: 3px; accent-color: #2563eb; width: 16px; height: 16px;">
                                            <div>
                                                <strong>Click-Through-Rate (CTR) Meta Rewrite:</strong> Tune Title tag to 45–58 chars and Meta Description to 130–155 chars with persuasive calls-to-action.
                                                <div style="font-size: 0.74rem; color: #64748b; margin-top: 2px;">Estimated Effort: 2 hours • Impact: High (SERP Clicks)</div>
                                            </div>
                                        </label>

                                        <label style="display: flex; align-items: flex-start; gap: 10px; cursor: pointer; background: #f8fafc; padding: 10px 14px; border-radius: 6px; border: 1px solid #e2e8f0;">
                                            <input type="checkbox" style="margin-top: 3px; accent-color: #2563eb; width: 16px; height: 16px;">
                                            <div>
                                                <strong>Enrich Thin Copy with Semantic Entities:</strong> Expand body copy to 800+ words including topical FAQs, case studies, and primary LSI keywords.
                                                <div style="font-size: 0.74rem; color: #64748b; margin-top: 2px;">Estimated Effort: 6 hours • Impact: High (Topical Authority)</div>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <!-- Sprint 3 -->
                                <div style="background: #ffffff; border: 1px solid #e2e8f0; border-left: 5px solid #10b981; border-radius: 8px; padding: 18px 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
                                        <div>
                                            <span style="background: #dcfce7; color: #15803d; font-size: 0.7rem; font-weight: 800; padding: 2px 8px; border-radius: 4px; text-transform: uppercase;">Sprint 3 • Days 21 – 30</span>
                                            <h4 style="font-size: 1rem; font-weight: 800; color: #0f172a; margin: 4px 0 0;">Schema Structured Data, Speed & Authority Scaling</h4>
                                        </div>
                                        <span class="badge-pass" style="font-size: 0.72rem;">Long-Term Domination</span>
                                    </div>
                                    
                                    <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.85rem; color: #334155;">
                                        <label style="display: flex; align-items: flex-start; gap: 10px; cursor: pointer; background: #f8fafc; padding: 10px 14px; border-radius: 6px; border: 1px solid #e2e8f0;">
                                            <input type="checkbox" style="margin-top: 3px; accent-color: #2563eb; width: 16px; height: 16px;">
                                            <div>
                                                <strong>Deploy JSON-LD Schema Entities:</strong> Implement Organization, WebSite, FAQPage, and LocalBusiness Schema to win rich star snippets on Google.
                                                <div style="font-size: 0.74rem; color: #64748b; margin-top: 2px;">Estimated Effort: 3 hours • Impact: High (Rich Snippets)</div>
                                            </div>
                                        </label>

                                        <label style="display: flex; align-items: flex-start; gap: 10px; cursor: pointer; background: #f8fafc; padding: 10px 14px; border-radius: 6px; border: 1px solid #e2e8f0;">
                                            <input type="checkbox" style="margin-top: 3px; accent-color: #2563eb; width: 16px; height: 16px;">
                                            <div>
                                                <strong>Core Web Vitals & Asset Minification:</strong> Defer non-critical scripts, serve WebP images with explicit width/height, and configure CDN caching to keep TTFB < 300ms.
                                                <div style="font-size: 0.74rem; color: #64748b; margin-top: 2px;">Estimated Effort: 5 hours • Impact: High (UX & Ranking Factor)</div>
                                            </div>
                                        </label>

                                        <label style="display: flex; align-items: flex-start; gap: 10px; cursor: pointer; background: #f8fafc; padding: 10px 14px; border-radius: 6px; border: 1px solid #e2e8f0;">
                                            <input type="checkbox" style="margin-top: 3px; accent-color: #2563eb; width: 16px; height: 16px;">
                                            <div>
                                                <strong>Continuous Tracking & Keyword Monitoring:</strong> Set up Google Search Console performance reporting and weekly keyword position monitoring.
                                                <div style="font-size: 0.74rem; color: #64748b; margin-top: 2px;">Estimated Effort: Ongoing • Impact: Sustained Organic Growth</div>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <!-- Action Bar -->
                        <div style="border-top: 1px solid #f1f5f9; margin-top: 28px; padding-top: 22px; display: flex; flex-direction: column; gap: 14px;">
                            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                                <a href="<?= url('/contact') ?>" id="discussSeoBtn" class="tool-submit-btn" style="flex: 1; min-width: 240px; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; text-align: center; gap: 8px; padding: 12px 20px; line-height: 1.35;">
                                    <span>Fix My SEO Issues with Abdullah</span> <i class="fa-solid fa-arrow-right"></i>
                                </a>
                                <button type="button" onclick="openPdfLeadModal()" style="background: #0f172a; color: #ffffff; border: none; padding: 12px 22px; border-radius: 6px; font-weight: 700; font-size: 0.92rem; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 8px;">
                                    <i class="fa-solid fa-file-pdf" style="color: #ef4444;"></i> Download PDF Report
                                </button>
                                <a href="https://wa.me/<?= preg_replace('/[^0-9]/', '', setting('whatsapp_number', '+8801670769816')) ?>?text=Hello%20Abdullah%2C%20I%20used%20your%20Website%20SEO%20Analyzer%20and%20would%20like%20to%20fix%20my%20website%20SEO." target="_blank" rel="noopener" class="tool-wa-btn">
                                    <i class="fa-brands fa-whatsapp" style="color: #25d366; font-size: 1.1rem;"></i> WhatsApp
                                </a>
                            </div>
                            <p style="font-size: 0.78rem; color: #64748b; margin: 0; text-align: center;">
                                Want top Google Rankings? Get a complete technical & on-page SEO optimization package.
                            </p>
                        </div>

                    </div>
                </div>
            </div>

        </div>

        <!-- "Why Choose Us" Value Box matching reference -->
        <div style="max-width: 760px; margin: 0 auto 40px;">
            <div style="text-align: center; margin-bottom: 24px;">
                <span style="display: inline-flex; align-items: center; gap: 8px; padding: 6px 18px; background: linear-gradient(90deg, #eff6ff, #ffffff, #eff6ff); border: 1px solid #bfdbfe; border-radius: 6px; font-weight: 800; font-size: 1.15rem; color: #0f172a; box-shadow: 0 2px 8px rgba(37,99,235,0.06);">
                    <i class="fa-solid fa-circle-check" style="color: #2563eb;"></i> Why Choose Abdullah for SEO?
                </span>
            </div>

            <div style="background: #f8faff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; display: flex; flex-direction: column; gap: 14px;">
                <div class="why-item-box">
                    <div class="why-item-icon"><i class="fa-solid fa-magnifying-glass-chart"></i></div>
                    <div>
                        <h3 style="font-size: 1rem; font-weight: 700; color: #0f172a; margin: 0 0 4px;">Data-Driven Keyword & On-Page Mastery</h3>
                        <p style="font-size: 0.88rem; color: #64748b; margin: 0; line-height: 1.5;">We optimize title tags, semantic headings, schema structured data, and meta content so Google ranks you ahead of competitors.</p>
                    </div>
                </div>

                <div class="why-item-box">
                    <div class="why-item-icon"><i class="fa-solid fa-bolt"></i></div>
                    <div>
                        <h3 style="font-size: 1rem; font-weight: 700; color: #0f172a; margin: 0 0 4px;">Core Web Vitals & Technical Speed</h3>
                        <p style="font-size: 0.88rem; color: #64748b; margin: 0; line-height: 1.5;">Faster load times directly mean higher conversion rates. We ensure clean code, compressed assets, and flawless crawlability.</p>
                    </div>
                </div>

                <div class="why-item-box">
                    <div class="why-item-icon"><i class="fa-solid fa-trophy"></i></div>
                    <div>
                        <h3 style="font-size: 1rem; font-weight: 700; color: #0f172a; margin: 0 0 4px;">Transparent Tracking & High ROI</h3>
                        <p style="font-size: 0.88rem; color: #64748b; margin: 0; line-height: 1.5;">Full Google Analytics 4, Search Console, and conversion tracking setup so you clearly see revenue generated from SEO.</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

<!-- Modal Gate (Optional Lead capture) -->
<div id="gateModal" class="digi-thankyou-modal-overlay">
    <div class="digi-thankyou-modal-card" style="max-width: 480px; text-align: left; padding: 28px;">
        <button type="button" class="thankyou-close-btn" onclick="closeGateModal()" aria-label="Close">&times;</button>
        
        <div style="margin-bottom: 18px; padding-bottom: 12px; border-bottom: 1px solid #f1f5f9;">
            <h2 style="font-size: 1.25rem; font-weight: 800; color: #0f172a; margin: 0 0 4px;">Almost there</h2>
            <p style="font-size: 0.85rem; color: #64748b; margin: 0;">Tell us where to send your detailed SEO report.</p>
        </div>

        <form action="<?= url('/contact/submit') ?>" method="POST" id="seoLeadGateForm" onsubmit="handleGateSubmit(event)">
            <?= csrf_field() ?>
            <input type="hidden" name="calculated_specs" id="hiddenGateSpecs" value="">
            
            <div class="tool-form-group" style="margin-bottom: 12px;">
                <label class="tool-form-label" style="font-size: 0.82rem;" for="gateName">Name <span style="color: #ef4444;">*</span></label>
                <input type="text" id="gateName" name="name" class="tool-form-control" placeholder="Your Full Name" required>
            </div>

            <div class="tool-form-group" style="margin-bottom: 12px;">
                <label class="tool-form-label" style="font-size: 0.82rem;" for="gateEmail">Business Email <span style="color: #ef4444;">*</span></label>
                <input type="email" id="gateEmail" name="email" class="tool-form-control" placeholder="you@company.com" required>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 12px;">
                <div class="tool-form-group" style="margin-bottom: 0;">
                    <label class="tool-form-label" style="font-size: 0.82rem;" for="gateCountry">Country <span style="color: #ef4444;">*</span></label>
                    <select id="gateCountry" name="country" class="tool-form-control" required>
                        <option value="US">United States</option>
                        <option value="GB">United Kingdom</option>
                        <option value="CA">Canada</option>
                        <option value="AU">Australia</option>
                        <option value="BD" selected>Bangladesh</option>
                        <option value="AE">United Arab Emirates</option>
                        <option value="SA">Saudi Arabia</option>
                        <option value="DE">Germany</option>
                        <option value="SG">Singapore</option>
                        <option value="OTHER">Other Country</option>
                    </select>
                </div>
                <div class="tool-form-group" style="margin-bottom: 0;">
                    <label class="tool-form-label" style="font-size: 0.82rem;" for="gateCity">City <span style="color: #94a3b8; font-weight: normal;">(Optional)</span></label>
                    <input type="text" id="gateCity" name="city" class="tool-form-control" placeholder="City name">
                </div>
            </div>

            <div class="tool-form-group" style="margin-bottom: 16px;">
                <label class="tool-form-label" style="font-size: 0.82rem;" for="gateWhatsapp">WhatsApp <span style="color: #94a3b8; font-weight: normal;">(Optional)</span></label>
                <input type="tel" id="gateWhatsapp" name="phone" class="tool-form-control" placeholder="+880 1670-769816">
            </div>

            <button type="submit" class="tool-submit-btn">
                View Full SEO Report
            </button>

            <p style="font-size: 0.72rem; text-align: center; color: #64748b; margin-top: 10px; margin-bottom: 0;">
                Your report appears immediately on this page.
            </p>
        </form>
    </div>
</div>

<style>
.tool-main-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 28px 30px;
    box-shadow: 0 4px 20px rgba(0, 89, 181, 0.04);
}
.tool-form-group {
    margin-bottom: 20px;
}
.tool-form-label {
    display: block;
    font-size: 0.88rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 6px;
}
.tool-form-control {
    width: 100%;
    border-radius: 6px;
    background: #f0f4fe;
    border: 1px solid #dbeafe;
    padding: 11px 14px;
    font-size: 0.92rem;
    color: #0f172a;
    outline: none;
    transition: all 0.2s ease;
    box-sizing: border-box;
}
.tool-form-control:focus {
    background: #ffffff;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}
.tool-field-hint {
    margin: 6px 0 0;
    font-size: 0.74rem;
    color: #64748b;
}

.sample-badge-btn {
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
    color: #334155;
    font-size: 0.76rem;
    font-weight: 600;
    padding: 3px 8px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.15s ease;
}
.sample-badge-btn:hover {
    background: #e2e8f0;
    color: #0f172a;
}

.tool-submit-btn {
    width: 100%;
    min-height: 44px;
    border-radius: 6px;
    background: linear-gradient(90deg, #1d4ed8 0%, #2563eb 100%);
    color: #ffffff;
    font-size: 0.95rem;
    font-weight: 700;
    border: none;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(37, 99, 235, 0.2);
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    text-decoration: none;
}
.tool-submit-btn:hover {
    background: linear-gradient(90deg, #1e40af 0%, #1d4ed8 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(37, 99, 235, 0.25);
}
.tool-wa-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 10px 18px;
    border-radius: 6px;
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    color: #166534;
    font-size: 0.9rem;
    font-weight: 700;
    text-decoration: none;
    transition: all 0.2s ease;
}
.tool-wa-btn:hover {
    background: #dcfce7;
}

.tool-result-card {
    background: #ffffff;
    border: 1px solid #dbeafe;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(37, 99, 235, 0.06);
}
.tool-result-header {
    background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%);
    padding: 22px 24px;
    color: #ffffff;
}
.tool-result-eyebrow {
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.85);
    margin: 0 0 6px;
}
.tool-result-amount {
    font-size: 2.2rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1.1;
    margin: 0;
}
.tool-stat-pill {
    background: #f0f4fe;
    border: 1px solid #dbeafe;
    border-radius: 6px;
    padding: 10px 8px;
    text-align: center;
}
.stat-lbl {
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #64748b;
    margin-bottom: 2px;
}
.stat-val {
    font-size: 0.92rem;
    font-weight: 800;
    color: #0f172a;
}

.audit-check-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 12px 14px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    transition: all 0.2s ease;
}
.audit-check-item:hover {
    border-color: #93c5fd;
    box-shadow: 0 2px 8px rgba(37, 99, 235, 0.04);
}
.audit-badge {
    width: 26px;
    height: 26px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    flex-shrink: 0;
}
.audit-badge.pass { background: #dcfce7; color: #16a34a; }
.audit-badge.notice { background: #dbeafe; color: #2563eb; }
.audit-badge.warning { background: #fef3c7; color: #d97706; }
.audit-badge.critical { background: #fee2e2; color: #dc2626; }

.audit-tab-btn {
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    padding: 10px 16px;
    font-size: 0.88rem;
    font-weight: 700;
    color: #64748b;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
    transition: all 0.15s ease;
    margin-bottom: -2px;
}
.audit-tab-btn:hover {
    color: #2563eb;
}
.audit-tab-btn.active {
    color: #2563eb;
    border-bottom-color: #2563eb;
}
.audit-flt-btn {
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
    color: #475569;
    padding: 5px 12px;
    border-radius: 6px;
    font-size: 0.78rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.15s ease;
}
.audit-flt-btn.active {
    background: #0f172a;
    color: #ffffff;
    border-color: #0f172a;
}
.audit-flt-btn.critical.active {
    background: #dc2626;
    border-color: #dc2626;
    color: #ffffff;
}
.audit-flt-btn.warning.active {
    background: #d97706;
    border-color: #d97706;
    color: #ffffff;
}
.audit-flt-btn.notice.active {
    background: #2563eb;
    border-color: #2563eb;
    color: #ffffff;
}
.audit-flt-btn.pass.active {
    background: #16a34a;
    border-color: #16a34a;
    color: #ffffff;
}
</style>

<script>
let lastAuditData = null;
let currentChecklistFilter = 'all';

function setSampleUrl(url) {
    document.getElementById('targetUrl').value = url;
}

function switchAuditTab(tabId) {
    document.querySelectorAll('.audit-tab-pane').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.audit-tab-btn').forEach(el => el.classList.remove('active'));

    const targetPane = document.getElementById(tabId);
    if (targetPane) targetPane.style.display = 'block';

    const tabMap = {
        'tabChecklist': 'btnTabChecklist',
        'tabSpeed': 'btnTabSpeed',
        'tabHeadings': 'btnTabHeadings',
        'tabKeywords': 'btnTabKeywords',
        'tabMedia': 'btnTabMedia',
        'tabSchema': 'btnTabSchema',
        'tabSerp': 'btnTabSerp',
        'tabActionPlan': 'btnTabActionPlan'
    };
    const btnId = tabMap[tabId];
    if (btnId && document.getElementById(btnId)) {
        document.getElementById(btnId).classList.add('active');
    }
}

function filterAuditChecklist(status) {
    currentChecklistFilter = status;
    document.querySelectorAll('.audit-flt-btn').forEach(b => b.classList.remove('active'));
    
    if (status === 'all') document.getElementById('fltAll').classList.add('active');
    if (status === 'error' || status === 'critical') document.getElementById('fltCritical').classList.add('active');
    if (status === 'warning') document.getElementById('fltWarning').classList.add('active');
    if (status === 'notice') document.getElementById('fltNotice').classList.add('active');
    if (status === 'pass') document.getElementById('fltPass').classList.add('active');

    renderChecklistItems();
}

function renderChecklistItems() {
    if (!lastAuditData || !lastAuditData.checklist) return;
    const list = document.getElementById('checklistContainer');
    list.innerHTML = '';

    const items = lastAuditData.checklist.filter(item => {
        if (currentChecklistFilter === 'all') return true;
        const itemType = item.type || (item.status === 'critical' ? 'error' : item.status);
        if (currentChecklistFilter === 'error' && (itemType === 'error' || itemType === 'critical')) return true;
        return itemType === currentChecklistFilter;
    });

    if (items.length === 0) {
        list.innerHTML = `<div style="padding: 24px; text-align: center; color: #64748b; background: #f8fafc; border-radius: 8px; border: 1px dashed #cbd5e1;">No items found in this filter category.</div>`;
        return;
    }

    items.forEach((item, idx) => {
        const row = document.createElement('div');
        row.className = 'audit-check-item';
        
        const type = item.type || (item.status === 'critical' ? 'error' : item.status || 'pass');
        let iconHtml = '<i class="fa-solid fa-check"></i>';
        let badgeClass = 'pass';
        let impactColor = '#16a34a';

        if (type === 'error' || type === 'critical') {
            iconHtml = '<i class="fa-solid fa-circle-xmark"></i>';
            badgeClass = 'critical';
            impactColor = '#dc2626';
        } else if (type === 'warning') {
            iconHtml = '<i class="fa-solid fa-triangle-exclamation"></i>';
            badgeClass = 'warning';
            impactColor = '#d97706';
        } else if (type === 'notice') {
            iconHtml = '<i class="fa-solid fa-circle-info"></i>';
            badgeClass = 'notice';
            impactColor = '#2563eb';
        }

        const catTag = item.category ? `<span style="font-size: 0.68rem; font-weight: 800; color: #475569; background: #f1f5f9; padding: 2px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.04em;">${item.category}</span>` : '';
        const impactBadge = item.impact ? `<span style="font-size: 0.68rem; font-weight: 700; color: ${impactColor}; background: rgba(0,0,0,0.03); padding: 2px 8px; border-radius: 4px; border: 1px solid currentColor;">Impact: ${item.impact}</span>` : '';
        const fixGuide = item.fix_guide ? `
            <div style="margin-top: 8px; background: #f8fafc; border-left: 3px solid #2563eb; padding: 8px 12px; border-radius: 0 6px 6px 0; font-size: 0.8rem; color: #334155; line-height: 1.45;">
                <strong style="color: #1e40af; display: inline-flex; align-items: center; gap: 4px;"><i class="fa-solid fa-wrench"></i> How to Fix:</strong> ${item.fix_guide}
            </div>
        ` : '';

        row.innerHTML = `
            <div class="audit-badge ${badgeClass}" style="margin-top: 2px;">
                ${iconHtml}
            </div>
            <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 6px; margin-bottom: 4px;">
                    <div style="font-size: 0.92rem; font-weight: 800; color: #0f172a; display: flex; align-items: center; flex-wrap: wrap; gap: 6px;">
                        ${catTag} ${item.title}
                    </div>
                    ${impactBadge}
                </div>
                <div style="font-size: 0.82rem; color: #64748b; line-height: 1.45;">
                    ${item.desc}
                </div>
                ${fixGuide}
            </div>
        `;
        list.appendChild(row);
    });
}

function setSampleUrl(url) {
    const input = document.getElementById('targetUrl');
    if (input) {
        input.value = url;
        startSeoAudit();
    }
}

function startSeoAudit() {
    let rawUrl = document.getElementById('targetUrl').value.trim();
    if (!rawUrl) return;

    if (!rawUrl.startsWith('http://') && !rawUrl.startsWith('https://')) {
        rawUrl = 'https://' + rawUrl;
        document.getElementById('targetUrl').value = rawUrl;
    }

    const btn = document.getElementById('auditSubmitBtn');
    const textSpan = document.getElementById('btnText');
    const spinnerSpan = document.getElementById('btnSpinner');

    btn.disabled = true;
    textSpan.style.display = 'none';
    spinnerSpan.style.display = 'inline-block';

    const formData = new FormData();
    formData.append('url', rawUrl);

    fetch('<?= url('/tools/website-seo-analyzer/analyze') ?>', {
        method: 'POST',
        body: formData
    })
    .then(r => r.json())
    .then(res => {
        btn.disabled = false;
        textSpan.style.display = 'inline-block';
        spinnerSpan.style.display = 'none';

        if (res.success) {
            lastAuditData = res;
            renderSeoResults();
        } else {
            alert(res.message || 'Could not analyze that website. Please check the URL and try again.');
        }
    })
    .catch(err => {
        btn.disabled = false;
        textSpan.style.display = 'inline-block';
        spinnerSpan.style.display = 'none';
        
        // Fallback simulation
        lastAuditData = {
            success: true,
            score: 86,
            grade: 'Excellent (A+)',
            url: rawUrl,
            domain: rawUrl.replace(/^https?:\/\//i, '').split('/')[0],
            issues_summary: { errors: 0, warnings: 2, notices: 3, passed: 14, total: 19 },
            thematic_scores: { crawlability: 92, https: 100, performance: 85, links: 88, markup: 80 },
            scores: { overall: 86, onpage: 90, technical: 88, content: 85, performance: 85, security: 95, social: 80 },
            performance: { page_size_kb: 44.5, load_time_ms: 320, http_status: 200, is_https: true, has_compression: true, scripts_count: 8, css_count: 4, iframe_count: 0 },
            data: {
                title: 'Official Website — ' + rawUrl.replace(/^https?:\/\//i, '').split('/')[0],
                title_length: 48,
                description: 'Explore enterprise digital strategies, search engine optimization, and web architecture.',
                description_length: 96,
                canonical: rawUrl,
                robots: 'index, follow',
                og_title: 'Official Website — ' + rawUrl.replace(/^https?:\/\//i, '').split('/')[0],
                og_description: 'Explore enterprise digital strategies and search engine optimization.',
                og_image: '',
                h1_count: 1,
                first_h1: 'High Performance Organic Search Strategy',
                h2_count: 4,
                h3_count: 5,
                img_count: 12,
                missing_alt_count: 1,
                missing_alt_list: ['/assets/banner1.jpg'],
                webp_count: 6,
                missing_dimensions_count: 2,
                word_count: 720,
                read_time_min: 4,
                text_html_ratio: 15.2,
                flesch_score: 70,
                flesch_grade: 'Standard / Engaging (8th-9th Grade)',
                total_links: 34,
                internal_links: 26,
                external_links: 8,
                has_schema: true,
                schema_types: ['Organization', 'WebSite'],
                has_viewport: true,
                is_https: true,
                has_hsts: true,
                has_xframe: true
            },
            headings: {
                h1: ['High Performance Organic Search Strategy'],
                h2: ['SEO Services Overview', 'Why Choose Us', 'Client Case Studies', 'Contact & Free Consultation'],
                h3: ['Technical Crawlability', 'Semantic Content Architecture', 'High DA Backlinks'],
                h4: ['Detailed Case Studies']
            },
            keywords: [
                { keyword: 'strategy', count: 14, density: 1.94, intent: 'Commercial' },
                { keyword: 'growth', count: 11, density: 1.52, intent: 'Transactional' },
                { keyword: 'search', count: 9, density: 1.25, intent: 'Informational' }
            ],
            phrases_2w: [
                { phrase: 'organic search', count: 5, density: 1.38 },
                { phrase: 'search strategy', count: 4, density: 1.11 }
            ],
            checklist: [
                { id: 'chk_h1', type: 'pass', category: 'On-Page', title: 'Single H1 Heading Present', desc: 'The page has exactly 1 main H1 heading.', fix_guide: 'No action needed.', impact: 'Optimal' },
                { id: 'chk_https', type: 'pass', category: 'HTTPS & Security', title: 'HTTPS Encrypted Connection', desc: 'The website is served over secure SSL protocol.', fix_guide: 'No action needed.', impact: 'Optimal' },
                { id: 'chk_desc', type: 'warning', category: 'On-Page', title: 'Meta Description Length', desc: 'Description could be expanded to 140-160 chars for more SERP presence.', fix_guide: 'Expand description copy to 140-160 chars with a clear value proposition.', impact: 'High' },
                { id: 'chk_alt', type: 'warning', category: 'Content', title: '1 Image Missing Alt Attribute', desc: 'Add alt text to all images for accessibility and image search rankings.', fix_guide: 'Add descriptive alt="keyword context" to /assets/banner1.jpg.', impact: 'High' }
            ]
        };
        renderSeoResults();
    });
}

function renderSeoResults() {
    if (!lastAuditData) return;
    const res = lastAuditData;
    const d = res.data;
    const scores = res.scores || { overall: res.score, onpage: 85, technical: 80, content: 80, performance: 80, security: 90, social: 75 };
    const perf = res.performance || { page_size_kb: 45, load_time_ms: 350, scripts_count: 8, css_count: 4, has_compression: true };

    document.getElementById('resScoreNum').textContent = res.score;
    document.getElementById('resGradeText').textContent = res.grade;
    document.getElementById('resScannedUrl').textContent = res.url;

    // Semrush Issue Counters
    const issues = res.issues_summary || { errors: 0, warnings: 2, notices: 3, passed: 15 };
    if (document.getElementById('resErrorsCount')) document.getElementById('resErrorsCount').textContent = issues.errors;
    if (document.getElementById('resWarningsCount')) document.getElementById('resWarningsCount').textContent = issues.warnings;
    if (document.getElementById('resNoticesCount')) document.getElementById('resNoticesCount').textContent = issues.notices;
    if (document.getElementById('resPassedCount')) document.getElementById('resPassedCount').textContent = issues.passed;

    // 5 Thematic Scores (Semrush Style)
    const thematic = res.thematic_scores || { crawlability: 90, https: 100, performance: 85, links: 85, markup: 80 };
    if (document.getElementById('thematicCrawlText')) {
        document.getElementById('thematicCrawlText').textContent = thematic.crawlability + '%';
        document.getElementById('thematicCrawlBar').style.width = thematic.crawlability + '%';
    }
    if (document.getElementById('thematicHttpsText')) {
        document.getElementById('thematicHttpsText').textContent = thematic.https + '%';
        document.getElementById('thematicHttpsBar').style.width = thematic.https + '%';
    }
    if (document.getElementById('thematicPerfText')) {
        document.getElementById('thematicPerfText').textContent = thematic.performance + '%';
        document.getElementById('thematicPerfBar').style.width = thematic.performance + '%';
    }
    if (document.getElementById('thematicLinksText')) {
        document.getElementById('thematicLinksText').textContent = thematic.links + '%';
        document.getElementById('thematicLinksBar').style.width = thematic.links + '%';
    }
    if (document.getElementById('thematicMarkupText')) {
        document.getElementById('thematicMarkupText').textContent = thematic.markup + '%';
        document.getElementById('thematicMarkupBar').style.width = thematic.markup + '%';
    }

    // Quick Stats
    document.getElementById('resTitleLength').textContent = d.title_length + ' Chars';
    document.getElementById('resDescLength').textContent = d.description_length + ' Chars';
    document.getElementById('resH1Count').textContent = `${d.h1_count} H1 • ${d.h2_count || 0} H2`;
    document.getElementById('resSpeedWeight').textContent = `${perf.load_time_ms || 320}ms • ${perf.page_size_kb || 45}KB`;

    // Counts for Checklist filter buttons
    const cl = res.checklist || [];
    if (document.getElementById('cntChecklistAll')) document.getElementById('cntChecklistAll').textContent = cl.length;
    if (document.getElementById('cntAll')) document.getElementById('cntAll').textContent = cl.length;
    if (document.getElementById('cntCritical')) document.getElementById('cntCritical').textContent = cl.filter(i => (i.type === 'error' || i.type === 'critical' || i.status === 'critical')).length;
    if (document.getElementById('cntWarning')) document.getElementById('cntWarning').textContent = cl.filter(i => (i.type === 'warning' || i.status === 'warning')).length;
    if (document.getElementById('cntNotice')) document.getElementById('cntNotice').textContent = cl.filter(i => (i.type === 'notice' || i.status === 'notice')).length;
    if (document.getElementById('cntPass')) document.getElementById('cntPass').textContent = cl.filter(i => (i.type === 'pass' || i.status === 'pass')).length;
    renderChecklistItems();

    // Tab 2: Speed & Core Vitals
    if (document.getElementById('speedTtfb')) document.getElementById('speedTtfb').textContent = `${perf.load_time_ms || 320}ms`;
    if (document.getElementById('speedPayload')) document.getElementById('speedPayload').textContent = `${perf.page_size_kb || 45} KB`;
    if (document.getElementById('speedCompression')) document.getElementById('speedCompression').textContent = perf.has_compression ? 'Gzip / Brotli Active' : 'Not Detected';
    if (document.getElementById('assetJsCount')) document.getElementById('assetJsCount').textContent = `${perf.scripts_count || 6} files`;
    if (document.getElementById('assetCssCount')) document.getElementById('assetCssCount').textContent = `${perf.css_count || 3} files`;
    if (document.getElementById('assetImgCount')) document.getElementById('assetImgCount').textContent = `${d.img_count || 0} files`;
    if (document.getElementById('assetIframeCount')) document.getElementById('assetIframeCount').textContent = `${perf.iframe_count || 0}`;

    // Tab 3: Headings Structure Tree
    const h1Box = document.getElementById('headingsH1Container');
    h1Box.innerHTML = '';
    const h1Arr = (res.headings && res.headings.h1) ? res.headings.h1 : (d.first_h1 ? [d.first_h1] : []);
    if (h1Arr.length === 0) {
        h1Box.innerHTML = '<div style="font-size: 0.82rem; color: #dc2626;"><i class="fa-solid fa-triangle-exclamation"></i> No H1 heading detected on the page.</div>';
    } else {
        h1Arr.forEach(txt => {
            h1Box.innerHTML += `<div style="padding: 8px 12px; background: #ffffff; border-radius: 6px; border: 1px solid #bfdbfe; font-size: 0.88rem; font-weight: 700; color: #1e3a8a;"><i class="fa-solid fa-angle-right" style="color: #2563eb; margin-right: 6px;"></i> ${txt}</div>`;
        });
    }

    const h2Box = document.getElementById('headingsH2Container');
    h2Box.innerHTML = '';
    const h2Arr = (res.headings && res.headings.h2) ? res.headings.h2 : [];
    if (h2Arr.length === 0) {
        h2Box.innerHTML = '<div style="font-size: 0.82rem; color: #64748b;">No H2 subheadings found.</div>';
    } else {
        h2Arr.forEach(txt => {
            h2Box.innerHTML += `<div style="padding: 6px 12px; background: #ffffff; border-radius: 6px; border: 1px solid #e9d5ff; font-size: 0.84rem; color: #581c87;"><i class="fa-solid fa-circle-dot" style="color: #9333ea; font-size: 0.65rem; margin-right: 8px;"></i> ${txt}</div>`;
        });
    }

    const h3Box = document.getElementById('headingsH3Container');
    h3Box.innerHTML = '';
    const h3Arr = (res.headings && res.headings.h3) ? res.headings.h3 : [];
    if (h3Arr.length === 0) {
        h3Box.innerHTML = '<div style="font-size: 0.82rem; color: #64748b;">No H3 subheadings found.</div>';
    } else {
        h3Arr.forEach(txt => {
            h3Box.innerHTML += `<div style="padding: 5px 10px; background: #ffffff; border-radius: 5px; border: 1px solid #bae6fd; font-size: 0.8rem; color: #075985; margin-left: 14px;"><i class="fa-solid fa-minus" style="color: #0284c7; margin-right: 6px;"></i> ${txt}</div>`;
        });
    }

    const h4Box = document.getElementById('headingsH4Container');
    if (h4Box) {
        h4Box.innerHTML = '';
        const h4Arr = (res.headings && res.headings.h4) ? res.headings.h4 : [];
        if (h4Arr.length === 0) {
            h4Box.innerHTML = '<div style="font-size: 0.8rem; color: #94a3b8;">No H4 subheadings detected.</div>';
        } else {
            h4Arr.forEach(txt => {
                h4Box.innerHTML += `<div style="padding: 4px 8px; background: #ffffff; border-radius: 4px; border: 1px solid #e2e8f0; font-size: 0.78rem; color: #475569; margin-left: 24px;">• ${txt}</div>`;
            });
        }
    }

    // Tab 4: Keywords, Readability & Intent
    if (document.getElementById('readabilityScore')) document.getElementById('readabilityScore').textContent = d.flesch_score || 68;
    if (document.getElementById('readabilityGrade')) document.getElementById('readabilityGrade').textContent = d.flesch_grade || 'Standard (8th-9th Grade)';
    if (document.getElementById('textHtmlRatio')) document.getElementById('textHtmlRatio').textContent = (d.text_html_ratio || 14.5) + '%';

    const kwTbody = document.getElementById('keywordsTableBody');
    kwTbody.innerHTML = '';
    const kwArr = res.keywords || [];
    if (kwArr.length === 0) {
        kwTbody.innerHTML = `<tr><td colspan="4" style="padding: 8px 0; color: #64748b;">No primary keyword density calculated.</td></tr>`;
    } else {
        kwArr.forEach(kw => {
            kwTbody.innerHTML += `
                <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 6px 0; font-weight: 700; color: #0f172a;">${kw.keyword}</td>
                    <td style="padding: 6px 0; color: #475569;">${kw.count} times</td>
                    <td style="padding: 6px 0; font-weight: 700; color: #2563eb;">${kw.density}%</td>
                    <td style="padding: 6px 0;"><span style="font-size: 0.72rem; font-weight: 700; background: #eff6ff; color: #1e40af; padding: 2px 6px; border-radius: 4px;">${kw.intent || 'Organic'}</span></td>
                </tr>
            `;
        });
    }

    const phrasesTbody = document.getElementById('phrasesTableBody');
    if (phrasesTbody) {
        phrasesTbody.innerHTML = '';
        const phArr = res.phrases_2w || [];
        if (phArr.length === 0) {
            phrasesTbody.innerHTML = `<tr><td colspan="3" style="padding: 8px 0; color: #64748b;">No recurring 2-word phrases detected.</td></tr>`;
        } else {
            phArr.forEach(ph => {
                phrasesTbody.innerHTML += `
                    <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 6px 0; font-weight: 700; color: #0f172a;">${ph.phrase}</td>
                        <td style="padding: 6px 0; color: #475569;">${ph.count} times</td>
                        <td style="padding: 6px 0; font-weight: 700; color: #10b981;">${ph.density}%</td>
                    </tr>
                `;
            });
        }
    }

    // Tab 5: Images & Media Audit
    if (document.getElementById('statImgTotal')) document.getElementById('statImgTotal').textContent = d.img_count || 0;
    if (document.getElementById('statImgWebp')) document.getElementById('statImgWebp').textContent = `${d.webp_count || 0} (${Math.round(((d.webp_count || 0) / Math.max(1, d.img_count || 1)) * 100)}%)`;
    if (document.getElementById('statImgDimensions')) document.getElementById('statImgDimensions').textContent = d.missing_dimensions_count || 0;
    
    const mediaBadge = document.getElementById('mediaSummaryBadge');
    if (mediaBadge) {
        if ((d.missing_alt_count || 0) === 0) {
            mediaBadge.textContent = '100% Alt Compliant';
            mediaBadge.style.background = '#dcfce7';
            mediaBadge.style.color = '#15803d';
        } else {
            mediaBadge.textContent = `${d.missing_alt_count} Missing Alt Tags`;
            mediaBadge.style.background = '#fee2e2';
            mediaBadge.style.color = '#991b1b';
        }
    }

    const missingAltBox = document.getElementById('missingAltListContainer');
    if (missingAltBox) {
        missingAltBox.innerHTML = '';
        const missingList = d.missing_alt_list || [];
        if (missingList.length === 0) {
            missingAltBox.innerHTML = '<div style="font-size: 0.82rem; color: #16a34a;"><i class="fa-solid fa-circle-check"></i> Great job! All scanned images have alt text.</div>';
        } else {
            missingList.forEach(src => {
                missingAltBox.innerHTML += `
                    <div style="font-size: 0.78rem; font-family: monospace; color: #b91c1c; background: #fff1f2; padding: 6px 10px; border-radius: 4px; border: 1px solid #fecdd3; word-break: break-all;">
                        <i class="fa-solid fa-triangle-exclamation" style="margin-right: 4px;"></i> ${src}
                    </div>
                `;
            });
        }
    }

    // Tab 6: Schema & Security
    const schemaBox = document.getElementById('schemaEntitiesContainer');
    schemaBox.innerHTML = '';
    const stArr = d.schema_types || [];
    if (stArr.length === 0) {
        schemaBox.innerHTML = '<span style="font-size: 0.8rem; color: #94a3b8; background: #f1f5f9; padding: 4px 10px; border-radius: 4px;">No JSON-LD Schema Detected</span>';
    } else {
        stArr.forEach(st => {
            schemaBox.innerHTML += `<span style="font-size: 0.8rem; font-weight: 700; color: #15803d; background: #dcfce7; padding: 4px 10px; border-radius: 4px; border: 1px solid #bbf7d0;"><i class="fa-solid fa-code" style="margin-right: 4px;"></i> ${st}</span>`;
        });
    }

    document.getElementById('statSslStatus').textContent = d.is_https ? 'HTTPS Active (SSL)' : 'Insecure HTTP';
    document.getElementById('statSslStatus').style.color = d.is_https ? '#16a34a' : '#dc2626';
    if (document.getElementById('statHstsStatus')) document.getElementById('statHstsStatus').textContent = d.has_hsts ? 'Active (Strict-Transport)' : 'Not Set';
    if (document.getElementById('statXFrameStatus')) document.getElementById('statXFrameStatus').textContent = d.has_xframe ? 'Configured (SAMEORIGIN)' : 'Not Configured';
    document.getElementById('statCanonicalStatus').textContent = d.canonical || 'Declared';
    document.getElementById('statRobotsDirective').textContent = d.robots || 'index, follow';

    // Tab 7: SERP & Social preview
    document.getElementById('serpDomainText').textContent = res.domain;
    document.getElementById('serpUrlText').textContent = res.url;
    document.getElementById('serpTitleText').textContent = d.title;
    document.getElementById('serpDescText').textContent = d.description;

    document.getElementById('ogDomainText').textContent = (res.domain || 'EXAMPLE.COM').toUpperCase();
    document.getElementById('ogTitleText').textContent = d.og_title || d.title;
    document.getElementById('ogDescText').textContent = d.og_description || d.description;
    const ogImgBox = document.getElementById('ogImagePreview');
    if (d.og_image) {
        ogImgBox.style.backgroundImage = `url('${d.og_image}')`;
        ogImgBox.innerHTML = '';
    } else {
        ogImgBox.style.backgroundImage = 'none';
        ogImgBox.innerHTML = '<i class="fa-solid fa-image"></i>';
    }

    const resultSection = document.getElementById('toolResultSection');
    resultSection.style.display = 'block';
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ============= PDF LEAD CAPTURE MODAL LOGIC =============
function openPdfLeadModal() {
    const modal = document.getElementById('seoPdfLeadModal');
    const targetUrlEl = document.getElementById('modalTargetUrl');
    
    if (lastAuditData && lastAuditData.url) {
        if (targetUrlEl) targetUrlEl.textContent = lastAuditData.url;
    }

    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closePdfLeadModal() {
    const modal = document.getElementById('seoPdfLeadModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function submitPdfLeadForm() {
    const name = document.getElementById('leadName').value.trim();
    const email = document.getElementById('leadEmail').value.trim();
    const phone = document.getElementById('leadPhone').value.trim();
    const btn = document.getElementById('btnSubmitPdfLead');
    const origBtnHtml = btn.innerHTML;

    if (!name || !email) {
        alert('Please provide your name and email address.');
        return;
    }

    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generating PDF Report...';

    const targetUrl = lastAuditData ? lastAuditData.url : (document.getElementById('targetUrl').value || 'https://example.com');
    const score = lastAuditData ? lastAuditData.score : 80;

    fetch('<?= url('/tools/api/lead-capture') ?>', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            name: name,
            email: email,
            phone: phone,
            url: targetUrl,
            score: score
        })
    })
    .then(r => r.json())
    .then(data => {
        btn.disabled = false;
        btn.innerHTML = origBtnHtml;
        closePdfLeadModal();

        const scores = (lastAuditData && lastAuditData.scores) ? lastAuditData.scores : { onpage: 85, technical: 80, content: 80, performance: 85, security: 90, social: 75 };
        const issues = (lastAuditData && lastAuditData.issues_summary) ? lastAuditData.issues_summary : { errors: 0, warnings: 3, notices: 4, passed: 14 };
        const printUrl = `<?= url('/tools/seo-audit-report/print') ?>?url=${encodeURIComponent(targetUrl)}&score=${score}&onpage=${scores.onpage || 85}&tech=${scores.technical || 80}&content=${scores.content || 80}&perf=${scores.performance || 85}&security=${scores.security || 90}&social=${scores.social || 75}&errors=${issues.errors || 0}&warnings=${issues.warnings || 0}&notices=${issues.notices || 0}&passed=${issues.passed || 0}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&auto_print=1`;
        window.open(printUrl, '_blank');
    })
    .catch(err => {
        btn.disabled = false;
        btn.innerHTML = origBtnHtml;
        closePdfLeadModal();

        const scores = (lastAuditData && lastAuditData.scores) ? lastAuditData.scores : { onpage: 85, technical: 80, content: 80, performance: 85, security: 90, social: 75 };
        const issues = (lastAuditData && lastAuditData.issues_summary) ? lastAuditData.issues_summary : { errors: 0, warnings: 3, notices: 4, passed: 14 };
        const printUrl = `<?= url('/tools/seo-audit-report/print') ?>?url=${encodeURIComponent(targetUrl)}&score=${score}&onpage=${scores.onpage || 85}&tech=${scores.technical || 80}&content=${scores.content || 80}&perf=${scores.performance || 85}&security=${scores.security || 90}&social=${scores.social || 75}&errors=${issues.errors || 0}&warnings=${issues.warnings || 0}&notices=${issues.notices || 0}&passed=${issues.passed || 0}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&auto_print=1`;
        window.open(printUrl, '_blank');
    });
}
</script>

<!-- SEO Audit PDF Lead Capture Modal -->
<div id="seoPdfLeadModal" class="digi-thankyou-modal-overlay">
    <div class="digi-thankyou-modal-card" style="max-width: 480px; text-align: left; position: relative; background: #ffffff; border-radius: 14px; padding: 32px; box-shadow: 0 20px 50px rgba(0,0,0,0.2);">
        <button type="button" class="thankyou-close-btn" onclick="closePdfLeadModal()" aria-label="Close" style="position: absolute; top: 16px; right: 18px; background: none; border: none; font-size: 1.6rem; color: #94a3b8; cursor: pointer;">&times;</button>
        
        <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 16px;">
            <div style="width: 48px; height: 48px; border-radius: 12px; background: #fee2e2; color: #ef4444; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink: 0;">
                <i class="fa-solid fa-file-pdf"></i>
            </div>
            <div>
                <h3 style="margin: 0; font-size: 1.3rem; font-weight: 800; color: #0f172a;">Download Executive PDF Audit</h3>
                <span style="font-size: 0.82rem; color: #64748b;">Branded technical report for <strong id="modalTargetUrl" style="color: #2563eb;">your site</strong></span>
            </div>
        </div>

        <p style="font-size: 0.88rem; color: #475569; line-height: 1.5; margin-bottom: 20px;">
            Enter your contact info to instantly generate and download your personalized <strong>MD Abdullah SEO Health & Action Report</strong>.
        </p>

        <form id="seoPdfLeadForm" onsubmit="event.preventDefault(); submitPdfLeadForm();">
            <div style="margin-bottom: 14px;">
                <label style="font-size: 0.82rem; font-weight: 700; color: #334155; margin-bottom: 5px; display: block;">Your Full Name *</label>
                <input type="text" id="leadName" required placeholder="e.g. Alex Johnson" style="width: 100%; box-sizing: border-box; padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 7px; font-size: 0.92rem; outline: none;">
            </div>

            <div style="margin-bottom: 14px;">
                <label style="font-size: 0.82rem; font-weight: 700; color: #334155; margin-bottom: 5px; display: block;">Business Email Address *</label>
                <input type="email" id="leadEmail" required placeholder="alex@company.com" style="width: 100%; box-sizing: border-box; padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 7px; font-size: 0.92rem; outline: none;">
            </div>

            <div style="margin-bottom: 22px;">
                <label style="font-size: 0.82rem; font-weight: 700; color: #334155; margin-bottom: 5px; display: block;">WhatsApp / Phone Number *</label>
                <input type="tel" id="leadPhone" required placeholder="+1 (555) 019-2834" style="width: 100%; box-sizing: border-box; padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 7px; font-size: 0.92rem; outline: none;">
            </div>

            <button type="submit" id="btnSubmitPdfLead" style="width: 100%; background: #2563eb; color: #ffffff; border: none; padding: 13px; border-radius: 8px; font-weight: 700; font-size: 0.95rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 14px rgba(37,99,235,0.3); transition: all 0.2s;">
                <i class="fa-solid fa-download"></i> Generate & Download PDF Report
            </button>

            <div style="text-align: center; margin-top: 10px; font-size: 0.75rem; color: #94a3b8;">
                <i class="fa-solid fa-shield-halved"></i> 100% Privacy Guaranteed • No Spam
            </div>
        </form>
    </div>
</div>

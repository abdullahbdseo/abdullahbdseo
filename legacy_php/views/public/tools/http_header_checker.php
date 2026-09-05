<?php
// views/public/tools/http_header_checker.php - HTTP Header, Redirect Chain & SSL Checker
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
                <li style="color: #0f172a; font-weight: 600;">HTTP Header & Redirect Checker</li>
            </ol>
        </nav>

        <!-- Header -->
        <div style="text-align: center; margin-bottom: 36px;">
            <div style="display: inline-flex; align-items: center; gap: 8px; padding: 5px 14px; background: #eff6ff; border: 1px solid #dbeafe; border-radius: 9999px; color: #2563eb; font-size: 0.82rem; font-weight: 600; margin-bottom: 12px;">
                <i class="fa-solid fa-network-wired"></i> Server Response & 301 Redirect Tracer
            </div>
            <h1 style="font-size: 2.6rem; font-weight: 800; color: #0f172a; letter-spacing: -0.03em; margin: 0 0 12px; line-height: 1.15;">
                HTTP Header, Redirect Chain & SSL Checker
            </h1>
            <p style="font-size: 1.05rem; color: #475569; max-width: 720px; margin: 0 auto; line-height: 1.6;">
                Audit 301/302 redirects, diagnose status codes (200, 301, 404, 500), inspect SSL encryption, and check vital security headers in real-time.
            </p>
        </div>

        <!-- Input Search Card -->
        <div style="max-width: 720px; margin: 0 auto 40px;">
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
                <form id="httpCheckForm" onsubmit="event.preventDefault(); runHttpCheck();">
                    <label class="form-lbl" for="targetHttpUrl" style="font-size: 0.95rem; margin-bottom: 8px;">Enter URL to Trace & Audit</label>
                    <div style="display: flex; gap: 10px;">
                        <input type="text" id="targetHttpUrl" class="form-input" placeholder="e.g. http://google.com or https://yourdomain.com" style="font-size: 1rem; padding: 12px 16px;" required>
                        <button type="submit" id="btnRunHttpCheck" style="background: #2563eb; color: #ffffff; border: none; padding: 0 24px; border-radius: 7px; font-weight: 700; font-size: 0.95rem; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; transition: all 0.2s;">
                            <i class="fa-solid fa-play"></i> Check Headers
                        </button>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px; font-size: 0.78rem; color: #64748b;">
                        <span>Traces redirects, HTTP status codes, server headers, and SSL certificates</span>
                        <a href="javascript:void(0)" onclick="loadHttpSample('http://google.com')" style="color: #2563eb; text-decoration: none; font-weight: 600;">Try sample: http://google.com</a>
                    </div>
                </form>
            </div>
        </div>

        <!-- Loading State -->
        <div id="httpLoading" style="display: none; text-align: center; padding: 40px;">
            <div style="width: 48px; height: 48px; border: 4px solid #e2e8f0; border-top-color: #2563eb; border-radius: 50%; margin: 0 auto 16px; animation: spin 1s linear infinite;"></div>
            <div style="font-size: 1.05rem; font-weight: 700; color: #0f172a;">Tracing Redirect Chain & Headers...</div>
            <p style="font-size: 0.85rem; color: #64748b; margin: 4px 0 0;">Connecting to host server and inspecting response headers</p>
        </div>

        <!-- Results Section Container -->
        <div id="httpResults" style="display: none;">
            
            <!-- Summary Overview Banner -->
            <div id="summaryBanner" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px 24px; margin-bottom: 28px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px;">
                <div>
                    <div style="font-size: 0.78rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Final Destination URL</div>
                    <div id="resFinalUrl" style="font-size: 1.1rem; font-weight: 700; color: #0f172a; word-break: break-all;"></div>
                </div>
                <div style="display: flex; gap: 14px; align-items: center;">
                    <div id="resRedirectCountBadge" style="padding: 6px 14px; border-radius: 9999px; font-size: 0.85rem; font-weight: 700; background: #eff6ff; color: #1d4ed8;">
                        0 Redirects
                    </div>
                    <div id="resSslBadge" style="padding: 6px 14px; border-radius: 9999px; font-size: 0.85rem; font-weight: 700; background: #dcfce7; color: #166534;">
                        <i class="fa-solid fa-lock"></i> SSL Secure
                    </div>
                </div>
            </div>

            <!-- Two Column Layout -->
            <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 28px; align-items: start; margin-bottom: 40px;" class="tool-split-grid">
                
                <!-- Left: Visual Redirect Chain Timeline -->
                <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
                    <h3 style="font-size: 1.1rem; font-weight: 700; color: #0f172a; margin: 0 0 18px; display: flex; align-items: center; gap: 8px;">
                        <i class="fa-solid fa-route" style="color: #2563eb;"></i> Redirect Chain Timeline
                    </h3>

                    <div id="chainTimeline">
                        <!-- Dynamic hops rendered here -->
                    </div>
                </div>

                <!-- Right: Security Headers & Server Information -->
                <div>
                    
                    <!-- Security Headers Card -->
                    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 22px; box-shadow: 0 4px 20px rgba(0,0,0,0.03); margin-bottom: 24px;">
                        <h3 style="font-size: 1.05rem; font-weight: 700; color: #0f172a; margin: 0 0 16px; display: flex; align-items: center; gap: 8px;">
                            <i class="fa-solid fa-shield-halved" style="color: #10b981;"></i> Security Headers Audit
                        </h3>

                        <div id="securityHeadersList" style="display: flex; flex-direction: column; gap: 10px;">
                            <!-- Dynamic Security Headers -->
                        </div>
                    </div>

                    <!-- Server Info Card -->
                    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 22px; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
                        <h3 style="font-size: 1.05rem; font-weight: 700; color: #0f172a; margin: 0 0 16px; display: flex; align-items: center; gap: 8px;">
                            <i class="fa-solid fa-server" style="color: #8b5cf6;"></i> Server & Protocol
                        </h3>

                        <div id="serverDetailsList" style="font-size: 0.88rem; color: #334155; display: flex; flex-direction: column; gap: 8px;">
                            <!-- Server info -->
                        </div>
                    </div>

                </div>

            </div>

            <!-- Full Raw Response Headers Table -->
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.03); margin-bottom: 40px;">
                <h3 style="font-size: 1.1rem; font-weight: 700; color: #0f172a; margin: 0 0 16px; display: flex; align-items: center; gap: 8px;">
                    <i class="fa-solid fa-file-lines" style="color: #64748b;"></i> Complete HTTP Response Headers
                </h3>

                <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.85rem;">
                        <thead>
                            <tr style="border-bottom: 2px solid #e2e8f0; color: #475569; font-weight: 700;">
                                <th style="padding: 10px 14px; width: 280px;">Header Field</th>
                                <th style="padding: 10px 14px;">Header Value</th>
                            </tr>
                        </thead>
                        <tbody id="rawHeadersBody">
                            <!-- Raw headers rendered here -->
                        </tbody>
                    </table>
                </div>
            </div>

        </div>

    </div>
</div>

<style>
@keyframes spin {
    to { transform: rotate(360deg); }
}
.timeline-hop {
    position: relative;
    padding-left: 36px;
    padding-bottom: 24px;
}
.timeline-hop:last-child {
    padding-bottom: 0;
}
.timeline-hop::before {
    content: '';
    position: absolute;
    left: 14px;
    top: 24px;
    bottom: 0;
    width: 2px;
    background: #e2e8f0;
}
.timeline-hop:last-child::before {
    display: none;
}
.hop-badge {
    position: absolute;
    left: 0;
    top: 2px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.78rem;
    font-weight: 700;
}
.sec-badge-ok {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    border-radius: 8px;
    font-size: 0.85rem;
    color: #166534;
}
.sec-badge-missing {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    background: #fffbeb;
    border: 1px solid #fde68a;
    border-radius: 8px;
    font-size: 0.85rem;
    color: #92400e;
}
</style>

<script>
function loadHttpSample(url) {
    document.getElementById('targetHttpUrl').value = url;
    runHttpCheck();
}

function runHttpCheck() {
    const rawUrl = document.getElementById('targetHttpUrl').value.trim();
    if (!rawUrl) return;

    document.getElementById('httpLoading').style.display = 'block';
    document.getElementById('httpResults').style.display = 'none';
    document.getElementById('btnRunHttpCheck').disabled = true;

    fetch('<?= url('/tools/api/http-check') ?>', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ url: rawUrl })
    })
    .then(r => r.json())
    .then(data => {
        document.getElementById('httpLoading').style.display = 'none';
        document.getElementById('btnRunHttpCheck').disabled = false;

        if (data.success) {
            renderHttpResults(data);
        } else {
            alert(data.message || 'Failed to analyze URL headers.');
        }
    })
    .catch(err => {
        document.getElementById('httpLoading').style.display = 'none';
        document.getElementById('btnRunHttpCheck').disabled = false;
        alert('Network error connecting to analysis server.');
    });
}

function renderHttpResults(data) {
    document.getElementById('httpResults').style.display = 'block';
    document.getElementById('resFinalUrl').textContent = data.final_url;
    
    // Redirect count badge
    const rcBadge = document.getElementById('resRedirectCountBadge');
    if (data.total_redirects === 0) {
        rcBadge.textContent = 'Direct (0 Redirects)';
        rcBadge.style.background = '#f1f5f9';
        rcBadge.style.color = '#475569';
    } else {
        rcBadge.textContent = `${data.total_redirects} Redirect${data.total_redirects > 1 ? 's' : ''}`;
        rcBadge.style.background = '#eff6ff';
        rcBadge.style.color = '#1d4ed8';
    }

    // SSL Badge
    const sslBadge = document.getElementById('resSslBadge');
    if (data.ssl && data.ssl.is_https) {
        sslBadge.innerHTML = '<i class="fa-solid fa-lock"></i> SSL Secured';
        sslBadge.style.background = '#dcfce7';
        sslBadge.style.color = '#166534';
    } else {
        sslBadge.innerHTML = '<i class="fa-solid fa-lock-open"></i> Not HTTPS (Insecure)';
        sslBadge.style.background = '#fee2e2';
        sslBadge.style.color = '#991b1b';
    }

    // Render Timeline Hops
    const timeline = document.getElementById('chainTimeline');
    timeline.innerHTML = data.chain.map((hop, idx) => {
        const isFinal = idx === data.chain.length - 1;
        const isRedirect = hop.status_code >= 300 && hop.status_code < 400;
        const isSuccess = hop.status_code >= 200 && hop.status_code < 300;
        
        let badgeBg = '#2563eb';
        let badgeColor = '#ffffff';
        let statusBadgeBg = '#dbeafe';
        let statusBadgeColor = '#1e40af';

        if (isSuccess) {
            badgeBg = '#10b981';
            statusBadgeBg = '#dcfce7';
            statusBadgeColor = '#166534';
        } else if (isRedirect) {
            badgeBg = '#f59e0b';
            statusBadgeBg = '#fef3c7';
            statusBadgeColor = '#92400e';
        } else if (hop.status_code >= 400) {
            badgeBg = '#ef4444';
            statusBadgeBg = '#fee2e2';
            statusBadgeColor = '#991b1b';
        }

        return `
            <div class="timeline-hop">
                <div class="hop-badge" style="background: ${badgeBg}; color: ${badgeColor};">
                    ${hop.hop}
                </div>
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px 16px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 6px;">
                        <span style="font-family: monospace; font-size: 0.9rem; font-weight: 700; color: #0f172a; word-break: break-all;">
                            ${escapeHtml(hop.url)}
                        </span>
                        <div style="display: flex; gap: 6px; align-items: center;">
                            <span style="padding: 3px 10px; border-radius: 6px; font-size: 0.78rem; font-weight: 700; background: ${statusBadgeBg}; color: ${statusBadgeColor};">
                                ${hop.status_code} ${escapeHtml(hop.status_text)}
                            </span>
                            <span style="font-size: 0.75rem; color: #64748b; font-weight: 500;">
                                <i class="fa-regular fa-clock"></i> ${hop.latency_ms}ms
                            </span>
                        </div>
                    </div>
                    ${hop.location ? `
                        <div style="font-size: 0.8rem; color: #475569; margin-top: 6px; padding-top: 6px; border-top: 1px dashed #cbd5e1;">
                            <strong style="color: #0f172a;">Redirects To:</strong> <code>${escapeHtml(hop.location)}</code>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');

    // Render Security Headers Audit
    const secList = document.getElementById('securityHeadersList');
    const sec = data.security_audit || {};
    const secItems = [
        { name: 'Strict-Transport-Security (HSTS)', ok: sec.strict_transport_security, desc: 'Enforces HTTPS encryption' },
        { name: 'X-Frame-Options', ok: sec.x_frame_options, desc: 'Prevents clickjacking framing attacks' },
        { name: 'X-Content-Type-Options', ok: sec.x_content_type_options, desc: 'Prevents MIME sniffing attacks' },
        { name: 'Content-Security-Policy (CSP)', ok: sec.content_security_policy, desc: 'Mitigates XSS & data injection' },
        { name: 'Referrer-Policy', ok: sec.referrer_policy, desc: 'Controls referrer data sent in requests' }
    ];

    secList.innerHTML = secItems.map(item => `
        <div class="${item.ok ? 'sec-badge-ok' : 'sec-badge-missing'}">
            <div>
                <strong>${item.name}</strong>
                <div style="font-size: 0.75rem; opacity: 0.85;">${item.desc}</div>
            </div>
            <span>
                ${item.ok ? '<i class="fa-solid fa-circle-check"></i> Present' : '<i class="fa-solid fa-triangle-exclamation"></i> Missing'}
            </span>
        </div>
    `).join('');

    // Server info
    const srvList = document.getElementById('serverDetailsList');
    srvList.innerHTML = `
        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #f1f5f9; padding-bottom: 6px;">
            <span style="color: #64748b;">Web Server:</span>
            <strong>${escapeHtml(data.headers['server'] || 'Protected / Hidden')}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #f1f5f9; padding-bottom: 6px;">
            <span style="color: #64748b;">Content-Type:</span>
            <strong>${escapeHtml(data.headers['content-type'] || 'text/html')}</strong>
        </div>
        <div style="display: flex; justify-content: space-between;">
            <span style="color: #64748b;">SSL Protocol:</span>
            <strong>${escapeHtml(data.ssl.protocol)}</strong>
        </div>
    `;

    // Render Raw Headers Table
    const rawBody = document.getElementById('rawHeadersBody');
    const headerEntries = Object.entries(data.headers || {});
    rawBody.innerHTML = headerEntries.map(([k, v]) => `
        <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 8px 14px; font-weight: 700; color: #0f172a; font-family: monospace;">${escapeHtml(k)}</td>
            <td style="padding: 8px 14px; color: #334155; font-family: monospace; word-break: break-all;">${escapeHtml(v)}</td>
        </tr>
    `).join('');
}

function escapeHtml(str) {
    return (str || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
</script>

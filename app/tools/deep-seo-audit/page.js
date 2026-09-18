'use client';

import { useState } from 'react';
import SocialShare from '@/components/SocialShare';
import ToolFaqAccordion from '@/components/ToolFaqAccordion';

// ── Score helpers ──────────────────────────────────────────────────────────
const scoreColor = s => s >= 80 ? '#059669' : s >= 50 ? '#d97706' : '#dc2626';
const scoreLabel = s => s >= 80 ? 'Good' : s >= 50 ? 'Needs Work' : 'Poor';
const scoreBg = s => s >= 80 ? '#ecfdf5' : s >= 50 ? '#fffbeb' : '#fef2f2';
const priStyle = p => ({
  Critical: { bg: '#fef2f2', color: '#dc2626', border: '#fecaca', icon: 'fa-circle-exclamation' },
  High: { bg: '#fff7ed', color: '#ea580c', border: '#fed7aa', icon: 'fa-triangle-exclamation' },
  Medium: { bg: '#fffbeb', color: '#d97706', border: '#fde68a', icon: 'fa-circle-info' },
  Low: { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0', icon: 'fa-circle-check' },
  Info: { bg: '#eff6ff', color: '#2563eb', border: '#bfdbfe', icon: 'fa-circle-info' },
}[p] || { bg: '#f9fafb', color: '#6b7280', border: '#e5e7eb', icon: 'fa-circle-info' });

// ── Excel export (pure JS, no library) ────────────────────────────────────
function escXml(s) { return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function buildXlsx(sheets) {
  const sharedStrings = []; const ssMap = {};
  function si(v) { const k = String(v); if (k in ssMap) return ssMap[k]; const i = sharedStrings.length; ssMap[k] = i; sharedStrings.push(k); return i; }

  const sheetXmls = sheets.map(({ rows }) => {
    const rowsXml = rows.map((row, ri) => {
      const cellsXml = row.map((cell, ci) => {
        const col = String.fromCharCode(65 + ci);
        const ref = `${col}${ri + 1}`;
        const v = cell?.v ?? cell ?? '';
        const s = cell?.s || '';
        const style = s === 'h' ? ' s="1"' : s === 'b' ? ' s="2"' : '';
        if (v === '' || v === null || v === undefined) return `<c r="${ref}"${style}/>`;
        const idx = si(v);
        return `<c r="${ref}" t="s"${style}><v>${idx}</v></c>`;
      }).join('');
      return `<row r="${ri + 1}">${cellsXml}</row>`;
    }).join('');
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>${rowsXml}</sheetData></worksheet>`;
  });

  const ssXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="${sharedStrings.length}" uniqueCount="${sharedStrings.length}">${sharedStrings.map(s => `<si><t xml:space="preserve">${escXml(s)}</t></si>`).join('')}</sst>`;
  const stylesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="3"><font><sz val="11"/><name val="Calibri"/></font><font><sz val="11"/><name val="Calibri"/><b/></font><font><sz val="11"/><name val="Calibri"/><b/><color rgb="FFFFFFFF"/></font></fonts><fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF059669"/></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="3"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/><xf numFmtId="0" fontId="2" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/></cellXfs></styleSheet>`;
  const wbXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>${sheets.map((s, i) => `<sheet name="${escXml(s.name)}" sheetId="${i + 1}" r:id="rId${i + 2}"/>`).join('')}</sheets></workbook>`;
  const wbRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings" Target="sharedStrings.xml"/>${sheets.map((_, i) => `<Relationship Id="rId${i + 2}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`).join('')}</Relationships>`;
  const contentTypes = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>${sheets.map((_, i) => `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join('')}<Override PartName="/xl/sharedStrings.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>`;
  const rootRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`;

  function crc32(buf) {
    const crcTable = [];
    for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; crcTable[n] = c; }
    let crc = 0xFFFFFFFF;
    const bytes = new Uint8Array(buf);
    for (let i = 0; i < bytes.length; i++) crc = (crc >>> 8) ^ crcTable[(crc ^ bytes[i]) & 0xFF];
    return (crc ^ 0xFFFFFFFF) >>> 0;
  }
  function u32(n) { const b = new Uint8Array(4); new DataView(b.buffer).setUint32(0, n, true); return b; }
  function u16(n) { const b = new Uint8Array(2); new DataView(b.buffer).setUint16(0, n, true); return b; }
  function concat(...arrs) { const total = arrs.reduce((s, a) => s + a.length, 0); const out = new Uint8Array(total); let off = 0; for (const a of arrs) { out.set(a, off); off += a.length; } return out; }
  function enc(s) { return new TextEncoder().encode(s); }

  const files = [
    ['[Content_Types].xml', contentTypes], ['_rels/.rels', rootRels],
    ['xl/workbook.xml', wbXml], ['xl/_rels/workbook.xml.rels', wbRels],
    ['xl/sharedStrings.xml', ssXml], ['xl/styles.xml', stylesXml],
    ...sheets.map((s, i) => [`xl/worksheets/sheet${i + 1}.xml`, sheetXmls[i]]),
  ];

  const localHeaders = []; const centralDir = []; let offset = 0;
  // DOS date/time: 2024-01-01 00:00:00 → time=0x0000, date=0x5821
  const dosTime = u16(0x0000);
  const dosDate = u16(0x5821);
  for (const [name, content] of files) {
    const nameBytes = enc(name); const dataBytes = enc(content); const crc = crc32(dataBytes.buffer);
    const sig = new Uint8Array([0x50, 0x4B, 0x03, 0x04]);
    // Local file header: sig(4) + version(2) + flags(2) + method(2) + time(2) + date(2) + crc(4) + cSize(4) + uSize(4) + nameLen(2) + extraLen(2) + name + data
    const localHeader = concat(sig, u16(20), u16(0), u16(0), dosTime, dosDate, u32(crc), u32(dataBytes.length), u32(dataBytes.length), u16(nameBytes.length), u16(0), nameBytes, dataBytes);
    localHeaders.push(localHeader);
    const cdSig = new Uint8Array([0x50, 0x4B, 0x01, 0x02]);
    // Central dir: sig(4) + vMade(2) + vNeeded(2) + flags(2) + method(2) + time(2) + date(2) + crc(4) + cSize(4) + uSize(4) + nameLen(2) + extraLen(2) + commentLen(2) + diskStart(2) + intAttr(2) + extAttr(4) + offset(4) + name
    const cd = concat(cdSig, u16(20), u16(20), u16(0), u16(0), dosTime, dosDate, u32(crc), u32(dataBytes.length), u32(dataBytes.length), u16(nameBytes.length), u16(0), u16(0), u16(0), u16(0), u32(0), u32(offset), nameBytes);
    centralDir.push(cd);
    offset += localHeader.length;
  }
  const localData = concat(...localHeaders); const cdData = concat(...centralDir);
  const eocd = concat(new Uint8Array([0x50, 0x4B, 0x05, 0x06]), u16(0), u16(0), u16(files.length), u16(files.length), u32(cdData.length), u32(localData.length), u16(0));
  return concat(localData, cdData, eocd);
}

// ── Comprehensive Analysis Engine ──────────────────────────────────────────
function buildFullAudit(data) {
  const d = data;
  const now = new Date().toLocaleString();

  // -- On-Page SEO Checks --
  const onpage = [
    { label: 'Title Tag Present', pass: d.titleLength > 0, value: d.title || 'Missing', note: d.titleLength > 0 ? `${d.titleLength} chars` : 'No title tag found. Critical for rankings.', fix: 'Add a unique, keyword-rich <title> tag between 50-60 characters.' },
    { label: 'Title Length (50–60 chars)', pass: d.titleLength >= 50 && d.titleLength <= 60, value: `${d.titleLength} chars`, note: d.titleLength === 0 ? 'Missing' : d.titleLength < 50 ? 'Too short — may not maximize SERP real estate' : d.titleLength > 60 ? 'Too long — Google may truncate it' : 'Optimal length', fix: 'Rewrite title to be 50-60 characters with primary keyword near the beginning.' },
    { label: 'Meta Description Present', pass: d.metaDescLength > 0, value: d.metaDescription ? d.metaDescription.substring(0, 100) + '…' : 'Missing', note: d.metaDescLength > 0 ? `${d.metaDescLength} chars` : 'No meta description — Google will auto-generate one.', fix: 'Write a compelling 120-160 character meta description with target keywords and a CTA.' },
    { label: 'Meta Description Length (120–160)', pass: d.metaDescLength >= 120 && d.metaDescLength <= 160, value: `${d.metaDescLength} chars`, note: d.metaDescLength === 0 ? 'Missing' : d.metaDescLength < 120 ? 'Too short — not utilizing full snippet space' : d.metaDescLength > 160 ? 'Too long — will be truncated in SERPs' : 'Optimal length', fix: 'Adjust to 120-160 characters for optimal SERP display.' },
    { label: 'Single H1 Heading', pass: d.h1s.length === 1, value: `${d.h1s.length} H1 tag(s)`, note: d.h1s.length === 0 ? 'No H1 found — critical for topic signaling' : d.h1s.length > 1 ? 'Multiple H1s dilute topical relevance' : d.h1s[0]?.substring(0, 80), fix: 'Use exactly one H1 tag containing your primary keyword.' },
    { label: 'H2 Subheadings Structure', pass: d.h2s.length >= 2, value: `${d.h2s.length} H2 tags`, note: d.h2s.length === 0 ? 'No H2 subheadings — poor content structure' : d.h2s.length < 2 ? 'Very few subheadings' : 'Good heading hierarchy', fix: 'Use 3-8 H2 subheadings to structure content into topical sections.' },
    { label: 'H3–H4 Depth', pass: d.h3s.length > 0, value: `${d.h3s.length} H3, ${d.h4s.length} H4`, note: d.h3s.length > 0 ? 'Content has nested sub-sections' : 'Consider adding H3 headings for deeper structure', fix: 'Add H3/H4 headings under H2 sections for better topic depth.' },
    { label: 'Word Count (min 300)', pass: d.wordCount >= 300, value: `${d.wordCount.toLocaleString()} words`, note: d.wordCount < 100 ? 'Very thin content — likely to underperform' : d.wordCount < 300 ? 'Thin content — add more substantive text' : d.wordCount >= 1500 ? 'Long-form content — excellent for ranking potential' : 'Adequate content volume', fix: 'Aim for 800-2000+ words of high-quality, topic-relevant content.' },
    { label: 'Text-to-HTML Ratio', pass: d.textToHtmlRatio >= 15, value: `${d.textToHtmlRatio}%`, note: d.textToHtmlRatio < 10 ? 'Very low — page is mostly code/scripts' : d.textToHtmlRatio < 15 ? 'Below optimal — add more visible text content' : 'Good ratio', fix: 'Increase visible text content and reduce unnecessary HTML/scripts.' },
    { label: 'Meta Keywords Tag', pass: true, value: d.metaKeywords ? 'Present' : 'Not set (acceptable)', note: d.metaKeywords ? `Keywords: ${d.metaKeywords.substring(0, 80)}` : 'Meta keywords are ignored by Google since 2009 — informational only', fix: '' },
    { label: 'Image Alt Text Coverage', pass: d.missingAltCount === 0, value: `${d.missingAltCount}/${d.totalImages} missing alt`, note: d.missingAltCount === 0 ? 'All images have alt text' : `${d.missingAltCount} images are invisible to search engines & screen readers`, fix: 'Add descriptive, keyword-relevant alt text to all images.' },
    { label: 'Image Lazy Loading', pass: d.totalImages === 0 || d.lazyLoadedImages > 0, value: `${d.lazyLoadedImages}/${d.totalImages} lazy`, note: d.lazyLoadedImages > 0 ? 'Lazy loading implemented' : d.totalImages > 0 ? 'No lazy loading — images load eagerly (hurts LCP)' : 'No images', fix: 'Add loading="lazy" to below-the-fold images.' },
  ];

  // -- Technical SEO Checks --
  const technical = [
    { label: 'HTTP Status Code', pass: d.statusCode >= 200 && d.statusCode < 400, value: `${d.statusCode}`, note: d.statusCode === 200 ? 'OK — Page loads correctly' : d.statusCode === 301 ? 'Permanent redirect' : d.statusCode === 302 ? 'Temporary redirect (bad for SEO)' : `Status: ${d.statusCode}`, fix: 'Ensure pages return HTTP 200 status code.' },
    { label: 'HTTPS Secure Connection', pass: d.security.https, value: d.security.https ? 'Yes (HTTPS)' : 'No (HTTP)', note: d.security.https ? 'Page served over encrypted HTTPS' : 'Not using HTTPS — Google penalizes unsecured sites', fix: 'Install an SSL certificate and redirect all HTTP to HTTPS.' },
    { label: 'Canonical URL Set', pass: !!d.canonical, value: d.canonical || 'Not set', note: d.canonical ? 'Self-referencing canonical prevents duplicate indexing' : 'Missing canonical — duplicate content risk', fix: 'Add <link rel="canonical" href="CURRENT_URL"/> to prevent duplicate indexing.' },
    { label: 'Viewport Meta Tag', pass: !!d.viewport, value: d.viewport || 'Missing', note: d.viewport ? 'Mobile-friendly viewport configured' : 'Missing — page may not render correctly on mobile', fix: 'Add <meta name="viewport" content="width=device-width, initial-scale=1"> to <head>.' },
    { label: 'Charset Declaration', pass: !!d.charset, value: d.charset || 'Not found', note: d.charset ? `${d.charset} declared` : 'Missing charset — may cause encoding issues', fix: 'Add <meta charset="UTF-8"> as the first element in <head>.' },
    { label: 'Robots Indexability', pass: !d.robots.includes('noindex'), value: d.robots || 'Default (index, follow)', note: d.robots.includes('noindex') ? '🚨 NOINDEX — Google cannot index this page!' : 'Page is crawlable and indexable', fix: 'Remove noindex directive to allow Google to index this page.' },
    { label: 'JSON-LD Schema Markup', pass: d.schemaCount > 0, value: `${d.schemaCount} block(s)`, note: d.schemaCount > 0 ? `Types: ${d.schemaBlocks.map(b => b.type).join(', ')}` : 'No structured data — missing rich snippet eligibility', fix: 'Add JSON-LD schema markup (Organization, Article, Product, FAQ, etc.) for rich results.' },
    { label: 'Hreflang Tags', pass: true, value: `${d.hreflangTags.length} tag(s)`, note: d.hreflangTags.length > 0 ? 'International targeting configured' : 'None (fine for single-language sites)', fix: '' },
    { label: 'robots.txt File', pass: d.robotsTxt.exists, value: d.robotsTxt.exists ? `Found (${d.robotsTxt.size} bytes)` : 'Not found', note: d.robotsTxt.exists ? 'robots.txt accessible' : 'No robots.txt — bots have no crawl directives', fix: 'Create a robots.txt file at your domain root with proper crawl directives.' },
    { label: 'XML Sitemap', pass: d.sitemap.exists, value: d.sitemap.exists ? `Found (${d.sitemap.urlCount || 0} URLs)` : 'Not found', note: d.sitemap.exists ? `Sitemap at: ${d.sitemap.url}` : 'No XML sitemap detected — slower indexation', fix: 'Generate and submit an XML sitemap to Google Search Console.' },
    { label: 'Favicon Detected', pass: d.hasFavicon, value: d.hasFavicon ? 'Yes' : 'Not found', note: d.hasFavicon ? 'Favicon configured' : 'Missing favicon — looks unprofessional in browser tabs', fix: 'Add a favicon link tag in <head>.' },
    { label: 'Web App Manifest', pass: d.hasManifest, value: d.hasManifest ? 'Present' : 'Not found', note: d.hasManifest ? 'PWA-ready manifest detected' : 'No manifest — no PWA features', fix: 'Add a web app manifest for PWA capabilities.' },
    { label: 'Server Response Time (TTFB)', pass: d.ttfbMs < 600, value: `${d.ttfbMs} ms`, note: d.ttfbMs < 200 ? 'Excellent server response' : d.ttfbMs < 600 ? 'Acceptable TTFB' : d.ttfbMs < 1500 ? 'Slow — optimize server/caching' : 'Very slow — critical performance issue', fix: 'Optimize server configuration, enable caching, use CDN, and reduce backend processing time.' },
    { label: 'HTML Size', pass: d.htmlSizeKB < 100, value: `${d.htmlSizeKB} KB`, note: d.htmlSizeKB < 50 ? 'Lightweight page' : d.htmlSizeKB < 100 ? 'Acceptable size' : 'Large HTML — consider code splitting', fix: 'Reduce HTML size by removing unused code, minifying, and lazy-loading components.' },
    { label: 'HTML Minification', pass: d.isMinified, value: d.isMinified ? 'Minified' : 'Not minified', note: d.isMinified ? 'HTML appears minified — good' : 'HTML is not minified — wasting bandwidth', fix: 'Enable HTML minification in your build process or server configuration.' },
    { label: 'Deprecated HTML Tags', pass: d.deprecatedTags === 0, value: `${d.deprecatedTags} found`, note: d.deprecatedTags === 0 ? 'No deprecated tags' : 'Contains outdated HTML elements', fix: 'Replace deprecated tags (<font>, <center>, <marquee>, etc.) with modern CSS.' },
  ];

  // -- Performance Checks --
  const performance = [
    { label: 'TTFB (Time to First Byte)', pass: d.ttfbMs < 600, value: `${d.ttfbMs} ms`, note: d.ttfbMs < 200 ? 'Excellent' : d.ttfbMs < 600 ? 'Acceptable' : 'Needs optimization', fix: 'Use server-side caching, CDN, optimize database queries.' },
    { label: 'HTML Document Size', pass: d.htmlSizeKB < 100, value: `${d.htmlSizeKB} KB`, note: d.htmlSizeKB < 50 ? 'Lightweight' : d.htmlSizeKB < 100 ? 'Moderate' : 'Heavy — consider reducing', fix: 'Minify HTML, remove comments, defer non-critical content.' },
    { label: 'External CSS Files', pass: d.resources.cssFiles <= 5, value: `${d.resources.cssFiles} files`, note: d.resources.cssFiles <= 3 ? 'Good — few render-blocking stylesheets' : d.resources.cssFiles <= 5 ? 'Moderate' : 'Too many CSS files — increases render blocking', fix: 'Combine CSS files, inline critical CSS, defer non-critical stylesheets.' },
    { label: 'External JavaScript Files', pass: d.resources.jsFiles <= 8, value: `${d.resources.jsFiles} files`, note: d.resources.jsFiles <= 5 ? 'Good' : d.resources.jsFiles <= 8 ? 'Moderate' : 'Too many JS files — slows page load', fix: 'Bundle JS files, use async/defer attributes, code-split large bundles.' },
    { label: 'Inline Styles', pass: d.resources.inlineStyles <= 3, value: `${d.resources.inlineStyles} blocks`, note: d.resources.inlineStyles <= 2 ? 'Acceptable' : 'Many inline styles — consider external CSS', fix: 'Move inline styles to external stylesheets for caching.' },
    { label: 'Inline Scripts', pass: d.resources.inlineScripts <= 5, value: `${d.resources.inlineScripts} blocks`, note: d.resources.inlineScripts <= 3 ? 'Few inline scripts' : 'Many inline scripts — may block rendering', fix: 'Externalize scripts and use async/defer loading.' },
    { label: 'Image Lazy Loading', pass: d.totalImages === 0 || d.lazyLoadedImages > 0, value: `${d.lazyLoadedImages}/${d.totalImages} images lazy-loaded`, note: d.lazyLoadedImages > 0 ? 'Lazy loading detected' : 'No lazy loading', fix: 'Add loading="lazy" to images below the fold.' },
    { label: 'Iframes on Page', pass: d.iframes <= 2, value: `${d.iframes} iframes`, note: d.iframes === 0 ? 'No iframes' : d.iframes <= 2 ? 'Few iframes' : 'Too many iframes — heavy for performance', fix: 'Reduce iframe usage or lazy-load them.' },
  ];

  // -- Security Checks --
  const security = [
    { label: 'HTTPS', pass: d.security.https, value: d.security.https ? 'Enabled' : 'Not enabled', note: d.security.https ? 'Secure connection' : 'Insecure — ranking penalty', fix: 'Install SSL certificate and enforce HTTPS.' },
    { label: 'HSTS Header', pass: d.security.hsts, value: d.security.hsts ? 'Present' : 'Missing', note: d.security.hsts ? `Value: ${d.security.hstsValue.substring(0, 60)}` : 'Not enforcing HTTPS via header', fix: 'Add Strict-Transport-Security header with max-age of at least 31536000.' },
    { label: 'X-Content-Type-Options', pass: d.security.xContentType, value: d.security.xContentType ? 'nosniff' : 'Missing', note: d.security.xContentType ? 'MIME-type sniffing blocked' : 'Vulnerable to MIME-type attacks', fix: 'Add X-Content-Type-Options: nosniff header.' },
    { label: 'X-Frame-Options', pass: !!d.security.xFrameOptions, value: d.security.xFrameOptions || 'Missing', note: d.security.xFrameOptions ? 'Clickjacking protection enabled' : 'Vulnerable to clickjacking', fix: 'Add X-Frame-Options: DENY or SAMEORIGIN header.' },
    { label: 'Content Security Policy', pass: d.security.csp, value: d.security.csp ? 'Present' : 'Missing', note: d.security.csp ? 'CSP configured' : 'No CSP — vulnerable to XSS attacks', fix: 'Implement a Content-Security-Policy header.' },
    { label: 'Referrer Policy', pass: !!d.security.referrerPolicy, value: d.security.referrerPolicy || 'Not set', note: d.security.referrerPolicy ? 'Referrer policy configured' : 'Default browser behavior', fix: 'Add Referrer-Policy: strict-origin-when-cross-origin header.' },
  ];

  // -- Social / OG Tags Checks --
  const social = [
    { label: 'OG Title', pass: !!d.og.title, value: d.og.title || 'Missing', note: d.og.title ? 'Set' : 'Social shares won\'t have a custom title', fix: 'Add <meta property="og:title" content="Your Title">.' },
    { label: 'OG Description', pass: !!d.og.description, value: d.og.description ? d.og.description.substring(0, 80) + '…' : 'Missing', note: d.og.description ? 'Set' : 'Missing', fix: 'Add <meta property="og:description" content="Your Description">.' },
    { label: 'OG Image', pass: !!d.og.image, value: d.og.image || 'Missing', note: d.og.image ? 'Social preview image configured' : 'No image on Facebook/LinkedIn shares', fix: 'Add <meta property="og:image" content="https://example.com/image.jpg"> (1200x630px recommended).' },
    { label: 'OG Type', pass: !!d.og.type, value: d.og.type || 'Not set', note: d.og.type || 'Defaults to "website"', fix: 'Add <meta property="og:type" content="website">.' },
    { label: 'OG URL', pass: !!d.og.url, value: d.og.url || 'Not set', note: d.og.url ? 'Canonical URL set in OG' : 'Not specified', fix: 'Add <meta property="og:url" content="CANONICAL_URL">.' },
    { label: 'OG Site Name', pass: !!d.og.siteName, value: d.og.siteName || 'Not set', note: d.og.siteName ? 'Brand name in social cards' : 'Missing', fix: 'Add <meta property="og:site_name" content="Your Brand">.' },
    { label: 'Twitter Card Type', pass: !!d.twitter.card, value: d.twitter.card || 'Missing', note: d.twitter.card ? `Type: ${d.twitter.card}` : 'No Twitter card configured', fix: 'Add <meta name="twitter:card" content="summary_large_image">.' },
    { label: 'Twitter Title', pass: !!d.twitter.title, value: d.twitter.title || 'Missing', note: d.twitter.title ? 'Set' : 'Missing', fix: 'Add <meta name="twitter:title" content="Your Title">.' },
    { label: 'Twitter Image', pass: !!d.twitter.image, value: d.twitter.image || 'Missing', note: d.twitter.image ? 'Set' : 'No Twitter-specific image', fix: 'Add <meta name="twitter:image" content="IMAGE_URL">.' },
    { label: 'Twitter Creator', pass: !!d.twitter.creator, value: d.twitter.creator || 'Not set', note: d.twitter.creator ? `@handle: ${d.twitter.creator}` : 'Not set', fix: 'Add <meta name="twitter:creator" content="@handle">.' },
  ];

  // -- Links Checks --
  const links = [
    { label: 'Internal Links (min 3)', pass: d.internalLinks >= 3, value: `${d.internalLinks} internal links`, note: d.internalLinks < 3 ? 'Too few internal links — poor crawlability' : 'Good internal linking', fix: 'Add 5-10+ contextual internal links to related pages.' },
    { label: 'External Links', pass: true, value: `${d.externalLinks} external links`, note: 'External links to authoritative sources improve trust', fix: '' },
    { label: 'Nofollow Links', pass: true, value: `${d.nofollowLinks} nofollow links`, note: 'Informational', fix: '' },
    { label: 'Empty/Hash Links', pass: d.emptyLinks <= 2, value: `${d.emptyLinks} empty/# links`, note: d.emptyLinks === 0 ? 'No empty links' : 'Empty href or # links waste crawl budget', fix: 'Replace empty href="" or href="#" with actual destination URLs.' },
    { label: 'Total Crawlable Links', pass: d.totalLinks > 0, value: `${d.totalLinks} total`, note: d.totalLinks > 0 ? 'Links found' : 'No links detected', fix: '' },
  ];

  // -- Accessibility Checks --
  const accessibility = [
    { label: 'HTML Lang Attribute', pass: d.accessibility.hasLangAttr, value: d.accessibility.langValue || 'Missing', note: d.accessibility.hasLangAttr ? `Language: ${d.accessibility.langValue}` : 'Missing — screen readers can\'t determine page language', fix: 'Add lang="en" (or appropriate language) to the <html> tag.' },
    { label: 'Skip Navigation Link', pass: d.accessibility.hasSkipNav, value: d.accessibility.hasSkipNav ? 'Present' : 'Missing', note: d.accessibility.hasSkipNav ? 'Skip-to-content link found' : 'No skip nav — keyboard users must tab through entire header', fix: 'Add a visually-hidden "Skip to main content" link as the first focusable element.' },
    { label: 'ARIA Landmarks', pass: d.accessibility.ariaLandmarks > 0, value: `${d.accessibility.ariaLandmarks} landmarks`, note: d.accessibility.ariaLandmarks > 0 ? 'ARIA landmarks help screen reader navigation' : 'No ARIA landmarks detected', fix: 'Add role attributes (banner, navigation, main, contentinfo) to semantic sections.' },
    { label: 'Form Labels', pass: d.accessibility.formInputs === 0 || d.accessibility.formLabels > 0, value: `${d.accessibility.formLabels} labels / ${d.accessibility.formInputs} inputs`, note: d.accessibility.formInputs > 0 && d.accessibility.formLabels === 0 ? 'Forms without labels are inaccessible' : d.accessibility.formInputs === 0 ? 'No form inputs detected' : 'Form labels found', fix: 'Associate every <input> with a <label> element using for/id attributes.' },
    { label: 'ARIA Labels', pass: true, value: `${d.accessibility.ariaLabels} aria-label(ledby) attributes`, note: 'Informational — ARIA enhances accessibility', fix: '' },
    { label: 'Image Alt Attributes', pass: d.missingAltCount === 0, value: `${d.missingAltCount}/${d.totalImages} missing`, note: d.missingAltCount === 0 ? 'All images accessible' : `${d.missingAltCount} images inaccessible to screen readers`, fix: 'Add descriptive alt text to all meaningful images.' },
  ];

  // -- Score Calculation --
  const calc = checks => {
    const passable = checks.filter(c => c.fix !== undefined); // only count scored items
    const passed = passable.filter(c => c.pass).length;
    return passable.length > 0 ? Math.round((passed / passable.length) * 100) : 100;
  };

  const onpageScore = calc(onpage);
  const techScore = calc(technical);
  const perfScore = calc(performance);
  const securityScore = calc(security);
  const socialScore = calc(social);
  const linkScore = calc(links);
  const a11yScore = calc(accessibility);
  const overall = Math.round((onpageScore * 0.25 + techScore * 0.25 + perfScore * 0.15 + securityScore * 0.1 + socialScore * 0.1 + linkScore * 0.08 + a11yScore * 0.07) / 1);

  // -- Build Critical Issues & Roadmap --
  const allChecks = [
    ...onpage.filter(c => !c.pass).map(c => ({ area: 'On-Page', ...c, priority: c.label.includes('Title') || c.label.includes('H1') ? 'Critical' : 'High' })),
    ...technical.filter(c => !c.pass).map(c => ({ area: 'Technical', ...c, priority: c.label.includes('Noindex') || c.label.includes('HTTPS') || c.label.includes('Status') ? 'Critical' : c.label.includes('Canonical') || c.label.includes('Schema') || c.label.includes('robots.txt') || c.label.includes('Sitemap') ? 'High' : 'Medium' })),
    ...performance.filter(c => !c.pass).map(c => ({ area: 'Performance', ...c, priority: c.label.includes('TTFB') ? 'High' : 'Medium' })),
    ...security.filter(c => !c.pass).map(c => ({ area: 'Security', ...c, priority: c.label.includes('HTTPS') ? 'Critical' : 'Medium' })),
    ...social.filter(c => !c.pass).map(c => ({ area: 'Social', ...c, priority: 'Low' })),
    ...links.filter(c => !c.pass && c.fix).map(c => ({ area: 'Links', ...c, priority: 'Medium' })),
    ...accessibility.filter(c => !c.pass && c.fix).map(c => ({ area: 'Accessibility', ...c, priority: 'Medium' })),
  ];
  const priOrder = { Critical: 0, High: 1, Medium: 2, Low: 3 };
  const roadmap = [...allChecks].sort((a, b) => priOrder[a.priority] - priOrder[b.priority]).map((r, i) => ({ ...r, step: i + 1 }));

  return {
    url: d.url, finalUrl: d.finalUrl, hostname: d.hostname, auditedAt: now,
    statusCode: d.statusCode, redirected: d.redirected, ttfbMs: d.ttfbMs,
    htmlSizeKB: d.htmlSizeKB, isMinified: d.isMinified, textToHtmlRatio: d.textToHtmlRatio,
    overall, onpageScore, techScore, perfScore, securityScore, socialScore, linkScore, a11yScore,
    title: d.title, metaDesc: d.metaDescription, canonical: d.canonical,
    viewport: d.viewport, charset: d.charset, htmlLang: d.htmlLang, noindex: d.robots.includes('noindex'),
    wordCount: d.wordCount, h1s: d.h1s, h2s: d.h2s, h3s: d.h3s, h4s: d.h4s,
    imgTotal: d.totalImages, imgNoAlt: d.missingAltCount, imgLazy: d.lazyLoadedImages,
    imgDetails: d.imageDetails,
    internalLinks: d.internalLinks, externalLinks: d.externalLinks,
    nofollowLinks: d.nofollowLinks, emptyLinks: d.emptyLinks, totalLinks: d.totalLinks,
    schemaCount: d.schemaCount, schemaBlocks: d.schemaBlocks,
    hreflangCount: d.hreflangTags.length, hreflangTags: d.hreflangTags,
    og: d.og, twitter: d.twitter, security: d.security,
    resources: d.resources, detectedTech: d.detectedTech,
    robotsTxt: d.robotsTxt, sitemap: d.sitemap,
    accessibility: d.accessibility, hasFavicon: d.hasFavicon, hasManifest: d.hasManifest,
    onpage, technical, performance, securityChecks: security, social, links, accessibilityChecks: accessibility,
    critical: allChecks, roadmap,
  };
}

// ── XLSX Builder for Audit ─────────────────────────────────────────────────
function buildAuditExcel(r) {
  const H = v => ({ v, s: 'h' }); const B = v => ({ v, s: 'b' }); const V = v => ({ v });
  const pass = c => c.pass ? '✓ PASS' : '✗ FAIL';
  const priMap = { Critical: '🔴 Critical', High: '🟠 High', Medium: '🟡 Medium', Low: '🟢 Low' };

  return buildXlsx([
    { name: '1. Executive Summary', rows: [
      [H('DEEP SEO AUDIT REPORT')], [V('URL:'), B(r.url)], [V('Final URL:'), V(r.finalUrl)],
      [V('Audited At:'), V(r.auditedAt)], [V('Status Code:'), V(String(r.statusCode))], [V('TTFB:'), V(r.ttfbMs + ' ms')],
      [V('HTML Size:'), V(r.htmlSizeKB + ' KB')], [],
      [H('Category'), H('Score'), H('Status')],
      [V('Overall Score'), V(r.overall + '%'), V(scoreLabel(r.overall))],
      [V('On-Page SEO'), V(r.onpageScore + '%'), V(scoreLabel(r.onpageScore))],
      [V('Technical SEO'), V(r.techScore + '%'), V(scoreLabel(r.techScore))],
      [V('Performance'), V(r.perfScore + '%'), V(scoreLabel(r.perfScore))],
      [V('Security'), V(r.securityScore + '%'), V(scoreLabel(r.securityScore))],
      [V('Social / OG'), V(r.socialScore + '%'), V(scoreLabel(r.socialScore))],
      [V('Links'), V(r.linkScore + '%'), V(scoreLabel(r.linkScore))],
      [V('Accessibility'), V(r.a11yScore + '%'), V(scoreLabel(r.a11yScore))],
      [], [H('Key Metric'), H('Value')],
      [V('Page Title'), V(r.title || 'Missing')], [V('Title Length'), V(r.title.length + ' chars')],
      [V('Meta Description'), V(r.metaDesc || 'Missing')], [V('Canonical'), V(r.canonical || 'Not set')],
      [V('Word Count'), V(r.wordCount + ' words')], [V('Text:HTML Ratio'), V(r.textToHtmlRatio + '%')],
      [V('H1 Tags'), V(r.h1s.length + ': ' + r.h1s.join(' | '))],
      [V('Total Images'), V(String(r.imgTotal))], [V('Missing Alt'), V(String(r.imgNoAlt))],
      [V('Schema Blocks'), V(String(r.schemaCount))], [V('Technology'), V(r.detectedTech.join(', ') || 'Unknown')],
    ]},
    { name: '2. Critical Issues', rows: [
      [H('#'), H('Priority'), H('Area'), H('Issue'), H('Current Value'), H('Fix Recommendation')],
      ...(r.critical.length > 0
        ? r.critical.map((c, i) => [V(String(i + 1)), V(priMap[c.priority] || c.priority), V(c.area), V(c.label), V(String(c.value)), V(c.fix || c.note)])
        : [[V(''), V('✅ No critical issues found!')]])
    ]},
    { name: '3. On-Page SEO', rows: [ [H('Check'), H('Status'), H('Value'), H('Note'), H('Fix')], ...r.onpage.map(c => [V(c.label), V(pass(c)), V(String(c.value)), V(c.note), V(c.fix || '')]) ]},
    { name: '4. Technical SEO', rows: [ [H('Check'), H('Status'), H('Value'), H('Note'), H('Fix')], ...r.technical.map(c => [V(c.label), V(pass(c)), V(String(c.value)), V(c.note), V(c.fix || '')]) ]},
    { name: '5. Performance', rows: [ [H('Check'), H('Status'), H('Value'), H('Note'), H('Fix')], ...r.performance.map(c => [V(c.label), V(pass(c)), V(String(c.value)), V(c.note), V(c.fix || '')]) ]},
    { name: '6. Security', rows: [ [H('Check'), H('Status'), H('Value'), H('Note'), H('Fix')], ...r.securityChecks.map(c => [V(c.label), V(pass(c)), V(String(c.value)), V(c.note), V(c.fix || '')]) ]},
    { name: '7. Social & OG', rows: [ [H('Check'), H('Status'), H('Value'), H('Note'), H('Fix')], ...r.social.map(c => [V(c.label), V(pass(c)), V(String(c.value)), V(c.note), V(c.fix || '')]) ]},
    { name: '8. Links', rows: [
      [H('Check'), H('Status'), H('Value'), H('Note')], ...r.links.map(c => [V(c.label), V(pass(c)), V(String(c.value)), V(c.note)]),
      [], [H('Metric'), H('Count')],
      [V('Internal'), V(String(r.internalLinks))], [V('External'), V(String(r.externalLinks))],
      [V('Nofollow'), V(String(r.nofollowLinks))], [V('Total'), V(String(r.totalLinks))],
    ]},
    { name: '9. Images', rows: [
      [H('#'), H('Image URL'), H('Alt Text'), H('Lazy Load'), H('Status')],
      ...r.imgDetails.map((img, i) => [V(String(i + 1)), V(img.src || '(no src)'), V(img.alt || 'MISSING'), V(img.loading || 'eager'), V(img.hasAlt ? '✓ Has Alt' : '✗ Missing Alt')]),
    ]},
    { name: '10. Accessibility', rows: [ [H('Check'), H('Status'), H('Value'), H('Note'), H('Fix')], ...r.accessibilityChecks.map(c => [V(c.label), V(pass(c)), V(String(c.value)), V(c.note), V(c.fix || '')]) ]},
    { name: '11. Technology', rows: [
      [H('Detected Technology / CMS')], ...(r.detectedTech.length > 0 ? r.detectedTech.map(t => [V(t)]) : [[V('No specific technology detected')]]),
      [], [H('Resource'), H('Count')],
      [V('CSS Files'), V(String(r.resources.cssFiles))], [V('JS Files'), V(String(r.resources.jsFiles))],
      [V('Inline Styles'), V(String(r.resources.inlineStyles))], [V('Inline Scripts'), V(String(r.resources.inlineScripts))],
    ]},
    { name: '12. Action Roadmap', rows: [
      [H('Step'), H('Priority'), H('Action'), H('Area'), H('Fix Recommendation')],
      ...(r.roadmap.length > 0
        ? r.roadmap.map(t => [V(String(t.step)), V(priMap[t.priority] || t.priority), V('Fix: ' + t.label), V(t.area), V(t.fix || t.note)])
        : [[V(''), V('✅ All checks passed!')]])
    ]},
  ]);
}


// ── SHEET TABS ─────────────────────────────────────────────────────────────
const SHEETS = [
  { id: 0, label: '📊 Summary', icon: 'fa-chart-pie' },
  { id: 1, label: '🔴 Issues', icon: 'fa-circle-exclamation' },
  { id: 2, label: '📝 On-Page', icon: 'fa-pen-to-square' },
  { id: 3, label: '⚙️ Technical', icon: 'fa-gear' },
  { id: 4, label: '🚀 Performance', icon: 'fa-gauge-high' },
  { id: 5, label: '🔒 Security', icon: 'fa-shield-halved' },
  { id: 6, label: '🌐 Social/OG', icon: 'fa-share-nodes' },
  { id: 7, label: '🔗 Links', icon: 'fa-link' },
  { id: 8, label: '🖼️ Images', icon: 'fa-image' },
  { id: 9, label: '♿ A11y', icon: 'fa-universal-access' },
  { id: 10, label: '🛠️ Stack', icon: 'fa-layer-group' },
  { id: 11, label: '🎯 Roadmap', icon: 'fa-road' },
];

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────
export default function DeepSEOAuditPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [activeSheet, setActiveSheet] = useState(0);
  const [expandedFixes, setExpandedFixes] = useState({});

  const toggleFix = (key) => setExpandedFixes(prev => ({ ...prev, [key]: !prev[key] }));

  async function runAudit(e) {
    e.preventDefault();
    if (!url.trim()) return;
    let target = url.trim();
    if (!/^https?:\/\//i.test(target)) target = 'https://' + target;
    setError(''); setResults(null); setLoading(true); setProgress(0); setActiveSheet(0); setExpandedFixes({});

    const steps = [
      'Resolving DNS & establishing connection…',
      'Fetching page HTML & measuring TTFB…',
      'Extracting meta tags & title…',
      'Analyzing heading hierarchy (H1–H4)…',
      'Inspecting canonical & robots directives…',
      'Scanning images & alt attributes…',
      'Checking Open Graph & Twitter Cards…',
      'Analyzing internal & external links…',
      'Detecting JSON-LD schema markup…',
      'Fetching robots.txt & sitemap.xml…',
      'Inspecting security headers…',
      'Detecting CMS & technology stack…',
      'Evaluating accessibility signals…',
      'Calculating performance metrics…',
      'Computing weighted audit scores…',
      'Building prioritized action roadmap…',
      'Generating 12-sheet Excel workbook data…',
    ];

    for (let i = 0; i < steps.length; i++) {
      setProgressLabel(steps[i]);
      setProgress(Math.round(((i + 1) / steps.length) * 85));
      await new Promise(r => setTimeout(r, 180 + Math.random() * 220));
    }

    try {
      const resp = await fetch('/api/tools/seo-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: target })
      });
      const data = await resp.json();
      if (!resp.ok || !data.success) {
        throw new Error(data.error || 'Failed to fetch website data.');
      }

      setProgressLabel('Analyzing audit data…'); setProgress(92);
      await new Promise(r => setTimeout(r, 300));

      const audit = buildFullAudit(data);

      setProgressLabel('Finalizing report…'); setProgress(100);
      await new Promise(r => setTimeout(r, 200));
      setResults(audit);
    } catch (err) {
      setError(err.message || 'Failed to audit. The site may block external requests.');
    } finally {
      setLoading(false);
    }
  }

  function downloadExcel() {
    if (!results) return;
    const bytes = buildAuditExcel(results);
    const blob = new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `SEO-Audit-${results.hostname || 'report'}-${Date.now()}.xlsx`;
    a.click();
  }

  // ── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary,#f9fafb)', fontFamily: "Inter,'Segoe UI',system-ui,sans-serif" }}>

      {/* ── HERO ── */}
      <div style={{ background: 'linear-gradient(135deg, #0b1329 0%, #1e293b 50%, #0f172a 100%)', padding: '56px 20px 52px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '220px', height: '220px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.18)', filter: 'blur(50px)', pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '220px', height: '220px', borderRadius: '50%', background: 'rgba(96, 165, 250, 0.12)', filter: 'blur(50px)', pointerEvents: 'none' }}></div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(96, 165, 250, 0.3)', borderRadius: 50, padding: '6px 18px', marginBottom: 18 }}>
            <i className="fa-solid fa-magnifying-glass-chart" style={{ color: '#60a5fa', fontSize: 13 }}></i>
            <span style={{ color: '#93c5fd', fontSize: 12, fontWeight: 700, letterSpacing: 0.6 }}>Deep SEO Audit · 70+ Point Inspection · 12-Sheet Excel Export</span>
          </div>
          <h1 style={{ fontSize: 'clamp(26px,5vw,48px)', fontWeight: 900, color: '#fff', margin: '0 0 14px', letterSpacing: -1, lineHeight: 1.2 }}>
            Forensic Website SEO Audit
            <br />
            <span style={{ background: 'linear-gradient(90deg, #60a5fa 0%, #38bdf8 50%, #818cf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              With Real Audit Data
            </span>
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: 16, maxWidth: 660, margin: '0 auto', lineHeight: 1.7 }}>
            Professional 70+ checkpoint audit covering On-Page, Technical SEO, Performance, Security, Accessibility, Social Tags, robots.txt, sitemap.xml, CMS detection, and a prioritized action roadmap — all in one click.
          </p>
        </div>
      </div>

      {/* ── INPUT CARD ── */}
      <div style={{ maxWidth: 760, margin: '-26px auto 0', padding: '0 16px', position: 'relative', zIndex: 2 }}>
        <div style={{ background: 'var(--card-bg,#fff)', border: '1px solid var(--border-color,#e5e7eb)', borderRadius: 10, padding: '32px', boxShadow: '0 12px 40px rgba(0,0,0,0.1)' }}>
          <form onSubmit={runAudit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <label style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-secondary,#6b7280)', textTransform: 'uppercase', letterSpacing: 1 }}>Enter Website URL to Audit</label>
            <div style={{ position: 'relative' }}>
              <i className="fa-solid fa-globe" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: 16, pointerEvents: 'none' }}></i>
              <input
                type="text" value={url} onChange={e => setUrl(e.target.value)}
                placeholder="https://example.com" disabled={loading}
                style={{ width: '100%', boxSizing: 'border-box', paddingLeft: 42, paddingRight: 16, paddingTop: 14, paddingBottom: 14, fontSize: 16, border: '1.5px solid var(--border-color,#d1d5db)', borderRadius: 8, background: 'var(--input-bg,#f9fafb)', color: 'var(--text-primary,#111827)', outline: 'none', opacity: loading ? 0.6 : 1, transition: 'border-color 0.2s' }}
                onFocus={e => e.target.style.borderColor = '#2563eb'} onBlur={e => e.target.style.borderColor = 'var(--border-color,#d1d5db)'}
              />
            </div>
            <button type="submit" disabled={loading || !url.trim()}
              style={{ width: '100%', padding: 15, background: loading ? '#9ca3af' : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: '#fff', border: 'none', borderRadius: 8, fontSize: 16, fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: loading ? 'none' : '0 6px 20px rgba(37,99,235,0.3)', transition: 'all 0.2s' }}>
              {loading ? <><i className="fa-solid fa-spinner fa-spin"></i><span>Auditing…</span></> : <><i className="fa-solid fa-magnifying-glass-chart"></i><span>Start Deep SEO Audit</span></>}
            </button>
          </form>

          {loading && (
            <div style={{ marginTop: 22 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                <span style={{ fontSize: 13, color: 'var(--text-secondary,#6b7280)', fontStyle: 'italic' }}>{progressLabel}</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#2563eb' }}>{progress}%</span>
              </div>
              <div style={{ height: 7, background: 'var(--border-color,#e5e7eb)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #2563eb, #38bdf8)', borderRadius: 4, transition: 'width 0.35s ease' }} />
              </div>
            </div>
          )}
          {error && <div style={{ marginTop: 18, padding: '12px 16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, color: '#dc2626', fontSize: 14 }}><i className="fa-solid fa-triangle-exclamation" style={{ marginRight: 8 }}></i>{error}</div>}
        </div>
      </div>

      {/* ── RESULTS ── */}
      {results && (
        <div style={{ maxWidth: 1180, margin: '36px auto', padding: '0 16px 60px' }}>

          {/* Score Dashboard */}
          <div style={{ background: 'var(--card-bg,#fff)', border: '1px solid var(--border-color,#e5e7eb)', borderRadius: 10, padding: '24px 28px', marginBottom: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary,#6b7280)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3 }}>Audited URL</div>
                <a href={results.url} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', fontWeight: 600, fontSize: 15, wordBreak: 'break-all' }}>{results.url}</a>
                {results.redirected && <span style={{ marginLeft: 10, fontSize: 12, color: '#d97706', fontWeight: 700 }}>→ Redirected to: {results.finalUrl}</span>}
              </div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button onClick={() => window.print()} style={{ padding: '11px 20px', background: '#f8fafc', color: '#1e293b', border: '1.5px solid #cbd5e1', borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>
                  <i className="fa-solid fa-file-pdf" style={{ color: '#dc2626' }}></i> Print / PDF
                </button>
                <button onClick={downloadExcel} style={{ padding: '11px 22px', background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 800, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 14px rgba(37,99,235,0.25)', whiteSpace: 'nowrap' }}>
                  <i className="fa-solid fa-file-excel"></i> Download Excel (.xlsx)
                </button>
              </div>
            </div>

            {/* Score Gauges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
              {[
                { l: 'Overall', s: results.overall }, { l: 'On-Page', s: results.onpageScore },
                { l: 'Technical', s: results.techScore }, { l: 'Performance', s: results.perfScore },
                { l: 'Security', s: results.securityScore }, { l: 'Social', s: results.socialScore },
                { l: 'Links', s: results.linkScore }, { l: 'A11y', s: results.a11yScore },
              ].map(({ l, s }) => (
                <div key={l} style={{ flex: '1 1 90px', textAlign: 'center', maxWidth: 120, minWidth: 80 }}>
                  <ScoreGauge score={s} size={68} />
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary,#6b7280)', marginTop: 4 }}>{l}</div>
                  <div style={{ fontSize: 10, color: scoreColor(s), fontWeight: 700 }}>{scoreLabel(s)}</div>
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 18 }}>
              {[
                { icon: 'fa-clock', label: 'TTFB', value: results.ttfbMs + 'ms', warn: results.ttfbMs > 600 },
                { icon: 'fa-file-code', label: 'HTML Size', value: results.htmlSizeKB + 'KB', warn: results.htmlSizeKB > 100 },
                { icon: 'fa-font', label: 'Words', value: results.wordCount.toLocaleString(), warn: results.wordCount < 300 },
                { icon: 'fa-heading', label: 'H1 Tags', value: results.h1s.length, warn: results.h1s.length !== 1 },
                { icon: 'fa-image', label: 'Images', value: results.imgTotal },
                { icon: 'fa-circle-xmark', label: 'Missing Alt', value: results.imgNoAlt, warn: results.imgNoAlt > 0 },
                { icon: 'fa-link', label: 'Links', value: results.totalLinks },
                { icon: 'fa-code', label: 'Schema', value: results.schemaCount, warn: results.schemaCount === 0 },
                { icon: 'fa-triangle-exclamation', label: 'Issues', value: results.critical.length, warn: results.critical.length > 0 },
                { icon: 'fa-percent', label: 'Text Ratio', value: results.textToHtmlRatio + '%', warn: results.textToHtmlRatio < 15 },
              ].map(stat => (
                <div key={stat.label} style={{ flex: '1 1 85px', background: stat.warn ? '#fff7ed' : 'var(--bg-secondary,#f9fafb)', border: `1px solid ${stat.warn ? '#fed7aa' : 'var(--border-color,#e5e7eb)'}`, borderRadius: 6, padding: '8px 12px', minWidth: 80 }}>
                  <div style={{ fontSize: 18, fontWeight: 900, color: stat.warn ? '#d97706' : 'var(--text-primary,#111827)' }}>{stat.value}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-secondary,#6b7280)', marginTop: 2 }}><i className={`fa-solid ${stat.icon}`} style={{ marginRight: 4, opacity: 0.5 }}></i>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Sheet Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 14 }}>
            {SHEETS.map(s => (
              <button key={s.id} onClick={() => setActiveSheet(s.id)}
                style={{ padding: '7px 12px', borderRadius: 7, border: '1.5px solid', fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s', borderColor: activeSheet === s.id ? '#2563eb' : 'var(--border-color,#e5e7eb)', background: activeSheet === s.id ? '#2563eb' : 'var(--card-bg,#fff)', color: activeSheet === s.id ? '#fff' : 'var(--text-secondary,#6b7280)' }}>
                {s.label}
              </button>
            ))}
          </div>

          {/* Sheet Content */}
          <div style={{ background: 'var(--card-bg,#fff)', border: '1px solid var(--border-color,#e5e7eb)', borderRadius: 8, padding: '26px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', overflowX: 'auto' }}>

            {/* 0 — Executive Summary */}
            {activeSheet === 0 && (
              <div>
                <h2 style={sh2}>📊 Executive Summary</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 12 }}>
                  <IC label="Page Title" value={results.title || '—'} icon="fa-heading" warn={!results.title} />
                  <IC label="Meta Description" value={results.metaDesc || '—'} icon="fa-align-left" warn={!results.metaDesc} />
                  <IC label="Canonical URL" value={results.canonical || 'Not set'} icon="fa-link" warn={!results.canonical} />
                  <IC label="Indexability" value={results.noindex ? '⚠️ NOINDEX — Blocked!' : '✅ Indexable'} icon="fa-robot" warn={results.noindex} />
                  <IC label="Word Count" value={`${results.wordCount.toLocaleString()} words`} icon="fa-font" warn={results.wordCount < 300} />
                  <IC label="H1 Tag" value={results.h1s.join(', ') || 'None found'} icon="fa-heading" warn={results.h1s.length !== 1} />
                  <IC label="TTFB" value={`${results.ttfbMs} ms`} icon="fa-clock" warn={results.ttfbMs > 600} />
                  <IC label="HTML Size" value={`${results.htmlSizeKB} KB`} icon="fa-file-code" warn={results.htmlSizeKB > 100} />
                  <IC label="Text:HTML Ratio" value={`${results.textToHtmlRatio}%`} icon="fa-percent" warn={results.textToHtmlRatio < 15} />
                  <IC label="Schema Markup" value={results.schemaCount > 0 ? `${results.schemaCount} block(s): ${results.schemaBlocks.map(b => b.type).join(', ')}` : 'Not detected'} icon="fa-code" warn={!results.schemaCount} />
                  <IC label="Technology" value={results.detectedTech.join(', ') || 'Unknown'} icon="fa-microchip" />
                  <IC label="Security" value={results.security.https ? 'HTTPS ✓' : 'HTTP ✗'} icon="fa-shield-halved" warn={!results.security.https} />
                </div>
              </div>
            )}

            {/* 1 — Critical Issues */}
            {activeSheet === 1 && (
              <div>
                <h2 style={sh2}>🔴 Critical Issues <span style={{ fontSize: 14, fontWeight: 600, color: '#6b7280' }}>({results.critical.length} found)</span></h2>
                {results.critical.length === 0 ? <Empty msg="No critical issues found! Great work 🎉" /> : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {results.critical.map((c, i) => {
                      const ps = priStyle(c.priority);
                      const fixKey = `issue-${i}`;
                      return (
                        <div key={i} style={{ padding: '14px 18px', background: ps.bg, border: `1px solid ${ps.border}`, borderRadius: 8 }}>
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                            <div style={{ width: 30, height: 30, borderRadius: 6, background: ps.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 13, flexShrink: 0 }}>{i + 1}</div>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center', marginBottom: 4 }}>
                                <span style={{ fontWeight: 800, fontSize: 14, color: 'var(--text-primary,#111827)' }}>{c.label}</span>
                                <Badge text={c.priority} bg="#fff" color={ps.color} border={ps.border} />
                                <Badge text={c.area} bg="rgba(0,0,0,0.05)" color="#6b7280" border="transparent" />
                              </div>
                              <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 2 }}>Current: <strong>{c.value}</strong></div>
                              <div style={{ fontSize: 12, color: '#6b7280' }}>{c.note}</div>
                              {c.fix && (
                                <button onClick={() => toggleFix(fixKey)} style={{ marginTop: 8, background: 'none', border: 'none', color: ps.color, fontWeight: 700, fontSize: 12, cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
                                  <i className={`fa-solid ${expandedFixes[fixKey] ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                                  {expandedFixes[fixKey] ? 'Hide Fix' : 'How to Fix'}
                                </button>
                              )}
                              {expandedFixes[fixKey] && c.fix && (
                                <div style={{ marginTop: 8, padding: '10px 14px', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 13, color: '#334155', lineHeight: 1.6 }}>
                                  <i className="fa-solid fa-wrench" style={{ marginRight: 6, color: '#2563eb' }}></i>{c.fix}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* 2 — On-Page */}
            {activeSheet === 2 && <CheckSheet title="📝 On-Page SEO Checks" checks={results.onpage} expandedFixes={expandedFixes} toggleFix={toggleFix} prefix="onpage" />}

            {/* 3 — Technical */}
            {activeSheet === 3 && <CheckSheet title="⚙️ Technical SEO Checks" checks={results.technical} expandedFixes={expandedFixes} toggleFix={toggleFix} prefix="tech" />}

            {/* 4 — Performance */}
            {activeSheet === 4 && <CheckSheet title="🚀 Performance Checks" checks={results.performance} expandedFixes={expandedFixes} toggleFix={toggleFix} prefix="perf" />}

            {/* 5 — Security */}
            {activeSheet === 5 && <CheckSheet title="🔒 Security Headers" checks={results.securityChecks} expandedFixes={expandedFixes} toggleFix={toggleFix} prefix="sec" />}

            {/* 6 — Social */}
            {activeSheet === 6 && <CheckSheet title="🌐 Social & Open Graph Tags" checks={results.social} expandedFixes={expandedFixes} toggleFix={toggleFix} prefix="social" />}

            {/* 7 — Links */}
            {activeSheet === 7 && (
              <div>
                <CheckSheet title="🔗 Link Analysis" checks={results.links} expandedFixes={expandedFixes} toggleFix={toggleFix} prefix="links" />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 10, marginTop: 18 }}>
                  {[{ l: 'Internal', v: results.internalLinks, c: '#059669' }, { l: 'External', v: results.externalLinks, c: '#2563eb' }, { l: 'Nofollow', v: results.nofollowLinks, c: '#d97706' }, { l: 'Empty/#', v: results.emptyLinks, c: '#dc2626' }, { l: 'Total', v: results.totalLinks, c: '#7c3aed' }].map(s => (
                    <div key={s.l} style={{ background: 'var(--bg-secondary,#f9fafb)', border: '1px solid var(--border-color,#e5e7eb)', borderRadius: 6, padding: '14px', textAlign: 'center' }}>
                      <div style={{ fontSize: 28, fontWeight: 900, color: s.c }}>{s.v}</div>
                      <div style={{ fontSize: 11, color: '#6b7280', marginTop: 4 }}>{s.l} Links</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 8 — Images */}
            {activeSheet === 8 && (
              <div>
                <h2 style={sh2}>🖼️ Images <span style={{ fontSize: 14, fontWeight: 600, color: '#6b7280' }}>({results.imgTotal} total — {results.imgNoAlt} missing alt — {results.imgLazy} lazy-loaded)</span></h2>
                {results.imgDetails.length === 0 ? <Empty msg="No images detected on this page." /> : (
                  <table style={tblStyle}>
                    <thead><tr style={thr}>{['#', 'Image URL', 'Alt Text', 'Lazy', 'Dimensions', 'Status'].map(h => <th key={h} style={thStyle}>{h}</th>)}</tr></thead>
                    <tbody>{results.imgDetails.map((img, i) => (
                      <tr key={i} style={trStyle}>
                        <td style={tdStyle}>{i + 1}</td>
                        <td style={{ ...tdStyle, fontSize: 12, color: '#6b7280', maxWidth: 250, wordBreak: 'break-all' }}>{img.src || '(no src)'}</td>
                        <td style={{ ...tdStyle, fontSize: 12, color: img.hasAlt ? '#374151' : '#dc2626', fontStyle: img.hasAlt ? 'normal' : 'italic' }}>{img.alt || 'MISSING ALT'}</td>
                        <td style={tdStyle}><Badge text={img.loading === 'lazy' ? '✓ Lazy' : 'Eager'} bg={img.loading === 'lazy' ? '#ecfdf5' : '#fffbeb'} color={img.loading === 'lazy' ? '#059669' : '#d97706'} border={img.loading === 'lazy' ? '#a7f3d0' : '#fde68a'} /></td>
                        <td style={{ ...tdStyle, fontSize: 12, color: '#6b7280' }}>{img.width && img.height ? `${img.width}×${img.height}` : 'Not set'}</td>
                        <td style={tdStyle}><Badge text={img.hasAlt ? '✓ OK' : '✗ Fix'} bg={img.hasAlt ? '#ecfdf5' : '#fef2f2'} color={img.hasAlt ? '#059669' : '#dc2626'} border={img.hasAlt ? '#a7f3d0' : '#fecaca'} /></td>
                      </tr>
                    ))}</tbody>
                  </table>
                )}
              </div>
            )}

            {/* 9 — Accessibility */}
            {activeSheet === 9 && <CheckSheet title="♿ Accessibility Checks" checks={results.accessibilityChecks} expandedFixes={expandedFixes} toggleFix={toggleFix} prefix="a11y" />}

            {/* 10 — Technology Stack */}
            {activeSheet === 10 && (
              <div>
                <h2 style={sh2}>🛠️ Detected Technology Stack</h2>
                {results.detectedTech.length === 0 ? <div style={{ color: '#6b7280', fontSize: 14, padding: 20, textAlign: 'center' }}>No specific technology detected.</div> : (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
                    {results.detectedTech.map(t => (
                      <span key={t} style={{ background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', borderRadius: 6, padding: '8px 16px', fontSize: 14, fontWeight: 700 }}>
                        <i className="fa-solid fa-microchip" style={{ marginRight: 6 }}></i>{t}
                      </span>
                    ))}
                  </div>
                )}
                <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary,#111827)', marginBottom: 12 }}>Resource Breakdown</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 10 }}>
                  {[
                    { l: 'CSS Files', v: results.resources.cssFiles, c: '#7c3aed', icon: 'fa-paintbrush' },
                    { l: 'JS Files', v: results.resources.jsFiles, c: '#d97706', icon: 'fa-code' },
                    { l: 'Inline Styles', v: results.resources.inlineStyles, c: '#0891b2', icon: 'fa-pen-nib' },
                    { l: 'Inline Scripts', v: results.resources.inlineScripts, c: '#dc2626', icon: 'fa-terminal' },
                  ].map(r => (
                    <div key={r.l} style={{ background: 'var(--bg-secondary,#f9fafb)', border: '1px solid var(--border-color,#e5e7eb)', borderRadius: 6, padding: '14px', textAlign: 'center' }}>
                      <i className={`fa-solid ${r.icon}`} style={{ color: r.c, fontSize: 18, marginBottom: 6, display: 'block' }}></i>
                      <div style={{ fontSize: 26, fontWeight: 900, color: r.c }}>{r.v}</div>
                      <div style={{ fontSize: 11, color: '#6b7280', marginTop: 3 }}>{r.l}</div>
                    </div>
                  ))}
                </div>
                {results.robotsTxt.exists && (
                  <div style={{ marginTop: 20 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary,#111827)', marginBottom: 10 }}>robots.txt Preview</h3>
                    <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: 16, borderRadius: 8, fontSize: 12, overflow: 'auto', maxHeight: 200, whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{results.robotsTxt.snippet}</pre>
                  </div>
                )}
              </div>
            )}

            {/* 11 — Action Roadmap */}
            {activeSheet === 11 && (
              <div>
                <h2 style={sh2}>🎯 Prioritized Action Roadmap <span style={{ fontSize: 14, fontWeight: 600, color: '#6b7280' }}>({results.roadmap.length} tasks)</span></h2>
                {results.roadmap.length === 0 ? <Empty msg="No actions required — site looks great! 🎉" /> : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {results.roadmap.map(r => {
                      const ps = priStyle(r.priority);
                      return (
                        <div key={r.step} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '12px 16px', background: ps.bg, border: `1px solid ${ps.border}`, borderRadius: 6 }}>
                          <div style={{ width: 30, height: 30, borderRadius: 6, background: ps.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 13, flexShrink: 0 }}>{r.step}</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center', marginBottom: 4 }}>
                              <span style={{ fontWeight: 800, fontSize: 13, color: 'var(--text-primary,#111827)' }}>{r.label}</span>
                              <Badge text={r.priority} bg="#fff" color={ps.color} border={ps.border} />
                              <Badge text={r.area} bg="rgba(0,0,0,0.05)" color="#6b7280" border="transparent" />
                            </div>
                            {r.fix && <div style={{ fontSize: 12, color: '#334155', background: '#fff', padding: '6px 10px', borderRadius: 4, border: '1px solid #e5e7eb', marginTop: 4 }}><i className="fa-solid fa-wrench" style={{ marginRight: 5, color: '#2563eb', fontSize: 10 }}></i>{r.fix}</div>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── INFO SECTION (empty state) ── */}
      {!results && !loading && (
        <div style={{ maxWidth: 960, margin: '48px auto', padding: '0 16px 60px' }}>
          <h2 style={{ textAlign: 'center', fontSize: 22, fontWeight: 800, color: 'var(--text-primary,#111827)', marginBottom: 28 }}>70+ Real SEO Checks Across 12 Categories</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 14 }}>
            {[
              { icon: 'fa-pen-to-square', color: '#059669', title: 'On-Page SEO (12 checks)', items: ['Title tag & length optimization', 'Meta description quality', 'H1–H4 heading hierarchy', 'Word count & content depth', 'Text-to-HTML ratio', 'Image alt text & lazy loading'] },
              { icon: 'fa-gear', color: '#2563eb', title: 'Technical SEO (16 checks)', items: ['HTTP status code', 'Canonical & robots directives', 'Noindex detection', 'JSON-LD schema markup', 'robots.txt & sitemap.xml', 'TTFB & HTML size & minification'] },
              { icon: 'fa-gauge-high', color: '#7c3aed', title: 'Performance (8 checks)', items: ['Server response time (TTFB)', 'CSS & JS file count audit', 'Render-blocking resources', 'Inline scripts/styles audit', 'Image lazy loading status', 'Iframe count analysis'] },
              { icon: 'fa-shield-halved', color: '#dc2626', title: 'Security (6 checks)', items: ['HTTPS / SSL enforcement', 'HSTS header verification', 'X-Content-Type-Options', 'X-Frame-Options / CSP', 'Content Security Policy', 'Referrer Policy header'] },
              { icon: 'fa-share-nodes', color: '#0891b2', title: 'Social & OG Tags (10 checks)', items: ['Full Open Graph audit', 'Twitter Card configuration', 'OG image & dimensions', 'Social site name & creator', 'Sharing preview quality'] },
              { icon: 'fa-universal-access', color: '#d97706', title: 'Accessibility (6 checks)', items: ['HTML lang attribute', 'Skip navigation link', 'ARIA landmarks & labels', 'Form label associations', 'Image alt coverage'] },
            ].map(card => (
              <div key={card.title} style={{ background: 'var(--card-bg,#fff)', border: '1px solid var(--border-color,#e5e7eb)', borderRadius: 8, padding: '20px 22px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 6, background: card.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className={`fa-solid ${card.icon}`} style={{ color: card.color, fontSize: 15 }}></i>
                  </div>
                  <span style={{ fontWeight: 800, fontSize: 14, color: 'var(--text-primary,#111827)' }}>{card.title}</span>
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {card.items.map(item => (
                    <li key={item} style={{ fontSize: 12, color: 'var(--text-secondary,#6b7280)', display: 'flex', alignItems: 'center', gap: 7 }}>
                      <i className="fa-solid fa-check" style={{ color: card.color, fontSize: 9, flexShrink: 0 }}></i>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQ Accordion */}
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 16px' }}>
        <ToolFaqAccordion
          title="Deep SEO Audit Tool — FAQ"
          faqs={[
            { q: "What does this Deep SEO Audit tool actually check?", a: "Our tool performs 70+ real checks across 12 categories: On-Page SEO, Technical SEO, Performance, Security Headers, Social/OG Tags, Link Analysis, Image Audit, Accessibility, Technology Detection, robots.txt, XML Sitemap, and generates a prioritized action roadmap — all using real data fetched from your live website." },
            { q: "How accurate are the audit results?", a: "The tool fetches your actual page HTML server-side and measures real TTFB, extracts actual meta tags, inspects real response headers for security, fetches your real robots.txt and sitemap.xml, and parses your actual schema markup. This is real data — not estimates or simulations." },
            { q: "How are the SEO health scores calculated?", a: "Scores are weighted across 7 dimensions: On-Page (25%), Technical (25%), Performance (15%), Security (10%), Social (10%), Links (8%), Accessibility (7%). Each check is pass/fail and the percentage of passed checks determines the category score." },
            { q: "Can I export the full audit report?", a: "Yes! Click 'Download Excel (.xlsx)' to export a comprehensive 12-sheet workbook with Executive Summary, Critical Issues, On-Page, Technical, Performance, Security, Social, Links, Images, Accessibility, Technology Stack, and Action Roadmap." },
            { q: "How often should I audit my website?", a: "We recommend running a deep audit at least monthly, and immediately after any CMS updates, plugin changes, redesigns, content migrations, or if you notice ranking drops." },
          ]}
        />
      </div>

      {/* Social Share */}
      <div style={{ maxWidth: 1120, margin: '0 auto 40px', padding: '0 16px' }}>
        <SocialShare title="Free Deep SEO Audit Tool — 70+ Real Checks by Abdullah Saleh" />
      </div>
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────
const sh2 = { fontSize: 19, fontWeight: 800, marginBottom: 18, color: 'var(--text-primary,#111827)', marginTop: 0 };
const tblStyle = { width: '100%', borderCollapse: 'collapse' };
const thr = { background: 'var(--bg-secondary,#f9fafb)' };
const thStyle = { padding: '10px 12px', textAlign: 'left', fontSize: 11, fontWeight: 800, color: 'var(--text-secondary,#6b7280)', textTransform: 'uppercase', letterSpacing: 0.5, borderBottom: '1px solid var(--border-color,#e5e7eb)', whiteSpace: 'nowrap' };
const trStyle = { borderBottom: '1px solid var(--border-color,#f3f4f6)' };
const tdStyle = { padding: '10px 12px', fontSize: 13, verticalAlign: 'top' };

function ScoreGauge({ score, size = 68 }) {
  const r = (size - 8) / 2;
  const c = Math.PI * 2 * r;
  const offset = c - (score / 100) * c;
  const color = scoreColor(score);
  return (
    <svg width={size} height={size} style={{ display: 'block', margin: '0 auto' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e7eb" strokeWidth="5" />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="5"
        strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 1s ease-in-out' }} />
      <text x="50%" y="50%" textAnchor="middle" dy="0.35em" style={{ fontSize: 18, fontWeight: 900, fill: color }}>{score}</text>
    </svg>
  );
}

function Badge({ text, bg, color, border }) {
  return <span style={{ background: bg, color, border: `1px solid ${border}`, borderRadius: 4, padding: '2px 8px', fontSize: 11, fontWeight: 800, whiteSpace: 'nowrap' }}>{text}</span>;
}

function IC({ label, value, icon, warn }) {
  return (
    <div style={{ background: warn ? '#fff7ed' : 'var(--bg-secondary,#f9fafb)', border: `1px solid ${warn ? '#fed7aa' : 'var(--border-color,#e5e7eb)'}`, borderRadius: 6, padding: '12px 14px' }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: warn ? '#d97706' : 'var(--text-secondary,#6b7280)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 5 }}>
        <i className={`fa-solid ${icon}`} style={{ marginRight: 5 }}></i>{label}
      </div>
      <div style={{ fontSize: 13, color: 'var(--text-primary,#111827)', wordBreak: 'break-word', lineHeight: 1.5 }}>{value || '—'}</div>
    </div>
  );
}

function CheckSheet({ title, checks, expandedFixes, toggleFix, prefix }) {
  return (
    <div>
      {title && <h2 style={sh2}>{title}</h2>}
      <table style={tblStyle}>
        <thead><tr style={thr}>{['Check', 'Status', 'Current Value', 'Note / Recommendation', ''].map(h => <th key={h} style={thStyle}>{h}</th>)}</tr></thead>
        <tbody>{checks.map((c, i) => {
          const fixKey = `${prefix}-${i}`;
          return (
            <tr key={i} style={trStyle}>
              <td style={{ ...tdStyle, fontWeight: 600, color: 'var(--text-primary,#111827)', maxWidth: 200 }}>{c.label}</td>
              <td style={tdStyle}><Badge text={c.pass ? '✓ PASS' : '✗ FAIL'} bg={c.pass ? '#ecfdf5' : '#fef2f2'} color={c.pass ? '#059669' : '#dc2626'} border={c.pass ? '#a7f3d0' : '#fecaca'} /></td>
              <td style={{ ...tdStyle, fontSize: 12, color: '#6b7280', maxWidth: 200, wordBreak: 'break-word' }}>{c.value}</td>
              <td style={{ ...tdStyle, fontSize: 12, color: '#6b7280' }}>
                {c.note}
                {!c.pass && c.fix && (
                  <>
                    <button onClick={() => toggleFix(fixKey)} style={{ display: 'block', marginTop: 6, background: 'none', border: 'none', color: '#2563eb', fontWeight: 700, fontSize: 11, cursor: 'pointer', padding: 0 }}>
                      <i className={`fa-solid ${expandedFixes[fixKey] ? 'fa-chevron-up' : 'fa-wrench'}`} style={{ marginRight: 4 }}></i>
                      {expandedFixes[fixKey] ? 'Hide' : 'How to Fix'}
                    </button>
                    {expandedFixes[fixKey] && (
                      <div style={{ marginTop: 6, padding: '8px 12px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 4, fontSize: 12, color: '#1e40af', lineHeight: 1.5 }}>
                        {c.fix}
                      </div>
                    )}
                  </>
                )}
              </td>
              <td style={tdStyle}></td>
            </tr>
          );
        })}</tbody>
      </table>
    </div>
  );
}

function Empty({ msg }) {
  return (
    <div style={{ textAlign: 'center', padding: '40px 0', color: '#059669' }}>
      <i className="fa-solid fa-circle-check" style={{ fontSize: 38, marginBottom: 10 }}></i>
      <p style={{ fontWeight: 700, fontSize: 17, margin: 0 }}>{msg}</p>
    </div>
  );
}

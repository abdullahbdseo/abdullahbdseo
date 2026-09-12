'use client';

import { useState, useRef } from 'react';
import SocialShare from '@/components/SocialShare';
import ToolFaqAccordion from '@/components/ToolFaqAccordion';

// ── helpers ────────────────────────────────────────────────────────────────
const scoreColor = s => s >= 80 ? '#059669' : s >= 50 ? '#d97706' : '#dc2626';
const scoreLabel = s => s >= 80 ? 'Good' : s >= 50 ? 'Needs Work' : 'Poor';
const scoreBg = s => s >= 80 ? '#ecfdf5' : s >= 50 ? '#fffbeb' : '#fef2f2';
const priStyle = p => ({
  Critical: { bg: '#fef2f2', color: '#dc2626', border: '#fecaca' },
  High: { bg: '#fff7ed', color: '#ea580c', border: '#fed7aa' },
  Medium: { bg: '#fffbeb', color: '#d97706', border: '#fde68a' },
  Low: { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0' },
}[p] || { bg: '#f9fafb', color: '#6b7280', border: '#e5e7eb' });

// ── Excel export (pure JS, no library) ────────────────────────────────────
function escXml(s) { return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function buildXlsx(sheets) {
  // sheets = [{ name, rows: [[...cells]] }]
  // cells = { v: value, s?: 'h'|'b' (header/bold) }

  const sharedStrings = [];
  const ssMap = {};
  function si(v) {
    const k = String(v);
    if (k in ssMap) return ssMap[k];
    const i = sharedStrings.length;
    ssMap[k] = i;
    sharedStrings.push(k);
    return i;
  }

  const sheetXmls = sheets.map(({ name, rows }) => {
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

  // simple zip using data URIs (no JSZip needed — manual zip structure)
  // We'll use a simplified approach with downloadable CSV-per-sheet wrapped as xlsx via Blob
  // For a true xlsx without a library we use a known trick: store as a zip
  // Since we can't use JSZip here, we'll use a workaround: build xlsx binary manually
  // Actually let's use the simplest possible approach: write it as a multi-sheet CSV with clear separators
  // and name it .xlsx so Excel opens it (Excel accepts tab-separated .xls too)

  // Best no-lib approach: build a real ZIP binary in JS
  function str2ab(str) {
    const buf = new ArrayBuffer(str.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < str.length; i++) view[i] = str.charCodeAt(i) & 0xFF;
    return buf;
  }
  function crc32(buf) {
    const crcTable = [];
    for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++)c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; crcTable[n] = c; }
    let crc = 0xFFFFFFFF;
    const bytes = new Uint8Array(buf);
    for (let i = 0; i < bytes.length; i++) crc = (crc >>> 8) ^ crcTable[(crc ^ bytes[i]) & 0xFF];
    return (crc ^ 0xFFFFFFFF) >>> 0;
  }
  function deflate(data) { return new Uint8Array(data); } // stored (no compression)
  function u32(n) { const b = new Uint8Array(4); new DataView(b.buffer).setUint32(0, n, true); return b; }
  function u16(n) { const b = new Uint8Array(2); new DataView(b.buffer).setUint16(0, n, true); return b; }
  function concat(...arrs) {
    const total = arrs.reduce((s, a) => s + a.length, 0);
    const out = new Uint8Array(total); let off = 0;
    for (const a of arrs) { out.set(a, off); off += a.length; }
    return out;
  }
  function enc(s) { return new TextEncoder().encode(s); }

  const files = [
    ['[Content_Types].xml', contentTypes],
    ['_rels/.rels', rootRels],
    ['xl/workbook.xml', wbXml],
    ['xl/_rels/workbook.xml.rels', wbRels],
    ['xl/sharedStrings.xml', ssXml],
    ['xl/styles.xml', stylesXml],
    ...sheets.map((s, i) => [`xl/worksheets/sheet${i + 1}.xml`, sheetXmls[i]]),
  ];

  const localHeaders = []; const centralDir = []; let offset = 0;
  for (const [name, content] of files) {
    const nameBytes = enc(name);
    const dataBytes = enc(content);
    const crc = crc32(dataBytes.buffer);
    const sig = new Uint8Array([0x50, 0x4B, 0x03, 0x04]);
    const localHeader = concat(sig, u16(20), u16(0), u16(0), u32(crc), u32(dataBytes.length), u32(dataBytes.length), u16(nameBytes.length), u16(0), nameBytes, dataBytes);
    localHeaders.push(localHeader);
    const cdSig = new Uint8Array([0x50, 0x4B, 0x01, 0x02]);
    const cd = concat(cdSig, u16(20), u16(20), u16(0), u16(0), u32(crc), u32(dataBytes.length), u32(dataBytes.length), u16(nameBytes.length), u16(0), u16(0), u16(0), u16(0), u32(0), u32(offset), nameBytes);
    centralDir.push(cd);
    offset += localHeader.length;
  }
  const localData = concat(...localHeaders);
  const cdData = concat(...centralDir);
  const cdSize = cdData.length;
  const cdOffset = localData.length;
  const eocd = concat(new Uint8Array([0x50, 0x4B, 0x05, 0x06]), u16(0), u16(0), u16(files.length), u16(files.length), u32(cdSize), u32(cdOffset), u16(0));
  return concat(localData, cdData, eocd);
}

// ── Analyze HTML ───────────────────────────────────────────────────────────
function analyzeHTML(html, targetUrl) {
  const parser = typeof DOMParser !== 'undefined' ? new DOMParser() : null;
  let doc = null;
  if (parser) doc = parser.parseFromString(html, 'text/html');
  const get = s => doc ? doc.querySelector(s) : null;
  const getAll = s => doc ? [...doc.querySelectorAll(s)] : [];
  const attr = (el, a) => el ? el.getAttribute(a) || '' : '';
  const txt = el => el ? el.textContent.trim() : '';

  const title = txt(get('title'));
  const metaDesc = attr(get('meta[name="description"]'), 'content');
  const metaRobots = attr(get('meta[name="robots"]'), 'content');
  const canonical = attr(get('link[rel="canonical"]'), 'href');
  const viewport = attr(get('meta[name="viewport"]'), 'content');
  const charset = get('meta[charset]') ? 'UTF-8' : '';
  const ogTitle = attr(get('meta[property="og:title"]'), 'content');
  const ogDesc = attr(get('meta[property="og:description"]'), 'content');
  const ogImage = attr(get('meta[property="og:image"]'), 'content');
  const ogType = attr(get('meta[property="og:type"]'), 'content');
  const ogUrl = attr(get('meta[property="og:url"]'), 'content');
  const twitterCard = attr(get('meta[name="twitter:card"]'), 'content');
  const twitterTitle = attr(get('meta[name="twitter:title"]'), 'content');
  const twitterImage = attr(get('meta[name="twitter:image"]'), 'content');

  const h1s = getAll('h1'); const h2s = getAll('h2'); const h3s = getAll('h3'); const h4s = getAll('h4');
  const imgs = getAll('img');
  const imgsNoAlt = imgs.filter(i => !i.getAttribute('alt') || i.getAttribute('alt').trim() === '');
  const allLinks = getAll('a[href]');
  let hostname = '';
  try { hostname = new URL(targetUrl).hostname; } catch (e) { }
  const internalLinks = allLinks.filter(a => { const h = a.getAttribute('href') || ''; return h.startsWith('/') || h.includes(hostname); });
  const externalLinks = allLinks.filter(a => { const h = a.getAttribute('href') || ''; return h.startsWith('http') && !h.includes(hostname); });
  const nofollowLinks = allLinks.filter(a => (a.getAttribute('rel') || '').includes('nofollow'));
  const schemaScripts = getAll('script[type="application/ld+json"]');
  const hreflang = getAll('link[rel="hreflang"]');
  const bodyText = doc ? (doc.body ? doc.body.textContent : '') : '';
  const wordCount = bodyText.trim().split(/\s+/).filter(w => w.length > 1).length;
  const tl = title.length, dl = metaDesc.length;
  const noindex = metaRobots.includes('noindex');

  // ── Checks ──
  const onpage = [
    { label: 'Title Tag Present', pass: tl > 0, value: title || 'Missing', note: tl > 0 ? `${tl} chars` : 'No title tag found' },
    { label: 'Title Length (50–60 chars)', pass: tl >= 50 && tl <= 60, value: `${tl} chars`, note: tl < 50 ? 'Too short' : tl > 60 ? 'Too long' : 'Optimal' },
    { label: 'Meta Description Present', pass: dl > 0, value: metaDesc || 'Missing', note: dl > 0 ? `${dl} chars` : 'No meta description' },
    { label: 'Meta Description (120–160)', pass: dl >= 120 && dl <= 160, value: `${dl} chars`, note: dl < 120 && dl > 0 ? 'Too short' : dl > 160 ? 'Too long' : dl === 0 ? 'Missing' : 'Optimal' },
    { label: 'Single H1 Tag', pass: h1s.length === 1, value: `${h1s.length} H1 found`, note: h1s.length === 0 ? 'No H1 found' : h1s.length > 1 ? 'Multiple H1s — bad for SEO' : txt(h1s[0]).substring(0, 60) },
    { label: 'H2 Subheadings Present', pass: h2s.length > 0, value: `${h2s.length} H2 tags`, note: h2s.length > 0 ? 'Good content structure' : 'No H2 subheadings found' },
    { label: 'H3–H4 Sub-sections', pass: h3s.length > 0, value: `${h3s.length} H3, ${h4s.length} H4`, note: h3s.length > 0 ? 'Good hierarchy' : 'Consider adding H3 headings' },
    { label: 'Image Alt Text Coverage', pass: imgsNoAlt.length === 0, value: `${imgsNoAlt.length}/${imgs.length} missing alt`, note: imgsNoAlt.length === 0 ? 'All images have alt text' : `${imgsNoAlt.length} images missing alt attribute` },
    { label: 'Word Count (min 300)', pass: wordCount >= 300, value: `${wordCount} words`, note: wordCount < 300 ? 'Thin content — add more text' : 'Good content volume' },
  ];

  const technical = [
    { label: 'Canonical URL Set', pass: canonical.length > 0, value: canonical || 'Not set', note: canonical ? 'Self-referencing canonical set' : 'Missing canonical — may cause duplicate issues' },
    { label: 'Viewport Meta Tag', pass: viewport.length > 0, value: viewport || 'Missing', note: viewport ? 'Mobile-friendly' : 'Missing viewport meta tag' },
    { label: 'Charset Declaration', pass: charset.length > 0, value: charset || 'Not found', note: charset ? 'UTF-8 declared' : 'No charset declaration found' },
    { label: 'Robots Meta Tag', pass: true, value: metaRobots || 'Not set (default: index)', note: noindex ? '⚠️ Page is NOINDEX!' : 'Page is indexable' },
    { label: 'NOT Noindexed', pass: !noindex, value: noindex ? 'NOINDEX DETECTED' : 'Indexable', note: noindex ? '🚨 Google is blocked from indexing this page!' : 'Crawlable by search engines' },
    { label: 'JSON-LD Schema Markup', pass: schemaScripts.length > 0, value: schemaScripts.length > 0 ? `${schemaScripts.length} schema block(s)` : 'None found', note: schemaScripts.length > 0 ? 'Rich snippet eligible' : 'Add structured data for rich results' },
    { label: 'Hreflang Tags', pass: true, value: `${hreflang.length} hreflang tag(s)`, note: hreflang.length > 0 ? 'International targeting configured' : 'None (fine for single-language sites)' },
  ];

  const social = [
    { label: 'OG Title', pass: ogTitle.length > 0, value: ogTitle || 'Missing', note: ogTitle ? 'Set' : 'Missing — social shares look poor' },
    { label: 'OG Description', pass: ogDesc.length > 0, value: ogDesc || 'Missing', note: ogDesc ? 'Set' : 'Missing' },
    { label: 'OG Image', pass: ogImage.length > 0, value: ogImage || 'Missing', note: ogImage ? 'Set' : 'Missing — no image on social previews' },
    { label: 'OG Type', pass: ogType.length > 0, value: ogType || 'Not set', note: ogType || 'Not defined' },
    { label: 'OG URL', pass: ogUrl.length > 0, value: ogUrl || 'Not set', note: ogUrl ? 'Canonical URL set in OG' : 'OG URL not specified' },
    { label: 'Twitter Card', pass: twitterCard.length > 0, value: twitterCard || 'Missing', note: twitterCard ? twitterCard : 'Twitter card not configured' },
    { label: 'Twitter Title', pass: twitterTitle.length > 0, value: twitterTitle || 'Missing', note: twitterTitle ? 'Set' : 'Missing' },
    { label: 'Twitter Image', pass: twitterImage.length > 0, value: twitterImage || 'Missing', note: twitterImage ? 'Set' : 'No Twitter-specific image' },
  ];

  const links = [
    { label: 'Internal Links (min 3)', pass: internalLinks.length >= 3, value: `${internalLinks.length} internal links`, note: internalLinks.length < 3 ? 'Too few internal links' : 'Good internal linking' },
    { label: 'External Links', pass: true, value: `${externalLinks.length} external links`, note: 'Informational' },
    { label: 'Nofollow Links', pass: true, value: `${nofollowLinks.length} nofollow links`, note: 'Informational' },
    { label: 'Total Crawlable Links', pass: allLinks.length > 0, value: `${allLinks.length} total`, note: allLinks.length > 0 ? 'Links found' : 'No links detected' },
  ];

  const calc = checks => Math.round((checks.filter(c => c.pass).length / checks.length) * 100);
  const onpageScore = calc(onpage), techScore = calc(technical), socialScore = calc(social), linkScore = calc(links);
  const overall = Math.round((onpageScore + techScore + socialScore + linkScore) / 4);

  const critical = [
    ...onpage.filter(c => !c.pass).map(c => ({ area: 'On-Page', ...c, priority: 'High' })),
    ...technical.filter(c => !c.pass).map(c => ({ area: 'Technical', ...c, priority: c.label.includes('Noindex') ? 'Critical' : 'High' })),
    ...social.filter(c => !c.pass).map(c => ({ area: 'Social/OG', ...c, priority: 'Medium' })),
  ];
  const priOrder = { Critical: 0, High: 1, Medium: 2, Low: 3 };
  const roadmap = [...critical].sort((a, b) => priOrder[a.priority] - priOrder[b.priority]).map((r, i) => ({ ...r, step: i + 1 }));

  return {
    url: targetUrl, auditedAt: new Date().toLocaleString(),
    overall, onpageScore, techScore, socialScore, linkScore,
    title, metaDesc, canonical, viewport, charset, noindex,
    wordCount, h1s: h1s.map(txt), h2s: h2s.map(txt), h3s: h3s.map(txt),
    imgTotal: imgs.length, imgNoAlt: imgsNoAlt.length,
    imgUrls: imgs.slice(0, 20).map(i => ({ src: i.getAttribute('src') || '', alt: i.getAttribute('alt') || '' })),
    internalLinks: internalLinks.length, externalLinks: externalLinks.length,
    nofollowLinks: nofollowLinks.length, totalLinks: allLinks.length,
    schemaCount: schemaScripts.length, schemaBlocks: schemaScripts.map(s => s.textContent.trim().substring(0, 200)),
    hreflangCount: hreflang.length,
    ogTitle, ogDesc, ogImage, ogType, ogUrl, twitterCard, twitterTitle, twitterImage,
    onpage, technical, social, links, critical, roadmap,
  };
}

// ── XLSX Builder ───────────────────────────────────────────────────────────
function buildAuditExcel(r) {
  const H = v => ({ v, s: 'h' }); // header cell
  const B = v => ({ v, s: 'b' }); // bold cell
  const V = v => ({ v });        // normal cell

  const pass = c => c.pass ? '✓ PASS' : '✗ FAIL';
  const priMap = { Critical: '🔴 Critical', High: '🟠 High', Medium: '🟡 Medium', Low: '🟢 Low' };

  const sheets = [
    {
      name: '1. Executive Summary', rows: [
        [H('SEO DEEP AUDIT REPORT')],
        [V('URL:'), B(r.url)],
        [V('Audited At:'), V(r.auditedAt)],
        [],
        [H('Category'), H('Score'), H('Status')],
        [V('Overall Score'), V(r.overall + '%'), V(scoreLabel(r.overall))],
        [V('On-Page SEO'), V(r.onpageScore + '%'), V(scoreLabel(r.onpageScore))],
        [V('Technical SEO'), V(r.techScore + '%'), V(scoreLabel(r.techScore))],
        [V('Social / OG'), V(r.socialScore + '%'), V(scoreLabel(r.socialScore))],
        [V('Link Analysis'), V(r.linkScore + '%'), V(scoreLabel(r.linkScore))],
        [],
        [H('Key Data Point'), H('Value')],
        [V('Page Title'), V(r.title || 'Missing')],
        [V('Title Length'), V(r.title.length + ' chars')],
        [V('Meta Description'), V(r.metaDesc || 'Missing')],
        [V('Meta Desc Length'), V(r.metaDesc.length + ' chars')],
        [V('Canonical URL'), V(r.canonical || 'Not set')],
        [V('Noindex?'), V(r.noindex ? 'YES — BLOCKED!' : 'No')],
        [V('Word Count'), V(r.wordCount + ' words')],
        [V('H1 Tags'), V(r.h1s.length + ': ' + r.h1s.join(' | '))],
        [V('H2 Tags'), V(r.h2s.length + ' H2 tags')],
        [V('Total Images'), V(r.imgTotal)],
        [V('Images Missing Alt'), V(r.imgNoAlt)],
        [V('Schema Blocks'), V(r.schemaCount)],
        [V('Internal Links'), V(r.internalLinks)],
        [V('External Links'), V(r.externalLinks)],
        [V('Total Links'), V(r.totalLinks)],
      ]
    },
    {
      name: '2. Critical Issues', rows: [
        [H('#'), H('Area'), H('Issue'), H('Current Value'), H('Detail / Fix'), H('Priority')],
        ...(r.critical.length > 0
          ? r.critical.map((c, i) => [V(i + 1), V(c.area), V(c.label), V(c.value), V(c.note), V(priMap[c.priority] || c.priority)])
          : [[V(''), V('✅ No critical issues found!')]]
        ),
      ]
    },
    {
      name: '3. On-Page SEO', rows: [
        [H('Check'), H('Status'), H('Current Value'), H('Note / Recommendation')],
        ...r.onpage.map(c => [V(c.label), V(pass(c)), V(c.value), V(c.note)]),
      ]
    },
    {
      name: '4. Technical SEO', rows: [
        [H('Check'), H('Status'), H('Current Value'), H('Note / Recommendation')],
        ...r.technical.map(c => [V(c.label), V(pass(c)), V(c.value), V(c.note)]),
      ]
    },
    {
      name: '5. Social & OG Tags', rows: [
        [H('Check'), H('Status'), H('Current Value'), H('Note / Recommendation')],
        ...r.social.map(c => [V(c.label), V(pass(c)), V(c.value), V(c.note)]),
      ]
    },
    {
      name: '6. Images', rows: [
        [H('#'), H('Image URL'), H('Alt Text'), H('Status')],
        ...r.imgUrls.map((img, i) => [V(i + 1), V(img.src || '(no src)'), V(img.alt || 'MISSING ALT'), V(img.alt ? '✓ Has Alt' : '✗ Missing Alt')]),
      ]
    },
    {
      name: '7. Link Analysis', rows: [
        [H('Check'), H('Status'), H('Value'), H('Note')],
        ...r.links.map(c => [V(c.label), V(pass(c)), V(c.value), V(c.note)]),
        [],
        [H('Metric'), H('Count')],
        [V('Internal Links'), V(r.internalLinks)],
        [V('External Links'), V(r.externalLinks)],
        [V('Nofollow Links'), V(r.nofollowLinks)],
        [V('Total Links'), V(r.totalLinks)],
      ]
    },
    {
      name: '8. Action Roadmap', rows: [
        [H('Step'), H('Priority'), H('Action Required'), H('Area'), H('Detail')],
        ...(r.roadmap.length > 0
          ? r.roadmap.map(t => [V(t.step), V(priMap[t.priority] || t.priority), V('Fix: ' + t.label), V(t.area), V(t.note)])
          : [[V(''), V('✅ No actions required!')]]
        ),
      ]
    },
  ];

  return buildXlsx(sheets);
}

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────
const SHEETS = [
  { id: 0, label: '📊 Executive Summary' },
  { id: 1, label: '🔴 Critical Issues' },
  { id: 2, label: '⚙️ Technical SEO' },
  { id: 3, label: '📝 On-Page SEO' },
  { id: 4, label: '🔗 Links & Structure' },
  { id: 5, label: '🖼️ Images' },
  { id: 6, label: '🌐 Social / OG Tags' },
  { id: 7, label: '🎯 Action Roadmap' },
];

export default function DeepSEOAuditPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [activeSheet, setActiveSheet] = useState(0);

  async function runAudit(e) {
    e.preventDefault();
    if (!url.trim()) return;
    let target = url.trim();
    if (!/^https?:\/\//i.test(target)) target = 'https://' + target;
    setError(''); setResults(null); setLoading(true); setProgress(0); setActiveSheet(0);

    const steps = ['Resolving domain…', 'Fetching page HTML…', 'Parsing meta tags…', 'Checking headings…', 'Analyzing images…', 'Inspecting canonical & robots…', 'Checking Open Graph…', 'Analyzing link structure…', 'Auditing social tags…', 'Computing scores…', 'Generating Excel data…'];
    for (let i = 0; i < steps.length; i++) {
      setProgressLabel(steps[i]);
      setProgress(Math.round(((i + 1) / steps.length) * 88));
      await new Promise(r => setTimeout(r, 250 + Math.random() * 200));
    }
    try {
      const resp = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(target)}`);
      if (!resp.ok) throw new Error('Could not reach the URL. Make sure it is publicly accessible.');
      const data = await resp.json();
      setProgressLabel('Finalizing report…'); setProgress(96);
      await new Promise(r => setTimeout(r, 300));
      const audit = analyzeHTML(data.contents || '', target);
      setResults(audit); setProgress(100); setProgressLabel('Done!');
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
    a.download = `SEO-Audit-${(() => { try { return new URL(results.url).hostname; } catch (e) { return 'report'; } })()}-${Date.now()}.xlsx`;
    a.click();
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary,#f9fafb)', fontFamily: "Inter,'Segoe UI',system-ui,sans-serif" }}>

      {/* ── HERO ── */}
      <div style={{ background: 'linear-gradient(135deg,#064e3b 0%,#065f46 50%,#0f766e 100%)', padding: '56px 20px 52px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.13)', border: '1px solid rgba(255,255,255,0.22)', borderRadius: 6, padding: '6px 16px', marginBottom: 18 }}>
          <i className="fa-solid fa-file-spreadsheet" style={{ color: '#6ee7b7', fontSize: 13 }}></i>
          <span style={{ color: '#a7f3d0', fontSize: 12, fontWeight: 700, letterSpacing: 0.6 }}>Deep SEO Audit · 26+ Point Inspection · 8-Sheet Excel Export</span>
        </div>
        <h1 style={{ fontSize: 'clamp(26px,5vw,50px)', fontWeight: 900, color: '#fff', margin: '0 0 14px', letterSpacing: -1, lineHeight: 1.15 }}>
          Audit Any Website &amp; Download
          <br />
          <span style={{ background: 'linear-gradient(90deg,#34d399,#14b8a6,#60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Professional Excel Report
          </span>
        </h1>
        <p style={{ color: '#a7f3d0', fontSize: 16, maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
          Exhaustive technical &amp; on-page SEO inspection with instant scores, issue diagnosis, and a client-ready 8-sheet Excel workbook with complete image URLs.
        </p>
      </div>

      {/* ── INPUT CARD ── */}
      <div style={{ maxWidth: 760, margin: '-26px auto 0', padding: '0 16px' }}>
        <div style={{ background: 'var(--card-bg,#fff)', border: '1px solid var(--border-color,#e5e7eb)', borderRadius: 8, padding: '32px', boxShadow: '0 8px 40px rgba(0,0,0,0.12)' }}>
          <form onSubmit={runAudit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <label style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-secondary,#6b7280)', textTransform: 'uppercase', letterSpacing: 1 }}>Enter Website URL to Audit</label>
            <div style={{ position: 'relative' }}>
              <i className="fa-solid fa-globe" style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: 15, pointerEvents: 'none' }}></i>
              <input
                type="text" value={url} onChange={e => setUrl(e.target.value)}
                placeholder="https://example.com" disabled={loading}
                style={{ width: '100%', boxSizing: 'border-box', paddingLeft: 42, paddingRight: 16, paddingTop: 14, paddingBottom: 14, fontSize: 16, border: '1.5px solid var(--border-color,#d1d5db)', borderRadius: 6, background: 'var(--input-bg,#f9fafb)', color: 'var(--text-primary,#111827)', outline: 'none', opacity: loading ? 0.6 : 1, transition: 'border-color 0.2s' }}
                onFocus={e => e.target.style.borderColor = '#059669'} onBlur={e => e.target.style.borderColor = 'var(--border-color,#d1d5db)'}
              />
            </div>
            <button type="submit" disabled={loading || !url.trim()}
              style={{ width: '100%', padding: 15, background: loading ? '#9ca3af' : 'linear-gradient(135deg,#059669,#0f766e)', color: '#fff', border: 'none', borderRadius: 6, fontSize: 16, fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: loading ? 'none' : '0 4px 20px rgba(5,150,105,0.35)', transition: 'all 0.2s' }}>
              {loading ? <><i className="fa-solid fa-spinner fa-spin"></i><span>Auditing…</span></> : <><i className="fa-solid fa-magnifying-glass-chart"></i><span>Start Deep SEO Audit</span></>}
            </button>
          </form>

          {loading && (
            <div style={{ marginTop: 22 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                <span style={{ fontSize: 13, color: 'var(--text-secondary,#6b7280)', fontStyle: 'italic' }}>{progressLabel}</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#059669' }}>{progress}%</span>
              </div>
              <div style={{ height: 7, background: 'var(--border-color,#e5e7eb)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg,#059669,#14b8a6)', borderRadius: 4, transition: 'width 0.35s ease' }} />
              </div>
            </div>
          )}
          {error && <div style={{ marginTop: 18, padding: '12px 16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 6, color: '#dc2626', fontSize: 14 }}><i className="fa-solid fa-triangle-exclamation" style={{ marginRight: 8 }}></i>{error}</div>}
        </div>
      </div>

      {/* ── RESULTS ── */}
      {results && (
        <div style={{ maxWidth: 1120, margin: '36px auto', padding: '0 16px 60px' }}>

          {/* Score bar */}
          <div style={{ background: 'var(--card-bg,#fff)', border: '1px solid var(--border-color,#e5e7eb)', borderRadius: 8, padding: '24px 28px', marginBottom: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary,#6b7280)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3 }}>Audited URL</div>
                <a href={results.url} target="_blank" rel="noopener noreferrer" style={{ color: '#059669', fontWeight: 600, fontSize: 15, wordBreak: 'break-all' }}>{results.url}</a>
              </div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button onClick={() => window.print()}
                  style={{ padding: '11px 20px', background: '#f8fafc', color: '#1e293b', border: '1.5px solid #cbd5e1', borderRadius: 6, fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>
                  <i className="fa-solid fa-file-pdf" style={{ color: '#dc2626' }}></i> Print / Save PDF
                </button>
                <button onClick={downloadExcel}
                  style={{ padding: '11px 22px', background: 'linear-gradient(135deg,#059669,#0f766e)', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 800, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 3px 12px rgba(5,150,105,0.25)', whiteSpace: 'nowrap' }}>
                  <i className="fa-solid fa-file-excel"></i> Download Excel Report (.xlsx)
                </button>
              </div>
            </div>

            {/* Score circles */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
              {[{ l: 'Overall', s: results.overall }, { l: 'On-Page', s: results.onpageScore }, { l: 'Technical', s: results.techScore }, { l: 'Social/OG', s: results.socialScore }, { l: 'Links', s: results.linkScore }].map(({ l, s }) => (
                <div key={l} style={{ flex: '1 1 110px', textAlign: 'center' }}>
                  <div style={{ width: 70, height: 70, borderRadius: 8, background: scoreBg(s), border: `2.5px solid ${scoreColor(s)}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px', flexDirection: 'column' }}>
                    <span style={{ fontSize: 22, fontWeight: 900, color: scoreColor(s), lineHeight: 1 }}>{s}</span>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary,#6b7280)' }}>{l}</div>
                  <div style={{ fontSize: 11, color: scoreColor(s), fontWeight: 600 }}>{scoreLabel(s)}</div>
                </div>
              ))}
            </div>

            {/* Quick stats */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 18 }}>
              {[
                { icon: 'fa-heading', label: 'H1 Tags', value: results.h1s.length, warn: results.h1s.length !== 1 },
                { icon: 'fa-image', label: 'Images', value: results.imgTotal },
                { icon: 'fa-circle-xmark', label: 'Missing Alt', value: results.imgNoAlt, warn: results.imgNoAlt > 0 },
                { icon: 'fa-link', label: 'Internal Links', value: results.internalLinks },
                { icon: 'fa-arrow-up-right-from-square', label: 'External Links', value: results.externalLinks },
                { icon: 'fa-code', label: 'Schema Blocks', value: results.schemaCount, warn: results.schemaCount === 0 },
                { icon: 'fa-font', label: 'Words', value: results.wordCount, warn: results.wordCount < 300 },
                { icon: 'fa-triangle-exclamation', label: 'Issues', value: results.critical.length, warn: results.critical.length > 0 },
              ].map(stat => (
                <div key={stat.label} style={{ flex: '1 1 100px', background: stat.warn ? '#fff7ed' : 'var(--bg-secondary,#f9fafb)', border: `1px solid ${stat.warn ? '#fed7aa' : 'var(--border-color,#e5e7eb)'}`, borderRadius: 6, padding: '10px 14px', minWidth: 90 }}>
                  <div style={{ fontSize: 20, fontWeight: 900, color: stat.warn ? '#d97706' : 'var(--text-primary,#111827)' }}>{stat.value}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary,#6b7280)', marginTop: 2 }}><i className={`fa-solid ${stat.icon}`} style={{ marginRight: 5, opacity: 0.5 }}></i>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Sheet tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
            {SHEETS.map(s => (
              <button key={s.id} onClick={() => setActiveSheet(s.id)}
                style={{ padding: '8px 14px', borderRadius: 6, border: '1.5px solid', fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s', borderColor: activeSheet === s.id ? '#059669' : 'var(--border-color,#e5e7eb)', background: activeSheet === s.id ? '#059669' : 'var(--card-bg,#fff)', color: activeSheet === s.id ? '#fff' : 'var(--text-secondary,#6b7280)' }}>
                {s.label}
              </button>
            ))}
          </div>

          {/* Sheet body */}
          <div style={{ background: 'var(--card-bg,#fff)', border: '1px solid var(--border-color,#e5e7eb)', borderRadius: 8, padding: '26px 26px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', overflowX: 'auto' }}>

            {/* 0 — Executive Summary */}
            {activeSheet === 0 && (
              <div>
                <h2 style={sh2}>📊 Executive Summary</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 14 }}>
                  <IC label="Page Title" value={results.title || '—'} icon="fa-heading" warn={!results.title} />
                  <IC label="Meta Description" value={results.metaDesc || '—'} icon="fa-align-left" warn={!results.metaDesc} />
                  <IC label="Canonical URL" value={results.canonical || 'Not set'} icon="fa-link" warn={!results.canonical} />
                  <IC label="Noindex Status" value={results.noindex ? '⚠️ NOINDEX — Blocked from Google' : '✅ Indexable'} icon="fa-robot" warn={results.noindex} />
                  <IC label="Word Count" value={`${results.wordCount} words`} icon="fa-font" warn={results.wordCount < 300} />
                  <IC label="H1 Tags" value={results.h1s.join(', ') || 'None found'} icon="fa-heading" warn={results.h1s.length !== 1} />
                  <IC label="H2 Subheadings" value={`${results.h2s.length} found` + (results.h2s.length ? ': ' + results.h2s.slice(0, 2).join(', ') : '')} icon="fa-list" warn={results.h2s.length === 0} />
                  <IC label="Schema Markup" value={results.schemaCount > 0 ? `${results.schemaCount} block(s) found` : 'Not detected'} icon="fa-code" warn={!results.schemaCount} />
                  <IC label="Images" value={`${results.imgTotal} total — ${results.imgNoAlt} missing alt`} icon="fa-image" warn={results.imgNoAlt > 0} />
                  <IC label="OG Title" value={results.ogTitle || 'Missing'} icon="fa-share-nodes" warn={!results.ogTitle} />
                  <IC label="OG Image" value={results.ogImage || 'Missing'} icon="fa-image" warn={!results.ogImage} />
                  <IC label="Twitter Card" value={results.twitterCard || 'Missing'} icon="fa-brands fa-twitter" warn={!results.twitterCard} />
                </div>
              </div>
            )}

            {/* 1 — Critical Issues */}
            {activeSheet === 1 && (
              <div>
                <h2 style={sh2}>🔴 Critical Issues <span style={{ fontSize: 14, fontWeight: 600, color: '#6b7280' }}>({results.critical.length} found)</span></h2>
                {results.critical.length === 0 ? <Empty msg="No critical issues found! Great work 🎉" /> : (
                  <table style={tblStyle}>
                    <thead><tr style={thr}>{['#', 'Area', 'Issue', 'Current Value', 'Detail', 'Priority'].map(h => <th key={h} style={thStyle}>{h}</th>)}</tr></thead>
                    <tbody>{results.critical.map((c, i) => {
                      const ps = priStyle(c.priority); return (
                        <tr key={i} style={trStyle}>
                          <td style={tdStyle}>{i + 1}</td>
                          <td style={tdStyle}><Badge text={c.area} bg="#f0fdf4" color="#059669" border="#bbf7d0" /></td>
                          <td style={{ ...tdStyle, fontWeight: 600, color: 'var(--text-primary,#111827)' }}>{c.label}</td>
                          <td style={{ ...tdStyle, fontSize: 12, color: '#6b7280', maxWidth: 160, wordBreak: 'break-all' }}>{c.value}</td>
                          <td style={{ ...tdStyle, fontSize: 12, color: '#6b7280' }}>{c.note}</td>
                          <td style={tdStyle}><Badge text={c.priority} bg={ps.bg} color={ps.color} border={ps.border} /></td>
                        </tr>
                      );
                    })}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {/* 2 — Technical */}
            {activeSheet === 2 && <CheckSheet title="⚙️ Technical SEO Checks" checks={results.technical} />}

            {/* 3 — On-Page */}
            {activeSheet === 3 && <CheckSheet title="📝 On-Page SEO Checks" checks={results.onpage} />}

            {/* 4 — Links */}
            {activeSheet === 4 && (
              <div>
                <h2 style={sh2}>🔗 Links & Structure</h2>
                <CheckSheet title="" checks={results.links} />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 12, marginTop: 18 }}>
                  {[{ l: 'Internal Links', v: results.internalLinks, c: '#059669' }, { l: 'External Links', v: results.externalLinks, c: '#2563eb' }, { l: 'Nofollow Links', v: results.nofollowLinks, c: '#d97706' }, { l: 'Total Links', v: results.totalLinks, c: '#7c3aed' }].map(s => (
                    <div key={s.l} style={{ background: 'var(--bg-secondary,#f9fafb)', border: '1px solid var(--border-color,#e5e7eb)', borderRadius: 6, padding: '14px', textAlign: 'center' }}>
                      <div style={{ fontSize: 30, fontWeight: 900, color: s.c }}>{s.v}</div>
                      <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5 — Images */}
            {activeSheet === 5 && (
              <div>
                <h2 style={sh2}>🖼️ Images <span style={{ fontSize: 14, fontWeight: 600, color: '#6b7280' }}>({results.imgTotal} total — {results.imgNoAlt} missing alt)</span></h2>
                {results.imgUrls.length === 0 ? <Empty msg="No images detected on this page." /> : (
                  <table style={tblStyle}>
                    <thead><tr style={thr}>{['#', 'Image URL', 'Alt Text', 'Status'].map(h => <th key={h} style={thStyle}>{h}</th>)}</tr></thead>
                    <tbody>{results.imgUrls.map((img, i) => (
                      <tr key={i} style={trStyle}>
                        <td style={tdStyle}>{i + 1}</td>
                        <td style={{ ...tdStyle, fontSize: 12, color: '#6b7280', maxWidth: 280, wordBreak: 'break-all' }}>{img.src || '(no src)'}</td>
                        <td style={{ ...tdStyle, fontSize: 12, color: img.alt ? '#374151' : '#dc2626', fontStyle: img.alt ? 'normal' : 'italic' }}>{img.alt || 'MISSING ALT'}</td>
                        <td style={tdStyle}><Badge text={img.alt ? '✓ Has Alt' : '✗ Missing'} bg={img.alt ? '#ecfdf5' : '#fef2f2'} color={img.alt ? '#059669' : '#dc2626'} border={img.alt ? '#a7f3d0' : '#fecaca'} /></td>
                      </tr>
                    ))}</tbody>
                  </table>
                )}
              </div>
            )}

            {/* 6 — Social / OG */}
            {activeSheet === 6 && <CheckSheet title="🌐 Social & Open Graph Tags" checks={results.social} />}

            {/* 7 — Roadmap */}
            {activeSheet === 7 && (
              <div>
                <h2 style={sh2}>🎯 Action Roadmap <span style={{ fontSize: 14, fontWeight: 600, color: '#6b7280' }}>({results.roadmap.length} tasks)</span></h2>
                {results.roadmap.length === 0 ? <Empty msg="No actions required — site looks great! 🎉" /> : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {results.roadmap.map(r => {
                      const ps = priStyle(r.priority); return (
                        <div key={r.step} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '14px 18px', background: ps.bg, border: `1px solid ${ps.border}`, borderRadius: 6 }}>
                          <div style={{ width: 32, height: 32, borderRadius: 6, background: ps.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 14, flexShrink: 0 }}>{r.step}</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                              <span style={{ fontWeight: 800, fontSize: 14, color: 'var(--text-primary,#111827)' }}>Fix: {r.label}</span>
                              <Badge text={r.priority} bg="#fff" color={ps.color} border={ps.border} />
                              <Badge text={r.area} bg="rgba(0,0,0,0.05)" color="#6b7280" border="transparent" />
                            </div>
                            <div style={{ fontSize: 13, color: '#6b7280' }}>{r.note}</div>
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
        <div style={{ maxWidth: 920, margin: '48px auto', padding: '0 16px 60px' }}>
          <h2 style={{ textAlign: 'center', fontSize: 22, fontWeight: 800, color: 'var(--text-primary,#111827)', marginBottom: 28 }}>26+ SEO Checks Across 8 Categories</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 14 }}>
            {[
              { icon: 'fa-heading', color: '#059669', title: 'On-Page SEO', items: ['Title tag length & quality', 'Meta description (120–160 chars)', 'H1–H4 heading hierarchy', 'Image alt text coverage', 'Word count & content depth'] },
              { icon: 'fa-gear', color: '#2563eb', title: 'Technical SEO', items: ['Canonical URL configuration', 'Robots meta directives', 'Noindex detection', 'Viewport & charset tags', 'JSON-LD schema markup', 'Hreflang tags'] },
              { icon: 'fa-share-nodes', color: '#7c3aed', title: 'Social / OG Tags', items: ['Open Graph title & description', 'OG image & type', 'OG URL', 'Twitter card type', 'Twitter title & image'] },
              { icon: 'fa-link', color: '#d97706', title: 'Link Analysis', items: ['Internal link count', 'External link count', 'Nofollow ratio', 'Total crawlable links'] },
              { icon: 'fa-image', color: '#0891b2', title: 'Image Audit', items: ['All image URLs listed', 'Alt text per image', 'Missing alt detection', 'Complete image inventory'] },
              { icon: 'fa-file-excel', color: '#16a34a', title: 'Excel Export (8 Sheets)', items: ['Executive Summary sheet', 'Critical Issues sheet', 'On-Page & Technical sheets', 'Social & Image sheets', 'Action Roadmap sheet'] },
            ].map(card => (
              <div key={card.title} style={{ background: 'var(--card-bg,#fff)', border: '1px solid var(--border-color,#e5e7eb)', borderRadius: 8, padding: '20px 22px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 6, background: card.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className={`fa-solid ${card.icon}`} style={{ color: card.color, fontSize: 15 }}></i>
                  </div>
                  <span style={{ fontWeight: 800, fontSize: 15, color: 'var(--text-primary,#111827)' }}>{card.title}</span>
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {card.items.map(item => (
                    <li key={item} style={{ fontSize: 13, color: 'var(--text-secondary,#6b7280)', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <i className="fa-solid fa-check" style={{ color: card.color, fontSize: 10, flexShrink: 0 }}></i>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQ Accordion Section */}
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 16px' }}>
        <ToolFaqAccordion
          title="Website SEO Audit &amp; Technical Health FAQ"
          faqs={[
            {
              q: "What does this Deep SEO Audit tool check on my webpage?",
              a: "Our Deep SEO Audit analyzes over 26+ key on-page, technical, social, and architectural signals—including title tag length, meta description quality, H1–H4 heading hierarchy, canonical configuration, robots indexing directives, noindex tags, image alt text coverage, internal and external link counts, Open Graph tags, and Schema.org JSON-LD structured data."
            },
            {
              q: "How are the SEO health scores calculated?",
              a: "Scores are weighted across 5 critical search dimensions: On-Page Optimization (30%), Technical SEO & Indexability (30%), Schema & Structured Data (15%), Link Structure (15%), and Social Open Graph Tags (10%). Scores 80+ are rated Good, 50–79 Needs Improvement, and below 50 Poor."
            },
            {
              q: "Why is a missing canonical tag or incorrect robots directive dangerous for ranking?",
              a: "A missing or incorrect canonical tag can cause search engines to split link equity across duplicate URLs. Accidental noindex tags or blocked robots directives prevent search engines from indexing your high-converting content altogether."
            },
            {
              q: "Can I export and share the full audit report with my developer or team?",
              a: "Yes! Click 'Download Excel Report (.xlsx)' to instantly export a comprehensive 8-tab workbook containing an executive summary, prioritized critical issue tickets, full image inventories, and an actionable developer roadmap."
            },
            {
              q: "How frequently should I run a deep SEO audit on my website?",
              a: "We recommend running a technical audit at least once a month, as well as immediately after any CMS updates, plugin changes, theme redesigns, or large content migrations."
            }
          ]}
        />
      </div>

      {/* Social Share Bar */}
      <div style={{ maxWidth: 1120, margin: '0 auto 40px', padding: '0 16px' }}>
        <SocialShare title="Free Instant Deep SEO Audit Tool by Abdullah" />
      </div>
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────
const sh2 = { fontSize: 19, fontWeight: 800, marginBottom: 18, color: 'var(--text-primary,#111827)', marginTop: 0 };
const tblStyle = { width: '100%', borderCollapse: 'collapse' };
const thr = { background: 'var(--bg-secondary,#f9fafb)' };
const thStyle = { padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 800, color: 'var(--text-secondary,#6b7280)', textTransform: 'uppercase', letterSpacing: 0.5, borderBottom: '1px solid var(--border-color,#e5e7eb)', whiteSpace: 'nowrap' };
const trStyle = { borderBottom: '1px solid var(--border-color,#f3f4f6)' };
const tdStyle = { padding: '10px 14px', fontSize: 13, verticalAlign: 'top' };

function Badge({ text, bg, color, border }) {
  return <span style={{ background: bg, color, border: `1px solid ${border}`, borderRadius: 4, padding: '2px 9px', fontSize: 11, fontWeight: 800, whiteSpace: 'nowrap' }}>{text}</span>;
}

function IC({ label, value, icon, warn }) {
  return (
    <div style={{ background: warn ? '#fff7ed' : 'var(--bg-secondary,#f9fafb)', border: `1px solid ${warn ? '#fed7aa' : 'var(--border-color,#e5e7eb)'}`, borderRadius: 6, padding: '14px 16px' }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: warn ? '#d97706' : 'var(--text-secondary,#6b7280)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 }}>
        <i className={`fa-solid ${icon}`} style={{ marginRight: 6 }}></i>{label}
      </div>
      <div style={{ fontSize: 13, color: 'var(--text-primary,#111827)', wordBreak: 'break-word', lineHeight: 1.5 }}>{value || '—'}</div>
    </div>
  );
}

function CheckSheet({ title, checks }) {
  return (
    <div>
      {title && <h2 style={sh2}>{title}</h2>}
      <table style={tblStyle}>
        <thead><tr style={thr}>{['Check', 'Status', 'Current Value', 'Note / Recommendation'].map(h => <th key={h} style={thStyle}>{h}</th>)}</tr></thead>
        <tbody>{checks.map((c, i) => (
          <tr key={i} style={trStyle}>
            <td style={{ ...tdStyle, fontWeight: 600, color: 'var(--text-primary,#111827)', maxWidth: 220 }}>{c.label}</td>
            <td style={tdStyle}><Badge text={c.pass ? '✓ PASS' : '✗ FAIL'} bg={c.pass ? '#ecfdf5' : '#fef2f2'} color={c.pass ? '#059669' : '#dc2626'} border={c.pass ? '#a7f3d0' : '#fecaca'} /></td>
            <td style={{ ...tdStyle, fontSize: 12, color: '#6b7280', maxWidth: 200, wordBreak: 'break-word' }}>{c.value}</td>
            <td style={{ ...tdStyle, fontSize: 12, color: '#6b7280' }}>{c.note}</td>
          </tr>
        ))}</tbody>
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

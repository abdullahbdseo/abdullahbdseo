'use client';

import { useState, useRef } from 'react';

export default function DeepSEOAuditPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [activeSheet, setActiveSheet] = useState(0);
  const printRef = useRef();

  const sheets = [
    { id: 0, label: '📊 Executive Summary', key: 'summary' },
    { id: 1, label: '🔴 Critical Issues', key: 'critical' },
    { id: 2, label: '⚙️ Technical SEO', key: 'technical' },
    { id: 3, label: '📝 On-Page SEO', key: 'onpage' },
    { id: 4, label: '🔗 Links & Structure', key: 'links' },
    { id: 5, label: '📱 Performance', key: 'performance' },
    { id: 6, label: '🛡️ Security & Headers', key: 'security' },
    { id: 7, label: '🎯 Action Roadmap', key: 'roadmap' },
  ];

  function scoreColor(score) {
    if (score >= 80) return '#059669';
    if (score >= 50) return '#d97706';
    return '#dc2626';
  }
  function scoreLabel(score) {
    if (score >= 80) return 'Good';
    if (score >= 50) return 'Needs Work';
    return 'Critical';
  }
  function scoreBg(score) {
    if (score >= 80) return '#ecfdf5';
    if (score >= 50) return '#fffbeb';
    return '#fef2f2';
  }

  async function runAudit(e) {
    e.preventDefault();
    if (!url.trim()) return;

    let target = url.trim();
    if (!/^https?:\/\//i.test(target)) target = 'https://' + target;

    setError('');
    setResults(null);
    setLoading(true);
    setProgress(0);
    setActiveSheet(0);

    const steps = [
      'Fetching page HTML…',
      'Parsing meta tags…',
      'Checking headings structure…',
      'Analyzing images & alt text…',
      'Inspecting canonical & robots…',
      'Checking Open Graph tags…',
      'Analyzing link structure…',
      'Estimating performance signals…',
      'Checking security headers…',
      'Generating audit report…',
    ];

    for (let i = 0; i < steps.length; i++) {
      setProgressLabel(steps[i]);
      setProgress(Math.round(((i + 1) / steps.length) * 90));
      await new Promise(r => setTimeout(r, 280 + Math.random() * 180));
    }

    try {
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(target)}`;
      const resp = await fetch(proxyUrl);
      if (!resp.ok) throw new Error('Could not fetch the URL. Make sure it is publicly accessible.');
      const data = await resp.json();
      const html = data.contents || '';

      setProgressLabel('Finalizing report…');
      setProgress(97);
      await new Promise(r => setTimeout(r, 300));

      const auditData = analyzeHTML(html, target);
      setResults(auditData);
      setProgress(100);
      setProgressLabel('Done!');
    } catch (err) {
      setError(err.message || 'Failed to audit. The site may block external requests.');
    } finally {
      setLoading(false);
    }
  }

  function analyzeHTML(html, targetUrl) {
    const parser = typeof DOMParser !== 'undefined' ? new DOMParser() : null;
    let doc = null;
    if (parser) {
      doc = parser.parseFromString(html, 'text/html');
    }

    const get = (sel) => doc ? doc.querySelector(sel) : null;
    const getAll = (sel) => doc ? [...doc.querySelectorAll(sel)] : [];
    const attr = (el, a) => el ? el.getAttribute(a) || '' : '';
    const text = (el) => el ? el.textContent.trim() : '';

    // --- Meta
    const title = text(get('title'));
    const metaDesc = attr(get('meta[name="description"]'), 'content');
    const metaRobots = attr(get('meta[name="robots"]'), 'content');
    const canonical = attr(get('link[rel="canonical"]'), 'href');
    const viewport = attr(get('meta[name="viewport"]'), 'content');
    const charset = attr(get('meta[charset]'), 'charset') || (get('meta[charset]') ? 'utf-8' : '');

    // --- OG
    const ogTitle = attr(get('meta[property="og:title"]'), 'content');
    const ogDesc = attr(get('meta[property="og:description"]'), 'content');
    const ogImage = attr(get('meta[property="og:image"]'), 'content');
    const ogType = attr(get('meta[property="og:type"]'), 'content');
    const twitterCard = attr(get('meta[name="twitter:card"]'), 'content');
    const twitterTitle = attr(get('meta[name="twitter:title"]'), 'content');

    // --- Headings
    const h1s = getAll('h1');
    const h2s = getAll('h2');
    const h3s = getAll('h3');
    const h4s = getAll('h4');

    // --- Images
    const imgs = getAll('img');
    const imgsNoAlt = imgs.filter(i => !i.getAttribute('alt') || i.getAttribute('alt').trim() === '');
    const imgsWithAlt = imgs.filter(i => i.getAttribute('alt') && i.getAttribute('alt').trim() !== '');

    // --- Links
    const allLinks = getAll('a[href]');
    const internalLinks = allLinks.filter(a => {
      const h = a.getAttribute('href') || '';
      return h.startsWith('/') || h.includes(new URL(targetUrl).hostname);
    });
    const externalLinks = allLinks.filter(a => {
      const h = a.getAttribute('href') || '';
      return h.startsWith('http') && !h.includes(new URL(targetUrl).hostname);
    });
    const nofollowLinks = allLinks.filter(a => (a.getAttribute('rel') || '').includes('nofollow'));

    // --- Schema
    const schemaScripts = getAll('script[type="application/ld+json"]');
    const hasSchema = schemaScripts.length > 0;

    // --- Hreflang
    const hreflang = getAll('link[rel="hreflang"]');

    // --- Content
    const bodyText = doc ? (doc.body ? doc.body.innerText || doc.body.textContent : '') : '';
    const wordCount = bodyText.trim().split(/\s+/).filter(w => w.length > 1).length;

    // Scores per category
    const titleLen = title.length;
    const descLen = metaDesc.length;

    const onpageChecks = [
      { label: 'Title Tag Present', pass: title.length > 0, value: title || 'Missing', note: title.length > 0 ? `${titleLen} chars` : 'No title found' },
      { label: 'Title Length (50–60 chars)', pass: titleLen >= 50 && titleLen <= 60, value: `${titleLen} chars`, note: titleLen < 50 ? 'Too short' : titleLen > 60 ? 'Too long' : 'Optimal' },
      { label: 'Meta Description Present', pass: metaDesc.length > 0, value: metaDesc || 'Missing', note: metaDesc.length > 0 ? `${descLen} chars` : 'No meta description' },
      { label: 'Meta Description Length (120–160)', pass: descLen >= 120 && descLen <= 160, value: `${descLen} chars`, note: descLen < 120 && descLen > 0 ? 'Too short' : descLen > 160 ? 'Too long' : descLen === 0 ? 'Missing' : 'Optimal' },
      { label: 'Single H1 Tag', pass: h1s.length === 1, value: `${h1s.length} H1 found`, note: h1s.length === 0 ? 'Missing H1' : h1s.length > 1 ? 'Multiple H1s' : text(h1s[0]).substring(0, 60) },
      { label: 'H2 Headings Present', pass: h2s.length > 0, value: `${h2s.length} H2s`, note: h2s.length > 0 ? 'Good structure' : 'No H2 found' },
      { label: 'Image Alt Text', pass: imgsNoAlt.length === 0, value: `${imgsNoAlt.length}/${imgs.length} missing alt`, note: imgsNoAlt.length === 0 ? 'All images have alt' : `${imgsNoAlt.length} images missing alt text` },
      { label: 'Word Count (≥300)', pass: wordCount >= 300, value: `${wordCount} words`, note: wordCount < 300 ? 'Thin content detected' : 'Good content length' },
    ];

    const technicalChecks = [
      { label: 'Canonical URL Set', pass: canonical.length > 0, value: canonical || 'Not set', note: canonical ? 'Canonical defined' : 'Missing canonical tag' },
      { label: 'Viewport Meta Tag', pass: viewport.length > 0, value: viewport || 'Missing', note: viewport ? 'Mobile-friendly' : 'Missing viewport — bad for mobile' },
      { label: 'Charset Declared', pass: charset.length > 0, value: charset || 'Not found', note: charset ? 'UTF-8 declared' : 'No charset declaration' },
      { label: 'Robots Meta Tag', pass: true, value: metaRobots || 'Not set (default: index, follow)', note: metaRobots.includes('noindex') ? '⚠️ Page is noindex!' : 'Indexable' },
      { label: 'Noindex Detected', pass: !metaRobots.includes('noindex'), value: metaRobots.includes('noindex') ? 'NOINDEX SET' : 'Indexable', note: metaRobots.includes('noindex') ? '🚨 This page is blocked from Google!' : 'Page is crawlable' },
      { label: 'JSON-LD Schema Markup', pass: hasSchema, value: hasSchema ? `${schemaScripts.length} schema block(s)` : 'None found', note: hasSchema ? 'Rich snippet eligible' : 'Add structured data' },
      { label: 'Hreflang Tags', pass: hreflang.length > 0, value: `${hreflang.length} hreflang tag(s)`, note: hreflang.length > 0 ? 'International targeting set' : 'None (fine if single language)' },
      { label: 'H3–H4 Sub-headings', pass: h3s.length > 0, value: `${h3s.length} H3, ${h4s.length} H4`, note: h3s.length > 0 ? 'Good heading hierarchy' : 'Consider adding H3 subheadings' },
    ];

    const ogChecks = [
      { label: 'OG Title', pass: ogTitle.length > 0, value: ogTitle || 'Missing', note: ogTitle ? 'Set' : 'Missing — social shares look bad' },
      { label: 'OG Description', pass: ogDesc.length > 0, value: ogDesc || 'Missing', note: ogDesc ? 'Set' : 'Missing' },
      { label: 'OG Image', pass: ogImage.length > 0, value: ogImage || 'Missing', note: ogImage ? 'Set' : 'Missing — no image on social share' },
      { label: 'OG Type', pass: ogType.length > 0, value: ogType || 'Not set', note: ogType ? ogType : 'Not defined' },
      { label: 'Twitter Card', pass: twitterCard.length > 0, value: twitterCard || 'Missing', note: twitterCard ? twitterCard : 'Twitter card not set' },
      { label: 'Twitter Title', pass: twitterTitle.length > 0, value: twitterTitle || 'Missing', note: twitterTitle ? 'Set' : 'Missing' },
    ];

    const linkChecks = [
      { label: 'Internal Links', pass: internalLinks.length >= 3, value: `${internalLinks.length} internal links`, note: internalLinks.length < 3 ? 'Few internal links' : 'Good internal linking' },
      { label: 'External Links', pass: externalLinks.length >= 0, value: `${externalLinks.length} external links`, note: externalLinks.length > 20 ? 'Many external links' : 'Normal' },
      { label: 'Nofollow Usage', pass: true, value: `${nofollowLinks.length} nofollow links`, note: 'Informational' },
      { label: 'Total Links', pass: allLinks.length > 0, value: `${allLinks.length} total links`, note: allLinks.length === 0 ? 'No links found' : `${allLinks.length} links crawled` },
    ];

    // Scoring
    const calcScore = (checks) => {
      const passed = checks.filter(c => c.pass).length;
      return Math.round((passed / checks.length) * 100);
    };

    const onpageScore = calcScore(onpageChecks);
    const technicalScore = calcScore(technicalChecks);
    const ogScore = calcScore(ogChecks);
    const linkScore = calcScore(linkChecks);
    const overallScore = Math.round((onpageScore + technicalScore + ogScore + linkScore) / 4);

    const criticalIssues = [
      ...onpageChecks.filter(c => !c.pass).map(c => ({ area: 'On-Page', label: c.label, detail: c.note, priority: 'High' })),
      ...technicalChecks.filter(c => !c.pass).map(c => ({ area: 'Technical', label: c.label, detail: c.note, priority: c.label.includes('noindex') ? 'Critical' : 'High' })),
      ...ogChecks.filter(c => !c.pass).map(c => ({ area: 'Social / OG', label: c.label, detail: c.note, priority: 'Medium' })),
    ];

    const roadmap = [
      ...criticalIssues.filter(i => i.priority === 'Critical').map((i, idx) => ({ step: idx + 1, priority: 'Critical', task: `Fix: ${i.label}`, area: i.area, detail: i.detail })),
      ...criticalIssues.filter(i => i.priority === 'High').map((i, idx) => ({ step: idx + 10, priority: 'High', task: `Fix: ${i.label}`, area: i.area, detail: i.detail })),
      ...criticalIssues.filter(i => i.priority === 'Medium').map((i, idx) => ({ step: idx + 20, priority: 'Medium', task: `Improve: ${i.label}`, area: i.area, detail: i.detail })),
    ].sort((a, b) => {
      const o = { Critical: 0, High: 1, Medium: 2 };
      return o[a.priority] - o[b.priority];
    }).map((r, i) => ({ ...r, step: i + 1 }));

    return {
      url: targetUrl,
      auditedAt: new Date().toLocaleString(),
      overallScore,
      onpageScore,
      technicalScore,
      ogScore,
      linkScore,
      title,
      metaDesc,
      canonical,
      wordCount,
      imgTotal: imgs.length,
      imgNoAlt: imgsNoAlt.length,
      h1s: h1s.map(text),
      h2s: h2s.map(text),
      h3s: h3s.map(text),
      internalLinks: internalLinks.length,
      externalLinks: externalLinks.length,
      nofollowLinks: nofollowLinks.length,
      totalLinks: allLinks.length,
      hasSchema,
      schemaCount: schemaScripts.length,
      hreflangCount: hreflang.length,
      onpageChecks,
      technicalChecks,
      ogChecks,
      linkChecks,
      criticalIssues,
      roadmap,
    };
  }

  function exportCSV() {
    if (!results) return;
    const rows = [
      ['SEO Deep Audit Report'],
      ['URL', results.url],
      ['Audited At', results.auditedAt],
      ['Overall Score', results.overallScore + '%'],
      [''],
      ['Category', 'Score'],
      ['On-Page SEO', results.onpageScore + '%'],
      ['Technical SEO', results.technicalScore + '%'],
      ['Social / OG Tags', results.ogScore + '%'],
      ['Link Structure', results.linkScore + '%'],
      [''],
      ['CRITICAL ISSUES'],
      ['Area', 'Issue', 'Detail', 'Priority'],
      ...results.criticalIssues.map(i => [i.area, i.label, i.detail, i.priority]),
      [''],
      ['ON-PAGE CHECKS'],
      ['Check', 'Status', 'Value', 'Note'],
      ...results.onpageChecks.map(c => [c.label, c.pass ? 'PASS' : 'FAIL', c.value, c.note]),
      [''],
      ['TECHNICAL CHECKS'],
      ['Check', 'Status', 'Value', 'Note'],
      ...results.technicalChecks.map(c => [c.label, c.pass ? 'PASS' : 'FAIL', c.value, c.note]),
      [''],
      ['OG / SOCIAL CHECKS'],
      ['Check', 'Status', 'Value', 'Note'],
      ...results.ogChecks.map(c => [c.label, c.pass ? 'PASS' : 'FAIL', c.value, c.note]),
      [''],
      ['ACTION ROADMAP'],
      ['Step', 'Priority', 'Task', 'Area', 'Detail'],
      ...results.roadmap.map(r => [r.step, r.priority, r.task, r.area, r.detail]),
    ];
    const csvContent = rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `SEO-Audit-${new URL(results.url).hostname}-${Date.now()}.csv`;
    a.click();
  }

  const priorityColor = (p) => ({
    Critical: { bg: '#fef2f2', color: '#dc2626', border: '#fecaca' },
    High: { bg: '#fffbeb', color: '#d97706', border: '#fde68a' },
    Medium: { bg: '#eff6ff', color: '#2563eb', border: '#bfdbfe' },
    Low: { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0' },
  }[p] || { bg: '#f9fafb', color: '#374151', border: '#e5e7eb' });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #064e3b 0%, #065f46 40%, #0f766e 100%)', padding: '60px 24px 50px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6, padding: '6px 16px', marginBottom: 20 }}>
          <i className="fa-solid fa-file-spreadsheet" style={{ color: '#6ee7b7', fontSize: 14 }}></i>
          <span style={{ color: '#a7f3d0', fontSize: 13, fontWeight: 700, letterSpacing: 0.5 }}>Deep SEO Audit & Excel-Ready Report Generator</span>
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 900, color: '#fff', margin: '0 0 14px', lineHeight: 1.15, letterSpacing: -1 }}>
          Audit Any Website &amp; Get a{' '}
          <span style={{ background: 'linear-gradient(90deg, #34d399, #14b8a6, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Full SEO Report
          </span>
        </h1>
        <p style={{ color: '#a7f3d0', fontSize: 17, maxWidth: 640, margin: '0 auto', lineHeight: 1.7 }}>
          26+ point technical &amp; on-page SEO inspection. Get instant grades, issue diagnosis, and a downloadable CSV report.
        </p>
      </div>

      {/* Input Card */}
      <div style={{ maxWidth: 780, margin: '-28px auto 0', padding: '0 16px' }}>
        <div style={{ background: 'var(--card-bg, #fff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: 8, padding: '32px 36px', boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}>
          <form onSubmit={runAudit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <label style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-secondary, #6b7280)', textTransform: 'uppercase', letterSpacing: 1 }}>
              Enter Website URL to Audit
            </label>
            <div style={{ position: 'relative' }}>
              <i className="fa-solid fa-globe" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: 16 }}></i>
              <input
                type="text"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="https://example.com"
                disabled={loading}
                style={{ width: '100%', boxSizing: 'border-box', paddingLeft: 44, paddingRight: 16, paddingTop: 15, paddingBottom: 15, fontSize: 16, border: '1.5px solid var(--border-color, #d1d5db)', borderRadius: 6, background: 'var(--input-bg, #f9fafb)', color: 'var(--text-primary, #111827)', outline: 'none', opacity: loading ? 0.6 : 1 }}
                onFocus={e => e.target.style.borderColor = '#059669'}
                onBlur={e => e.target.style.borderColor = 'var(--border-color, #d1d5db)'}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !url.trim()}
              style={{ width: '100%', padding: '16px', background: loading ? '#9ca3af' : 'linear-gradient(135deg, #059669, #0f766e)', color: '#fff', border: 'none', borderRadius: 6, fontSize: 17, fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, transition: 'all 0.2s', boxShadow: loading ? 'none' : '0 4px 16px rgba(5,150,105,0.3)' }}
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i>
                  <span>Auditing…</span>
                </>
              ) : (
                <>
                  <i className="fa-solid fa-magnifying-glass-chart"></i>
                  <span>Start Deep SEO Audit</span>
                </>
              )}
            </button>
          </form>

          {/* Progress */}
          {loading && (
            <div style={{ marginTop: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: 'var(--text-secondary, #6b7280)', fontStyle: 'italic' }}>{progressLabel}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#059669' }}>{progress}%</span>
              </div>
              <div style={{ height: 8, background: 'var(--border-color, #e5e7eb)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #059669, #14b8a6)', borderRadius: 4, transition: 'width 0.4s ease' }}></div>
              </div>
            </div>
          )}

          {error && (
            <div style={{ marginTop: 20, padding: '12px 16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 6, color: '#dc2626', fontSize: 14 }}>
              <i className="fa-solid fa-triangle-exclamation" style={{ marginRight: 8 }}></i>
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      {results && (
        <div style={{ maxWidth: 1100, margin: '40px auto', padding: '0 16px 60px' }} ref={printRef}>
          {/* Score Overview */}
          <div style={{ background: 'var(--card-bg, #fff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: 8, padding: '28px 32px', marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary, #6b7280)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Audited URL</div>
                <a href={results.url} target="_blank" rel="noopener noreferrer" style={{ color: '#059669', fontWeight: 600, fontSize: 15, wordBreak: 'break-all' }}>{results.url}</a>
                <div style={{ fontSize: 12, color: 'var(--text-secondary, #9ca3af)', marginTop: 4 }}>{results.auditedAt}</div>
              </div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {[
                  { label: 'Overall', score: results.overallScore },
                  { label: 'On-Page', score: results.onpageScore },
                  { label: 'Technical', score: results.technicalScore },
                  { label: 'Social/OG', score: results.ogScore },
                  { label: 'Links', score: results.linkScore },
                ].map(({ label, score }) => (
                  <div key={label} style={{ textAlign: 'center', minWidth: 72 }}>
                    <div style={{ width: 64, height: 64, borderRadius: 8, background: scoreBg(score), border: `2px solid ${scoreColor(score)}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px', flexDirection: 'column' }}>
                      <span style={{ fontSize: 20, fontWeight: 900, color: scoreColor(score), lineHeight: 1 }}>{score}</span>
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary, #6b7280)' }}>{label}</div>
                    <div style={{ fontSize: 10, color: scoreColor(score), fontWeight: 600 }}>{scoreLabel(score)}</div>
                  </div>
                ))}
              </div>
              <button onClick={exportCSV} style={{ padding: '10px 20px', background: '#059669', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 2px 8px rgba(5,150,105,0.2)' }}>
                <i className="fa-solid fa-file-csv"></i>
                Download CSV Report
              </button>
            </div>

            {/* Key stats */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 24 }}>
              {[
                { icon: 'fa-heading', label: 'H1 Tags', value: results.h1s.length },
                { icon: 'fa-image', label: 'Images', value: results.imgTotal },
                { icon: 'fa-triangle-exclamation', label: 'Missing Alt', value: results.imgNoAlt, warn: results.imgNoAlt > 0 },
                { icon: 'fa-link', label: 'Internal Links', value: results.internalLinks },
                { icon: 'fa-external-link', label: 'External Links', value: results.externalLinks },
                { icon: 'fa-file-code', label: 'Schema Blocks', value: results.schemaCount },
                { icon: 'fa-font', label: 'Word Count', value: results.wordCount },
                { icon: 'fa-exclamation-circle', label: 'Issues Found', value: results.criticalIssues.length, warn: results.criticalIssues.length > 0 },
              ].map(stat => (
                <div key={stat.label} style={{ flex: '1 1 110px', background: stat.warn ? '#fff7ed' : 'var(--bg-secondary, #f9fafb)', border: `1px solid ${stat.warn ? '#fed7aa' : 'var(--border-color, #e5e7eb)'}`, borderRadius: 6, padding: '12px 14px', minWidth: 100 }}>
                  <div style={{ fontSize: 18, fontWeight: 900, color: stat.warn ? '#d97706' : 'var(--text-primary, #111827)' }}>{stat.value}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary, #6b7280)', marginTop: 2 }}>
                    <i className={`fa-solid ${stat.icon}`} style={{ marginRight: 5, opacity: 0.6 }}></i>{stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
            {sheets.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSheet(s.id)}
                style={{ padding: '8px 14px', borderRadius: 6, border: '1.5px solid', fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s', borderColor: activeSheet === s.id ? '#059669' : 'var(--border-color, #e5e7eb)', background: activeSheet === s.id ? '#059669' : 'var(--card-bg, #fff)', color: activeSheet === s.id ? '#fff' : 'var(--text-secondary, #6b7280)' }}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Sheet Content */}
          <div style={{ background: 'var(--card-bg, #fff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: 8, padding: '28px 28px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>

            {/* 0 - Summary */}
            {activeSheet === 0 && (
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20, color: 'var(--text-primary, #111827)' }}>📊 Executive Summary</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                  <InfoCard label="Page Title" value={results.title || '—'} icon="fa-heading" />
                  <InfoCard label="Meta Description" value={results.metaDesc || '—'} icon="fa-align-left" />
                  <InfoCard label="Canonical URL" value={results.canonical || 'Not set'} icon="fa-link" />
                  <InfoCard label="Word Count" value={`${results.wordCount} words`} icon="fa-font" />
                  <InfoCard label="H1 Tags" value={results.h1s.join(', ') || 'None'} icon="fa-heading" />
                  <InfoCard label="H2 Tags" value={results.h2s.length > 0 ? results.h2s.slice(0, 3).join(', ') + (results.h2s.length > 3 ? ` +${results.h2s.length - 3} more` : '') : 'None'} icon="fa-list" />
                  <InfoCard label="Schema Markup" value={results.hasSchema ? `${results.schemaCount} block(s) found` : 'Not detected'} icon="fa-code" />
                  <InfoCard label="Images" value={`${results.imgTotal} total — ${results.imgNoAlt} missing alt`} icon="fa-image" warn={results.imgNoAlt > 0} />
                </div>
              </div>
            )}

            {/* 1 - Critical Issues */}
            {activeSheet === 1 && (
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20, color: 'var(--text-primary, #111827)' }}>🔴 Critical Issues</h2>
                {results.criticalIssues.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 0', color: '#059669' }}>
                    <i className="fa-solid fa-circle-check" style={{ fontSize: 40, marginBottom: 12 }}></i>
                    <p style={{ fontWeight: 700, fontSize: 18 }}>No critical issues found! 🎉</p>
                  </div>
                ) : (
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: 'var(--bg-secondary, #f9fafb)' }}>
                        {['#', 'Area', 'Issue', 'Detail', 'Priority'].map(h => (
                          <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 800, color: 'var(--text-secondary, #6b7280)', textTransform: 'uppercase', letterSpacing: 0.5, borderBottom: '1px solid var(--border-color, #e5e7eb)' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {results.criticalIssues.map((issue, i) => {
                        const pc = priorityColor(issue.priority);
                        return (
                          <tr key={i} style={{ borderBottom: '1px solid var(--border-color, #f3f4f6)' }}>
                            <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--text-secondary, #6b7280)' }}>{i + 1}</td>
                            <td style={{ padding: '10px 14px', fontSize: 13 }}><span style={{ background: '#f0fdf4', color: '#059669', border: '1px solid #bbf7d0', borderRadius: 4, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>{issue.area}</span></td>
                            <td style={{ padding: '10px 14px', fontSize: 13, fontWeight: 600, color: 'var(--text-primary, #111827)' }}>{issue.label}</td>
                            <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--text-secondary, #6b7280)' }}>{issue.detail}</td>
                            <td style={{ padding: '10px 14px' }}><span style={{ background: pc.bg, color: pc.color, border: `1px solid ${pc.border}`, borderRadius: 4, padding: '2px 10px', fontSize: 11, fontWeight: 800 }}>{issue.priority}</span></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {/* 2 - Technical */}
            {activeSheet === 2 && (
              <CheckTable title="⚙️ Technical SEO Checks" checks={results.technicalChecks} />
            )}

            {/* 3 - On-Page */}
            {activeSheet === 3 && (
              <CheckTable title="📝 On-Page SEO Checks" checks={results.onpageChecks} />
            )}

            {/* 4 - Links */}
            {activeSheet === 4 && (
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20, color: 'var(--text-primary, #111827)' }}>🔗 Links & Structure</h2>
                <CheckTable title="" checks={results.linkChecks} />
                <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
                  <StatBox label="Internal Links" value={results.internalLinks} color="#059669" />
                  <StatBox label="External Links" value={results.externalLinks} color="#2563eb" />
                  <StatBox label="Nofollow Links" value={results.nofollowLinks} color="#d97706" />
                  <StatBox label="Total Links" value={results.totalLinks} color="#7c3aed" />
                </div>
              </div>
            )}

            {/* 5 - Performance */}
            {activeSheet === 5 && (
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20, color: 'var(--text-primary, #111827)' }}>📱 Performance Signals</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                  <InfoCard label="Viewport Meta Tag" value={results.technicalChecks.find(c => c.label.includes('Viewport'))?.value || '—'} icon="fa-mobile" />
                  <InfoCard label="Word Count" value={`${results.wordCount} words`} icon="fa-font" warn={results.wordCount < 300} />
                  <InfoCard label="Images Total" value={results.imgTotal} icon="fa-image" />
                  <InfoCard label="Images Missing Alt" value={results.imgNoAlt} icon="fa-exclamation-triangle" warn={results.imgNoAlt > 0} />
                  <InfoCard label="Schema Markup" value={results.hasSchema ? `${results.schemaCount} schema block(s)` : 'None'} icon="fa-code" warn={!results.hasSchema} />
                  <InfoCard label="Hreflang Tags" value={`${results.hreflangCount} tag(s)`} icon="fa-globe" />
                </div>
                <div style={{ marginTop: 20, padding: '16px 20px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 6, fontSize: 13, color: '#1e40af' }}>
                  <i className="fa-solid fa-circle-info" style={{ marginRight: 8 }}></i>
                  <strong>Note:</strong> For full Core Web Vitals (LCP, FID, CLS), use Google PageSpeed Insights or Lighthouse.
                </div>
              </div>
            )}

            {/* 6 - Security */}
            {activeSheet === 6 && (
              <CheckTable title="🛡️ Security & Indexability Checks" checks={results.ogChecks} />
            )}

            {/* 7 - Roadmap */}
            {activeSheet === 7 && (
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20, color: 'var(--text-primary, #111827)' }}>🎯 Action Roadmap</h2>
                {results.roadmap.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 0', color: '#059669' }}>
                    <i className="fa-solid fa-party-horn" style={{ fontSize: 40, marginBottom: 12 }}></i>
                    <p style={{ fontWeight: 700, fontSize: 18 }}>No action items! Site looks great.</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {results.roadmap.map((r) => {
                      const pc = priorityColor(r.priority);
                      return (
                        <div key={r.step} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '14px 18px', background: pc.bg, border: `1px solid ${pc.border}`, borderRadius: 6 }}>
                          <div style={{ width: 32, height: 32, borderRadius: 6, background: pc.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 14, flexShrink: 0 }}>{r.step}</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginBottom: 4 }}>
                              <span style={{ fontWeight: 800, fontSize: 14, color: 'var(--text-primary, #111827)' }}>{r.task}</span>
                              <span style={{ background: '#fff', color: pc.color, border: `1px solid ${pc.border}`, borderRadius: 4, padding: '1px 8px', fontSize: 11, fontWeight: 800 }}>{r.priority}</span>
                              <span style={{ fontSize: 11, color: 'var(--text-secondary, #6b7280)', background: 'rgba(0,0,0,0.05)', borderRadius: 4, padding: '1px 8px' }}>{r.area}</span>
                            </div>
                            <div style={{ fontSize: 13, color: 'var(--text-secondary, #6b7280)' }}>{r.detail}</div>
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

      {/* Info section */}
      {!results && !loading && (
        <div style={{ maxWidth: 900, margin: '48px auto', padding: '0 16px 60px' }}>
          <h2 style={{ textAlign: 'center', fontSize: 22, fontWeight: 800, color: 'var(--text-primary, #111827)', marginBottom: 28 }}>What This Tool Checks</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {[
              { icon: 'fa-heading', color: '#059669', title: 'On-Page SEO', items: ['Title tag length & presence', 'Meta description quality', 'H1–H4 heading structure', 'Image alt text coverage', 'Word count (thin content)'] },
              { icon: 'fa-gear', color: '#2563eb', title: 'Technical SEO', items: ['Canonical URL', 'Robots meta directives', 'Viewport & charset tags', 'JSON-LD schema markup', 'Hreflang for international'] },
              { icon: 'fa-share-nodes', color: '#7c3aed', title: 'Social / OG Tags', items: ['Open Graph title & description', 'OG image & type', 'Twitter card tags', 'Social preview readiness'] },
              { icon: 'fa-link', color: '#d97706', title: 'Link Analysis', items: ['Internal link count', 'External link count', 'Nofollow link ratio', 'Total crawlable links'] },
            ].map(card => (
              <div key={card.title} style={{ background: 'var(--card-bg, #fff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: 8, padding: '20px 22px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 6, background: card.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className={`fa-solid ${card.icon}`} style={{ color: card.color, fontSize: 15 }}></i>
                  </div>
                  <span style={{ fontWeight: 800, fontSize: 15, color: 'var(--text-primary, #111827)' }}>{card.title}</span>
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {card.items.map(item => (
                    <li key={item} style={{ fontSize: 13, color: 'var(--text-secondary, #6b7280)', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <i className="fa-solid fa-check" style={{ color: card.color, fontSize: 10 }}></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function InfoCard({ label, value, icon, warn }) {
  return (
    <div style={{ background: warn ? '#fff7ed' : 'var(--bg-secondary, #f9fafb)', border: `1px solid ${warn ? '#fed7aa' : 'var(--border-color, #e5e7eb)'}`, borderRadius: 6, padding: '14px 16px' }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: warn ? '#d97706' : 'var(--text-secondary, #6b7280)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 }}>
        <i className={`fa-solid ${icon}`} style={{ marginRight: 6 }}></i>{label}
      </div>
      <div style={{ fontSize: 14, color: 'var(--text-primary, #111827)', wordBreak: 'break-word', lineHeight: 1.5 }}>{value || '—'}</div>
    </div>
  );
}

function CheckTable({ title, checks }) {
  return (
    <div>
      {title && <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20, color: 'var(--text-primary, #111827)' }}>{title}</h2>}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: 'var(--bg-secondary, #f9fafb)' }}>
            {['Check', 'Status', 'Value', 'Note'].map(h => (
              <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 800, color: 'var(--text-secondary, #6b7280)', textTransform: 'uppercase', letterSpacing: 0.5, borderBottom: '1px solid var(--border-color, #e5e7eb)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {checks.map((c, i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--border-color, #f3f4f6)' }}>
              <td style={{ padding: '10px 14px', fontSize: 13, fontWeight: 600, color: 'var(--text-primary, #111827)' }}>{c.label}</td>
              <td style={{ padding: '10px 14px' }}>
                <span style={{ background: c.pass ? '#ecfdf5' : '#fef2f2', color: c.pass ? '#059669' : '#dc2626', border: `1px solid ${c.pass ? '#a7f3d0' : '#fecaca'}`, borderRadius: 4, padding: '2px 10px', fontSize: 11, fontWeight: 800 }}>
                  {c.pass ? '✓ PASS' : '✗ FAIL'}
                </span>
              </td>
              <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--text-secondary, #6b7280)', maxWidth: 220, wordBreak: 'break-word' }}>{c.value}</td>
              <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--text-secondary, #6b7280)' }}>{c.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatBox({ label, value, color }) {
  return (
    <div style={{ background: 'var(--bg-secondary, #f9fafb)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: 6, padding: '16px', textAlign: 'center' }}>
      <div style={{ fontSize: 32, fontWeight: 900, color }}>{value}</div>
      <div style={{ fontSize: 12, color: 'var(--text-secondary, #6b7280)', marginTop: 4 }}>{label}</div>
    </div>
  );
}

'use client';

import { useState } from 'react';

export default function DeepSeoAuditPage() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [activeNav, setActiveNav] = useState('audit');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  return (
    <div className={isDark ? 'indexscan-dark' : 'indexscan-light'} id="indexscan-audit-root">
      <style>{`
        #indexscan-audit-root {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          transition: background 0.2s, color 0.2s;
        }
        .indexscan-light {
          background: #f8fafc;
          color: #0f172a;
        }
        .indexscan-dark {
          background: #030712;
          color: #f8fafc;
        }

        /* ─── HEADER ─── */
        .ic-header {
          position: sticky;
          top: 0;
          z-index: 40;
          width: 100%;
          border-bottom: 1px solid;
          backdrop-filter: blur(12px);
          transition: background 0.2s, border-color 0.2s;
        }
        .indexscan-light .ic-header {
          background: rgba(255,255,255,0.9);
          border-color: #e2e8f0;
        }
        .indexscan-dark .ic-header {
          background: rgba(3,7,18,0.9);
          border-color: #1e293b;
        }
        .ic-header-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .ic-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          cursor: pointer;
        }
        .ic-logo-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: #2563eb;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 12px rgba(37,99,235,0.2);
          flex-shrink: 0;
          transition: background 0.2s;
        }
        .ic-logo-icon:hover { background: #1d4ed8; }
        .ic-logo-text {
          font-size: 1.2rem;
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1;
        }
        .indexscan-light .ic-logo-text { color: #0f172a; }
        .indexscan-dark .ic-logo-text { color: #f8fafc; }
        .ic-logo-text span { color: #2563eb; }
        .ic-badge-api {
          display: inline-block;
          margin-left: 8px;
          padding: 2px 6px;
          font-size: 10px;
          font-weight: 700;
          border-radius: 4px;
          border: 1px solid;
          line-height: 1.4;
        }
        .indexscan-light .ic-badge-api {
          background: #eff6ff;
          color: #2563eb;
          border-color: rgba(37,99,235,0.3);
        }
        .indexscan-dark .ic-badge-api {
          background: rgba(30,58,138,0.5);
          color: #93c5fd;
          border-color: #1e3a8a;
        }
        .ic-nav {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        @media (max-width: 768px) { .ic-nav { display: none; } }
        .ic-nav-btn {
          padding: 8px 14px;
          font-size: 0.875rem;
          font-weight: 500;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.15s;
          display: flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          text-decoration: none;
        }
        .indexscan-light .ic-nav-btn {
          color: #475569;
        }
        .indexscan-light .ic-nav-btn:hover {
          color: #0f172a;
          background: #f1f5f9;
        }
        .indexscan-dark .ic-nav-btn {
          color: #94a3b8;
        }
        .indexscan-dark .ic-nav-btn:hover {
          color: #f8fafc;
          background: #1e293b;
        }
        .ic-nav-btn-audit {
          font-weight: 700 !important;
          border: 1px solid !important;
        }
        .indexscan-light .ic-nav-btn-audit {
          color: #065f46 !important;
          background: #ecfdf5 !important;
          border-color: #6ee7b7 !important;
        }
        .indexscan-dark .ic-nav-btn-audit {
          color: #6ee7b7 !important;
          background: rgba(6,78,59,0.5) !important;
          border-color: #065f46 !important;
        }
        .ic-new-badge {
          padding: 1px 6px;
          font-size: 9px;
          font-weight: 800;
          text-transform: uppercase;
          background: #10b981;
          color: white;
          border-radius: 999px;
        }
        .ic-header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .ic-theme-btn {
          padding: 8px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          background: transparent;
          transition: all 0.15s;
          display: flex;
          align-items: center;
        }
        .indexscan-light .ic-theme-btn { color: #64748b; }
        .indexscan-light .ic-theme-btn:hover { color: #0f172a; background: #f1f5f9; }
        .indexscan-dark .ic-theme-btn { color: #64748b; }
        .indexscan-dark .ic-theme-btn:hover { color: #f8fafc; background: #1e293b; }
        .ic-audit-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          font-size: 0.75rem;
          font-weight: 600;
          color: white;
          background: #059669;
          border: 1px solid #10b981;
          border-radius: 8px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.15s;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .ic-audit-cta:hover { background: #047857; }

        /* ─── MAIN ─── */
        .ic-main {
          flex: 1;
          max-width: 1280px;
          margin: 0 auto;
          padding: 40px 1.5rem;
          width: 100%;
        }

        /* ─── HERO ─── */
        .ic-hero {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 40px;
        }
        .ic-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 700;
          margin-bottom: 16px;
          border: 1px solid;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        .indexscan-light .ic-hero-badge {
          background: #ecfdf5;
          color: #065f46;
          border-color: #6ee7b7;
        }
        .indexscan-dark .ic-hero-badge {
          background: rgba(6,78,59,0.5);
          color: #6ee7b7;
          border-color: #065f46;
        }
        .ic-hero h1 {
          font-size: clamp(1.875rem, 5vw, 3rem);
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 1.1;
          margin: 0 0 12px;
        }
        .indexscan-light .ic-hero h1 { color: #0f172a; }
        .indexscan-dark .ic-hero h1 { color: #f8fafc; }
        .ic-gradient-text {
          background: linear-gradient(135deg, #059669, #0d9488, #2563eb);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .indexscan-dark .ic-gradient-text {
          background: linear-gradient(135deg, #34d399, #2dd4bf, #60a5fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ic-hero p {
          font-size: 1rem;
          line-height: 1.6;
          margin: 0;
        }
        .indexscan-light .ic-hero p { color: #475569; }
        .indexscan-dark .ic-hero p { color: #94a3b8; }

        /* ─── FORM CARD ─── */
        .ic-form-card {
          max-width: 760px;
          margin: 0 auto 40px;
          border-radius: 16px;
          border: 1px solid;
          padding: 32px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
        }
        .indexscan-light .ic-form-card {
          background: white;
          border-color: #e2e8f0;
        }
        .indexscan-dark .ic-form-card {
          background: #0f172a;
          border-color: #1e293b;
        }
        .ic-form-label {
          display: block;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .indexscan-light .ic-form-label { color: #374151; }
        .indexscan-dark .ic-form-label { color: #94a3b8; }
        .ic-input-wrap {
          position: relative;
          margin-bottom: 16px;
        }
        .ic-input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          pointer-events: none;
          display: flex;
        }
        .ic-input {
          width: 100%;
          padding: 14px 16px 14px 44px;
          font-size: 1rem;
          border-radius: 12px;
          border: 1px solid;
          outline: none;
          transition: all 0.15s;
          box-sizing: border-box;
        }
        .indexscan-light .ic-input {
          background: rgba(248,250,252,0.5);
          border-color: #cbd5e1;
          color: #0f172a;
        }
        .indexscan-light .ic-input::placeholder { color: #94a3b8; }
        .indexscan-light .ic-input:focus {
          border-color: transparent;
          box-shadow: 0 0 0 2px #10b981;
          background: white;
        }
        .indexscan-dark .ic-input {
          background: rgba(30,41,59,0.6);
          border-color: #334155;
          color: #f8fafc;
        }
        .indexscan-dark .ic-input::placeholder { color: #64748b; }
        .indexscan-dark .ic-input:focus {
          border-color: transparent;
          box-shadow: 0 0 0 2px #10b981;
          background: #1e293b;
        }
        .ic-submit-btn {
          width: 100%;
          padding: 16px 24px;
          border-radius: 12px;
          background: linear-gradient(135deg, #059669, #0d9488);
          color: white;
          font-weight: 700;
          font-size: 1rem;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(5,150,105,0.2);
        }
        .ic-submit-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #047857, #0f766e);
          box-shadow: 0 6px 16px rgba(5,150,105,0.3);
          transform: translateY(-1px);
        }
        .ic-submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .ic-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: ic-spin 0.8s linear infinite;
        }
        @keyframes ic-spin { to { transform: rotate(360deg); } }

        /* ─── FOOTER ─── */
        .ic-footer {
          border-top: 1px solid;
          transition: border-color 0.2s;
        }
        .indexscan-light .ic-footer {
          background: #f8fafc;
          border-color: #e2e8f0;
        }
        .indexscan-dark .ic-footer {
          background: #030712;
          border-color: #1e293b;
        }
        .ic-footer-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 40px 1.5rem;
        }
        .ic-footer-top {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding-bottom: 32px;
          border-bottom: 1px solid;
          margin-bottom: 24px;
        }
        @media (min-width: 768px) {
          .ic-footer-top {
            flex-direction: row;
            align-items: center;
          }
        }
        .indexscan-light .ic-footer-top { border-color: #e2e8f0; }
        .indexscan-dark .ic-footer-top { border-color: #1e293b; }
        .ic-footer-logo-text {
          font-size: 1.125rem;
          font-weight: 900;
          letter-spacing: -0.03em;
        }
        .indexscan-light .ic-footer-logo-text { color: #0f172a; }
        .indexscan-dark .ic-footer-logo-text { color: #f8fafc; }
        .ic-footer-logo-text span { color: #2563eb; }
        .ic-footer-tagline {
          font-size: 0.75rem;
          margin-top: 4px;
        }
        .indexscan-light .ic-footer-tagline { color: #64748b; }
        .indexscan-dark .ic-footer-tagline { color: #475569; }
        .ic-built-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 12px;
          border: 1px solid;
          font-size: 0.75rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        .indexscan-light .ic-built-badge {
          background: white;
          border-color: #e2e8f0;
          color: #475569;
        }
        .indexscan-dark .ic-built-badge {
          background: #0f172a;
          border-color: #1e293b;
          color: #94a3b8;
        }
        .ic-built-by {
          font-size: 0.875rem;
          font-weight: 700;
          background: linear-gradient(135deg, #2563eb, #4f46e5);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ic-heart {
          animation: ic-pulse 1.5s ease-in-out infinite;
        }
        @keyframes ic-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        .ic-footer-bottom {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          font-size: 0.6875rem;
        }
        @media (min-width: 640px) { .ic-footer-bottom { flex-direction: row; } }
        .indexscan-light .ic-footer-bottom { color: #94a3b8; }
        .indexscan-dark .ic-footer-bottom { color: #475569; }
        .ic-footer-copy {
          font-weight: 600;
        }
        .indexscan-light .ic-footer-copy { color: #475569; }
        .indexscan-dark .ic-footer-copy { color: #94a3b8; }
      `}</style>

      {/* ── HEADER ── */}
      <header className="ic-header">
        <div className="ic-header-inner">
          {/* Logo */}
          <a href="/tools/deep-seo-audit" className="ic-logo">
            <div className="ic-logo-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.5"/>
                <path d="m9 11 3 3L22 4"/>
              </svg>
            </div>
            <div>
              <span className="ic-logo-text">INDEX<span>CHECK</span></span>
              <span className="ic-badge-api">API-FREE</span>
            </div>
          </a>

          {/* Nav */}
          <nav className="ic-nav">
            <button className="ic-nav-btn" onClick={() => setActiveNav('website')}>Website Checker</button>
            <button className="ic-nav-btn" onClick={() => setActiveNav('bulk')}>Bulk URL Checker</button>
            <button className="ic-nav-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color:'#f59e0b'}}>
                <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
              </svg>
              Instant Indexer
            </button>
            <a href="/tools/deep-seo-audit" className="ic-nav-btn ic-nav-btn-audit">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
                <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
                <path d="M8 13h2"/><path d="M14 13h2"/>
                <path d="M8 17h2"/><path d="M14 17h2"/>
              </svg>
              Deep Audit &amp; Excel
              <span className="ic-new-badge">New</span>
            </a>
            <button className="ic-nav-btn">How It Works</button>
          </nav>

          {/* Actions */}
          <div className="ic-header-actions">
            <button
              className="ic-theme-btn"
              aria-label="Toggle theme"
              onClick={() => setIsDark(!isDark)}
            >
              {isDark ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4"/>
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                </svg>
              )}
            </button>
            <a href="/tools/deep-seo-audit" className="ic-audit-cta">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
                <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
                <path d="M8 13h2"/><path d="M14 13h2"/>
                <path d="M8 17h2"/><path d="M14 17h2"/>
              </svg>
              Audit Website
            </a>
          </div>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="ic-main">

        {/* Hero */}
        <div className="ic-hero">
          <div className="ic-hero-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
              <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
              <path d="M8 13h2"/><path d="M14 13h2"/>
              <path d="M8 17h2"/><path d="M14 17h2"/>
            </svg>
            Deep SEO Audit &amp; Professional 8-Sheet Excel Generator
          </div>

          <h1>
            Audit Any Website &amp; Download{' '}
            <span className="ic-gradient-text">Excel Report</span>
          </h1>

          <p>
            Perform an exhaustive 26+ point technical and on-page SEO inspection. Instant grade, issue
            diagnosis, and client-ready Excel workbook export with complete image URLs.
          </p>
        </div>

        {/* Form Card */}
        <div className="ic-form-card">
          <form onSubmit={handleSubmit}>
            <label htmlFor="audit-url-input" className="ic-form-label">
              Enter Website URL to Audit
            </label>
            <div className="ic-input-wrap">
              <span className="ic-input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
                  <path d="M2 12h20"/>
                </svg>
              </span>
              <input
                id="audit-url-input"
                type="text"
                className="ic-input"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              className="ic-submit-btn"
              disabled={isLoading || !url.trim()}
            >
              {isLoading ? (
                <>
                  <div className="ic-spinner" />
                  <span>Running Deep SEO Audit...</span>
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.3-4.3"/>
                  </svg>
                  <span>Start Deep SEO Audit</span>
                </>
              )}
            </button>
          </form>
        </div>

      </main>

      {/* ── FOOTER ── */}
      <footer className="ic-footer">
        <div className="ic-footer-inner">
          <div className="ic-footer-top">
            <div style={{textAlign:'left'}}>
              <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                <div style={{width:'28px',height:'28px',borderRadius:'8px',background:'#2563eb',display:'flex',alignItems:'center',justifyContent:'center',color:'white',flexShrink:0}}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.5"/>
                    <path d="m9 11 3 3L22 4"/>
                  </svg>
                </div>
                <span className="ic-footer-logo-text">INDEX<span>CHECK</span></span>
              </div>
              <p className="ic-footer-tagline">Check Which URLs Are Visible on Google &amp; Request Fast Indexing</p>
            </div>

            <div className="ic-built-badge">
              <span>Designed &amp; Built with</span>
              <svg className="ic-heart" width="14" height="14" viewBox="0 0 24 24" fill="#f43f5e" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
              <span>by</span>
              <span className="ic-built-by">Saleh</span>
            </div>
          </div>

          <div className="ic-footer-bottom">
            <p>Google is a trademark of Google LLC. IndexCheck is an independent SEO utility tool not affiliated with or endorsed by Google LLC.</p>
            <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
              <span>Ephemeral Processing</span>
              <span>•</span>
              <span className="ic-footer-copy">© 2026 Saleh</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

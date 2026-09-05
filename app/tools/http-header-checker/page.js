"use client";

import { useState } from "react";
import Link from "next/link";

export default function HttpHeaderChecker() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCheck = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/tools/http-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setResult(data);
      } else {
        setError(data.error || "Failed to inspect headers");
      }
    } catch (err) {
      setError("Network error while connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-single-page">
      <section className="page-header-section">
        <div className="container text-center">
          <Link href="/tools" className="tool-back-link"><i className="fa-solid fa-arrow-left"></i> All Tools</Link>
          <div className="sub-badge mt-2">Server Response & Security</div>
          <h1 className="page-title">HTTP Header & 301 Redirect Checker</h1>
          <p className="page-subtitle max-w-2xl mx-auto">
            Inspect live HTTP status codes (200, 301, 302, 404, 500), server latency, SSL certificate status, and security headers.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container max-w-4xl">
          <div className="tool-card-container">
            <form onSubmit={handleCheck} className="tool-input-row">
              <input 
                type="text" 
                placeholder="Enter URL (e.g. https://example.com/old-page)" 
                value={url}
                onChange={(e) => setUrl(e.target.value)} 
                required 
                className="form-input tool-main-input"
              />
              <button 
                type="submit" 
                disabled={loading}
                className="btn btn-primary btn-lg"
              >
                {loading ? <><i className="fa-solid fa-spinner fa-spin"></i> Checking...</> : <><i className="fa-solid fa-network-wired"></i> Inspect Headers</>}
              </button>
            </form>

            {error && (
              <div className="alert-box alert-danger mt-6">
                <i className="fa-solid fa-circle-exclamation"></i>
                <div>
                  <strong>Inspection Error</strong>
                  <p>{error}</p>
                </div>
              </div>
            )}

            {result && (
              <div className="tool-results-wrapper mt-8">
                {/* SUMMARY STATS */}
                <div className="http-summary-cards grid grid-cols-3 gap-4 mb-6">
                  <div className="http-stat-card p-4 rounded bg-slate-50 border text-center">
                    <span className="text-xs uppercase text-muted font-bold">Response Code</span>
                    <div className={`text-2xl font-bold mt-1 ${result.status >= 200 && result.status < 300 ? "text-success" : result.status >= 300 && result.status < 400 ? "text-warning" : "text-danger"}`}>
                      {result.status} {result.statusText}
                    </div>
                  </div>

                  <div className="http-stat-card p-4 rounded bg-slate-50 border text-center">
                    <span className="text-xs uppercase text-muted font-bold">Response Latency</span>
                    <div className="text-2xl font-bold mt-1 text-primary">
                      {result.responseTimeMs} ms
                    </div>
                  </div>

                  <div className="http-stat-card p-4 rounded bg-slate-50 border text-center">
                    <span className="text-xs uppercase text-muted font-bold">SSL Encryption</span>
                    <div className="text-2xl font-bold mt-1 text-success">
                      {result.isSecure ? "HTTPS (Secure)" : "HTTP (Insecure)"}
                    </div>
                  </div>
                </div>

                {/* REDIRECT LOCATION IF 301/302 */}
                {result.location && (
                  <div className="alert-box alert-warning mb-6">
                    <i className="fa-solid fa-arrow-right-arrow-left"></i>
                    <div>
                      <strong>Redirect Location (301/302)</strong>
                      <p className="font-mono text-sm break-all">{result.location}</p>
                    </div>
                  </div>
                )}

                {/* SECURITY HEADERS AUDIT */}
                <div className="security-headers-box mb-8">
                  <h4 className="font-bold text-lg mb-3"><i className="fa-solid fa-shield-halved text-primary"></i> Security Headers Checklist</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(result.securityHeaders).map(([secKey, secVal]) => (
                      <div key={secKey} className="p-3 border rounded flex items-center justify-between bg-white">
                        <span className="font-mono text-xs text-slate-700">{secKey}</span>
                        {secVal ? (
                          <span className="badge-pill bg-success-light text-success text-xs">Enabled</span>
                        ) : (
                          <span className="badge-pill bg-danger-light text-danger text-xs">Missing</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* RAW HEADERS */}
                <div className="raw-headers-box">
                  <h4 className="font-bold text-lg mb-3"><i className="fa-solid fa-list-check"></i> Complete HTTP Response Headers</h4>
                  <div className="bg-slate-900 text-slate-100 p-4 rounded font-mono text-xs overflow-x-auto">
                    {Object.entries(result.allHeaders).map(([k, v]) => (
                      <div key={k} className="py-1">
                        <span className="text-cyan-400">{k}:</span> <span className="text-slate-300">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";

export default function KeywordDensityChecker() {
  const [text, setText] = useState("");
  const [targetKeyword, setTargetKeyword] = useState("");

  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2);

  const totalWords = words.length;
  const readingTimeMin = Math.ceil(totalWords / 200) || 1;

  // Single word frequency
  const singleFreq = {};
  const stopWords = new Set(["the", "and", "for", "with", "this", "that", "from", "are", "was", "will", "have", "you", "your", "can", "our", "all"]);
  
  words.forEach(w => {
    if (!stopWords.has(w)) {
      singleFreq[w] = (singleFreq[w] || 0) + 1;
    }
  });

  const topWords = Object.entries(singleFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word, count]) => ({
      word,
      count,
      density: ((count / (totalWords || 1)) * 100).toFixed(1)
    }));

  // Target keyword density
  let targetDensity = "0.0";
  let targetCount = 0;
  if (targetKeyword.trim() && totalWords > 0) {
    const cleanTarget = targetKeyword.toLowerCase().trim();
    const regex = new RegExp(`\\b${cleanTarget}\\b`, 'gi');
    const matches = text.match(regex);
    targetCount = matches ? matches.length : 0;
    targetDensity = ((targetCount / totalWords) * 100).toFixed(1);
  }

  return (
    <div className="tool-single-page">
      <section className="page-header-section">
        <div className="container text-center">
          <Link href="/tools" className="tool-back-link"><i className="fa-solid fa-arrow-left"></i> All Tools</Link>
          <div className="sub-badge mt-2">Content Optimization</div>
          <h1 className="page-title">Keyword Density & Frequency Analyzer</h1>
          <p className="page-subtitle max-w-2xl mx-auto">
            Analyze keyword occurrences, prevent over-optimization penalties, and calculate content readability stats.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container max-w-4xl">
          <div className="tool-card-container">
            <div className="form-group mb-4">
              <label className="form-label">Target Focus Keyword (Optional)</label>
              <input 
                type="text" 
                placeholder="e.g., technical seo audit" 
                value={targetKeyword} 
                onChange={(e) => setTargetKeyword(e.target.value)} 
                className="form-input" 
              />
            </div>

            <div className="form-group mb-4">
              <label className="form-label">Paste Article Text or Webpage Content</label>
              <textarea 
                rows={8} 
                placeholder="Paste your content here to analyze keyword distribution and density..." 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                className="form-textarea" 
              />
            </div>

            {/* STATS OVERVIEW */}
            <div className="density-stats-bar my-6">
              <div className="density-stat-item">
                <span className="stat-value text-primary">{totalWords}</span>
                <span className="stat-label">Total Words</span>
              </div>
              <div className="density-stat-item">
                <span className="stat-value text-success">{readingTimeMin} min</span>
                <span className="stat-label">Read Time</span>
              </div>
              {targetKeyword && (
                <>
                  <div className="density-stat-item">
                    <span className="stat-value text-accent">{targetCount}</span>
                    <span className="stat-label">Keyword Occurrences</span>
                  </div>
                  <div className="density-stat-item">
                    <span className={`stat-value ${parseFloat(targetDensity) > 3.0 ? "text-danger" : "text-primary"}`}>
                      {targetDensity}%
                    </span>
                    <span className="stat-label">Focus Density</span>
                  </div>
                </>
              )}
            </div>

            {parseFloat(targetDensity) > 3.0 && (
              <div className="alert-box alert-warning mb-6">
                <i className="fa-solid fa-triangle-exclamation"></i>
                <div>
                  <strong>High Keyword Density Warning!</strong>
                  <p>Your target keyword density is {targetDensity}%. We recommend keeping focus density between 1.0% - 2.5% to avoid keyword stuffing penalties.</p>
                </div>
              </div>
            )}

            {/* TOP FREQUENT KEYWORDS */}
            {topWords.length > 0 && (
              <div className="top-keywords-section mt-8">
                <h3 className="section-title-sm mb-4">Most Frequent Semantic Terms</h3>
                <div className="table-responsive">
                  <table className="data-table-modern">
                    <thead>
                      <tr>
                        <th>Keyword Term</th>
                        <th>Occurrences</th>
                        <th>Density Percentage</th>
                        <th>Optimization Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topWords.map((item, idx) => (
                        <tr key={idx}>
                          <td><strong>{item.word}</strong></td>
                          <td>{item.count}x</td>
                          <td>{item.density}%</td>
                          <td>
                            {parseFloat(item.density) > 3.5 ? (
                              <span className="badge-pill bg-danger-light text-danger">Over-Optimized</span>
                            ) : (
                              <span className="badge-pill bg-success-light text-success">Healthy Natural</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

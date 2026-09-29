"use client";

import { useState, useMemo } from "react";
import ToolFaqAccordion from "@/components/ToolFaqAccordion";

const STOP_WORDS = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't",
  "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by",
  "can't", "cannot", "could", "couldn't", "did", "didn't", "do", "does", "doesn't", "doing", "don't",
  "down", "during", "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't", "have",
  "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself", "him",
  "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't",
  "it", "it's", "its", "itself", "let's", "me", "more", "most", "mustn't", "my", "myself", "no", "nor",
  "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out",
  "over", "own", "same", "shan't", "she", "she'd", "she'll", "she's", "should", "shouldn't", "so", "some",
  "such", "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then", "there",
  "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this", "those", "through", "to",
  "too", "under", "until", "up", "very", "was", "wasn't", "we", "we'd", "we'll", "we're", "we've", "were",
  "weren't", "what", "what's", "when", "when's", "where", "where's", "which", "while", "who", "who's",
  "whom", "why", "why's", "with", "won't", "would", "wouldn't", "you", "you'd", "you'll", "you're",
  "you've", "your", "yours", "yourself", "yourselves"
]);

export default function WordCounterSeoAnalyzerPage() {
  const [text, setText] = useState(
    "Search Engine Optimization (SEO) is the science of improving website visibility in organic search engine results. By executing technical SEO audits, building high-authority backlinks, and creating intent-matched content clusters, businesses can dominate Google SERPs and drive compounding organic revenue."
  );
  const [filterStopWords, setFilterStopWords] = useState(true);
  const [ngramType, setNgramType] = useState(1); // 1, 2, 3
  const [copied, setCopied] = useState(false);

  // Statistics Calculation
  const stats = useMemo(() => {
    const rawText = text.trim();
    if (!rawText) {
      return {
        words: 0,
        charsWithSpaces: 0,
        charsNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        readingTimeMin: 0,
        speakingTimeMin: 0,
        fleschScore: 100,
        fleschGrade: "Very Easy",
      };
    }

    const wordsArray = rawText.split(/\s+/).filter(Boolean);
    const words = wordsArray.length;
    const charsWithSpaces = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;

    // Sentences: match ending punctuation (. ! ?)
    const sentencesArray = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const sentences = Math.max(1, sentencesArray.length);

    // Paragraphs: split by double newlines or single non-empty lines
    const paragraphsArray = text.split(/\n+/).filter((p) => p.trim().length > 0);
    const paragraphs = Math.max(1, paragraphsArray.length);

    // Reading & Speaking Time
    const readingTimeMin = (words / 220).toFixed(1);
    const speakingTimeMin = (words / 130).toFixed(1);

    // Flesch Reading Ease Approximation
    // Formula: 206.835 - 1.015 * (total words / total sentences) - 84.6 * (total syllables / total words)
    let syllables = 0;
    wordsArray.forEach((w) => {
      const cleanW = w.toLowerCase().replace(/[^a-z]/g, "");
      if (cleanW.length <= 3) {
        syllables += 1;
      } else {
        const matches = cleanW.match(/[aeiouy]{1,2}/g);
        syllables += matches ? matches.length : 1;
      }
    });

    const avgWordsPerSentence = words / sentences;
    const avgSyllablesPerWord = syllables / words;
    let flesch = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);
    flesch = Math.max(0, Math.min(100, Math.round(flesch)));

    let fleschGrade = "Standard";
    if (flesch >= 90) fleschGrade = "Very Easy (5th Grade)";
    else if (flesch >= 80) fleschGrade = "Easy (6th Grade)";
    else if (flesch >= 70) fleschGrade = "Fairly Easy (7th Grade)";
    else if (flesch >= 60) fleschGrade = "Standard (8th-9th Grade - Best for SEO)";
    else if (flesch >= 50) fleschGrade = "Fairly Difficult (High School)";
    else if (flesch >= 30) fleschGrade = "Difficult (College)";
    else fleschGrade = "Very Confusing (Academic)";

    return {
      words,
      charsWithSpaces,
      charsNoSpaces,
      sentences,
      paragraphs,
      readingTimeMin,
      speakingTimeMin,
      fleschScore: flesch,
      fleschGrade,
    };
  }, [text]);

  // Keyword Density Calculation
  const keywordDensity = useMemo(() => {
    const rawText = text.toLowerCase().replace(/[^a-z0-9\s]/g, " ");
    const words = rawText.split(/\s+/).filter((w) => w.length > 1);
    const totalWords = words.length;
    if (totalWords === 0) return [];

    const frequencyMap = {};

    if (ngramType === 1) {
      words.forEach((w) => {
        if (filterStopWords && STOP_WORDS.has(w)) return;
        frequencyMap[w] = (frequencyMap[w] || 0) + 1;
      });
    } else if (ngramType === 2) {
      for (let i = 0; i < words.length - 1; i++) {
        const w1 = words[i];
        const w2 = words[i + 1];
        if (filterStopWords && (STOP_WORDS.has(w1) && STOP_WORDS.has(w2))) continue;
        const phrase = `${w1} ${w2}`;
        frequencyMap[phrase] = (frequencyMap[phrase] || 0) + 1;
      }
    } else if (ngramType === 3) {
      for (let i = 0; i < words.length - 2; i++) {
        const w1 = words[i];
        const w2 = words[i + 1];
        const w3 = words[i + 2];
        const phrase = `${w1} ${w2} ${w3}`;
        frequencyMap[phrase] = (frequencyMap[phrase] || 0) + 1;
      }
    }

    const sorted = Object.entries(frequencyMap)
      .map(([term, count]) => ({
        term,
        count,
        density: ((count / totalWords) * 100).toFixed(1),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return sorted;
  }, [text, filterStopWords, ngramType]);

  // Text Transform Utilities
  const toTitleCase = () => {
    const res = text.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
    setText(res);
  };

  const toSentenceCase = () => {
    const res = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
    setText(res);
  };

  const toUppercase = () => setText(text.toUpperCase());
  const toLowercase = () => setText(text.toLowerCase());

  const removeExtraSpaces = () => {
    const clean = text.replace(/[ \t]+/g, " ").replace(/\n\s*\n/g, "\n\n").trim();
    setText(clean);
  };

  const copyText = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const faqs = [
    {
      q: "What is the ideal word count for an SEO blog post?",
      a: "For comprehensive ranking in competitive niches, in-depth long-form articles between 1,500 to 2,500 words consistently perform best on Google. For transactional pages and local service pages, 600 to 1,000 words of highly focused, conversion-optimized copy is optimal."
    },
    {
      q: "What is the recommended keyword density for Google SEO?",
      a: "The ideal keyword density is between 1.0% and 2.5%. Anything above 3.5% risks triggering Google's helpful content and keyword-stuffing spam algorithms. Focus on natural variations, LSI synonyms, and semantic n-grams."
    },
    {
      q: "What is the ideal character limit for SEO Meta Titles and Descriptions?",
      a: "Google Meta Titles should be 50 to 60 characters (under 600px width) so they don't get truncated with ellipses (...). Meta Descriptions should be between 120 and 158 characters (under 960px width)."
    },
    {
      q: "What is a good Flesch Reading Ease score for web content?",
      a: "A score between 60 and 70 (Plain English / 8th-9th grade reading level) is ideal for web visitors and AI search retrieval. It ensures your content is effortlessly readable and engaging across all audience demographics."
    }
  ];

  return (
    <div className="tool-page-container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px 80px" }}>
      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "36px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#dcfce7", color: "#15803d", padding: "6px 14px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 700, marginBottom: "12px", border: "1px solid #bbf7d0" }}>
          <i className="fa-solid fa-feather-pointed"></i> Real-Time Content Analyzer &amp; Readability
        </div>
        <h1 style={{ fontSize: "2.4rem", fontWeight: 900, color: "#0f172a", marginBottom: "12px", lineHeight: 1.2 }}>
          Word Counter &amp; <span style={{ color: "#2563eb" }}>SEO Content Analyzer</span>
        </h1>
        <p style={{ fontSize: "1.05rem", color: "#475569", maxWidth: "780px", margin: "0 auto", lineHeight: 1.6 }}>
          Analyze word count, character density, reading level, keyword frequency, and Google SERP length limits in real time.
        </p>
      </div>

      {/* KPI METRIC CARDS ROW */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "14px", marginBottom: "24px" }}>
        <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "18px 16px", textAlign: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.02)" }}>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>Total Words</span>
          <div style={{ fontSize: "1.9rem", fontWeight: 900, color: "#2563eb", marginTop: "2px" }}>{stats.words.toLocaleString()}</div>
        </div>

        <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "18px 16px", textAlign: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.02)" }}>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>Characters</span>
          <div style={{ fontSize: "1.9rem", fontWeight: 900, color: "#059669", marginTop: "2px" }}>{stats.charsWithSpaces.toLocaleString()}</div>
          <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>{stats.charsNoSpaces} no spaces</span>
        </div>

        <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "18px 16px", textAlign: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.02)" }}>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>Sentences / Paras</span>
          <div style={{ fontSize: "1.9rem", fontWeight: 900, color: "#7c3aed", marginTop: "2px" }}>{stats.sentences} / {stats.paragraphs}</div>
        </div>

        <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "18px 16px", textAlign: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.02)" }}>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>Reading Time</span>
          <div style={{ fontSize: "1.9rem", fontWeight: 900, color: "#d97706", marginTop: "2px" }}>~{stats.readingTimeMin} min</div>
          <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>Speech: ~{stats.speakingTimeMin}m</span>
        </div>

        <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "18px 16px", textAlign: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.02)" }}>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>Flesch Readability</span>
          <div style={{ fontSize: "1.9rem", fontWeight: 900, color: stats.fleschScore >= 60 ? "#059669" : "#ea580c", marginTop: "2px" }}>
            {stats.fleschScore}/100
          </div>
          <span style={{ fontSize: "0.72rem", color: "#64748b" }}>{stats.fleschGrade.split("(")[0]}</span>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "24px", alignItems: "start" }}>
        {/* TEXT INPUT & UTILITY TOOLBAR */}
        <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
          {/* TOOLBAR */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px", marginBottom: "14px", borderBottom: "1px solid #f1f5f9", paddingBottom: "12px" }}>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={toTitleCase}
                style={{ padding: "6px 10px", borderRadius: "4px", border: "1px solid #cbd5e1", background: "#f8fafc", fontSize: "0.8rem", fontWeight: 700, color: "#334155", cursor: "pointer" }}
              >
                Aa Title Case
              </button>
              <button
                type="button"
                onClick={toSentenceCase}
                style={{ padding: "6px 10px", borderRadius: "4px", border: "1px solid #cbd5e1", background: "#f8fafc", fontSize: "0.8rem", fontWeight: 700, color: "#334155", cursor: "pointer" }}
              >
                Sentence case
              </button>
              <button
                type="button"
                onClick={toUppercase}
                style={{ padding: "6px 10px", borderRadius: "4px", border: "1px solid #cbd5e1", background: "#f8fafc", fontSize: "0.8rem", fontWeight: 700, color: "#334155", cursor: "pointer" }}
              >
                UPPER
              </button>
              <button
                type="button"
                onClick={toLowercase}
                style={{ padding: "6px 10px", borderRadius: "4px", border: "1px solid #cbd5e1", background: "#f8fafc", fontSize: "0.8rem", fontWeight: 700, color: "#334155", cursor: "pointer" }}
              >
                lower
              </button>
              <button
                type="button"
                onClick={removeExtraSpaces}
                style={{ padding: "6px 10px", borderRadius: "4px", border: "1px solid #cbd5e1", background: "#f8fafc", fontSize: "0.8rem", fontWeight: 700, color: "#334155", cursor: "pointer" }}
              >
                🧹 Clean Spaces
              </button>
            </div>

            <div style={{ display: "flex", gap: "6px" }}>
              <button
                type="button"
                onClick={copyText}
                style={{ padding: "6px 12px", borderRadius: "4px", border: "none", background: copied ? "#059669" : "#2563eb", color: "#ffffff", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
              >
                <i className={`fa-solid ${copied ? "fa-check" : "fa-copy"}`}></i>
                {copied ? "Copied" : "Copy"}
              </button>
              <button
                type="button"
                onClick={() => setText("")}
                style={{ padding: "6px 10px", borderRadius: "4px", border: "1px solid #fca5a5", background: "#fef2f2", color: "#dc2626", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer" }}
              >
                Clear
              </button>
            </div>
          </div>

          {/* TEXTAREA */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text, blog article, meta tags, or copy here to analyze..."
            rows={12}
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "4px",
              border: "1px solid #cbd5e1",
              fontSize: "0.95rem",
              lineHeight: 1.7,
              color: "#0f172a",
              outline: "none",
              resize: "vertical",
              fontFamily: "inherit",
            }}
          ></textarea>

          {/* SEO LENGTH METERS */}
          <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "14px" }}>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
              🎯 SEO SERP Limits &amp; Article Targets
            </h4>

            {/* Meta Title */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: "4px" }}>
                <span>Google Meta Title ({stats.charsWithSpaces} / 60 chars)</span>
                <strong style={{ color: stats.charsWithSpaces >= 50 && stats.charsWithSpaces <= 60 ? "#059669" : stats.charsWithSpaces > 60 ? "#dc2626" : "#64748b" }}>
                  {stats.charsWithSpaces >= 50 && stats.charsWithSpaces <= 60 ? "✅ Optimal" : stats.charsWithSpaces > 60 ? "⚠️ Truncated" : "Too Short"}
                </strong>
              </div>
              <div style={{ width: "100%", height: "6px", background: "#f1f5f9", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ width: `${Math.min(100, (stats.charsWithSpaces / 60) * 100)}%`, height: "100%", background: stats.charsWithSpaces >= 50 && stats.charsWithSpaces <= 60 ? "#10b981" : stats.charsWithSpaces > 60 ? "#ef4444" : "#3b82f6" }}></div>
              </div>
            </div>

            {/* Meta Description */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: "4px" }}>
                <span>Google Meta Description ({stats.charsWithSpaces} / 160 chars)</span>
                <strong style={{ color: stats.charsWithSpaces >= 120 && stats.charsWithSpaces <= 160 ? "#059669" : stats.charsWithSpaces > 160 ? "#dc2626" : "#64748b" }}>
                  {stats.charsWithSpaces >= 120 && stats.charsWithSpaces <= 160 ? "✅ Optimal" : stats.charsWithSpaces > 160 ? "⚠️ Truncated" : "Too Short"}
                </strong>
              </div>
              <div style={{ width: "100%", height: "6px", background: "#f1f5f9", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ width: `${Math.min(100, (stats.charsWithSpaces / 160) * 100)}%`, height: "100%", background: stats.charsWithSpaces >= 120 && stats.charsWithSpaces <= 160 ? "#10b981" : stats.charsWithSpaces > 160 ? "#ef4444" : "#3b82f6" }}></div>
              </div>
            </div>

            {/* Long Form Article */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: "4px" }}>
                <span>Long-Form SEO Article Target ({stats.words.toLocaleString()} / 1,500 words)</span>
                <strong style={{ color: stats.words >= 1500 ? "#059669" : "#64748b" }}>
                  {stats.words >= 1500 ? "🏆 Deep Article" : `${Math.round((stats.words / 1500) * 100)}% Complete`}
                </strong>
              </div>
              <div style={{ width: "100%", height: "6px", background: "#f1f5f9", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ width: `${Math.min(100, (stats.words / 1500) * 100)}%`, height: "100%", background: stats.words >= 1500 ? "#10b981" : "#8b5cf6" }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* KEYWORD DENSITY & FREQUENCY TABLE */}
        <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
              📊 Keyword Frequency &amp; Density
            </h3>

            {/* N-GRAM SELECTOR */}
            <div style={{ display: "inline-flex", background: "#f1f5f9", padding: "2px", borderRadius: "4px" }}>
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setNgramType(n)}
                  style={{
                    padding: "4px 10px",
                    borderRadius: "4px",
                    border: "none",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    background: ngramType === n ? "#2563eb" : "transparent",
                    color: ngramType === n ? "#ffffff" : "#475569",
                  }}
                >
                  {n}-Word
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              type="checkbox"
              id="stop_cb"
              checked={filterStopWords}
              onChange={(e) => setFilterStopWords(e.target.checked)}
              style={{ width: "16px", height: "16px", accentColor: "#2563eb", cursor: "pointer" }}
            />
            <label htmlFor="stop_cb" style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600, cursor: "pointer" }}>
              Filter common stop words (a, the, in, of, and...)
            </label>
          </div>

          {keywordDensity.length === 0 ? (
            <p style={{ color: "#94a3b8", fontSize: "0.88rem", fontStyle: "italic", textAlign: "center", padding: "24px 0" }}>
              Enter more text above to see keyword density analysis.
            </p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.86rem", textAlign: "left" }}>
              <thead>
                <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                  <th style={{ padding: "8px 10px", fontWeight: 700, color: "#475569" }}>Keyword / Phrase</th>
                  <th style={{ padding: "8px 10px", fontWeight: 700, color: "#475569", textAlign: "center" }}>Count</th>
                  <th style={{ padding: "8px 10px", fontWeight: 700, color: "#475569", textAlign: "right" }}>Density</th>
                </tr>
              </thead>
              <tbody>
                {keywordDensity.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "8px 10px", fontWeight: 600, color: "#0f172a" }}>{row.term}</td>
                    <td style={{ padding: "8px 10px", color: "#2563eb", fontWeight: 700, textAlign: "center" }}>{row.count}</td>
                    <td style={{ padding: "8px 10px", textAlign: "right" }}>
                      <span
                        style={{
                          padding: "2px 8px",
                          borderRadius: "4px",
                          fontSize: "0.78rem",
                          fontWeight: 700,
                          background: Number(row.density) > 3.5 ? "#fef2f2" : "#f0fdf4",
                          color: Number(row.density) > 3.5 ? "#dc2626" : "#15803d",
                        }}
                      >
                        {row.density}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* FAQ ACCORDION */}
      <ToolFaqAccordion faqs={faqs} title="SEO Word Count &amp; Content Optimization FAQ" />
    </div>
  );
}

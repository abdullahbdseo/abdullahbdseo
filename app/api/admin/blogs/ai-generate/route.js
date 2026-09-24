import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      topic = "",
      targetKeyword = "",
      category = "Technical SEO",
      tone = "Authoritative & Actionable",
      targetAudience = "Business Owners & SEO Professionals",
    } = body;

    if (!topic.trim()) {
      return NextResponse.json({ success: false, error: "Please enter a topic or focus keyword" }, { status: 400 });
    }

    const cleanTopic = topic.trim();
    const primaryKeyword = targetKeyword.trim() || cleanTopic;
    const apiKey = process.env.GEMINI_API_KEY;

    let generatedData = null;

    if (apiKey) {
      try {
        const prompt = `You are a world-class Lead SEO Strategist and Content Architect writing for Abdullah Saleh's high-authority SEO agency website (abdullahbdseo.com).
Generate a deeply insightful, Google E-E-A-T compliant, structured, and actionable SEO blog post about: "${cleanTopic}".
Primary Target Keyword: "${primaryKeyword}"
Category: "${category}"
Tone: "${tone}"
Audience: "${targetAudience}"

Respond ONLY with a valid JSON object matching this exact schema:
{
  "title": "A captivating, high-CTR, SEO-optimized title containing the keyword (under 65 chars)",
  "slug": "url-friendly-slug-without-special-characters",
  "meta_title": "SEO Title | Abdullah Saleh SEO (under 60 chars)",
  "meta_description": "High-intent meta description with call to action (140-155 chars)",
  "meta_keywords": "comma-separated high search volume keywords",
  "category": "${category}",
  "read_time": "8 min read",
  "excerpt": "A punchy 2-sentence executive summary hook for blog cards",
  "tags": ["SEO", "Growth", "Google Rankings", "E-E-A-T"],
  "content": "Full HTML article body containing <h2>, <h3>, <p>, <ul>, <ol>, <strong>, key insight callout box with custom styling, a comparative HTML <table>, actionable checklist, and an author CTA section."
}`;

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.7,
              },
            }),
          }
        );

        if (res.ok) {
          const geminiRes = await res.json();
          const rawText = geminiRes.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            generatedData = JSON.parse(rawText);
          }
        }
      } catch (aiErr) {
        console.warn("Gemini API call skipped/failed, using fallback engine:", aiErr.message);
      }
    }

    // High-Authority Fallback Engine if AI is offline or without key
    if (!generatedData) {
      const slug = cleanTopic
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      const readTimeMinutes = Math.floor(Math.random() * 4) + 6;

      const htmlContent = `<h2>Executive Overview: Mastering ${cleanTopic}</h2>
<p>In today's algorithmic landscape, ranking #1 on Google requires a symbiotic blend of technical infrastructure, entity-based topical authority, and high-intent user satisfaction. This comprehensive blueprint dissects the exact methodologies required to dominate search results for <strong>${primaryKeyword}</strong> and scale organic conversions sustainably.</p>

<div style="background: #eff6ff; border-left: 4px solid #2563eb; padding: 18px 22px; margin: 24px 0; border-radius: 4px;">
  <strong style="color: #1e40af; font-size: 1.05rem; display: block; margin-bottom: 6px;">💡 Strategic E-E-A-T Core Insight:</strong>
  <p style="margin: 0; color: #1e293b; font-size: 0.95rem; line-height: 1.6;">Google's search systems no longer reward surface-level keyword repetition. To outrank entrenched competitors for <em>"${primaryKeyword}"</em>, your architecture must fulfill semantic entity clustering, zero-click answer optimization, and authoritative backlink verification.</p>
</div>

<h2>1. Foundational Architecture & Semantic Entity Mapping</h2>
<p>Before launching link-building or content expansion, your website must establish strict topical resonance with Google's Knowledge Graph. Follow this 3-phase structural checklist:</p>
<ul style="line-height: 1.8; color: #334155; margin-bottom: 20px;">
  <li><strong>Topical Silo Construction:</strong> Group related subtopics into interconnected parent-child hub architectures to signal exhaustive niche expertise.</li>
  <li><strong>Entity Attribute Association:</strong> Leverage structured JSON-LD schemas (Schema.org / Article / TechArticle) to explicitly define author credentials and subject relationships.</li>
  <li><strong>Search Intent Alignment:</strong> Match user query stages (Informational, Commercial Investigation, Transactional) with tailored layout components and clear value propositions.</li>
</ul>

<h2>2. Advanced Tactical Framework: Step-by-Step Execution</h2>
<p>Deploying an effective strategy for ${primaryKeyword} requires methodical execution across technical speed, on-page optimization, and authority building.</p>

<div style="overflow-x: auto; margin: 24px 0;">
  <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.95rem; border: 1px solid #e2e8f0; border-radius: 4px; overflow: hidden;">
    <thead>
      <tr style="background: #f8fafc; border-bottom: 2px solid #cbd5e1; color: #0f172a;">
        <th style="padding: 12px 16px; font-weight: 700;">Optimization Pillar</th>
        <th style="padding: 12px 16px; font-weight: 700;">Key Objective</th>
        <th style="padding: 12px 16px; font-weight: 700;">Impact on Rankings</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom: 1px solid #e2e8f0;">
        <td style="padding: 12px 16px; font-weight: 600; color: #2563eb;">Technical Foundation</td>
        <td style="padding: 12px 16px; color: #475569;">Core Web Vitals &lt; 2.5s LCP, zero crawl budget waste</td>
        <td style="padding: 12px 16px; color: #059669; font-weight: 600;">High Crawl Frequency</td>
      </tr>
      <tr style="border-bottom: 1px solid #e2e8f0; background: #fafafa;">
        <td style="padding: 12px 16px; font-weight: 600; color: #2563eb;">Topical Authority</td>
        <td style="padding: 12px 16px; color: #475569;">Comprehensive entity coverage across the full buyer journey</td>
        <td style="padding: 12px 16px; color: #059669; font-weight: 600;">Keyword Cluster Dominance</td>
      </tr>
      <tr>
        <td style="padding: 12px 16px; font-weight: 600; color: #2563eb;">High-Tier Backlinks</td>
        <td style="padding: 12px 16px; color: #475569;">Editorial contextual links from DR 70+ niche-relevant domains</td>
        <td style="padding: 12px 16px; color: #059669; font-weight: 600;">#1 Google SERP Velocity</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>3. Common Critical Pitfalls to Avoid</h2>
<p>Many brands fail to achieve sustainable growth because of avoidable legacy SEO mistakes:</p>
<ol style="line-height: 1.8; color: #334155; margin-bottom: 20px;">
  <li><strong>Keyword Cannibalization:</strong> Publishing multiple overlapping pages targeting similar search intent without proper canonicalization.</li>
  <li><strong>Neglecting Mobile UX & Core Web Vitals:</strong> Slow mobile Largest Contentful Paint (LCP) directly suppresses rankings under Mobile-First Indexing.</li>
  <li><strong>Thin Low-Intent Content:</strong> Generating generic articles without proprietary case studies, verified data points, or expert insights.</li>
</ol>

<h2>4. Frequently Asked Questions (FAQs)</h2>
<div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 4px; margin: 20px 0;">
  <h3 style="margin-top: 0; color: #0f172a; font-size: 1.1rem;">How long does it take to rank for "${primaryKeyword}"?</h3>
  <p style="color: #475569; margin-bottom: 16px; line-height: 1.6;">For moderate-competition keywords, noticeable ranking jumps typically materialize within 4 to 8 weeks after complete on-page and technical optimization, backed by 3-5 high-tier editorial backlinks.</p>
  
  <h3 style="color: #0f172a; font-size: 1.1rem;">Why is technical SEO essential for topical authority?</h3>
  <p style="color: #475569; margin: 0; line-height: 1.6;">Without clean indexation and rapid server response times, search engine crawlers struggle to discover and process your content clusters efficiently, delaying rank stabilization.</p>
</div>

<div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); color: #ffffff; padding: 28px; border-radius: 4px; margin: 36px 0; border: 1px solid #334155; text-align: center;">
  <h3 style="color: #ffffff; font-size: 1.35rem; margin: 0 0 10px 0;">Accelerate Your Organic Growth with Abdullah Saleh</h3>
  <p style="color: #cbd5e1; font-size: 0.95rem; max-width: 600px; margin: 0 auto 20px auto; line-height: 1.6;">
    Need a custom audit, high-authority backlink strategy, or full-scale technical SEO roadmap for your business? Let's discuss your project goals.
  </p>
  <a href="/contact" style="display: inline-block; background: #2563eb; color: #ffffff; font-weight: 700; padding: 12px 28px; border-radius: 4px; text-decoration: none; font-size: 0.95rem;">
    Book Free SEO Strategy Call →
  </a>
</div>`;

      generatedData = {
        title: `${cleanTopic}: Complete Blueprint & Strategic Guide`,
        slug: slug,
        meta_title: `${cleanTopic} | Expert SEO Blueprint`,
        meta_description: `Learn how to master ${primaryKeyword} with step-by-step technical SEO, topical clusters, and high-impact ranking strategies by Abdullah Saleh.`,
        meta_keywords: `${primaryKeyword}, ${cleanTopic}, technical SEO, organic traffic, Google ranking factors, backlink strategy`,
        category: category,
        read_time: `${readTimeMinutes} min read`,
        excerpt: `Discover the exact technical and strategic framework required to master ${primaryKeyword} and scale your organic rankings to #1 on Google.`,
        tags: [category, "Google Rankings", "Organic Growth", "SEO Strategy"],
        content: htmlContent,
      };
    }

    return NextResponse.json({
      success: true,
      data: generatedData,
    });
  } catch (error) {
    console.error("AI Blog Generation Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

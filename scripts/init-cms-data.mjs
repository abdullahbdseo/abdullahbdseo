// scripts/init-cms-data.mjs
// Run once: node scripts/init-cms-data.mjs
// Generates lib/cms-data.json from the current lib/data.js exports

import { createRequire } from "module";
import { writeFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// We need to use dynamic import since data.js is ESM
async function main() {
  const dataPath = path.join(__dirname, "../lib/data.js");
  const outPath = path.join(__dirname, "../lib/cms-data.json");

  if (existsSync(outPath)) {
    console.log("cms-data.json already exists. Delete it to regenerate.");
    process.exit(0);
  }

  // Dynamic import of lib/data.js
  const data = await import("../lib/data.js");

  const extracted = {
    siteSettings: data.siteSettings || {},
    serviceCategories: data.serviceCategories || [],
    services: (data.services || []).map(s => ({
      ...s,
      // Strip HTML content from packages descriptions for JSON safety
      packages: (s.packages || []),
      faqs: (s.faqs || []),
    })),
    blogPosts: (data.blogPosts || []).map(p => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      category: p.category,
      publish_date: p.publish_date || p.date,
      date: p.date || p.publish_date,
      read_time: p.read_time,
      featured_image: p.featured_image || p.image,
      image: p.image || p.featured_image,
      summary: p.summary || p.excerpt,
      excerpt: p.excerpt || p.summary,
      tags: p.tags || [],
      author: p.author || { name: "Abdullah Saleh", role: "SEO Specialist", bio: "", avatar: "/images/abdullah.jpg" },
      content: p.content || "",
    })),
    faqs: data.faqs || [],
    processSteps: data.processSteps || [],
    pricingPlans: data.pricingPlans || [],
    freeTools: data.freeTools || [],
  };

  writeFileSync(outPath, JSON.stringify(extracted, null, 2), "utf-8");
  console.log("✅ cms-data.json generated successfully!");
  console.log(`   Blog posts: ${extracted.blogPosts.length}`);
  console.log(`   Services: ${extracted.services.length}`);
  console.log(`   FAQs: ${extracted.faqs.length}`);
  console.log(`   Pricing plans: ${extracted.pricingPlans.length}`);
  console.log(`   Tools: ${extracted.freeTools.length}`);
}

main().catch(console.error);

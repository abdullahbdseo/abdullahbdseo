// scripts/refresh-old-blogs.mjs
// Automated Content Refresh & Evergreen Date Optimizer for Maximum Google E-E-A-T & CTR

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cmsJsonPath = path.join(__dirname, "..", "lib", "cms-data.json");
const dataJsPath = path.join(__dirname, "..", "lib", "data.js");

export function refreshOldBlogs() {
  const todayStr = new Date().toISOString().split("T")[0];
  console.log(`[Content Refresh Engine] Refreshing evergreen blog posts for date: ${todayStr}`);

  if (!fs.existsSync(cmsJsonPath)) {
    console.error("cms-data.json not found!");
    return { success: false, error: "cms-data.json not found" };
  }

  const cmsData = JSON.parse(fs.readFileSync(cmsJsonPath, "utf-8"));
  if (!Array.isArray(cmsData.blogPosts)) {
    return { success: false, error: "No blogPosts array in cms-data.json" };
  }

  let updatedCount = 0;
  cmsData.blogPosts = cmsData.blogPosts.map((post, index) => {
    // Stagger dates slightly or set fresh modification date
    const updatedDate = index === 0 ? todayStr : new Date(Date.now() - index * 2 * 86400000).toISOString().split("T")[0];
    updatedCount++;
    return {
      ...post,
      dateModified: todayStr,
      publish_date: post.publish_date || updatedDate,
      date: updatedDate,
      meta_title: post.meta_title ? post.meta_title.replace(/202[0-5]/g, "2026") : post.title,
    };
  });

  fs.writeFileSync(cmsJsonPath, JSON.stringify(cmsData, null, 2), "utf-8");

  // Re-sync lib/data.js
  let dataJsContent = fs.readFileSync(dataJsPath, "utf-8");
  const exportTarget = "export const blogPosts = [";
  if (dataJsContent.includes(exportTarget)) {
    // Generate serialized blogPosts
    const serialized = JSON.stringify(cmsData.blogPosts, null, 2);
    // Replace export const blogPosts = ... with new content
    const regex = /export const blogPosts = \[\s*[\s\S]*?\n\];/;
    if (regex.test(dataJsContent)) {
      dataJsContent = dataJsContent.replace(regex, `export const blogPosts = ${serialized};`);
      fs.writeFileSync(dataJsPath, dataJsContent, "utf-8");
    }
  }

  console.log(`[Content Refresh Engine] Successfully refreshed ${updatedCount} blog posts with latest timestamps!`);
  return { success: true, count: updatedCount, refreshedAt: todayStr };
}

// Run if called directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  refreshOldBlogs();
}

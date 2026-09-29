import { NextResponse } from "next/server";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { getDocs, collection } from "firebase/firestore";
import * as staticData from "@/lib/data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get("section");

    // Default to bundled data
    let result = {
      siteSettings: staticData.siteSettings || {},
      serviceCategories: staticData.serviceCategories || [],
      services: staticData.services || [],
      pricingPlans: staticData.pricingPlans || staticData.pricingRetainers || [],
      caseStudies: staticData.caseStudies || [],
      testimonials: staticData.testimonials || [],
      blogPosts: staticData.blogPosts || [],
      faqs: staticData.faqs || staticData.globalFaqs || [],
      processSteps: staticData.processSteps || [],
      freeTools: staticData.freeTools || [],
      backlinkCalculator: staticData.backlinkCalculator || null,
    };

    if (isFirebaseConfigured() && db) {
      try {
        const querySnapshot = await getDocs(collection(db, "cms_content"));
        if (!querySnapshot.empty) {
          querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            if (data && data.value !== undefined) {
              result[docSnap.id] = data.value;
            }
          });

          // Ensure any newly added built-in tools (like backlink-package-calculator) are not lost if Firestore has older freeTools
          if (Array.isArray(result.freeTools) && Array.isArray(staticData.freeTools)) {
            const existingSlugs = new Set(result.freeTools.map((t) => t.slug));
            staticData.freeTools.forEach((defaultTool) => {
              if (!existingSlugs.has(defaultTool.slug)) {
                result.freeTools.push(defaultTool);
              }
            });
          }

          // Ensure newly published blog posts from lib/data.js are not lost if Firestore has older blogPosts
          if (Array.isArray(result.blogPosts) && Array.isArray(staticData.blogPosts)) {
            const existingBlogSlugs = new Set(result.blogPosts.map((p) => p.slug || p.id));
            const newStaticPosts = staticData.blogPosts.filter(
              (p) => !existingBlogSlugs.has(p.slug || p.id)
            );
            if (newStaticPosts.length > 0) {
              result.blogPosts = [...newStaticPosts, ...result.blogPosts];
            }
          }

          if (!result.backlinkCalculator && staticData.backlinkCalculator) {
            result.backlinkCalculator = staticData.backlinkCalculator;
          }
        }
      } catch (fbErr) {
        console.warn("Firestore fetch error in /api/cms:", fbErr.message);
      }
    }

    if (section && result[section] !== undefined) {
      return NextResponse.json({ success: true, data: result[section] }, {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        }
      });
    }

    return NextResponse.json({ success: true, data: result }, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      }
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

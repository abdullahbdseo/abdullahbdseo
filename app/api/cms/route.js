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

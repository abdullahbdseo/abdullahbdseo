import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `AI & Automation ROI Savings Calculator | ${siteSettings.site_name}`,
  description: `Calculate hours saved, operational cost reductions, and annual financial returns by integrating AI workflows, automated lead nurturing, and CRM systems.`,
  alternates: {
    canonical: "/tools/ai-automation-savings-calculator",
  },
  openGraph: {
    title: `AI & Automation ROI Savings Calculator | ${siteSettings.site_name}`,
    description: `Calculate hours saved, operational cost reductions, and annual financial returns by integrating AI workflows, automated lead nurturing, and CRM systems.`,
    url: "/tools/ai-automation-savings-calculator",
    type: "website",
  },
};

export default function AiAutomationSavingsCalculatorLayout({ children }) {
  return children;
}

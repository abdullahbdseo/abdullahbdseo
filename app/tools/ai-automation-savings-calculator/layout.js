import { siteSettings } from "@/lib/data";

export const metadata = {
  title: `AI & Automation ROI Savings Calculator | Business Efficiency Estimator | ${siteSettings.site_name}`,
  description: `Calculate hours saved, operational cost reductions, and annual financial returns by integrating AI workflows, automated lead nurturing, and CRM systems.`,
  alternates: {
    canonical: "/tools/ai-automation-savings-calculator",
  },
  openGraph: {
    title: `AI Automation Savings Calculator | ${siteSettings.site_name}`,
    description: `Measure how much time and money AI automation can save your business.`,
    url: "/tools/ai-automation-savings-calculator",
    type: "website",
  },
};

export default function AiAutomationSavingsCalculatorLayout({ children }) {
  return children;
}

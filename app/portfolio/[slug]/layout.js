import { caseStudies, siteSettings } from "@/lib/data";

export async function generateMetadata({ params }) {
  const unwrappedParams = await params;
  const portfolio = caseStudies.find((c) => c.slug === unwrappedParams.slug);

  if (!portfolio) {
    return {
      title: `Case Study Not Found | ${siteSettings.site_name}`,
    };
  }

  const title = `${portfolio.title} - SEO Case Study | ${siteSettings.site_name}`;
  const description = portfolio.meta_description || portfolio.summary || portfolio.challenge?.substring(0, 160);

  return {
    title,
    description,
    alternates: {
      canonical: `/portfolio/${portfolio.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/portfolio/${portfolio.slug}`,
      type: "article",
    },
  };
}

export default function SinglePortfolioLayout({ children }) {
  return children;
}

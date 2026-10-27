import { caseStudies, siteSettings } from "@/lib/data";

export async function generateStaticParams() {
  return (caseStudies || []).map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }) {
  const unwrappedParams = await params;
  const portfolio = caseStudies.find((c) => c.slug === unwrappedParams.slug);

  if (!portfolio) {
    return {
      title: `Case Study Not Found | ${siteSettings.site_name}`,
    };
  }

  const title = `${portfolio.title} | Case Study | ${siteSettings.site_name}`;
  const description = (portfolio.meta_description || portfolio.summary || portfolio.challenge || "").substring(0, 155);
  const image = portfolio.featured_image || portfolio.image || "/images/seo_hero_3d.png";

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
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default function SinglePortfolioLayout({ children }) {
  return children;
}

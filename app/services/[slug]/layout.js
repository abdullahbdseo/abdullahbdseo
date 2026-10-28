import { services, siteSettings } from "@/lib/data";

export async function generateMetadata({ params }) {
  const unwrappedParams = await params;
  const service = (services || []).find((s) => s.slug === unwrappedParams.slug);
  if (!service) return { title: "SEO Service Not Found" };

  const title = `${service.title} | ${siteSettings.site_name}`;
  const description = service.short_description || service.description || `Professional ${service.title} in Bangladesh by Abdullah Saleh.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/services/${service.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function ServiceSlugLayout({ children }) {
  return children;
}

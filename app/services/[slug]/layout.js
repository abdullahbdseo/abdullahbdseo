import { services, siteSettings } from "@/lib/data";

export async function generateMetadata({ params }) {
  const unwrappedParams = await params;
  const service = services.find((s) => s.slug === unwrappedParams.slug);

  if (!service) {
    return {
      title: `Service Not Found | ${siteSettings.site_name}`,
    };
  }

  const title = `${service.title} | SEO Services in Bangladesh | ${siteSettings.site_name}`;
  const description = service.meta_description || service.short_description || service.description?.substring(0, 160);

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
  };
}

export default function SingleServiceLayout({ children }) {
  return children;
}

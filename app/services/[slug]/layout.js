import { services, siteSettings } from "@/lib/data";

export async function generateMetadata({ params }) {
  const unwrappedParams = await params;
  const service = services.find((s) => s.slug === unwrappedParams.slug);

  if (!service) {
    return {
      title: `Service Not Found | ${siteSettings.site_name}`,
    };
  }

  const title = service.meta_title || `${service.title} | ${siteSettings.site_name}`;
  const description = (service.meta_description || service.short_description || service.description || "").substring(0, 155);

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

export default function SingleServiceLayout({ children }) {
  return children;
}

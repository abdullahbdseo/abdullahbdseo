import { services, siteSettings } from "@/lib/data";

export async function generateStaticParams() {
  return (services || []).map((service) => ({
    slug: service.slug,
  }));
}

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
  const image = service.featured_image || service.image || "/images/seo_hero_3d.png";

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

export default function SingleServiceLayout({ children }) {
  return children;
}

import { backlinkPosts } from "@/lib/backlinks-data";
import { siteSettings } from "@/lib/data";

export async function generateStaticParams() {
  return (backlinkPosts || []).map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const unwrappedParams = await params;
  const post = backlinkPosts.find(
    (p) => p.slug === unwrappedParams.slug || p.id === unwrappedParams.slug
  );

  if (!post) {
    return {
      title: `Backlink Guide Not Found | ${siteSettings.site_name}`,
    };
  }

  // Create crisp 50-60 character title and 140-160 char description
  const cleanCategory = post.category || "Backlinks";
  const title = `${cleanCategory} Sites List (High DA) | ${siteSettings.site_name}`;
  const description = (
    post.summary?.replace(/^[🚀⚡\s]+/, "") ||
    `Explore verified ${post.category} sites list with high DA/DR dofollow backlink opportunities curated by ${siteSettings.expert_name}.`
  ).substring(0, 155);
  const image = post.featured_image || post.image || "/images/seo_hero_3d.png";

  return {
    title,
    description,
    alternates: {
      canonical: `/high-da-backlinks/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/high-da-backlinks/${post.slug}`,
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

export default function SingleBacklinkLayout({ children }) {
  return children;
}

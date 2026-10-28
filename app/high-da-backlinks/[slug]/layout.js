import { backlinkPosts } from "@/lib/backlinks-data";
import { siteSettings } from "@/lib/data";

export async function generateMetadata({ params }) {
  const unwrappedParams = await params;
  const post = backlinkPosts.find((p) => p.slug === unwrappedParams.slug || p.id === unwrappedParams.slug);
  if (!post) return { title: "Backlink Resource Not Found" };

  const title = `${post.title} | ${siteSettings.site_name}`;
  const description = post.description || post.summary || `Free curated high DA/DR dofollow backlink list and guide for ${post.title}.`;

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
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function BacklinkSlugLayout({ children }) {
  return children;
}

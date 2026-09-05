import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { blogPosts, siteSettings } from "@/lib/data";

export async function generateMetadata({ params }) {
  const unwrappedParams = await params;
  const post = blogPosts.find((p) => p.slug === unwrappedParams.slug);
  if (!post) return { title: "Article Not Found" };
  return {
    title: `${post.title} | ${siteSettings.site_name}`,
    description: post.summary
  };
}

export default async function SingleBlogPostPage({ params }) {
  const unwrappedParams = await params;
  const post = blogPosts.find((p) => p.slug === unwrappedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="single-blog-page">
      {/* ARTICLE HEADER */}
      <section className="article-header-section">
        <div className="container max-w-4xl text-center">
          <div className="sub-badge">{post.category}</div>
          <h1 className="article-title">{post.title}</h1>
          
          <div className="article-meta-line justify-center">
            <span><i className="fa-regular fa-calendar"></i> {post.publish_date}</span>
            <span><i className="fa-regular fa-clock"></i> {post.read_time}</span>
            <span><i className="fa-solid fa-user-pen"></i> By {post.author?.name || siteSettings.expert_name}</span>
          </div>
        </div>
      </section>

      {/* ARTICLE HERO IMAGE */}
      <div className="container max-w-4xl mb-12">
        <div className="article-featured-image-box">
          <Image 
            src={post.featured_image} 
            alt={post.title} 
            width={1000} 
            height={500} 
            className="article-featured-img"
            priority
          />
        </div>
      </div>

      {/* ARTICLE CONTENT */}
      <section className="section-padding pt-0">
        <div className="container max-w-3xl">
          <div className="article-summary-box mb-8">
            <h4 className="summary-title"><i className="fa-solid fa-lightbulb text-warning"></i> Key Takeaway</h4>
            <p>{post.summary}</p>
          </div>

          <div 
            className="article-prose-body"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* TAGS */}
          {post.tags && post.tags.length > 0 && (
            <div className="article-tags-wrap my-8">
              <span className="tags-label">Topics:</span>
              {post.tags.map((tag, idx) => (
                <span key={idx} className="post-tag-item">#{tag}</span>
              ))}
            </div>
          )}

          {/* AUTHOR BIO CARD */}
          <div className="article-author-card my-12">
            <Image 
              src={post.author?.avatar || siteSettings.profile_photo} 
              alt={post.author?.name || siteSettings.expert_name} 
              width={80} 
              height={80} 
              className="author-bio-avatar"
            />
            <div className="author-bio-info">
              <h3 className="author-bio-name">{post.author?.name || siteSettings.expert_name}</h3>
              <p className="author-bio-title">{post.author?.role || siteSettings.expert_title}</p>
              <p className="author-bio-desc">
                {post.author?.bio || siteSettings.expert_bio}
              </p>
            </div>
          </div>

          {/* BACK TO BLOG */}
          <div className="article-nav-footer text-center">
            <Link href="/blog" className="btn btn-outline">
              <i className="fa-solid fa-arrow-left"></i> Back to All Guides
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

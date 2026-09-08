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
    description: post.summary || post.excerpt
  };
}

export default async function SingleBlogPostPage({ params }) {
  const unwrappedParams = await params;
  const post = blogPosts.find((p) => p.slug === unwrappedParams.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="single-blog-page">
      {/* ARTICLE HEADER & BREADCRUMBS */}
      <section className="article-header-section">
        <div className="container" style={{ maxWidth: "860px" }}>
          {/* Breadcrumbs */}
          <nav style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "18px", display: "flex", alignItems: "center", gap: "8px" }}>
            <Link href="/" style={{ color: "#64748b", textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <Link href="/blog" style={{ color: "#64748b", textDecoration: "none" }}>Blog</Link>
            <span>/</span>
            <span style={{ color: "#0f172a", fontWeight: 600 }} className="truncate">{post.title}</span>
          </nav>

          <div style={{ textAlign: "center" }}>
            <div className="sub-badge">{post.category}</div>
            <h1 className="article-title">{post.title}</h1>
            
            <div className="article-meta-line" style={{ justifyContent: "center" }}>
              <span><i className="fa-regular fa-calendar" style={{ color: "#4361ee" }}></i> {post.publish_date || post.date}</span>
              <span><i className="fa-regular fa-clock" style={{ color: "#10b981" }}></i> {post.read_time || "6 min read"}</span>
              <span><i className="fa-solid fa-user-pen" style={{ color: "#f59e0b" }}></i> By {post.author?.name || siteSettings.expert_name}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLE HERO IMAGE */}
      <div className="container" style={{ maxWidth: "920px", marginBottom: "40px" }}>
        <div className="article-featured-image-box">
          <Image 
            src={post.featured_image || post.image} 
            alt={post.title} 
            width={1000} 
            height={520} 
            className="article-featured-img"
            priority
          />
        </div>
      </div>

      {/* ARTICLE CONTENT */}
      <section style={{ paddingBottom: "60px" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <div className="article-summary-box">
            <h4 className="summary-title"><i className="fa-solid fa-lightbulb" style={{ color: "#10b981" }}></i> Key Takeaway</h4>
            <p>{post.summary || post.excerpt}</p>
          </div>

          <div 
            className="article-prose-body"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* TAGS */}
          {post.tags && post.tags.length > 0 && (
            <div className="article-tags-wrap">
              <span className="tags-label">Topics:</span>
              {post.tags.map((tag, idx) => (
                <span key={idx} className="post-tag-item">#{tag}</span>
              ))}
            </div>
          )}

          {/* AUTHOR BIO CARD */}
          <div className="article-author-card">
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

          {/* BACK TO BLOG BUTTON */}
          <div style={{ textAlign: "center", margin: "40px 0" }}>
            <Link href="/blog" className="btn btn-primary">
              <i className="fa-solid fa-arrow-left" style={{ marginRight: "6px" }}></i> Back to All SEO Guides
            </Link>
          </div>
        </div>
      </section>

      {/* RELATED ARTICLES SECTION */}
      {relatedPosts.length > 0 && (
        <section style={{ background: "#f8fafc", padding: "60px 0 80px", borderTop: "1px solid #e2e8f0" }}>
          <div className="container" style={{ maxWidth: "1140px" }}>
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#4361ee", textTransform: "uppercase", letterSpacing: "0.05em" }}>Continue Reading</span>
              <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "6px 0 0" }}>Related SEO Strategy Guides</h2>
            </div>

            <div className="blog-posts-grid">
              {relatedPosts.map((relPost) => (
                <article key={relPost.id} className="blog-card">
                  <div className="blog-card-image-wrap">
                    <Link href={`/blog/${relPost.slug}`}>
                      <Image 
                        src={relPost.featured_image || relPost.image} 
                        alt={relPost.title} 
                        width={500} 
                        height={280} 
                        className="blog-card-img"
                      />
                    </Link>
                    <span className="blog-category-badge">{relPost.category}</span>
                  </div>

                  <div className="blog-card-body">
                    <div className="blog-meta-line">
                      <span><i className="fa-regular fa-calendar" style={{ color: "#4361ee" }}></i> {relPost.publish_date || relPost.date}</span>
                      <span><i className="fa-regular fa-clock" style={{ color: "#10b981" }}></i> {relPost.read_time || "5 min"}</span>
                    </div>

                    <h3 className="blog-card-title">
                      <Link href={`/blog/${relPost.slug}`}>{relPost.title}</Link>
                    </h3>

                    <p className="blog-card-excerpt">{relPost.summary || relPost.excerpt}</p>

                    <div className="blog-card-footer">
                      <div className="blog-author-info">
                        <Image 
                          src={relPost.author?.avatar || siteSettings.profile_photo} 
                          alt={relPost.author?.name || siteSettings.expert_name} 
                          width={28} 
                          height={28} 
                          className="author-mini-avatar"
                        />
                        <span className="author-mini-name">{relPost.author?.name || siteSettings.expert_name}</span>
                      </div>

                      <Link href={`/blog/${relPost.slug}`} className="read-more-link">
                        Read Guide <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

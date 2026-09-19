import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { blogPosts, siteSettings } from "@/lib/data";
import BlogArticleEnhancer from "@/components/BlogArticleEnhancer";
import StickyTableOfContents from "@/components/StickyTableOfContents";
import SocialShare from "@/components/SocialShare";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const unwrappedParams = await params;
  const post = blogPosts.find((p) => p.slug === unwrappedParams.slug);
  if (!post) return { title: "Article Not Found" };
  return {
    title: post.meta_title || `${post.title} | ${siteSettings.site_name}`,
    description: post.meta_description || post.summary || post.excerpt,
    keywords: post.meta_keywords || (Array.isArray(post.tags) ? post.tags.join(", ") : post.tags)
  };
}

export default async function SingleBlogPostPage({ params }) {
  const unwrappedParams = await params;
  const post = blogPosts.find((p) => p.slug === unwrappedParams.slug);

  if (!post) {
    notFound();
  }

  // Extract headings for Table of Contents & inject IDs into HTML
  const headings = [];
  let headingIndex = 0;
  const processedContent = (post.content || "").replace(/<h([23])([^>]*)>(.*?)<\/h\1>/gi, (match, level, attrs, text) => {
    const plainText = text.replace(/<[^>]+>/g, '').trim();
    const headingId = `section-${headingIndex++}`;
    headings.push({
      id: headingId,
      text: plainText,
      level: parseInt(level)
    });
    return `<h${level}${attrs} id="${headingId}">${text}</h${level}>`;
  });

  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.meta_description || post.summary || post.excerpt,
    "image": post.featured_image || post.image,
    "datePublished": post.publish_date || post.date,
    "dateModified": post.dateModified || post.publish_date || post.date,
    "author": {
      "@type": "Person",
      "name": post.author?.name || siteSettings.expert_name,
      "jobTitle": post.author?.role || siteSettings.expert_title
    },
    "publisher": {
      "@type": "Organization",
      "name": siteSettings.site_name,
      "logo": {
        "@type": "ImageObject",
        "url": "https://abdullahbdseo.vercel.app/images/logo.svg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://abdullahbdseo.vercel.app/blog/${post.slug}`
    }
  };

  const blogBreadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://abdullahbdseo.vercel.app"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://abdullahbdseo.vercel.app/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://abdullahbdseo.vercel.app/blog/${post.slug}`
      }
    ]
  };

  return (
    <div className="single-blog-page">
      {/* Schema.org BlogPosting Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogBreadcrumbSchema) }}
      />
      {/* ARTICLE HEADER & BREADCRUMBS */}
      <section className="article-header-section">
        <div className="container" style={{ maxWidth: "1240px" }}>
          {/* Breadcrumbs */}
          <nav style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "18px", display: "flex", alignItems: "center", gap: "8px" }}>
            <Link href="/" style={{ color: "#64748b", textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <Link href="/blog" style={{ color: "#64748b", textDecoration: "none" }}>Blog</Link>
            <span>/</span>
            <span style={{ color: "#0f172a", fontWeight: 600 }} className="truncate">{post.title}</span>
          </nav>

          <div style={{ textAlign: "center", maxWidth: "920px", margin: "0 auto" }}>
            <div className="sub-badge">{post.category}</div>
            <h1 className="article-title">{post.title}</h1>
            
            <div className="article-meta-line" style={{ justifyContent: "center", flexWrap: "wrap", gap: "14px" }}>
              <span><i className="fa-regular fa-calendar" style={{ color: "#4361ee" }}></i> Published: {post.publish_date || post.date}</span>
              <span><i className="fa-solid fa-arrows-rotate" style={{ color: "#10b981" }}></i> Updated: {post.dateModified || post.publish_date || post.date}</span>
              <span><i className="fa-regular fa-clock" style={{ color: "#f59e0b" }}></i> {post.read_time || "6 min read"}</span>
              <span><i className="fa-solid fa-user-pen" style={{ color: "#7c3aed" }}></i> By {post.author?.name || siteSettings.expert_name}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLE HERO IMAGE */}
      <div className="container" style={{ maxWidth: "1240px", marginBottom: "40px" }}>
        <div className="article-featured-image-box">
          <Image 
            src={post.featured_image || post.image} 
            alt={post.title} 
            width={1240} 
            height={620} 
            className="article-featured-img"
            priority
          />
        </div>
      </div>

      {/* ARTICLE CONTENT WITH SIDEBAR TOC */}
      <section style={{ paddingBottom: "70px" }}>
        <div className="container" style={{ maxWidth: "1240px" }}>
          <div className="article-layout-grid">
            
            {/* LEFT SIDEBAR: Table of Contents & Info */}
            <aside className="article-sidebar-toc">
              <StickyTableOfContents headings={headings} />

              {/* Quick Article Stats */}
              <div className="article-toc-box" style={{ padding: "16px 20px" }}>
                <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "10px" }}>
                  Article Details
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.85rem", color: "#475569" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Category:</span>
                    <strong style={{ color: "#0f172a" }}>{post.category}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Reading Time:</span>
                    <strong style={{ color: "#0f172a" }}>{post.read_time || "6 min read"}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Status:</span>
                    <strong style={{ color: "#059669" }}>✓ Verified Fresh</strong>
                  </div>
                </div>
              </div>

              {/* Expert Help CTA Widget */}
              <div className="article-toc-cta">
                <i className="fa-solid fa-rocket" style={{ fontSize: "1.8rem", color: "#4361ee", marginBottom: "8px", display: "block" }}></i>
                <h5>Scale Your Organic Traffic</h5>
                <p>Get a custom technical &amp; AI search strategy tailored for your website.</p>
                <Link 
                  href="/contact" 
                  className="btn btn-primary btn-sm"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Book Free Audit
                </Link>
              </div>
            </aside>

            {/* RIGHT COLUMN: Main Article Body */}
            <div className="article-main-content" style={{ minWidth: 0 }}>
              <BlogArticleEnhancer title={post.title} headings={headings} />

              <div className="article-summary-box">
                <h4 className="summary-title"><i className="fa-solid fa-lightbulb" style={{ color: "#10b981" }}></i> Key Takeaway</h4>
                <p>{post.summary || post.excerpt}</p>
              </div>

              <div 
                className="article-prose-body"
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />

              {/* STRATEGIC INTERNAL LINKS & CONVERSION SILO */}
              <div style={{
                background: "linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)",
                border: "1px solid #bfdbfe",
                borderRadius: "14px",
                padding: "24px",
                margin: "34px 0",
                boxShadow: "0 4px 15px rgba(37, 99, 235, 0.05)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                  <i className="fa-solid fa-compass" style={{ color: "#2563eb", fontSize: "18px" }}></i>
                  <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 800, color: "#0f172a" }}>
                    Recommended Next Steps & Technical Resources
                  </h4>
                </div>
                <p style={{ fontSize: "13.5px", color: "#475569", margin: "0 0 16px 0", lineHeight: "1.5" }}>
                  Put this strategy into action for your website with our battle-tested diagnostic tools and specialized enterprise SEO services:
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "10px" }}>
                  <Link href="/tools/deep-seo-audit" style={{ textDecoration: "none", background: "#ffffff", padding: "12px 14px", borderRadius: "8px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "10px" }}>
                    <i className="fa-solid fa-magnifying-glass-chart" style={{ color: "#2563eb", fontSize: "16px" }}></i>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>Free Deep SEO Audit</div>
                      <div style={{ fontSize: "11px", color: "#64748b" }}>Scan 230+ technical factors</div>
                    </div>
                  </Link>
                  <Link href="/services/technical-seo-service-in-bangladesh" style={{ textDecoration: "none", background: "#ffffff", padding: "12px 14px", borderRadius: "8px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "10px" }}>
                    <i className="fa-solid fa-gears" style={{ color: "#059669", fontSize: "16px" }}></i>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>Technical SEO Service</div>
                      <div style={{ fontSize: "11px", color: "#64748b" }}>Fix crawl & speed blockers</div>
                    </div>
                  </Link>
                  <Link href="/pricing" style={{ textDecoration: "none", background: "#ffffff", padding: "12px 14px", borderRadius: "8px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "10px" }}>
                    <i className="fa-solid fa-tags" style={{ color: "#7c3aed", fontSize: "16px" }}></i>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>Monthly Growth Retainers</div>
                      <div style={{ fontSize: "11px", color: "#64748b" }}>View transparent packages</div>
                    </div>
                  </Link>
                  <Link href="/contact" style={{ textDecoration: "none", background: "#2563eb", color: "#ffffff", padding: "12px 14px", borderRadius: "8px", display: "flex", alignItems: "center", gap: "10px" }}>
                    <i className="fa-solid fa-rocket" style={{ color: "#ffffff", fontSize: "16px" }}></i>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "#ffffff" }}>Book Free Consultation</div>
                      <div style={{ fontSize: "11px", color: "#bfdbfe" }}>1-on-1 strategy call</div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Bottom Social Share */}
              <SocialShare title={post.title} />

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

          </div>
        </div>
      </section>

      {/* RELATED ARTICLES SECTION */}
      {relatedPosts.length > 0 && (
        <section style={{ background: "#f8fafc", padding: "60px 0 80px", borderTop: "1px solid #e2e8f0" }}>
          <div className="container" style={{ maxWidth: "1240px" }}>
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
                      <span><i className="fa-regular fa-clock" style={{ color: "#10b981" }}></i> {relPost.read_time || "5 min read"}</span>
                    </div>

                    <h3 className="blog-card-title">
                      <Link href={`/blog/${relPost.slug}`}>{relPost.title}</Link>
                    </h3>

                    <p className="blog-card-excerpt">
                      {((relPost.summary || relPost.excerpt || relPost.meta_description || "").replace(/<[^>]+>/g, "").trim()).length <= 120 
                        ? (relPost.summary || relPost.excerpt || relPost.meta_description || "") 
                        : (relPost.summary || relPost.excerpt || relPost.meta_description || "").replace(/<[^>]+>/g, "").trim().substring(0, 117).trim() + "..."}
                    </p>

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

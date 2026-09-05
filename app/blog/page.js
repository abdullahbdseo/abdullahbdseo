import Image from "next/image";
import Link from "next/link";
import { blogPosts, siteSettings } from "@/lib/data";

export const metadata = {
  title: `SEO Insights & Technical Guides | ${siteSettings.site_name}`,
  description: `Deep-dive tutorials, algorithmic breakdown guides, and practical playbooks on Technical SEO, Core Web Vitals, and Organic Growth.`
};

export default function BlogPage() {
  return (
    <div className="blog-page">
      {/* PAGE HEADER */}
      <section className="page-header-section">
        <div className="container text-center">
          <div className="sub-badge">Strategic Knowledge Base</div>
          <h1 className="page-title">Technical SEO & Search Guides</h1>
          <p className="page-subtitle max-w-2xl mx-auto">
            Actionable playbooks, algorithm analysis, and crawl engineering methodologies tested on real production websites.
          </p>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="section-padding">
        <div className="container">
          <div className="blog-posts-grid">
            {blogPosts.map((post) => (
              <article key={post.id} className="blog-card">
                <div className="blog-card-image-wrap">
                  <Image 
                    src={post.featured_image} 
                    alt={post.title} 
                    width={500} 
                    height={300} 
                    className="blog-card-img"
                  />
                  <span className="blog-category-badge">{post.category}</span>
                </div>

                <div className="blog-card-body">
                  <div className="blog-meta-line">
                    <span><i className="fa-regular fa-calendar"></i> {post.publish_date}</span>
                    <span><i className="fa-regular fa-clock"></i> {post.read_time}</span>
                  </div>

                  <h2 className="blog-card-title">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p className="blog-card-excerpt">{post.summary}</p>

                  <div className="blog-card-footer">
                    <div className="blog-author-info">
                      <Image 
                        src={post.author?.avatar || siteSettings.profile_photo} 
                        alt={post.author?.name || siteSettings.expert_name} 
                        width={32} 
                        height={32} 
                        className="author-mini-avatar"
                      />
                      <span className="author-mini-name">{post.author?.name || siteSettings.expert_name}</span>
                    </div>

                    <Link href={`/blog/${post.slug}`} className="read-more-link">
                      Read Guide <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

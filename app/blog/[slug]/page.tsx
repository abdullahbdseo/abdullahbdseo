import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Calendar,
  Clock,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Tag,
  Award,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import { blogPosts, personalInfo, seoSettings } from '@/data/portfolioData';
import ArticleSocialShare from './ArticleSocialShare';
import ArticleFaqAccordion from './ArticleFaqAccordion';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return blogPosts
    .filter((post) => Boolean(post.slug))
    .map((post) => ({
      slug: post.slug as string,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) {
    return {
      title: 'Article Not Found | Abdullah Saleh',
    };
  }

  const baseUrl = seoSettings.canonicalBase || 'https://abdullahbdseo.vercel.app';
  const pageUrl = baseUrl + '/blog/' + post.slug;
  const title = post.metaTitle || (post.title + ' | ' + personalInfo.name);
  const description = post.metaDescription || post.desc;
  const ogImageUrl = post.ogImage || post.image || '/assets/images/abdullah.jpg';

  return {
    title,
    description,
    keywords: post.tags || ['SEO', 'AEO', 'GEO', 'Technical SEO'],
    authors: [{ name: post.authorName || personalInfo.name }],
    alternates: {
      canonical: pageUrl,
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: personalInfo.name + ' · SEO & Search Architecture',
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.authorName || personalInfo.name],
      tags: post.tags,
      images: [
        {
          url: ogImageUrl.startsWith('http') ? ogImageUrl : (baseUrl + ogImageUrl),
          width: 1200,
          height: 630,
          alt: post.imageAlt || post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl.startsWith('http') ? ogImageUrl : (baseUrl + ogImageUrl)],
    },
  };
}

export default function SingleBlogPostPage({ params }: PageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const baseUrl = seoSettings.canonicalBase || 'https://abdullahbdseo.vercel.app';
  const pageUrl = baseUrl + '/blog/' + post.slug;
  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 2);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': post.schemaType || 'TechArticle',
    '@id': pageUrl + '#article',
    headline: post.title,
    description: post.metaDescription || post.desc,
    inLanguage: 'en-US',
    mainEntityOfPage: pageUrl,
    url: pageUrl,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      '@type': 'Person',
      name: post.authorName || personalInfo.name,
      jobTitle: personalInfo.title,
      url: baseUrl,
      image: baseUrl + personalInfo.photo,
      sameAs: Object.values(seoSettings.socialProfiles || {}).filter(Boolean),
    },
    publisher: {
      '@type': 'Person',
      name: personalInfo.name,
      url: baseUrl,
    },
    image: {
      '@type': 'ImageObject',
      url: post.image.startsWith('http') ? post.image : (baseUrl + post.image),
      caption: post.imageAlt || post.title,
    },
    keywords: (post.tags || []).join(', '),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: baseUrl + '/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: pageUrl,
      },
    ],
  };

  const faqSchema = post.faqs && post.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  } : null;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-surface text-ink transition-colors duration-500">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <Navbar />

      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted mb-6 font-medium flex-wrap">
            <Link href="/" className="hover:text-sage transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/blog" className="hover:text-sage transition-colors">Blog</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-sage font-semibold">{post.category}</span>
          </nav>

          <div className="space-y-4 mb-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-sage-pal border border-sage/30 text-sage shadow-2xs">
                {post.category}
              </span>
              {post.focusKeyword && (
                <span className="text-xs text-muted font-mono flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-sage" /> Target: <strong>{post.focusKeyword}</strong>
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-ink tracking-tight leading-[1.2]">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/80 text-xs text-muted">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sage text-white font-bold text-sm flex items-center justify-center shadow-xs">
                  {personalInfo.monogram}
                </div>
                <div>
                  <div className="font-bold text-ink text-sm">{personalInfo.name}</div>
                  <div className="text-[11px] text-muted">{personalInfo.title}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-sage" /> {post.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-sage" /> {post.readTime}
                </span>
              </div>
            </div>
          </div>

          <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-border shadow-md mb-10 bg-cardSubtle">
            <img
              src={post.image}
              alt={post.imageAlt || post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <div className="bg-sage-pal/40 border-2 border-sage/30 rounded-3xl p-6 sm:p-7 shadow-xs mb-10 space-y-3">
              <div className="flex items-center gap-2 text-sage font-bold text-sm sm:text-base uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> Key Strategic Takeaways (Executive Summary)
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Core insights structured for rapid review, search citation authority, and Google AI Overviews:
              </p>
              <ul className="space-y-2.5 pt-1">
                {post.keyTakeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="text-base sm:text-lg text-ink font-medium leading-relaxed bg-cardSubtle/60 border-l-4 border-sage p-5 rounded-r-2xl mb-8">
            {post.desc}
          </div>

          <article className="prose dark:prose-invert max-w-none text-ink/90 leading-relaxed font-normal space-y-6 text-sm sm:text-base mb-12">
            {post.content ? (
              <div className="whitespace-pre-line space-y-4">
                {post.content}
              </div>
            ) : (
              <p>Detailed technical content for this guide is actively being updated.</p>
            )}
          </article>

          {post.faqs && post.faqs.length > 0 && (
            <div className="mb-12">
              <ArticleFaqAccordion faqs={post.faqs} />
            </div>
          )}

          <div className="border-y border-border py-6 mb-12">
            <ArticleSocialShare title={post.title} url={pageUrl} />
          </div>

          <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-xs mb-12 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-sage uppercase tracking-wider">
              <Award className="w-4 h-4" /> About the Author & Practitioner (Verified E-E-A-T)
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-sage text-white font-bold text-xl flex items-center justify-center shadow-sm shrink-0">
                {personalInfo.monogram}
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold font-display text-ink">{personalInfo.name}</h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-bold">
                    ✓ Verified Author
                  </span>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  {personalInfo.heroBio}
                </p>
                <div className="flex items-center gap-3 pt-2 text-xs text-sage font-semibold">
                  <Link href="/#about" className="hover:underline">About Practitioner →</Link>
                  <span>·</span>
                  <Link href="https://www.linkedin.com/in/abdullah-saleh" target="_blank" className="hover:underline flex items-center gap-1">
                    LinkedIn Profile <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl p-8 sm:p-10 bg-sage-pal border-2 border-sage/40 text-center space-y-5 shadow-sm mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-card text-sage border border-border shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" /> Ready for Page 1 Organic Growth?
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-ink max-w-xl mx-auto leading-snug">
              Let's Build a High-Intent SEO & AEO Growth Engine for Your Business
            </h2>
            <p className="text-xs sm:text-sm text-muted max-w-lg mx-auto leading-relaxed">
              Book a 15-minute diagnostic call to uncover hidden technical bottlenecks and capture AI Search market share.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link href="/free-audit" className="w-full sm:w-auto px-6 py-3 rounded-xl bg-sage text-white text-xs font-bold hover:opacity-90 transition-opacity shadow-xs text-center">
                Claim Free Website SEO Audit →
              </Link>
              <Link href="/#contact" className="w-full sm:w-auto px-6 py-3 rounded-xl bg-card border border-border text-ink text-xs font-bold hover:bg-cardSubtle transition-colors shadow-xs text-center">
                Send a Direct Message
              </Link>
            </div>
          </div>

          {relatedPosts.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <h3 className="text-lg font-bold font-display text-ink flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-sage" /> Continue Reading (Related Guides)
                </h3>
                <Link href="/blog" className="text-xs text-sage font-semibold hover:underline">
                  All Articles →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {relatedPosts.map((rel) => (
                  <Link
                    key={rel.id}
                    href={'/blog/' + (rel.slug || 'seo-vs-aeo-vs-geo-framework')}
                    className="p-5 rounded-2xl bg-card border border-border hover:border-sage shadow-xs hover:shadow-cardHover transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-sage mb-2 block">
                        {rel.category}
                      </span>
                      <h4 className="text-sm font-bold font-display text-ink group-hover:text-sage transition-colors line-clamp-2 mb-2">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-muted line-clamp-2 leading-relaxed">
                        {rel.desc}
                      </p>
                    </div>
                    <span className="text-xs text-sage font-bold mt-4 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read Strategy Guide →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 text-center">
            <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-border text-xs font-semibold text-muted hover:text-ink hover:bg-cardSubtle transition-colors shadow-2xs">
              <ArrowLeft className="w-4 h-4" /> Return to All Blog Articles
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppWidget />
    </div>
  );
}
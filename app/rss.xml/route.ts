import { NextResponse } from 'next/server';
import { blogPosts, personalInfo, seoSettings } from '@/data/portfolioData';

export async function GET() {
  const baseUrl = seoSettings.canonicalBase || 'https://abdullahbdseo.vercel.app';
  const buildDate = new Date().toUTCString();

  const itemsXml = blogPosts
    .map((post) => {
      const url = `${baseUrl}/blog/${post.slug || 'seo-vs-aeo-vs-geo-framework'}`;
      const pubDate = new Date(post.date).toUTCString();

      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${post.desc}]]></description>
      <pubDate>${pubDate}</pubDate>
      <author><![CDATA[${post.authorName || personalInfo.name}]]></author>
      <category><![CDATA[${post.category}]]></category>
    </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${seoSettings.siteTitle || personalInfo.name + ' | SEO & Search Architecture'}]]></title>
    <link>${baseUrl}</link>
    <description><![CDATA[${seoSettings.siteDescription || personalInfo.heroBio}]]></description>
    <language>en-us</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}

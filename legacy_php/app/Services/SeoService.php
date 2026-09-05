<?php
// app/Services/SeoService.php - Schema.org JSON-LD and SEO Meta Builder

require_once __DIR__ . '/../../core/Helpers.php';

class SeoService {
    public static function getOrganizationSchema(): string {
        $siteUrl = url();
        $siteName = setting('site_name', 'Abdullah Saleh');
        $expertName = setting('expert_name', 'Abdullah Saleh');
        $title = setting('expert_title', 'SEO Specialist & Organic Growth Strategist');

        $schema = [
            '@context' => 'https://schema.org',
            '@type' => 'ProfessionalService',
            'name' => $siteName,
            'url' => $siteUrl,
            'logo' => uploadUrl(setting('site_logo_image')) ?: $siteUrl . '/assets/images/logo.png',
            'description' => setting('default_meta_description'),
            'priceRange' => '$$',
            'telephone' => setting('contact_phone', ''),
            'email' => setting('contact_email', ''),
            'founder' => [
                '@type' => 'Person',
                'name' => $expertName,
                'jobTitle' => $title,
                'url' => $siteUrl . '/about',
                'sameAs' => array_filter([
                    setting('social_linkedin'),
                    setting('social_twitter'),
                    setting('social_github')
                ])
            ]
        ];

        return '<script type="application/ld+json">' . json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . '</script>';
    }

    public static function getBreadcrumbSchema(array $crumbs): string {
        $items = [];
        $pos = 1;
        foreach ($crumbs as $name => $link) {
            $items[] = [
                '@type' => 'ListItem',
                'position' => $pos++,
                'name' => $name,
                'item' => $link
            ];
        }

        $schema = [
            '@context' => 'https://schema.org',
            '@type' => 'BreadcrumbList',
            'itemListElement' => $items
        ];

        return '<script type="application/ld+json">' . json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . '</script>';
    }

    public static function getArticleSchema(array $post): string {
        $schema = [
            '@context' => 'https://schema.org',
            '@type' => 'BlogPosting',
            'headline' => $post['title'],
            'description' => $post['excerpt'] ?? '',
            'mainEntityOfPage' => [
                '@type' => 'WebPage',
                '@id' => url('/blog/' . $post['slug'])
            ],
            'author' => [
                '@type' => 'Person',
                'name' => setting('expert_name', 'Abdullah Saleh')
            ],
            'publisher' => [
                '@type' => 'Organization',
                'name' => setting('site_name', 'Abdullah Saleh'),
                'url' => url()
            ],
            'datePublished' => date('c', strtotime($post['published_at'] ?? 'now')),
            'dateModified' => date('c', strtotime($post['updated_at'] ?? $post['published_at'] ?? 'now'))
        ];

        return '<script type="application/ld+json">' . json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . '</script>';
    }
}

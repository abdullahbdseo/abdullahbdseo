<?php
// app/Controllers/SitemapController.php - Dynamic XML Sitemap & Robots.txt Generator

require_once __DIR__ . '/../../core/Controller.php';
require_once __DIR__ . '/../Models/Service.php';
require_once __DIR__ . '/../Models/Portfolio.php';
require_once __DIR__ . '/../Models/BlogPost.php';

class SitemapController extends Controller {
    public function sitemap(): void {
        header('Content-Type: application/xml; charset=utf-8');
        
        $siteUrl = rtrim(SITE_URL, '/');
        $services = Service::where('status', 'active');
        $portfolios = Portfolio::where('status', 'published');
        $posts = BlogPost::where('status', 'published');

        echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

        // Static routes
        $staticRoutes = [
            ['url' => $siteUrl . '/', 'priority' => '1.0', 'changefreq' => 'weekly'],
            ['url' => $siteUrl . '/about', 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['url' => $siteUrl . '/services', 'priority' => '0.9', 'changefreq' => 'weekly'],
            ['url' => $siteUrl . '/portfolio', 'priority' => '0.8', 'changefreq' => 'weekly'],
            ['url' => $siteUrl . '/pricing', 'priority' => '0.8', 'changefreq' => 'weekly'],
            ['url' => $siteUrl . '/blog', 'priority' => '0.9', 'changefreq' => 'daily'],
            ['url' => $siteUrl . '/faq', 'priority' => '0.7', 'changefreq' => 'monthly'],
            ['url' => $siteUrl . '/testimonials', 'priority' => '0.7', 'changefreq' => 'monthly'],
            ['url' => $siteUrl . '/contact', 'priority' => '0.8', 'changefreq' => 'monthly'],
        ];

        foreach ($staticRoutes as $r) {
            echo "  <url>\n";
            echo "    <loc>" . htmlspecialchars($r['url']) . "</loc>\n";
            echo "    <changefreq>" . $r['changefreq'] . "</changefreq>\n";
            echo "    <priority>" . $r['priority'] . "</priority>\n";
            echo "  </url>\n";
        }

        // Services
        foreach ($services as $s) {
            echo "  <url>\n";
            echo "    <loc>" . htmlspecialchars($siteUrl . '/services/' . $s['slug']) . "</loc>\n";
            echo "    <changefreq>weekly</changefreq>\n";
            echo "    <priority>0.9</priority>\n";
            echo "  </url>\n";
        }

        // Portfolios
        foreach ($portfolios as $p) {
            echo "  <url>\n";
            echo "    <loc>" . htmlspecialchars($siteUrl . '/portfolio/' . $p['slug']) . "</loc>\n";
            echo "    <changefreq>monthly</changefreq>\n";
            echo "    <priority>0.8</priority>\n";
            echo "  </url>\n";
        }

        // Blog Posts
        foreach ($posts as $b) {
            echo "  <url>\n";
            echo "    <loc>" . htmlspecialchars($siteUrl . '/blog/' . $b['slug']) . "</loc>\n";
            echo "    <lastmod>" . date('Y-m-d', strtotime($b['updated_at'] ?? $b['published_at'])) . "</lastmod>\n";
            echo "    <changefreq>monthly</changefreq>\n";
            echo "    <priority>0.7</priority>\n";
            echo "  </url>\n";
        }

        echo '</urlset>';
        exit;
    }

    public function robots(): void {
        header('Content-Type: text/plain; charset=utf-8');
        echo "User-agent: *\n";
        echo "Disallow: /admin/\n";
        echo "Disallow: /database/\n";
        echo "Allow: /\n\n";
        echo "Sitemap: " . SITE_URL . "/sitemap.xml\n";
        exit;
    }
}

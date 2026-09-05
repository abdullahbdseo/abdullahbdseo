<?php
// app/Controllers/BlogController.php

require_once __DIR__ . '/../../core/Controller.php';
require_once __DIR__ . '/../Models/BlogPost.php';
require_once __DIR__ . '/../Services/SeoService.php';

class BlogController extends Controller {
    public function index(): void {
        $categorySlug = $_GET['category'] ?? null;
        $search = $_GET['q'] ?? null;

        $posts = BlogPost::getPublished($categorySlug, $search, 12, 0);

        $db = Database::getInstance()->getConnection();
        $categories = $db->query("SELECT * FROM `blog_categories` WHERE `status` = 'active'")->fetchAll();

        $this->render('public/blog', [
            'pageTitle' => 'SEO Knowledge Base & Guides | Abdullah Saleh',
            'metaDescription' => 'Actionable guides and technical breakdowns covering Core Web Vitals, crawl budget, keyword intent, and search rankings.',
            'posts' => $posts,
            'categories' => $categories,
            'currentCategory' => $categorySlug,
            'searchQuery' => $search
        ]);
    }

    public function show(string $slug): void {
        $post = BlogPost::findBySlug($slug);
        if (!$post) {
            http_response_code(404);
            $this->render('public/errors/404', ['pageTitle' => 'Article Not Found']);
            return;
        }

        $customSchema = SeoService::getArticleSchema($post);

        $this->render('public/blog_detail', [
            'pageTitle' => e($post['seo_title'] ?: $post['title'] . ' | Abdullah Saleh'),
            'metaDescription' => e($post['meta_description'] ?: $post['excerpt']),
            'post' => $post,
            'customSchema' => $customSchema
        ]);
    }
}

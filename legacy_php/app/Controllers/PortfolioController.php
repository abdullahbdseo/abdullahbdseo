<?php
// app/Controllers/PortfolioController.php

require_once __DIR__ . '/../../core/Controller.php';
require_once __DIR__ . '/../Models/Portfolio.php';

class PortfolioController extends Controller {
    public function index(): void {
        $categorySlug = $_GET['category'] ?? null;
        $portfolios = Portfolio::getActiveWithCategory($categorySlug);
        
        $db = Database::getInstance()->getConnection();
        $categories = $db->query("SELECT * FROM `portfolio_categories` WHERE `status` = 'active'")->fetchAll();

        $this->render('public/portfolio', [
            'pageTitle' => 'SEO Case Studies & Real Results | Abdullah Saleh',
            'metaDescription' => 'Explore detailed SEO case studies demonstrating how we scaled organic revenue and rankings for e-commerce, SaaS, and local brands.',
            'portfolios' => $portfolios,
            'categories' => $categories,
            'currentCategory' => $categorySlug
        ]);
    }

    public function show(string $slug): void {
        $portfolio = Portfolio::findBySlug($slug);
        if (!$portfolio) {
            http_response_code(404);
            $this->render('public/errors/404', ['pageTitle' => 'Case Study Not Found']);
            return;
        }

        $this->render('public/portfolio_detail', [
            'pageTitle' => e($portfolio['seo_title'] ?: $portfolio['title'] . ' | Case Study'),
            'metaDescription' => e($portfolio['meta_description'] ?: $portfolio['summary']),
            'portfolio' => $portfolio
        ]);
    }
}

<?php
// app/Controllers/Admin/AdminPortfolioController.php

require_once __DIR__ . '/../../../core/Controller.php';
require_once __DIR__ . '/../../Models/Portfolio.php';

class AdminPortfolioController extends Controller {
    public function __construct() {
        $this->requireAdmin();
    }

    public function index(): void {
        $portfolios = Portfolio::all('sort_order ASC, id DESC');
        $this->render('admin/portfolio/index', [
            'pageTitle' => 'Manage Case Studies',
            'portfolios' => $portfolios
        ], 'admin');
    }

    public function create(): void {
        $this->render('admin/portfolio/edit', [
            'pageTitle' => 'Add Case Study',
            'portfolio' => []
        ], 'admin');
    }

    public function store(): void {
        $this->validateCsrf();

        $title = Security::sanitizeString($_POST['title'] ?? '');
        $slug = slugify($title);
        $clientName = Security::sanitizeString($_POST['client_name'] ?? '');
        $industry = Security::sanitizeString($_POST['industry'] ?? 'E-Commerce');
        $duration = Security::sanitizeString($_POST['duration'] ?? '6 Months');
        $websiteUrl = Security::sanitizeString($_POST['website_url'] ?? '');
        $summary = Security::sanitizeString($_POST['summary'] ?? '');
        $challenge = $_POST['challenge'] ?? '';
        $strategy = $_POST['strategy'] ?? '';
        $implementation = $_POST['implementation'] ?? '';
        $results = $_POST['results'] ?? '';
        $isFeatured = !empty($_POST['is_featured']) ? 1 : 0;
        $status = !empty($_POST['is_published']) ? 'published' : 'draft';

        $id = Portfolio::create([
            'title' => $title,
            'slug' => $slug,
            'client_name' => $clientName,
            'industry' => $industry,
            'duration' => $duration,
            'website_url' => $websiteUrl,
            'summary' => $summary,
            'challenge' => $challenge,
            'strategy' => $strategy,
            'implementation' => $implementation,
            'results' => $results,
            'is_featured' => $isFeatured,
            'status' => $status
        ]);

        Auth::logAudit('portfolio_create', 'Portfolio', $id, "Created case study: {$title}");
        $this->redirect('/admin/portfolio', 'success', 'Case study created successfully.');
    }

    public function edit(int $id): void {
        $portfolio = Portfolio::find($id);
        if (!$portfolio) {
            $this->redirect('/admin/portfolio', 'error', 'Case study not found.');
            return;
        }

        $this->render('admin/portfolio/edit', [
            'pageTitle' => 'Edit Case Study',
            'portfolio' => $portfolio
        ], 'admin');
    }

    public function update(int $id): void {
        $this->validateCsrf();

        $title = Security::sanitizeString($_POST['title'] ?? '');
        $clientName = Security::sanitizeString($_POST['client_name'] ?? '');
        $industry = Security::sanitizeString($_POST['industry'] ?? 'E-Commerce');
        $duration = Security::sanitizeString($_POST['duration'] ?? '6 Months');
        $websiteUrl = Security::sanitizeString($_POST['website_url'] ?? '');
        $summary = Security::sanitizeString($_POST['summary'] ?? '');
        $challenge = $_POST['challenge'] ?? '';
        $strategy = $_POST['strategy'] ?? '';
        $implementation = $_POST['implementation'] ?? '';
        $results = $_POST['results'] ?? '';
        $isFeatured = !empty($_POST['is_featured']) ? 1 : 0;
        $status = !empty($_POST['is_published']) ? 'published' : 'draft';

        Portfolio::update($id, [
            'title' => $title,
            'client_name' => $clientName,
            'industry' => $industry,
            'duration' => $duration,
            'website_url' => $websiteUrl,
            'summary' => $summary,
            'challenge' => $challenge,
            'strategy' => $strategy,
            'implementation' => $implementation,
            'results' => $results,
            'is_featured' => $isFeatured,
            'status' => $status
        ]);

        Auth::logAudit('portfolio_update', 'Portfolio', $id, "Updated case study: {$title}");
        $this->redirect('/admin/portfolio', 'success', 'Case study updated.');
    }

    public function delete(int $id): void {
        $this->validateCsrf();
        Portfolio::delete($id);
        Auth::logAudit('portfolio_delete', 'Portfolio', $id, "Deleted case study ID: {$id}");
        $this->redirect('/admin/portfolio', 'success', 'Case study deleted.');
    }
}

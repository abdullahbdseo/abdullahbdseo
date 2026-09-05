<?php
// app/Controllers/Admin/AdminCmsController.php

require_once __DIR__ . '/../../../core/Controller.php';
require_once __DIR__ . '/../../Models/HomepageSection.php';
require_once __DIR__ . '/../../Models/Testimonial.php';
require_once __DIR__ . '/../../Models/Faq.php';

class AdminCmsController extends Controller {
    public function __construct() {
        $this->requireAdmin();
    }

    public function sections(): void {
        $sections = HomepageSection::getActiveSections();
        $this->render('admin/sections/index', [
            'pageTitle' => 'Homepage Sections & Content CMS',
            'sections' => $sections
        ], 'admin');
    }

    public function updateSections(): void {
        $this->validateCsrf();

        $heroBadge = Security::sanitizeString($_POST['hero_badge'] ?? '');
        $heroContent = Security::sanitizeString($_POST['hero_content'] ?? '');
        $heroCtaPrimary = Security::sanitizeString($_POST['hero_cta_primary'] ?? 'Explore SEO Services');
        $heroCtaSecondary = Security::sanitizeString($_POST['hero_cta_secondary'] ?? 'View Case Studies');

        $stat1Num = Security::sanitizeString($_POST['stat1_num'] ?? '7+');
        $stat1Lbl = Security::sanitizeString($_POST['stat1_label'] ?? 'Years SEO Experience');
        $stat2Num = Security::sanitizeString($_POST['stat2_num'] ?? '120+');
        $stat2Lbl = Security::sanitizeString($_POST['stat2_label'] ?? 'Projects Optimized');
        $stat3Num = Security::sanitizeString($_POST['stat3_num'] ?? '98%');
        $stat3Lbl = Security::sanitizeString($_POST['stat3_label'] ?? 'Client Satisfaction Rate');
        $stat4Num = Security::sanitizeString($_POST['stat4_num'] ?? '3.5x');
        $stat4Lbl = Security::sanitizeString($_POST['stat4_label'] ?? 'Average Organic ROI');

        $heroSettings = [
            'badge' => $heroBadge,
            'cta_primary_text' => $heroCtaPrimary,
            'cta_primary_link' => '#services',
            'cta_secondary_text' => $heroCtaSecondary,
            'cta_secondary_link' => '#portfolio',
            'stat1_num' => $stat1Num,
            'stat1_label' => $stat1Lbl,
            'stat2_num' => $stat2Num,
            'stat2_label' => $stat2Lbl,
            'stat3_num' => $stat3Num,
            'stat3_label' => $stat3Lbl,
            'stat4_num' => $stat4Num,
            'stat4_label' => $stat4Lbl
        ];

        $db = Database::getInstance()->getConnection();
        $stmt = $db->prepare("UPDATE `homepage_sections` SET `content` = ?, `settings_json` = ? WHERE `section_key` = 'hero'");
        $stmt->execute([$heroContent, json_encode($heroSettings)]);

        Auth::logAudit('sections_update', 'HomepageSection', 1, "Updated homepage hero content and statistics");
        $this->redirect('/admin/sections', 'success', 'Homepage content updated successfully.');
    }

    public function testimonials(): void {
        $testimonials = Testimonial::all('sort_order ASC, id DESC');
        $this->render('admin/testimonials/index', [
            'pageTitle' => 'Manage Testimonials',
            'testimonials' => $testimonials
        ], 'admin');
    }

    public function storeTestimonial(): void {
        $this->validateCsrf();

        $name = Security::sanitizeString($_POST['name'] ?? '');
        $company = Security::sanitizeString($_POST['company'] ?? '');
        $position = Security::sanitizeString($_POST['position'] ?? '');
        $testimonial = Security::sanitizeString($_POST['testimonial'] ?? '');
        $rating = (int)($_POST['rating'] ?? 5);

        if ($name && $testimonial) {
            Testimonial::create([
                'name' => $name,
                'company' => $company,
                'position' => $position,
                'testimonial' => $testimonial,
                'rating' => $rating,
                'status' => 'active'
            ]);
            $this->redirect('/admin/testimonials', 'success', 'Testimonial added.');
        } else {
            $this->redirect('/admin/testimonials', 'error', 'Name and testimonial text are required.');
        }
    }

    public function deleteTestimonial(int $id): void {
        $this->validateCsrf();
        Testimonial::delete($id);
        $this->redirect('/admin/testimonials', 'success', 'Testimonial deleted.');
    }

    public function faqs(): void {
        $faqs = Faq::all('sort_order ASC, id ASC');
        $this->render('admin/faqs/index', [
            'pageTitle' => 'Manage FAQs',
            'faqs' => $faqs
        ], 'admin');
    }

    public function storeFaq(): void {
        $this->validateCsrf();

        $question = Security::sanitizeString($_POST['question'] ?? '');
        $answer = Security::sanitizeString($_POST['answer'] ?? '');
        $category = Security::sanitizeString($_POST['category'] ?? 'General SEO');
        $sortOrder = (int)($_POST['sort_order'] ?? 0);

        if ($question && $answer) {
            Faq::create([
                'question' => $question,
                'answer' => $answer,
                'category' => $category ?: 'General SEO',
                'sort_order' => $sortOrder,
                'status' => 'active'
            ]);
            $this->redirect('/admin/faqs', 'success', 'FAQ added.');
        } else {
            $this->redirect('/admin/faqs', 'error', 'Question and answer are required.');
        }
    }

    public function deleteFaq(int $id): void {
        $this->validateCsrf();
        Faq::delete($id);
        $this->redirect('/admin/faqs', 'success', 'FAQ deleted.');
    }

    public function auditLogs(): void {
        $db = Database::getInstance()->getConnection();
        $logs = $db->query("SELECT a.*, u.name AS user_name 
            FROM `audit_logs` a 
            LEFT JOIN `users` u ON a.user_id = u.id 
            ORDER BY a.id DESC LIMIT 100")->fetchAll();

        $this->render('admin/audit_logs/index', [
            'pageTitle' => 'Security Audit Trail',
            'logs' => $logs
        ], 'admin');
    }
}

<?php
// app/Controllers/Admin/AdminSeoController.php

require_once __DIR__ . '/../../../core/Controller.php';
require_once __DIR__ . '/../../Models/Setting.php';

class AdminSeoController extends Controller {
    public function __construct() {
        $this->requireAdmin();
    }

    public function index(): void {
        $this->render('admin/seo/index', [
            'pageTitle' => 'SEO & Meta Tag Management'
        ], 'admin');
    }

    public function update(): void {
        $this->validateCsrf();

        $metaTitle = Security::sanitizeString($_POST['default_meta_title'] ?? '');
        $metaDesc = Security::sanitizeString($_POST['default_meta_description'] ?? '');
        $metaKeywords = Security::sanitizeString($_POST['default_meta_keywords'] ?? '');
        $gaId = Security::sanitizeString($_POST['google_analytics_id'] ?? '');
        $gscCode = Security::sanitizeString($_POST['google_search_console_code'] ?? '');

        Setting::set('default_meta_title', $metaTitle, 'text', 'seo');
        Setting::set('default_meta_description', $metaDesc, 'textarea', 'seo');
        Setting::set('default_meta_keywords', $metaKeywords, 'textarea', 'seo');
        Setting::set('google_analytics_id', $gaId, 'text', 'seo');
        Setting::set('google_search_console_code', $gscCode, 'text', 'seo');

        Auth::logAudit('seo_update', 'Setting', null, "Updated global SEO and tracking configurations");
        $this->redirect('/admin/seo', 'success', 'SEO settings saved successfully.');
    }
}

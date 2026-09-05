<?php
// app/Controllers/ServiceController.php

require_once __DIR__ . '/../../core/Controller.php';
require_once __DIR__ . '/../Models/Service.php';

class ServiceController extends Controller {
    public function index(): void {
        $services = Service::getActiveWithCategory();

        $this->render('public/services', [
            'pageTitle' => 'Specialized SEO Services & Packages | Abdullah Saleh',
            'metaDescription' => 'Explore technical SEO audits, keyword research, e-commerce SEO optimization, and authority link building services.',
            'services' => $services
        ]);
    }

    public function show(string $slug): void {
        $aliases = [
            'keyword-research-mapping' => 'keyword-research-topic-clustering',
            'keyword-research' => 'keyword-research-topic-clustering',
            'topic-clustering' => 'keyword-research-topic-clustering',
            'keyword-clustering' => 'keyword-research-topic-clustering',
            'on-page-seo-content' => 'on-page-seo-optimization',
            'on-page-seo' => 'on-page-seo-optimization',
            'onpage-seo' => 'on-page-seo-optimization',
            'content-optimization' => 'on-page-seo-optimization',
            'white-hat-link-building' => 'authority-link-building-strategy',
            'authority-link-building' => 'authority-link-building-strategy',
            'link-building' => 'authority-link-building-strategy',
            'high-authority-link-building' => 'authority-link-building-strategy',
            'ecommerce-seo' => 'ecommerce-seo-optimization',
            'ecommerce-seo-growth' => 'ecommerce-seo-optimization',
            'technical-seo' => 'technical-seo-audit',
            'seo-audit' => 'technical-seo-audit',
            'local-seo' => 'local-seo-gbp-optimization',
            'gbp-optimization' => 'local-seo-gbp-optimization',
            'google-business-profile' => 'local-seo-gbp-optimization',
            'monthly-seo' => 'monthly-seo-subscription-retainer',
            'monthly-retainers' => 'monthly-seo-subscription-retainer',
            'monthly-seo-growth-retainers' => 'monthly-seo-subscription-retainer',
            'monthly-seo-subscription' => 'monthly-seo-subscription-retainer',
            'subscription-plans' => 'monthly-seo-subscription-retainer',
            'subscription-retainers' => 'monthly-seo-subscription-retainer'
        ];
        
        $targetSlug = $aliases[$slug] ?? $slug;
        $service = Service::findBySlug($targetSlug);
        
        if (!$service) {
            http_response_code(404);
            $this->render('public/errors/404', ['pageTitle' => 'Service Not Found']);
            return;
        }

        $this->render('public/service_detail', [
            'pageTitle' => e($service['seo_title'] ?: $service['title'] . ' | Abdullah Saleh'),
            'metaDescription' => e($service['meta_description'] ?: $service['short_description']),
            'service' => $service
        ]);
    }
}

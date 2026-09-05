<?php
// index.php - Front Controller & Application Entrypoint

require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/core/App.php';
require_once __DIR__ . '/core/Controller.php';

// Services
require_once __DIR__ . '/app/Services/SeoService.php';
require_once __DIR__ . '/app/Services/NowPaymentsService.php';
require_once __DIR__ . '/app/Services/BkashPaymentService.php';
require_once __DIR__ . '/app/Services/CryptoPaymentService.php';

// Controllers
require_once __DIR__ . '/app/Controllers/HomeController.php';
require_once __DIR__ . '/app/Controllers/ServiceController.php';
require_once __DIR__ . '/app/Controllers/PortfolioController.php';
require_once __DIR__ . '/app/Controllers/BlogController.php';
require_once __DIR__ . '/app/Controllers/ContactController.php';
require_once __DIR__ . '/app/Controllers/AuthController.php';
require_once __DIR__ . '/app/Controllers/OrderController.php';
require_once __DIR__ . '/app/Controllers/SitemapController.php';
require_once __DIR__ . '/app/Controllers/ToolController.php';

// Admin Controllers
require_once __DIR__ . '/app/Controllers/Admin/AdminDashboardController.php';
require_once __DIR__ . '/app/Controllers/Admin/AdminServiceController.php';
require_once __DIR__ . '/app/Controllers/Admin/AdminOrderController.php';
require_once __DIR__ . '/app/Controllers/Admin/AdminPaymentController.php';
require_once __DIR__ . '/app/Controllers/Admin/AdminInvoiceController.php';
require_once __DIR__ . '/app/Controllers/Admin/AdminClientController.php';
require_once __DIR__ . '/app/Controllers/Admin/AdminPortfolioController.php';
require_once __DIR__ . '/app/Controllers/Admin/AdminBlogController.php';
require_once __DIR__ . '/app/Controllers/Admin/AdminCmsController.php';
require_once __DIR__ . '/app/Controllers/Admin/AdminMediaController.php';
require_once __DIR__ . '/app/Controllers/Admin/AdminSettingsController.php';
require_once __DIR__ . '/app/Controllers/Admin/AdminSupportController.php';
require_once __DIR__ . '/app/Controllers/Admin/AdminInquiryController.php';
require_once __DIR__ . '/app/Controllers/Admin/AdminSeoController.php';

$app = new App();

// 1. Public Routes
$app->get('/', [HomeController::class, 'index']);
$app->get('/about', [HomeController::class, 'about']);
$app->get('/services', [ServiceController::class, 'index']);
$app->get('/services/{slug}', [ServiceController::class, 'show']);
$app->get('/portfolio', [PortfolioController::class, 'index']);
$app->get('/portfolio/{slug}', [PortfolioController::class, 'show']);
$app->get('/case-studies/{slug}', [PortfolioController::class, 'show']);
$app->get('/pricing', [HomeController::class, 'pricing']);
$app->get('/blog', [BlogController::class, 'index']);
$app->get('/blog/{slug}', [BlogController::class, 'show']);
$app->get('/faq', [HomeController::class, 'faq']);
$app->get('/testimonials', [HomeController::class, 'testimonials']);
$app->get('/contact', [ContactController::class, 'index']);
$app->post('/contact/submit', [ContactController::class, 'submit']);
$app->get('/privacy', [HomeController::class, 'privacyPolicy']);
$app->get('/privacy-policy', [HomeController::class, 'privacyPolicy']);
$app->get('/terms', [HomeController::class, 'termsAndConditions']);
$app->get('/terms-and-conditions', [HomeController::class, 'termsAndConditions']);
$app->get('/refund', [HomeController::class, 'refundPolicy']);
$app->get('/refund-policy', [HomeController::class, 'refundPolicy']);

// Interactive Marketing & SEO Tools Suite
$app->get('/tools', [HomeController::class, 'toolsHub']);

// 1. Website Cost Calculator
$app->get('/tools/website-cost-calculator', [HomeController::class, 'costCalculator']);
$app->get('/website-cost-calculator', [HomeController::class, 'costCalculator']);
$app->get('/cost-calculator', [HomeController::class, 'costCalculator']);

// 2. Google Ads ROI Calculator
$app->get('/tools/google-ads-roi-calculator', [HomeController::class, 'googleAdsRoiCalculator']);
$app->get('/google-ads-roi-calculator', [HomeController::class, 'googleAdsRoiCalculator']);

// 3. Facebook Ads ROI Calculator
$app->get('/tools/facebook-ads-roi-calculator', [HomeController::class, 'facebookAdsRoiCalculator']);
$app->get('/facebook-ads-roi-calculator', [HomeController::class, 'facebookAdsRoiCalculator']);

// 4. AI Automation Savings Calculator
$app->get('/tools/ai-automation-savings-calculator', [HomeController::class, 'aiAutomationSavingsCalculator']);
$app->get('/ai-automation-savings-calculator', [HomeController::class, 'aiAutomationSavingsCalculator']);

// 5. Website SEO Analyzer
$app->get('/tools/website-seo-analyzer', [HomeController::class, 'websiteSeoAnalyzer']);
$app->get('/website-seo-analyzer', [HomeController::class, 'websiteSeoAnalyzer']);
$app->get('/seo-analyzer', [HomeController::class, 'websiteSeoAnalyzer']);
$app->post('/tools/website-seo-analyzer/analyze', [HomeController::class, 'analyzeWebsiteSeo']);

// 6. Schema Markup (JSON-LD) Generator
$app->get('/tools/schema-markup-generator', [ToolController::class, 'schemaGenerator']);
$app->get('/tools/schema-generator', [ToolController::class, 'schemaGenerator']);
$app->get('/schema-generator', [ToolController::class, 'schemaGenerator']);

// 7. Google SERP Simulator & Meta Tag Generator
$app->get('/tools/serp-simulator', [ToolController::class, 'serpSimulator']);
$app->get('/tools/meta-tag-generator', [ToolController::class, 'serpSimulator']);
$app->get('/serp-simulator', [ToolController::class, 'serpSimulator']);

// 8. Robots.txt & XML Sitemap Generator / Validator
$app->get('/tools/robots-sitemap-generator', [ToolController::class, 'robotsSitemapGenerator']);
$app->get('/tools/robots-txt-generator', [ToolController::class, 'robotsSitemapGenerator']);
$app->get('/robots-generator', [ToolController::class, 'robotsSitemapGenerator']);

// 9. Keyword Density & Readability Checker
$app->get('/tools/keyword-density-checker', [ToolController::class, 'keywordDensityChecker']);
$app->get('/tools/keyword-density-analyzer', [ToolController::class, 'keywordDensityChecker']);
$app->get('/keyword-density-checker', [ToolController::class, 'keywordDensityChecker']);

// 10. HTTP Header, Redirect Chain & SSL Checker
$app->get('/tools/http-header-checker', [ToolController::class, 'httpHeaderChecker']);
$app->get('/tools/redirect-checker', [ToolController::class, 'httpHeaderChecker']);
$app->get('/http-header-checker', [ToolController::class, 'httpHeaderChecker']);

// Tool AJAX APIs & Lead Capture
$app->post('/tools/api/http-check', [ToolController::class, 'checkHttpHeader']);
$app->get('/tools/api/http-check', [ToolController::class, 'checkHttpHeader']);
$app->post('/tools/api/content-fetch', [ToolController::class, 'fetchUrlContent']);
$app->get('/tools/api/content-fetch', [ToolController::class, 'fetchUrlContent']);
$app->post('/tools/api/lead-capture', [ToolController::class, 'captureAuditLead']);
$app->get('/tools/seo-audit-report/print', [ToolController::class, 'auditReportPrint']);
$app->post('/tools/seo-audit-report/print', [ToolController::class, 'auditReportPrint']);

$app->get('/steps', [HomeController::class, 'steps']);
$app->get('/sitemap.xml', [SitemapController::class, 'sitemap']);
$app->get('/robots.txt', [SitemapController::class, 'robots']);

// 2. Authentication Routes
$app->get('/login', [AuthController::class, 'showLogin']);
$app->post('/login/submit', [AuthController::class, 'login']);
$app->get('/register', [AuthController::class, 'showRegister']);
$app->post('/register/submit', [AuthController::class, 'register']);
$app->get('/forgot-password', [AuthController::class, 'showForgotPassword']);
$app->post('/forgot-password/submit', [AuthController::class, 'forgotPassword']);
$app->get('/logout', [AuthController::class, 'logout']);

// 3. Order & Payment Lifecycle (NOWPayments.io, bKash, Direct Crypto)
$app->post('/order/create', [OrderController::class, 'create']);
$app->get('/checkout/{id}', [OrderController::class, 'checkout']);
$app->post('/checkout/{id}/submit-tx', [OrderController::class, 'submitTx']);
$app->post('/checkout/{id}/submit-bkash', [OrderController::class, 'submitBkash']);
$app->post('/payment/nowpayments/ipn', [OrderController::class, 'nowpaymentsIpn']);

// 4. Fallback Client/Register Redirects
$app->get('/client', [AuthController::class, 'redirectToLogin']);
$app->get('/client/{slug}', [AuthController::class, 'redirectToLogin']);

// 5. Admin Panel CMS Routes
$app->get('/admin', [AdminDashboardController::class, 'index']);
$app->get('/admin/services', [AdminServiceController::class, 'index']);
$app->get('/admin/services/create', [AdminServiceController::class, 'create']);
$app->post('/admin/services/store', [AdminServiceController::class, 'store']);
$app->get('/admin/services/{id}/edit', [AdminServiceController::class, 'edit']);
$app->post('/admin/services/{id}/update', [AdminServiceController::class, 'update']);
$app->post('/admin/services/{id}/delete', [AdminServiceController::class, 'delete']);
$app->get('/admin/orders', [AdminOrderController::class, 'index']);
$app->get('/admin/orders/{id}', [AdminOrderController::class, 'show']);
$app->post('/admin/orders/{id}/update-status', [AdminOrderController::class, 'updateStatus']);
$app->post('/admin/orders/{id}/upload-deliverable', [AdminOrderController::class, 'uploadDeliverable']);
$app->get('/admin/payments', [AdminPaymentController::class, 'index']);
$app->post('/admin/payments/{id}/confirm', [AdminPaymentController::class, 'confirm']);
$app->get('/admin/invoices', [AdminInvoiceController::class, 'index']);
$app->get('/admin/invoices/{id}', [AdminInvoiceController::class, 'show']);
$app->get('/admin/clients', [AdminClientController::class, 'index']);
$app->get('/admin/portfolio', [AdminPortfolioController::class, 'index']);
$app->get('/admin/portfolio/create', [AdminPortfolioController::class, 'create']);
$app->post('/admin/portfolio/store', [AdminPortfolioController::class, 'store']);
$app->get('/admin/portfolio/{id}/edit', [AdminPortfolioController::class, 'edit']);
$app->post('/admin/portfolio/{id}/update', [AdminPortfolioController::class, 'update']);
$app->post('/admin/portfolio/{id}/delete', [AdminPortfolioController::class, 'delete']);
$app->get('/admin/blog', [AdminBlogController::class, 'index']);
$app->get('/admin/blog/create', [AdminBlogController::class, 'create']);
$app->post('/admin/blog/store', [AdminBlogController::class, 'store']);
$app->get('/admin/blog/{id}/edit', [AdminBlogController::class, 'edit']);
$app->post('/admin/blog/{id}/update', [AdminBlogController::class, 'update']);
$app->post('/admin/blog/{id}/delete', [AdminBlogController::class, 'delete']);
$app->get('/admin/sections', [AdminCmsController::class, 'sections']);
$app->post('/admin/sections/update', [AdminCmsController::class, 'updateSections']);
$app->get('/admin/testimonials', [AdminCmsController::class, 'testimonials']);
$app->post('/admin/testimonials/store', [AdminCmsController::class, 'storeTestimonial']);
$app->post('/admin/testimonials/{id}/delete', [AdminCmsController::class, 'deleteTestimonial']);
$app->get('/admin/faqs', [AdminCmsController::class, 'faqs']);
$app->post('/admin/faqs/store', [AdminCmsController::class, 'storeFaq']);
$app->post('/admin/faqs/{id}/delete', [AdminCmsController::class, 'deleteFaq']);
$app->get('/admin/media', [AdminMediaController::class, 'index']);
$app->post('/admin/media/upload', [AdminMediaController::class, 'upload']);
$app->get('/admin/inquiries', [AdminInquiryController::class, 'index']);
$app->get('/admin/inquiries/{id}', [AdminInquiryController::class, 'show']);
$app->post('/admin/inquiries/{id}/mark-replied', [AdminInquiryController::class, 'markReplied']);
$app->get('/admin/support', [AdminSupportController::class, 'index']);
$app->get('/admin/support/{id}', [AdminSupportController::class, 'show']);
$app->post('/admin/support/{id}/reply', [AdminSupportController::class, 'reply']);
$app->post('/admin/support/{id}/status', [AdminSupportController::class, 'updateStatus']);
$app->get('/admin/seo', [AdminSeoController::class, 'index']);
$app->post('/admin/seo/update', [AdminSeoController::class, 'update']);
$app->get('/admin/settings', [AdminSettingsController::class, 'index']);
$app->post('/admin/settings/update', [AdminSettingsController::class, 'update']);
$app->get('/admin/audit-logs', [AdminCmsController::class, 'auditLogs']);

$app->run();

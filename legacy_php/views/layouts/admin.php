<?php
// views/layouts/admin.php - Admin Panel CMS Layout
require_once __DIR__ . '/../../core/Helpers.php';
require_once __DIR__ . '/../../core/Auth.php';

$user = Auth::user();
$siteLogoText = setting('site_logo_text', 'Abdullah Saleh');
$currentUri = $_SERVER['REQUEST_URI'] ?? '';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= e($pageTitle ?? 'Admin Dashboard') ?> | <?= e($siteLogoText) ?> CMS</title>
    
    <!-- Favicon & Icons -->
    <link rel="icon" type="image/svg+xml" href="<?= asset('images/favicon.svg') ?>">
    <link rel="alternate icon" href="<?= asset('images/favicon.svg') ?>">
    <link rel="apple-touch-icon" href="<?= asset('images/logo-icon.svg') ?>">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    
    <!-- Admin & Public Styles -->
    <link rel="stylesheet" href="<?= asset('css/style.css') ?>">
    <link rel="stylesheet" href="<?= asset('css/admin.css') ?>">
</head>
<body class="admin-body">

    <!-- Admin Sidebar -->
    <aside class="admin-sidebar">
        <div class="admin-sidebar-brand" style="padding: 12px 18px;">
            <a href="<?= url('/admin') ?>" style="display: flex; align-items: center; text-decoration: none;">
                <img src="<?= asset('images/logo-white.svg') ?>" alt="Abdullah Saleh" style="height: 38px; width: auto; max-width: 180px;">
            </a>
        </div>

        <ul class="admin-sidebar-menu">
            <li class="admin-menu-header">Overview</li>
            <li class="admin-menu-item">
                <a href="<?= url('/admin') ?>" class="admin-menu-link <?= ($currentUri === '/admin' || $currentUri === BASE_PATH . '/admin') ? 'active' : '' ?>">
                    <i class="fa-solid fa-gauge-high"></i> Dashboard
                </a>
            </li>

            <li class="admin-menu-header">Services & Sales</li>
            <li class="admin-menu-item">
                <a href="<?= url('/admin/services') ?>" class="admin-menu-link <?= str_contains($currentUri, '/admin/services') ? 'active' : '' ?>">
                    <i class="fa-solid fa-layer-group"></i> Services & Packages
                </a>
            </li>
            <li class="admin-menu-item">
                <a href="<?= url('/admin/orders') ?>" class="admin-menu-link <?= str_contains($currentUri, '/admin/orders') ? 'active' : '' ?>">
                    <i class="fa-solid fa-cart-shopping"></i> Orders & Deliverables
                </a>
            </li>
            <li class="admin-menu-item">
                <a href="<?= url('/admin/payments') ?>" class="admin-menu-link <?= str_contains($currentUri, '/admin/payments') ? 'active' : '' ?>">
                    <i class="fa-solid fa-bitcoin-sign"></i> Crypto Payments
                </a>
            </li>
            <li class="admin-menu-item">
                <a href="<?= url('/admin/invoices') ?>" class="admin-menu-link <?= str_contains($currentUri, '/admin/invoices') ? 'active' : '' ?>">
                    <i class="fa-solid fa-file-invoice-dollar"></i> Invoices
                </a>
            </li>
            <li class="admin-menu-item">
                <a href="<?= url('/admin/clients') ?>" class="admin-menu-link <?= str_contains($currentUri, '/admin/clients') ? 'active' : '' ?>">
                    <i class="fa-solid fa-users"></i> Client Accounts
                </a>
            </li>

            <li class="admin-menu-header">CMS & Content</li>
            <li class="admin-menu-item">
                <a href="<?= url('/admin/sections') ?>" class="admin-menu-link <?= str_contains($currentUri, '/admin/sections') ? 'active' : '' ?>">
                    <i class="fa-solid fa-table-columns"></i> Homepage Sections
                </a>
            </li>
            <li class="admin-menu-item">
                <a href="<?= url('/admin/portfolio') ?>" class="admin-menu-link <?= str_contains($currentUri, '/admin/portfolio') ? 'active' : '' ?>">
                    <i class="fa-solid fa-briefcase"></i> Portfolio & Case Studies
                </a>
            </li>
            <li class="admin-menu-item">
                <a href="<?= url('/admin/blog') ?>" class="admin-menu-link <?= str_contains($currentUri, '/admin/blog') ? 'active' : '' ?>">
                    <i class="fa-solid fa-newspaper"></i> Blog Articles
                </a>
            </li>
            <li class="admin-menu-item">
                <a href="<?= url('/admin/testimonials') ?>" class="admin-menu-link <?= str_contains($currentUri, '/admin/testimonials') ? 'active' : '' ?>">
                    <i class="fa-solid fa-quote-left"></i> Testimonials
                </a>
            </li>
            <li class="admin-menu-item">
                <a href="<?= url('/admin/faqs') ?>" class="admin-menu-link <?= str_contains($currentUri, '/admin/faqs') ? 'active' : '' ?>">
                    <i class="fa-solid fa-circle-question"></i> FAQs
                </a>
            </li>
            <li class="admin-menu-item">
                <a href="<?= url('/admin/media') ?>" class="admin-menu-link <?= str_contains($currentUri, '/admin/media') ? 'active' : '' ?>">
                    <i class="fa-solid fa-images"></i> Media Library
                </a>
            </li>

            <li class="admin-menu-header">Communications</li>
            <li class="admin-menu-item">
                <a href="<?= url('/admin/inquiries') ?>" class="admin-menu-link <?= str_contains($currentUri, '/admin/inquiries') ? 'active' : '' ?>">
                    <i class="fa-solid fa-envelope-open-text"></i> Contact Inquiries
                </a>
            </li>
            <li class="admin-menu-item">
                <a href="<?= url('/admin/support') ?>" class="admin-menu-link <?= str_contains($currentUri, '/admin/support') ? 'active' : '' ?>">
                    <i class="fa-solid fa-headset"></i> Support Tickets
                </a>
            </li>

            <li class="admin-menu-header">Configuration</li>
            <li class="admin-menu-item">
                <a href="<?= url('/admin/seo') ?>" class="admin-menu-link <?= str_contains($currentUri, '/admin/seo') ? 'active' : '' ?>">
                    <i class="fa-solid fa-magnifying-glass"></i> SEO & Meta Defaults
                </a>
            </li>
            <li class="admin-menu-item">
                <a href="<?= url('/admin/settings') ?>" class="admin-menu-link <?= str_contains($currentUri, '/admin/settings') ? 'active' : '' ?>">
                    <i class="fa-solid fa-sliders"></i> General & Branding
                </a>
            </li>
            <li class="admin-menu-item">
                <a href="<?= url('/admin/audit-logs') ?>" class="admin-menu-link <?= str_contains($currentUri, '/admin/audit-logs') ? 'active' : '' ?>">
                    <i class="fa-solid fa-shield-halved"></i> Audit Trail
                </a>
            </li>
        </ul>
    </aside>

    <!-- Main Container -->
    <div class="admin-main">
        <!-- Admin Topbar -->
        <header class="admin-topbar">
            <div style="display: flex; align-items: center; gap: 16px;">
                <button class="admin-sidebar-toggle" style="background:none; border:none; font-size:1.2rem; cursor:pointer; display:none;" aria-label="Toggle Menu">
                    <i class="fa-solid fa-bars"></i>
                </button>
                <a href="<?= url('/') ?>" target="_blank" class="btn btn-sm btn-outline"><i class="fa-solid fa-arrow-up-right-from-square"></i> View Live Site</a>
            </div>

            <div style="display: flex; align-items: center; gap: 20px;">
                <div style="font-size: 0.9rem; text-align: right;">
                    <div style="font-weight: 700; color: #0f172a;"><?= e($user['name'] ?? 'Admin') ?></div>
                    <div style="font-size: 0.78rem; color: #64748b;"><?= e($user['email'] ?? 'admin@seoservice.local') ?> (Super Admin)</div>
                </div>
                <a href="<?= url('/logout') ?>" class="btn btn-sm btn-outline" style="color: #ef4444; border-color: #fecaca;">
                    <i class="fa-solid fa-right-from-bracket"></i> Logout
                </a>
            </div>
        </header>

        <!-- Admin Alerts -->
        <?php if ($successMsg = flash('success')): ?>
            <div style="margin: 20px 30px 0;">
                <div style="background: #dcfce7; color: #166534; padding: 14px 20px; border-radius: 8px; border: 1px solid #bbf7d0; display: flex; align-items: center; gap: 10px; font-weight: 600;">
                    <i class="fa-solid fa-circle-check"></i>
                    <span><?= e($successMsg) ?></span>
                </div>
            </div>
        <?php endif; ?>

        <?php if ($errorMsg = flash('error')): ?>
            <div style="margin: 20px 30px 0;">
                <div style="background: #fee2e2; color: #991b1b; padding: 14px 20px; border-radius: 8px; border: 1px solid #fecaca; display: flex; align-items: center; gap: 10px; font-weight: 600;">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    <span><?= e($errorMsg) ?></span>
                </div>
            </div>
        <?php endif; ?>

        <!-- Admin View Content -->
        <div class="admin-content">
            <?= $content ?>
        </div>
    </div>

    <!-- Scripts -->
    <script src="<?= asset('js/admin.js') ?>"></script>
</body>
</html>

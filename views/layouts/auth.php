<?php
// views/layouts/auth.php - Authentication Layout in Digi Solution Theme
require_once __DIR__ . '/../../core/Helpers.php';

$siteLogoText = setting('site_logo_text', 'Abdullah Saleh');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= e($pageTitle ?? 'Sign In') ?> | <?= e($siteLogoText) ?></title>
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    
    <!-- Styles -->
    <link rel="stylesheet" href="<?= asset('css/style.css') ?>">
    <style>
        body {
            background: linear-gradient(135deg, #eef2ff 0%, #4361ee 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
        }
        .auth-card {
            background: #ffffff;
            border-radius: var(--radius-md);
            box-shadow: 0 20px 40px rgba(67, 97, 238, 0.2);
            max-width: 480px;
            width: 100%;
            padding: 38px 34px;
        }
        .auth-logo {
            text-align: center;
            margin-bottom: 24px;
        }
    </style>
</head>
<body>

    <div class="auth-card">
        <div class="auth-logo">
            <a href="<?= url('/') ?>" class="digi-logo" style="display: inline-flex; align-items: center; justify-content: center; gap: 12px; text-decoration: none;" aria-label="<?= e(setting('site_name', 'Abdullah Saleh')) ?>">
                <img src="<?= asset('images/logo-icon.svg') ?>" alt="Logo" style="height: 40px; width: 40px; border-radius: 9px; display: block;">
                <span style="font-family: var(--font-body); font-size: 1.4rem; font-weight: 600; color: #1e293b; letter-spacing: -0.015em; line-height: 1;"><?= e(setting('site_name', 'Abdullah Saleh')) ?></span>
            </a>
        </div>

        <?php if ($successMsg = flash('success')): ?>
            <div style="background: #eef2ff; color: #3730a3; padding: 12px 16px; border-radius: 6px; border: 1px solid #c7d2fe; font-size: 0.9rem; margin-bottom: 20px;">
                <?= e($successMsg) ?>
            </div>
        <?php endif; ?>

        <?php if ($errorMsg = flash('error')): ?>
            <div style="background: #fef2f2; color: #991b1b; padding: 12px 16px; border-radius: 6px; border: 1px solid #fecaca; font-size: 0.9rem; margin-bottom: 20px;">
                <?= e($errorMsg) ?>
            </div>
        <?php endif; ?>

        <?= $content ?>
    </div>

</body>
</html>

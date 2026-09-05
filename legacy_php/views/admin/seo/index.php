<?php
// views/admin/seo/index.php - SEO & Schema Management
?>

<div style="max-width: 860px; margin: 0 auto;">
    <div style="margin-bottom: 24px;">
        <h2 style="font-size: 1.6rem; color: #0f172a; margin-bottom: 4px;">SEO & Schema Management</h2>
        <p style="color: #64748b; font-size: 0.95rem;">Configure global title tags, search descriptions, Open Graph data, and structured data schemas.</p>
    </div>

    <form action="<?= url('/admin/seo/update') ?>" method="POST">
        <?= csrf_field() ?>

        <div class="admin-card">
            <div class="admin-card-header">
                <h3>Global Search Meta Tags</h3>
            </div>
            <div class="admin-card-body">
                <div class="form-group">
                    <label class="form-label">Default SEO Title Tag</label>
                    <input type="text" name="default_meta_title" value="<?= e(setting('default_meta_title')) ?>" class="form-control" required>
                    <small style="color: #64748b; font-size: 0.8rem;">Recommended: 50-60 characters.</small>
                </div>

                <div class="form-group">
                    <label class="form-label">Default Meta Description</label>
                    <textarea name="default_meta_description" class="form-control" style="min-height: 90px;" required><?= e(setting('default_meta_description')) ?></textarea>
                    <small style="color: #64748b; font-size: 0.8rem;">Recommended: 150-160 characters.</small>
                </div>

                <div class="form-group">
                    <label class="form-label">Global Meta Keywords</label>
                    <textarea name="default_meta_keywords" class="form-control" style="min-height: 70px;"><?= e(setting('default_meta_keywords')) ?></textarea>
                </div>
            </div>
        </div>

        <div class="admin-card">
            <div class="admin-card-header">
                <h3>Search Console & Analytics Integration</h3>
            </div>
            <div class="admin-card-body">
                <div class="form-group">
                    <label class="form-label">Google Analytics 4 Measurement ID (G-XXXXXXXXXX)</label>
                    <input type="text" name="google_analytics_id" value="<?= e(setting('google_analytics_id')) ?>" class="form-control" placeholder="G-XXXXXXXXXX">
                </div>

                <div class="form-group">
                    <label class="form-label">Google Search Console Verification Meta Tag Code</label>
                    <input type="text" name="google_search_console_code" value="<?= e(setting('google_search_console_code')) ?>" class="form-control" placeholder="google-site-verification=...">
                </div>
            </div>
        </div>

        <button type="submit" class="btn btn-primary btn-lg"><i class="fa-solid fa-floppy-disk"></i> Save SEO Settings</button>
    </form>
</div>

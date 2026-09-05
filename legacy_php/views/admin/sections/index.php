<?php
// views/admin/sections/index.php - Homepage Sections CMS Editor
?>

<div style="margin-bottom: 24px;">
    <h2 style="font-size: 1.6rem; color: #0f172a; margin-bottom: 4px;">Homepage Sections & Content CMS</h2>
    <p style="color: #64748b; font-size: 0.95rem;">Update hero headlines, trust statistics, and conversion copy directly without editing code.</p>
</div>

<div class="admin-card">
    <div class="admin-card-body">
        <form action="<?= url('/admin/sections/update') ?>" method="POST">
            <?= csrf_field() ?>

            <!-- Hero Section -->
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 24px; margin-bottom: 24px;">
                <h3 style="font-size: 1.2rem; color: #1e40af; margin-bottom: 16px;"><i class="fa-solid fa-flag"></i> Hero Section Settings</h3>
                
                <div class="form-group">
                    <label class="form-label">Hero Badge Text</label>
                    <input type="text" name="hero_badge" value="<?= e($sections['hero']['settings']['badge'] ?? 'Verified SEO Expert & Consultant') ?>" class="form-control">
                </div>

                <div class="form-group">
                    <label class="form-label">Hero Subtitle / Description</label>
                    <textarea name="hero_content" class="form-control" style="min-height: 90px;"><?= e($sections['hero']['content'] ?? '') ?></textarea>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div class="form-group">
                        <label class="form-label">Primary CTA Button Text</label>
                        <input type="text" name="hero_cta_primary" value="<?= e($sections['hero']['settings']['cta_primary_text'] ?? 'Explore SEO Services') ?>" class="form-control">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Secondary CTA Button Text</label>
                        <input type="text" name="hero_cta_secondary" value="<?= e($sections['hero']['settings']['cta_secondary_text'] ?? 'View Case Studies') ?>" class="form-control">
                    </div>
                </div>
            </div>

            <!-- Trust Statistics -->
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 24px; margin-bottom: 24px;">
                <h3 style="font-size: 1.2rem; color: #1e40af; margin-bottom: 16px;"><i class="fa-solid fa-calculator"></i> Trust Counter Statistics</h3>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 16px;">
                    <div class="form-group">
                        <label class="form-label">Stat 1 Value</label>
                        <input type="text" name="stat1_num" value="<?= e($sections['hero']['settings']['stat1_num'] ?? '7+') ?>" class="form-control">
                        <label class="form-label" style="margin-top: 6px;">Stat 1 Label</label>
                        <input type="text" name="stat1_label" value="<?= e($sections['hero']['settings']['stat1_label'] ?? 'Years SEO Experience') ?>" class="form-control">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Stat 2 Value</label>
                        <input type="text" name="stat2_num" value="<?= e($sections['hero']['settings']['stat2_num'] ?? '120+') ?>" class="form-control">
                        <label class="form-label" style="margin-top: 6px;">Stat 2 Label</label>
                        <input type="text" name="stat2_label" value="<?= e($sections['hero']['settings']['stat2_label'] ?? 'Projects Optimized') ?>" class="form-control">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Stat 3 Value</label>
                        <input type="text" name="stat3_num" value="<?= e($sections['hero']['settings']['stat3_num'] ?? '98%') ?>" class="form-control">
                        <label class="form-label" style="margin-top: 6px;">Stat 3 Label</label>
                        <input type="text" name="stat3_label" value="<?= e($sections['hero']['settings']['stat3_label'] ?? 'Client Satisfaction Rate') ?>" class="form-control">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Stat 4 Value</label>
                        <input type="text" name="stat4_num" value="<?= e($sections['hero']['settings']['stat4_num'] ?? '3.5x') ?>" class="form-control">
                        <label class="form-label" style="margin-top: 6px;">Stat 4 Label</label>
                        <input type="text" name="stat4_label" value="<?= e($sections['hero']['settings']['stat4_label'] ?? 'Average Organic ROI') ?>" class="form-control">
                    </div>
                </div>
            </div>

            <button type="submit" class="btn btn-primary btn-lg"><i class="fa-solid fa-floppy-disk"></i> Update Homepage Content</button>
        </form>
    </div>
</div>

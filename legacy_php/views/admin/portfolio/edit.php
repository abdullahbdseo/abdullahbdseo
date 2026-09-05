<?php
// views/admin/portfolio/edit.php - Create/Edit Portfolio & Case Study

$isEdit = !empty($portfolio['id']);
$formAction = $isEdit ? url('/admin/portfolio/' . $portfolio['id'] . '/update') : url('/admin/portfolio/store');
$metrics = json_decode($portfolio['metrics_json'] ?? '{}', true);
?>

<div style="max-width: 900px; margin: 0 auto;">
    <div style="margin-bottom: 20px;">
        <a href="<?= url('/admin/portfolio') ?>" style="color: #64748b; font-size: 0.9rem;"><i class="fa-solid fa-arrow-left"></i> Back to Portfolio</a>
        <h2 style="font-size: 1.6rem; color: #0f172a; margin-top: 6px;"><?= $isEdit ? 'Edit Case Study' : 'Create New Case Study' ?></h2>
    </div>

    <form action="<?= $formAction ?>" method="POST">
        <?= csrf_field() ?>

        <div class="admin-card">
            <div class="admin-card-header">
                <h3>Case Study Metadata</h3>
            </div>
            <div class="admin-card-body">
                <div class="form-group">
                    <label class="form-label">Case Study Headline / Title *</label>
                    <input type="text" name="title" value="<?= e($portfolio['title'] ?? '') ?>" class="form-control" required placeholder="e.g. Scaling Organic Revenue by +240% for Nordic Furnishings Store">
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px;">
                    <div class="form-group">
                        <label class="form-label">Client Name *</label>
                        <input type="text" name="client_name" value="<?= e($portfolio['client_name'] ?? '') ?>" class="form-control" required placeholder="e.g. Nordic Living Direct">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Industry *</label>
                        <input type="text" name="industry" value="<?= e($portfolio['industry'] ?? 'E-Commerce') ?>" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Project Duration</label>
                        <input type="text" name="duration" value="<?= e($portfolio['duration'] ?? '6 Months') ?>" class="form-control">
                    </div>
                </div>

                <div class="form-group">
                    <label class="form-label">Website URL</label>
                    <input type="url" name="website_url" value="<?= e($portfolio['website_url'] ?? '') ?>" class="form-control" placeholder="https://example.com">
                </div>

                <div class="form-group">
                    <label class="form-label">Short Summary (Card Abstract) *</label>
                    <textarea name="summary" class="form-control" style="min-height: 80px;" required><?= e($portfolio['summary'] ?? '') ?></textarea>
                </div>
            </div>
        </div>

        <div class="admin-card">
            <div class="admin-card-header">
                <h3>Case Study Narrative Breakdown</h3>
            </div>
            <div class="admin-card-body">
                <div class="form-group">
                    <label class="form-label">1. The Client Challenge & Initial Problem</label>
                    <textarea name="challenge" class="form-control" style="min-height: 100px;"><?= e($portfolio['challenge'] ?? '') ?></textarea>
                </div>
                <div class="form-group">
                    <label class="form-label">2. The Strategic SEO Roadmap & Research</label>
                    <textarea name="strategy" class="form-control" style="min-height: 100px;"><?= e($portfolio['strategy'] ?? '') ?></textarea>
                </div>
                <div class="form-group">
                    <label class="form-label">3. Technical & Content Implementation</label>
                    <textarea name="implementation" class="form-control" style="min-height: 100px;"><?= e($portfolio['implementation'] ?? '') ?></textarea>
                </div>
                <div class="form-group">
                    <label class="form-label">4. Results & Organic Business Growth</label>
                    <textarea name="results" class="form-control" style="min-height: 100px;"><?= e($portfolio['results'] ?? '') ?></textarea>
                </div>

                <div style="display: flex; gap: 24px;">
                    <label style="display: flex; align-items: center; gap: 8px; font-weight: 600; cursor: pointer;">
                        <input type="checkbox" name="is_featured" value="1" <?= !empty($portfolio['is_featured']) ? 'checked' : '' ?>> Feature on Homepage
                    </label>
                    <label style="display: flex; align-items: center; gap: 8px; font-weight: 600; cursor: pointer;">
                        <input type="checkbox" name="is_published" value="1" <?= ($portfolio['status'] ?? 'published') === 'published' ? 'checked' : '' ?>> Published
                    </label>
                </div>
            </div>
        </div>

        <button type="submit" class="btn btn-primary btn-lg"><i class="fa-solid fa-floppy-disk"></i> Save Case Study</button>
    </form>
</div>

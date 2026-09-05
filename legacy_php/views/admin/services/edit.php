<?php
// views/admin/services/edit.php - Create/Edit Service & Packages

$isEdit = !empty($service['id']);
$formAction = $isEdit ? url('/admin/services/' . $service['id'] . '/update') : url('/admin/services/store');
$packages = $service['packages'] ?? [];
?>

<div style="max-width: 900px; margin: 0 auto;">
    <div style="margin-bottom: 20px;">
        <a href="<?= url('/admin/services') ?>" style="color: #64748b; font-size: 0.9rem;"><i class="fa-solid fa-arrow-left"></i> Back to Services</a>
        <h2 style="font-size: 1.6rem; color: #0f172a; margin-top: 6px;"><?= $isEdit ? 'Edit Service: ' . e($service['title']) : 'Create New SEO Service' ?></h2>
    </div>

    <form action="<?= $formAction ?>" method="POST">
        <?= csrf_field() ?>

        <div class="admin-card">
            <div class="admin-card-header">
                <h3>Primary Information</h3>
            </div>
            <div class="admin-card-body">
                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px;">
                    <div class="form-group">
                        <label class="form-label">Service Title *</label>
                        <input type="text" name="title" value="<?= e($service['title'] ?? '') ?>" class="form-control" required placeholder="e.g. Comprehensive Technical SEO Audit">
                    </div>

                    <div class="form-group">
                        <label class="form-label">Category</label>
                        <select name="category_id" class="form-control">
                            <?php foreach ($categories as $cat): ?>
                                <option value="<?= $cat['id'] ?>" <?= ($service['category_id'] ?? 0) == $cat['id'] ? 'selected' : '' ?>><?= e($cat['name']) ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px;">
                    <div class="form-group">
                        <label class="form-label">Icon (Font Awesome class)</label>
                        <input type="text" name="icon" value="<?= e($service['icon'] ?? 'fa-chart-line') ?>" class="form-control" placeholder="fa-chart-line">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Starting Price ($)</label>
                        <input type="number" step="0.01" name="starting_price" value="<?= e($service['starting_price'] ?? '250.00') ?>" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Standard Delivery Time</label>
                        <input type="text" name="delivery_time" value="<?= e($service['delivery_time'] ?? '5-7 Days') ?>" class="form-control" placeholder="5-7 Business Days">
                    </div>
                </div>

                <div class="form-group">
                    <label class="form-label">Short Description (Card Summary) *</label>
                    <textarea name="short_description" class="form-control" style="min-height: 80px;" required><?= e($service['short_description'] ?? '') ?></textarea>
                </div>

                <div class="form-group">
                    <label class="form-label">Full Deliverables & Methodology Description *</label>
                    <textarea name="description" class="form-control" style="min-height: 180px;" required><?= e($service['description'] ?? '') ?></textarea>
                </div>

                <div style="display: flex; gap: 24px;">
                    <label style="display: flex; align-items: center; gap: 8px; font-weight: 600; cursor: pointer;">
                        <input type="checkbox" name="is_featured" value="1" <?= !empty($service['is_featured']) ? 'checked' : '' ?>> Feature on Homepage
                    </label>
                    <label style="display: flex; align-items: center; gap: 8px; font-weight: 600; cursor: pointer;">
                        <input type="checkbox" name="is_active" value="1" <?= ($service['status'] ?? 'active') === 'active' ? 'checked' : '' ?>> Active
                    </label>
                </div>
            </div>
        </div>

        <button type="submit" class="btn btn-primary btn-lg"><i class="fa-solid fa-floppy-disk"></i> Save Service</button>
    </form>
</div>

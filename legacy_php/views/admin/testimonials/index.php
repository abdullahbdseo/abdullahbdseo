<?php
// views/admin/testimonials/index.php - Testimonials CMS
?>

<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
    <div>
        <h2 style="font-size: 1.6rem; color: #0f172a; margin-bottom: 4px;">Testimonials Management</h2>
        <p style="color: #64748b; font-size: 0.95rem;">Manage real client reviews and feedback.</p>
    </div>
</div>

<div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 24px;">
    <div class="admin-card">
        <div class="table-responsive">
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Client</th>
                        <th>Review</th>
                        <th>Rating</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($testimonials as $t): ?>
                        <tr>
                            <td>
                                <div style="font-weight: 700; color: #0f172a;"><?= e($t['name']) ?></div>
                                <div style="font-size: 0.78rem; color: #64748b;"><?= e($t['position']) ?> • <?= e($t['company']) ?></div>
                            </td>
                            <td style="font-size: 0.88rem;"><?= e(str_limit($t['testimonial'], 80)) ?></td>
                            <td style="color: #f59e0b;"><i class="fa-solid fa-star"></i> <?= e($t['rating']) ?></td>
                            <td>
                                <form action="<?= url('/admin/testimonials/' . $t['id'] . '/delete') ?>" method="POST" onsubmit="return confirm('Delete testimonial?');">
                                    <?= csrf_field() ?>
                                    <button type="submit" class="btn btn-sm btn-outline" style="color:#ef4444; border-color:#fecaca;"><i class="fa-solid fa-trash"></i></button>
                                </form>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Add Testimonial -->
    <div class="admin-card">
        <div class="admin-card-header">
            <h3>Add New Testimonial</h3>
        </div>
        <div class="admin-card-body">
            <form action="<?= url('/admin/testimonials/store') ?>" method="POST">
                <?= csrf_field() ?>
                <div class="form-group">
                    <label class="form-label">Client Name *</label>
                    <input type="text" name="name" class="form-control" required placeholder="e.g. Sarah Jenkins">
                </div>
                <div class="form-group">
                    <label class="form-label">Company Name</label>
                    <input type="text" name="company" class="form-control" placeholder="e.g. Apex Commerce">
                </div>
                <div class="form-group">
                    <label class="form-label">Position / Role</label>
                    <input type="text" name="position" class="form-control" placeholder="e.g. Head of Growth">
                </div>
                <div class="form-group">
                    <label class="form-label">Rating (1-5)</label>
                    <select name="rating" class="form-control">
                        <option value="5" selected>5 Stars (★★★★★)</option>
                        <option value="4">4 Stars (★★★★☆)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Testimonial Content *</label>
                    <textarea name="testimonial" class="form-control" style="min-height: 100px;" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary btn-block"><i class="fa-solid fa-plus"></i> Add Testimonial</button>
            </form>
        </div>
    </div>
</div>

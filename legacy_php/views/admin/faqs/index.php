<?php
// views/admin/faqs/index.php - FAQs CMS
?>

<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
    <div>
        <h2 style="font-size: 1.6rem; color: #0f172a; margin-bottom: 4px;">FAQ Management</h2>
        <p style="color: #64748b; font-size: 0.95rem;">Manage global FAQs and answers displayed on the public FAQ page.</p>
    </div>
</div>

<div style="display: grid; grid-template-columns: 1.3fr 0.7fr; gap: 24px;">
    <div class="admin-card">
        <div class="table-responsive">
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Sort</th>
                        <th>Category</th>
                        <th>Question</th>
                        <th>Answer Summary</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($faqs)): ?>
                        <tr>
                            <td colspan="5" style="text-align: center; color: #94a3b8; padding: 30px;">No FAQs found. Add your first question on the right.</td>
                        </tr>
                    <?php endif; ?>
                    <?php foreach ($faqs as $f): ?>
                        <tr>
                            <td style="font-size: 0.85rem; font-weight: 600; color: #64748b; width: 45px;"><?= (int)($f['sort_order'] ?? 0) ?></td>
                            <td>
                                <span class="badge" style="background: #eef2ff; color: #4361ee; border: 1px solid #c7d2fe; font-size: 0.75rem; padding: 3px 8px; border-radius: 9999px; white-space: nowrap;">
                                    <?= e($f['category'] ?: 'General SEO') ?>
                                </span>
                            </td>
                            <td style="font-weight: 700; color: #0f172a; min-width: 180px;"><?= e($f['question']) ?></td>
                            <td style="font-size: 0.85rem; color: #64748b; max-width: 240px;"><?= e(str_limit($f['answer'], 80)) ?></td>
                            <td style="width: 50px;">
                                <form action="<?= url('/admin/faqs/' . $f['id'] . '/delete') ?>" method="POST" onsubmit="return confirm('Delete this FAQ?');">
                                    <?= csrf_field() ?>
                                    <button type="submit" class="btn btn-sm btn-outline" style="color:#ef4444; border-color:#fecaca;" title="Delete FAQ"><i class="fa-solid fa-trash"></i></button>
                                </form>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Add FAQ -->
    <div class="admin-card">
        <div class="admin-card-header">
            <h3>Add New FAQ</h3>
        </div>
        <div class="admin-card-body">
            <form action="<?= url('/admin/faqs/store') ?>" method="POST">
                <?= csrf_field() ?>
                <div class="form-group">
                    <label class="form-label">Category</label>
                    <select name="category" class="form-control">
                        <option value="General SEO">General SEO</option>
                        <option value="Technical SEO">Technical SEO</option>
                        <option value="Payments & Billing">Payments & Billing</option>
                        <option value="Deliverables & Reporting">Deliverables & Reporting</option>
                        <option value="Custom / Other">Custom / Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Question *</label>
                    <input type="text" name="question" class="form-control" required placeholder="e.g. Do you provide ongoing monthly SEO support?">
                </div>
                <div class="form-group">
                    <label class="form-label">Answer *</label>
                    <textarea name="answer" class="form-control" style="min-height: 120px;" required placeholder="Detailed, helpful answer..."></textarea>
                </div>
                <div class="form-group">
                    <label class="form-label">Sort Order</label>
                    <input type="number" name="sort_order" class="form-control" value="0" placeholder="0">
                </div>
                <button type="submit" class="btn btn-primary btn-block"><i class="fa-solid fa-plus"></i> Add FAQ</button>
            </form>
        </div>
    </div>
</div>

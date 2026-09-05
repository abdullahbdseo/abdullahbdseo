<?php
// views/admin/services/index.php - Admin Services List
?>

<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
    <div>
        <h2 style="font-size: 1.6rem; color: #0f172a; margin-bottom: 4px;">Service Management</h2>
        <p style="color: #64748b; font-size: 0.95rem;">Manage SEO services, packages, pricing tiers, and deliverables.</p>
    </div>
    <a href="<?= url('/admin/services/create') ?>" class="btn btn-primary"><i class="fa-solid fa-plus"></i> Add New Service</a>
</div>

<div class="admin-card">
    <div class="table-responsive">
        <table class="admin-table">
            <thead>
                <tr>
                    <th>Icon</th>
                    <th>Service Title</th>
                    <th>Category</th>
                    <th>Starting Price</th>
                    <th>Delivery</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($services as $srv): ?>
                    <tr>
                        <td>
                            <div class="service-icon-box" style="width: 40px; height: 40px; font-size: 1.1rem; margin-bottom: 0;">
                                <i class="fa-solid <?= e($srv['icon'] ?? 'fa-chart-line') ?>"></i>
                            </div>
                        </td>
                        <td>
                            <div style="font-weight: 700; color: #0f172a;"><?= e($srv['title']) ?></div>
                            <div style="font-size: 0.8rem; color: #64748b;"><?= e(str_limit($srv['short_description'] ?? '', 60)) ?></div>
                        </td>
                        <td><span class="badge badge-cyan"><?= e($srv['category_name'] ?? 'SEO') ?></span></td>
                        <td style="font-weight: 700;"><?= formatCurrency($srv['starting_price']) ?></td>
                        <td style="font-size: 0.88rem; color: #64748b;"><?= e($srv['delivery_time']) ?></td>
                        <td><span class="status-pill <?= e($srv['status']) ?>"><?= e($srv['status']) ?></span></td>
                        <td>
                            <div style="display: flex; gap: 8px;">
                                <a href="<?= url('/admin/services/' . $srv['id'] . '/edit') ?>" class="btn btn-sm btn-outline"><i class="fa-solid fa-pen-to-square"></i> Edit</a>
                                <form action="<?= url('/admin/services/' . $srv['id'] . '/delete') ?>" method="POST" onsubmit="return confirm('Are you sure you want to delete this service?');">
                                    <?= csrf_field() ?>
                                    <button type="submit" class="btn btn-sm btn-outline" style="color:#ef4444; border-color:#fecaca;"><i class="fa-solid fa-trash"></i></button>
                                </form>
                            </div>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</div>

<?php
// views/admin/portfolio/index.php - Admin Portfolio List
?>

<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
    <div>
        <h2 style="font-size: 1.6rem; color: #0f172a; margin-bottom: 4px;">Portfolio & Case Studies</h2>
        <p style="color: #64748b; font-size: 0.95rem;">Manage published SEO case studies, client results, and before/after metrics.</p>
    </div>
    <a href="<?= url('/admin/portfolio/create') ?>" class="btn btn-primary"><i class="fa-solid fa-plus"></i> Add New Case Study</a>
</div>

<div class="admin-card">
    <div class="table-responsive">
        <table class="admin-table">
            <thead>
                <tr>
                    <th>Case Study Title</th>
                    <th>Client / Brand</th>
                    <th>Industry</th>
                    <th>Timeline</th>
                    <th>Featured</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($portfolios as $p): ?>
                    <tr>
                        <td style="font-weight: 700; color: #0f172a;"><?= e($p['title']) ?></td>
                        <td><?= e($p['client_name']) ?></td>
                        <td><span class="badge badge-cyan"><?= e($p['industry']) ?></span></td>
                        <td><?= e($p['duration']) ?></td>
                        <td><?= !empty($p['is_featured']) ? '<i class="fa-solid fa-check" style="color:#10b981;"></i> Yes' : 'No' ?></td>
                        <td><span class="status-pill <?= e($p['status']) ?>"><?= e($p['status']) ?></span></td>
                        <td>
                            <div style="display: flex; gap: 8px;">
                                <a href="<?= url('/admin/portfolio/' . $p['id'] . '/edit') ?>" class="btn btn-sm btn-outline"><i class="fa-solid fa-pen-to-square"></i> Edit</a>
                                <form action="<?= url('/admin/portfolio/' . $p['id'] . '/delete') ?>" method="POST" onsubmit="return confirm('Delete this project?');">
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

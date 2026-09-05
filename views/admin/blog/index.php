<?php
// views/admin/blog/index.php - Admin Blog List
?>

<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
    <div>
        <h2 style="font-size: 1.6rem; color: #0f172a; margin-bottom: 4px;">Blog & Knowledge CMS</h2>
        <p style="color: #64748b; font-size: 0.95rem;">Publish and manage SEO technical guides, algorithms breakdown, and articles.</p>
    </div>
    <a href="<?= url('/admin/blog/create') ?>" class="btn btn-primary"><i class="fa-solid fa-plus"></i> Write New Article</a>
</div>

<div class="admin-card">
    <div class="table-responsive">
        <table class="admin-table">
            <thead>
                <tr>
                    <th>Article Title</th>
                    <th>Category</th>
                    <th>Views</th>
                    <th>Status</th>
                    <th>Published Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($posts as $post): ?>
                    <tr>
                        <td style="font-weight: 700; color: #0f172a;">
                            <div><?= e($post['title']) ?></div>
                            <div style="font-size: 0.78rem; color: #64748b;">Slug: /blog/<?= e($post['slug']) ?></div>
                        </td>
                        <td><span class="badge badge-cyan"><?= e($post['category_name'] ?? 'SEO') ?></span></td>
                        <td style="font-weight: 700;"><?= number_format($post['views'] ?? 0) ?></td>
                        <td><span class="status-pill <?= e($post['status']) ?>"><?= e($post['status']) ?></span></td>
                        <td style="font-size: 0.85rem; color: #64748b;"><?= formatDate($post['published_at']) ?></td>
                        <td>
                            <div style="display: flex; gap: 8px;">
                                <a href="<?= url('/admin/blog/' . $post['id'] . '/edit') ?>" class="btn btn-sm btn-outline"><i class="fa-solid fa-pen-to-square"></i> Edit</a>
                                <form action="<?= url('/admin/blog/' . $post['id'] . '/delete') ?>" method="POST" onsubmit="return confirm('Delete this post?');">
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

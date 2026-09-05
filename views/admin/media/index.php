<?php
// views/admin/media/index.php - Media Library Management
?>

<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
    <div>
        <h2 style="font-size: 1.6rem; color: #0f172a; margin-bottom: 4px;">Media Library</h2>
        <p style="color: #64748b; font-size: 0.95rem;">Upload and manage brand visual assets, icons, and client deliverable files.</p>
    </div>
</div>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 30px;">
    <div class="admin-card">
        <div class="admin-card-header">
            <h3>Upload New Media File</h3>
        </div>
        <div class="admin-card-body">
            <form action="<?= url('/admin/media/upload') ?>" method="POST" enctype="multipart/form-data">
                <?= csrf_field() ?>
                <div class="form-group">
                    <label class="form-label">Select File (PNG, JPG, WebP, PDF, ZIP, SVG)</label>
                    <input type="file" name="media_file" class="form-control" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Alt Text (For SEO)</label>
                    <input type="text" name="alt_text" class="form-control" placeholder="Descriptive image alt text">
                </div>
                <button type="submit" class="btn btn-primary"><i class="fa-solid fa-cloud-arrow-up"></i> Upload Media</button>
            </form>
        </div>
    </div>
</div>

<div class="admin-card">
    <div class="admin-card-header">
        <h3>Uploaded Assets</h3>
    </div>
    <div class="table-responsive">
        <table class="admin-table">
            <thead>
                <tr>
                    <th>Filename</th>
                    <th>Type</th>
                    <th>Size</th>
                    <th>Uploaded Date</th>
                    <th>URL</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($mediaList)): ?>
                    <tr><td colspan="5" style="text-align: center; color: #64748b; padding: 20px;">No media files uploaded yet.</td></tr>
                <?php else: ?>
                    <?php foreach ($mediaList as $m): ?>
                        <tr>
                            <td style="font-weight: 700; color: #0f172a;"><?= e($m['original_name']) ?></td>
                            <td><span class="badge badge-cyan"><?= e($m['mime_type']) ?></span></td>
                            <td><?= round($m['size'] / 1024) ?> KB</td>
                            <td style="font-size: 0.85rem; color: #64748b;"><?= formatDate($m['created_at']) ?></td>
                            <td><a href="<?= uploadUrl($m['path']) ?>" target="_blank" class="btn btn-sm btn-outline"><i class="fa-solid fa-arrow-up-right-from-square"></i> Open</a></td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>

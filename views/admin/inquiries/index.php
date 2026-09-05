<?php
// views/admin/inquiries/index.php - Contact Inquiries List
?>

<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
    <div>
        <h2 style="font-size: 1.6rem; color: #0f172a; margin-bottom: 4px;">Contact Inquiries</h2>
        <p style="color: #64748b; font-size: 0.95rem;">Incoming strategy requests and project consultation messages.</p>
    </div>
</div>

<div class="admin-card">
    <div class="table-responsive">
        <table class="admin-table">
            <thead>
                <tr>
                    <th>Lead Name</th>
                    <th>Email / Phone</th>
                    <th>Website URL</th>
                    <th>Budget</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($inquiries)): ?>
                    <tr><td colspan="7" style="text-align: center; color: #64748b; padding: 20px;">No inquiries found.</td></tr>
                <?php else: ?>
                    <?php foreach ($inquiries as $inq): ?>
                        <tr>
                            <td style="font-weight: 700; color: #0f172a;"><?= e($inq['name']) ?></td>
                            <td>
                                <div><?= e($inq['email']) ?></div>
                                <div style="font-size: 0.78rem; color: #64748b;"><?= e($inq['phone'] ?? '') ?></div>
                            </td>
                            <td><a href="<?= e($inq['website']) ?>" target="_blank" style="font-size: 0.88rem;"><?= e(str_limit($inq['website'] ?? '', 25)) ?></a></td>
                            <td><span class="badge badge-cyan"><?= e($inq['budget']) ?></span></td>
                            <td><span class="status-pill <?= e($inq['status']) ?>"><?= e($inq['status']) ?></span></td>
                            <td style="font-size: 0.85rem; color: #64748b;"><?= formatDate($inq['created_at']) ?></td>
                            <td>
                                <a href="<?= url('/admin/inquiries/' . $inq['id']) ?>" class="btn btn-sm btn-outline"><i class="fa-solid fa-eye"></i> View</a>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>

<?php
// views/auth/login.php - Login Page in Digi Solution Theme
?>

<h2 style="font-size: 1.6rem; margin-bottom: 6px; text-align: center; color: var(--digi-text-main);">Admin Portal</h2>
<p style="font-size: 0.9rem; color: var(--digi-text-muted); text-align: center; margin-bottom: 24px;">
    Sign in with your administrator credentials to access the CMS dashboard.
</p>

<!-- Demo Login Hint Box -->
<div style="background: #eef2ff; border: 1px solid #c7d2fe; border-radius: 6px; padding: 14px; margin-bottom: 20px; font-size: 0.82rem; color: #3730a3;">
    <div style="font-weight: 700; margin-bottom: 6px;"><i class="fa-solid fa-shield-halved"></i> Administrator Account:</div>
    <div><strong>Admin:</strong> <code>admin@seoservice.local</code> / <code>Admin@123456</code></div>
</div>

<form action="<?= url('/login/submit') ?>" method="POST">
    <?= csrf_field() ?>

    <div class="form-group-clean" style="margin-bottom: 16px;">
        <label style="display:block; font-size: 0.82rem; font-weight: 700; color: var(--digi-text-main); margin-bottom: 6px;">Email Address</label>
        <input type="email" name="email" class="digi-input" required placeholder="admin@seoservice.local" autofocus>
    </div>

    <div class="form-group-clean" style="margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <label style="font-size: 0.82rem; font-weight: 700; color: var(--digi-text-main); margin-bottom: 0;">Password</label>
            <a href="<?= url('/forgot-password') ?>" style="font-size: 0.82rem; color: var(--digi-blue);">Forgot password?</a>
        </div>
        <input type="password" name="password" class="digi-input" required placeholder="Enter password">
    </div>

    <button type="submit" class="btn btn-blue-solid btn-block btn-lg">
        <i class="fa-solid fa-arrow-right-to-bracket"></i> Sign In to Admin
    </button>
</form>

<div style="text-align: center; margin-top: 24px; font-size: 0.85rem; color: var(--digi-text-muted);">
    <a href="<?= url('/') ?>" style="color: var(--digi-blue); font-weight: 600;"><i class="fa-solid fa-arrow-left"></i> Return to Homepage</a>
</div>

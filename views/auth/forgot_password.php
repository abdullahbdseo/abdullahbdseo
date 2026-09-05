<?php
// views/auth/forgot_password.php
?>

<h2 style="font-size: 1.6rem; margin-bottom: 6px; text-align: center; color: var(--brand-dark);">Reset Password</h2>
<p style="font-size: 0.9rem; color: var(--brand-text-muted); text-align: center; margin-bottom: 24px;">
    Enter your registered email address and we'll send password recovery instructions.
</p>

<form action="<?= url('/forgot-password/submit') ?>" method="POST">
    <?= csrf_field() ?>

    <div class="form-group">
        <label class="form-label">Email Address</label>
        <input type="email" name="email" class="form-control" required placeholder="name@example.com">
    </div>

    <button type="submit" class="btn btn-primary btn-block btn-lg" style="margin-top: 10px;">
        <i class="fa-solid fa-paper-plane"></i> Send Recovery Link
    </button>
</form>

<div style="text-align: center; margin-top: 24px; font-size: 0.9rem; color: var(--brand-text-muted);">
    Remembered your password? <a href="<?= url('/login') ?>" style="font-weight: 600;">Sign In</a>
</div>

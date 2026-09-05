<?php
// views/public/errors/403.php
?>

<section class="section" style="padding: 120px 0; text-align: center;">
    <div class="container" style="max-width: 600px;">
        <div style="font-family: var(--font-heading); font-size: 6rem; font-weight: 800; color: var(--brand-danger); line-height: 1;">403</div>
        <h2 style="font-size: 2rem; margin: 16px 0;">Access Forbidden</h2>
        <p style="color: var(--brand-text-muted); font-size: 1.1rem; margin-bottom: 30px;">
            You do not have permission to access this administrative resource.
        </p>
        <a href="<?= url('/') ?>" class="btn btn-primary btn-lg"><i class="fa-solid fa-house"></i> Return to Homepage</a>
    </div>
</section>

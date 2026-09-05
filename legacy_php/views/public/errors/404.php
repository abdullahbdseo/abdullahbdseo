<?php
// views/public/errors/404.php
?>

<section class="section" style="padding: 120px 0; text-align: center;">
    <div class="container" style="max-width: 600px;">
        <div style="font-family: var(--font-heading); font-size: 6rem; font-weight: 800; color: var(--brand-primary); line-height: 1;">404</div>
        <h2 style="font-size: 2rem; margin: 16px 0;">Page Not Found</h2>
        <p style="color: var(--brand-text-muted); font-size: 1.1rem; margin-bottom: 30px;">
            The page you are looking for might have been moved, renamed, or is temporarily unavailable.
        </p>
        <a href="<?= url('/') ?>" class="btn btn-primary btn-lg"><i class="fa-solid fa-house"></i> Return to Homepage</a>
    </div>
</section>

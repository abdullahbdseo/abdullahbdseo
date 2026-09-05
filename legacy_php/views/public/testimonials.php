<?php
// views/public/testimonials.php - Client Reviews & Testimonials
?>

<section class="section" style="background: var(--brand-surface); border-bottom: 1px solid var(--brand-border); padding: 60px 0;">
    <div class="container" style="text-align: center;">
        <span class="badge badge-primary">Reputation & Trust</span>
        <h1 style="font-size: 2.8rem; margin: 12px 0 16px;">Client Testimonials & Feedback</h1>
        <p style="font-size: 1.15rem; color: var(--brand-text-muted); max-width: 680px; margin: 0 auto;">
            See what e-commerce brand managers, founders, and engineering teams have to say about working with Abdullah Saleh.
        </p>
    </div>
</section>

<section class="section">
    <div class="container">
        <div class="testimonials-grid">
            <?php foreach ($testimonials as $t): ?>
                <div class="testimonial-card">
                    <div class="testimonial-rating">
                        <?php for ($i = 0; $i < ($t['rating'] ?? 5); $i++): ?>
                            <i class="fa-solid fa-star"></i>
                        <?php endfor; ?>
                    </div>
                    <div class="testimonial-text">
                        "<?= e($t['testimonial']) ?>"
                    </div>
                    <div class="testimonial-author">
                        <div class="author-avatar"><?= strtoupper(substr($t['name'], 0, 1)) ?></div>
                        <div class="author-info">
                            <h4><?= e($t['name']) ?></h4>
                            <p><?= e($t['position']) ?> • <?= e($t['company']) ?></p>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

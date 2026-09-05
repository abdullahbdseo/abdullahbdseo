<?php
// views/public/blog_detail.php - Blog Article Detail View in Digi Solution Theme
$expertName = setting('expert_name', 'MD. Abdullah');
$expertTitle = setting('expert_title', 'Head of SEO & Growth Consultant');
$imgSrc = !empty($post['featured_image']) ? (str_starts_with($post['featured_image'], 'http') ? $post['featured_image'] : asset('images/' . $post['featured_image'])) : asset('images/blog_tech_seo.jpg');
?>

<section class="digi-hero-section" style="padding: 40px 0 30px;">
    <div class="container" style="max-width: 860px;">
        <div style="font-size: 0.85rem; margin-bottom: 14px; color: var(--digi-text-muted);">
            <a href="<?= url('/') ?>">Home</a> &raquo; <a href="<?= url('/blog') ?>">Blog</a> &raquo; <span style="color: var(--digi-blue); font-weight: 600;"><?= e($post['category_name']) ?></span>
        </div>

        <span style="display:inline-block; font-size: 0.75rem; font-weight: 700; color: var(--digi-blue); background: var(--digi-blue-subtle); padding: 4px 12px; border-radius: 4px; margin-bottom: 12px;">
            <?= e($post['category_name'] ?? 'SEO Guide') ?>
        </span>
        <h1 style="font-size: 2.5rem; margin: 8px 0 16px; line-height: 1.25; color: var(--digi-text-main);">
            <?= e($post['title']) ?>
        </h1>

        <div style="display: flex; align-items: center; gap: 16px; font-size: 0.88rem; color: var(--digi-text-muted); flex-wrap: wrap;">
            <div><i class="fa-solid fa-user-tie" style="color: var(--digi-blue); margin-right: 4px;"></i> <?= e($expertName) ?></div>
            <div>•</div>
            <div><i class="fa-regular fa-calendar" style="color: var(--digi-blue); margin-right: 4px;"></i> <?= formatDate($post['published_at']) ?></div>
            <div>•</div>
            <div><i class="fa-regular fa-eye" style="color: var(--digi-blue); margin-right: 4px;"></i> <?= number_format($post['views'] ?? 1) ?> Views</div>
        </div>
    </div>
</section>

<section class="section" style="padding-top: 30px;">
    <div class="container" style="max-width: 860px;">
        <div style="background: #ffffff; border: 1px solid var(--digi-border); border-radius: var(--radius-md); padding: 36px; box-shadow: var(--shadow-soft); line-height: 1.85; font-size: 1.02rem;">
            
            <!-- Featured Image -->
            <div style="border-radius: var(--radius-sm); overflow: hidden; margin-bottom: 32px; box-shadow: 0 4px 15px rgba(0,0,0,0.06);">
                <img src="<?= e($imgSrc) ?>" alt="<?= e($post['title']) ?>" style="width: 100%; height: auto; display: block;">
            </div>

            <!-- Article Content -->
            <div class="blog-content-body" style="color: var(--digi-text-body);">
                <?= $post['content'] ?>
            </div>

            <!-- Author Box -->
            <div style="margin-top: 48px; padding: 24px; background: #f8fafc; border: 1px solid var(--digi-border); border-radius: var(--radius-sm); display: flex; align-items: center; gap: 20px;">
                <div style="width: 64px; height: 64px; border-radius: 50%; background: var(--digi-blue); color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; font-weight: 800; flex-shrink: 0;">
                    A
                </div>
                <div>
                    <h4 style="font-size: 1.15rem; margin-bottom: 2px; color: var(--digi-text-main);"><?= e($expertName) ?></h4>
                    <p style="font-size: 0.82rem; color: var(--digi-blue); font-weight: 700; margin-bottom: 6px;"><?= e($expertTitle) ?></p>
                    <p style="font-size: 0.85rem; color: var(--digi-text-muted); line-height: 1.5; margin: 0;">
                        SEO architect and search growth consultant helping companies scale organic visibility, technical crawlability, and conversion revenue.
                    </p>
                </div>
            </div>

            <!-- CTA -->
            <div style="margin-top: 36px; text-align: center; background: linear-gradient(135deg, #4361ee 0%, #3b82f6 100%); color: #ffffff; padding: 36px 28px; border-radius: var(--radius-md);">
                <h3 style="color: #ffffff; font-size: 1.4rem; margin-bottom: 10px;">Need Expert Help Implementing These SEO Strategies?</h3>
                <p style="color: rgba(255, 255, 255, 0.9); font-size: 0.95rem; margin-bottom: 20px; max-width: 540px; margin-left: auto; margin-right: auto;">
                    Order a comprehensive technical audit or book a custom consulting session for your website.
                </p>
                <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
                    <a href="<?= url('/services') ?>" class="btn btn-aqua-solid"><i class="fa-solid fa-list-check"></i> Explore SEO Services</a>
                    <a href="<?= url('/contact') ?>" class="btn btn-quote-pill" style="background:#ffffff; color:var(--digi-blue); border-color:#ffffff;"><i class="fa-solid fa-paper-plane"></i> Get Free Quote</a>
                </div>
            </div>
        </div>
    </div>
</section>

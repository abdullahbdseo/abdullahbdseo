<?php
// views/public/blog.php - SEO Knowledge Center in Digi Solution Theme
?>

<section class="digi-hero-section" style="padding: 50px 0 40px; text-align: center;">
    <div class="container">
        <span class="text-blue" style="font-weight: 700; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em;">SEO Strategy & Growth Guides</span>
        <h1 style="font-size: 2.8rem; margin: 10px 0 14px;">SEO Insights & Knowledge Center</h1>
        <p style="font-size: 1.1rem; color: var(--digi-text-body); max-width: 680px; margin: 0 auto;">
            Deep-dive technical SEO frameworks, keyword intent mastery, and e-commerce optimization strategies.
        </p>

        <!-- Search bar -->
        <div style="max-width: 480px; margin: 24px auto 0;">
            <form action="<?= url('/blog') ?>" method="GET" style="display: flex; gap: 8px;">
                <input type="text" name="q" value="<?= e($searchQuery ?? '') ?>" class="digi-input" placeholder="Search SEO guides..." style="background:#ffffff;">
                <button type="submit" class="btn btn-blue-solid"><i class="fa-solid fa-magnifying-glass"></i></button>
            </form>
        </div>
    </div>
</section>

<section class="section">
    <div class="container">
        <!-- Category Filter Tabs -->
        <div style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-bottom: 40px;">
            <a href="<?= url('/blog') ?>" class="btn btn-sm <?= empty($currentCategory) ? 'btn-blue-solid' : 'btn-outline-blue' ?>">All Topics</a>
            <?php foreach ($categories as $cat): ?>
                <a href="<?= url('/blog?category=' . $cat['slug']) ?>" class="btn btn-sm <?= ($currentCategory ?? '') === $cat['slug'] ? 'btn-blue-solid' : 'btn-outline-blue' ?>">
                    <?= e($cat['name']) ?>
                </a>
            <?php endforeach; ?>
        </div>

        <!-- Content Card Carousel Showcase -->
        <div class="content-carousel-wrapper" id="blogContentCarousel">
            <div class="content-carousel-header">
                <div class="content-carousel-meta">
                    <span class="content-live-pill">
                        <span class="gsc-live-dot"></span> Knowledge Hub
                    </span>
                    <span class="content-carousel-counter">
                        Showing <strong class="content-current-range">1 - <?= min(3, count($posts)) ?></strong> of <strong><?= count($posts) ?></strong> Guides
                    </span>
                </div>
                <div class="content-carousel-controls">
                    <div class="gsc-view-toggle content-view-toggle">
                        <button type="button" class="gsc-view-btn content-view-btn active" data-view="carousel" title="Carousel Slider View">
                            <i class="fa-solid fa-sliders"></i> Slider
                        </button>
                        <button type="button" class="gsc-view-btn content-view-btn" data-view="grid" title="Grid View">
                            <i class="fa-solid fa-border-all"></i> Grid
                        </button>
                    </div>
                    <div class="content-carousel-nav">
                        <button type="button" class="content-nav-btn content-prev-btn" aria-label="Previous Slide" title="Previous Slide">
                            <i class="fa-solid fa-chevron-left"></i>
                        </button>
                        <button type="button" class="content-nav-btn content-next-btn" aria-label="Next Slide" title="Next Slide">
                            <i class="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Viewport & Track -->
            <div class="content-carousel-viewport">
                <div class="content-carousel-track">
                    <?php foreach ($posts as $post): ?>
                        <?php 
                        $imgSrc = !empty($post['featured_image']) ? (str_starts_with($post['featured_image'], 'http') ? $post['featured_image'] : asset('images/' . $post['featured_image'])) : asset('images/blog_tech_seo.jpg');
                        ?>
                        <div class="content-carousel-slide">
                            <div class="content-card">
                                <div class="content-card-media">
                                    <a href="<?= url('/blog/' . $post['slug']) ?>" style="display:block; width:100%; height:100%;">
                                        <img src="<?= e($imgSrc) ?>" alt="<?= e($post['title']) ?>" class="content-card-img" loading="lazy">
                                        <div class="content-card-overlay-gradient"></div>
                                    </a>
                                    <span class="content-card-category">
                                        <?= e($post['category_name'] ?? 'SEO Guide') ?>
                                    </span>
                                    <span class="content-card-readtime">
                                        <i class="fa-regular fa-clock"></i> 5 min read
                                    </span>
                                </div>
                                <div class="content-card-body">
                                    <div class="content-card-meta">
                                        <span><i class="fa-regular fa-calendar" style="color: #4361ee;"></i> <?= formatDate($post['published_at']) ?></span>
                                        <span><i class="fa-regular fa-user" style="color: #10b981;"></i> <?= e($post['author_name'] ?? 'Abdullah Saleh') ?></span>
                                    </div>
                                    <h3 class="content-card-title">
                                        <a href="<?= url('/blog/' . $post['slug']) ?>">
                                            <?= e($post['title']) ?>
                                        </a>
                                    </h3>
                                    <p class="content-card-excerpt">
                                        <?= e(str_limit($post['excerpt'] ?? '', 120)) ?>
                                    </p>
                                    <div class="content-card-footer">
                                        <a href="<?= url('/blog/' . $post['slug']) ?>" class="content-card-action">
                                            Read Full Guide <i class="fa-solid fa-arrow-right"></i>
                                        </a>
                                        <span class="content-card-stats">
                                            <i class="fa-regular fa-eye"></i> <?= number_format($post['views'] ?? 142) ?>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>

            <!-- Bottom Pagination Dots -->
            <div class="content-carousel-bottom-bar">
                <div class="content-carousel-dots"></div>
            </div>
        </div>
    </div>
</section>

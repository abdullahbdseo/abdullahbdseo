<?php
// views/admin/blog/edit.php - Modern 2-Column SaaS Article Editor
$isEdit = !empty($post['id']);
$formAction = $isEdit ? url('/admin/blog/' . $post['id'] . '/update') : url('/admin/blog/store');
?>

<div style="max-width: 1200px; margin: 0 auto;">
    <!-- Page Header -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <div>
            <div style="margin-bottom: 6px;">
                <a href="<?= url('/admin/blog') ?>" class="btn btn-sm btn-outline" style="gap: 6px;">
                    <i class="fa-solid fa-arrow-left"></i> Back to Blog CMS
                </a>
            </div>
            <h2 style="font-size: 1.65rem; color: #0f172a; margin: 0; font-weight: 800; letter-spacing: -0.02em;">
                <?= $isEdit ? 'Edit Article' : 'Write New SEO Guide' ?>
            </h2>
        </div>
        <div style="display: flex; gap: 10px;">
            <?php if ($isEdit && !empty($post['slug'])): ?>
                <a href="<?= url('/blog/' . $post['slug']) ?>" target="_blank" class="btn btn-outline btn-sm">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i> View on Live Site
                </a>
            <?php endif; ?>
        </div>
    </div>

    <!-- Main Editor Form -->
    <form action="<?= $formAction ?>" method="POST" enctype="multipart/form-data">
        <?= csrf_field() ?>

        <div style="display: grid; grid-template-columns: 2.2fr 1fr; gap: 28px; align-items: start;">
            
            <!-- LEFT COLUMN: Main Content & SEO -->
            <div>
                <!-- Article Title & Content Card -->
                <div class="admin-card">
                    <div class="admin-card-body">
                        <!-- Title Field -->
                        <div class="form-group" style="margin-bottom: 18px;">
                            <label class="form-label" style="font-size: 0.95rem;">Article Headline / Title *</label>
                            <input type="text" 
                                   id="articleTitle"
                                   name="title" 
                                   value="<?= e($post['title'] ?? '') ?>" 
                                   class="form-control" 
                                   style="font-size: 1.15rem; font-weight: 700; padding: 13px 18px;" 
                                   required 
                                   placeholder="e.g. The Complete Technical SEO Audit Checklist for 2026">
                            
                            <!-- Live Slug / URL Preview -->
                            <div style="font-size: 0.8rem; color: #64748b; margin-top: 8px; display: flex; align-items: center; gap: 6px;">
                                <i class="fa-solid fa-link" style="color: #3b82f6;"></i>
                                <span>Permalink:</span>
                                <code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; color: #1e40af;">
                                    <?= SITE_URL ?>/blog/<span id="slugPreview"><?= e($post['slug'] ?? 'article-slug') ?></span>
                                </code>
                            </div>
                        </div>

                        <!-- Content Editor Toolbar & Textarea -->
                        <div class="form-group" style="margin-bottom: 0;">
                            <label class="form-label">Article Body Content (Markdown / HTML) *</label>
                            
                            <!-- Formatting Helper Toolbar -->
                            <div class="editor-toolbar">
                                <button type="button" class="editor-btn" onclick="insertTag('**', '**')" title="Bold"><i class="fa-solid fa-bold"></i></button>
                                <button type="button" class="editor-btn" onclick="insertTag('*', '*')" title="Italic"><i class="fa-solid fa-italic"></i></button>
                                <button type="button" class="editor-btn" onclick="insertTag('## ', '')" title="Heading 2"><i class="fa-solid fa-heading"></i>2</button>
                                <button type="button" class="editor-btn" onclick="insertTag('### ', '')" title="Heading 3"><i class="fa-solid fa-heading"></i>3</button>
                                <button type="button" class="editor-btn" onclick="insertTag('[', '](https://)')" title="Insert Link"><i class="fa-solid fa-link"></i> Link</button>
                                <button type="button" class="editor-btn" onclick="insertTag('> ', '')" title="Blockquote"><i class="fa-solid fa-quote-left"></i> Quote</button>
                                <button type="button" class="editor-btn" onclick="insertTag('- ', '')" title="Bullet List"><i class="fa-solid fa-list-ul"></i> List</button>
                                <button type="button" class="editor-btn" onclick="insertTag('```\n', '\n```')" title="Code Snippet"><i class="fa-solid fa-code"></i> Code</button>
                            </div>

                            <textarea id="articleContent" 
                                      name="content" 
                                      class="form-control editor-textarea" 
                                      style="min-height: 420px; line-height: 1.7;" 
                                      required 
                                      placeholder="Write or paste your complete SEO article content here..."><?= e($post['content'] ?? '') ?></textarea>
                        </div>
                    </div>
                </div>

                <!-- Search Snippet & Google SERP Preview Card -->
                <div class="admin-card">
                    <div class="admin-card-header">
                        <h3><i class="fa-brands fa-google" style="color: #4285f4; margin-right: 6px;"></i> Search Snippet & SEO Preview</h3>
                    </div>
                    <div class="admin-card-body">
                        <div class="form-group">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                                <label class="form-label" style="margin-bottom: 0;">Short Excerpt (Meta Description) *</label>
                                <span id="excerptCount" style="font-size: 0.78rem; color: #64748b;">0 / 160 characters</span>
                            </div>
                            <textarea id="excerptInput" 
                                      name="excerpt" 
                                      class="form-control" 
                                      style="min-height: 90px;" 
                                      required 
                                      placeholder="Enter a compelling 150-160 character summary for Google search results and blog listing cards..."><?= e($post['excerpt'] ?? '') ?></textarea>
                        </div>

                        <!-- Live SERP Preview Box -->
                        <div>
                            <div style="font-size: 0.78rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">
                                Google Search Result Preview
                            </div>
                            <div class="serp-preview-box">
                                <div class="serp-url" id="serpUrlPreview"><?= SITE_URL ?>/blog/<?= e($post['slug'] ?? 'article-slug') ?></div>
                                <div class="serp-title" id="serpTitlePreview"><?= e($post['title'] ?? 'The Complete Technical SEO Audit Checklist') ?> | Abdullah Saleh</div>
                                <div class="serp-desc" id="serpDescPreview"><?= e($post['excerpt'] ?? 'Learn how to perform forensic website audits, fix indexing roadblocks, and rank #1 on Google.') ?></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- RIGHT COLUMN: Sidebar / Publishing Controls -->
            <div>
                <!-- Publish Card -->
                <div class="admin-card">
                    <div class="admin-card-header">
                        <h3>Publish Settings</h3>
                    </div>
                    <div class="admin-card-body">
                        <div class="form-group">
                            <label class="form-label">Publication Status</label>
                            <select name="status" class="form-control" style="font-weight: 600;">
                                <option value="published" <?= ($post['status'] ?? 'published') === 'published' ? 'selected' : '' ?>>🟢 Published (Live)</option>
                                <option value="draft" <?= ($post['status'] ?? '') === 'draft' ? 'selected' : '' ?>>🟡 Draft (Hidden)</option>
                            </select>
                        </div>

                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px 14px; margin-bottom: 20px; font-size: 0.82rem; color: #64748b;">
                            <div style="margin-bottom: 4px;"><strong>Author:</strong> <?= e(setting('expert_name', 'Abdullah Saleh')) ?></div>
                            <div><strong>SEO Score:</strong> <span style="color: #10b981; font-weight: 700;">100% Ready</span></div>
                        </div>

                        <button type="submit" class="btn btn-primary btn-lg btn-block" style="margin-bottom: 10px;">
                            <i class="fa-solid fa-floppy-disk"></i> <?= $isEdit ? 'Update Article' : 'Publish Article' ?>
                        </button>

                        <a href="<?= url('/admin/blog') ?>" class="btn btn-outline btn-block" style="text-align: center;">
                            Cancel
                        </a>
                    </div>
                </div>

                <!-- Category Card -->
                <div class="admin-card">
                    <div class="admin-card-header">
                        <h3>Category</h3>
                    </div>
                    <div class="admin-card-body">
                        <div class="form-group" style="margin-bottom: 0;">
                            <label class="form-label">Select Primary Category</label>
                            <select name="category_id" class="form-control">
                                <?php foreach ($categories as $cat): ?>
                                    <option value="<?= $cat['id'] ?>" <?= ($post['category_id'] ?? 0) == $cat['id'] ? 'selected' : '' ?>>
                                        <?= e($cat['name']) ?>
                                    </option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Featured Image Card -->
                <div class="admin-card">
                    <div class="admin-card-header">
                        <h3>Featured Image</h3>
                    </div>
                    <div class="admin-card-body">
                        <?php if (!empty($post['featured_image'])): ?>
                            <div style="margin-bottom: 12px; border-radius: 6px; overflow: hidden; border: 1px solid #e2e8f0;">
                                <img src="<?= uploadUrl($post['featured_image']) ?>" alt="Featured" style="width: 100%; height: auto; display: block;">
                            </div>
                        <?php endif; ?>
                        
                        <div class="form-group" style="margin-bottom: 0;">
                            <label class="form-label" style="font-size: 0.82rem;">Upload Cover Image</label>
                            <input type="file" name="featured_image_file" class="form-control" accept="image/*">
                            <small style="color: #64748b; font-size: 0.78rem;">Recommended: 1200x630px (WebP, PNG, JPG).</small>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </form>
</div>

<!-- Interactive Editor Script -->
<script>
function insertTag(startTag, endTag) {
    const textarea = document.getElementById('articleContent');
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const replacement = startTag + (selectedText || 'text') + endTag;
    
    textarea.value = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
    textarea.focus();
    textarea.setSelectionRange(start + startTag.length, start + replacement.length - endTag.length);
}

// Live Slug & SERP Preview Synchronizer
document.addEventListener('DOMContentLoaded', () => {
    const titleInput = document.getElementById('articleTitle');
    const slugPreview = document.getElementById('slugPreview');
    const serpTitlePreview = document.getElementById('serpTitlePreview');
    const serpUrlPreview = document.getElementById('serpUrlPreview');
    const excerptInput = document.getElementById('excerptInput');
    const serpDescPreview = document.getElementById('serpDescPreview');
    const excerptCount = document.getElementById('excerptCount');

    function slugify(text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
    }

    if (titleInput) {
        titleInput.addEventListener('input', () => {
            const val = titleInput.value.trim();
            const slug = slugify(val) || 'article-slug';
            if (slugPreview) slugPreview.textContent = slug;
            if (serpTitlePreview) serpTitlePreview.textContent = (val || 'The Complete Technical SEO Audit Checklist') + ' | Abdullah Saleh';
            if (serpUrlPreview) serpUrlPreview.textContent = '<?= SITE_URL ?>/blog/' + slug;
        });
    }

    if (excerptInput) {
        const updateExcerpt = () => {
            const val = excerptInput.value;
            if (excerptCount) excerptCount.textContent = val.length + ' / 160 characters';
            if (serpDescPreview) serpDescPreview.textContent = val || 'Learn how to perform forensic website audits, fix indexing roadblocks, and rank #1 on Google.';
        };
        excerptInput.addEventListener('input', updateExcerpt);
        updateExcerpt();
    }
});
</script>

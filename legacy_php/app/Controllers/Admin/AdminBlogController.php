<?php
// app/Controllers/Admin/AdminBlogController.php

require_once __DIR__ . '/../../../core/Controller.php';
require_once __DIR__ . '/../../Models/BlogPost.php';

class AdminBlogController extends Controller {
    public function __construct() {
        $this->requireAdmin();
    }

    public function index(): void {
        $db = Database::getInstance()->getConnection();
        $posts = $db->query("SELECT b.*, c.name AS category_name 
            FROM `blog_posts` b 
            LEFT JOIN `blog_categories` c ON b.category_id = c.id 
            ORDER BY b.id DESC")->fetchAll();

        $this->render('admin/blog/index', [
            'pageTitle' => 'Manage Blog Articles',
            'posts' => $posts
        ], 'admin');
    }

    public function create(): void {
        $db = Database::getInstance()->getConnection();
        $categories = $db->query("SELECT * FROM `blog_categories` WHERE `status` = 'active'")->fetchAll();

        $this->render('admin/blog/edit', [
            'pageTitle' => 'Write New Article',
            'post' => [],
            'categories' => $categories
        ], 'admin');
    }

    public function store(): void {
        $this->validateCsrf();

        $title = Security::sanitizeString($_POST['title'] ?? '');
        $slug = slugify($title);
        $categoryId = !empty($_POST['category_id']) ? (int)$_POST['category_id'] : null;
        $excerpt = Security::sanitizeString($_POST['excerpt'] ?? '');
        $content = $_POST['content'] ?? '';
        $status = in_array($_POST['status'] ?? '', ['published', 'draft']) ? $_POST['status'] : 'published';

        $featuredImage = null;
        if (!empty($_FILES['featured_image_file']) && $_FILES['featured_image_file']['error'] === UPLOAD_ERR_OK) {
            $validation = Security::validateFileUpload($_FILES['featured_image_file'], ['jpg', 'jpeg', 'png', 'webp']);
            if ($validation['valid']) {
                $imgName = 'blog-' . time() . '.' . $validation['extension'];
                $dest = UPLOAD_PATH . '/images/' . $imgName;
                if (move_uploaded_file($_FILES['featured_image_file']['tmp_name'], $dest)) {
                    $featuredImage = 'images/' . $imgName;
                }
            }
        }

        $id = BlogPost::create([
            'author_id' => Auth::id(),
            'category_id' => $categoryId,
            'title' => $title,
            'slug' => $slug,
            'excerpt' => $excerpt,
            'content' => $content,
            'featured_image' => $featuredImage,
            'status' => $status,
            'published_at' => date('Y-m-d H:i:s')
        ]);

        Auth::logAudit('blog_create', 'BlogPost', $id, "Created blog post: {$title}");
        $this->redirect('/admin/blog', 'success', 'Article published successfully.');
    }

    public function edit(int $id): void {
        $post = BlogPost::find($id);
        if (!$post) {
            $this->redirect('/admin/blog', 'error', 'Article not found.');
            return;
        }

        $db = Database::getInstance()->getConnection();
        $categories = $db->query("SELECT * FROM `blog_categories` WHERE `status` = 'active'")->fetchAll();

        $this->render('admin/blog/edit', [
            'pageTitle' => 'Edit Article',
            'post' => $post,
            'categories' => $categories
        ], 'admin');
    }

    public function update(int $id): void {
        $this->validateCsrf();

        $title = Security::sanitizeString($_POST['title'] ?? '');
        $categoryId = !empty($_POST['category_id']) ? (int)$_POST['category_id'] : null;
        $excerpt = Security::sanitizeString($_POST['excerpt'] ?? '');
        $content = $_POST['content'] ?? '';
        $status = in_array($_POST['status'] ?? '', ['published', 'draft']) ? $_POST['status'] : 'published';

        $data = [
            'category_id' => $categoryId,
            'title' => $title,
            'excerpt' => $excerpt,
            'content' => $content,
            'status' => $status
        ];

        if (!empty($_FILES['featured_image_file']) && $_FILES['featured_image_file']['error'] === UPLOAD_ERR_OK) {
            $validation = Security::validateFileUpload($_FILES['featured_image_file'], ['jpg', 'jpeg', 'png', 'webp']);
            if ($validation['valid']) {
                $imgName = 'blog-' . time() . '.' . $validation['extension'];
                $dest = UPLOAD_PATH . '/images/' . $imgName;
                if (move_uploaded_file($_FILES['featured_image_file']['tmp_name'], $dest)) {
                    $data['featured_image'] = 'images/' . $imgName;
                }
            }
        }

        BlogPost::update($id, $data);

        Auth::logAudit('blog_update', 'BlogPost', $id, "Updated blog post: {$title}");
        $this->redirect('/admin/blog', 'success', 'Article updated.');
    }

    public function delete(int $id): void {
        $this->validateCsrf();
        BlogPost::delete($id);
        Auth::logAudit('blog_delete', 'BlogPost', $id, "Deleted blog post ID: {$id}");
        $this->redirect('/admin/blog', 'success', 'Article deleted.');
    }
}

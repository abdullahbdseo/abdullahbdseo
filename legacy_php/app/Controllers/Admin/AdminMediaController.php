<?php
// app/Controllers/Admin/AdminMediaController.php

require_once __DIR__ . '/../../../core/Controller.php';
require_once __DIR__ . '/../../Models/Media.php';

class AdminMediaController extends Controller {
    public function __construct() {
        $this->requireAdmin();
    }

    public function index(): void {
        $mediaList = Media::all('id DESC');
        $this->render('admin/media/index', [
            'pageTitle' => 'Media Library',
            'mediaList' => $mediaList
        ], 'admin');
    }

    public function upload(): void {
        $this->validateCsrf();

        if (empty($_FILES['media_file'])) {
            $this->redirect('/admin/media', 'error', 'No file selected.');
            return;
        }

        $validation = Security::validateFileUpload($_FILES['media_file'], ['jpg', 'jpeg', 'png', 'webp', 'svg', 'pdf', 'zip']);
        if (!$validation['valid']) {
            $this->redirect('/admin/media', 'error', $validation['error']);
            return;
        }

        $file = $_FILES['media_file'];
        $cleanName = slugify(pathinfo($file['name'], PATHINFO_FILENAME)) . '-' . time() . '.' . $validation['extension'];
        $destPath = UPLOAD_PATH . '/images/' . $cleanName;

        if (move_uploaded_file($file['tmp_name'], $destPath)) {
            $altText = Security::sanitizeString($_POST['alt_text'] ?? '');
            Media::create([
                'uploaded_by' => Auth::id(),
                'filename' => $cleanName,
                'original_name' => $file['name'],
                'path' => 'images/' . $cleanName,
                'mime_type' => $validation['mime'],
                'size' => $file['size'],
                'alt_text' => $altText
            ]);

            Auth::logAudit('media_upload', 'Media', null, "Uploaded media asset: {$cleanName}");
            $this->redirect('/admin/media', 'success', 'Media file uploaded successfully.');
        } else {
            $this->redirect('/admin/media', 'error', 'Failed to save media upload.');
        }
    }
}

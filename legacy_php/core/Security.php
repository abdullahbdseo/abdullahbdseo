<?php
// core/Security.php - Security sanitization & upload validator

require_once __DIR__ . '/Session.php';

class Security {
    public static function sanitizeString(?string $data): string {
        return htmlspecialchars(trim($data ?? ''), ENT_QUOTES, 'UTF-8');
    }

    public static function sanitizeArray(array $array): array {
        $clean = [];
        foreach ($array as $key => $val) {
            if (is_array($val)) {
                $clean[$key] = self::sanitizeArray($val);
            } else {
                $clean[$key] = self::sanitizeString((string)$val);
            }
        }
        return $clean;
    }

    public static function validateFileUpload(array $file, array $allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'pdf', 'zip', 'docx', 'xlsx'], int $maxSizeBytes = 20971520): array {
        if (!isset($file['error']) || is_array($file['error'])) {
            return ['valid' => false, 'error' => 'Invalid file parameter.'];
        }

        if ($file['error'] !== UPLOAD_ERR_OK) {
            return ['valid' => false, 'error' => 'Upload error code: ' . $file['error']];
        }

        if ($file['size'] > $maxSizeBytes) {
            return ['valid' => false, 'error' => 'File size exceeds maximum allowed limit (' . round($maxSizeBytes / 1048576) . 'MB).'];
        }

        $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        if (!in_array($extension, $allowedExtensions)) {
            return ['valid' => false, 'error' => 'File extension .' . $extension . ' is not permitted.'];
        }

        // Additional MIME check for images
        $mime = mime_content_type($file['tmp_name']);
        $disallowedMimes = ['text/x-php', 'application/x-httpd-php', 'application/x-executable', 'text/html', 'application/javascript'];
        if (in_array($mime, $disallowedMimes)) {
            return ['valid' => false, 'error' => 'Disallowed file type detected.'];
        }

        return ['valid' => true, 'extension' => $extension, 'mime' => $mime];
    }
}

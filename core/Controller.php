<?php
// core/Controller.php - Base Controller

require_once __DIR__ . '/View.php';
require_once __DIR__ . '/Session.php';
require_once __DIR__ . '/Auth.php';
require_once __DIR__ . '/Security.php';
require_once __DIR__ . '/Helpers.php';

abstract class Controller {
    protected function render(string $view, array $data = [], ?string $layout = 'main'): void {
        View::render($view, $data, $layout);
    }

    protected function json(array $data, int $statusCode = 200): void {
        http_response_code($statusCode);
        header('Content-Type: application/json');
        echo json_encode($data);
        exit;
    }

    protected function redirect(string $path, ?string $flashType = null, ?string $flashMessage = null): void {
        if ($flashType && $flashMessage) {
            Session::setFlash($flashType, $flashMessage);
        }
        $target = (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) ? $path : url($path);
        header("Location: {$target}");
        exit;
    }

    protected function validateCsrf(): void {
        $token = $_POST['_csrf_token'] ?? $_POST['csrf_token'] ?? $_SERVER['HTTP_X_CSRF_TOKEN'] ?? null;
        if (!Session::validateCsrf($token)) {
            http_response_code(419);
            die("419 Page Expired (Invalid CSRF Token). Please go back and try again.");
        }
    }

    protected function requireAuth(): void {
        if (!Auth::check()) {
            $this->redirect('/login', 'error', 'Please log in to continue.');
        }
    }

    protected function requireAdmin(): void {
        $this->requireAuth();
        if (!Auth::isAdmin()) {
            http_response_code(403);
            $this->render('errors/403', ['pageTitle' => '403 Forbidden'], 'main');
            exit;
        }
    }
}

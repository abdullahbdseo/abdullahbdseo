<?php
// core/View.php - Template and Layout Rendering Engine

require_once __DIR__ . '/Helpers.php';
require_once __DIR__ . '/Auth.php';

class View {
    public static function render(string $viewPath, array $data = [], ?string $layout = 'main'): void {
        extract($data);

        $currentUser = Auth::user();
        $siteTitle = $pageTitle ?? setting('default_meta_title', 'Abdullah Saleh | SEO Specialist & Organic Growth Strategist');
        $siteDescription = $metaDescription ?? setting('default_meta_description', '');
        $siteLogo = setting('site_logo_text', 'Abdullah Saleh');
        $siteLogoImg = setting('site_logo_image', '');

        // Start output buffering for view content
        ob_start();
        $fullViewPath = VIEWS_PATH . '/' . ltrim($viewPath, '/') . '.php';
        if (file_exists($fullViewPath)) {
            require $fullViewPath;
        } else {
            echo "<p style='color:red;'>View file not found: {$fullViewPath}</p>";
        }
        $content = ob_get_clean();

        // If a layout is requested, wrap inside the layout
        if ($layout) {
            $layoutPath = VIEWS_PATH . '/layouts/' . $layout . '.php';
            if (file_exists($layoutPath)) {
                require $layoutPath;
            } else {
                echo $content;
            }
        } else {
            echo $content;
        }
    }
}

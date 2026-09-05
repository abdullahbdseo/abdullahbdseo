<?php
// app/Controllers/Admin/AdminSettingsController.php

require_once __DIR__ . '/../../../core/Controller.php';
require_once __DIR__ . '/../../Models/Setting.php';

class AdminSettingsController extends Controller {
    public function __construct() {
        $this->requireAdmin();
    }

    public function index(): void {
        $this->render('admin/settings/index', [
            'pageTitle' => 'System & Gateway Settings'
        ], 'admin');
    }

    public function update(): void {
        $this->validateCsrf();

        // 1. Text & numeric settings
        $fields = [
            'site_name' => 'branding',
            'site_logo_text' => 'branding',
            'primary_color' => 'branding',
            'accent_color' => 'branding',
            'expert_name' => 'general',
            'expert_title' => 'general',
            'expert_bio' => 'general',
            // Gateways
            'nowpayments_api_key' => 'payment',
            'nowpayments_ipn_secret' => 'payment',
            'bkash_number' => 'payment',
            'bkash_type' => 'payment',
            'bkash_usd_rate' => 'payment',
            'bkash_instructions' => 'payment',
            // Direct Crypto
            'usdt_trc20_address' => 'payment',
            'usdt_erc20_address' => 'payment',
            'btc_address' => 'payment',
            'eth_address' => 'payment',
            'sol_address' => 'payment',
            'payment_expiry_minutes' => 'payment',
            // Contact
            'contact_email' => 'contact',
            'contact_phone' => 'contact',
            'whatsapp_number' => 'contact',
            'working_hours' => 'contact',
            'office_address' => 'contact',
            'social_linkedin' => 'social',
            'social_twitter' => 'social',
            'social_github' => 'social',
            'social_youtube' => 'social',
        ];

        foreach ($fields as $key => $group) {
            if (isset($_POST[$key])) {
                $val = Security::sanitizeString($_POST[$key]);
                Setting::set($key, $val, 'text', $group);
            }
        }

        // 2. Gateway Toggles (Checkboxes)
        Setting::set('gateway_nowpayments_enabled', !empty($_POST['gateway_nowpayments_enabled']) ? '1' : '0', 'boolean', 'payment');
        Setting::set('nowpayments_sandbox', !empty($_POST['nowpayments_sandbox']) ? '1' : '0', 'boolean', 'payment');
        Setting::set('gateway_bkash_enabled', !empty($_POST['gateway_bkash_enabled']) ? '1' : '0', 'boolean', 'payment');
        Setting::set('gateway_crypto_manual_enabled', !empty($_POST['gateway_crypto_manual_enabled']) ? '1' : '0', 'boolean', 'payment');

        // 3. Reset Logos to Default AS Vectors if requested
        if (!empty($_POST['reset_default_logos'])) {
            Setting::set('site_logo_image', 'images/logo.svg', 'image', 'branding');
            Setting::set('site_logo_dark', 'images/logo-white.svg', 'image', 'branding');
            Setting::set('site_favicon', 'images/favicon.svg', 'image', 'branding');
            Setting::set('site_logo_text', 'Abdullah Saleh', 'text', 'branding');
        } else {
            // Header Logo File Upload
            if (!empty($_FILES['site_logo_image_file']) && $_FILES['site_logo_image_file']['error'] === UPLOAD_ERR_OK) {
                $validation = Security::validateFileUpload($_FILES['site_logo_image_file'], ['png', 'jpg', 'webp', 'svg']);
                if ($validation['valid']) {
                    $cleanLogo = 'logo-' . time() . '.' . $validation['extension'];
                    $dest = UPLOAD_PATH . '/images/' . $cleanLogo;
                    if (move_uploaded_file($_FILES['site_logo_image_file']['tmp_name'], $dest)) {
                        Setting::set('site_logo_image', 'images/' . $cleanLogo, 'image', 'branding');
                    }
                }
            }

            // Footer / Dark Mode Logo File Upload
            if (!empty($_FILES['site_logo_dark_file']) && $_FILES['site_logo_dark_file']['error'] === UPLOAD_ERR_OK) {
                $validation = Security::validateFileUpload($_FILES['site_logo_dark_file'], ['png', 'jpg', 'webp', 'svg']);
                if ($validation['valid']) {
                    $cleanDarkLogo = 'logo-dark-' . time() . '.' . $validation['extension'];
                    $dest = UPLOAD_PATH . '/images/' . $cleanDarkLogo;
                    if (move_uploaded_file($_FILES['site_logo_dark_file']['tmp_name'], $dest)) {
                        Setting::set('site_logo_dark', 'images/' . $cleanDarkLogo, 'image', 'branding');
                    }
                }
            }

            // Favicon & App Icon Upload
            if (!empty($_FILES['site_favicon_file']) && $_FILES['site_favicon_file']['error'] === UPLOAD_ERR_OK) {
                $validation = Security::validateFileUpload($_FILES['site_favicon_file'], ['png', 'ico', 'svg']);
                if ($validation['valid']) {
                    $cleanFav = 'favicon-' . time() . '.' . $validation['extension'];
                    $dest = UPLOAD_PATH . '/images/' . $cleanFav;
                    if (move_uploaded_file($_FILES['site_favicon_file']['tmp_name'], $dest)) {
                        Setting::set('site_favicon', 'images/' . $cleanFav, 'image', 'branding');
                    }
                }
            }
        }

        // 4. Official Profile Photo Upload
        if (!empty($_FILES['profile_photo_file']) && $_FILES['profile_photo_file']['error'] === UPLOAD_ERR_OK) {
            $validation = Security::validateFileUpload($_FILES['profile_photo_file'], ['png', 'jpg', 'jpeg', 'webp']);
            if ($validation['valid']) {
                $cleanPhoto = 'profile-' . time() . '.' . $validation['extension'];
                $dest = UPLOAD_PATH . '/images/' . $cleanPhoto;
                if (move_uploaded_file($_FILES['profile_photo_file']['tmp_name'], $dest)) {
                    Setting::set('profile_photo', 'images/' . $cleanPhoto, 'image', 'general');
                }
            }
        }

        Auth::logAudit('settings_update', 'Setting', null, "Updated branding, logo assets, NOWPayments, bKash, and gateway settings");
        $this->redirect('/admin/settings', 'success', 'All system settings, logo assets, and payment gateways updated successfully.');
    }
}

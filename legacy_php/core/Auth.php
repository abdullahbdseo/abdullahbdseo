<?php
// core/Auth.php - Authentication and Role Authorization Service

require_once __DIR__ . '/Session.php';
require_once __DIR__ . '/../config/database.php';

class Auth {
    private static ?array $currentUser = null;

    public static function check(): bool {
        return Session::has('user_id');
    }

    public static function id(): ?int {
        return Session::get('user_id');
    }

    public static function user(): ?array {
        if (self::$currentUser !== null) {
            return self::$currentUser;
        }

        $userId = self::id();
        if (!$userId) {
            return null;
        }

        $db = Database::getInstance()->getConnection();
        $stmt = $db->prepare("SELECT u.*, r.slug AS role_slug, r.name AS role_name 
            FROM `users` u 
            LEFT JOIN `role_user` ru ON u.id = ru.user_id 
            LEFT JOIN `roles` r ON ru.role_id = r.id 
            WHERE u.id = ? AND u.status = 'active' LIMIT 1");
        $stmt->execute([$userId]);
        $user = $stmt->fetch();

        if ($user) {
            unset($user['password']);
            self::$currentUser = $user;
            return $user;
        }

        self::logout();
        return null;
    }

    public static function attempt(string $email, string $password): bool {
        $db = Database::getInstance()->getConnection();
        $stmt = $db->prepare("SELECT u.*, r.slug AS role_slug 
            FROM `users` u 
            LEFT JOIN `role_user` ru ON u.id = ru.user_id 
            LEFT JOIN `roles` r ON ru.role_id = r.id 
            WHERE u.email = ? AND u.status = 'active' LIMIT 1");
        $stmt->execute([trim($email)]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'])) {
            Session::set('user_id', (int)$user['id']);
            Session::set('user_role', $user['role_slug'] ?? 'client');
            Session::set('user_name', $user['name']);
            Session::set('user_email', $user['email']);

            // Update last login
            $db->prepare("UPDATE `users` SET `last_login_at` = NOW() WHERE `id` = ?")->execute([$user['id']]);

            // Log activity
            self::logAudit('login', 'User', (int)$user['id'], "User logged in: {$user['email']}");

            return true;
        }

        return false;
    }

    public static function isAdmin(): bool {
        if (!self::check()) return false;
        $user = self::user();
        return ($user && in_array($user['role_slug'], ['super_admin', 'admin', 'content_manager']));
    }

    public static function isClient(): bool {
        if (!self::check()) return false;
        $user = self::user();
        return ($user && $user['role_slug'] === 'client');
    }

    public static function logout(): void {
        if (self::check()) {
            self::logAudit('logout', 'User', self::id(), "User logged out");
        }
        Session::destroy();
        self::$currentUser = null;
    }

    public static function logAudit(string $action, ?string $entityType = null, ?int $entityId = null, ?string $description = null): void {
        try {
            $db = Database::getInstance()->getConnection();
            $stmt = $db->prepare("INSERT INTO `audit_logs` (`user_id`, `action`, `entity_type`, `entity_id`, `description`, `ip_address`, `user_agent`) 
                VALUES (?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                self::id(),
                $action,
                $entityType,
                $entityId,
                $description,
                $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1',
                $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown'
            ]);
        } catch (Exception $e) {
            // Fail silently on audit log error
        }
    }
}

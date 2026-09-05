<?php
// app/Controllers/AuthController.php

require_once __DIR__ . '/../../core/Controller.php';
require_once __DIR__ . '/../Models/User.php';

class AuthController extends Controller {
    public function showLogin(): void {
        if (Auth::check()) {
            $this->redirect(Auth::isAdmin() ? '/admin' : '/');
        }
        $this->render('auth/login', ['pageTitle' => 'Admin Login'], 'auth');
    }

    public function login(): void {
        $this->validateCsrf();

        $email = trim($_POST['email'] ?? '');
        $password = $_POST['password'] ?? '';

        if (empty($email) || empty($password)) {
            $this->redirect('/login', 'error', 'Email and password are required.');
            return;
        }

        if (Auth::attempt($email, $password)) {
            if (Auth::isAdmin()) {
                $this->redirect('/admin', 'success', 'Welcome to Admin Dashboard.');
            } else {
                Auth::logout();
                $this->redirect('/login', 'error', 'Access restricted. Administrator privileges required.');
            }
        } else {
            $this->redirect('/login', 'error', 'Invalid email or password credentials.');
        }
    }

    public function showRegister(): void {
        $this->redirect('/login');
    }

    public function register(): void {
        $this->redirect('/login');
    }

    public function redirectToLogin(): void {
        $this->redirect('/login');
    }

    public function showForgotPassword(): void {
        $this->render('auth/forgot_password', ['pageTitle' => 'Recover Password'], 'auth');
    }

    public function forgotPassword(): void {
        $this->validateCsrf();
        $email = trim($_POST['email'] ?? '');
        $this->redirect('/login', 'success', 'If an account exists with that email, password recovery instructions have been dispatched.');
    }

    public function logout(): void {
        Auth::logout();
        $this->redirect('/login', 'success', 'You have been logged out.');
    }
}

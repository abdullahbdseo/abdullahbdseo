<?php
// app/Controllers/ContactController.php - Handles Contact Form & Project Inquiries

require_once __DIR__ . '/../../core/Controller.php';
require_once __DIR__ . '/../Models/ContactInquiry.php';
require_once __DIR__ . '/../Models/Service.php';

class ContactController extends Controller {
    public function index(): void {
        $services = Service::where('status', 'active', 'title ASC');

        $this->render('public/contact', [
            'pageTitle' => 'Contact Abdullah Saleh | SEO Specialist & Organic Growth Strategist',
            'metaDescription' => 'Get in touch directly with Abdullah Saleh to discuss your website challenges, audit requirements, or monthly SEO growth retainer.',
            'services' => $services
        ]);
    }

    public function submit(): void {
        $isAjax = (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') 
                  || (str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json'));

        $this->validateCsrf();

        $name = Security::sanitizeString($_POST['name'] ?? '');
        $email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
        $phone = Security::sanitizeString($_POST['phone'] ?? '');
        $website = Security::sanitizeString($_POST['website'] ?? '');
        $serviceId = !empty($_POST['service_id']) ? (int)$_POST['service_id'] : null;
        $budget = Security::sanitizeString($_POST['budget'] ?? '$600 - $1,500');
        $message = Security::sanitizeString($_POST['message'] ?? 'Direct project inquiry via website.');

        if (!$name || !$email) {
            if ($isAjax) {
                http_response_code(422);
                header('Content-Type: application/json');
                echo json_encode(['success' => false, 'message' => 'Please provide your full name and a valid email address.']);
                exit;
            }
            $this->redirect('/contact', 'error', 'Please fill in all required fields.');
            return;
        }

        ContactInquiry::create([
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
            'website' => $website,
            'service_id' => $serviceId,
            'budget' => $budget,
            'message' => $message,
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1',
            'status' => 'new'
        ]);

        if ($isAjax) {
            header('Content-Type: application/json');
            echo json_encode([
                'success' => true,
                'name' => $name,
                'message' => 'Thank you! Your project inquiry has been received. MD Abdullah will get back to you within 24 hours.'
            ]);
            exit;
        }

        Session::setFlash('thank_you_modal', true);
        Session::setFlash('thank_you_name', $name);
        $this->redirect('/contact', 'success', 'Thank you! Your project inquiry has been received. MD Abdullah will get back to you within 24 hours.');
    }
}

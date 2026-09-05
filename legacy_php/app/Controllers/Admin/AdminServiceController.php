<?php
// app/Controllers/Admin/AdminServiceController.php

require_once __DIR__ . '/../../../core/Controller.php';
require_once __DIR__ . '/../../Models/Service.php';
require_once __DIR__ . '/../../Models/ServicePackage.php';

class AdminServiceController extends Controller {
    public function __construct() {
        $this->requireAdmin();
    }

    public function index(): void {
        $services = Service::getActiveWithCategory();
        $this->render('admin/services/index', [
            'pageTitle' => 'Manage Services',
            'services' => $services
        ], 'admin');
    }

    public function create(): void {
        $db = Database::getInstance()->getConnection();
        $categories = $db->query("SELECT * FROM `service_categories`")->fetchAll();

        $this->render('admin/services/edit', [
            'pageTitle' => 'Add New Service',
            'service' => [],
            'categories' => $categories
        ], 'admin');
    }

    public function store(): void {
        $this->validateCsrf();

        $title = Security::sanitizeString($_POST['title'] ?? '');
        $slug = slugify($title);
        $categoryId = !empty($_POST['category_id']) ? (int)$_POST['category_id'] : null;
        $icon = Security::sanitizeString($_POST['icon'] ?? 'fa-chart-line');
        $startingPrice = (float)($_POST['starting_price'] ?? 0);
        $deliveryTime = Security::sanitizeString($_POST['delivery_time'] ?? '5-7 Days');
        $shortDescription = Security::sanitizeString($_POST['short_description'] ?? '');
        $description = $_POST['description'] ?? '';
        $isFeatured = !empty($_POST['is_featured']) ? 1 : 0;
        $status = !empty($_POST['is_active']) ? 'active' : 'inactive';

        $serviceId = Service::create([
            'category_id' => $categoryId,
            'title' => $title,
            'slug' => $slug,
            'short_description' => $shortDescription,
            'description' => $description,
            'icon' => $icon,
            'starting_price' => $startingPrice,
            'delivery_time' => $deliveryTime,
            'is_featured' => $isFeatured,
            'status' => $status
        ]);

        // Create default standard package
        ServicePackage::create([
            'service_id' => $serviceId,
            'name' => 'Standard Package',
            'slug' => 'standard',
            'short_description' => 'Complete standard optimization package',
            'price' => $startingPrice,
            'delivery_days' => 7,
            'revisions' => 2,
            'features_json' => json_encode(['Full deliverables included', 'Dedicated support', 'Executive strategy PDF']),
            'is_popular' => 1,
            'status' => 'active'
        ]);

        Auth::logAudit('service_create', 'Service', $serviceId, "Created service: {$title}");
        $this->redirect('/admin/services', 'success', 'Service created successfully.');
    }

    public function edit(int $id): void {
        $service = Service::find($id);
        if (!$service) {
            $this->redirect('/admin/services', 'error', 'Service not found.');
            return;
        }

        $db = Database::getInstance()->getConnection();
        $categories = $db->query("SELECT * FROM `service_categories`")->fetchAll();

        $this->render('admin/services/edit', [
            'pageTitle' => 'Edit Service',
            'service' => $service,
            'categories' => $categories
        ], 'admin');
    }

    public function update(int $id): void {
        $this->validateCsrf();

        $title = Security::sanitizeString($_POST['title'] ?? '');
        $categoryId = !empty($_POST['category_id']) ? (int)$_POST['category_id'] : null;
        $icon = Security::sanitizeString($_POST['icon'] ?? 'fa-chart-line');
        $startingPrice = (float)($_POST['starting_price'] ?? 0);
        $deliveryTime = Security::sanitizeString($_POST['delivery_time'] ?? '5-7 Days');
        $shortDescription = Security::sanitizeString($_POST['short_description'] ?? '');
        $description = $_POST['description'] ?? '';
        $isFeatured = !empty($_POST['is_featured']) ? 1 : 0;
        $status = !empty($_POST['is_active']) ? 'active' : 'inactive';

        Service::update($id, [
            'category_id' => $categoryId,
            'title' => $title,
            'short_description' => $shortDescription,
            'description' => $description,
            'icon' => $icon,
            'starting_price' => $startingPrice,
            'delivery_time' => $deliveryTime,
            'is_featured' => $isFeatured,
            'status' => $status
        ]);

        Auth::logAudit('service_update', 'Service', $id, "Updated service: {$title}");
        $this->redirect('/admin/services', 'success', 'Service updated successfully.');
    }

    public function delete(int $id): void {
        $this->validateCsrf();
        Service::delete($id);
        Auth::logAudit('service_delete', 'Service', $id, "Deleted service ID: {$id}");
        $this->redirect('/admin/services', 'success', 'Service deleted successfully.');
    }
}

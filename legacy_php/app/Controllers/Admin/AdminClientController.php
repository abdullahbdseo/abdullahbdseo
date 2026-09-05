<?php
// app/Controllers/Admin/AdminClientController.php

require_once __DIR__ . '/../../../core/Controller.php';
require_once __DIR__ . '/../../Models/User.php';

class AdminClientController extends Controller {
    public function __construct() {
        $this->requireAdmin();
    }

    public function index(): void {
        $clients = User::getClients();
        $this->render('admin/clients/index', [
            'pageTitle' => 'Client Accounts',
            'clients' => $clients
        ], 'admin');
    }
}

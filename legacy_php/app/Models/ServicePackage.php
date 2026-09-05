<?php
// app/Models/ServicePackage.php

require_once __DIR__ . '/../../core/Model.php';

class ServicePackage extends Model {
    protected static string $table = 'service_packages';

    public static function getByServiceId(int $serviceId): array {
        return self::where('service_id', $serviceId, 'sort_order ASC');
    }
}

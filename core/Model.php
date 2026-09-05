<?php
// core/Model.php - Base Active Model with PDO helper methods

require_once __DIR__ . '/../config/database.php';

abstract class Model {
    protected static string $table = '';
    protected static string $primaryKey = 'id';

    public static function getDb(): PDO {
        return Database::getInstance()->getConnection();
    }

    public static function all(string $orderBy = 'id DESC'): array {
        $db = static::getDb();
        $table = static::$table;
        $stmt = $db->query("SELECT * FROM `{$table}` ORDER BY {$orderBy}");
        return $stmt->fetchAll();
    }

    public static function find($id): ?array {
        $db = static::getDb();
        $table = static::$table;
        $pk = static::$primaryKey;
        $stmt = $db->prepare("SELECT * FROM `{$table}` WHERE `{$pk}` = ? LIMIT 1");
        $stmt->execute([$id]);
        $res = $stmt->fetch();
        return $res ?: null;
    }

    public static function findBy(string $column, $value): ?array {
        $db = static::getDb();
        $table = static::$table;
        $stmt = $db->prepare("SELECT * FROM `{$table}` WHERE `{$column}` = ? LIMIT 1");
        $stmt->execute([$value]);
        $res = $stmt->fetch();
        return $res ?: null;
    }

    public static function where(string $column, $value, string $orderBy = 'id DESC'): array {
        $db = static::getDb();
        $table = static::$table;
        $stmt = $db->prepare("SELECT * FROM `{$table}` WHERE `{$column}` = ? ORDER BY {$orderBy}");
        $stmt->execute([$value]);
        return $stmt->fetchAll();
    }

    public static function create(array $data): int {
        $db = static::getDb();
        $table = static::$table;
        $columns = implode('`, `', array_keys($data));
        $placeholders = implode(', ', array_fill(0, count($data), '?'));

        $stmt = $db->prepare("INSERT INTO `{$table}` (`{$columns}`) VALUES ({$placeholders})");
        $stmt->execute(array_values($data));
        return (int)$db->lastInsertId();
    }

    public static function update($id, array $data): bool {
        $db = static::getDb();
        $table = static::$table;
        $pk = static::$primaryKey;

        $setParts = [];
        $values = [];
        foreach ($data as $col => $val) {
            $setParts[] = "`{$col}` = ?";
            $values[] = $val;
        }
        $values[] = $id;

        $setSql = implode(', ', $setParts);
        $stmt = $db->prepare("UPDATE `{$table}` SET {$setSql} WHERE `{$pk}` = ?");
        return $stmt->execute($values);
    }

    public static function delete($id): bool {
        $db = static::getDb();
        $table = static::$table;
        $pk = static::$primaryKey;
        $stmt = $db->prepare("DELETE FROM `{$table}` WHERE `{$pk}` = ?");
        return $stmt->execute([$id]);
    }

    public static function count(string $whereClause = '', array $params = []): int {
        $db = static::getDb();
        $table = static::$table;
        $sql = "SELECT COUNT(*) FROM `{$table}`";
        if ($whereClause) {
            $sql .= " WHERE " . $whereClause;
        }
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        return (int)$stmt->fetchColumn();
    }
}

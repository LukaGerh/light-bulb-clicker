<?php
header('Content-Type: application/json');
require_once 'db.php';

$json = file_get_contents('php://input');
$data = json_decode($json, true);

$username = trim($data['username'] ?? '');

if (empty($username)) {
    echo json_encode(['success' => false, 'message' => 'Lietotājvārds nav norādīts']);
    exit;
}

$count = (int)($data['count'] ?? 0);
$step = (int)($data['step'] ?? 1);
$autoClickStep = (int)($data['autoClickStep'] ?? 0);
$is500Collected = (int)($data['is500Collected'] ?? 0);

try {
    $stmt = $pdo->prepare("
        INSERT INTO user_progress (username, count, step, auto_click_step, is_500_collected)
        VALUES (:username, :count, :step, :auto_click_step, :is_500_collected)
        ON DUPLICATE KEY UPDATE
            count = VALUES(count),
            step = VALUES(step),
            auto_click_step = VALUES(auto_click_step),
            is_500_collected = VALUES(is_500_collected)
    ");

    $stmt->execute([
        ':username' => $username,
        ':count' => $count,
        ':step' => $step,
        ':auto_click_step' => $autoClickStep,
        ':is_500_collected' => $is500Collected
    ]);

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
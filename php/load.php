<?php
header('Content-Type: application/json');
require_once 'db.php';

$username = trim($_GET['username'] ?? '');

if (empty($username)) {
    echo json_encode(['success' => false, 'message' => 'Lietotājvārds nav norādīts']);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT count, step, auto_click_step, is_500_collected FROM user_progress WHERE username = :username");
    $stmt->execute([':username' => $username]);
    $progress = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($progress) {
        echo json_encode(['success' => true, 'data' => $progress]);
    } else {
        // Ja jauns lietotājs, atgriežam noklusējuma datus
        echo json_encode([
            'success' => true,
            'data' => [
                'count' => 0,
                'step' => 1,
                'auto_click_step' => 0,
                'is_500_collected' => 0
            ]
        ]);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
<?php
$host = 'localhost';
$dbname = 'lightbulbclicker'; // Nomaini pret savas datubāzes nosaukumu
$username = 'root';        // Nomaini pret savu DB lietotājvārdu
$password = '';            // Nomaini pret savu DB paroli

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'DB Savienojuma kļūda: ' . $e->getMessage()]);
    exit;
}
?>
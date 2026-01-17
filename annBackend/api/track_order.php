<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

// READ JSON REQUEST
$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data["order_id"]) || !isset($data["email"])) {
    echo json_encode([
        "status" => "error",
        "message" => "Missing required fields: order_id and email"
    ]);
    exit;
}

$order_id = trim($data["order_id"]);
$email = trim($data["email"]);

// DATABASE CONNECTION
$mysqli = new mysqli("localhost", "root", "", "anns_kitchen");

if ($mysqli->connect_errno) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to connect to database"
    ]);
    exit;
}

// PREPARED STATEMENT TO PREVENT SQL INJECTION
$stmt = $mysqli->prepare("SELECT * FROM orders WHERE order_id = ? AND email = ? LIMIT 1");
$stmt->bind_param("ss", $order_id, $email);
$stmt->execute();

$result = $stmt->get_result();

// CHECK IF ORDER EXISTS
if ($result->num_rows === 0) {
    echo json_encode([
        "status" => "not_found",
        "message" => "No order found with that Order ID and Email"
    ]);
    exit;
}

// FETCH ORDER
$order = $result->fetch_assoc();

echo json_encode([
    "status" => "success",
    "order" => $order
]);

<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// READ JSON REQUEST
$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data["order_id"])) {
    echo json_encode([
        "status" => "error",
        "message" => "Missing required field: order_id"
    ]);
    exit;
}

$order_id = trim($data["order_id"]);

// DATABASE CONNECTION
$mysqli = new mysqli("localhost", "root", "", "anns_kitchen");

if ($mysqli->connect_errno) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to connect to database"
    ]);
    exit;
}

// UPDATE DELIVERY STATUS
$stmt = $mysqli->prepare("UPDATE orders SET delivery_status = 'completed' WHERE order_id = ?");
$stmt->bind_param("s", $order_id);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode([
            "status" => "success",
            "message" => "Order marked as completed"
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Order not found"
        ]);
    }
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to update order"
    ]);
}

$stmt->close();
$mysqli->close();

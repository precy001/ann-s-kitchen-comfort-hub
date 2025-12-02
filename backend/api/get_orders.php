<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

$mysqli = new mysqli("localhost", "root", "", "anns_kitchen");

if ($mysqli->connect_errno) {
    echo json_encode(["status" => "error", "message" => "DB connection failed"]);
    exit;
}

$result = $mysqli->query("SELECT * FROM orders ORDER BY id DESC");

$orders = [];
while ($row = $result->fetch_assoc()) {
    $orders[] = $row;
}

echo json_encode([
    "status" => "success",
    "orders" => $orders
]);

$mysqli->close();

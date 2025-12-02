<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

// CONNECT TO DATABASE
$mysqli = new mysqli("localhost", "root", "", "anns_kitchen");

// Check DB connection
if ($mysqli->connect_errno) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to connect to database"
    ]);
    exit;
}

// FETCH ALL ORDERS
$query = "SELECT * FROM orders ORDER BY id DESC";
$result = $mysqli->query($query);

if (!$result) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to fetch orders",
        "sql_error" => $mysqli->error
    ]);
    exit;
}

$orders = [];

while ($row = $result->fetch_assoc()) {
    $orders[] = $row;
}

// SUCCESS RESPONSE
echo json_encode([
    "status" => "success",
    "count" => count($orders),
    "orders" => $orders
]);

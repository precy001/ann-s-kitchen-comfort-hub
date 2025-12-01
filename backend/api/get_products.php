<?php
header("Content-Type: application/json");

// Allow CORS so React dev server (localhost:3000) can call it
header("Access-Control-Allow-Origin: *");

$mysqli = new mysqli("localhost","root","","anns_kitchen");
if ($mysqli->connect_errno) {
    echo json_encode(['status'=>'error','message'=>'DB connection failed']);
    exit;
}

$result = $mysqli->query("SELECT id, name, price, image, created_at FROM products ORDER BY id DESC");
$products = [];
$baseUrl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https://" : "http://")
           . $_SERVER['HTTP_HOST'] . dirname($_SERVER['REQUEST_URI']) . '/';

while ($row = $result->fetch_assoc()) {
    // Convert stored relative path into full URL
    $row['image'] = $baseUrl . $row['image'];
    $products[] = $row;
}

echo json_encode($products);
?>

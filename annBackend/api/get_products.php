<?php
header("Content-Type: application/json");

// Allow CORS
header("Access-Control-Allow-Origin: *");

$mysqli = new mysqli("localhost", "glamorou_ann_kitchen", "UltimateDev))@@#", "glamorou_ann_kitchen");

if ($mysqli->connect_errno) {
    echo json_encode([
        'status' => 'error',
        'message' => 'DB connection failed'
    ]);
    exit;
}

// Fetch all required fields
$query = "
    SELECT 
        id, 
        name, 
        price, 
        image, 
        category, 
        description, 
        created_at
    FROM products
    ORDER BY id DESC
";

$result = $mysqli->query($query);
$products = [];

// Build base URL dynamically
$baseUrl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https://" : "http://")
           . $_SERVER['HTTP_HOST']
           . dirname($_SERVER['REQUEST_URI'])
           . '/';

// Fetch rows
while ($row = $result->fetch_assoc()) {
    // Convert image path to full URL
    $row['image'] = $baseUrl . $row['image'];
    $products[] = $row;
}

echo json_encode($products);
?>

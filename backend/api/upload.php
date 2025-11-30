<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

// Basic config
$uploadDir = "uploads/products/";
if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);

// Check upload
if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    echo json_encode(['status'=>'error','message'=>'No file uploaded or upload error']);
    exit;
}

// Validate input (simple)
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$price = isset($_POST['price']) ? trim($_POST['price']) : '0';

if ($name === '') {
    echo json_encode(['status'=>'error','message'=>'Name required']);
    exit;
}

// Validate file type & size (simple)
$allowed = ['image/jpeg','image/png','image/gif','image/webp'];
if (!in_array($_FILES['image']['type'], $allowed)) {
    echo json_encode(['status'=>'error','message'=>'Invalid image type']);
    exit;
}

// Create safe filename
$ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
$filename = time() . '_' . bin2hex(random_bytes(6)) . '.' . $ext;
$targetPath = $uploadDir . $filename;

// Move file
if (!move_uploaded_file($_FILES['image']['tmp_name'], $targetPath)) {
    echo json_encode(['status'=>'error','message'=>'Failed to move uploaded file']);
    exit;
}

// Save to DB
$mysqli = new mysqli("localhost","root","","anns_kitchen");
if ($mysqli->connect_errno) {
    echo json_encode(['status'=>'error','message'=>'DB connection failed']);
    exit;
}

$stmt = $mysqli->prepare("INSERT INTO products (name, price, image) VALUES (?, ?, ?)");
if (!$stmt) {
    echo json_encode(['status'=>'error','message'=>'DB prepare failed']);
    exit;
}
$stmt->bind_param("sds", $name, $price, $targetPath);
$exec = $stmt->execute();
if (!$exec) {
    echo json_encode(['status'=>'error','message'=>'DB insert failed']);
    exit;
}

// Return full URL (so React can use it)
$baseUrl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https://" : "http://")
           . $_SERVER['HTTP_HOST'] . dirname($_SERVER['REQUEST_URI']) . '/';

$imageUrl = $baseUrl . $targetPath;

echo json_encode(['status'=>'success','id'=>$stmt->insert_id,'imageUrl'=>$imageUrl]);
?>

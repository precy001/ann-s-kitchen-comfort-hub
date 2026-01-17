<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

// Upload directory
$uploadDir = "uploads/products/";
if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);

// Check file upload
if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    echo json_encode(['status' => 'error', 'message' => 'No file uploaded or upload error']);
    exit;
}

// Validate fields
$name = trim($_POST['name'] ?? '');
$price = trim($_POST['price'] ?? '0');
$category = trim($_POST['category'] ?? '');
$description = trim($_POST['description'] ?? '');


if ($name === '' || $category === '') {
    echo json_encode(['status' => 'error', 'message' => 'Missing required fields']);
    exit;
}

// Validate image type
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
$mysqli = new mysqli("localhost", "glamorou_ann_kitchen", "UltimateDev))@@#", "glamorou_ann_kitchen");

if ($mysqli->connect_errno) {
    echo json_encode(['status'=>'error','message'=>'Database connection failed']);
    exit;
}

$stmt = $mysqli->prepare("INSERT INTO products (name, description, category, price, image) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssds", $name, $description, $category,  $price, $targetPath);
$exec = $stmt->execute();

if (!$exec) {
    echo json_encode(['status'=>'error','message'=>'DB insert failed: '.$stmt->error]);
    exit;
}

// Build image URL (for frontend)
$baseUrl = (isset($_SERVER['HTTPS']) ? "https://" : "http://") . $_SERVER['HTTP_HOST'] . dirname($_SERVER['REQUEST_URI']) . '/';
$imageUrl = $baseUrl . $targetPath;

echo json_encode([
    'status' => 'success',
    'id' => $stmt->insert_id,
    'imageUrl' => $imageUrl
]);
?>

<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

// Read the JSON request
$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data["paymentResponse"])) {
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
    exit;
}

// -------------------------------
// Correct Flutterwave transaction ID
// -------------------------------
$payment = $data["paymentResponse"];
$transaction_id = $payment["transaction_id"]; 

// Debug log
file_put_contents("debug_log.txt", print_r($data, true));

// -------------------------------
// VERIFY PAYMENT ON FLUTTERWAVE
// -------------------------------
$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_URL => "https://api.flutterwave.com/v3/transactions/$transaction_id/verify",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        "Authorization: Bearer FLWSECK_TEST-bf474bd6a6a9151ce0b3ea4de9b454ea-X",
        "Content-Type: application/json"
    ],
]);
$response = curl_exec($curl);
curl_close($curl);

$verify = json_decode($response, true);

// Check verification
if (!isset($verify["status"]) || $verify["status"] !== "success") {
    echo json_encode(["status" => "error", "message" => "Payment verification failed", "flutterwave_response" => $verify]);
    exit;
}

// Amount paid
$amount = $verify["data"]["amount"];

// -------------------------------
// DATABASE INSERT
// -------------------------------
$mysqli = new mysqli("localhost", "root", "", "anns_kitchen");

if ($mysqli->connect_errno) {
    echo json_encode(["status" => "error", "message" => "DB connection failed"]);
    exit;
}



// Prepare insert statement
$stmt = $mysqli->prepare(
    "INSERT INTO orders 
    (order_id, name, phone, email, address, notes, `method`, order_details, amount, payment_status, flutterwave_tx_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
);

$payment_status = "paid";
$flutterwave_tx_id = $transaction_id;

// Bind parameters
$stmt->bind_param(
    "ssssssssdss",
    $data["orderId"],
    $data["name"],
    $data["phone"],
    $data["email"],
    $data["address"],
    $data["notes"],
    $data["deliveryMethod"],
    $data["orderDetails"],
    $amount,
    $payment_status,
    $flutterwave_tx_id
);

// Execute and check
if (!$stmt->execute()) {
    echo json_encode([
        "status" => "error",
        "message" => "Insert failed",
        "sql_error" => $stmt->error
    ]);
    exit;
}

// Success
echo json_encode([
    "status" => "success",
    "message" => "Order saved successfully",
    "order_id" => $stmt->insert_id
]);

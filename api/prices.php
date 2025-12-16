<?php
/**
 * Saudi Gold v2 - API Proxy
 * يحل مشكلة CORS عند استدعاء API من المتصفح
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Cache-Control: max-age=60');

$API_KEY = '2919b5f9bdc14d018e8f3ff2d259155f';
$API_BASE = 'https://api.metalpriceapi.com/v1';

$endpoint = isset($_GET['endpoint']) ? $_GET['endpoint'] : 'latest';
$apiUrl = $API_BASE . '/' . $endpoint . '?api_key=' . $API_KEY . '&base=XAU&currencies=SAR,USD';

$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL => $apiUrl,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 10,
    CURLOPT_SSL_VERIFYPEER => true,
    CURLOPT_HTTPHEADER => ['Accept: application/json']
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

if ($error) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'API connection failed: ' . $error]);
    exit;
}

http_response_code($httpCode);
echo $response;

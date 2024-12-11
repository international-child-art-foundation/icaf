<?php
require_once "Mail.php";
$config = require_once "config.php";

$username = "no-reply@icaf.org";
$from = "no-reply@icaf.org";
$password = $config["mail_password"];

// GLOBALS
$to = "childart@icaf.org";
$body = "";

// Validate POST data
$allowedKeys = ['name', 'email', 'message', 'type', 'inLovingMemoryOf'];
$sanitized = []; // Initialize the sanitized array
foreach ($_POST as $label => $content) {
  if (!in_array($label, $allowedKeys)) {
    continue;
  }
  $sanitized[$label] = htmlspecialchars($content, ENT_QUOTES, 'UTF-8');
  if ($label !== 'type') {
    $body .= "<h2>{$label}</h2> <p style='margin:5px 0 0 20px'>" . nl2br($sanitized[$label]) . "</p>";
  }
}

if (!isset($sanitized['type'])) {
    exit('invalid_request');
}

switch ($sanitized['type']) {
  case "subscribe":
    $subject = "{$sanitized['email']} would like to subscribe to the ICAF newsletter";
    $body = $subject;
    break;
  case "contact-us":
    $subject = "Message from {$sanitized['name']}";
    break;
  case "membership":
    $subject = "New membership application {$sanitized['email']}";
    break;
  case "art-lovers":
    $subject = "Art Lovers request for {$sanitized['name']}";
    break;
  case "in-loving-memory":
    $subject = "In Loving Memory request for {$sanitized['inLovingMemoryOf']}";
    break;
  default:
    exit('invalid_type');
}

$headers = [
  'From' => "ICAF <$from>",
  'To' => $to,
  'Subject' => $subject,
  'Content-Type' => 'text/html; charset=UTF-8'
];

function trySendMail($host, $port, $username, $password, $to, $headers, $body) {
    $smtp = Mail::factory('smtp', [
        'host' => $host,
        'port' => $port,
        'auth' => true,
        'username' => $username,
        'password' => $password,
        'timeout' => 10,
        'persist' => false
    ]);
    
    return $smtp->send($to, $headers, $body);
}

$configs = [
    ['host' => 'ssl://smtp.ionos.com', 'port' => 465]
];

$success = false;

foreach ($configs as $configItem) { 
    $mail = trySendMail($configItem['host'], $configItem['port'], $username, $password, $to, $headers, $body);
    
    if (!PEAR::isError($mail)) {
        $success = true;
        break;
    }
}

if ($success) {
    echo "success";
} else {
    echo "<p>An error occurred while sending the email. Please try again later.</p>";
}
?>

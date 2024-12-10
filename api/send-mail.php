<?php
require_once "Mail.php";
require_once "config.php";

$username = "no-reply@icaf.org";
$from = "no-reply@icaf.org";
$password = $config["mail_password"];

// GLOBALS
$to = "childart@icaf.org";
$body = "";
foreach ($_POST as $label => $content) {
  $$label = $content;
  if ($label === "type") continue;
  $body .= "<h2>{$label}</h2> <p style='margin:5px 0 0 20px'>" . nl2br($content) . "</p>";
}

if (!in_array("type", array_keys(get_defined_vars()))) exit();

switch ($type) {
  case "subscribe":
    $subject = "{$email} would like to subscribe to the ICAF newsletter";
    $body = $subject;
    break;
  case "contact-us":
    $subject = "Message from {$name}";
    break;
  case "membership":
    $subject = "New membership application {$email}";
    break;
  case "art-lovers":
    $subject = "Art Lovers request for {$name}";
    break;
  case "in-loving-memory":
    $subject = "In Loving Memory request for {$inLovingMemoryOf}";
    break;
  default:
    echo "invalid_type";
    exit();
}

$headers = array (
  'From' => "ICAF <$from>",
  'To' => $to,
  'Subject' => $subject,
  'Content-Type' => 'text/html; charset=UTF-8'
);

function trySendMail($host, $port, $username, $password, $to, $headers, $body) {
    $smtp = Mail::factory('smtp', array (
        'host' => $host,
        'port' => $port,
        'auth' => true,
        'username' => $username,
        'password' => $password,
        'timeout' => 10,
        'persist' => false
    ));
    
    return $smtp->send($to, $headers, $body);
}

$configs = [
    ['host' => 'ssl://smtp.ionos.com', 'port' => 465]
];

$success = false;
$errors = [];

foreach ($configs as $config) {
    $mail = trySendMail($config['host'], $config['port'], $username, $password, $to, $headers, $body);
    
    if (!PEAR::isError($mail)) {
        $success = true;
        break;
    } else {
        $errors[] = "Error with {$config['host']}:{$config['port']} - " . $mail->getMessage();
    }
}

if ($success) {
    echo "success";
} else {
    // Log all errors
    // foreach ($errors as $error) {
    //     error_log($error);
    // }
    
    // Display all errors (for debugging, remove in production)
    // echo "<p>Failed to send email revise. Errors encountered:</p>";
    // echo "<ul>";
    // foreach ($errors as $error) {
    //     echo "<li>" . htmlspecialchars($error) . "</li>";
    // }
    // echo "</ul>";
    
    // In production, use a generic error message instead:
    echo "<p>An error occurred while sending the email. Please try again later.</p>";
}
?>
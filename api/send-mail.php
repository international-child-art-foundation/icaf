<?php

// GLOBALS
$to = "childart@icaf.org";
$body = "";
foreach ($_POST as $label => $content) {
  $$label = $content;
  if ($label === "type") continue;
  $body .= "<h2>{$label}</h2> <p style='margin:5px 0 0 20px'>{$content}</p>";
}
$headers = "From: ICAF <no-reply@icaf.org>\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

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
  default:
    echo "invalid_type";
    exit();
}
echo (mail($to, $subject, $body, $headers) ? "success" : "error");

<?php

// Manual autoload for Midtrans if composer autoload is not available
// This is a fallback solution for environments without composer

if (!class_exists('Midtrans\Config')) {
    require_once __DIR__ . '/../../vendor/autoload.php';
}

// Ensure Midtrans is properly loaded
if (!class_exists('Midtrans\Config')) {
    // Try to load from common vendor path
    $vendorPath = __DIR__ . '/../../../vendor/autoload.php';
    if (file_exists($vendorPath)) {
        require_once $vendorPath;
    }
}

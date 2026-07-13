<?php

return [
    'api_key' => env('PAKASIR_API_KEY'),
    'base_url' => env('PAKASIR_BASE_URL', 'https://api.pakasir.id'),
    'merchant_code' => env('PAKASIR_MERCHANT_CODE'),
    'callback_url' => env('PAKASIR_CALLBACK_URL'),
    'timeout' => 30,
];

<?php

namespace App\Helpers;

class StorageHelper
{
    /**
     * Get tenant asset URL.
     *
     * @param string|null $path
     * @return string|null
     */
    public static function tenantAsset(?string $path): ?string
    {
        if (!$path) {
            return null;
        }

        // If path is already a full URL, return it
        if (filter_var($path, FILTER_VALIDATE_URL)) {
            return $path;
        }

        // If tenancy is initialized, prefix with tenant-storage/tenant_id
        if (function_exists('tenant') && tenant()) {
            return asset('tenant-storage/' . tenant('id') . '/' . ltrim($path, '/'));
        }

        // Fallback to central storage
        return asset('storage/' . ltrim($path, '/'));
    }
}

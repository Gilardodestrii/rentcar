<?php

namespace App\Jobs\Tenancy;

use Illuminate\Foundation\Bus\Dispatchable;
use Stancl\Tenancy\Contracts\TenantWithDatabase;

class CreateTenantStorageSymlink
{
    use Dispatchable;

    public function __construct(public TenantWithDatabase $tenant) {}

    public function handle(): void
    {
        $tenantId = $this->tenant->getTenantKey();

        $target = base_path("storage/{$tenantId}/app/public");
        $link   = public_path("tenant-storage/{$tenantId}");

        if (file_exists($link)) {
            return;
        }

        if (!is_dir(dirname($link))) {
            mkdir(dirname($link), 0775, true);
        }

        if (!is_dir($target)) {
            mkdir($target, 0775, true);
        }

        if (!@symlink($target, $link)) {
            throw new \RuntimeException("Failed to create symlink: {$target} -> {$link}");
        }
    }
}

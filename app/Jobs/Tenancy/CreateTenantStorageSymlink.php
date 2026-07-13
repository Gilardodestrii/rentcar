<?php

namespace App\Jobs\Tenancy;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
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

        if (is_link($link)) {
            return;
        }

        if (!is_dir(dirname($link))) {
            mkdir(dirname($link), 0775, true);
        }

        if (!is_dir($target)) {
            mkdir($target, 0775, true);
        }

        if (!@symlink($target, $link) && !file_exists($link)) {
            throw new \RuntimeException("Failed to create symlink: {$target} -> {$link}");
        }
    }
}

<?php

namespace App\Jobs\Tenancy;

use Illuminate\Filesystem\Filesystem;
use Illuminate\Foundation\Bus\Dispatchable;
use Stancl\Tenancy\Contracts\TenantWithDatabase;

class CreateTenantStorageSymlink
{
    use Dispatchable;

    public function __construct(public TenantWithDatabase $tenant) {}

    public function handle(Filesystem $filesystem): void
    {
        $tenantId = $this->tenant->getTenantKey();

        $target = base_path("storage/{$tenantId}/app/public");
        $link   = public_path("tenant-storage/{$tenantId}");

        if ($filesystem->isDirectory($link)) {
            return;
        }

        if (!$filesystem->isDirectory(dirname($link))) {
            $filesystem->makeDirectory(dirname($link), 0775, true);
        }

        if (!$filesystem->isDirectory($target)) {
            $filesystem->makeDirectory($target, 0775, true);
        }

        if (!$filesystem->exists($link)) {
            $filesystem->link($target, $link);
        }
    }
}

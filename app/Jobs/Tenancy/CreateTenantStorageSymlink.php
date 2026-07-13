<?php

namespace App\Jobs\Tenancy;

use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Filesystem\Filesystem;
use Stancl\Tenancy\Contracts\TenantWithDatabase;

class CreateTenantStorageSymlink
{
    use Dispatchable;

    public function __construct(public TenantWithDatabase $tenant) {}

    public function handle(Filesystem $filesystem): void
    {
        $tenantId = $this->tenant->getTenantKey();
        $source = base_path("storage/{$tenantId}/app/public");
        $target = public_path("tenant-storage/{$tenantId}");

        // Buat directory target kalau belum ada
        if (!$filesystem->isDirectory($target)) {
            $filesystem->makeDirectory($target, 0775, true);
        }

        // Buat directory source kalau belum ada
        if (!$filesystem->isDirectory($source)) {
            $filesystem->makeDirectory($source, 0775, true);
        }

        // Copy semua file dari source ke target (bukan symlink)
        $filesystem->ensureDirectoryExists($source);
        $filesystem->ensureDirectoryExists($target);

        // Sync file dari source ke target (copy, bukan symlink)
        $filesystem->copyDirectory($source, $target, true);
    }
}

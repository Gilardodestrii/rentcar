<?php

namespace App\Providers;

use Illuminate\Filesystem\Filesystem;
use Illuminate\Filesystem\FilesystemAdapter;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use League\Flysystem\Local\LocalFilesystemAdapter;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if ($this->app->environment('production')) {
            URL::forceScheme('https');
        }

        Vite::prefetch(concurrency: 3);

        // Load Midtrans configuration
        $this->app->make('config')->set('midtrans', require config_path('midtrans.php'));

        // Sync tenant storage to public on file upload
        Storage::extend('tenant_public', function ($app, $config) {
            $tenantId = $config['tenant_id'] ?? 'central';
            $storagePath = base_path("storage/{$tenantId}/app/public");
            $publicPath = public_path("tenant-storage/{$tenantId}");

            // Ensure directories exist
            if (!is_dir($storagePath)) {
                mkdir($storagePath, 0775, true);
            }
            if (!is_dir($publicPath)) {
                mkdir($publicPath, 0775, true);
            }

            return new FilesystemAdapter(
                new LocalFilesystemAdapter($storagePath),
                new Filesystem(),
                $config
            );
        });
    }
}

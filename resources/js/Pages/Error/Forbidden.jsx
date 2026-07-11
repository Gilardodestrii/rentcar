import { Link } from '@inertiajs/react';
import { Button } from '@/Components/UI/Button';

export default function Forbidden() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white">403</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">
          Access denied
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          You don't have permission to access this page.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Button asChild>
            <Link href="/">Go to home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard">Go to dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

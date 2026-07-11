import { Link } from '@inertiajs/react';
import { Button } from '@/Components/UI/Button';

export default function Error500() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white">500</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">
          Something went wrong
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          An unexpected error occurred. Please try again later.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Button asChild>
            <Link href="/">Go to home</Link>
          </Button>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}

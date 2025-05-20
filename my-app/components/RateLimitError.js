'use client';

/**
 * RateLimitError component to display when API rate limits are hit
 * @param {Object} props - Component props
 * @param {Function} props.retry - Function to retry the operation
 */
export default function RateLimitError({ retry }) {
  return (
    <div className="mt-12 p-6 rounded-lg border border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-800/30 text-center">
      <h2 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-3">
        Rate Limit Exceeded
      </h2>
      
      <p className="mb-4 text-red-600 dark:text-red-300">
        We've hit the Google Books API rate limit. This happens when too many requests are made in a short period.
      </p>
      
      <div className="mb-6 p-4 bg-white dark:bg-black/20 rounded border border-red-100 dark:border-red-800/20 text-left">
        <p className="text-sm font-mono text-red-500 dark:text-red-400">
          Error: API error: 429
        </p>
      </div>
      
      <div className="space-y-3 text-sm text-red-600 dark:text-red-300">
        <p>The application will automatically retry with exponential backoff.</p>
        <p>You can also wait a moment and try again manually.</p>
      </div>
      
      {retry && (
        <button
          onClick={retry}
          className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

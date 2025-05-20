'use client';

import Link from 'next/link';
import RateLimitError from './RateLimitError';

/**
 * Error component to display error messages
 * @param {Object} props - Component props
 * @param {string} props.message - Error message
 * @param {string} props.code - Error code (optional)
 * @param {Function} props.retry - Function to retry the operation (optional)
 */
export default function Error({ message = 'Something went wrong', code, retry }) {
  // Check if this is a rate limit error (429)
  if (code && code.includes('429')) {
    return <RateLimitError retry={retry} />;
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <div className="bg-red-500/10 dark:bg-red-500/20 p-3 rounded-full mb-4">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-8 w-8 text-red-500" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
          />
        </svg>
      </div>
      
      <h2 className="text-xl font-semibold">Error{code ? ` (${code})` : ''}</h2>
      <p className="mt-2 text-foreground/70 max-w-md">{message}</p>
      
      <div className="mt-6 flex flex-wrap gap-4 justify-center">
        {retry && (
          <button
            onClick={retry}
            className="px-4 py-2 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors"
          >
            Try Again
          </button>
        )}
        
        <Link
          href="/"
          className="px-4 py-2 rounded-full border border-black/[.08] dark:border-white/[.145] hover:bg-black/[.05] dark:hover:bg-white/[.05] transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

'use client';

/**
 * Loading component to display a loading spinner
 * @param {Object} props - Component props
 * @param {string} props.message - Optional loading message
 */
export default function Loading({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <div className="h-12 w-12 border-4 border-t-4 border-foreground/20 border-t-foreground rounded-full animate-spin"></div>
      <p className="mt-4 text-foreground/70">{message}</p>
    </div>
  );
}

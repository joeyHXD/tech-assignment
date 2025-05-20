'use client';

import { useState } from 'react';

/**
 * SearchBar component for searching books
 * @param {Object} props - Component props
 * @param {Function} props.onSearch - Function to call when search is submitted
 * @param {string} props.initialQuery - Initial search query (optional)
 * @param {boolean} props.isLoading - Whether a search is in progress
 */
export default function SearchBar({ onSearch, initialQuery = '', isLoading = false }) {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books..."
          className="w-full px-4 py-3 rounded-full border border-black/[.08] dark:border-white/[.145] 
                     focus:outline-none focus:ring-2 focus:ring-foreground/20 
                     bg-background text-foreground"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 
                     px-4 py-1.5 rounded-full bg-foreground text-background 
                     hover:bg-foreground/90 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="h-5 w-5 border-t-2 border-r-2 border-background rounded-full animate-spin" />
          ) : (
            'Search'
          )}
        </button>
      </form>
    </div>
  );
}

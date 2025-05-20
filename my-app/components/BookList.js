'use client';

import BookCard from './BookCard';
import { formatBookData } from '../lib/api';

/**
 * BookList component to display search results
 * @param {Object} props - Component props
 * @param {Array} props.books - Array of book data from the API
 * @param {boolean} props.isLoading - Whether books are being loaded
 * @param {string} props.searchQuery - The current search query
 */
export default function BookList({ books = [], isLoading = false, searchQuery = '' }) {
  // Format book data for consistent use in components
  const formattedBooks = books.map(book => formatBookData(book)).filter(Boolean);
  
  // If loading, show skeleton UI
  if (isLoading) {
    return (
      <div className="mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div 
              key={index} 
              className="h-96 rounded-lg bg-black/[.05] dark:bg-white/[.05] animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }
  
  // If no search query, show initial state
  if (!searchQuery) {
    return (
      <div className="mt-16 text-center">
        <h2 className="text-xl font-semibold">Search for books to get started</h2>
        <p className="mt-2 text-foreground/70">
          Enter a title, author, or keyword in the search bar above
        </p>
      </div>
    );
  }
  
  // If no results found
  if (formattedBooks.length === 0) {
    return (
      <div className="mt-16 text-center">
        <h2 className="text-xl font-semibold">No books found</h2>
        <p className="mt-2 text-foreground/70">
          Try a different search term or check your spelling
        </p>
      </div>
    );
  }
  
  // Display search results
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">
        Search results for "{searchQuery}"
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {formattedBooks.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

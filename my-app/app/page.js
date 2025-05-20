'use client';

import { useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import SearchBar from '../components/SearchBar';
import BookList from '../components/BookList';
import Error from '../components/Error';
import { searchBooks } from '../lib/api';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const searchTimeoutRef = useRef(null);

  // Debounced search function
  const handleSearch = useCallback(async (query) => {
    // Clear any existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    if (!query.trim()) {
      setBooks([]);
      setTotalItems(0);
      return;
    }

    // Set loading state immediately for UI feedback
    setIsLoading(true);
    setError(null);

    // Debounce the actual API call by 300ms
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        console.log('Initiating search for:', query);
        const data = await searchBooks(query);
        console.log('Search completed, data:', data);
        
        if (data && Array.isArray(data.items)) {
          setBooks(data.items);
          setTotalItems(data.totalItems || 0);
        } else {
          console.warn('No items array in response:', data);
          setBooks([]);
          setTotalItems(0);
        }
      } catch (err) {
        console.error('Search error:', err);
        setError({
          message: 'Failed to search books. Please try again.',
          code: err.message
        });
        setBooks([]);
        setTotalItems(0);
      } finally {
        setIsLoading(false);
      }
    }, 300); // 300ms debounce delay
  }, []);

  const retrySearch = () => {
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  };

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-12">
      <header className="max-w-5xl mx-auto text-center mb-12">
        <div className="flex justify-center mb-6">
          <Image
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={38}
            priority
            className="dark:invert"
          />
        </div>
        <h1 className="text-3xl font-bold mb-4">Google Books Search</h1>
        <p className="text-foreground/70 max-w-2xl mx-auto">
          Search for books using the Google Books API. Enter a title, author, or keyword to get started.
        </p>
      </header>

      <main className="max-w-5xl mx-auto">
        <SearchBar 
          onSearch={(query) => {
            setSearchQuery(query);
            handleSearch(query);
          }}
          isLoading={isLoading}
        />

        {error ? (
          <Error 
            message={error.message} 
            code={error.code} 
            retry={retrySearch} 
          />
        ) : (
          <BookList 
            books={books} 
            isLoading={isLoading} 
            searchQuery={searchQuery}
          />
        )}

        {totalItems > 0 && books.length > 0 && !isLoading && !error && (
          <div className="mt-6 text-center text-sm text-foreground/70">
            Showing {books.length} of {totalItems.toLocaleString()} results
          </div>
        )}
      </main>

      <footer className="max-w-5xl mx-auto mt-16 text-center text-sm text-foreground/50">
        <p>Built with Next.js and Google Books API</p>
      </footer>
    </div>
  );
}

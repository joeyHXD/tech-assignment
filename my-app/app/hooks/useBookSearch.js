"use client";

import { useState, useCallback } from 'react';

export default function useBookSearch() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [lastSearchedQuery, setLastSearchedQuery] = useState("");
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  
  const fetchBooks = useCallback(async (
    searchQuery, 
    page = 1
  ) => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError(null);
    
    const startIndex = (page - 1) * itemsPerPage;
    
    try {
      // Build URL
      let url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&startIndex=${startIndex}&maxResults=${itemsPerPage}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      
      const data = await response.json();
      let items = data.items || [];
      
      setBooks(items);
      setTotalItems(data.totalItems || 0);
      setLastSearchedQuery(searchQuery);
      setCurrentPage(page);
    } catch (err) {
      setError("An error occurred while fetching books. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [itemsPerPage]);

  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage);
    fetchBooks(lastSearchedQuery, newPage);
    // Scroll to top of results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [fetchBooks, lastSearchedQuery]);

  const searchBooks = useCallback((query) => {
    setCurrentPage(1);
    fetchBooks(query, 1);
  }, [fetchBooks]);

  return {
    books,
    loading,
    error,
    totalItems,
    currentPage,
    itemsPerPage,
    lastSearchedQuery,
    fetchBooks,
    searchBooks,
    handlePageChange
  };
}

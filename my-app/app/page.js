"use client";

import { useState } from "react";

// Custom hooks
import useBookSearch from "@/app/hooks/useBookSearch";

// Components
import PageContainer from "@/app/components/layout/PageContainer";
import SearchBar from "@/app/components/search/SearchBar";
import BookList from "@/app/components/book/BookList";
import Pagination from "@/app/components/ui/Pagination";
import ErrorDisplay from "@/app/components/ui/ErrorDisplay";
import EmptyState from "@/app/components/ui/EmptyState";

export default function Home() {
  const [query, setQuery] = useState("");
  
  const {
    books,
    loading,
    error,
    totalItems,
    currentPage,
    itemsPerPage,
    lastSearchedQuery,
    searchBooks,
    handlePageChange
  } = useBookSearch();

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    searchBooks(searchQuery);
  };

  return (
    <PageContainer
      title="Google Books Search"
      description="Search for books using the Google Books API. Enter a title, author, or keyword to get started."
    >
      <SearchBar onSearch={handleSearch} initialQuery={query} />
      
      <ErrorDisplay message={error} />
      
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Searching for books...</p>
        </div>
      ) : (
        <>
          <BookList books={books} />
          
          {books.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              loading={loading}
            />
          )}
          
          {books.length === 0 && lastSearchedQuery && !loading && (
            <EmptyState />
          )}
        </>
      )}
    </PageContainer>
  );
}

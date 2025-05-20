"use client";

import { useState, useEffect } from 'react';

export default function useBookDetails(bookId) {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (!bookId) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${bookId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch book details");
        }

        const data = await response.json();
        setBook(data);
      } catch (err) {
        setError("An error occurred while fetching book details. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  return { book, loading, error };
}

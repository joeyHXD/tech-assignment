'use client';

import { useState, useEffect } from 'react';
import { getBookById, formatBookData } from '../../../lib/api';
import BookDetails from '../../../components/BookDetails';
import Loading from '../../../components/Loading';
import Error from '../../../components/Error';

/**
 * Book details page component
 * @param {Object} props - Component props
 * @param {Object} props.params - Route parameters
 * @param {string} props.params.id - Book ID from the URL
 */
export default function BookPage({ params }) {
  const { id } = params;
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBookDetails() {
      if (!id) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        console.log('Fetching book details for ID:', id);
        const data = await getBookById(id);
        console.log('Book details data:', data);
        const formattedBook = formatBookData(data);
        setBook(formattedBook);
      } catch (err) {
        console.error('Error fetching book details:', err);
        setError({
          message: 'Failed to load book details. Please try again.',
          code: err.message
        });
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchBookDetails();
  }, [id]);
  
  const retryFetch = () => {
    if (id) {
      setIsLoading(true);
      setError(null);
      
      // Add a small delay before retrying to avoid hitting rate limits
      setTimeout(() => {
        getBookById(id)
          .then(data => {
            const formattedBook = formatBookData(data);
            setBook(formattedBook);
          })
          .catch(err => {
            console.error('Error retrying book fetch:', err);
            setError({
              message: 'Failed to load book details. Please try again.',
              code: err.message
            });
          })
          .finally(() => {
            setIsLoading(false);
          });
      }, 1000); // 1 second delay before retry
    }
  };

  if (isLoading) {
    return <Loading message="Loading book details..." />;
  }

  if (error) {
    return <Error message={error.message} code={error.code} retry={retryFetch} />;
  }

  return <BookDetails book={book} />;
}

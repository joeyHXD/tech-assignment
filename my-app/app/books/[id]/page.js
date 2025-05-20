"use client";

import { use } from 'react';
import Link from "next/link";

// Custom hooks
import useBookDetails from "@/app/hooks/useBookDetails";

// Components
import PageContainer from "@/app/components/layout/PageContainer";
import BookHeader from "@/app/components/book/BookHeader";
import BookCover from "@/app/components/book/BookCover";
import BookMetadata from "@/app/components/book/BookMetadata";
import BookDescription from "@/app/components/book/BookDescription";
import BookActions from "@/app/components/book/BookActions";
import ErrorDisplay from "@/app/components/ui/ErrorDisplay";

export default function BookPage({ params }) {
  const { id } = use(params);
  const { book, loading, error } = useBookDetails(id);

  if (loading) {
    return (
      <PageContainer>
        <div className="flex justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent mb-4"></div>
            <div className="text-xl">Loading book details...</div>
          </div>
        </div>
      </PageContainer>
    );
  }

  if (error || !book) {
    return (
      <PageContainer>
        <ErrorDisplay message={error || "Book not found"} />
        <Link href="/" className="text-blue-500 hover:underline">
          ← Back to search
        </Link>
      </PageContainer>
    );
  }

  const {
    volumeInfo: {
      title,
      authors = [],
      description = "No description available",
      publishedDate,
      publisher,
      pageCount,
      categories = [],
      imageLinks = {},
      language,
      previewLink,
      infoLink,
    } = {},
  } = book;

  return (
    <PageContainer>
      <Link href="/" className="text-blue-500 hover:underline mb-8 inline-block">
        ← Back to search
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
        <div className="md:col-span-1">
          <BookCover 
            imageUrl={imageLinks.thumbnail} 
            title={title} 
          />
        </div>

        <div className="md:col-span-2">
          <BookHeader 
            title={title} 
            authors={authors} 
          />
          
          <BookMetadata 
            publishedDate={publishedDate}
            publisher={publisher}
            pageCount={pageCount}
            language={language}
            categories={categories}
          />
          
          <BookDescription 
            description={description} 
          />
          
          <BookActions 
            previewLink={previewLink} 
            infoLink={infoLink} 
          />
        </div>
      </div>
    </PageContainer>
  );
}

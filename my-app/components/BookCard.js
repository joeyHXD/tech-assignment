'use client';

import Image from 'next/image';
import Link from 'next/link';

/**
 * BookCard component to display a book in the search results
 * @param {Object} props - Component props
 * @param {Object} props.book - Book data
 */
export default function BookCard({ book }) {
  if (!book) return null;

  const {
    id,
    title,
    authors,
    description,
    thumbnail,
    publishedDate,
  } = book;

  // Extract year from published date if available
  const publishYear = publishedDate ? publishedDate.substring(0, 4) : '';

  // Truncate description to a reasonable length
  const truncatedDescription = description && description.length > 150
    ? `${description.substring(0, 150)}...`
    : description;

  return (
    <Link
      href={`/books/${id}`}
      className="flex flex-col h-full overflow-hidden rounded-lg border border-black/[.08] dark:border-white/[.145] 
                 hover:shadow-md transition-shadow bg-background"
    >
      <div className="relative flex justify-center p-4 bg-black/[.02] dark:bg-white/[.02] h-48">
        {thumbnail ? (
          <Image
            src={thumbnail.replace('http:', 'https:')}
            alt={`Cover of ${title}`}
            width={100}
            height={150}
            className="h-full w-auto object-contain"
            priority
          />
        ) : (
          <div className="flex items-center justify-center h-full w-24 bg-black/[.05] dark:bg-white/[.05] text-center p-2 text-sm">
            No cover available
          </div>
        )}
      </div>
      
      <div className="flex flex-col flex-grow p-4">
        <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
        
        <div className="mt-1 text-sm text-foreground/70">
          {authors && authors.length > 0 ? (
            <p>{authors.join(', ')}</p>
          ) : (
            <p>Unknown Author</p>
          )}
          {publishYear && <p className="mt-1">{publishYear}</p>}
        </div>
        
        {truncatedDescription && (
          <p className="mt-3 text-sm line-clamp-3 text-foreground/80">
            {truncatedDescription}
          </p>
        )}
        
        <div className="mt-auto pt-3">
          <span className="text-xs px-2 py-1 rounded-full bg-black/[.05] dark:bg-white/[.05]">
            View details
          </span>
        </div>
      </div>
    </Link>
  );
}

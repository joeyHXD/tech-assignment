'use client';

import Image from 'next/image';
import Link from 'next/link';

/**
 * BookDetails component to display detailed information about a book
 * @param {Object} props - Component props
 * @param {Object} props.book - Book data
 */
export default function BookDetails({ book }) {
  if (!book) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Book not found</h2>
          <p className="mt-2 text-foreground/70">
            The book you are looking for does not exist or could not be loaded.
          </p>
          <Link 
            href="/"
            className="mt-4 inline-block px-4 py-2 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors"
          >
            Back to Search
          </Link>
        </div>
      </div>
    );
  }

  const {
    title,
    subtitle,
    authors,
    description,
    publishedDate,
    publisher,
    categories,
    pageCount,
    thumbnail,
    previewLink,
    infoLink,
  } = book;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <Link 
        href="/"
        className="inline-flex items-center text-sm mb-6 hover:underline"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-4 w-4 mr-1" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M10 19l-7-7m0 0l7-7m-7 7h18" 
          />
        </svg>
        Back to Search
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
        {/* Book Cover */}
        <div className="flex justify-center">
          <div className="relative h-[350px] w-[230px] bg-black/[.02] dark:bg-white/[.02] rounded-lg overflow-hidden shadow-md">
            {thumbnail ? (
              <Image
                src={thumbnail.replace('http:', 'https:')}
                alt={`Cover of ${title}`}
                fill
                className="object-contain"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-center p-4">
                No cover available
              </div>
            )}
          </div>
        </div>

        {/* Book Information */}
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          {subtitle && <h2 className="text-xl mt-1 text-foreground/80">{subtitle}</h2>}
          
          <div className="mt-4">
            {authors && authors.length > 0 && (
              <p className="text-lg">
                <span className="font-semibold">By:</span> {authors.join(', ')}
              </p>
            )}
            
            {publisher && (
              <p className="mt-1">
                <span className="font-semibold">Publisher:</span> {publisher}
                {publishedDate && ` (${publishedDate})`}
              </p>
            )}
            
            {categories && categories.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {categories.map((category, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 text-xs rounded-full bg-black/[.05] dark:bg-white/[.05]"
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}
            
            {pageCount > 0 && (
              <p className="mt-3 text-sm">
                <span className="font-semibold">Pages:</span> {pageCount}
              </p>
            )}
          </div>
          
          {description && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <div 
                className="text-foreground/80 prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
          )}
          
          <div className="mt-8 flex flex-wrap gap-4">
            {previewLink && (
              <a
                href={previewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors"
              >
                Preview Book
              </a>
            )}
            
            {infoLink && (
              <a
                href={infoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full border border-black/[.08] dark:border-white/[.145] hover:bg-black/[.05] dark:hover:bg-white/[.05] transition-colors"
              >
                More Information
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

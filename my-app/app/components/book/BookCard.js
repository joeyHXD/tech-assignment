"use client";

import Link from "next/link";
import Image from "next/image";

export default function BookCard({ book }) {
  if (!book || !book.volumeInfo) {
    return null;
  }

  const { id } = book;
  const { 
    title, 
    authors = [], 
    publishedDate,
    imageLinks = {}
  } = book.volumeInfo;

  return (
    <Link
      href={`/books/${id}`}
      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="p-4">
        <div className="flex justify-center mb-4">
          {imageLinks?.thumbnail ? (
            <div className="relative w-[128px] h-[192px]">
              <Image
                src={imageLinks.thumbnail.replace('http:', 'https:')}
                alt={title}
                fill
                className="object-contain rounded-md shadow-md"
              />
            </div>
          ) : (
            <div className="w-32 h-48 bg-gray-200 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
        </div>
        <h2 className="text-lg font-semibold mb-2 line-clamp-2">
          {title}
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          {authors?.join(", ") || "Unknown Author"}
        </p>
        <p className="text-xs text-gray-500">
          {publishedDate?.substring(0, 4) || "Unknown Year"}
        </p>
      </div>
    </Link>
  );
}

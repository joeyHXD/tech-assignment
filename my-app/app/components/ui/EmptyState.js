"use client";

export default function EmptyState({ message = "No results found. Try a different search term." }) {
  return (
    <div className="text-center text-gray-500 my-12">
      {message}
    </div>
  );
}

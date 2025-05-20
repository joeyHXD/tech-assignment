"use client";

export default function BookHeader({ title, authors = [] }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      
      {authors.length > 0 && (
        <p className="text-xl text-gray-700 mb-4">
          by {authors.join(", ")}
        </p>
      )}
    </div>
  );
}

"use client";

export default function SortSelector({ sortBy, onSortChange }) {
  return (
    <div className="flex items-center mb-4">
      <label className="text-sm text-gray-600 mr-2">Sort by:</label>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="p-2 border border-gray-300 rounded-md text-sm"
      >
        <option value="relevance">Relevance</option>
        <option value="newest">Newest</option>
        <option value="title">Title</option>
        <option value="author">Author</option>
      </select>
    </div>
  );
}

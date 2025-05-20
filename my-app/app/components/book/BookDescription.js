"use client";

export default function BookDescription({ description = "No description available" }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Description</h2>
      <div
        className="text-gray-700"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
}

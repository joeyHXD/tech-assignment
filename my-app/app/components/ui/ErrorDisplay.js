"use client";

export default function ErrorDisplay({ message }) {
  if (!message) return null;
  
  return (
    <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-100 text-red-700 rounded-md">
      {message}
    </div>
  );
}

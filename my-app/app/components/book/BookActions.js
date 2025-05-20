"use client";

export default function BookActions({ previewLink, infoLink }) {
  return (
    <div className="flex gap-4">
      {previewLink && (
        <a
          href={previewLink}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Preview
        </a>
      )}
      
      {infoLink && (
        <a
          href={infoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          More Info
        </a>
      )}
    </div>
  );
}

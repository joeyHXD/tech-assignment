"use client";

export default function BookMetadata({ 
  publishedDate,
  publisher,
  pageCount,
  language,
  categories = []
}) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {publishedDate && (
          <div>
            <span className="text-gray-500 text-sm">Published:</span>
            <p>{publishedDate}</p>
          </div>
        )}
        
        {publisher && (
          <div>
            <span className="text-gray-500 text-sm">Publisher:</span>
            <p>{publisher}</p>
          </div>
        )}
        
        {pageCount && (
          <div>
            <span className="text-gray-500 text-sm">Pages:</span>
            <p>{pageCount}</p>
          </div>
        )}
        
        {language && (
          <div>
            <span className="text-gray-500 text-sm">Language:</span>
            <p>{language.toUpperCase()}</p>
          </div>
        )}
      </div>

      {categories.length > 0 && (
        <div className="mb-6">
          <span className="text-gray-500 text-sm">Categories:</span>
          <div className="flex flex-wrap gap-2 mt-1">
            {categories.map((category, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-200 text-gray-800 text-xs rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

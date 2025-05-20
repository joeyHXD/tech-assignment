"use client";

export default function Pagination({ 
  currentPage, 
  totalItems, 
  itemsPerPage, 
  onPageChange,
  loading
}) {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  
  if (totalItems <= 0) {
    return null;
  }
  
  // Generate array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // If 5 or fewer pages, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else if (currentPage <= 3) {
      // If on pages 1-3, show pages 1-5
      for (let i = 1; i <= maxPagesToShow; i++) {
        pageNumbers.push(i);
      }
    } else if (currentPage >= totalPages - 2) {
      // If on last 3 pages, show last 5 pages
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Otherwise show current page and 2 pages on each side
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        pageNumbers.push(i);
      }
    }
    
    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center gap-2 my-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || loading}
        className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        Previous
      </button>
      
      <div className="flex gap-1">
        {getPageNumbers().map(pageNum => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            disabled={loading}
            className={`w-8 h-8 flex items-center justify-center rounded-md ${
              currentPage === pageNum
                ? "bg-blue-500 text-white"
                : "border border-gray-300 hover:bg-gray-100"
            }`}
            aria-label={`Page ${pageNum}`}
            aria-current={currentPage === pageNum ? "page" : undefined}
          >
            {pageNum}
          </button>
        ))}
      </div>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages || loading}
        className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        Next
      </button>
      
      <span className="ml-2 text-sm text-gray-500" aria-live="polite">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
}

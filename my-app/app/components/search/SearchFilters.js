"use client";

import { useState } from 'react';

export default function SearchFilters({ filters, onFilterChange }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    onFilterChange({
      printType: 'all',
      language: '',
      startYear: '',
      filter: ''
    });
  };

  return (
    <div className="max-w-2xl mx-auto mb-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center text-blue-500 hover:text-blue-700 mb-2 text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 mr-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        {isExpanded ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
      </button>

      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-md mb-4">
          {/* Print Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content Type
            </label>
            <select
              value={filters.printType}
              onChange={(e) => handleFilterChange('printType', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="all">All</option>
              <option value="books">Books</option>
              <option value="magazines">Magazines</option>
            </select>
          </div>
          
          {/* Language Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Language
            </label>
            <select
              value={filters.language}
              onChange={(e) => handleFilterChange('language', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Any</option>
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="es">Spanish</option>
              <option value="ja">Japanese</option>
              <option value="zh">Chinese</option>
            </select>
          </div>
          
          {/* Year Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Published After
            </label>
            <input
              type="number"
              min="1500"
              max={new Date().getFullYear()}
              value={filters.startYear}
              onChange={(e) => handleFilterChange('startYear', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Year"
            />
          </div>
          
          {/* Free/Paid Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Availability
            </label>
            <select
              value={filters.filter}
              onChange={(e) => handleFilterChange('filter', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">All</option>
              <option value="free-ebooks">Free eBooks</option>
              <option value="paid-ebooks">Paid eBooks</option>
              <option value="ebooks">All eBooks</option>
            </select>
          </div>
          
          {/* Reset Button */}
          <div className="col-span-1 md:col-span-2 flex justify-end">
            <button
              onClick={resetFilters}
              className="text-sm text-blue-500 hover:text-blue-700"
              type="button"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

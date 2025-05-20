/**
 * Google Books API utility functions
 */

const API_BASE_URL = 'https://www.googleapis.com/books/v1/volumes';
const CORS_PROXY = ''; // Leave empty for now, but can be used if needed

// Rate limiting configuration
const RATE_LIMIT = {
  minDelay: 1000, // Minimum delay between requests in ms
  maxRetries: 3,  // Maximum number of retries for 429 errors
  backoffFactor: 2 // Exponential backoff factor
};

// Track the last request time
let lastRequestTime = 0;

/**
 * Sleep for a specified duration
 * @param {number} ms - Time to sleep in milliseconds
 * @returns {Promise<void>}
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Make an API request with rate limiting and retry logic
 * @param {string} url - The URL to fetch
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} - The response data
 */
async function makeRateLimitedRequest(url, options = {}) {
  let retries = 0;
  let delay = RATE_LIMIT.minDelay;
  
  // Ensure minimum delay between requests
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < RATE_LIMIT.minDelay) {
    const waitTime = RATE_LIMIT.minDelay - timeSinceLastRequest;
    console.log(`Rate limiting: Waiting ${waitTime}ms before next request`);
    await sleep(waitTime);
  }
  
  while (true) {
    try {
      lastRequestTime = Date.now();
      const response = await fetch(url, options);
      
      console.log('Response status:', response.status);
      
      if (response.status === 429 && retries < RATE_LIMIT.maxRetries) {
        retries++;
        delay *= RATE_LIMIT.backoffFactor;
        console.warn(`Rate limit hit (429). Retrying in ${delay}ms... (Attempt ${retries}/${RATE_LIMIT.maxRetries})`);
        await sleep(delay);
        continue;
      }
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      if (error.message.includes('429') && retries < RATE_LIMIT.maxRetries) {
        retries++;
        delay *= RATE_LIMIT.backoffFactor;
        console.warn(`Rate limit hit (429). Retrying in ${delay}ms... (Attempt ${retries}/${RATE_LIMIT.maxRetries})`);
        await sleep(delay);
        continue;
      }
      throw error;
    }
  }
}

/**
 * Search for books using the Google Books API
 * @param {string} query - The search query
 * @param {number} maxResults - Maximum number of results to return (default: 10)
 * @param {number} startIndex - Starting index for pagination (default: 0)
 * @returns {Promise<Object>} - The search results
 */
export async function searchBooks(query, maxResults = 10, startIndex = 0) {
  if (!query) return { items: [], totalItems: 0 };
  
  try {
    console.log(`Searching for: ${query}`);
    
    // Construct the API URL
    const apiUrl = `${API_BASE_URL}?q=${encodeURIComponent(query)}&maxResults=${maxResults}&startIndex=${startIndex}`;
    const url = CORS_PROXY ? `${CORS_PROXY}${encodeURIComponent(apiUrl)}` : apiUrl;
    
    console.log('Fetching from URL:', url);
    
    const data = await makeRateLimitedRequest(url, {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    console.log('Search results:', data);
    
    // If no items are returned, provide an empty array
    if (!data.items) {
      console.warn('No items in response, returning empty array');
      data.items = [];
    }
    
    return data;
  } catch (error) {
    console.error('Error searching books:', error);
    throw error;
  }
}

/**
 * Get book details by ID
 * @param {string} id - The book ID
 * @returns {Promise<Object>} - The book details
 */
export async function getBookById(id) {
  if (!id) throw new Error('Book ID is required');
  
  try {
    console.log(`Fetching book with ID: ${id}`);
    
    // Construct the API URL
    const apiUrl = `${API_BASE_URL}/${id}`;
    const url = CORS_PROXY ? `${CORS_PROXY}${encodeURIComponent(apiUrl)}` : apiUrl;
    
    console.log('Fetching from URL:', url);
    
    const data = await makeRateLimitedRequest(url, {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    console.log('Book details response:', data);
    return data;
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw error;
  }
}

/**
 * Format book data for consistent use in components
 * @param {Object} book - The book data from the API
 * @returns {Object} - Formatted book data
 */
export function formatBookData(book) {
  if (!book || !book.volumeInfo) {
    return null;
  }
  
  const { volumeInfo, id } = book;
  
  return {
    id,
    title: volumeInfo.title || 'Unknown Title',
    subtitle: volumeInfo.subtitle || '',
    authors: volumeInfo.authors || ['Unknown Author'],
    description: volumeInfo.description || 'No description available',
    publishedDate: volumeInfo.publishedDate || 'Unknown',
    publisher: volumeInfo.publisher || 'Unknown Publisher',
    categories: volumeInfo.categories || [],
    pageCount: volumeInfo.pageCount || 0,
    language: volumeInfo.language || 'en',
    thumbnail: volumeInfo.imageLinks?.thumbnail || null,
    smallThumbnail: volumeInfo.imageLinks?.smallThumbnail || null,
    previewLink: volumeInfo.previewLink || null,
    infoLink: volumeInfo.infoLink || null,
  };
}

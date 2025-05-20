# Google Books Search Application

A Next.js web application that utilizes the Google Books API to search for books and display detailed information.

## Features

- **Search Functionality**: Enter keywords in a search bar to find relevant books
- **Search Results**: View a clear and concise list of search results
- **Book Details**: Click on a book to see detailed information including title, author(s), description, and cover
- **Responsive Design**: Clean, user-friendly interface that works across different screen sizes

## Technologies Used

- **Next.js 15**: Using the App Router for routing and server components
- **React 19**: For building the user interface
- **TailwindCSS 4**: For styling and responsive design
- **Google Books API**: For fetching book data

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone the repository or download the source code
2. Navigate to the project directory:
   ```bash
   cd my-app
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
2. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/app`: Contains the main application pages and layouts
  - `/page.js`: Home page with search functionality
  - `/books/[id]/page.js`: Dynamic route for book details
- `/components`: Reusable React components
  - `SearchBar.js`: Search input component
  - `BookList.js`: Displays search results
  - `BookCard.js`: Individual book card component
  - `BookDetails.js`: Detailed book information component
  - `Loading.js`: Loading state component
  - `Error.js`: Error handling component
- `/lib`: Utility functions
  - `api.js`: API utility functions for Google Books API

## API Integration

The application uses the Google Books API to search for books and retrieve detailed information. The API endpoints used are:

- Search: `https://www.googleapis.com/books/v1/volumes?q={searchTerms}`
- Book details: `https://www.googleapis.com/books/v1/volumes/{volumeId}`

## Deployment

This application can be deployed to any platform that supports Next.js applications, such as Vercel, Netlify, or AWS.

## License

This project is open source and available under the [MIT License](LICENSE).

import React, { useState, useEffect, useRef } from "react";
import "./App.css";

export default function App(){
  const inputRef = useRef();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    if (!title && !author && !publisher && !year) {
      setError("Please enter at least one search field (title, author, publisher, or year).");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      let url = "https://openlibrary.org/search.json?";
      if (title) url += `title=${encodeURIComponent(title)}&`;
      if (author) url += `author=${encodeURIComponent(author)}&`;
      if (publisher) url += `publisher=${encodeURIComponent(publisher)}&`;
      if (year) url += `first_publish_year=${encodeURIComponent(year)}&`;

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Network error: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();

      if (!data.docs || data.docs.length === 0) {
        setError("No books found. Try adjusting your search criteria.");
        setBooks([]);
        return;
      }
      setBooks(data.docs);
    } catch (err) {
      setError(`Failed to fetch books. ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if(e.key === "Enter") fetchBooks();
  }

  return (
    <div className="app-root">
      <header className="app-header">
        <h1 className="brand">📚 Book Finder</h1>
        <p className="tag">Get Your Favourites Instantly..</p>
      </header>

      <div className="container">
        <div className="search-area">
          <div className="search-box multi-search">
            <input
              className="search-input"
              placeholder="Title"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              onKeyDown={onKeyDown}
              aria-label="Search books by title"
            />
            <input
              className="search-input"
              placeholder="Author"
              value={author}
              onChange={(e)=>setAuthor(e.target.value)}
              onKeyDown={onKeyDown}
              aria-label="Search books by author"
            />
            <input
              className="search-input"
              placeholder="Publisher"
              value={publisher}
              onChange={(e)=>setPublisher(e.target.value)}
              onKeyDown={onKeyDown}
              aria-label="Search books by publisher"
            />
            <input
              className="search-input"
              placeholder="Year"
              value={year}
              onChange={(e)=>setYear(e.target.value)}
              onKeyDown={onKeyDown}
              aria-label="Search books by year"
            />
            <button className="page-btn" onClick={fetchBooks}>Search</button>
          </div>
        </div>

        {loading && <p className="status">Loading...</p>}
        {error && <p className="status status-error">{error}</p>}

        <div className="results">
          <div className="grid">
            {books.map((b, idx) => (
              <div className="card" key={idx}>
                {b.cover_i ? (
                  <img 
                    className="card-cover" 
                    src={`https://covers.openlibrary.org/b/id/${b.cover_i}-L.jpg`} 
                    alt={b.title} />
                ) : (
                  <div className="card-cover" />
                )}
                <div className="card-body">
                  <h3 className="card-title">{b.title}</h3>
                  {b.author_name && <p className="card-authors">{b.author_name.join(", ")}</p>}
                  {b.first_publish_year && <p className="card-year">First published: {b.first_publish_year}</p>}
                </div>
                <div className="card-footer">
                  <a 
                    href={`https://openlibrary.org${b.key}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="card-link"
                  >
                    View on Open Library
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="footer">Made with ❤️ for Bibilophiles.</footer>
    </div>
  );
}

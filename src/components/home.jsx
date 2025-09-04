import React, { useState } from "react";
import "../app.css";

export default function HomePage({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim() !== "") {
      onSearch(query);
    }
  };

  return (
    <div className="home-container">
      <div className="overlay">
        <h1 className="home-title">📚 Welcome to Book Finder</h1>
        <p className="home-subtitle">
          Find your favorite books by title in seconds!
        </p>

        <div className="home-search-bar">
          <input
            type="text"
            placeholder="Search for books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="home-input"
          />
          <button onClick={handleSearch} className="home-button">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

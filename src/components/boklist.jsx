import React from "react";
import BookCard from "./BookCard";

export default function BookList({ books }) {
  if (!books.length) {
    return <p className="no-results">🔍 Try searching for a book above!</p>;
  }

  return (
    <div className="book-list">
      {books.map((book, index) => (
        <BookCard key={index} book={book} />
      ))}
    </div>
  );
}

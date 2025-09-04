import React from 'react'


export default function BookCard({ book }) {
const coverId = book.cover_i
const coverUrl = coverId
? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450"><rect width="100%" height="100%" fill="%23eee"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-size="18">No Cover</text></svg>'


const title = book.title || 'Untitled'
const authors = book.author_name ? book.author_name.join(', ') : 'Unknown Author'
const year = book.first_publish_year || 'N/A'


return (
<article className="card">
<img src={coverUrl} alt={`${title} cover`} className="card-cover" />
<div className="card-body">
<h3 className="card-title" title={title}>{title}</h3>
<p className="card-authors">{authors}</p>
<p className="card-year">First published: {year}</p>
<div className="card-footer">
<a
className="card-link"
href={`https://openlibrary.org${book.key}`}
target="_blank"
rel="noreferrer"
>
View on Open Library
</a>
</div>
</div>
</article>
)
}
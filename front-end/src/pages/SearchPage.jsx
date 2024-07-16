import React, { useState } from 'react';
import SearchBar from '../components/books/SearchBar';
import BookList from '../components/books/BookList';

function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = function(results) {
    setSearchResults(results);
  };

  return (
    <div className='text-center'>
      <h1 className='mb-4'>Buscar Libros</h1>
      <SearchBar onSearchResults={handleSearchResults} />
      <BookList books={searchResults} />
    </div>
  );
}

export default SearchPage;

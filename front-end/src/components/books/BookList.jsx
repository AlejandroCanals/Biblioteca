import React from 'react';
import Book from './Book'; 

const BookList = ({ books }) => {
  return (
    <div className="container mt-4">
      
      {books.length > 0 && ( // Verifica si hay libros en el array
        <h2 className='mb-4'>Resultados de la Búsqueda</h2>
      )}
      <div className="row">
        {books.map(book => (
          <div key={book.id} className="col-md-4 mb-4">
            <Book book={book}  />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
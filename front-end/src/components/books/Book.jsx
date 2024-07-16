import React from 'react';
import PropTypes from 'prop-types';

const Book = ({ book }) => {
  return (
    <div className="card mt-2" style={{backgroundColor:'beige', border:'none'}}>
      <img
        src={book.imagen}
        className="card-img-top img-fluid mx-auto"
        alt={`Portada de ${book.titulo}`}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "ruta/de/imagen/alternativa.jpg";
        }}
        style={{ width:'200px' ,height: '300px' }}
      
      />
      <div className="card-body">
        <h5 className="card-title">{book.titulo}</h5>
        <p className="card-text">{book.autor}</p>
      </div>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number.isRequired,
    imagen: PropTypes.string.isRequired,
    titulo: PropTypes.string.isRequired,
    autor: PropTypes.string.isRequired,
  }).isRequired,
};

export default Book;

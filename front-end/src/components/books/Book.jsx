import React from 'react';
import PropTypes from 'prop-types';
import heart from '../../assets/heart.svg'

const Book = ({ book }) => {
  return (
    <div className="card mt-2" style={{backgroundColor:'beige', border:'none'}}>
      <img
        src={book.imagen_portada}
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
        <img src={heart} alt="Heart Icon" style={{ width: '20px', height: '20px' }} /> {/* Icono de corazón */}
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

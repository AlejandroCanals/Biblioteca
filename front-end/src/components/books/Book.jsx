import React from 'react';
import PropTypes from 'prop-types';
import heart from '../../assets/heart.svg'
import { handleAddToFavorites } from '../api';
import { useState } from 'react';
const Book = ({ book , showImage= true}) => {

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    handleAddToFavorites(book);
    
    // Restablecer el estado después de un tiempo si quieres que el efecto desaparezca
    setTimeout(() => setClicked(false), 1000); // Efecto visible por 1 segundo
  };
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
        {showImage && <img src={heart} alt="Heart Icon" style={{
              width: '20px',
              height: '20px',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              transform: clicked ? 'scale(1.2)' : 'scale(1)', // Ejemplo de escala para el efecto
            }} onClick={handleClick} /> }
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
    google_id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Book;

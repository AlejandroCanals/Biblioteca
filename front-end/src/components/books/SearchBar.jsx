import React, { useState } from 'react';
import { buscarLibro } from '../api'; // Importa la función de búsqueda desde api.js

const SearchBar = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const maxResults = 2
      const data = await buscarLibro(searchTerm,maxResults); // Utiliza la función de búsqueda de api.js
      onSearchResults(data); // Pasar los resultados al componente padre
    } catch (error) {
      console.error('Error al buscar libros:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Buscar libros por título..."
        value={searchTerm}
        onChange={handleChange}
      />
      <button type="submit">Buscar</button>
    </form>
  );
};

export default SearchBar;

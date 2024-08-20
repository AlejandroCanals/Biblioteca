import React from 'react';
import FavoriteBooks from '../components/books/FavoriteBooks'
;

const FavoritePage = () => {
  return (
    <div className='text-center'>
      <h1>Libros Favoritos</h1>
      <FavoriteBooks/>
    </div>
  );
};

export default FavoritePage;

import React,{useEffect, useState , useContext} from 'react';
import { buscarFavoritos } from '../api';
import Book from './Book';
import { handleDeleteFavorites } from '../api';
import x from '../../assets/x.png'

const FavoriteBooks = () => {
    const [favoritos, setFavoritos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleClick = async (id) => {
        try {
            // Aquí asegúrate de que `favorito` contiene todos los datos necesarios para eliminarlo
            await handleDeleteFavorites(id);
            // Actualiza el estado eliminando el libro que coincide con el ID del favorito
            setFavoritos(favoritos.filter(favorito => favorito.id !== id));
        } catch (error) {
            console.error('Error al eliminar de favoritos:', error);
        }
    };
    
    useEffect(() => {
        const fetchFavoritos = async () => {
            try {
                const data = await buscarFavoritos();
                setFavoritos(data);
            } catch (error) {
                console.error('Error al obtener favoritos:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchFavoritos();
    }, []);  // Dependencias vacías, se ejecuta al montar el componente

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;


    return (
      <div className="container mt-4">
          {favoritos.length > 0 ? (
              <span></span>
          ) : (
              <p>No tienes libros en tus favoritos.</p>
          )}
          <div className="row">
              {favoritos.map(favorito => (
                  <div key={favorito.id} className="col-md-4 mb-4">
                      {/* Aquí reutilizas el componente Book */}
                      <Book book={favorito.libro} showImage={false} />
                      <img  src={x} alt="X Icon" style={{ width: '40px', height: '4 0px' } } onClick={() => handleClick(favorito.id)}/>
                  </div>
              ))}
          </div>
      </div>
  );    
};
export default FavoriteBooks;
    
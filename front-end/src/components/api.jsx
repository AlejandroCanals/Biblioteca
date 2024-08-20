// api.js
import axios from 'axios';
import authService from './auth/authService';
const BASE_URL = 'http://127.0.0.1:8000/api/';

export const buscarLibro = async (searchTerm) => {
  try {
    const response = await fetch(`${BASE_URL}libros/${searchTerm}/`);
    if (!response.ok) {
      throw new Error('Error al obtener los datos');
    }
    return await response.json();
  } catch (error) {
    console.error('Error al buscar el libro:', error);
    throw error;
  }

};



// Función para obtener los libros favoritos del usuario
export const buscarFavoritos = async () => {
  try {
    const user = authService.getCurrentUser();  // Obtener el usuario actual
    if (!user || !user.accessToken) {
      throw new Error('Token de autenticación no disponible');
    }

    const response = await axios.get(`${BASE_URL}favoritos/`, {
      headers: {
        'Authorization': `Bearer ${user.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error al obtener los libros favoritos:', error);
    throw error;
  }
};

export const handleAddToFavorites = async (book) => {
  const user = authService.getCurrentUser();

  if (!user || !user.accessToken) {
    console.error('No se encontró el token de autenticación.');
    return;
  }
  try {
    const response = await axios.post(`http://localhost:8000/api/favoritos/`, 
      { google_id: book.google_id }, // Enviar el google_id en el cuerpo
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.accessToken}`, 
        },
        
      }
    );

    console.log(response.data.message); // Mensaje de éxito
  } catch (error) {
    console.error('Error al agregar a favoritos:', error.response?.data?.error || error.message);
  }
};


export const handleDeleteFavorites = async(id) => {
  const user = authService.getCurrentUser();
  if (!user || !user.accessToken) {
    console.error('No se encontró el token de autenticación.');
    return;
  }

  try {
    const response = await axios.delete('http://localhost:8000/api/favoritos/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.accessToken}`,
      },
      data: { id: id },  // Pasar el ID en el cuerpo de la solicitud DELETE
    });

    console.log(response.data.message);
  } catch (error) {
    console.error('Error al eliminar de favoritos:', error.response?.data?.error || error.message);
  }
};
// api.js

const BASE_URL = 'http://127.0.0.1:8000/api/libros';

export const buscarLibro = async (searchTerm) => {
  try {
    const response = await fetch(`${BASE_URL}/${searchTerm}/`);
    if (!response.ok) {
      throw new Error('Error al obtener los datos');
    }
    return await response.json();
  } catch (error) {
    console.error('Error al buscar el libro:', error);
    throw error;
  }
};

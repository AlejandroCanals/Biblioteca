import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const Libro = ({ libro }) => {

  const limitarPalabras = (texto, palabrasLimit) => {
    const palabras = texto.split(' ');
    if (palabras.length > palabrasLimit) {
      return palabras.slice(0, palabrasLimit).join(' ') + '...';
    }
    return texto;
  };

  return (
    <Paper elevation={3} style={{ borderRadius: '5px', height: '300px', width: '200px', backgroundColor: 'white' }}>
      <Typography variant="h6" gutterBottom style={{ maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {limitarPalabras(libro.titulo, 5)}
      </Typography>
      <Typography variant="body1" gutterBottom style={{ maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        Autor: {limitarPalabras(libro.autor.join(', '), 3)}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Fecha de publicación: {libro.fecha_publicacion}
      </Typography>
      {libro.imagen && <img src={libro.imagen} alt={libro.titulo} style={{ maxWidth: '100%', borderRadius: '5px', marginTop: '2rem', maxHeight: '150px' }} />}
    </Paper>
  );
};

export default Libro;

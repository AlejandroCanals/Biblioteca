import React from 'react';
import Grid from '@mui/material/Grid';
import Libro from './Libro'; // Importa el componente Libro

const Container = ({ searchResults }) => {
  return (
    <Grid container spacing={3} columnGap={4} style={{ maxWidth: '1200px', margin: '0 auto'}}>
      {searchResults.map((libro, index) => (
        <Grid item xs={6} sm={3} md={3} lg={2} key={index}>
          <Libro libro={libro} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Container;

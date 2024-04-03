import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { buscarLibro } from './api'; // Importa la función de búsqueda desde api.js
import Container from './Container'; // Importa el componente Container

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '50%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  },
}));

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };


  const handleSubmit = async event => {
    if (event.key === 'Enter') { // Realiza la búsqueda solo si se presiona la tecla "Enter"
      try {
        const data = await buscarLibro(searchTerm); // Utiliza la función de búsqueda de api.js
        setSearchResults(data);
      } catch (error) {
        console.error('Error al buscar el libro:', error);
      }
    }
  };

 

  return (
    <div> {/* Envuelve todos los elementos JSX en un único elemento padre */}
      <AppBar position="static">
        <Toolbar>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm}
              onChange={handleChange}
              onKeyDown={handleSubmit} // Realiza la búsqueda al presionar "Enter"
            />
          </Search>
        </Toolbar>
      </AppBar>
      <Container searchResults={searchResults} /> {/* Pasa los resultados de la búsqueda al componente Container */}
    </div>
  );
};

export default SearchBar;

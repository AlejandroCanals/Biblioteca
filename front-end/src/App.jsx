
import './App.css'
import Searchbar1 from './components/Searchbar1';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import Container from './components/Container';


function App() {

  return (
    <Router>
      <div className="App">
        <Searchbar1/>
 

      </div>
    </Router>
  )
}

export default App

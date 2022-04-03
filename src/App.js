import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// Pages
import Homepage from './pages/Homepage';
import PokemonPage from './pages/PokemonPage';
import MyPokemonPage from './pages/MyPokemonPage';

// Components
import Header from './components/Header';

const App = () => {
  return (
    <Router>
      <Header/>
      <Container>
        <Route exact path='/' component={Homepage} />
        <Route path='/pokemon/:id' component={PokemonPage}/>
        <Route exact path='/myPokemon' component={MyPokemonPage} />
      </Container>
    </Router>
  );
}

export default App;

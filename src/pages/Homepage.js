import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";

// Components
import Pokemon from "../components/Pokemon";
import Loader from "../components/Loader";

const Homepage = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPokemonList = async () => {
    let pokemonArray = [];
    for (let i = 1; i <= 151; i++) {
      pokemonArray.push(await getPokemonData(i));
    }
    console.log(pokemonArray);
    setPokemon(pokemonArray);
    setLoading(false);
  };

  const getPokemonData = async (id) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return res;
  };

  useEffect(() => {
    getPokemonList();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Row>
          {pokemon.map((p) => (
            <Col key={p.data.name} xs={6} sm={6} md={3} lg={3} xl={3}>
              <Pokemon pokemon={p.data} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default Homepage;

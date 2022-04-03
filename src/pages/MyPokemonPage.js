import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";

// Components
import MyPokemon from "../components/MyPokemon";
import Loader from "../components/Loader";

const MyPokemonPage = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPokemonList = async () => {
    let pokemonArray = [];
    var myPokemon = JSON.parse(window.localStorage.getItem("myPokemon"));
    if(myPokemon!=null){
      for (let i = 0; i < myPokemon.length; i++) {
        const pokemonData = {
          name: myPokemon[i].name,
          data: await getPokemonData(myPokemon[i].id)
        }
        pokemonArray.push(pokemonData);
      }
      setPokemon(pokemonArray);
      setLoading(false);
    }
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
            <Col key={p.name} xs={6} sm={6} md={4} lg={4} xl={4}>
              <MyPokemon pokemon={p} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default MyPokemonPage;

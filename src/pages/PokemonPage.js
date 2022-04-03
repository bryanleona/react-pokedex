import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

// Components
import Loader from "../components/Loader";

const PokemonPage = ({ match }) => {
  const [pokemonDetails, setPokemonDetails] = useState();
  const [loading, setLoading] = useState(true);

  const id = match.params.id;

  const getPokemon = async (id) => {
    const details = await getPokemonData(id);
    setPokemonDetails(details.data);
    // console.log(details.data);
    setLoading(false);
  };

  const getPokemonData = async (id) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return res;
  };

  useEffect(() => {
    getPokemon(id);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Card className={`my-3 rounded text-center shadow p-3`}>
          <Link to={`/pokemon/${pokemonDetails.id}`}>
            <Card.Img
              style={{ height: "15rem" }}
              src={pokemonDetails.sprites.other.dream_world.front_default}
              variant="top"
            />
          </Link>
          <Card.Body className={`${pokemonDetails.types[0].type.name} rounded`}>
            <Link to={`/pokemon/${pokemonDetails.name}`} className="link-name">
              <Card.Title as="div">
                <Row>
                  <Col>
                    <strong>
                      #{pokemonDetails.id}{" "}
                      {pokemonDetails.name.charAt(0).toUpperCase() +
                        pokemonDetails.name.slice(1)}
                    </strong>
                  </Col>
                  <Col>
                    <button
                      className="btn btn-info"
                      onClick={() => {
                        var isGotcha = Math.round(Math.random());
                        // var isGotcha = 1;
                        if (isGotcha == 1) {
                          const pokemonName = prompt(
                            "You caught " +
                              `${
                                pokemonDetails.name.charAt(0).toUpperCase() +
                                pokemonDetails.name.slice(1)
                              }` +
                              ", What is your Pokemon name ?"
                          );
                          var newPokemon = {
                            id: pokemonDetails.id,
                            name: pokemonName,
                          };
                          console.log(newPokemon);
                          if (
                            JSON.parse(
                              window.localStorage.getItem("myPokemon")
                            ) != null
                          ) {
                            var myPokemon = JSON.parse(
                              window.localStorage.getItem("myPokemon")
                            );
                            myPokemon.push(newPokemon);
                            myPokemon = JSON.stringify(myPokemon);
                            window.localStorage.setItem("myPokemon", myPokemon);
                          } else {
                            var myPokemon = [newPokemon];
                            window.localStorage.setItem(
                              "myPokemon",
                              JSON.stringify(myPokemon)
                            );
                          }
                        } else {
                          alert(
                            `${
                              pokemonDetails.name.charAt(0).toUpperCase() +
                              pokemonDetails.name.slice(1)
                            }` + " has fled, you may try again !"
                          );
                        }
                      }}
                    >
                      <b>Catch !</b>
                    </button>
                  </Col>
                </Row>
              </Card.Title>
            </Link>
            <Card.Text>
              <strong className="py-3 text-white">Type</strong>
              <br />
              {pokemonDetails.types.map((t) => (
                <small className="text-white" key={t.type.name}>
                  {t.type.name.toUpperCase()}{" "}
                </small>
              ))}
              <br />
              <strong className="py-3 text-white">Abilities</strong>
              <br />
              {pokemonDetails.abilities.map((a) => (
                <small className="text-white" key={a.ability.name}>
                  {a.ability.name.toUpperCase()}{" "}
                </small>
              ))}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default PokemonPage;

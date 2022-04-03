import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const pokemon = ({ pokemon }) => {
  return (
    <>
      <Card className="my-3 p-3 rounded text-center shadow mb-5 bg-white rounded">
        <Link to={`/pokemon/${pokemon.data.data.id}`}>
          <Card.Img
            style={{ height: "8rem" }}
            src={pokemon.data.data.sprites.other.dream_world.front_default}
            variant="top"
          />
        </Link>
        <Card.Body
          className={`${pokemon.data.data.types[0].type.name} rounded text-white`}
        >
          <Link to={`/pokemon/${pokemon.data.data.name}`} className="link-name">
            <Card.Title as="div">
              <strong>
                #{pokemon.data.data.id}{" "}
                {pokemon.data.data.name.charAt(0).toUpperCase() +
                  pokemon.data.data.name.slice(1)}
              </strong>
              <br />
              <small>Name : {pokemon.name}</small>
            </Card.Title>
          </Link>
          <button
            className="btn btn-warning"
            // onClick={() => console.log(JSON.parse(window.localStorage.getItem('myPokemon'))[1])}
            onClick={() => {
              const release =
                "{\"id\":" + pokemon.data.data.id + ",\"name\":\"" + pokemon.name + "\"}";
              console.log(release);
              var localPokemon = window.localStorage.getItem("myPokemon");
              var deletedLocalPokemon = localPokemon.replace(release+",","");
              if (deletedLocalPokemon == localPokemon) deletedLocalPokemon = localPokemon.replace(","+release,"");
              if (deletedLocalPokemon == localPokemon) deletedLocalPokemon = localPokemon.replace(release,"");
              console.log(deletedLocalPokemon);
            window.localStorage.setItem("myPokemon", deletedLocalPokemon);
            window.location.reload(false);
            }}
          >
            Release Pokemon
          </button>
        </Card.Body>
      </Card>
    </>
  );
};

export default pokemon;

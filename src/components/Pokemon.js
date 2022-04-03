import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const pokemon = ({ pokemon }) => {
  return (
    <>
      <Card
        className="my-1 p-1 rounded text-center shadow mb-1 bg-white rounded"
      >
        <Link to={`/pokemon/${pokemon.id}`}>
          <Card.Img
            style={{ height: "8rem" }}
            src={pokemon.sprites.other.dream_world.front_default}
            variant="top"
          />
        </Link>
        <Card.Body
          className={`${pokemon.types[0].type.name} rounded text-white`}
        >
          <Link to={`/pokemon/${pokemon.name}`} className="link-name">
            <Card.Title as="div">
              <strong>
                #{pokemon.id}{" "}
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </strong>
            </Card.Title>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
};

export default pokemon;

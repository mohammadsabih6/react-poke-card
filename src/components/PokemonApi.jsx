import React, { useEffect, useState } from 'react';

function PokemonApi() {
  const [data, setData] = useState([]);
  const [forward, setForward] = useState();
  const [back, setBack] = useState();
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
  const [pokemon, setPokemon] = useState([]);
  const fetchData = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setForward(data.next);
        setBack(data.previous);
        setData(data.results);
        setPokemon({
          species: data.species.name,
          img: data.sprites.front_default,
          hp: data.stats[0].base_stat,
          attack: data.stats[1].base_stat,
          defense: data.stats[2].base_stat,
          type: data.types[0].type.name,
        });
      });
  };
  useEffect(() => {
    fetchData(url);
  }, [url]);
  const handleClick = (pok_Url) => {
    setUrl(pok_Url);
  };
  return (
    <div>
      {data &&
        data.map((pokemon) => {
          const id = pokemon.url.split('/')[6];
          const pok_Url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
          return (
            <div
              key={id}
              style={{ marginLeft: '40px', fontSize: '18px' }}
              onClick={() => {
                handleClick(pok_Url);
              }}
            >
              <h2>{pokemon.name} </h2>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                alt=""
              />
            </div>
          );
        })}
      <div>
        {back && (
          <button onClick={() => {setUrl(back);}}>
            Back
          </button>
        )}
        {forward && (
          <button onClick={() => { setUrl(forward);}}>
            Forward
          </button>
        )}
      </div>
      {pokemon.species && (
        <div>
          <h2>{pokemon.species}</h2>
          <img src={pokemon.img} alt="" />
          <p>HP: {pokemon.hp}</p>
          <p>Attack: {pokemon.attack}</p>
          <p>Defense: {pokemon.defense}</p>
          <p>Type: {pokemon.type}</p>
        </div>
      )}
    </div>
  );
}
export default PokemonApi;
import React, { useEffect, useState } from 'react';
import left from '../components/left.png';
import right from '../components/right.png';

function PokemonApi() {
  const [data, setData] = useState([]);
  const [forward, setForward] = useState();
  const [back, setBack] = useState();
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
  const [pokemon, setPokemon] = useState([]);

  // FetchData fetch the data from the PokemonApi....
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
      {/* This section is display the retrive data  */}
      {data &&
        data.map((pokemon) => {
          const id = pokemon.url.split('/')[6];
          const pok_Url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
          return (
            <div className="card mb-3 justify-content-center"
              key={id}
              style={{ marginTop: "20px",marginLeft: '40px', fontSize: '18px',maxWidth: "540px" ,backgroundColor:"#f8ff36"}}
              onClick={() => {
                handleClick(pok_Url);
              }}
            >
              <div className="row g-0">
              <div class="col-md-4">
              <h2 style={{color:"black"}}>{pokemon.name} </h2>
              </div>
              <div class="col-md-8">
              <div class="card-body">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                alt=""
              />
              </div>
              </div>
              </div>
            </div>
          );
        })}
      <div style={{textAlign:"center",  paddingTop: "40px",marginBottom:"10px"  }}>
        {back && (
          <button onClick={() => {setUrl(back);}} style={{backgroundColor:"black"}}>
            <img src={left} style={{backgroundColor:"black", width:"50px"}}></img>
          </button>
        )}
        {forward && (
          <button onClick={() => { setUrl(forward);}} style={{backgroundColor:"black"}}>
          <img src={right} style={{backgroundColor:"black", width:"50px"}}/>
          </button>
        )}
      </div>

      {/* This is for displaying the info of specific pokemon when we click the specific pokemon */}
      {pokemon.species && (
      <div className="col d-flex justify-content-center">
      <div className="card" style={{width: "18rem",marginTop:"10px",marginBottom:"50px"}}>
      <img className="card-img-top" src={pokemon.img} alt="pokemon character"/>
      <div class="card-body" style={{backgroundColor:"#eded68"}}>
      <h5 class="card-title" style={{fontSize:"30px",textAlign:"center"}}>{pokemon.species}</h5>
      <p style={{fontSize:"20px"}}><b>HP:</b> {pokemon.hp}</p>
      <p  style={{fontSize:"20px"}}><b>Attack:</b> {pokemon.attack}</p>
      <p  style={{fontSize:"20px"}}><b>Defense: </b>{pokemon.defense}</p>
      <p  style={{fontSize:"20px"}}><b>Type:</b> {pokemon.type}</p>
    </div>
    </div>
    </div>
      )}
    </div>
  );
}
export default PokemonApi;
import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
// import Bulbasaur from './assets/svg/1.svg';


//quesitons for Ben
//1. how to dynamically import the photos
//2. difference between setting function to return promise vs not 
//3. 
const BACKGROUND = 'https://external-preview.redd.it/e5zoQw-hgw-LCjdhC_4G8IAcHxex5pzda_BD_FPTcBY.png?auto=webp&s=c0b96b5ec20010a15864b8a0c9b202c119e52fe8';
const END_POINT = 'https://pokeapi.co/api/v2/';

function App() {
  let [answer, setAnswer] = useState("");
  let [currentPokemon, setCurrentPokemon] = useState(null);
  let [showPokemon, setShowPokemon] = useState(false);
  let [score, setScore] = useState(0);

  const getRandomValue = () => {
    return Math.floor(Math.random() * 649) + 1
  }

  // const pokemonDetails = () => {
  //   fetch(`${END_POINT}pokemon/${getRandomValue()}`)
  //     .then(details => {
  //       details.json()
  //         .then(data => console.log(data["name"], data))
  //   })
  //   .catch(err =>
  //     console.log(err))
  // } 

  const getPokemon = async () => {
    const pokeResults = await fetch(`${END_POINT}pokemon/${getRandomValue()}`)
    const data = await pokeResults.json()
    return data
  } 

  const getPokemon2 = () => {
    return new Promise((resolve, reject) => {
      const pokeResults = fetch(`${END_POINT}pokemon/${getRandomValue()}`)
        .then((pokemon => {
          pokemon.json()
        }))
        .then(data => {
          if (data) {
            resolve(data)
          } else {
            reject('Unable to retrieve Pokemon')
          }
        })
    })
  }

  useEffect(() => {

    const setPokemon = async () => {
      try {
        const pokeResults = await fetch(`${END_POINT}pokemon/${getRandomValue()}`);
        const data = await pokeResults.json();
        setCurrentPokemon(data)
        console.log(data)
      } catch(e) {
        console.log(e);
      }
    }
      setPokemon()
  }, [])

  // // const getPokemon = async (pokemonId) => {
  // //   let randomPokemon = await import(`./assets/svg/${pokemonId}.svg`)
  // //   setPokemon(randomPokemon)
  // // }

  // let loadImage = imageName => {
  //   import(`./assets/svg/1.svg`).then(image => {
  //     this.setState({
  //       image: image
  //     });
  //   });
  // };

  // loadImage();
  //  getPokemon(1)

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  const handleChange = (e) => {
    setAnswer(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('You have submitted');
  }

  const checkAnswer = async () => {
    if (answer === currentPokemon.name) {
      setScore(score += 1)
    } else {
      console.log('wrong!')
      //trigger some x sign?
    }
    //show pokemon - set show to true
    setAnswer('');
    revealPokemon();
    const pokemon = await getPokemon()
    setCurrentPokemon(pokemon)
  }

  const revealPokemon = async () => {
    setShowPokemon(true);
    await sleep(2000);
    setShowPokemon(false);
  }

  //This works, but this loads all files up at compile. Not efficient
  const images = require.context('./assets/svg', true);
  let pokemon = images('./4.svg');
  console.log(showPokemon)
  return (
    <div className="app">
      <span>Current Pokemon is: {currentPokemon ? currentPokemon.name : null}</span>
      <div className="app_gameScreen">
        <img src={BACKGROUND} alt="" className="app_background"/>      
        <img src={pokemon} alt="" className={"app_pokemon" + (showPokemon ? "" : " is-dark")}/>
      </div>
      <label>
          Name:
          <input type="text" value={answer} onChange={handleChange} />
        </label>
        <button onClick={() => checkAnswer()}>Submit</button>
        <button onClick={() => console.log('Skip')}>Skip</button>
        {score}    
     </div>
  );
}

export default App;

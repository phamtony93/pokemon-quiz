import React, { useState, useEffect } from "react";
import "./App.css";
import StartScreen from "./components/StartScreen";
// import Bulbasaur from './assets/svg/1.svg';

//quesitons for Ben
//1. how to dynamically import the photos
//2. difference between setting function to return promise vs not
//3.
const status = {
  INPROGRESS: "inprogress",
  START: "start",
  END: "end",
};

const BACKGROUND =
  "https://external-preview.redd.it/e5zoQw-hgw-LCjdhC_4G8IAcHxex5pzda_BD_FPTcBY.png?auto=webp&s=c0b96b5ec20010a15864b8a0c9b202c119e52fe8";
const END_POINT = "https://pokeapi.co/api/v2/";
const LOADING_IMAGE = "./assets/loading-image.jpg";
function App() {
  const [answer, setAnswer] = useState("");
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [showPokemon, setShowPokemon] = useState(false);
  const [score, setScore] = useState(0);
  const [randomNum, setRandomNum] = useState(null);
  const [gameStatus, setGameStatus] = useState("start");
  const [timer, setTimer] = useState(10);

  const getRandomValue = () => {
    return Math.floor(Math.random() * 649) + 1;
  };

  const getPokemon = async (val) => {
    const pokeResults = await fetch(`${END_POINT}pokemon/${val}`);
    const data = await pokeResults.json();
    return data;
  };

  useEffect(() => {
    const val = getRandomValue();
    setRandomNum(val);
    const setPokemon = async () => {
      try {
        const pokeResults = await fetch(`${END_POINT}pokemon/${val}`);
        const data = await pokeResults.json();
        setCurrentPokemon(data);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    setPokemon();
  }, []);

  useEffect(() => {
    if (gameStatus === "inprogress") {
      if (timer > 0) {
        console.log("1");
        setTimeout(() => setTimer(timer - 1), 1000);
      } else {
        endGame();
        console.log(gameStatus);
      }
    }
  }, [timer, gameStatus]);

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleChange = (e) => {
    setAnswer(e.target.value);
  };

  const checkAnswer = async () => {
    if (answer === currentPokemon.name) {
      setScore(score + 1);
    } else {
      console.log("wrong!");
      //trigger some x sign?
    }
    //show pokemon - set show to true
    setAnswer("");
    await revealPokemon();
    const val = getRandomValue();
    setRandomNum(val);
    const pokemon = await getPokemon(val);
    setCurrentPokemon(pokemon);
  };

  const revealPokemon = async () => {
    setShowPokemon(true);
    await sleep(500);
    setShowPokemon(false);
  };

  const enterPressed = (event) => {
    if (gameStatus === "inprogress") {
      if (event.key === "Enter") {
        checkAnswer();
      } else if (event.key === "Escape") {
        console.log("escape");
      }
    } else {
      startGame();
    }
  };

  const endGame = () => {
    setGameStatus(status.END);
    setAnswer("");
  };

  const startGame = () => {
    setGameStatus(status.INPROGRESS);
    setTimer(10);
    setScore(0);
    console.log(gameStatus);
  };

  //This works, but this loads all files up at compile. Not efficient
  const images = require.context("./assets/svg", true);
  const pokemon = randomNum ? images(`./${randomNum}.svg`) : null;
  // console.log(showPokemon)
  return (
    <div className="app">
      {/* temp span to show answer until dev is compconsted */}
      {/* <span style={{ color: "white" }} className="app_hint">
        answer: {currentPokemon ? currentPokemon.name : null}
      </span> */}
      <div className="app_gameScreen">
        <div>
          <img src={BACKGROUND} alt="" className="app_background" />
          <img
            src={pokemon}
            alt=""
            className={"app_pokemon" + (showPokemon ? "" : " is-dark")}
          />
        </div>
        <div className="app_gameInfo">
          <span>{`Time: ${timer}s`}</span>
          <span>{`Score: ${score}`}</span>
        </div>
      </div>

      <div className="app_input">
        <label for="answer">Name</label>
        <input
          id="answer"
          type="text"
          autoFocus
          value={answer}
          onKeyPress={enterPressed}
          onChange={handleChange}
        ></input>
        <button onClick={() => checkAnswer()}>Submit</button>
      </div>
      <StartScreen
        handleClose={startGame}
        gameStatus={gameStatus}
        onKeyPress={enterPressed}
      >
        <h2>{gameStatus === "end" ? `You got ${score} correct!` : ""}</h2>
      </StartScreen>
    </div>
  );
}

export default App;

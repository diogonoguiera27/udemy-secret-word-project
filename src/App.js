// Css
import "./App.css";

// React
import {  useCallback, useEffect, useState } from "react";

// data
import { wordsList } from "./data/words";

// componets
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];
 const guessesqty =3

function App() {
  const [gameStage, setGamesStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setletters] = useState([]);

  const [guessedLetters, setguessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesqty);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback (() => {
    // pick random category
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    

    // pick a random word
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];
    

    return { word, category };
  },[words]);

  // starts the secret word game
  const startGame = useCallback (() => {

    clearLetterState()
    const { word, category } = pickWordAndCategory();

    // create an aray of letters
    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l) => l.toLowerCase());

    

    // fill states
    setPickedWord(word);
    setPickedCategory(category);
    setletters(wordLetters);

    setGamesStage(stages[1].name);
  },[pickWordAndCategory]);
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase()

    // check if letter has alredy been utilized
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    // push guessed letter  or remove a guess
    if (letters.includes(normalizedLetter)){
      setguessedLetters((actualGuessedLetters)=>[
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters)=>[
        ...actualWrongLetters,
        normalizedLetter
      ]);
      setGuesses((actualGuesses) => actualGuesses -1 )
    }
  };

   const clearLetterState = () => {
    setguessedLetters([]);
    setWrongLetters([])
   }
 
  useEffect(() => {
    if (guesses <=0){
      // reset all states
      clearLetterState();
      setGamesStage(stages[2].name);
    } 
  },[guesses]);

 useEffect(() => {
  const uniqueLetters = [...new Set(letters)];

  if (guessedLetters.length === uniqueLetters.length) {
    setScore((actualScore) => (actualScore += 100));
    startGame();
  }
}, [guessedLetters, letters, startGame]);


  const retry = () => {
    setScore(0)
    setGuesses(guessesqty);

    setGamesStage(stages[0].name);
  };
  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;

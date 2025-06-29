import { useRef, useState } from "react";
import "./Game.css";

const Game = ({
  verifyLetter,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) => {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();

    verifyLetter(letter)
    setLetter("");

    letterInputRef.current.focus();
  }
  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>
      <h1>advinhe a Palavra</h1>
      <h3 className="tip">
        Dica Sobre a Palavra: <span>{pickedCategory}</span>
      </h3>{" "}
      <p>Voce ainda tem {guesses} tentativas </p>
      <div className="wordContainer">
        {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span key={i} className="letter">
              {letter}
            </span>
          ) : (
            <sapn key={i} className="blankSquare"></sapn>
          )
        )}
      </div>
      <div className="letterContainer">
        <p>Tente Advinha uma letra de uma palavra:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength="1"
            required
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef}
          />
          <button>jogar</button>
        </form>
      </div>
      <div className="wrongLettersContainer"></div>
      <p> Letras ja Utilizadas:</p>
      {wrongLetters.map((letter, i) => (
        <span key={i}>{letter}</span>
      ))}
    </div>
  );
};

export default Game;

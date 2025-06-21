import "./Game.css";

const Game = () => {
  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: 000</span>
      </p>
      <h1>advinhe a Palavra</h1>
      <h3 className="tip">
        Dica Sobre a Palavra: <span>Dica ...</span>
      </h3>
      <div className="wordContainer">
        <span className="letter">A</span>
        <span className="blankSquare"></span>
      </div>
      <div className="letterContainer">
        <p>Tente Advinha uma letra de uma palavra:</p>
        <form>
          <input type="text" name="letter" maxLength="1" required />
          <button>jogar</button>
        </form>
      </div>
      <div className="wrongLettersContainer"></div>
      <p> Letras ja Utilizadas:</p>
      <span>a,</span>
      <span>b,</span>
    </div>
  );
};

export default Game;

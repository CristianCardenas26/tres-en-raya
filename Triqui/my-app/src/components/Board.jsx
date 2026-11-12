import Square from "./Square";
import { useState } from "react";
import { calculateWinner, canClickSquare } from "../functions/boardFunctions";

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [playerOneName, setPlayerOneName] = useState("");
  const [playerTwoName, setPlayerTwoName] = useState("");
  const [playerOneSymbol, setPlayerOneSymbol] = useState("X");

  const playerTwoSymbol = playerOneSymbol === "X" ? "O" : "X";
  const players = {
    [playerOneSymbol]: playerOneName,
    [playerTwoSymbol]: playerTwoName,
  };
  const winner = calculateWinner(squares);
  const currentSymbol = xIsNext ? "X" : "O";
  const currentPlayer = players[currentSymbol];
  const isTie = !winner && squares.every((square) => square !== null);

  function startGame(event) {
    event.preventDefault();

    if (!playerOneName.trim() || !playerTwoName.trim()) {
      return;
    }

    setPlayerOneName(playerOneName.trim());
    setPlayerTwoName(playerTwoName.trim());
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setGameStarted(true);
  }

  function handleClick(i) {
    if (!canClickSquare(squares, i) || winner) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  function changePlayers() {
    setGameStarted(false);
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  let status = `Turno de ${currentPlayer} (${currentSymbol})`;

  if (winner) {
    status = `Ganó ${players[winner]} (${winner})`;
  }

  if (isTie) {
    status = "Empate";
  }

  if (!gameStarted) {
    return (
      <form className="setup" onSubmit={startGame}>
        <h1>Triqui</h1>

        <label>
          Jugador 1
          <input
            type="text"
            value={playerOneName}
            onChange={(event) => setPlayerOneName(event.target.value)}
            placeholder="Nombre jugador 1"
          />
        </label>

        <label>
          Jugador 2
          <input
            type="text"
            value={playerTwoName}
            onChange={(event) => setPlayerTwoName(event.target.value)}
            placeholder="Nombre jugador 2"
          />
        </label>

        <label>
          Figura del jugador 1
          <select
            value={playerOneSymbol}
            onChange={(event) => setPlayerOneSymbol(event.target.value)}
          >
            <option value="X">X</option>
            <option value="O">O</option>
          </select>
        </label>

        <p>
          {playerTwoName || "Jugador 2"} jugará con {playerTwoSymbol}
        </p>

        <button className="primary-button" type="submit">
          Iniciar juego
        </button>
      </form>
    );
  }

  return (
    <section className="game">
      <h1>Triqui</h1>
      <p className="status">{status}</p>

      <div className="players">
        <p>
          {playerOneName}: {playerOneSymbol}
        </p>
        <p>
          {playerTwoName}: {playerTwoSymbol}
        </p>
      </div>

      <div className="board">
        <div className="board-row">
          <Square value={squares[0]} handleClick={() => handleClick(0)} />
          <Square value={squares[1]} handleClick={() => handleClick(1)} />
          <Square value={squares[2]} handleClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} handleClick={() => handleClick(3)} />
          <Square value={squares[4]} handleClick={() => handleClick(4)} />
          <Square value={squares[5]} handleClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} handleClick={() => handleClick(6)} />
          <Square value={squares[7]} handleClick={() => handleClick(7)} />
          <Square value={squares[8]} handleClick={() => handleClick(8)} />
        </div>
      </div>

      <div className="actions">
        <button type="button" onClick={resetGame}>
          Reiniciar
        </button>
        <button type="button" onClick={changePlayers}>
          Cambiar jugadores
        </button>
      </div>
    </section>
  );
}

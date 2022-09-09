import { useState, useRef } from "react";
import { BsFillCaretLeftFill, BsFillCaretRightFill, BsFillGrid3X3GapFill} from "react-icons/bs";

function Square(props) {
  return (
    <button
      style={{
        color: props.lastSquare ? "red" : "black",
        background: props.winningSquare ? "springgreen" : "white",
      }}
      className="square"
      onClick={props.onChange}
    >
      {props.value}
    </button>
  );
}

function Board(props) {
  const rowLayout = (i) => {
    const row = gameLines[i];
    return (
      <div className="board-row">
        {row.map((x) => (
          <Square
            key={x}
            value={props.squares[x]}
            lastSquare={props.lastSquare === x}
            winningSquare={props.winningSquares?.includes(x)}
            onChange={() => props.onChange(x)}
          />
        ))}
      </div>
    );
  };

  const content = [0, 1, 2].map((x) => rowLayout(x));
  return <div className="game-board">{content}</div>;
}

export default function Game() {
  const end = useRef(false);
  const nextStone = useRef("X");
  const [record, setRecord] = useState([{ squares: Array(9).fill(null) }]);
  const [move, setMove] = useState(0);
  const [index, setIndex] = useState(0);

  let currentSquares = record[index].squares;
  let lastSquare = record[index].lastSquare;

  const reset = () => {
    end.current = false;
    setRecord([{ squares: Array(9).fill(null), lastSquare: null }]);
    nextStone.current = "X";
    setMove(0);
    setIndex(0);
  };

  const next = () => {
    if (index < record.length - 1) {
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };
  const goTo = (step) => {
    setIndex(step);
    if (step % 2 === 0) {
      nextStone.current = "X";
    } else {
      nextStone.current = "O";
    }
  };

  const handleChange = (i) => {
    if (!end.current) {
      const temp = currentSquares.slice();
      if (currentSquares[i] == null) {
        temp[i] = nextStone.current;
        nextStone.current =
          nextStone.current === "X"
            ? (nextStone.current = "O")
            : (nextStone.current = "X");
        setRecord([...record, { squares: temp, lastSquare: i }]);
        setMove(move + 1);
        setIndex(index + 1);
      } else {
        alert("illegal move");
      }
    }
  };

  const squares = currentSquares.slice();
  let winner = gameEnding(squares);
  let winningSquares = null;
  let result = null;
  if (winner) {
    end.current = true;
    result = winner[0] + " win";
    winningSquares = gameLines[winner[1]];
  } else if (!currentSquares.includes(null)) {
    end.current = true;
    result = "Draw";
  }
  const status = !end.current ? "Next move is " + nextStone.current : result;

  const moves = record.map((step, move) => {
    const ls = step.lastSquare;
    const desc = move ? "#" + move + " in square " + ls : "Go to game start";
    return (
      <li key={move}>
        <button className="game-button"
          style={{ height: "22px", color: lastSquare === ls ? "red" : "white" }}
          onClick={() => goTo(move)}
        >
          {desc}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <p className="game-info game-title">TicTacToe PWA</p>
      <Board
          lastSquare={lastSquare}
          winningSquares={winningSquares}
          squares={currentSquares}
          onChange={(i) => handleChange(i)}
      />
      <div className="game-controls">
        <div><p className="game-info">{status}</p></div>
        {end.current && (
          <div>
              <p className="game-info">Replay or New game</p>
              <button className="game-button"  onClick={() => prev()}>
                <BsFillCaretLeftFill />
                Back
              </button>
              <button className="game-button"  onClick={() => next()}>
                Forward
                <BsFillCaretRightFill />
              </button>
              <button className="game-button" onClick={() => reset()}>
                <BsFillGrid3X3GapFill />
                 New game
                </button>

            <div>
              <ul style={{color: "white"}}>{moves}</ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const gameLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function gameEnding(squares) {
  for (let i = 0; i < gameLines.length; i++) {
    const [a, b, c] = gameLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], i];
    }
  }
  return null;
}

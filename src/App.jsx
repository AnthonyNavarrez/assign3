import * as React from 'react'
import * as ReactBootstrap from 'react-bootstrap'
import { useState } from 'react';

const { Badge, Button, Card } = ReactBootstrap

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [moveCount, setMoveCount] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);

  function isAdjacent(i, j) {
    const adjacencyMap = {
      0: [1, 3, 4],
      1: [0, 2, 3, 4, 5],
      2: [1, 4, 5],
      3: [0, 1, 4, 6, 7],
      4: [0, 1, 2, 3, 5, 6, 7, 8],
      5: [1, 2, 4, 7, 8],
      6: [3, 4, 7],
      7: [3, 4, 5, 6, 8],
      8: [4, 5, 7]
    };
    return adjacencyMap[i].includes(j);
  }

  function hasCenter() {
    return squares[4] === (xIsNext ? 'X' : 'O');
  }

  function winsGame(nextSquares) {
    return calculateWinner(nextSquares) === (xIsNext ? 'X' : 'O');
  }

  function handlePlacement(i) {
    if (calculateWinner(squares)) return false;
    if (squares[i]) return false;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setMoveCount(moveCount + 1);
    return true;
  }

  function handleSelection(i) {
    if (squares[i] === (xIsNext ? 'X' : 'O')) {
      setSelectedIndex(i);
    }
  }

  function handleMovement(i) {
    if (calculateWinner(squares)) {
    setSelectedIndex(null);
    return false;
  }
    if (!(squares[i] === null && isAdjacent(selectedIndex, i))) {
      setSelectedIndex(null);
      return false;
    }
 
    const nextSquares = squares.slice();
    nextSquares[selectedIndex] = null;
    nextSquares[i] = xIsNext ? 'X' : 'O';
 
    if (hasCenter()) { 
      if (selectedIndex != 4 && !(winsGame(nextSquares))) {
        setSelectedIndex(null);
        return false;
      }
    }
 
    setSquares(nextSquares);
    setSelectedIndex(null);
    return true;
  }

  function handleClick(i) {
    if (moveCount < 6) {
      if (handlePlacement(i)) {
        setXIsNext(!xIsNext);
      }
    } else if (selectedIndex === null) {
      handleSelection(i);
    } else {
      if (handleMovement(i)) {
        setXIsNext(!xIsNext);
      }
    }
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function App() {

  return (
      <Board />
  )
}

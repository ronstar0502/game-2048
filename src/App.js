import "./App.css";
import React, { useCallback, useEffect, useState } from "react";
import GameBoard from "./Components/GameBoard";

function App() {
  const [gameBoard, setGameBoard] = useState([]);
  const [gameScore, setGameScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  function initialize() {
    let testBoard = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    setGameBoard(startCells(testBoard));
    setGameOver(false);
    setGameWon(false);
  }

  function startCells(board) {
    let emptySpots = [];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (board[row][col] === 0) {
          emptySpots.push({ row, col });
        }
      }
    }
    for (let s = 1; s <= 2; s++) {
      // Choose a random empty spot
      const randomSpot =
        emptySpots[Math.floor(Math.random() * emptySpots.length)];
      // Choose a random value (either 2 or 4)
      const newValue = Math.random() < 0.9 ? 2 : 4;
      // Set the new value at the chosen spot
      board[randomSpot.row][randomSpot.col] = newValue;
    }
    return board;
  }
  useEffect(() => {
    if (!gameStarted) {
      setGameStarted(true);
      initialize();
    }
  }, []);

  const handleKeyPress = useCallback(
    (event) => {
      switch (event.key) {
        case "w":
        case "ArrowUp":
          if(!gameOver && !gameWon){
            swipeUp();
          }
          break;
        case "a":
        case "ArrowLeft":
          if(!gameOver && !gameWon){            
            swipeLeft();
          }
          break;
        case "s":
        case "ArrowDown":
          if(!gameOver && !gameWon){            
            swipeDown();
          }
          break;
        case "d":
        case "ArrowRight":
          if(!gameOver && !gameWon){            
            swipeRight();
          }
          break;
      }
    },
    [gameBoard]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  const addNewNumber = (board) => {
    let emptySpots = [];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (board[row][col] === 0) {
          emptySpots.push({ row, col });
        }
      }
    }

    // Choose a random empty spot
    const randomSpot =
      emptySpots[Math.floor(Math.random() * emptySpots.length)];
    // Choose a random value (either 2 or 4)
    const newValue = Math.random() < 0.9 ? 2 : 4;
    // Set the new value at the chosen spot
    board[randomSpot.row][randomSpot.col] = newValue;

    return board;
  };

  const swipeUp = () => {
    let newBoard = JSON.parse(JSON.stringify(gameBoard));
    let score = gameScore;
    let hasChanged = false;

    for (let row = 0; row < 4; row++) {
      let currentCol = 0;

      for (let col = 0; col < 4; col++) {
        if (newBoard[row][col] === 0) continue;

        if (
          currentCol > 0 &&
          newBoard[row][currentCol - 1] === newBoard[row][col]
        ) {
          // Merge cells
          newBoard[row][currentCol - 1] *= 2;
          newBoard[row][col] = 0;
          score += newBoard[row][currentCol - 1];
          if (newBoard[row][currentCol - 1] === 2048) {
            setGameWon(true);
          }
          hasChanged = true;
        } else {
          // Move cell
          if (currentCol !== col) {
            newBoard[row][currentCol] = newBoard[row][col];
            newBoard[row][col] = 0;
            hasChanged = true;
          }
          currentCol++;
        }
      }
    }

    if (hasChanged) {
      newBoard = addNewNumber(newBoard);
      setGameBoard(newBoard);
      setGameScore(score);
      //hasWon();
    } else if (checkGameOver()) {
      setGameOver(true);
    }
  };

  const swipeDown = () => {
    let newBoard = JSON.parse(JSON.stringify(gameBoard));
    let score = gameScore;
    let hasChanged = false;

    for (let row = 0; row < 4; row++) {
      let currentCol = 3;

      for (let col = 3; col >= 0; col--) {
        if (newBoard[row][col] === 0) continue;

        if (
          currentCol > 0 &&
          newBoard[row][currentCol + 1] === newBoard[row][col]
        ) {
          // Merge cells
          newBoard[row][currentCol + 1] *= 2;
          newBoard[row][col] = 0;
          score += newBoard[row][currentCol + 1];
          if (newBoard[row][currentCol + 1] === 2048) {
            setGameWon(true);
          }
          hasChanged = true;
        } else {
          // Move cell
          if (currentCol !== col) {
            newBoard[row][currentCol] = newBoard[row][col];
            newBoard[row][col] = 0;
            hasChanged = true;
          }
          currentCol--;
        }
      }
    }

    if (hasChanged) {
      newBoard = addNewNumber(newBoard);
      setGameBoard(newBoard);
      setGameScore(score);
      //hasWon();
    } else if (checkGameOver()) {
      setGameOver(true);
    }
  };

  const swipeRight = () => {
    let newBoard = JSON.parse(JSON.stringify(gameBoard));
    let score = gameScore;
    let hasChanged = false;

    for (let col = 0; col < 4; col++) {
      let currentRow = 3;

      for (let row = 3; row >= 0; row--) {
        if (newBoard[row][col] === 0) continue;

        if (
          currentRow < 3 &&
          newBoard[currentRow + 1][col] === newBoard[row][col]
        ) {
          // Merge cells
          newBoard[currentRow + 1][col] *= 2;
          newBoard[row][col] = 0;
          score += newBoard[currentRow + 1][col];
          if (newBoard[currentRow + 1][col] === 2048) {
            setGameWon(true);
          }
          hasChanged = true;
        } else {
          // Move cell
          if (currentRow !== row) {
            newBoard[currentRow][col] = newBoard[row][col];
            newBoard[row][col] = 0;
            hasChanged = true;
          }
          currentRow--;
        }
      }
    }

    if (hasChanged) {
      newBoard = addNewNumber(newBoard);
      setGameBoard(newBoard);
      setGameScore(score);
      //hasWon();
    } else if (checkGameOver()) {
      setGameOver(true);
    }
  };

  const swipeLeft = () => {
    let newBoard = JSON.parse(JSON.stringify(gameBoard));
    let score = gameScore;
    let hasChanged = false;

    for (let col = 0; col < 4; col++) {
      let currentRow = 0;

      for (let row = 0; row < 4; row++) {
        if (newBoard[row][col] === 0) continue;

        if (
          currentRow > 0 &&
          newBoard[currentRow - 1][col] === newBoard[row][col]
        ) {
          // Merge cells
          newBoard[currentRow - 1][col] *= 2;
          newBoard[row][col] = 0;
          score += newBoard[currentRow - 1][col];
          if (newBoard[currentRow - 1][col] === 2048) {
            setGameWon(true);
          }
          hasChanged = true;
        } else {
          // Move cell
          if (currentRow !== row) {
            newBoard[currentRow][col] = newBoard[row][col];
            newBoard[row][col] = 0;
            hasChanged = true;
          }
          currentRow++;
        }
      }
    }

    if (hasChanged) {
      newBoard = addNewNumber(newBoard);
      setGameBoard(newBoard);
      setGameScore(score);
      //hasWon();
    } else if (checkGameOver()) {
      setGameOver(true);
    }
  };

  /*const hasWon = () => {
    let hasPos = null;
    gameBoard.some((row, index) => {
      let col = row.indexOf(2048);
      if (col != -1) {
        hasPos = { row, col };
        return true;
      }
    });
    if (hasPos) {
      setGameWon(true);
    }
  }*/

  const checkGameOver = () => {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        // Check if there is an empty cell
        if (gameBoard[row][col] === 0) return false;
        // Check for the same cell on the right and left
        if (col + 1 < 4 && gameBoard[row][col] === gameBoard[row][col + 1])
          return false;
        if (col - 1 >= 0 && gameBoard[row][col] === gameBoard[row][col - 1])
          return false;
        // Check for the same cell below and above
        if (row + 1 < 4 && gameBoard[row][col] === gameBoard[row + 1][col])
          return false;
        if (row - 1 >= 0 && gameBoard[row][col] === gameBoard[row - 1][col])
          return false;
      }
    }
    return true;
  };

  function GameOverTest() {
    return (
      <div className="gameOverMessage">
        <h2>Game Over!</h2>
        <p>Unfortunately, you've lost. Try again!</p>
        <button className="button" onClick={initialize}>
          Restart Game
        </button>
      </div>
    );
  }

  function GameWonTest() {
    return (
      <div className="gameWonMessage">
        <h2>Congratulations!</h2>
        <p>You've won the game! Want to try again?</p>
        <button className="button" onClick={initialize}>
          New Game
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="topContainer">
        <div className="score">Score: {gameScore}</div>
        <h1>2048</h1>
        <button className="button" onClick={initialize}>New Game</button>
      </div>
      <div className="container">
        <GameBoard board={gameBoard} />
        <div className={` ${gameWon ? "gameWonActive" : ""}`}>
          {gameWon ? <GameWonTest /> : null}
        </div>
        <div className={` ${gameOver ? "gameOverActive" : ""}`}>
          {gameOver ? <GameOverTest /> : null}
        </div>
      </div>
    </div>
  );
}

export default App;

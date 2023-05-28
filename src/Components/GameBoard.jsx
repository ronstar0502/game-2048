import React, { useEffect, useState } from "react";
import Tile from "./Tile";
import "../Components/GameBoard.css";

export default function GameBoard({ board }) {

  return (
    <div className="game-board">
      {board.map((row, i) => (
        <div key={i}>
          {row.map((value, r) => (
            <Tile key={r} value={value} />
          ))}
        </div>
      ))}
    </div>
  );
}

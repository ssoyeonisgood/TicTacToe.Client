import React from "react";
import Cell from "./cell";

export default function Board({ board = Array(9).fill('\0'), currentTurn, onCellClick = ()=>{} }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {board.map((cell, idx) => (
        <Cell key={idx} value={cell} currentTurn={currentTurn} onClick={() => onCellClick(idx)} />
      ))}
    </div>
  );
}

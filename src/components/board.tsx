import type { User } from "@/App";
import Cell from "./cell";
import { type FC } from "react";

interface BoardProps {
  board: (string | null)[][];
  currentTurn: User | null;
  // onCellClick: (index: number) => void;
}

const Board: FC<BoardProps> = ({
  board = Array(9).fill("\0"),
  currentTurn,
}) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {board.flat().map((cell, idx) => (
        <Cell key={idx} value={cell} currentTurn={currentTurn} />
      ))}
    </div>
  );
};
export default Board;

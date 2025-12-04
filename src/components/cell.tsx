import type { User } from "@/App";
import { type FC } from "react";

interface CellProps {
  value: string | null;
  currentTurn: User | null;
  // onClick: () => void;
}

const Cell: FC<CellProps> = ({ value, currentTurn }) => {
  const display = value === "\0" || value === null ? "" : value;

  const handleClick = () => {
    console.log("Cell clicked:", value, "Current turn:", currentTurn);
    // if (currentTurn !== display) return;
    // onClick();
  };

  return (
    <button
      onClick={handleClick}
      className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center bg-slate-50 border rounded shadow-sm hover:scale-105 transition-transform"
    >
      <span
        className={`text-4xl font-bold ${
          display === "X"
            ? "text-rose-600 animate-pop-x"
            : "text-sky-600 animate-pop-o"
        }`}
      >
        {display}
      </span>
    </button>
  );
};
export default Cell;

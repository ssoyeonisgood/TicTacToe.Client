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
      className="w-full h-full bg-white rounded-2xl text-[48px] font-bold cursor-pointer transition-all duration-200 ease-in-out shadow-md border-none hover:scale-105 hover:shadow-lg flex items-center justify-center"
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

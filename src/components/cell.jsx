import React from "react";

export default function Cell({ value, onClick }) {
  const display = value === '\0' || value === null ? "" : value;
  return (
    <button
      onClick={() => onClick()}
      className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center bg-slate-50 border rounded shadow-sm hover:scale-105 transition-transform"
    >
      <span className={`text-4xl font-bold ${display === "X" ? "text-rose-600 animate-pop-x" : "text-sky-600 animate-pop-o"}`}>
        {display}
      </span>
    </button>
  );
}

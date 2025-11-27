import React from "react";
import Board from "../components/board";
import { getConnection, invoke } from "../services/signalRService";

export default function GamePage({ game, setGame, roomCode }) {
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(roomCode);
      alert("Room code copied!");
    } catch {
      alert("Copy failed");
    }
  };

  const makeMove = async (index) => {
    try {
      await invoke("MakeMove", roomCode, index);
      // server broadcast will update game via MoveMade
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-slate-50 p-6">
      <div className="w-full max-w-2xl flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold">
            Room: <span className="font-mono">{roomCode}</span>
          </h2>
          <p className="text-sm text-gray-500">
            Player X: {game.playerX || "-"} · Player O: {game.playerO || "-"}
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <button
            onClick={copyCode}
            className="px-3 py-1 bg-indigo-600 text-white rounded"
          >
            Copy Code
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <Board
          board={game.board}
          currentTurn={game.currentTurn}
          onCellClick={(i) => makeMove(i)}
        />
        <div className="mt-4 text-center">
          {game.isFinished ? (
            <div className="text-xl font-semibold">
              {game.winner === "Draw" ? "Draw" : `Winner: ${game.winner}`}
            </div>
          ) : (
            <div className="text-lg">
              Turn: <span className="font-mono">{game.currentTurn}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

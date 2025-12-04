import { type FC } from "react";
import Board from "../components/board";
// import { getConnection, invoke } from "../services/signalRService";
import type { Game } from "@/App";

interface GamePageProps {
  game: Game | null;
  joinCode: string | null;
}

export const GamePage: FC<GamePageProps> = ({ game, joinCode }) => {
  const copyCode = async () => {
    if (!joinCode) return;
    try {
      await navigator.clipboard.writeText(joinCode);
      alert("Room code copied!");
    } catch {
      alert("Copy failed");
    }
  };

  // const makeMove = async (index) => {
  //   try {
  //     await invoke("MakeMove", roomCode, index);
  //     // server broadcast will update game via MoveMade
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };
  if (!game)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading game...
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-2xl flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold">
            Room: <span className="font-mono">{joinCode}</span>
          </h2>
          {/* <p className="text-sm text-gray-500">
            Player X: {game.player1.symbol || "-"} · Player O:{" "}
            {game.player2.symbol || "-"}
          </p> */}
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
          // onCellClick={(i) => makeMove(i)}
        />
        <div className="mt-4 text-center">
          {game.IsFinished ? (
            <div className="text-xl font-semibold">
              {game.status === "Draw" ? "Draw" : `Winner: ${game.winner?.name}`}
            </div>
          ) : (
            <div className="text-lg">
              Turn: <span className="font-mono">{game.currentTurn?.name}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

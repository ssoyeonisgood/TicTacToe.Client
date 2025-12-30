import React, { type FC } from "react";
import Board from "../components/board";
import { ScrollArea } from "@/components/ui/scroll-area";
import baseball from "../assets/baseball.png";
import basketball from "../assets/basketball.png";
import close from "../assets/close.png";
import cyclops from "../assets/cyclops.png";
import frankenstein from "../assets/frankenstein.png";
import love from "../assets/love.png";
import mummy from "../assets/mummy.png";
import star from "../assets/star.png";
import yes from "../assets/yes.png";
import no from "../assets/no.png";
import sun from "../assets/sun.png";
import o from "../assets/o.png";
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

  interface ImageItem {
    id: number;
    src: string;
    alt?: string;
  }

  const imageList: ImageItem[] = [
    { id: 1, src: baseball, alt: "Baseball" },
    { id: 2, src: basketball, alt: "Basketball" },
    { id: 3, src: close, alt: "Close" },
    { id: 4, src: o, alt: "O" },
    { id: 5, src: cyclops, alt: "Cyclops" },
    { id: 6, src: frankenstein, alt: "Frankenstein" },
    { id: 7, src: love, alt: "Love" },
    { id: 8, src: star, alt: "Star" },
    { id: 9, src: mummy, alt: "Mummy" },
    { id: 10, src: sun, alt: "Sun" },
    { id: 11, src: no, alt: "No" },
    { id: 12, src: yes, alt: "Yes" },
  ];

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
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-1/2 h-[60vh]">
        <div className="w-full flex justify-between items-center mb-6">
          <h1 className="text-xl">{game.gameId}</h1>
          <button
            onClick={copyCode}
            className="px-10 py-3 bg-linear-to-br from-indigo-500 to-purple-300 text-white font-bold rounded-3xl hover:scale-105 transition-transform cursor-pointer mr-2"
          >
            Copy Room ID
          </button>
        </div>
        <div className="flex flex-row gap-10 w-full items-center justify-center h-full">
          <div className="flex flex-col gap-10 items-center bg-[linear-gradient(120deg,#e0c3fc,#8ec5fc)] p-10 rounded-3xl shadow-lg w-3/4 h-full">
            <div className="w-full max-w-2xl flex justify-between items-center">
              <div className="w-full max-w-2xl flex justify-between items-center text-2xl">
                <div>
                  Player X: {game.player1.name} <br />
                  Symbol: {game.player1.symbol || "Choosing..."}
                </div>
              </div>
              <div>
                <p className="text-2xl text-right">Playing</p>
              </div>
            </div>
            <Board
              board={game.board}
              currentTurn={game.currentTurn}
              // onCellClick={(i) => makeMove(i)}
            />
            {/* <div className="w-full max-w-2xl flex justify-between items-center text-2xl">
              <div>
                Player X: {game.player1.name} <br />
                Symbol: {game.player1.symbol || "Choosing..."}
              </div>
            </div> */}
            {!game.player2 ? (
              <div className="w-full max-w-2xl text-2xl">
                Waiting for Player O to join...
              </div>
            ) : (
              <div className="w-full max-w-2xl flex justify-between items-center text-2xl">
                <div>
                  Player O: {game.player2.name} <br />
                  Symbol: {game.player2.symbol || "Choosing..."}
                </div>
                <div className="text-right">Playing</div>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-10 items-center bg-[linear-gradient(120deg,#e0c3fc,#8ec5fc)] p-6 rounded-3xl shadow-lg w-1/4 h-full">
            <h2>Choose your Symbol</h2>
            <ScrollArea className="w-48 rounded-md border h-full overflow-auto">
              <div className="p-4">
                <h4 className="mb-4 text-sm leading-none font-medium">Tags</h4>
                {imageList.map((image) => (
                  <React.Fragment key={image.id}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-16 h-16 cursor-pointer hover:scale-105 transition-transform mb-2"
                    />
                    <div className="my-2 border-t w-full"></div>{" "}
                  </React.Fragment>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

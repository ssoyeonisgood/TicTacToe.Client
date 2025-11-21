import React, { useEffect, useState } from "react";
import Lobby from "./pages/lobby";
import GamePage from "./pages/gamePage";
import { startConnection, on, getConnection, off } from "./services/signalRService";

export default function App() {
  const [connected, setConnected] = useState(false);
  const [game, setGame] = useState(null); // game object from server
  const [roomCode, setRoomCode] = useState(null);

  useEffect(() => {
    startConnection(
      () => setConnected(true),
      () => setConnected(false)
    )
    .then(conn => {
      //SignalR invoke("CreateGame") or invoke("JoinGame") will be called from Lobby page
      //then get responses with g which is the game object
      conn.on("GameCreated", (g) => {
        setGame(g);
        setRoomCode(g.gameId);
      });
      conn.on("GameJoined", (g) => {
        setGame(g);
        setRoomCode(g.gameId);
      });
      conn.on("MoveMade", (g) => {
        setGame(g);
      });
      conn.on("Error", (msg) => alert("Server: " + msg));
    })
    .catch(err => {
      console.error("SignalR start failed:", err);
    });

    return () => {
      const c = getConnection();
      if (c) {
        off("GameCreated");
        off("GameJoined");
        off("MoveMade");
        off("Error");
      }
    };
  }, []);

  if (!connected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">Connecting to game server...</p>
        </div>
      </div>
    );
  }

  return game ? (
    <GamePage game={game} setGame={setGame} roomCode={roomCode} />
  ) : (
    <Lobby />
  );
}

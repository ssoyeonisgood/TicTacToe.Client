import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { startConnection, getConnection } from "./services/signalRService";
import { LogIn } from "./pages/logIn";
import { Lobby } from "./pages/lobby";
import { GamePage } from "./pages/gamePage";
import { JoinGame } from "./pages/joinGame";

export interface User {
  name: string;
  symbol: string | null;
}
export interface Game {
  gameId: string;
  board: (string | null)[][];
  player1: User;
  player2: User;
  currentTurn: User | null;
  IsFinished: boolean;
  status: string;
  winner: User | null;
}

export default function App() {
  const [connected, setConnected] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [game, setGame] = useState<Game | null>(null);
  const [joinCode, setJoinCode] = useState<string | null>(null);

  useEffect(() => {
    startConnection(
      () => setConnected(true),
      () => setConnected(false)
    ).catch((err) => {
      console.error("SignalR connection failed:", err);
    });

    const conn = getConnection();
    if (!conn) return;

    conn.on("GameUpdated", (g) => {
      if (g === null) return;
      setGame(g);
    });
  }, []);

  if (!connected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Connecting to server...</p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn setUser={setUser} />} />
        <Route
          path="/lobby"
          element={
            <Lobby user={user} setGame={setGame} setJoinCode={setJoinCode} />
          }
        />
        <Route
          path="/gamePage"
          element={<GamePage game={game} joinCode={joinCode} />}
        />
        <Route
          path="/joinGame"
          element={<JoinGame user={user} setGame={setGame} />}
        />
      </Routes>
    </Router>
  );
}

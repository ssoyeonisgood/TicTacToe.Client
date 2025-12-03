import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { startConnection } from "./services/signalRService";
import { LogIn } from "./pages/logIn";
import { Lobby } from "./pages/lobby";

export interface User {
  name: string;
  symbol: string | null;
}

export default function App() {
  const [connected, setConnected] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    startConnection(
      () => setConnected(true),
      () => setConnected(false)
    ).catch((err) => {
      console.error("SignalR connection failed:", err);
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
        <Route path="/lobby" element={<Lobby user={user} />} />
      </Routes>
    </Router>
  );
}

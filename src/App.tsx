import { LogIn } from "./pages/logIn";
import { useEffect, useState } from "react";
import { startConnection, getConnection, off } from "./services/signalRService";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { Lobby } from "./pages/lobby";

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [connected, setConnected] = useState(false);
  const [game, setGame] = useState<unknown>(null);
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [existUser, setExistUser] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    startConnection(
      () => setConnected(true),
      () => setConnected(false)
    )
      .then((conn) => {
        conn.on("UserLogedIn", (isExist: boolean) => {
          setExistUser(isExist);
        });
        conn.on("UserSignedUp", (ok: boolean) => {
          // if (ok) {
          //   navigate("/");
          // }
        });
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
      .catch((err) => {
        console.error("SignalR start failed:", err);
      });

    return () => {
      const c = getConnection();
      if (c) {
        off("UserSignedUp");
        off("UserLogedIn");
        off("GameCreated");
        off("GameJoined");
        off("MoveMade");
        off("Error");
      }
    };
  }, []);

  // if user exists, navigate to lobby
  useEffect(() => {
    if (existUser) {
      navigate("/lobby");
    }
  }, [existUser, navigate]);

  if (!connected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">Connecting to game server...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      <Routes>
        <Route path="/" element={<LogIn setUserName={setUserName} />} />
        <Route path="/lobby" element={<Lobby />} />
      </Routes>
    </div>
  );
}

export default AppWrapper;

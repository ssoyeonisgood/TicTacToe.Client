import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { invoke, getConnection, off } from "../services/signalRService";
import type { Game, User } from "@/App";

interface JoinGameProps {
  user: User | null;
  setGame: (game: Game) => void;
}

export const JoinGame: FC<JoinGameProps> = ({ user, setGame }) => {
  const [joinCode, setJoinCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const conn = getConnection();
    if (!conn) return;

    conn.on("GameJoined", (g) => {
      if (g === null) return;
      setGame(g);
      navigate("/gamePage");
    });

    conn.on("Error", (msg) => {
      console.log("Server: " + msg);
    });

    return () => {
      off("GameJoined");
    };
  }, [navigate, setGame]);

  const joinGame = async () => {
    try {
      await invoke("JoinGame", joinCode, user?.name);
    } catch (e) {
      console.error(e);
      console.log("Joining a game failed");
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl flex flex-col gap-4 w-1/5 mx-auto mt-20 p-10">
        <p>Please enter the game code to join</p>
        <br />
        <Label>Join Code</Label>
        <Input
          onChange={(e) => setJoinCode(e.target.value)}
          placeholder="ex) 71cc44f9-4127-4904-853b-5dd1db5b8544"
        ></Input>
        <Button
          className="mt-4 bg-linear-to-br from-indigo-500 to-purple-300 text-white font-bold rounded-3xl hover:scale-105 transition-transform"
          onClick={joinGame}
        >
          Join Game
        </Button>
      </div>
    </div>
  );
};

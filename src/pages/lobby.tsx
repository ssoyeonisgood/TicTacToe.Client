import { useEffect, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { invoke, getConnection, off } from "../services/signalRService";
import FloatSymbol from "@/components/ui/floatSymbol";
import GeoShape from "@/components/ui/geoShape";
import type { Game, User } from "@/App";

interface LobbyProps {
  user: User | null;
  setGame: (game: Game) => void;
  setJoinCode: (code: string | null) => void;
}

export const Lobby: FC<LobbyProps> = ({ user, setGame, setJoinCode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const conn = getConnection();
    if (!conn) return;

    conn.on("GameCreated", (g) => {
      if (g === null) return;
      setGame(g);
      setJoinCode(g.gameId);
      navigate("/gamePage");
    });

    conn.on("Error", (msg) => {
      console.log("Server: " + msg);
    });

    return () => {
      off("GameCreated");
    };
  }, [navigate, setGame, setJoinCode]);

  const create = async () => {
    if (!user) return;
    try {
      await invoke("CreateGame", user.name);
    } catch (e) {
      console.error(e);
      console.log("Creating a game failed");
    }
  };

  const join = async () => {
    navigate("/joinGame");
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-linear-to-br from-[#667eea] to-[#764ba2]">
      <FloatSymbol
        simbol="🏆"
        top="10%"
        left="8%"
        size="text-8xl"
        animationDelay="0s"
      />
      <FloatSymbol
        simbol="🎮"
        top="15%"
        right="12%"
        size="text-8xl"
        animationDelay="0.5s"
      />
      <FloatSymbol
        simbol="⭐"
        top="70%"
        left="10%"
        size="text-7xl"
        animationDelay="1s"
      />
      <FloatSymbol
        simbol="🔥"
        bottom="20%"
        right="15%"
        size="text-8xl"
        animationDelay="1.5s"
      />
      <FloatSymbol
        simbol="👑"
        top="50%"
        left="5%"
        size="text-7xl"
        animationDelay="2s"
      />
      <FloatSymbol
        simbol="🚀"
        bottom="30%"
        right="8%"
        size="text-7xl"
        animationDelay="0.8s"
      />
      <FloatSymbol
        simbol="🥇"
        top="35%"
        right="5%"
        size="text-7xl"
        animationDelay="1.2s"
      />
      <FloatSymbol
        simbol="🎲"
        bottom="15%"
        left="15%"
        size="text-7xl"
        animationDelay="1.8s"
      />
      <FloatSymbol
        simbol="🎯"
        top="80%"
        right="20%"
        size="text-7xl"
        animationDelay="0.3s"
      />
      <FloatSymbol
        simbol="⚡"
        top="25%"
        left="12%"
        size="text-7xl"
        animationDelay="2.3s"
      />
      <FloatSymbol
        simbol="✨"
        bottom="40%"
        left="8%"
        size="text-7xl"
        animationDelay="1.6s"
      />
      <FloatSymbol
        simbol="💎"
        top="60%"
        right="10%"
        size="text-7xl"
        animationDelay="0.9s"
      />

      <GeoShape
        type="circle"
        top="5%"
        right="30%"
        size={120}
        animationDelay="0.4s"
      />
      <GeoShape
        type="square"
        bottom="10%"
        left="25%"
        size={100}
        animationDelay="1.1s"
      />
      <GeoShape
        type="triangle"
        top="40%"
        right="25%"
        size={100}
        animationDelay="1.9s"
      />
      <GeoShape
        type="circle"
        bottom="50%"
        left="18%"
        size={120}
        animationDelay="0.7s"
      />
      <GeoShape
        type="circle"
        bottom="5%"
        left="30%"
        size={120}
        animationDelay="0.4s"
      />
      <GeoShape
        type="square"
        top="10%"
        right="25%"
        size={100}
        animationDelay="1.1s"
      />
      <GeoShape
        type="triangle"
        bottom="40%"
        left="25%"
        size={100}
        animationDelay="1.9s"
      />
      <GeoShape
        type="circle"
        top="50%"
        right="18%"
        size={120}
        animationDelay="0.7s"
      />
      <header className="text-center text-white mb-12 relative z-10">
        <h1 className="text-6xl font-semibold">
          Hey "{user?.name}", ready to play?
        </h1>
      </header>
      <div
        className="
          flex gap-6 flex-wrap justify-center
          max-w-3xl w-full relative z-10
        "
      >
        <div
          className="
            bg-white p-10 rounded-2xl flex-1 min-w-[280px] max-w-[360px]
            text-center cursor-pointer transition-all duration-300
            shadow-xl hover:-translate-y-2 hover:shadow-2xl
          "
          onClick={create}
        >
          <div
            className="
              w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center
              text-4xl font-bold
              bg-linear-to-br from-indigo-400 to-purple-600 text-white
            "
          >
            +
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">
            Create Game
          </h3>
          <p className="text-gray-600 text-sm">
            Start a new game and invite others
          </p>
        </div>
        <div
          className="
            bg-white p-10 rounded-2xl flex-1 min-w-[280px] max-w-[360px]
            text-center cursor-pointer transition-all duration-300
            shadow-xl hover:-translate-y-2 hover:shadow-2xl
          "
          onClick={join}
        >
          <div
            className="
              w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center
              text-4xl font-bold
              bg-linear-to-br from-pink-300 to-rose-500 text-white
            "
          >
            →
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">
            Join Game
          </h3>
          <p className="text-gray-600 text-sm">Enter an existing game room</p>
        </div>
      </div>
    </div>
  );
};

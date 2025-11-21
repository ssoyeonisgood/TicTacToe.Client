import React, { useState } from "react";
import { getConnection, invoke } from "../services/signalRService";

export default function Lobby() {
  const [name, setName] = useState("");
  const [joinCode, setJoinCode] = useState("");

  const create = async () => {
  if (!name) return alert("Enter your name");

  try {
    const response = await fetch("http://localhost:5025/game/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ playerName: name })
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Server response:", text);
      throw new Error("Create failed");
    }

    const data = await response.json();
    console.log("Game created:", data);
  } catch (err) {
    console.error(err);
    alert("Create failed");
  }
};


  const join = async () => {
    if (!joinCode || !name) return alert("Enter name & room code");
    try {
      await invoke("JoinGame", joinCode, name);
      // server will send GameJoined
    } catch(e) {
      console.error(e);
      alert("Join failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-semibold mb-4">Tic Tac Toe</h1>
        <input className="input mb-3 w-full" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} />
        <button onClick={create} className="w-full py-2 bg-blue-600 text-white rounded mb-3 hover:bg-blue-700">Create Game</button>
        <div className="flex items-center gap-2">
          <input className="input flex-1" placeholder="Room Code" value={joinCode} onChange={e=>setJoinCode(e.target.value)} />
          <button onClick={join} className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700">Join</button>
        </div>
        <p className="text-sm text-gray-500 mt-4">Create a room and share the code with a friend.</p>
      </div>
    </div>
  );
}

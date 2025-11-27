import { useState, type FC } from "react";
import { invoke } from "../services/signalRService";

interface SingUpProps {
  signedUp?: boolean;
}

export const SingUp: FC<SingUpProps> = () => {
  const [name, setName] = useState("");

  const signup = async () => {
    if (!name) return alert("Enter your name.");
    try {
      await invoke("SignUpGame", name);
    } catch (e) {
      console.error(e);
      alert("Signup failed");
    }
  };

  return (
    <div className="bg-white rounded shadow-md w-[40%] min-h-[400px] flex flex-col items-center justify-center gap-10">
      <h1 className="text-5xl font-bold">Sign Up</h1>
      <div className="flex flex-col gap-6 w-full items-center justify-center">
        <input
          type="text"
          placeholder="Username"
          className="border rounded w-1/2"
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={signup}
          className="px-4 py-2 bg-gray-300 rounded w-1/2 cursor-pointer hover:bg-gray-400"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

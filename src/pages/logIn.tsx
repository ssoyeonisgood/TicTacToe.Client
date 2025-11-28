import { useState, type FC } from "react";
import { invoke } from "../services/signalRService";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface LogInProps {
  setUserName: (name: string) => void;
}

export const LogIn: FC<LogInProps> = ({ setUserName }) => {
  const [name, setName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const login = async () => {
    if (!name) return alert("Enter your name.");
    try {
      await invoke("LoginGame", name);
      setUserName(name);
    } catch (e) {
      console.error(e);
      alert("Login failed");
    }
  };

  const signup = async () => {
    if (!name) return alert("Enter your name.");
    try {
      await invoke("SignUpGame", name);
      setIsSignUp(false);
      setName("");
    } catch (e) {
      console.error(e);
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-[#667eea] to-[#764ba2] relative overflow-hidden">
      <div
        className="absolute text-7xl font-bold text-black/30 animate-float"
        style={{ top: "10%", left: "10%" }}
      >
        X
      </div>
      <div
        className="absolute text-7xl font-bold text-black/30 animate-float"
        style={{ top: "20%", right: "15%", animationDelay: "1s" }}
      >
        O
      </div>
      <div
        className="absolute text-8xl font-bold text-black/30 animate-float"
        style={{ bottom: "5%", left: "10%", animationDelay: "2s" }}
      >
        X
      </div>
      <div
        className="absolute text-8xl font-bold text-black/30 animate-float"
        style={{ bottom: "25%", right: "10%", animationDelay: "1.5s" }}
      >
        O
      </div>
      <div
        className="absolute text-6xl font-bold text-black/30 animate-float"
        style={{ top: "60%", left: "5%", animationDelay: "0.5s" }}
      >
        X
      </div>
      <div
        className="absolute text-6xl font-bold text-black/30 animate-float"
        style={{ top: "40%", right: "5%", animationDelay: "2.5s" }}
      >
        O
      </div>
      <div className="flex flex-row w-full items-center justify-center gap-20">
        <div className="flex flex-col">
          <h1 className="text-9xl font-honk animate-bounce text-center">
            Welcome to
            <br /> Socket-Tac-Toe
          </h1>
          <p className="mt-4 text-gray-200 text-2xl text-center mb-10">
            Play Tic-Tac-Toe in real-time with your friends! <br /> Create a
            room and share the room ID, or join a friend's room to compete live!
          </p>
          <div className="bg-white rounded-2xl shadow-xl w-full h-100 z-10 flex items-center justify-center flex-col"></div>
        </div>
        <div className="bg-white rounded-2xl shadow-xl w-1/4 h-200 z-10 flex items-center justify-center flex-col">
          <AnimatePresence mode="wait">
            {!isSignUp ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 80 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center w-full"
              >
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                  Login to your account
                </h1>

                <div className="flex flex-col gap-8 w-[60%]">
                  <div className="flex flex-col">
                    <Label className="text-gray-700 mb-2">Username</Label>
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your username"
                      required
                      className="focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300"
                    />
                  </div>

                  <Button
                    onClick={login}
                    className="bg-blue-500 text-white font-semibold py-3 rounded-xl hover:bg-blue-600 transition cursor-pointer"
                  >
                    Login
                  </Button>
                </div>

                <p className="text-center text-sm text-gray-500 mt-4">
                  Don't have an account?{" "}
                  <span
                    className="text-blue-500 font-semibold cursor-pointer hover:underline"
                    onClick={() => setIsSignUp(true)}
                  >
                    Sign up
                  </span>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center w-full"
              >
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                  Create an account
                </h1>

                <div className="flex flex-col gap-8 w-[60%]">
                  <div className="flex flex-col">
                    <Label className="text-gray-700 mb-2">Username</Label>
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Choose username"
                      required
                      className="focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300"
                    />
                  </div>

                  <Button
                    className="bg-red-500 text-white font-semibold py-3 rounded-xl hover:bg-red-600 transition cursor-pointer"
                    onClick={signup}
                  >
                    Create Account
                  </Button>
                </div>

                <p className="text-center text-sm text-gray-500 mt-4">
                  Already have an account?{" "}
                  <span
                    className="text-red-500 font-semibold cursor-pointer hover:underline"
                    onClick={() => setIsSignUp(false)}
                  >
                    Log in
                  </span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

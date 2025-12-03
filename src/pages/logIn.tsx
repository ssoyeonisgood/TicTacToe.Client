import { useState, useEffect, type FC } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ErrorAlert } from "@/components/errorAlert";
import { invoke, getConnection } from "../services/signalRService";
import FloatSymbol from "@/components/ui/floatSymbol";

interface LogInProps {
  setUser: (user: { name: string; symbol: string | null }) => void;
}

export const LogIn: FC<LogInProps> = ({ setUser }) => {
  const [name, setName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const conn = getConnection();
    if (!conn) return;

    conn.on("UserLoggedIn", (user) => {
      if (user.name === name) {
        navigate("/lobby");
        setUser(user);
      }
    });

    conn.on("UserSignedUp", () => {
      setIsSignUp(false);
      setSuccessMsg("Account created successfully! Please log in.");
      setName("");
    });

    conn.on("Error", (msg) => {
      console.log("Server: " + msg);
      setIsError(true);
    });

    return () => {
      conn.off("UserLogedIn");
      conn.off("UserSignedUp");
    };
  }, [navigate, name, setUser]);

  const login = async () => {
    if (!name) {
      setErrorMsg("Please enter a username.");
      setIsError(true);
      return;
    }
    await invoke("LoginGame", name);
  };

  const signup = async () => {
    if (!name) {
      setErrorMsg("Please enter a username.");
      setIsError(true);
      return;
    }
    await invoke("SignUpGame", name);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-[#667eea] to-[#764ba2]">
      <FloatSymbol top="10%" left="10%" size="text-7xl" simbol="X" />
      <FloatSymbol
        top="10%"
        right="15%"
        animationDelay="1s"
        size="text-7xl"
        simbol="O"
      />
      <FloatSymbol
        bottom="10%"
        left="10%"
        animationDelay="2s"
        size="text-8xl"
        simbol="X"
      />
      <FloatSymbol
        bottom="25%"
        right="10%"
        animationDelay="1.5s"
        simbol="O"
        size="text-8xl"
      />
      <FloatSymbol
        top="60%"
        left="5%"
        animationDelay="0.5s"
        size="text-6xl"
        simbol="X"
      />
      <FloatSymbol
        top="40%"
        right="5%"
        size="text-6xl"
        simbol="O"
        animationDelay="2.5s"
      />
      <div className="flex flex-row w-[70%] items-center justify-center gap-10">
        <div className="flex flex-col w-[50%]">
          <h1 className="text-9xl font-honk animate-bounce text-center">
            Welcome to
            <br /> Socket-Tac-Toe
          </h1>
          <p className="mt-4 text-gray-200 text-2xl text-center mb-10">
            Play Tic-Tac-Toe in real-time with your friends! <br /> Create a
            room and share the room ID, or join a friend's room to compete live!
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl w-[30%] h-150 z-10 flex items-center justify-center flex-col">
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
                      onChange={(e) => {
                        setName(e.target.value);
                        setErrorMsg(null);
                        setIsError(false);
                        setSuccessMsg(null);
                      }}
                      placeholder="Your username"
                      required
                      className="focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300"
                    />
                  </div>
                  {successMsg !== null && (
                    <ErrorAlert message={successMsg} variant="default" />
                  )}
                  {isError && (
                    <ErrorAlert
                      message={
                        errorMsg === null
                          ? "Username does not exist. Please try again."
                          : errorMsg
                      }
                      variant="destructive"
                    />
                  )}
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
                    onClick={() => {
                      setIsSignUp(true);
                      setIsError(false);
                      setErrorMsg(null);
                      setSuccessMsg(null);
                    }}
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
                      onChange={(e) => {
                        setName(e.target.value);
                        setErrorMsg(null);
                        setIsError(false);
                        setSuccessMsg(null);
                      }}
                      placeholder="Choose username"
                      required
                      className="focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300"
                    />
                  </div>
                  {isError && (
                    <ErrorAlert
                      message={
                        errorMsg === null
                          ? "Username already exists. Try another."
                          : errorMsg
                      }
                      variant="destructive"
                    />
                  )}
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
                    onClick={() => {
                      setIsSignUp(false);
                      setIsError(false);
                      setErrorMsg(null);
                      setSuccessMsg(null);
                    }}
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

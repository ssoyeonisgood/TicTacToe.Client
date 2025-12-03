import type { FC } from "react";

interface FloatSimbolProps {
  simbol?: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  animationDelay?: string;
  size?: "text-6xl" | "text-7xl" | "text-8xl";
}

export const FloatSimbol: FC<FloatSimbolProps> = ({
  simbol = "X",
  top,
  left,
  right,
  bottom,
  animationDelay,
  size = "text-6xl",
}) => {
  return (
    <div
      className={`absolute font-bold text-black/30 animate-float ${size}`}
      style={{
        top,
        left,
        right,
        bottom,
        animationDelay,
      }}
    >
      {simbol}
    </div>
  );
};
export default FloatSimbol;

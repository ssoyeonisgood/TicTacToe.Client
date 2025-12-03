import type { FC, CSSProperties } from "react";

type ShapeType = "circle" | "square" | "triangle";

interface GeoShapeProps {
  type: ShapeType;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  size?: number;
  animationDelay?: string;
}

export const GeoShape: FC<GeoShapeProps> = ({
  type,
  top,
  left,
  right,
  bottom,
  size = 100,
  animationDelay,
}) => {
  const baseStyle: CSSProperties = {
    position: "absolute",
    opacity: 0.08,
    pointerEvents: "none",
    zIndex: 1,
    top,
    left,
    right,
    bottom,
    animation: `lobbyFloat 10s ease-in-out infinite`,
    animationDelay,
  };

  const shapeClass = "";
  let shapeStyle: CSSProperties = {};

  switch (type) {
    case "circle":
      shapeStyle = {
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: "white",
      };
      break;
    case "square":
      shapeStyle = {
        width: size,
        height: size,
        backgroundColor: "white",
        transform: "rotate(45deg)",
      };
      break;
    case "triangle":
      shapeStyle = {
        width: 0,
        height: 0,
        borderLeft: `${size / 2}px solid transparent`,
        borderRight: `${size / 2}px solid transparent`,
        borderBottom: `${(size * 5) / 6}px solid white`, // 비율 맞춤
      };
      break;
  }

  return (
    <div style={{ ...baseStyle, ...shapeStyle }} className={shapeClass}></div>
  );
};

export default GeoShape;

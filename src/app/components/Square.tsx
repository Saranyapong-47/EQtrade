import React from "react";

interface RectangleProps {
  width: number; // กำหนดความกว้าง
  height: number; // กำหนดความสูง
  color?: string; // สีพื้นหลัง
  border?: string; // สีขอบ (optional)
  borderRadius?: number; // กำหนดรูปร่างของ Rectangle
}

const Rectangle: React.FC<RectangleProps> = ({
  width,
  height,
  color = "#0B091A",
  border,
  borderRadius = 20,
}) => {
  return (
    <div
    className="flex flex-col items-center justify-start p-5" 
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: color,
        border: border ? `4px solid ${border}` : "none",
        borderRadius: `${borderRadius}px`,
      }}
    >
      <div>
      <h1 className="text-white text-32 font-bold">Signin</h1>
      </div>
    </div>
  );
};

export default Rectangle;

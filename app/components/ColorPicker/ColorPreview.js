"use client";

import { useContext, useState } from "react";
import { getCSS } from "./colorUtils";
import { ColorContext } from "./ColorPicker";

export default function ColorPreview() {
  const color = useContext(ColorContext);
  const cssColor = getCSS(color);
  const solidGradient = `linear-gradient(${cssColor}, ${cssColor})`;

  const [secondary, setSecondary] = useState(color);
  const secondaryCssColor = getCSS(secondary);
  const secondaryGradient = `linear-gradient(${secondaryCssColor}, ${secondaryCssColor})`;

  const swapColors = () => {
    const tempColor = secondary;
    setSecondary(color);
    color.set(tempColor);
  };

  const checkerboardGradient =
    "repeating-conic-gradient(#808080 0% 25%, white 0% 50%) 50% / 15px 15px";

  const swatchClasses = "w-8 h-8 border-2 border-gray-300 rounded-lg";
  return (
    <div
      className="relative"
      style={{ width: "70px", height: "70px" }}
      onClick={swapColors}
    >
      <div
        className={swatchClasses}
        style={{
          width: "50px",
          height: "50px",
          background: `${secondaryGradient}, ${checkerboardGradient}`,
          position: "absolute",
          top: "0",
          left: "0",
        }}
      />
      <div
        className={swatchClasses}
        style={{
          width: "50px",
          height: "50px",
          background: `${solidGradient}, ${checkerboardGradient}`,
          position: "absolute",
          bottom: "0",
          right: "0",
        }}
      />
    </div>
  );
}

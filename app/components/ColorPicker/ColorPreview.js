"use client";

import { useContext } from "react";
import { getCSS } from "./colorUtils";
import { ColorContext } from "./ColorPicker";

export default function ColorPreview() {
  const color = useContext(ColorContext);
  const cssColor = getCSS(color);
  const solidGradient = `linear-gradient(${cssColor}, ${cssColor})`;
  const checkerboardGradient =
    "repeating-conic-gradient(#808080 0% 25%, white 0% 50%) 50% / 15px 15px";

  return (
    <div
      className="w-16 h-16 border border-gray-300 rounded-lg"
      style={{
        background: `${solidGradient}, ${checkerboardGradient}`,
      }}
    />
  );
}

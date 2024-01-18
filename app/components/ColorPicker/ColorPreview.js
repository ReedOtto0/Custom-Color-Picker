"use client";

import { useContext } from "react";
import { getCSS } from "./colorUtils";
import { ColorContext } from "./ColorPicker";

export default function ColorPreview() {
  const color = useContext(ColorContext);
  const cssColor = getCSS(color);
  const solidGradient = `linear-gradient(${cssColor}, ${cssColor})`;
  const checkerboardGradient =
    "repeating-conic-gradient(#808080 0% 25%, white 0% 50%) 50% / 16px 16px";

  return (
    <div
      className="w-8 h-8 m-2 border border-gray-300 rounded-lg"
      style={{
        background: `${solidGradient}, ${checkerboardGradient}`,
      }}
    />
  );
}

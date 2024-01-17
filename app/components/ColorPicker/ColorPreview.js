"use client";

import { useContext } from "react";
import { getCssFromColor } from "./colorUtils";
import { ColorContext } from "./ColorPicker";

const checkerboardGradient =
  "repeating-conic-gradient(#808080 0% 25%, white 0% 50%) 50% / 16px 16px";

export default function ColorPreview() {
  const color = useContext(ColorContext);
  const cssColor = getCssFromColor(color);
  const solidGradient = `linear-gradient(${cssColor}, ${cssColor})`;

  return (
    <div className="w-full flex flex-row items-center">
      <div
        className="w-8 h-8 m-2 border border-gray-300 rounded-lg"
        style={{
          background: `${solidGradient}, ${checkerboardGradient}`,
        }}
      />
      <p className="p-1 m-l-2 font-bold text-sm">{getCssFromColor(color)}</p>
    </div>
  );
}

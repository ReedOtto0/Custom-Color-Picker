"use client";

import { createContext, useRef, useState } from "react";
import { getCSS } from "./colorUtils";
import useColorReducer from "./useColorReducer";

import Popup from "./Popup";
import Plotter from "./Plotter";
import Slider from "./Slider";
import ColorPreview from "./ColorPreview";

const defaultColor = {
  h: 0,
  s: 0,
  l: 50,
};

export const ColorContext = createContext(defaultColor);

export default function ColorPicker({
  initialColor = defaultColor,
  onPick = (color) => {
    console.log(`Selected color: ${JSON.stringify(color)}`);
  },
  alpha = true,
}) {
  const color = useColorReducer(initialColor, onPick);

  const [open, setOpen] = useState(false);

  const buttonRef = useRef(null);
  const handleClick = (e) => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <ColorContext.Provider value={color}>
      <div className="relative w-12 h-12 bg-gray-100 border-2 border-gray-300 rounded-lg flex items-cetner justify-center">
        <button onClick={handleClick} ref={buttonRef}>
          <div
            className="w-8 h-8 rounded-lg border border-black"
            style={{
              backgroundColor: getCSS(color, "rgba"),
            }}
          />
        </button>
        <Popup open={open} parentRef={buttonRef.current}>
          <Plotter />
          <div className="flex flex-col items-center p-2">
            <Slider type="l" />
            <Slider type="a" />
          </div>
          <ColorPreview />
        </Popup>
      </div>
    </ColorContext.Provider>
  );
}

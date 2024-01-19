"use client";

import { createContext, useRef, useState } from "react";
import { getCSS } from "./colorUtils";
import Popup from "./Popup";
import Tabs from "./Tabs";
import Controls from "./Controls";
import ColorPreview from "./ColorPreview";
import useColorReducer from "./useColorReducer";
import Plot from "./Plot";

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
          <Plot />
          <ColorPreview />
          {/*<Colorspace />
            <Controls />
            <Tabs />*/}
        </Popup>
      </div>
    </ColorContext.Provider>
  );
}

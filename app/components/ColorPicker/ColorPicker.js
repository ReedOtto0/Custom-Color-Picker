"use client";

import { createContext, useReducer, useRef } from "react";
import { getCssFromColor } from "./colorUtils";
import Popup from "./Popup";
import Tabs from "./Tabs";
import Controls from "./Controls";
import ColorPreview from "./ColorPreview";
import Colorspace from "./Colorspace";

const defaultColor = {
  type: "HSL",
  alpha: true,
  data: { h: 221, s: 92, l: 38, a: 1 },
};
const colorReducer = (color, action) => {
  switch (action.type) {
    case "update":
      const newColor = { ...color, data: { ...color.data } };
      newColor.data[action.attribute] = action.value;
      return newColor;
    case "set":
      return action.color;
  }
};
const pickerReducer = (picker, action) => {
  switch (action.type) {
    case "open":
      return { ...picker, active: true };
    case "close":
      return { ...picker, active: false };
    case "tab":
      return { ...picker, activeTab: action.tab };
  }
};
const pickerStartup = ([tabOptions, initialColor]) => {
  const tabs =
    tabOptions.indexOf(initialColor.type) !== -1
      ? [...tabOptions]
      : initialColor.type
      ? [...tabOptions, initialColor.type]
      : ["HSL"];
  return {
    tabs: tabs,
    activeTab: initialColor.type,
    active: false,
  };
};

export const ColorContext = createContext(defaultColor);
export const PickerContext = createContext(null);

export default function ColorPicker({
  initialColor = defaultColor,
  callback = (color) => {
    console.log(`Selected color: ${JSON.stringify(color)}`);
  },
  alpha = true,
  tabOptions = ["HSL", "RGB", "HEX"],
}) {
  const [color, colorDispatch] = useReducer(colorReducer, initialColor);
  const dispatchChange = (attribute, value) => {
    colorDispatch({ type: "update", attribute: attribute, value: value });
  };
  const dispatchSet = (color) => {
    colorDispatch({ type: "set", color: color });
  };

  const [picker, pickerDispatch] = useReducer(
    pickerReducer,
    [tabOptions, initialColor],
    pickerStartup
  );
  const openPicker = () => {
    pickerDispatch({ type: "open" });
  };
  const closePicker = () => {
    pickerDispatch({ type: "close" });
  };
  const setTab = (newTab) => {
    pickerDispatch({ type: "tab", tab: newTab });
  };

  const buttonRef = useRef(null);
  const handleClick = (e) => {
    if (picker.active) {
      closePicker();
      callback(color);
    } else {
      openPicker();
    }
  };

  return (
    <ColorContext.Provider
      value={{
        ...color,
        change: dispatchChange,
        set: dispatchSet,
      }}
    >
      <PickerContext.Provider
        value={{
          ...picker,
          close: closePicker,
          open: openPicker,
          setTab: setTab,
          alpha: alpha,
        }}
      >
        <div className="relative w-12 h-12 bg-gray-100 border-2 border-gray-300 rounded-lg flex items-cetner justify-center">
          <button onClick={handleClick} ref={buttonRef}>
            <div
              className="w-8 h-8 rounded-lg border border-black"
              style={{
                backgroundColor: getCssFromColor(color),
              }}
            />
          </button>
          <Popup parentRef={buttonRef.current}>
            <Colorspace />
            <Controls />
            <ColorPreview />
            <Tabs />
          </Popup>
        </div>
      </PickerContext.Provider>
    </ColorContext.Provider>
  );
}

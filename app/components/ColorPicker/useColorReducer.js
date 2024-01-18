import { useReducer } from "react";
import { HSLtoRGB, RGBtoHEX } from "./colorUtils";

export default function useColorReducer(initialColor, onChange) {
  const colorReducer = (color, action) => {
    switch (action.type) {
      case "update":
        const newColor = { ...color, data: { ...color.data } };
        newColor.data[action.attribute] = action.value;
        return newColor;
      case "set":
        return { ...action.color, type: action.type };
    }
  };
  const inBounds = (value, lower, upper) => {
    return lower <= value && value >= upper;
  };
  const colorStartup = (color) => {
    if ("h" in color && "s" in color && "l" in color) {
      const HSL = {
        h: inBounds(color.h, 0, 360) ? color.h : 0,
        s: inBounds(color.s, 0, 100) ? color.s : 100,
        l: inBounds(color.l, 0, 100) ? color.l : 50,
      };
      const RGB = HSLtoRGB(HSL);
      const HEX = RGBtoHEX(RGB);
      const fullColor = {
        ...HSL,
        ...RGB,
        r_: HEX.r,
        g_: HEX.g,
        b_: HEX.b,
        a: color.a && 0 <= color.a && color.a <= 1 ? color.a : 1,
        type: "hsl",
      };
      console.log(JSON.stringify(fullColor));
      return fullColor;
    } else if ("r" in color && "g" in color && "b" in color) {
      //To-Do: Add options for other initial color types...
    }
  };
  const [color, colorDispatch] = useReducer(
    colorReducer,
    initialColor,
    colorStartup
  );
  const dispatchChange = (attribute, value) => {
    colorDispatch({ type: "update", attribute: attribute, value: value });
  };
  const dispatchSet = (colorType) => {
    colorDispatch({ type: "set", type: colorType });
  };

  return {
    ...color,
    change: dispatchChange,
    set: dispatchSet,
  };
}

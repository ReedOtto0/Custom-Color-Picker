import { useReducer } from "react";
import {
  HEXtoHSL,
  HEXtoRGB,
  HSLtoHEX,
  HSLtoRGB,
  RGBtoHEX,
  RGBtoHSL,
} from "./colorUtils";

const white = {
  h: 0,
  s: 0,
  l: 100,
  r: 255,
  g: 255,
  b: 255,
  r_: "FF",
  g_: "FF",
  b_: "FF",
  a: 1,
};

export default function useColorReducer(initialColor, onChange) {
  const colorReducer = (color, action) => {
    switch (action.type) {
      case "update":
        switch (action.attribute) {
          case "h":
          case "s":
          case "l":
            const HSL = { h: color.h, s: color.s, l: color.l, a: color.a };
            HSL[action.attribute] = action.value;
            return colorStartup(HSL);
          case "r":
          case "g":
          case "b":
            const RGB = { r: color.r, g: color.g, b: color.b, a: color.a };
            RGB[action.attribute] = action.value;
            return colorStartup(RGB);
          case "a":
            return { ...color, a: action.value };
          default:
            return color;
        }
      case "set":
        return colorStartup(action.color);
      default:
        return color;
    }
  };
  const inBounds = (value, lower, upper) => {
    return lower <= value && value <= upper;
  };
  const colorStartup = (color) => {
    if ("h" in color && "s" in color && "l" in color) {
      const HSL = {
        h: inBounds(color.h, 0, 360) ? color.h : 0,
        s: inBounds(color.s, 0, 100) ? color.s : 100,
        l: inBounds(color.l, 0, 100) ? color.l : 50,
      };
      const RGB = HSLtoRGB(HSL);
      const HEX = HSLtoHEX(HSL);
      return {
        ...HSL,
        ...RGB,
        ...HEX,
        a: color.a && 0 <= color.a && color.a <= 1 ? color.a : 1,
        type: "hsl",
      };
    } else if ("r" in color && "g" in color && "b" in color) {
      const RGB = {
        r: inBounds(color.r, 0, 255) ? color.r : 255,
        g: inBounds(color.g, 0, 255) ? color.g : 255,
        b: inBounds(color.b, 0, 255) ? color.b : 255,
      };
      const HSL = RGBtoHSL(RGB);
      const HEX = RGBtoHEX(RGB);
      return {
        ...HSL,
        ...RGB,
        ...HEX,
        a: color.a && 0 <= color.a && color.a <= 1 ? color.a : 1,
        type: "rgb",
      };
    } else if ("r_" in color && "g_" in color && "b_") {
      const HEX = {
        r_: inBounds(color.r_, 0, 255) ? color.r_ : 255,
        g_: inBounds(color.g_, 0, 255) ? color.g_ : 255,
        b_: inBounds(color.b_, 0, 255) ? color.b_ : 255,
      };
      const HSL = HEXtoHSL(HEX);
      const RGB = HEXtoRGB(HEX);
      return {
        ...HSL,
        ...RGB,
        ...HEX,
        a: color.a && 0 <= color.a && color.a <= 1 ? color.a : 1,
        type: "hex",
      };
    } else {
      return { ...white, type: "hsl" };
    }
  };
  const [color, colorDispatch] = useReducer(
    colorReducer,
    initialColor,
    colorStartup
  );
  console.log(`Processed color: ${JSON.stringify(color)}`);
  const dispatchChange = (attribute, value) => {
    colorDispatch({ type: "update", attribute: attribute, value: value });
  };
  const dispatchSet = (color) => {
    colorDispatch({ type: "set", color: color });
  };

  return {
    ...color,
    change: dispatchChange,
    set: dispatchSet,
  };
}

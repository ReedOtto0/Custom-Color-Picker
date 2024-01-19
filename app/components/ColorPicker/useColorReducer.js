import { useReducer } from "react";
import { expandAlpha } from "./colorUtils";

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
            return expandAlpha(HSL);
          case "r":
          case "g":
          case "b":
            const RGB = { r: color.r, g: color.g, b: color.b, a: color.a };
            RGB[action.attribute] = action.value;
            return expandAlpha(RGB);
          case "a":
            return { ...color, a: action.value };
          default:
            return color;
        }
      case "set":
        return expandAlpha(action.color);
      default:
        return color;
    }
  };
  const [color, colorDispatch] = useReducer(
    colorReducer,
    initialColor,
    expandAlpha
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

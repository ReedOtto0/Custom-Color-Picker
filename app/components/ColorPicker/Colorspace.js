"use client";

import { useContext } from "react";
import { ColorContext } from "./ColorPicker";
import { HEXtoHSL, RGBtoHSL } from "./colorUtils";

export default function Colorspace() {
  const color = useContext(ColorContext);
  const currentColorHSL =
    color.type === "HSL"
      ? [color.data.h, color.data.s, color.data.l]
      : color.type === "RGB"
      ? RGBtoHSL(color.data.r, color.data.g, color.data.b)
      : color.type === "HEX"
      ? HEXtoHSL(color.data.r, color.data.g, color.data.b)
      : [0, 0, 0];

  const conicGradientHue =
    "conic-gradient(hsl(0, 100%, 50%), hsla(0, 100%, 50%, 1), hsla(20, 100%, 50%, 1), hsla(40, 100%, 50%, 1), hsla(60, 100%, 50%, 1), hsla(80, 100%, 50%, 1), hsla(100, 100%, 50%, 1), hsla(120, 100%, 50%, 1), hsla(140, 100%, 50%, 1), hsla(160, 100%, 50%, 1), hsla(180, 100%, 50%, 1), hsla(200, 100%, 50%, 1), hsla(220, 100%, 50%, 1), hsla(240, 100%, 50%, 1), hsla(260, 100%, 50%, 1), hsla(280, 100%, 50%, 1), hsla(300, 100%, 50%, 1), hsla(320, 100%, 50%, 1), hsla(340, 100%, 50%, 1) , hsla(360, 100%, 50%, 1))";
  const radialGradientSaturation = `radial-gradient(closest-side, hsla(0, 0%, 50%, 1), hsla(0, 0%, 50%, 0))`;

  const lightnessColor = `hsla(0, 0%, ${currentColorHSL[2]}%, ${
    (2 * Math.abs(currentColorHSL[2] - 50)) / 100
  })`;
  const overlayLightness = `radial-gradient(closest-side, ${lightnessColor}, ${lightnessColor})`;

  const linearGradientHue =
    "linear-gradient(to right, hsla(0, 100%, 50%, 1), hsla(20, 100%, 50%, 1), hsla(40, 100%, 50%, 1), hsla(60, 100%, 50%, 1), hsla(80, 100%, 50%, 1), hsla(100, 100%, 50%, 1), hsla(120, 100%, 50%, 1), hsla(140, 100%, 50%, 1), hsla(160, 100%, 50%, 1), hsla(180, 100%, 50%, 1), hsla(200, 100%, 50%, 1), hsla(220, 100%, 50%, 1), hsla(240, 100%, 50%, 1), hsla(260, 100%, 50%, 1), hsla(280, 100%, 50%, 1), hsla(300, 100%, 50%, 1), hsla(320, 100%, 50%, 1), hsla(340, 100%, 50%, 1) , hsla(360, 100%, 50%, 1))";
  const linearGradientLightness =
    "linear-gradient(to bottom, white,  transparent, black)";

  const checkerboardGradient =
    "repeating-conic-gradient(#808080 0% 25%, transparent 0% 50%) 50% / 20px 20px";

  const styles = {
    HSL: {
      backgroundImage: `${overlayLightness}, ${radialGradientSaturation}, ${conicGradientHue}`,
      borderRadius: "100%",
      borderWidth: "1px",
      width: "calc(100% - 12px)",
      margin: "6px",
      aspectRatio: "1 / 1",
    },
    RGB: {
      backgroundImage: `${linearGradientLightness}, ${linearGradientHue}`,
      width: "100%",
      aspectRatio: "1 / 1",
    },
  };

  return (
    <div className="w-full aspect-square">
      {picker.openTab === "HSL" ? (
        <div className="border-gray-300" style={styles.HSL} />
      ) : (
        <div style={styles.RGB} />
      )}
    </div>
  );
}

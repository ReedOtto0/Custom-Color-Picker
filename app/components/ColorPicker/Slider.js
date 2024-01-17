"use client";

import { useContext } from "react";
import { ColorContext } from "./ColorPicker";
import styles from "./slider.module.css";
import { HEXtoRGB, getCssFromColor } from "./colorUtils";
import { HEXtoHSL, HSLtoRGB, RGBtoHSL } from "./colorUtils";

export default function Slider({ type }) {
  const color = useContext(ColorContext);
  const sliderClasses = `w-full py-1 ${styles.slider}`;

  const currentColorHSL =
    color.type === "HSL"
      ? [color.data.h, color.data.s, color.data.l]
      : color.type === "RGB"
      ? RGBtoHSL(color.data.r, color.data.g, color.data.b)
      : color.type === "HEX"
      ? HEXtoHSL(color.data.r, color.data.g, color.data.b)
      : [0, 0, 0];

  const currentColorRGB =
    color.type === "HSL"
      ? HSLtoRGB(color.data.h, color.data.s, color.data.l)
      : color.type === "RGB"
      ? [color.data.r, color.data.g, color.data.b]
      : color.type === "HEX"
      ? HEXtoRGB(color.data.r, color.data.g, color.data.b)
      : [0, 0, 0];

  const currentColorCSS = getCssFromColor(color);
  const currentColorSolidBG = `radial-gradient(closest-side, ${currentColorCSS}, ${currentColorCSS})`;
  const thumbRing = `radial-gradient(closest-side, transparent 0%, transparent 65%, black 66%, black 100%)`;
  const thumbBG = `${thumbRing}, ${currentColorSolidBG}`;

  const linearGradientHue = `linear-gradient(to right, hsla(0, ${currentColorHSL[1]}%, ${currentColorHSL[2]}%, 1), hsla(60, ${currentColorHSL[1]}%, ${currentColorHSL[2]}%, 1), hsla(120, ${currentColorHSL[1]}%, ${currentColorHSL[2]}%, 1), hsla(180, ${currentColorHSL[1]}%, ${currentColorHSL[2]}%, 1), hsla(240, ${currentColorHSL[1]}%, ${currentColorHSL[2]}%, 1), hsla(300, ${currentColorHSL[1]}%, ${currentColorHSL[2]}%, 1), hsla(360, ${currentColorHSL[1]}%, ${currentColorHSL[2]}%, 1))`;
  const linearGradientSaturation = `linear-gradient(to right, hsl(${currentColorHSL[0]}, 0%, ${currentColorHSL[2]}%), hsl(${currentColorHSL[0]}, 100%, ${currentColorHSL[2]}%))`;
  const linearGradientlightness = `linear-gradient(to right, hsl(${currentColorHSL[0]}, ${currentColorHSL[1]}%, 0%), hsl(${currentColorHSL[0]}, ${currentColorHSL[1]}%, 50%), hsl(${currentColorHSL[0]}, ${currentColorHSL[1]}%, 100%))`;
  const linearGradientAlpha = `linear-gradient(to right, hsla(${currentColorHSL[0]}, ${currentColorHSL[1]}%, ${currentColorHSL[2]}%, 0), hsla(${currentColorHSL[0]}, ${currentColorHSL[1]}%, ${currentColorHSL[2]}%, 1))`;
  const checkerboardGradient =
    "repeating-conic-gradient(#808080 0% 25%, white 0% 50%) 50% / 16px 16px";

  const linearGradientR = `linear-gradient(to right, rgba(0, ${currentColorRGB[1]}, ${currentColorRGB[2]}, 1), rgba(255, ${currentColorRGB[1]}, ${currentColorRGB[2]}, 1))`;
  const linearGradientG = `linear-gradient(to right, rgba(${currentColorRGB[0]}, 0, ${currentColorRGB[2]}, 1), rgba(${currentColorRGB[0]}, 255, ${currentColorRGB[2]}, 1))`;
  const linearGradientB = `linear-gradient(to right, rgba(${currentColorRGB[0]}, ${currentColorRGB[1]}, 0, 1), rgba(${currentColorRGB[0]}, ${currentColorRGB[1]}, 255, 1))`;

  const types = {
    h: { name: "Hue", limits: [0, 360, 1], BG: linearGradientHue },
    s: {
      name: "Saturation",
      limits: [0, 100, 1],
      BG: linearGradientSaturation,
    },
    l: { name: "Lightness", limits: [0, 100, 1], BG: linearGradientlightness },
    r: { name: "Red", limits: [0, 255, 1], BG: linearGradientR },
    g: { name: "Green", limits: [0, 255, 1], BG: linearGradientG },
    b: { name: "Blue", limits: [0, 255, 1], BG: linearGradientB },
    a: {
      name: "alpha",
      limits: [0, 1, 0.01],
      BG: `${linearGradientAlpha}, ${checkerboardGradient}`,
    },
  };

  return (
    <input
      name={types[type].name}
      type="range"
      className={sliderClasses}
      style={{
        "--slider-bg": types[type].BG,
        "--thumb-bg": thumbBG,
      }}
      value={color.data[type]}
      onChange={(e) => {
        color.change(type, e.target.value);
      }}
      min={types[type].limits[0]}
      max={types[type].limits[1]}
      step={types[type].limits[2]}
    />
  );
}

"use client";

import { useContext } from "react";
import { ColorContext } from "../ColorPicker";
import styles from "./slider.module.css";
import { getCSS } from "../colorUtils";

export default function Slider({ type }) {
  const color = useContext(ColorContext);
  const sliderClasses = `w-full py-1 ${styles.slider}`;

  const colorCSS = getCSS(color);
  const solid = `radial-gradient(closest-side, ${colorCSS}, ${colorCSS})`;
  const thumbRing = `radial-gradient(closest-side, transparent 0%, transparent 65%, black 65%, black 100%)`;
  const thumbBG = `${solid}`;

  const step = 60;
  const hueStops = Array.from({ length: 360 / step + 1 }, (v, i) => i * step)
    .map((hue) => ` hsl(${hue}, ${color.s}%, ${color.l}%)`)
    .toString();
  const hue = `linear-gradient(to right,${hueStops})`;

  const saturation = `linear-gradient(to right, hsl(${color.h}, 0%, ${color.l}%), hsl(${color.h}, 100%, ${color.l}%))`;

  const lightness = `linear-gradient(to right, hsl(${color.h}, ${color.s}%, 0%), hsl(${color.h}, ${color.s}%, 50%), hsl(${color.h}, ${color.s}%, 100%))`;

  const linearGradientAlpha = `linear-gradient(to right, hsla(${color.h}, ${color.s}%, ${color.l}%, 0), hsla(${color.h}, ${color.s}%, ${color.l}%, 1))`;
  const checkerboardGradient =
    "repeating-conic-gradient(#808080 0% 25%, white 0% 50%) 50% / 16px 16px";

  const linearGradientR = `linear-gradient(to right, rgba(0, ${color.g}, ${color.b}, 1), rgba(255, ${color.g}, ${color.b}, 1))`;
  const linearGradientG = `linear-gradient(to right, rgba(${color.r}, 0, ${color.b}, 1), rgba(${color.r}, 255, ${color.b}, 1))`;
  const linearGradientB = `linear-gradient(to right, rgba(${color.r}, ${color.g}, 0, 1), rgba(${color.r}, ${color.g}, 255, 1))`;

  const types = {
    h: { name: "Hue", limits: [0, 360, 1], BG: hue },
    s: { name: "Saturation", limits: [0, 100, 1], BG: saturation },
    l: { name: "Lightness", limits: [0, 100, 1], BG: lightness },
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
      value={color[type]}
      onChange={(e) => {
        color.change(type, e.target.value);
      }}
      min={types[type].limits[0]}
      max={types[type].limits[1]}
      step={types[type].limits[2]}
    />
  );
}

"use client";

import { useContext, useRef } from "react";
import { ColorContext } from "../ColorPicker";
import { VectortoXY, XYtoVector } from "./plotUtils";
import Thumb from "./Thumb";

export default function HSL() {
  const color = useContext(ColorContext);
  const plot = useRef(null);

  //To-Do: refactor to include scaling for plot size
  const handleClick = (e) => {
    const [x_, y_] = [e.nativeEvent.offsetX, e.nativeEvent.offsetY];
    const [w, h] = [e.target.offsetWidth, e.target.offsetHeight];
    const [x, y] = [x_ - 0.5 * w, y_ - 0.5 * h];
    const [m, a] = XYtoVector(x, y);
    //console.log(`Clicked at ${x}, ${y}`);
    console.log(`Clicked at ${m}, ${a}`);
    color.change("h", Math.round(a));
    color.change("s", Math.round(m));
  };

  const saturation = `radial-gradient(closest-side, hsla(0, 0%, 50%, ${color.a}), hsla(0, 100%, 50%, 0))`;

  const step = 60;
  const hueStops = Array.from({ length: 360 / step + 1 }, (v, i) => i * step)
    .map((hue) => ` hsla(${hue}, 100%, ${color.l}%, ${color.a})`)
    .toString();
  const hue = `conic-gradient(from 90deg, ${hueStops})`;

  const alpha = `radial-gradient(closest-side, hsla(0, 100%, ${color.l}%, ${color.a}), hsla(0, 100%, ${color.l}%, ${color.a}))`;

  const checkerboard =
    "repeating-conic-gradient(#808080 0% 25%, white 0% 50%) 50% / 20% 20%";

  const styles = {
    backgroundImage: `${saturation}, ${hue}, ${alpha}`,
    backgroundBlendMode: "saturation, color, normal",
    borderRadius: "100%",
    aspectRatio: "1 / 1",
  };

  return (
    <>
      <div
        className="border-gray-300 rounded-full w-full aspect-square"
        style={{
          background: checkerboard,
          borderRadius: "100%",
          borderWidth: "2px",
          width: "calc(100% - 12px)",
          margin: "6px",
        }}
      >
        <div
          onClick={handleClick}
          className="w-full aspect-square relative flex items-center justify-center"
          style={styles}
          ref={plot}
        >
          <Thumb pos={VectortoXY(color.s, color.h)} parent={plot.current} />
        </div>
      </div>
    </>
  );
}

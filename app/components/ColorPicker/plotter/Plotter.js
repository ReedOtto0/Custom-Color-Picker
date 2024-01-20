"use client";

import Slider from "./Slider";
import HSL from "./plots/HSL";

export default function Plotter() {
  return (
    <>
      <HSL />
      <Slider type="l" />
      <Slider type="a" />
    </>
  );
}

"use client";

import { useState } from "react";
import HSL from "./plots/HSL";
import Slider from "./Slider";

export default function Plot() {
  const [current, setCurrent] = useState("hsl");
  return (
    <div>
      <div className="relative">
        <HSL />
        <Slider type="h" />
        <Slider type="s" />
        <Slider type="l" />
        <Slider type="a" />
      </div>
    </div>
  );
}

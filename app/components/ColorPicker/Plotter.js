"use client";

import { useState } from "react";
import HSL from "./plots/HSL";

export default function Plotter() {
  const [current, setCurrent] = useState("hsl");
  return <HSL />;
}

"use client";

import { useContext } from "react";
import Slider from "./Slider";
import { PickerContext } from "./ColorPicker";

export default function Controls() {
  const picker = useContext(PickerContext);

  const HSLSliders = (
    <>
      <Slider type="h" />
      <Slider type="s" />
      <Slider type="l" />
    </>
  );
  const RGBSliders = (
    <>
      <Slider type="r" />
      <Slider type="g" />
      <Slider type="b" />
    </>
  );

  return (
    <div className={"w-full p-2 flex flex-col justify-around"}>
      {picker.openTab === "HSL" ? HSLSliders : RGBSliders}
      {picker.alpha && <Slider type="a" />}
    </div>
  );
}

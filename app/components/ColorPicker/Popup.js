"use client";

import { useContext } from "react";
import { PickerContext } from "./ColorPicker";

export default function Popup({ parentRef, children }) {
  const popupClasses =
    "w-[300px] bg-gray-100 border-2 border-gray-300 rounded-xl overflow-hidden absolute left-[-130px] top-[60px]";
  const picker = useContext(PickerContext);

  return (
    <div hidden={!picker.active} className={popupClasses}>
      {children}
    </div>
  );
}

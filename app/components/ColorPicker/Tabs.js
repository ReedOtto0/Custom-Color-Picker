"use client";

import { useContext } from "react";
import { PickerContext } from "./ColorPicker";

export default function Tabs() {
  const containerClasses =
    "w-full flex flex-row rounded-b-lg border-black divide-x-2 divide-gray-300";
  const tabClasses =
    "text-sm grow border-t-2 border-gray-300 hover:bg-gray-200";
  const activeTabClasses = "text-sm grow";

  const picker = useContext(PickerContext);

  const buttons = picker.tabs.map((tab, index) => {
    return (
      <button
        className={tab !== picker.activeTab ? tabClasses : activeTabClasses}
        onClick={() => {
          picker.setTab(tab);
        }}
        key={index}
      >
        {tab}
      </button>
    );
  });
  return <div className={containerClasses}>{buttons}</div>;
}

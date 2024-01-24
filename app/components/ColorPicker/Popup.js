"use client";

export default function Popup({ open, parentRef, children }) {
  const popupClasses =
    "w-[300px] pt-2 px-2 bg-gray-100 border-2 border-gray-300 rounded-xl overflow-hidden absolute left-[-130px] top-[60px]";

  return (
    <div hidden={!open} className={popupClasses}>
      {children}
    </div>
  );
}

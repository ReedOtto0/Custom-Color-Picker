import ColorPreview from "../textPanel/ColorPreview";

export default function ActionPanel() {
  const buttonClasses = `w-1/4`;
  return (
    <div className="border-t-2 -mx-2 border-gray-300 divide-x-2 divide-gray-300 flex flex-row justify-between mt-2 relative">
      <button className={buttonClasses}>Pallets</button>
      <button className={buttonClasses}>Copy</button>
      <button className={buttonClasses}>Plot</button>
      <button className={buttonClasses}>Format</button>
    </div>
  );
}

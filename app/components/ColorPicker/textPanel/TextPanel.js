import Textbox from "./Textbox";

export default function TextPanel() {
  return (
    <div className="flex flex-row justify-between mt-2">
      <Textbox type="h" />
      <Textbox type="s" />
      <Textbox type="l" />
      <Textbox type="a" />
    </div>
  );
}

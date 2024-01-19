export default function Thumb({ pos }) {
  return (
    <div
      className="w-6 h-6 border-2 rounded-full border-black relative pointer-events-none"
      style={{ top: pos[0], left: pos[1] }}
    />
  );
}

export default function Thumb({ pos }) {
  return (
    <div
      className="border-2 rounded-full border-black relative pointer-events-none"
      style={{
        width: "20px",
        height: "20px",
        top: pos[0],
        left: pos[1],

        boxShadow:
          "0px 0px 4px RGBA(255,255,255,0.5), 0px 0px 3px RGBA(255,255,255,0.5) inset",
      }}
    />
  );
}

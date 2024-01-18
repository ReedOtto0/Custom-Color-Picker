export const getCSS = (color, returnType) => {
  switch (returnType) {
    case "hsl":
      return `hsl(${color.h}, ${color.s}%, ${color.l}%)`;
    case "hsla":
      return `hsla(${color.h}, ${color.s}%, ${color.l}%, ${color.a})`;
    case "hex":
      return `#${color.r_}${color.g_}${color.b_})`;
    case "hexa":
      return `#${color.r_}${color.g_}${color.b_}${color.a})`;
    case "rgb":
      return `rgb(${color.r}, ${color.g}, ${color.b})`;
    case "rgba":
    default:
      return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
  }
};

export const HSLtoRGB = (color) => {
  let h = color.h;
  let s = color.s;
  let l = color.l;
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return { r: 255 * f(0), g: 255 * f(8), b: 255 * f(4) };
};

export const HSLtoHEX = (color) => {
  return RGBtoHEX(HSLtoRGB(color));
};

export const RGBtoHSL = (color) => {
  const [R, G, B] = [color.r / 255, color.g / 255, color.b / 255];
  const max = Math.max(R, G, B);
  const min = Math.min(R, G, B);
  const d = max - min;

  const h =
    d === 0
      ? 0
      : max == R
      ? 60 * (((G - B) / d) % 6)
      : max == G
      ? 60 * ((B - R) / d + 2)
      : 60 * ((R - G) / d + 4);

  const l = (max + min) / 2;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));

  return { h: h, s: s, l: l };
};

export const RGBtoHEX = (color) => {
  return { r_: toHEX(color.r), g_: toHEX(color.g), b_: toHEX(color.b) };
};

export const HEXtoHSL = (color) => {
  return RGBtoHSL(HEXtoRGB(color));
};

export const HEXtoRGB = (color) => {
  return { r: toRGB(color.r), g: toRGB(color.g), b: toRGB(color.b) };
};

function toHEX(rgb) {
  const hex = rgb.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function toRGB(hex) {
  return parseInt(hex, 16);
}

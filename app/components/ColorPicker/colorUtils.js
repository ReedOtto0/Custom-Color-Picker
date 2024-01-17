export const getCssFromColor = (color) => {
  switch (color.type) {
    case "HSL":
      return color.alpha
        ? `hsla(${color.data.h}, ${color.data.s}%, ${color.data.l}%, ${color.data.a})`
        : `hsl(${color.data.h}, ${color.data.s}%, ${color.data.l}%)`;
    case "RGB":
      return color.alpha
        ? `rgb(${color.data.r}, ${color.data.g}, ${color.data.b}, ${color.data.a})`
        : `rgba(${color.data.r}, ${color.data.g}, ${color.data.b})`;
    default:
      return color.alpha
        ? `#${color.data.r}${color.data.g}${color.data.b}${color.data.a})`
        : `#${color.data.r}${color.data.g}${color.data.b})`;
  }
};

export const convertColorType = (color, type) => {};

export const HSLtoRGB = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

export const HSLtoHEX = (h, s, l) => {
  [R, G, B] = HSLtoRGB(h, s, l);
  return RGBtoHEX(R, G, B);
};

export const RGBtoHSL = (r, g, b) => {
  const [R, G, B] = [r / 255, g / 255, b / 255];
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

  return [h, s, l];
};

export const RGBtoHEX = (r, g, b) => {
  return [toHEX(r), toHEX(g), toHEX(b)];
};

export const HEXtoHSL = (r, g, b) => {
  const [R, G, B] = HEXtoRGB(r, g, b);
  return RGBtoHSL(R, G, B);
};

export const HEXtoRGB = (r, g, b) => {
  return [toRGB(r), toRGB(g), toRGB(b)];
};

function toHEX(rgb) {
  const hex = rgb.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function toRGB(hex) {
  return parseInt(hex, 16);
}

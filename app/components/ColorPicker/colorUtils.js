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

export const clamp = (value, lower, upper) => {
  return value > upper ? upper : value < lower ? lower : value;
};

//To-Do clamp hex values...
const clampValues = {
  h: [0, 360],
  s: [0, 100],
  l: [0, 100],
  v: [0, 100],
  w: [0, 100],
  b: [0, 100],
  r: [0, 255],
  g: [0, 255],
  b: [0, 255],
  a: [0, 1],
};

export const clampAll = (color) => {
  const clamped = { ...color };
  for (const key in color) {
    if (key in clampValues) {
      clamped[key] = clamp(
        clamped[key],
        clampValues[key][0],
        clampValues[key][1]
      );
    }
  }
  return clamped;
};

export const expand = (color) => {
  const c = { ...clampAll(color) };
  if ("h" in c && "s" in c && "l" in c) {
    return {
      ...HSLtoHSV(color),
      ...HSLtoHWB(color),
      ...HSLtoRGB(color),
      ...HSLtoHEX(color),
      ...color,
    };
  } else if ("h" in c && "s" in c && "v" in c) {
    return {
      ...HSVtoHSL(color),
      ...HSVtoHWB(color),
      ...HSVtoRGB(color),
      ...HSVtoHEX(color),
      ...color,
    };
  } else if ("h" in c && "w" in c && "b" in c) {
    return {
      ...HWBtoHSL(color),
      ...HWBtoHSV(color),
      ...HWBtoRGB(color),
      ...HWBTOHEX(color),
      ...color,
    };
  } else if ("r" in c && "g" in c && "b" in c) {
    return {
      ...RGBtoHSL(color),
      ...RGBtoHSV(color),
      ...RGBtoHWB(color),
      ...RGBtoHEX(color),
      ...color,
    };
  } else if ("r_" in c && "g_" in c && "b" in c) {
    return {
      ...HEXtoHSL(color),
      ...HEXtoHSV(color),
      ...HEXtoHWB(color),
      ...HEXtoRGB(color),
      ...color,
    };
  } else {
    return expand({ r: 0, g: 0, b: 0 });
  }
};
export function expandAlpha(color) {
  if (color.a) {
    return expand(color);
  } else {
    return expand({ ...color, a: 1 });
  }
}

//Convert HSL
export const HSLtoRGB = (color) => {
  const hsl = { ...color };
  hsl.s /= 100;
  hsl.l /= 100;
  const k = (n) => (n + hsl.h / 30) % 12;
  const a = hsl.s * Math.min(hsl.l, 1 - hsl.l);
  const f = (n) =>
    hsl.l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return {
    r: Math.round(255 * f(0)),
    g: Math.round(255 * f(8)),
    b: Math.round(255 * f(4)),
  };
};

export const HSLtoHEX = (color) => {
  return RGBtoHEX(HSLtoRGB(color));
};

export function HSLtoHSV(hsl) {
  const hsv1 = (hsl.s * (hsl.l < 50 ? hsl.l : 100 - hsl.l)) / 100;
  return {
    h: hsl.h,
    s: hsv1 === 0 ? 0 : ((2 * hsv1) / (hsl.l + hsv1)) * 100,
    v: hsl.l + hsv1,
  };
}

export function HSLtoHWB(hsl) {
  return HSVtoHWB(HSLtoHSV(hsl));
}

//Convert RGB
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

export function RGBtoHSV(rgb) {
  return HSLtoHSV(RGBtoHSL(rgb));
}

export function RGBtoHWB(rgb) {
  return HSVtoHWB(RGBtoHSV(rgb));
}

export const RGBtoHEX = (color) => {
  return { r_: toHEX(color.r), g_: toHEX(color.g), b_: toHEX(color.b) };
};

//Convert HEX
export const HEXtoHSL = (color) => {
  return RGBtoHSL(HEXtoRGB(color));
};

export const HEXtoRGB = (color) => {
  return { r: toRGB(color.r_), g: toRGB(color.g_), b: toRGB(color.b_) };
};

export function HEXtoHSV(hex) {
  return HSLtoHSV(HEXtoHSL(hex));
}

export function HEXtoHWB(hex) {
  return HSVtoHWB(HEXtoHSV(hex));
}

//convert rgb element to hex and back
export function toHEX(rgb) {
  const hex = Math.round(rgb).toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

export function toRGB(hex) {
  return parseInt(hex, 16);
}

//Convert HSV
export function HSVtoHSL(hsv) {
  const hslL = ((200 - hsv.s) * hsv.v) / 100;

  return {
    h: hsv.h,
    s:
      hslL === 0 || hslL === 200
        ? 0
        : ((hsv.s * hsv.v) / 100 / (hslL <= 100 ? hslL : 200 - hslL)) * 100,
    v: (hslL * 5) / 10,
  };
}

export function HSVtoRGB(hsv) {
  return HSLtoRGB(HSVtoHSL(hsv));
}

export function HSVtoHEX(hsv) {
  return RGBtoHEX(HSVtoRGB(hsv));
}

export function HSVtoHWB(hsv) {
  return { h: hsv.h, w: ((100 - hsv.s) * hsv.v) / 100, b: 100 - hsv.v };
}

//Convert HWB
export function HWBtoHSV(hwb) {
  return {
    h: hwb.h,
    s: hwb.b === 100 ? 0 : 100 - (hwb.w / (100 - hwb.b)) * 100,
    v: 100 - hwb.b,
  };
}

export function HWBtoHSL(hwb) {
  return HSVtoHSL(HWBtoHSL(hwb));
}

export function HWBtoRGB(hwb) {
  return HSVtoRGB(HWBtoHSV(hwb));
}

export function HWBTOHEX(hwb) {
  return RGBtoHEX(HWBtoRGB(hwb));
}

export const XYtoVector = (x, y) => {
  const m = Math.sqrt(Math.abs(x) ** 2 + Math.abs(y) ** 2);
  let a = Math.atan2(x, -y) * (180 / Math.PI);
  a -= 90;
  if (a < 0) {
    a += 360;
  }
  return [m, a];
};

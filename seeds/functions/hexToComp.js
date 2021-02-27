
let hexToComp = module.exports = function hexToComp(H) {
  // Convert hex to RGB first
  let r = 0,
    g = 0,
    b = 0;
  if (H.length == 4) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
  }
  if (H.length == 7) {
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);
  //h is altered by 180 to find the complimentary color
  if (h > 180) h -= 180;
  else h += 180;
  //hsl is converted back to hex
  s /= 100;
  l /= 100;
  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r1 = 0,
    g1 = 0,
    b1 = 0;

  if (0 <= h && h < 60) {
    r1 = c;
    g1 = x;
    b1 = 0;
  } else if (60 <= h && h < 120) {
    r1 = x;
    g1 = c;
    b1 = 0;
  } else if (120 <= h && h < 180) {
    r1 = 0;
    g1 = c;
    b1 = x;
  } else if (180 <= h && h < 240) {
    r1 = 0;
    g1 = x;
    b1 = c;
  } else if (240 <= h && h < 300) {
    r1 = x;
    g1 = 0;
    b1 = c;
  } else if (300 <= h && h < 360) {
    r1 = c;
    g1 = 0;
    b1 = x;
  }
  // Having obtained RGB, convert channels to hex
  r1 = Math.round((r1 + m) * 255).toString(16);
  g1 = Math.round((g1 + m) * 255).toString(16);
  b1 = Math.round((b1 + m) * 255).toString(16);

  // Prepend 0s, if necessary
  if (r1.length == 1) r1 = "0" + r1;
  if (g1.length == 1) g1 = "0" + g1;
  if (b1.length == 1) b1 = "0" + b1;

  return "#" + r1 + g1 + b1;

  //return "hsl(" + h + "," + s + "%," + l + "%)";
}
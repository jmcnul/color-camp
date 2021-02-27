
let chroma  =module.exports = function Chroma(H) {
  let r = 0,
    g = 0,
    b = 0;
  if (H.length == 7) {
    r = "0x" + H[1] + H[2];
    console.log(r);
    g = "0x" + H[3] + H[4];
    console.log(g);
    b = "0x" + H[5] + H[6];
    console.log(g);
  }
  lum = Math.sqrt(0.241 * r + 0.691 * g + 0.068 * b);
  return lum;
}
 let hexToXYZ = module.exports = function hexToXYZ(H){
  let r = 0,
    g = 0,
    b = 0;
  if (H.length == 7) {
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  if(r>.04045){
    r =((r+0.055)/1.055)**2.4;
  }else r=r/12.92;
  if(g>.04045){
    g =((g+0.055)/1.055)**2.4;
  }else g=g/12.92;
  if(b>.04045){
    b =((b+0.055)/1.055)**2.4;
  }else b=b/12.92;
  r = r*100;
  g = g*100;
  b = b*100;
  x = (r*0.4124)+(g*0.3576)+(b*0.1805);
  y = (r*0.2126)+(g*0.7152)+(b*0.0722);
  z = (r*0.0193)+(g*0.1192)+(b*0.9505);
  
  return xyz =  `(${x}, ${y}, ${z})`;
}
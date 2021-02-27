
let hexToRGB = module.exports  = function hexToRGB(H) {
    let r = 0,
    g = 0,
    b = 0;
    r =  H[1] + H[2];
    r = parseInt(r, 16);
    g =  H[3] + H[4];
    g = parseInt(g, 16);
    b =  H[5] + H[6];
    b = parseInt(b, 16);
    
  return rgb = `(${r}, ${g}, ${b})`;
}
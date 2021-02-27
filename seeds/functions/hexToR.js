let hexToR = module.exports = function hexToR(H) {
  let r=0;  
  r =  H[1] + H[2];
    r = parseInt(r, 16);
    return r ;
}
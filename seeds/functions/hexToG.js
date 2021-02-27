let hexToG = module.exports =  function hexToG(H) {
  let g = 0;
    g =  H[3] + H[4];
    g = parseInt(g, 16);
    return g;
}
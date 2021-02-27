let hexToB = module.exports = function hexToB(H) {
    let b = 0;
    b =  H[5] + H[6];
    b = parseInt(b, 16);
    return b;
}
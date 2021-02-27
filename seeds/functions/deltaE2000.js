function degrees(n) { return n*(180/Math.PI); }
function radians(n) { return n*(Math.PI/180); }
function hp_f(x,y) //(7)
{
  if(x === 0 && y === 0) return 0;
  else{
    var tmphp = degrees(Math.atan2(x,y));
    if(tmphp >= 0) return tmphp
    else           return tmphp + 360;
  }
}
function dhp_f(C1, C2, h1p, h2p) //(10)
{
  if(C1*C2 === 0)              return 0;
  else if(Math.abs(h2p-h1p) <= 180) return h2p-h1p;
  else if((h2p-h1p) > 180)     return (h2p-h1p)-360;
  else if((h2p-h1p) < -180)    return (h2p-h1p)+360;
  else                         throw(new Error());
}
function a_hp_f(C1, C2, h1p, h2p) { //(14)
  if(C1*C2 === 0)                                     return h1p+h2p
  else if(Math.abs(h1p-h2p)<= 180)                         return (h1p+h2p)/2.0;
  else if((Math.abs(h1p-h2p) > 180) && ((h1p+h2p) < 360))  return (h1p+h2p+360)/2.0;
  else if((Math.abs(h1p-h2p) > 180) && ((h1p+h2p) >= 360)) return (h1p+h2p-360)/2.0;
  else                                                throw(new Error());
}
function CIELAB2000 (color1, color2){
let L1 = color1.l1;
let a1 = color1.a1;
let b1 = color1.b1;

let L2 = color2.l1;
let a2 = color2.a1;
let b2 = color2.b1;

let kL = 1;
let kC = 1;
let kH = 1;

let C1 = Math.sqrt(Math.pow(a1, 2) + Math.pow(b1, 2))
let C2 = Math.sqrt(Math.pow(a2, 2) + Math.pow(b2, 2))

let a_C1_C2 = (C1 + C2)/2.0

let g = 0.5 * (1- Math.sqrt(Math.pow(a_C1_C2, 7)/(Math.pow(a_C1_C2, 7) + Math.pow(25.0, 7))));
let a1p = (1.0 + g) * a1
let a2p = (1.0 + g) * a2

let C1p = Math.sqrt(Math.pow(a1p, 2) + Math.pow(b1, 2));
let C2p = Math.sqrt(Math.pow(a2p, 2) + Math.pow(b2, 2));

let h1p = hp_f(b1, a1p);
let h2p = hp_f(b2, a2p);

let dLp = L2 - L1;
let dCp = C2p - C1p;

let dhp = dhp_f(C1, C2, h1p, h2p);
let dHp = 2 * Math.sqrt(C1p*C2p)* Math.sin(radians(dhp)/2.0);

var a_L = (L1 + L2) / 2.0;
var a_Cp = (C1p + C2p) / 2.0;

let a_hp = a_hp_f(C1,C2,h1p,h2p); //(14)
let T = 1-0.17*Math.cos(radians(a_hp-30))+0.24*Math.cos(radians(2*a_hp))+
  0.32*Math.cos(radians(3*a_hp+6))-0.20*Math.cos(radians(4*a_hp-63)); //(15)
var d_ro = 30 * Math.exp(-(Math.pow((a_hp-275)/25,2))); //(16)
var RC = Math.sqrt((Math.pow(a_Cp, 7.0)) / (Math.pow(a_Cp, 7.0) + Math.pow(25.0, 7.0)));//(17)
var SL = 1 + ((0.015 * Math.pow(a_L - 50, 2)) /
              Math.sqrt(20 + Math.pow(a_L - 50, 2.0)));//(18)
var SC = 1 + 0.045 * a_Cp;//(19)
var SH = 1 + 0.015 * a_Cp * T;//(20)
var RT = -2 * RC * Math.sin(radians(2 * d_ro));//(21)
var dE = Math.sqrt(Math.pow(dLp /(SL * kL), 2) + Math.pow(dCp /(SC * kC), 2) +
              Math.pow(dHp /(SH * kH), 2) + RT * (dCp /(SC * kC)) *
              (dHp / (SH * kH))); //(22)
return dE;}
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ColorSchema = new Schema({
 name: String,
 image: String,
 description: String,
 price: Number,
 hexvalue: String,
 rgbvalue: String,
 hslvalue: String,
 chroma: String,
 comp: String,
 LAB: String,
 XYZ: String,
 analog1: String,
 analog2: String,
 r: Number,
 g: Number,
 b: Number,
 h: Number,
 s: Number,
 l: Number,
 splitComp1: String,
 splitComp2: String,
 country: String,
 administrativeArea: String,
 city: String,
 population: Number
})
ColorSchema.methods.HexToRGB = function(hexvalue){
let r = 0,
    g = 0,
    b = 0;
    r =  hexvalue[1] + hexvalue[2];
    r = parseInt(r, 16);
    g =  hexvalue[3] + hexvalue[4];
    g = parseInt(g, 16);
    b =  hexvalue[5] + hexvalue[6];
    b = parseInt(b, 16);
    
  return rgb = `(${r}, ${g}, ${b})`;
}
let color1 = 
module.exports = mongoose.model('Color', ColorSchema)
/* class Color {
 constructor (name, rgb){
  
  this.redDiff = 255- this.red;
  this.greenDiff = 255- this.green;
  this.bluediff = 255- this.blue;
  this.sum = (this.red + this.green + this.blue);
  this.percentRed = (this.red/this.sum);
  this.percentGreen = (this.green/this.sum);
  this.percentBlue = (this.blue/this.sum);
  this.redCapacity = (this.red/255);
  this.greenCapacity = (this.green/255);
  this.blueCapacity = (this.blue/255);

 } */
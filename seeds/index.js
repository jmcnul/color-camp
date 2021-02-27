const mongoose = require('mongoose');
const hexToRGB = require('./functions/hexToRGB');
const hexToHSL = require('./functions/hexToHSL');
const chroma = require('./functions/chroma');
const hexToComp = require('./functions/hexToComp');
const hexToXYZ = require('./functions/hexToXYZ');
const hexToLAB = require('./functions/hexToLAB');
const hexToAnalog1 = require('./functions/hexToAnalog1');
const hexToAnalog2 = require('./functions/hexToAnalog2');
const hexToR = require('./functions/hexToR');
const hexToG = require('./functions/hexToG');
const hexToB = require('./functions/hexToB');
const hexToH = require('./functions/hexToH');
const hexToS = require('./functions/hexToS');
const hexToL = require('./functions/hexToL');
const hexToSplitComp1 = require('./functions/hexToSplitComp1');
const hexToSplitComp2 = require('./functions/hexToSplitComp2');
const cities = require('./cities');
const colorValues = require('./colorValues')
//const { places, descriptors } = require('./seedHelpers');
const Color = require('../models/color');

mongoose.connect('mongodb://localhost:27017/color-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Color.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*40 )+10;
        const color = new Color({
            country: `${cities[random1000].country}`,
            administrativeArea: `${cities[random1000].administrative}`,
            city: `${cities[random1000].city}` ,
            population: `${cities[random1000].population}`,
            name: `${colorValues[random1000].name}`,
            image: 'https://source.unsplash.com/collection/395791',
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
            hexvalue: `${colorValues[random1000].hexvalue}`,
            rgbvalue: hexToRGB(`${colorValues[random1000].hexvalue}`),
            hslvalue: hexToHSL(`${colorValues[random1000].hexvalue}`),
            chroma: chroma(`${colorValues[random1000].hexvalue}`),
            comp: hexToComp(`${colorValues[random1000].hexvalue}`),
            LAB: hexToLAB(`${colorValues[random1000].hexvalue}`),
            XYZ: hexToXYZ(`${colorValues[random1000].hexvalue}`),
            analog1: hexToAnalog1(`${colorValues[random1000].hexvalue}`),
            analog2: hexToAnalog2(`${colorValues[random1000].hexvalue}`),
            r: hexToR(`${colorValues[random1000].hexvalue}`),
            g: hexToG(`${colorValues[random1000].hexvalue}`),
            b: hexToB(`${colorValues[random1000].hexvalue}`),
            h: hexToH(`${colorValues[random1000].hexvalue}`),
            s: hexToS(`${colorValues[random1000].hexvalue}`),
            l: hexToL(`${colorValues[random1000].hexvalue}`),
            splitComp1: hexToSplitComp1(`${colorValues[random1000].hexvalue}`),
            splitComp2: hexToSplitComp2(`${colorValues[random1000].hexvalue}`),
            price
        })
        await color.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
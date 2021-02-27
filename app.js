const express = require('express');
const path = require('path');
const mongoose = require('mongoose')
const methodOverride = require('method-override');
const Color = require('./models/color');
//const { name } = require('ejs');
const chroma = require('chroma-js');
const ejsMate = require("ejs-mate")
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');





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

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res)=>{
 res.render('home');
})
/* app.get('/makecolor', async (req, res)=>{
 const color = new Colorground({name: '100 mph', hexvalue: "c93f38"})
 await color.save();
 res.send(color);
}) */
app.get('/colors', catchAsync(async (req, res)=>{
 const colors = await Color.find({});
 res.render('colors/index', {colors})
}));

app.get('/colors/new', (req, res)=>{
 res.render('colors/new');
})
app.post('/colors', catchAsync(async (req, res, next)=>{
   
 const color = new Color (req.body.color);
 await color.save();
 res.redirect(`/colors/${color._id}`)
 
}))
app.get('/colors/:id', catchAsync (async (req, res)=>{
 const color = await Color.findById(req.params.id)
 res.render('colors/show', {color});
}))
app.get('/colors/:id/edit', catchAsync(async (req, res)=>{
 const color = await Color.findById(req.params.id)
 res.render('colors/edit', {color});
}))
app.put('/colors/:id', catchAsync(async (req, res)=>{
    const {id} = req.params;
    const color = await Color.findByIdAndUpdate(id, {...req.body.color});
    res.redirect(`/colors/${color._id}`)
}))
app.delete('/colors/:id', catchAsync(async(req, res)=>{
    const {id} = req.params;
    const color = await Color.findByIdAndDelete(id);
    res.redirect('/colors');
}))
/* app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
}); */

app.use((err, req, res, next)=>{
    const {statusCode = 500, message = 'Something went wrong'} = err;
    res.status(statusCode).send(message);
})
app.all('*', (req, res, next)=>{
    next(new ExpressError('Page Not Found', 404))
})

/* app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Something wrong' } = err;
    //if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).send('error', { err })
})
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
}) */
app.listen(3000, ()=>{
 console.log("listen in on port 3000");
})
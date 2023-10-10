const express = require('express');
const app = express();
const mongoose = require('mongoose');//db
const router = require('./routes/product-routes');// product router
const userRouter = require('./routes/user-routes');//user router
const bodyParser = require('body-parser'); //help with passing info to form
const session = require('express-session');// used for user auth 
const flash = require('connect-flash');// flash message
const methodOverride = require('method-override');// middleware helps with updating 
const passport = require('passport');// signin sign up strategies
const passportSetup = require('./Auth/passport');

app.set('view engine', 'ejs');// embedded js

app.use(express.static('node_module'));
app.use(express.static('uploads'));
app.use(express.static('public'));

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/productDB');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(session({
    secret:'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60000 * 20}
}))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
app.get('*', (req, res, next)=>{
    res.locals.user = req.user || null
    next()
})

app.use(express.urlencoded({exteded: true}));
app.use(methodOverride('_method', {methods: ['POST', 'GET']}));
app.use('/', router);
app.use('/', userRouter);

app.listen(2222, ()=> console.log('express is listening on port 2222.'));
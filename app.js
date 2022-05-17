const express = require('express')
const mongoose = require('mongoose')
const app = express()
const flash = require('express-flash')  // for showing login error messages
const session = require('express-session')  // for managing user sessions
require('dotenv/config')
const passport = require('./passport.js')

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology: true})
.then(()=>console.log('MongoDB Connected...'))
.catch(err=>console.log(err))

// Set your app up as an express app

const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'))

const exphbs = require('express-handlebars') 

app.engine('hbs', exphbs.engine({      // configure Handlebars 
    defaultlayout: 'main', 
    extname: 'hbs' 
})) 
 
app.set('view engine', 'hbs')   // set Handlebars view engine

const indexRouter = require('./routes/index')
const mongoClient = require('./models/db.js')
app.use(
    session({
        // The secret used to sign session cookies (ADD ENV VAR)
        secret: process.env.SESSION_SECRET || 'keyboard cat',
        name: 'users', // The cookie name (CHANGE THIS)
        saveUninitialized: false,
        resave: false,
        proxy: process.env.NODE_ENV === 'production', //  to work on Heroku
        cookie: {
            sameSite: 'strict',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 300000 // sessions expire after 5 minutes
        },
    })
)

app.use(passport.authenticate('session'))
app.use(flash());
// Set up to handle POST requests
app.use(express.json())     // needed if POST data is in JSON format

// app.use(express.urlencoded())  // only needed for URL-encoded input


app.use('/', indexRouter)

// probably will change route to user_id
// Note: Change me Later
/*
app.get('/', (req,res) => { 
    res.render('index.hbs') 
})
*/
app.listen(3000,()=>{
    console.log('App listenting to port 3000')
})
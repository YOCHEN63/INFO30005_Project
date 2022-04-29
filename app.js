const express = require('express')
const mongoose = require('mongoose')
require('dotenv/config')
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology: true})
.then(()=>console.log('MongoDB Connected...'))
.catch(err=>console.log(err))

// Set your app up as an express app
const app = express()
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

// Set up to handle POST requests
app.use(express.json())     // needed if POST data is in JSON format

// app.use(express.urlencoded())  // only needed for URL-encoded input


app.use('/', indexRouter)

app.get('/', (req,res) => { 
    res.render('index.hbs') 
})




app.listen(3000,()=>{
    console.log('App listenting to port 3000')
})
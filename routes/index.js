const express = require('express')
const router = express.Router()
const schemas = require('../models/User.js')

router.get('/',async(req,res,next)=>{
    let user = shcemas.user;

    let userResult = await user.find({}).exec((err, userData)=>{
        if (userData){
            res.render('index',{data:userData})
        }
    })
})
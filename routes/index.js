const express = require('express')
const router = express.Router()
const schemas = require('../models/User.js')


router.get('/',async(req,res,next)=>{
    var UserModel = schemas.user;
    doc = new UserModel({
        first_name: 'Yixuan',
        last_name: 'Chen',
        img: 'null',
        e_mail: 'yochen@student.unimelb.edu.au',
        password: '114514',
    })
    doc.save();
    console.log("saved")
})

module.exports = router
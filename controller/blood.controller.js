const mongoose = require('mongoose')
const generalModel = require('../models/User')
const myUser = generalModel.user
const bloodGlucose = generalModel.bloodGlucose

/*request for user data */

const reqData = async (req, res) => {
    try {
        const reqBody = await myUser.findOne({"first_name":"Yixuan"}).lean()
        if (!reqBody){
            return res.sendStatus(404)
        }
        console.log('found userData')
        return res.render('index',{data:reqBody})
    } catch (err) {
        return next(err)
    }
    
}

const addData = async (req, res) => {
    try {
        const document = await bloodGlucose(req.body)
        await document.save()
        res.redirect('/')
    }catch (err){
        return res.render('error', {error: err})
    }
}

module.exports.insert = addData;
module.exports.find = reqData;
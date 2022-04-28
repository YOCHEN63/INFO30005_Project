const mongoose = require('mongoose')
const generalModel = require('../models/User')
const myUser = generalModel.user
const bloodGlucose = generalModel.bloodGlucose
const exercise = generalModel.exercise
const insulin = generalModel.insulin
const weight = generalModel.weight

/*request for user data */

const reqUserData = async (req, res) => {
    try {
        const reqBody = await myUser.findOne({"first_name":"Yixuan"}).lean()
        const bgl_data = await bloodGlucose.findOne({"user_id":'6266f45c3c62e10a62e038f4'}).lean()
        const weight_data = await weight.findOne({"user_id":'6266f45c3c62e10a62e038f4'}).lean()
        const exercise_data = await exercise.findOne({"user_id":'6266f45c3c62e10a62e038f4'}).lean()
        const insulin_data = await insulin.findOne({"user_id":'6266f45c3c62e10a62e038f4'}).lean()
        if (!reqBody){
            return res.sendStatus(404)
        }
        console.log('found userData')
        return res.render('index',{data:reqBody,bgl_data:fixed_bgl,exercise_data:exercise_data,insulin_data:insulin_data,weight_data:weight_data})
    } catch (err) {
        return next(err)
    }
    
}


const addData = async (req, res) => {
    try {
        const document = new bloodGlucose({
            "user_id":'6266f45c3c62e10a62e038f4',
            "blood_glucose_level":req.body.blood_glucose_level,
            "comment":req.body.comment
        })
        console.log(req.params.comment)
        await document.save()
        res.redirect('/')
    }catch (err){
        return res.render('error', {error: err})
    }
}

module.exports.insert = addData;
module.exports.find = reqUserData;
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
        const reqBody = await myUser.findOne({"first_name":"Pat"}).lean()
        const bgl_data = await bloodGlucose.findOne({"user_id":'6266f45c3c62e10a62e038f4'}).lean()
        const weight_data = await weight.findOne({"user_id":'6266f45c3c62e10a62e038f4'}).lean()
        const exercise_data = await exercise.findOne({"user_id":'6266f45c3c62e10a62e038f4'}).lean()
        const insulin_data = await insulin.findOne({"user_id":'6266f45c3c62e10a62e038f4'}).lean()
        if (!reqBody){
            return res.sendStatus(404)
        }
        console.log('found userData')
        return res.render('index',{data:reqBody,bgl_data:bgl_data,exercise_data:exercise_data,insulin_data:insulin_data,weight_data:weight_data})
    } catch (err) {
        return next(err)
    }
    
}

const reqDocData = async (req, res) => {
    try {
        const docData = await myUser.findOne({"_id":'626260ca24f9653799b8b340'}).lean()
        const patientData = await myUser.find({"clinicianID":'626260ca24f9653799b8b340'}).lean()
        console.log('doc log in')
        return res.render('clinician_home',{docData:docData,patientData:patientData})
    } catch (err) {
        return next(err)
    }
    
}

const reqDocPatientData = async (req, res) => {
    try {
        const onePatient = await myUser.findOne({"user_id":'626260ca24f9653799b8b340'}).lean()
        console.log('doc view data')
        return res.render('clinician_view_patient')
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
        
        await document.save()
        
        console.log("data saved")
        return res.redirect('/')
    }catch (err){
        return console.error(err)
    }
}

module.exports.find_doc_patient = reqDocPatientData;
module.exports.find_doc = reqDocData;
module.exports.insert = addData;
module.exports.find = reqUserData;
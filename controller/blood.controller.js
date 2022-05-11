const mongoose = require('mongoose')
const generalModel = require('../models/User')
const express = require('express')
const moment = require('moment');
const { stringify } = require('nodemon/lib/utils')
const { user } = require('../models/User')
const render = express.render
const myUser = generalModel.user
const bloodGlucose = generalModel.bloodGlucose
const exercise = generalModel.exercise
const insulin = generalModel.insulin
const weight = generalModel.weight
const threshold = generalModel.threshold
/*request for user data */

const reqUserData = async (req, res) => {
    
    try {
        const now = new Date()
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const reqBody = await myUser.findOne({"first_name":"Pat"}).lean()

        /* find only today's newly update date to render*/

        var bgl_data = await bloodGlucose.findOne({$and:[{"user_id":'6266f45c3c62e10a62e038f4'},
            {"record_date": {$gte: ["record_date",startOfToday]}}]}).sort({"record_date": -1}).lean()
        var weight_data = await weight.findOne({$and:[{"user_id":'6266f45c3c62e10a62e038f4'},
            {"record_date": {$gte: ["record_date",startOfToday]}}]}).sort({"record_date": -1}).lean()
        var exercise_data = await exercise.findOne({$and:[{"user_id":'6266f45c3c62e10a62e038f4'},
            {"record_date": {$gte: ["record_date",startOfToday]}}]}).sort({"record_date": -1}).lean()
        var insulin_data = await insulin.findOne({$and:[{"user_id":'6266f45c3c62e10a62e038f4'},
            {"record_date": {$gte: ["record_date",startOfToday]}}]}).sort({"record_date": -1}).lean()
        /* if no data found, initilise table*/
        if (weight_data == null){
            let weight_null = new weight({
                "user_id":'6266f45c3c62e10a62e038f4',
                "weight":"--",
                "comment":"not recorded yet"
            })
            weight_data = weight_null.toObject()
        }
        
        if (bgl_data == null){
            let bgl_null = new bloodGlucose({
                "user_id":'6266f45c3c62e10a62e038f4',
                "blood_glucose_level":"--",
                "comment":"not recorded yet"
            })
            bgl_data = bgl_null.toObject()
        }
        if (exercise_data == null){
            let exercise_null = new exercise({
                "user_id":'6266f45c3c62e10a62e038f4',
                "walk_steps":"--",
                "comment":"not recorded yet"
            })
            exercise_data = exercise_null.toObject()
        }
        if (insulin_data == null){
            
            let insulin_null = new insulin({
                "user_id":'6266f45c3c62e10a62e038f4',
                "insulin_shots":"--",
                "comment":"not recorded yet"
            })
            insulin_data = insulin_null.toObject()
        }
        
        if (!reqBody){
            return res.sendStatus(404)
        }
        return res.render('index',{data:reqBody,bgl_data:bgl_data,exercise_data:exercise_data,insulin_data:insulin_data,weight_data:weight_data, moment: moment })
    } catch (err) {
        return console.error(err)
    }
    
    
}

/* update threshold value */
const updateThreshold = async (req, res) => {
    let max = 10000
    let min = 0

    const body = req.body
    const dataType = Object.keys(body)[0]
    let updatetype = ""
    if(dataType === 'bgl_upper'){
        max = body.bgl_upper
        min = body.bgl_lower
       
    }
    if(dataType === 'exercise_upper'){
        max = body.exercise_upper
        min = body.exercise_lower
        
    }
    if(dataType === 'insulin_upper'){
        max = body.insulin_upper
        min = body.insulin_lower
        
    }
    if(dataType === 'weight_upper'){
        max = body.weight_upper
        min = body.weight_lower
        
    }
    /* check if threshold is entered in wrong range (max larger than min)*/
    if (min - max > 0){
        let temp = max
        max = min
        min = temp
        
    }
    try {
        if(dataType === 'bgl_upper'){
            await user.findByIdAndUpdate(req.params.user_id,{bgl_up: max, bgl_down:min})
        }
        else if(dataType === 'exercise_upper'){
            await user.findByIdAndUpdate(req.params.user_id,{exercise_up: max, exercise_down:min})
        }
        else if(dataType === 'insulin_upper'){
            await user.findByIdAndUpdate(req.params.user_id,{insulin_up: max, insulin_down:min}) 
        }
        else if(dataType === 'weight_upper'){
            await user.findByIdAndUpdate(req.params.user_id,{weight_up: max, weight_down:min}) 
        }
        console.log('saved')
        res.redirect("/clinician/"+req.params.user_id)
    } catch (err) {
        console.error(err)
    }

}


const reqLatestData = async (user_id) => {
    /* find data from today */
    try {
        const now = new Date()
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        var bgl_doc = await bloodGlucose.findOne({$and:[{"user_id": user_id},
            {"record_date": {$gte: ["record_date",startOfToday]}}]}).sort({"record_date": -1},).lean()
        /* replace null data to useful ones */
        if(bgl_doc != null) {
            if(bgl_doc.hasOwnProperty('blood_glucose_level')) {
                var bgl_data = bgl_doc.blood_glucose_level
            }
        } else {
            var bgl_data = '--'
        }
        var weight_doc = await weight.findOne({$and:[{"user_id": user_id},
            {"record_date": {$gte: ["record_date",startOfToday]}}]}).sort({"record_date": -1}).lean()
        if (weight_doc != null) {
            if(weight_doc.hasOwnProperty('weight')) {
                var weight_data = weight_doc.weight
            }
        } else {
            var weight_data = '--'
        }
        var exercise_doc = await exercise.findOne({$and:[{"user_id": user_id},
            {"record_date": {$gte: ["record_date",startOfToday]}}]}).sort({"record_date": -1},).lean()
        if(exercise_doc != null) {
            if(exercise_doc.hasOwnProperty('walk_steps')) {
               var exercise_data = exercise_doc.walk_steps
            }
        } else {
            var exercise_data = '--'
        }
        var insulin_doc = await insulin.findOne({$and:[{"user_id": user_id},
            {"record_date": {$gte: ["record_date",startOfToday]}}]}).sort({"record_date": -1}).lean()
        if(insulin_doc != null) {    
            if(insulin_doc.hasOwnProperty('insulin_shots')) {
                var insulin_data = insulin_doc.insulin_shots
            }
        } else {
            var insulin_data = '--'
        }
        return {"_id":user_id,"bloodGlucose": bgl_data, "weight": weight_data, "insulin": insulin_data, "exercise": exercise_data}
    } catch (err) {
        console.error(err)
    }
}

/* doc page*/
const reqDocData = async (req, res, next) => {
    try {
        /* fin doc and his patient*/
        const docData = await myUser.findOne({"_id":'626260ca24f9653799b8b340'}).lean()
        const patientData = await myUser.find({"clinicianID":'626260ca24f9653799b8b340'}).lean()
        console.log('doc log in')
        var dataSet = [];
        for(var i = 0; i < patientData.length; i++){
            var objectId = stringify(patientData[i]._id);
            var data = await reqLatestData(objectId);
            patientData[i] = Object.assign(patientData[i], data);
            console.log('get data for patient');
        }
        console.log(data)
        res.render('clinician_home',{docData:docData,patientData:patientData});
    } catch (err) {
        return next(err)
    }
    
}

const reqDocPatientData = async (req, res) => {
    try {
        /* find data of one specific patient*/
        const onePatient = await myUser.findById(req.params.user_id).lean()
        var bgl_data = await bloodGlucose.find({"user_id":req.params.user_id}).sort({"record_date": -1}).lean()
        var weight_data = await weight.find({"user_id":req.params.user_id}).sort({"record_date": -1}).lean()
        var exercise_data = await exercise.find({"user_id":req.params.user_id}).sort({"record_date": -1}).lean()
        var insulin_data = await insulin.find({"user_id":req.params.user_id}).sort({"record_date": -1}).lean()
        console.log('doc view data')
        return res.render('clinician_view_patient',{layout:'clinician_view_layout',onePatient:onePatient,
                        bgl_data:bgl_data,exercise_data:exercise_data,insulin_data:insulin_data,weight_data:weight_data})
    } catch (err) {
        return next(err)
    }
    
}

/* patient home add data*/
const addData = async (req, res) => {
    try {
        /* get the entered data*/
        const body = req.body
        const dataType = Object.keys(body)[0]
        console.log(dataType)
        /* put them into table and store*/
        if (dataType === 'weight') {
            const weightData = new weight({
                'weight' : body.weight,
                'user_id': '6266f45c3c62e10a62e038f4',
                'comment': body.comment
            })
            weightData.save()
        } else if (dataType === 'blood_glucose_level') {
            const bloodGlucoseData = new bloodGlucose({
                'blood_glucose_level' : body.blood_glucose_level,
                'user_id': '6266f45c3c62e10a62e038f4',
                'comment': body.comment
            })
            bloodGlucoseData.save()
        } else if (dataType === 'walk_steps') {
            const exerciseData = new exercise({
                'walk_steps' : body.walk_steps,
                'user_id': '6266f45c3c62e10a62e038f4',
                'comment': body.comment
            })
            
            exerciseData.save()
            
        } else if (dataType === 'insulin_shots') {
            const insulinData = new insulin({
                'insulin_shots' : body.insulin_shots,
                'user_id': '6266f45c3c62e10a62e038f4',
                'comment': body.comment
            })
            console.log(insulinData)
            insulinData.save()
        }
        console.log("data saved")
        return res.redirect('/')
    }catch (err){
        return console.error(err)
    }
}
/* find the selected patient history data*/
const patientViewData = async (req, res, next) => {
    try {
        /* find all data sort by date*/
        var bgl_data = await bloodGlucose.find({"user_id":'6266f45c3c62e10a62e038f4'}).sort({"record_date": -1}).lean()
        var weight_data = await weight.find({"user_id":'6266f45c3c62e10a62e038f4'}).sort({"record_date": -1}).lean()
        var exercise_data = await exercise.find({"user_id":'6266f45c3c62e10a62e038f4'}).sort({"record_date": -1}).lean()
        var insulin_data = await insulin.find({"user_id":'6266f45c3c62e10a62e038f4'}).sort({"record_date": -1}).lean()
        res.render('patient_view_data',{bgl_data:bgl_data,exercise_data:exercise_data,insulin_data:insulin_data,weight_data:weight_data});
    } catch (err) {
        return next(err)
    }
    
}

/* home page */
const about_diabetes =  (req, res) => {
    res.render('about_diabetes.hbs',{layout:'about_diabetes_layout'}) 
}

/* about-us */
const about_us =  (req, res) => {
    res.render('about_us.hbs',{layout:'about_us_layout'}) 
}

const login =  (req, res) => {
    res.render('login.hbs',{layout:'login_layout'}) 
}

module.exports.login = login
module.exports.home = about_diabetes
module.exports.about_us = about_us
module.exports.view_data = patientViewData
module.exports.find_doc_patient = reqDocPatientData;
module.exports.find_doc = reqDocData;
module.exports.insert = addData;
module.exports.find = reqUserData;
module.exports.reqLatestData = reqLatestData;
module.exports.edit_threshold = updateThreshold
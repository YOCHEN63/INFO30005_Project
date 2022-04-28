const mongoose = require('mongoose')
const generalModel = require('../models/User')
const express = require('express')
const { stringify } = require('nodemon/lib/utils')
const render = express.render
const myUser = generalModel.user
const bloodGlucose = generalModel.bloodGlucose
const exercise = generalModel.exercise
const insulin = generalModel.insulin
const weight = generalModel.weight
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
        return res.render('index',{data:reqBody,bgl_data:bgl_data,exercise_data:exercise_data,insulin_data:insulin_data,weight_data:weight_data})
    } catch (err) {
        return console.error(err)
    }
    
    
}

/* find the newest data from user*/
const reqLatestData = async (user_id) => {
    try {
        const now = new Date()
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        var bgl_doc = await bloodGlucose.findOne({$and:[{"user_id": user_id},
            {"record_date": {$gte: ["record_date",startOfToday]}}]}).sort({"record_date": -1},).lean()
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
    /* if no data found, initilise table*/
        return {"_id":user_id,"bloodGlucose": bgl_data, "weight": weight_data, "insulin": insulin_data, "exercise": exercise_data}
    } catch (err) {
        console.error(err)
    }
}

const reqDocData = async (req, res, next) => {
    try {
        const docData = await myUser.findOne({"_id":'626260ca24f9653799b8b340'}).lean()
        const patientData = await myUser.find({"clinicianID":'626260ca24f9653799b8b340'}).lean()
        console.log('doc log in')
        var dataSet = [];
        for(var i = 0; i < patientData.length; i++){
            var objectId = stringify(patientData[i]._id);
            var data = await reqLatestData(objectId);
            dataSet[i] = data;
            console.log('get data for patient');
        }
        console.log(data)
        res.render('clinician_home',{docData:docData,patientData:patientData,dataSet:dataSet});
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
        return res.render('clinician_view_patient',{onePatient:onePatient,bgl_data:bgl_data,exercise_data:exercise_data,insulin_data:insulin_data,weight_data:weight_data})
    } catch (err) {
        return next(err)
    }
    
}


const addData = async (req, res) => {
    try {
        const body = req.body
        const dataType = Object.keys(body)[0]
        console.log(dataType)
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

module.exports.find_doc_patient = reqDocPatientData;
module.exports.find_doc = reqDocData;
module.exports.insert = addData;
module.exports.find = reqUserData;
module.exports.reqLatestData = reqLatestData;
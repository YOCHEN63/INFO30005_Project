const express = require('express');
const models = require('../models/User')
const user = models.user
const bloodGlucose = models.bloodGlucose
const exercise = models.exercise
const insulin = models.insulin
const weight = models.weight


const reqComment = async (req, res, next) => {
    const query = {
        path : 'user_id',
        select : 'clinicianID',
        match : {clinicianID : '626260ca24f9653799b8b340'}
    }
    // const docData = await user.findOne({"_id":req.user}).lean()
    let bgl_comments =  await bloodGlucose.find().populate(query).lean()
    bgl_comments.forEach((elem, index) =>{
        elem.dataType = 'blood glucose level'
    })
    let exercise_comments = await exercise.find().populate(query).lean()
    exercise_comments.forEach((elem, index) =>{
        elem.dataType = 'exercise'
    })
    let insulin_comments =  await insulin.find().populate(query).lean()
    insulin_comments.forEach((elem, index) =>{
        elem.dataType = 'insulin shots'
    })
    let weight_comments = await weight.find().populate(query).lean()
    weight_comments.forEach((elem, index) =>{
        elem.dataType = 'weight'
    })

    var result = bgl_comments.concat(exercise_comments).concat(weight_comments).concat(insulin_comments)
    /*
    result.sort(dateData('record_date',false))
    */
    console.log(result)
    res.render('clinician_view_patient', {all_comments : result,docData:docData})
    

    /*
    function dateData(property, bol) {
        function(a, b) {
            var value1 = a[property];
            var value2 = b[property];
            if (bol) {

                return Date.parse(value1) - Date.parse(value2);
            } else {
                return Date.parse(value2) - Date.parse(value1)
            }
    
        }
    }
    */
}

module.exports.reqComment = reqComment


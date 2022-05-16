const express = require('express');
const models = require('../models/User')
const user = models.user
const bloodGlucose = models.bloodGlucose
const exercise = models.exercise
const insulin = models.insulin
const weight = models.weight


const reqComment = async (req, res, next) => {
    const query = {
        path : 'user',
        select : 'clinicianID',
        match : {clinicianID : req.params.clinician_id}
    }

    let bgl_comments =  bloodGlucose.find().populate(query).lean()
    for(var bgl_comment in bgl_comments) {
        bgl_comment.dataType = 'blood glucose level'
    }
    let exercise_comments =  exercise.find().populate(query).lean()
    for(var exercise_comment in exercise_comments) {
        exercise_comment.dataType = 'exercise'
    }
    let insulin_comments =  insulin.find().populate(query).lean()
    for(var insulin_comment in insulin_comments) {
        insulin_comment.dataType = 'insulin'
    }
    let weight_comments =  weight.find().populate(query).lean()
    for(var weight_comment in weight_comments) {
        weight_comment.dataType = 'weight'
    }

    var result = bgl_comments.concat(exercise_comments).concat(weight_comments).concat(insulin_comments)
    result.sort(dateData('record_date',false))
    res.render('comments', {all_comments : result})


    function dateData(property, bol) {
        return function(a, b) {
            var value1 = a[property];
            var value2 = b[property];
            if (bol) {

                return Date.parse(value1) - Date.parse(value2);
            } else {
                return Date.parse(value2) - Date.parse(value1)
            }
    
        }
    }
 
}

module.exports = reqComment


const express = require('express');
const User = require('../models/User')

const reqComment = async (req, res, next) => {
    let bgl_comments = User.bloodGlucose.find().lean()
    for(var bgl_comment in bgl_comments) {
        bgl_comment.dataType = 'blood glucose level'
    }
    let exercise_comments = User.exercise.find().lean()
    for(var exercise_comment in exercise_comments) {
        exercise_comment.dataType = 'exercise'
    }
    let insulin_comments = User.insulin.find().lean()
    for(var insulin_comment in insulin_comments) {
        insulin_comment.dataType = 'insulin'
    }
    let weight_comments = User.weight.find().lean()
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



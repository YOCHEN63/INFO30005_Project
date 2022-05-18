const express = require('express');
const models = require('../models/User')
const user = models.user
const bloodGlucose = models.bloodGlucose
const exercise = models.exercise
const insulin = models.insulin
const weight = models.weight

// doc page for requesting all users' comments
const reqComment = async (req, res, next) => {
    // formate date
    let options = {
        year: 'numeric', month: 'numeric', day: 'numeric',hour: 'numeric', minute: 'numeric',
        timeZone: 'Australia/Melbourne',
        timeZoneName: 'short'
    }
    // get all users' comments
    const query = {
        path : 'user_id',
        select : 'clinicianID first_name last_name',
        match : {clinicianID : req.user._id}
    }
    const docData = await user.findOne({"_id":req.user._id}).lean()
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
    for(var i = 0; i < result.length; i++) {
        if(result[i].user_id === null){
            result.splice(i, 1)
        }
    }
    // sort the results by date
    result.sort(function(a,b){

        return new Date(b.record_date) - new Date(a.record_date);
      })
    // formate date in result
    if (result){
        for (i=0;i<result.length;i++){
            Object.assign(result[i], { record_date: new Intl.DateTimeFormat('en-AU', options).format(result[i].record_date)})
        }
    }
    res.render('clinician_comments_homepage', {all_comments : result,docData:docData})
}

module.exports.reqComment = reqComment


const mongoose = require('mongoose')
const models = require('../models/User')
const user = models.user
const bloodGlucose = models.bloodGlucose
const exercise = models.exercise
const insulin = models.insulin
const weight = models.weight

const insert = async (req, res, next) => {
    try {
        bloodGlucose = new BloodGlucose( req.body )
        await bloodGlucose.save()
        console.log("data saved")
        return res.redirect('/index')
    } catch (err) {
        return next(err)
    }
}

exports.insert = insert

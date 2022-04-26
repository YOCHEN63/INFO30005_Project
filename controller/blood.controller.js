const mongoose = require('mongoose')
const bloodGlucose = require('../models/bloodGlucose')

const reqData = async (req, res) => {
    const reqBody = await bloodGlucose.find().lean()
    res.render('bloodGlucose', reqBody)
}

module.exports = reqData
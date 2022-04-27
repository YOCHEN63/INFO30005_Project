const mongoose = require('mongoose')
const generalModel = require('../models/User')
const bloodGlucose = generalModel.user


const reqData = async (req, res) => {
    let { id } = req.params
    const reqBody = await bloodGlucose.find(id).lean()
    console.log('found userData')
    return reqBody
}

const addData = async (req, res) => {
    try {
        const document = await bloodGlucose(req.body)
        await document.save()
        res.redirect('/')
    }catch (err){
        return res.render('error', {error: err})
    }
}

exports.insert = addData;
exports.find = reqData;
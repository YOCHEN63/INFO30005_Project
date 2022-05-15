const noteModel = require('../models/note')
const mongoose = require('mongoose')
const { note } = require('../models/User')

const insert = async(res, req, next) => {
    try {   
        let note = new noteModel({
            comment : req.body.comment,
            user_id : req.user
        })
        note.save()
    }catch(err) {
        console.error(err)
    } 
}   

const reqNote = async(res, req, next) => {
    try {
        let noteList = noteModel.find({user_id: req.user.id}).lean()
        return res.render('note')
    }catch(err) {
        return console.error(err)
    }
}

module.exports.insert = insert;
module.exports.reqNote = reqNote;
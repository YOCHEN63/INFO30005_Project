const express = require('express')
const mongoose = require('mongoose')
const model = require('../models/User')
const noteModel = model.note

const insert = async (req, res) => {
    console.log(req.body)
    let note = new noteModel({
        comment: req.body.note,
        user_id: req.params.user_id,
    })
    note.save()
    res.redirect('/clinician/' + req.params.user_id)
}

module.exports.addNote = insert

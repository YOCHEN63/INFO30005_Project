const express = require('express')
const router = express.Router()
const schemas = require('../models/User.js')
const controllers = require('../controller/blood.controller')
const comments = require('../controller/comment')


router.get('/', controllers.find) 
router.get('/login', controllers.login)
router.get('/changePassword', controllers.changePassword)
router.get('/home', controllers.home)
router.get('/about-us', controllers.about_us)
router.get('/view_data', controllers.view_data) 
router.get('/clinician', controllers.find_doc)
router.get('/clinician/comments', comments.reqComment)
router.get('/clinician/:user_id', controllers.find_doc_patient)
router.post('/clinician/:user_id', controllers.edit_threshold)
router.post('/', controllers.insert)
module.exports = router
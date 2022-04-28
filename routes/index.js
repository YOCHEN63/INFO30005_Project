const express = require('express')
const router = express.Router()
const schemas = require('../models/User.js')
const controllers = require('../controller/blood.controller')


router.get('/', controllers.find) 
router.get('/clinician', controllers.find_doc)
router.get('/patientView', controllers.find_doc_patient)
router.get('/:id', controllers.find)
router.post('/', controllers.insert)
module.exports = router
const express = require('express')
const router = express.Router()
const schemas = require('../models/User.js')
const controllers = require('../controller/blood.controller')


router.get('/', controllers.find) 
router.get('/:id', controllers.find)

module.exports = router
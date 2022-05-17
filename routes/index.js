const express = require('express')
const router = express.Router()
const controllers = require('../controller/blood.controller')
const passport = require('../passport.js')

router.get('/',controllers.isAuthenticated, controllers.find) 
router.get('/login', controllers.login)
router.get('/changePassword', controllers.changePassword)
router.get('/home', controllers.home)
router.get('/about-us', controllers.about_us)
router.get('/view_data', controllers.view_data) 
router.get('/clinician',controllers.isAuthenticated, controllers.find_doc)
router.get('/clinician/:user_id', controllers.find_doc_patient)


router.post('/login',
    passport.authenticate('local', { successRedirect: '/',failureRedirect: '/login', failureFlash: true }))

router.post('/clinician/:user_id', controllers.edit_threshold)
router.post('/', controllers.insert)
module.exports = router
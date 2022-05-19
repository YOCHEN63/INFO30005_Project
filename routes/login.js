const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const router = express.Router

const isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login')
    }
    return next()
}

router.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/:userId',
        failureRedirect: '/login',
        failureFlash: true,
    })
)

module.exports = router

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const user = require('../models/User')

passport.use(new LocalStrategy(function (email, password, done){
    let userData = user.find({'email':email}).lean();
    if(email != userData.email){
        return done(null, false, {message: IncorrectEmail})
    }
    if(password != userData.password){
        return done(null, false, {message: IncorrectPassword})
    }

    return done(null, userData)
}))

module.exports = passport


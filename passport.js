const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const generalModel = require('./models/User')
const user = generalModel.user
/*
passport.use(new LocalStrategy({}),function (email, password, done){
    let userData = user.find({'email':email}).lean();
    if(email != userData.email){
        return done(null, false, {message: IncorrectEmail})
    }
    if(password != userData.password){
        return done(null, false, {message: IncorrectPassword})
    }

    return done(null, userData)
})
*/

// Updated serialize/deserialize functions
passport.serializeUser((user, done) => {
    done(undefined, user._id)
})

passport.deserializeUser((userId, done) => {
    user.findById(userId, { password: 0 }, (err, user) => {
        if (err) {
            return done(err, undefined)
        }
        return done(undefined, user)
    })
})

// Set up "local" strategy, i.e. authentication based on username/password. There are other types of strategy too.

passport.use(new LocalStrategy( { usernameField: "email",passwordField: "password"},(email, password, done) => {
    // first, check if there is a user in the db with this username
    user.findOne({email: email}, {}, {}, (err, user) => {
        if (err) { return done(null, false, { message: 'Unknown error.' }) }
        if (!user) { return done(null, false, { message: 'Incorrect username or password.' }) }
    // if there is a user with this username, check if the password matches
    user.verifyPassword(password, (err, valid) => {
      if (err) {  return done(null, false, { message: 'Unknown error.' }) }
      if (!valid) { return done(null, false, { message: 'Incorrect username or password.' }) }
      return done(null, user)
    })
  })
}))

module.exports = passport


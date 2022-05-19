/* login page*/
const express = require('express')
const flash = require('express-flash')

const login = (req, res) => {
    res.render('login.hbs', {
        layout: 'login_layout',
        flash: req.flash('error'),
        title: 'Login',
    })
}

/* change password page*/
const changePassword = (req, res) => {
    res.render('changePassword.hbs', {
        layout: 'changePassword_layout',
        flash: req.flash('msg'),
    })
}
const logOut = (req, res) => {
    req.logout()
    res.redirect('/home')
}

module.exports.login = login
module.exports.logOut = logOut
module.exports.changePassword = changePassword

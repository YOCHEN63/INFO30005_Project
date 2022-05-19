const express = require('express')

/* home page */
const about_diabetes = (req, res) => {
    res.render('about_diabetes.hbs', { layout: 'about_diabetes_layout' })
}

/* about-us */
const about_us = (req, res) => {
    res.render('about_us.hbs', { layout: 'about_us_layout' })
}

module.exports.home = about_diabetes
module.exports.about_us = about_us

const models = require('../models/User');
const userModel = models.user

const changePassword = async (req, res, next) => {
    let user = await userModel.updateOne({user_id : req.body.user_id},{password: req.body.password})
}

const register = async (req, res, next) => {
    try {
        let newUser = await userModel.create({
            first_name : req.body.first_name,
            last_name : req.body.last_name, 
            email: req.body.email,
            password: req.body.password,
            clinicianID: req.params.clinician_id
        })
    } catch (err) {
        console.error(err)
    }


}

module.exports.changePassword = changePassword;
module.exports.register = register;
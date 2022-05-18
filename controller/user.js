const models = require('../models/User');
const userModel = models.user

const changePassword = async (req, res, next) => {
    console.log(req.body)
    console.log(req.body.new_password)
    console.log(req.user._id)
    /*
    let user = await userModel.findOneAndUpdate({user_id : req.user._id},{password: req.body.new_password})
    */
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

const sendMessage = async (req, res) => {
    try {
        let user = await userModel.findByIdAndUpdate(req.body.user_id, {support_message: req.body.support_message})
    } catch (err) {
        console.error(err)
    }
}

module.exports.changePassword = changePassword;
module.exports.register = register;
module.exports.updateMessage = sendMessage;
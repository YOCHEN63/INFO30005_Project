const models = require('../models/User');
const userModel = models.user

const changePassword = async (req, res, next) => {
    const user = await userModel.findOne({"_id":req.user._id}).lean()
    if (req.body.new_password.length<8){
        req.flash('msg', 'wrong password length')
        res.redirect('/changePassword')
    } else if (req.body.new_password !=req.body.confirm_password){
        req.flash('msg', 'wrong password with confirm password')
        res.redirect('/changePassword')
    } else{
        await userModel.findOneAndUpdate({_id : req.user._id},{password: req.body.new_password})
        res.redirect('/login')

    }
  
}

const register = async (req, res, next) => {
    try {
        let newUser = await userModel.create({
            first_name : req.body.first_name,
            last_name : req.body.last_name, 
            email: req.body.email,
            password: req.body.password,
            clinicianID: req.user._id,
            nick_name:req.body.nick_name
        })
        if (req.body.password.length<8){
            req.flash('msg', 'wrong password length');
            res.redirect('back')
        } else {
            newUser.save()
            res.redirect('back')
        }  
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
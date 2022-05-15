const models = require('../models/User');
const userModel = models.user

const changePassword = async (req, res, next) => {
    let user = await userModel.updateOne({user_id : req.body.user_id},{password: req.body.password})
}
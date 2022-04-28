const mongoose = require('mongoose')
const user = require('./User')
const mySchema = mongoose.Schema

const InsulinSchema = new mySchema({
    record_date :{type:Date,default:Date.now},
    insulin_shots : {type:Number,required:true},
    user_id:{type:mySchema.Types.ObjectId,ref:'user'},
    comment:{type:String}
})

const InsulinModel = mongoose.Model("insulin", InsulinSchema)

module.exports = InsulinModel
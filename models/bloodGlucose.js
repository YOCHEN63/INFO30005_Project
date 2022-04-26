const mongoose = require('mongoose')
const User = require('./User')
const mySchema = mongoose.Schema

const BloodGlucoseSchema = new mySchema({
    record_date :{type:Date,default:Date.now},
    blood_glucose_level : {type:Number,required:true},
    user_id:{type:mySchema.Types.ObjectId,ref:'user'},
    comment:{type:String}
})

const BloodGlucoseModel = mongoose.model('BloodGlucose', BloodGlucoseSchema)

module.exports = BloodGlucoseModel
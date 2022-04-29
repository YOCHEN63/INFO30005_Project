const mongoose = require('mongoose')
const User = require('./User')
const mySchema = mongoose.Schema


const ExerciseSchema = new mySchema({
    record_date :{type:Date,default:Date.now},
    walk_steps : {type:Number,required:true},
    user_id:{type:mySchema.Types.ObjectId,ref:'user'},
    comment:{type:String}
})

const ExerciseModel = mongoose.Model('exercise', ExerciseSchema)

module.exports = ExerciseModel
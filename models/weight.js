const mongoose = require('mongoose')
const User = require('./User')
const mySchema = mongoose.Schema


const WeightSchema = new mySchema({
    record_date :{type:Date,default:Date.now},
    weight : {type:Number,required:true},
    user_id:{type:mySchema.Types.ObjectId,ref:'user'},
    comment:{type:String}
})

const WeightModel = mongoose.Model('weight',WeightSchema)

module.exports = WeightModel
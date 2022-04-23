const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    first_name :{
        type:String,
        require: true
    },
    last_name :{
        type:String,
        require: true
    },
    img :{
        type:String,
        require: true
    },
    email :{
        type:String,
        require: true
    },
    password :{
        type:String,
        require: true
    }
})

const BloodGlucoseSchema = new mongoose.Schema({
    record_date :{type:Date,default:Date.now},
    blood_glucose_level : {type:Double,required:true},
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:'user'}
})

const ExerciseSchema = new mongoose.Schema({
    record_date :{type:Date,default:Date.now},
    walk_steps : {type:int64,required:true},
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:'user'}
})

const WeightSchema = new mongoose.Schema({
    record_date :{type:Date,default:Date.now},
    weight : {type:Double,required:true},
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:'user'}
})

const InsulinSchema = new mongoose.Schema({
    record_date :{type:Date,default:Date.now},
    insulin_shots : {type:int64,required:true},
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:'user'}
})

const user = mongoose.model('user',UserSchema,'user')
const exercise = mongoose.model('exercise',ExerciseSchema,'exercise')
const bloodGlucose = mongoose.model('bloodGlucose',BloodGlucoseSchema,'bloodGlucose')
const insulin = mongoose.model('insulin',UserSchema,'insulin')
const weight = mongoose.model('weight',WeightSchema,'weight')
const myschemas = {'user':user,'exercise':exercise,'bloodGlucose':bloodGlucose
    ,'insulin':insulin,'weight':weight}
module.exports = myschemas

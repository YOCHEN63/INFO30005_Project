const mongoose = require('mongoose')

const thresholdSchema = new mongoose.Schema({
    uperBound : Number,
    lowerBound: Number,
})

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
    },
    clinicianID:{
        type:mongoose.Schema.Types.ObjectId,ref:'user'
    },
    BGL_threshold: thresholdSchema,
    exercise_threshold: thresholdSchema,
    insulin_threshold: thresholdSchema,
    weight_threshold: thresholdSchema,
})

const NoteSchema = new mongoose.Schema({
    record_date :{type:Date,default:Date.now},
    comment:{type:String,require:true},
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:'user'}
})

const BloodGlucoseSchema = new mongoose.Schema({
    record_date :{type:Date,default:Date.now},
    blood_glucose_level : {type:Number,required:true},
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    comment:{type:String}
})

const ExerciseSchema = new mongoose.Schema({
    record_date :{type:Date,default:Date.now},
    walk_steps : {type:Number,required:true},
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    comment:{type:String}
})

const WeightSchema = new mongoose.Schema({
    record_date :{type:Date,default:Date.now},
    weight : {type:Number,required:true},
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    comment:{type:String}
})

const InsulinSchema = new mongoose.Schema({
    record_date :{type:Date,default:Date.now},
    insulin_shots : {type:Number,required:true},
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    comment:{type:String}
})

const user = mongoose.model('user',UserSchema,'user')
const note = mongoose.model('note',NoteSchema,'note')
const exercise = mongoose.model('exercise',ExerciseSchema,'exercise')
const bloodGlucose = mongoose.model('bloodGlucose',BloodGlucoseSchema,'bloodGlucose')
const insulin = mongoose.model('insulin',InsulinSchema,'insulin')
const weight = mongoose.model('weight',WeightSchema,'weight')
const threshold = mongoose.model('threshold', thresholdSchema,'threshold')
const myModel = {'user':user,'exercise':exercise,'bloodGlucose':bloodGlucose,'insulin':insulin,'weight':weight,'note':note, 'threshold':threshold}

module.exports = myModel
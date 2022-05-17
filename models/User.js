const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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
    bgl_up: {
        type:Number,
        default: 10000
    },
    bgl_down: {
        type: Number,
        default: 0
    },
    exercise_up: {
        type:Number,
        default: 10000
    },
    exercise_down: {
        type: Number,
        default: 0,
    },
    insulin_up: {
        type:Number,
        default: 10000
    },
    insulin_down: {
        type:Number,
        default: 0,
    },
    weight_up: {
        type:Number,
        default: 10000
    },
    weight_down: {
        type:Number,
        default: 0,
    },
    bgl_req :{
        type:Number,
        default: 1
    },
    weight_req :{
        type:Number,
        default: 1
    },
    exercise_req :{
        type:Number,
        default: 1
    },
    insulin_req :{
        type:Number,
        default: 1
    },
    register_date :{
        type:Date,
        default:Date.now
    },
    nick_name :{
        type:String,
        require: true
    }
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

const MessageSchema = new mongoose.Schema({
    record_date :{type:Date,default:Date.now},
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    comment:{type:String}
})

// password comparison function
UserSchema.methods.verifyPassword = function (password, callback) {
    bcrypt.compare(password, this.password, (err, valid) => {
        callback(err, valid)
    })
}

const SALT_FACTOR = 10

// hash password before saving
UserSchema.pre('save', function save(next) {
    const user = this// go to next if password field has not been modified
    if (!user.isModified('password')) {
        return next()
    }

    // auto-generate salt/hash
    bcrypt.hash(user.password, SALT_FACTOR, (err, hash) => {
        if (err) {
            return next(err)
        }
        //replace password with hash
        user.password = hash
        next()
    })
})

const message = mongoose.model('message',MessageSchema,'message')
const user = mongoose.model('user',UserSchema,'user')
const note = mongoose.model('note',NoteSchema,'note')
const exercise = mongoose.model('exercise',ExerciseSchema,'exercise')
const bloodGlucose = mongoose.model('bloodGlucose',BloodGlucoseSchema,'bloodGlucose')
const insulin = mongoose.model('insulin',InsulinSchema,'insulin')
const weight = mongoose.model('weight',WeightSchema,'weight')
const myModel = {'user':user,'exercise':exercise,'bloodGlucose':bloodGlucose,'insulin':insulin,'weight':weight,'note':note,'message':message}

module.exports = myModel
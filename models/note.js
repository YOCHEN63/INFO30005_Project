const mongoose = require('mongoose')
const User = require('./User')
const mySchema = mongoose.Schema

const NoteSchema = new mySchema({
    record_date :{type:Date,default:Date.now},
    comment:{type:String,require:true},
    user_id:{type:mySchema.Types.ObjectId,ref:'user'}
})

const NoteModel = mongoose.Model('noteSchema', NoteSchema)

module.exports = NoteModel

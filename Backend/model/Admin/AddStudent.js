const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const jwt = require("jsonwebtoken")
const AddStudentSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    department:{
        type:String,
        required:true,
    },
    from:{
        type:Date,
        required:true,
    },
    to:{
        type:Date,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    role:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    img:{
        type:String,
        default: null,
    },
})

 
const studentdata = mongoose.model('STUDENTDATA', AddStudentSchema)

module.exports = studentdata
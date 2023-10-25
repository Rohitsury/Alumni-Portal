const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    eventname:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
    time:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },   
    img:{
        type:String,
        default: null,
    },
})

 
const Event = mongoose.model('EVENTS', EventSchema)

module.exports = Event
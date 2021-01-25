const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contact = new Schema({
    name:{type:String , required:true},
    email:{type:String , required:true},
    text:{type:String, required:true}
})

const Contact = mongoose.model('contact', contact) 

module.exports = Contact
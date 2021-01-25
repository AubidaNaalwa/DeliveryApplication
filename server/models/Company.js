const mongoose = require('mongoose')
const Schema = mongoose.Schema

const company = new Schema({
    companyName:{type:String , required:true},
    email:{type:String , required:true},
    phoneNumber:{type:String, required:true},
    url : {type:String , required:true},
    address:{type:String , required:true},
    fax:{type:String, required:true}
})

const Company = mongoose.model('company', company) 

module.exports = Company
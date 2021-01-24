const mongoose = require('mongoose')
const Schema = mongoose.Schema

const deliveryManager = new Schema({
    userName:{type:String , required:true},
    password:{type:String , required:true},
    name:{type:String , required:true},
    phoneNumber:{type:string, required:true},
    id : {type:String , required:true}
})

const DeliveryManager = mongoose.model('deliveryManager', deliveryManager) 

module.exports = DeliveryManager
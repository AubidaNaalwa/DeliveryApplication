const mongoose = require('mongoose')
const Schema = mongoose.Schema

const deliveryWorker = new Schema({
    userName:{type:String , required:true},
    password:{type:String , required:true},
    name:{type:String , required:true},
    phoneNumber:{type:String, required:true },
    id : {type:String , required:true},
    lat: {type:String},
    lan: {type:String},
    packages: [{type: Schema.Types.ObjectId, ref: 'Order'}],
    vehicle: {type:Number , required:true}
})

const DeliveryWorker = mongoose.model('deliveryWorker', deliveryWorker) 

module.exports = DeliveryWorker
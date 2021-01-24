const mongoose = require('mongoose')

const Schema = mongoose.Schema

const order = new Schema({
    name:{type:String , required:true},
    phoneNumber:{type:String, required:true},
    id : {type:String , required:true},
    area:{type:String , required:true},
    lat: {type:String , required:true},
    lan: {type:String , default:"34.947460"},
    received: {
        type: Boolean,
        default: false
    },
    date:{  type: Date, default: Date.now  }
})

const Order = mongoose.model('Order', order) 

module.exports = Order
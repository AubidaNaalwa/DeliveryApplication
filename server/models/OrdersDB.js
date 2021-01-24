//OrdersDB DB -> DashBoard
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderDB = new Schema({
    name:{type:String , required:true},
    phoneNumber:{type:String, required:true},
    id : {type:String , required:true},
    area:{type:String , required:true},
    date:{  type: Date, default: Date.now  },
    assignedTO:{type: String}
})

const OrderDB = mongoose.model('OrderDB', orderDB) 

module.exports = OrderDB
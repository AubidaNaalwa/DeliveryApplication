const express = require('express')
const path = require('path')
const app = express()
const api = require('./server/routes/api')
const DeliveryWorkerApi = require('./server/routes/DeliveryWorkerApi')
const DashBoardAPI = require('./server/routes/DashBoard')
const OrdersApi = require('./server/routes/OrdersApi')
const mongoose = require('mongoose')
const url = "mongodb+srv://AubidaNaalwa:Admin1234@cluster0.cvbqr.mongodb.net/DeliveryDB?retryWrites=true&w=majority"
mongoose.connect(process.env.URI, {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false }) 
.then(() => console.log( 'Database Connected' ))
.catch(err => console.log( err ));

app.use(express.static(path.join(__dirname, 'build')));


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    next()
})
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/', api)
app.use('/DeliveryWorker/', DeliveryWorkerApi)
app.use('/Orders/', OrdersApi)
app.use('/DashBoard/', DashBoardAPI)

app.use(express.static(path.join(__dirname,'build')))

const port = 8080

app.listen((process.env.PORT || port), function () {
    console.log(`server runs on port : ${port}`)
})
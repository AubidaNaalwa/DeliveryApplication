const express = require('express')
const DeliveryWorker = require('../models/DeliveryWorker')
const Order = require('../models/Order')
const Company = require('../models/Company')

const router = express.Router()

router.get('/', (req, res) => {
    res.send({ status: "server working" })
})

router.get('/drivers', (req, res) => {
    DeliveryWorker.find({}, function (err, results) {
        if (err)
            res.send(err)
        else
            res.send({ drivers: results })
    })
})



router.post('/logIn', (req, res) => {
    DeliveryWorker.find({ userName: req.body.userName, password: req.body.password }, function (err, data) {
        if (err)
            res.send(err)
        else
            res.send({ status: data.length })
    })
})

router.post('/createAccount', (req, res) => {
            const dw = new DeliveryWorker(req.body)
            dw.save()
            res.end()
})

router.delete('/deleteaccount', (req, res) => {
    DeliveryWorker.findByIdAndDelete(req.body.id).lean()
    .exec(function (err, oldFeature) {
     if (err) {
        res.send(err)
     }else{
         res.end()
     }
})
})

router.get('/companyinfo', (req ,res) => {
    Company.find({}, function(err, data){
        if(err)
            res.send(err)
        else
            res.send(data[0])
    })
})

router.post('/companyInfo', (req ,res) => {
    const company = new Company(req.body)
    company.save();
    res.end()
})

router.post('/location', (req,res)=>{
    DeliveryWorker.updateOne({userName: req.body.userName, password: req.body.password}, {$set:{lat:req.body.lat, lan:req.body.lan}}, function(err, data){
        if(err){
            res.send(err)
        }else{
            res.end()
        }
    })
})

module.exports = router
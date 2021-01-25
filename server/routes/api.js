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

router.get('/totalOrders', (req, res) => {
    Order.find({}, function (err, results) {
        if (err)
            res.send(err)
        else
            res.send({ drivers: results })
    })
})
router.post('/addorder', function (req, res) {
    const order = new Order(req.body.order)
    DeliveryWorker.updateOne({ userName: req.body.userName, password: req.body.password },
        { $addToSet: { packages: order._id } }
        , function (err, data) {
            if (err)
                res.send(err)
            else {
                order.save()
                res.end()
            }
        })
})

router.post('/un', (req, res) => {
    Order.updateMany({}, { received: false }, function (err, data) {
        if (err)
            res.send(err)
        else
            res.end()
    })
})

router.post('/setReceived', (req, res) => {
    Order.findByIdAndUpdate(req.body.id, { received: true }, function (err, data) {
        if (err)
            res.send(err)
        else
            res.end()
    })
})


router.post('/orders', (req, res) => {

    DeliveryWorker.find({ userName: req.body.userName, password: req.body.password }).populate('packages').exec(function (err, data) {
        if (err)
            res.send({ err })
        else
            res.send({ packages: data[0].packages })
    })
})

router.put('/orederrecive', function (req, res) {
    Order.findByIdAndUpdate(req.body.id, { received: true }, function (err, result) {
        if (err)
            res.send(err)
        else
            res.end()
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

router.delete('/deleteaccount/:id', (req, res) => {
    DeliveryWorker.findByIdAndDelete(req.params.id).lean()
        .exec(function (err, oldFeature) {
            if (err) {
                res.send(err)
            } else {
                res.end()
            }
        })
})

router.get('/companyinfo', (req, res) => {
    Company.find({}, function (err, data) {
        if (err)
            res.send(err)
        else
            res.send(data[0])
    })
})

router.post('/companyInfo', (req, res) => {
    const company = new Company(req.body)
    company.save();
    res.end()
})

module.exports = router